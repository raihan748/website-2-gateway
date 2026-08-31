/**
 * SUPABASE-CLIENT.JS - NEXUS CTF STAGE 2 (GATEWAY)
 * Participant scanning, 1/1 capacity lock, victory video verification & mass 1-week IP banning
 */

const SUPABASE_URL = "https://zzpnqmghzkaqwpkphvpz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_RY_e_q6UIZVwr2i88AbBFA_-cLDRgUn";
const DEFAULT_ADMIN_SECRET = "NEXUS_ADMIN_2026";

window.CTF_BACKEND = {
  get client() {
    if (!this._client && window.supabase) {
      this._client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return this._client;
  },
  adminSecret: DEFAULT_ADMIN_SECRET,
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

  // Check if Current User is Admin (via URL Query Param ?admin=... or local storage)
  isAdmin() {
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get("admin") || localStorage.getItem("nexus_admin_token");
    return adminParam === this.adminSecret;
  },

  // Scan and register visitor IP in database, returns ban status
  async scanVisitor() {
    const sb = this.client;
    if (!sb) return { banned: false };

    // Admin is immune from banning
    if (this.isAdmin()) {
      return { banned: false, isAdmin: true };
    }

    const ip = await this.getClientIP();
    const ua = navigator.userAgent || "Unknown Device";

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

  // Claim 1/1 Winner Slot
  async claimWinner(winnerName = "Peserta 9B") {
    const sb = this.client;
    if (!sb) return { success: false, reason: "no_db" };
    const ip = await this.getClientIP();

    try {
      const { data, error } = await sb.rpc("claim_ctf_winner", {
        p_winner_name: winnerName,
        p_ip: ip
      });
      if (error) {
        console.error("Error in claim_ctf_winner RPC:", error);
        return { success: false, reason: error.message };
      }
      return data;
    } catch (err) {
      return { success: false, reason: err.message };
    }
  },

  // Trigger Mass 1-Week IP Ban for all participants (Called when winner clicks redirect)
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

  // Admin Reset Session
  async resetSession(newTitle = "Sesi Putri 9B") {
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

      if (stateErr) {
        console.error("Error resetting state:", stateErr);
        return { success: false, error: stateErr.message };
      }

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

  // Subscribe to Realtime Updates on ctf_state & ctf_participants
  subscribeToUpdates(onStateChange, onParticipantChange) {
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
      .subscribe();

    return channel;
  }
};
