/**
 * SUPABASE-CLIENT.JS - NEXUS CTF STAGE 2 (GATEWAY)
 * Participant scanning, 1/1 capacity lock, victory video verification,
 * Survey Voting System for CTF Episode 2, IP-to-Class Winner Resolution & Mass 1-Week IP Banning
 */

(function () {
  // Runtime Deobfuscation Helper (XOR + Base64)
  function _nxDec(b64, k = 0x5a) {
    try {
      const raw = atob(b64);
      let res = '';
      for (let i = 0; i < raw.length; i++) {
        res += String.fromCharCode(raw.charCodeAt(i) ^ (k + (i % 7)));
      }
      return res;
    } catch (e) {
      return '';
    }
  }

  // SHA-256 Helper (Web Crypto API)
  async function _sha256(text) {
    try {
      const msgBuffer = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return '';
    }
  }

  // Encrypted Supabase Configuration
  const _E_URL = "Mi8oLS1lT3UhJi0wLg09MyY2Py4XKjAsNSgvGnQoKS0/PQEpPnI+MQ==";
  const _E_KEY = "KTkDLSs9DDMoNDw8MwUFCQUCOwARbA4VBwgoEmgyZGUfPSIcGgNwPRMkCDwJMw==";

  // SHA-256 Hash of Administrator Secret Key
  const _ADMIN_HASH = "3721288bf35e73e380946957b491c4a80d827ff1b8338421e8008f4734cf93e1";

  window.CTF_BACKEND = {
    get client() {
      if (!this._client && window.supabase) {
        const u = _nxDec(_E_URL);
        const k = _nxDec(_E_KEY);
        this._client = window.supabase.createClient(u, k);
      }
      return this._client;
    },
    cachedIP: null,

    // Get Current Client Public IP Address
    async getClientIP() {
      if (this.cachedIP) return this.cachedIP;
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        this.cachedIP = data.ip || "127.0.0.1";
        return this.cachedIP;
      } catch (e) {
        this.cachedIP = "127.0.0.1";
        return this.cachedIP;
      }
    },

    // Check if Current User is Admin via Hash Comparison
    // Uses URL query or temporary sessionStorage (Seals out persistent localStorage)
    async isAdmin() {
      const urlParams = new URLSearchParams(window.location.search);
      const inputSecret = urlParams.get("admin") || sessionStorage.getItem("nexus_admin_session");

      // Clean persistent storage to keep token sealed
      localStorage.removeItem("nexus_admin_token");

      if (!inputSecret) return false;

      const inputHash = await _sha256(inputSecret.trim());
      const isValid = (inputHash === _ADMIN_HASH);
      if (isValid) {
        sessionStorage.setItem("nexus_admin_session", inputSecret.trim());
      } else {
        sessionStorage.removeItem("nexus_admin_session");
      }
      return isValid;
    },

    // Seal Token & Exit Admin Mode
    sealAdmin() {
      sessionStorage.removeItem("nexus_admin_session");
      localStorage.removeItem("nexus_admin_token");
      // Strip ?admin= parameter and reload clean
      window.location.href = window.location.pathname;
    },

    // Scan and register visitor IP in database, returns ban status
    async scanVisitor() {
      const sb = this.client;
      if (!sb) return { banned: false };

      // Admin is immune from banning
      const adminStatus = await this.isAdmin();
      if (adminStatus) {
        return { banned: false, isAdmin: true };
      }

      const ip = await this.getClientIP();
      const localClass = localStorage.getItem("nexus_student_class");
      const uaPrefix = localClass ? `[CLASS:${localClass}] ` : "";
      const ua = uaPrefix + (navigator.userAgent || "Unknown Device");

      try {
        const { data, error } = await sb.rpc("log_participant_ip", {
          p_ip: ip,
          p_ua: ua
        });
        if (error) {
          console.error("Error logging participant IP:", error);
          return { banned: false };
        }
        return data || { banned: false };
      } catch (err) {
        console.error("Failed to scan visitor:", err);
        return { banned: false };
      }
    },

    // Fetch Current CTF State
    async fetchState() {
      const sb = this.client;
      if (!sb) return null;
      const { data, error } = await sb
        .from("ctf_state")
        .select("*")
        .eq("id", 1)
        .single();
      if (error) {
        console.error("Error fetching ctf_state:", error);
        return null;
      }
      return data;
    },

    // Claim 1/1 Winner Slot & Link Student Class by IP
    async claimWinner(winnerName = "Peserta") {
      const sb = this.client;
      if (!sb) return { success: false, reason: "no_db" };
      const ip = await this.getClientIP();

      // 1. Resolve student's class from ctf_participants (via IP)
      let resolvedClass = null;
      try {
        const { data: partData } = await sb
          .from("ctf_participants")
          .select("*")
          .eq("ip_address", ip)
          .maybeSingle();

        if (partData) {
          if (partData.student_class) {
            resolvedClass = partData.student_class;
          } else if (partData.user_agent && partData.user_agent.includes("[CLASS:")) {
            const m = partData.user_agent.match(/\[CLASS:(.*?)\]/);
            if (m && m[1]) resolvedClass = m[1];
          }
        }
      } catch (e) {
        console.warn("Could not lookup participant class by IP:", e);
      }

      // Fallback to localStorage if on same device
      if (!resolvedClass) {
        resolvedClass = localStorage.getItem("nexus_student_class") || "9B";
      }

      const fullWinnerName = `Peserta Kelas ${resolvedClass}`;

      try {
        // Try claim_ctf_winner RPC
        const { data, error } = await sb.rpc("claim_ctf_winner", {
          p_winner_name: fullWinnerName,
          p_ip: ip
        });

        if (error) {
          console.error("Error in claim_ctf_winner RPC:", error);
          // Fallback direct update
          const { error: updErr } = await sb
            .from("ctf_state")
            .update({
              winner_name: fullWinnerName,
              winner_ip: ip,
              winner_claimed: true,
              updated_at: new Date().toISOString()
            })
            .eq("id", 1)
            .eq("winner_claimed", false);

          if (updErr) return { success: false, reason: updErr.message };
        }

        // Also try to update winner_class column if exists
        try {
          await sb
            .from("ctf_state")
            .update({ winner_class: resolvedClass })
            .eq("id", 1);
        } catch (_) {}

        return data || { success: true, winner_class: resolvedClass };
      } catch (err) {
        return { success: false, reason: err.message };
      }
    },

    // Trigger Mass 1-Week IP Ban for all participants
    async triggerMassBan() {
      const sb = this.client;
      if (!sb) return { success: false };
      const ip = await this.getClientIP();

      try {
        const { data, error } = await sb.rpc("trigger_mass_ip_ban", {
          p_winner_ip: ip
        });
        if (error) {
          console.error("Error triggering mass ban:", error);
          return { success: false, error: error.message };
        }
        return data || { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    // Submit Survey Vote (1 Soal CTF Episode 2)
    async submitSurveyVote(answerKey, answerText) {
      const sb = this.client;
      const ip = await this.getClientIP();
      localStorage.setItem("nexus_survey_voted", "true");

      if (!sb) return { success: true };

      try {
        const { data, error } = await sb
          .from("ctf_survey_votes")
          .upsert({
            ip_address: ip,
            answer_key: answerKey,
            answer_text: answerText,
            created_at: new Date().toISOString()
          }, { onConflict: "ip_address" })
          .select();

        if (error) {
          console.warn("Survey vote table notice:", error.message);
          return { success: false, error: error.message };
        }
        return { success: true, data };
      } catch (err) {
        console.warn("Survey submit error:", err);
        return { success: false, error: err.message };
      }
    },

    // Fetch All Survey Results (For Admin Analytics)
    async fetchSurveyResults() {
      const sb = this.client;
      if (!sb) return null;

      try {
        const { data, error } = await sb
          .from("ctf_survey_votes")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching survey results:", error);
          return null;
        }

        const votes = data || [];
        const total = votes.length;
        const counts = {
          HARDER: 0,
          CONTINUE_SAME: 0,
          DISLIKE_STOP: 0
        };

        votes.forEach(v => {
          if (counts[v.answer_key] !== undefined) {
            counts[v.answer_key]++;
          }
        });

        // Determine Dominant Option
        let dominantKey = 'NONE';
        let maxCount = 0;
        for (const [k, count] of Object.entries(counts)) {
          if (count > maxCount) {
            maxCount = count;
            dominantKey = k;
          }
        }

        const labelMap = {
          HARDER: "Iya, persulit",
          CONTINUE_SAME: "Tidak, lanjutkan",
          DISLIKE_STOP: "Tidak, saya tidak suka game CTF ini, stop",
          NONE: "Belum ada vote"
        };

        return {
          total,
          counts,
          percentages: {
            HARDER: total > 0 ? Math.round((counts.HARDER / total) * 100) : 0,
            CONTINUE_SAME: total > 0 ? Math.round((counts.CONTINUE_SAME / total) * 100) : 0,
            DISLIKE_STOP: total > 0 ? Math.round((counts.DISLIKE_STOP / total) * 100) : 0
          },
          dominant: {
            key: dominantKey,
            label: labelMap[dominantKey],
            count: maxCount,
            percentage: total > 0 ? Math.round((maxCount / total) * 100) : 0
          },
          votes
        };
      } catch (err) {
        console.error("Survey fetch error:", err);
        return null;
      }
    },

    // Reset Survey Votes (Admin Only)
    async resetSurveyVotes() {
      const isAuth = await this.isAdmin();
      if (!isAuth) return { success: false, error: "Unauthorized" };

      const sb = this.client;
      if (!sb) return { success: false, error: "No DB connection" };

      try {
        const { error } = await sb
          .from("ctf_survey_votes")
          .delete()
          .neq("id", -1);

        if (error) return { success: false, error: error.message };
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    // Admin Reset Session
    async resetSession(newTitle = "Sesi Putri 9B") {
      const isAuth = await this.isAdmin();
      if (!isAuth) return { success: false, error: "Unauthorized" };

      const sb = this.client;
      if (!sb) return { success: false, error: "No DB connection" };

      try {
        // 1. Reset CTF State
        const { error: stateErr } = await sb
          .from("ctf_state")
          .update({
            is_started: false,
            winner_name: null,
            winner_ip: null,
            winner_claimed: false,
            ban_triggered_at: null,
            session_title: newTitle,
            updated_at: new Date().toISOString()
          })
          .eq("id", 1);

        if (stateErr) return { success: false, error: stateErr.message };

        // 2. Unban All Participants
        await sb
          .from("ctf_participants")
          .update({
            is_banned: false,
            banned_until: null,
            ban_reason: null,
            is_winner: false
          })
          .neq("ip_address", "PLACEHOLDER_NEVER_MATCH");

        return { success: true, session: newTitle };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    // Subscribe to Realtime Updates on ctf_state, ctf_participants, and ctf_survey_votes
    subscribeToUpdates(onStateChange, onParticipantChange, onSurveyChange) {
      const sb = this.client;
      if (!sb) return null;

      const channel = sb
        .channel("public:ctf_gateway_channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "ctf_state", filter: "id=eq.1" },
          (payload) => {
            if (onStateChange) onStateChange(payload.new);
          }
        )
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "ctf_participants" },
          (payload) => {
            if (onParticipantChange) onParticipantChange(payload);
          }
        )
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "ctf_survey_votes" },
          (payload) => {
            if (onSurveyChange) onSurveyChange(payload);
          }
        )
        .subscribe();

      return channel;
    }
  };
})();
