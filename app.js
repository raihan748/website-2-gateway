/**
 * ====================================================================
 * APP.JS - NEXUS CYBER GATEWAY PENGOLAHAN KATA ENGINE
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. WEB AUDIO SYNTHESIZER (SOFT AMBIENT TONES)
  let sfxEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playTone(freq, type = 'sine', duration = 0.06, gainVal = 0.03, decay = true) {
    if (!sfxEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      if (decay) {
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      }

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playKeyClick() {
    playTone(800 + Math.random() * 200, 'sine', 0.015, 0.02);
  }

  function playLaserSweep() {
    if (!sfxEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  function playErrorBeep() {
    playTone(280, 'sine', 0.12, 0.04);
    setTimeout(() => playTone(220, 'sine', 0.14, 0.04), 120);
  }

  function playVictoryFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'sine', 0.25, 0.04), idx * 100);
    });
  }

  // Sound Toggle
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      sfxEnabled = !sfxEnabled;
      if (sfxEnabled) {
        soundIcon.textContent = '🔊';
        soundLabel.textContent = 'SFX: ON';
        playVictoryFanfare();
      } else {
        soundIcon.textContent = '🔇';
        soundLabel.textContent = 'SFX: OFF';
      }
    });
  }

  // 2. THEME SWITCHER
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selectedTheme = btn.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', selectedTheme);
      playLaserSweep();
    });
  });

  // 3. PING MONITOR
  const pingCounter = document.getElementById('pingCounter');
  if (pingCounter) {
    setInterval(() => {
      const ping = Math.floor(Math.random() * 5) + 11;
      pingCounter.textContent = `PING: ${ping}ms`;
    }, 3500);
  }

  // 4. SUBTLE CURSOR
  const cursor = document.getElementById('cyberCursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && cursorDot) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function renderCursor() {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    document.querySelectorAll('a, button, input').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  // 5. CONFIG & DOM ELEMENTS
  const config = window.CTF_CONFIG || {
    geminiRedeemUrl: "https://g.co/play/redeem?code=GEMINI_PRO_REWARD_CLAIM",
    videoSource: "congrats.mp4",
    correctPassword: "GEMINI-PREMIUM-PRO-POWER-NEXUS-QUANTUM-CIPHER-ACTIVATE"
  };

  const authForm = document.getElementById('authForm');
  const passInput = document.getElementById('passInput');
  const clearBtn = document.getElementById('clearBtn');
  const clearTermBtn = document.getElementById('clearTermBtn');
  const logContent = document.getElementById('logContent');
  const formCard = document.getElementById('formCard');
  const victoryCard = document.getElementById('victoryCard');
  const redeemBtn = document.getElementById('redeemBtn');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const submitBolt = document.getElementById('submitBolt');
  const formulaCount = document.getElementById('formulaCount');
  const capacityBanner = document.getElementById('capacityBanner');
  const stageBadge = document.getElementById('stageBadge');
  const congratsVideo = document.getElementById('congratsVideo');
  const videoNotice = document.getElementById('videoNotice');
  const videoNoticeText = document.getElementById('videoNoticeText');
  const bannedOverlay = document.getElementById('bannedOverlay');
  const bannedReason = document.getElementById('bannedReason');
  const bannedExpiry = document.getElementById('bannedExpiry');
  const claimCountdownBox = document.getElementById('claimCountdownBox');
  const countdownSec = document.getElementById('countdownSec');

  let isCurrentWinner = false;
  let isLockedOut = false;

  if (redeemBtn) {
    redeemBtn.href = config.geminiRedeemUrl;
  }

  // Set Video Source
  if (congratsVideo && config.videoSource) {
    const sourceEl = congratsVideo.querySelector('source');
    if (sourceEl) sourceEl.src = config.videoSource;
    congratsVideo.load();
  }

  // Formula Chips (8 Slots)
  const chips = [
    { el: document.getElementById('chip-1'), word: 'GEMINI' },
    { el: document.getElementById('chip-2'), word: 'PREMIUM' },
    { el: document.getElementById('chip-3'), word: 'PRO' },
    { el: document.getElementById('chip-4'), word: 'POWER' },
    { el: document.getElementById('chip-5'), word: 'NEXUS' },
    { el: document.getElementById('chip-6'), word: 'QUANTUM' },
    { el: document.getElementById('chip-7'), word: 'CIPHER' },
    { el: document.getElementById('chip-8'), word: 'ACTIVATE' }
  ];

  if (clearBtn && passInput) {
    clearBtn.addEventListener('click', () => {
      passInput.value = '';
      passInput.focus();
      updateFormulaHUD('');
      playKeyClick();
    });
  }

  if (clearTermBtn && logContent) {
    clearTermBtn.addEventListener('click', () => {
      logContent.innerHTML = '';
      writeLog("Terminal buffer cleared.", "info");
      playKeyClick();
    });
  }

  if (passInput) {
    passInput.addEventListener('input', (e) => {
      playKeyClick();
      updateFormulaHUD(e.target.value);
    });
  }

  function updateFormulaHUD(val) {
    const tokens = val.toUpperCase().split(/[-_\s]+/).map(t => t.trim()).filter(Boolean);
    let locked = 0;

    chips.forEach(({ el, word }) => {
      if (!el) return;
      const isPresent = tokens.includes(word);
      el.classList.toggle('active', isPresent);
      if (isPresent) locked++;
    });

    if (formulaCount) {
      formulaCount.textContent = `${locked} / 8 ASSEMBLED`;
      formulaCount.style.color = locked === 8 ? 'var(--accent-success-light)' : '#fbbf24';
    }
  }

  // 6. GENTLE PARALLAX TILT
  if (window.innerWidth > 768 && formCard) {
    document.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 6;
      const y = (e.clientY / innerHeight - 0.5) * 6;
      const targetCard = formCard.style.display === 'none' ? victoryCard : formCard;
      if (targetCard) {
        targetCard.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    });

    document.addEventListener('mouseleave', () => {
      if (formCard) formCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
      if (victoryCard) victoryCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  }

  // SHA-256 Input Helper
  async function computeSha256(str) {
    try {
      const msgBuffer = new TextEncoder().encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return '';
    }
  }

  // 7. SUBMISSION & DETECTIVE LOGIC VERIFICATION (WITH 1/1 CAPACITY LOCK)
  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isLockedOut) return;

      const userInput = passInput ? passInput.value.trim() : '';
      if (!userInput) {
        writeLog("Harap masukkan 8-Slot Master Formula Key!", "warn");
        return;
      }

      writeLog("Menguji deret kata terhadap 5 Aturan Posisi Logic Grid...", "info");
      if (submitBtn) submitBtn.disabled = true;

      const normalizedInput = userInput.toUpperCase().replace(/\s+/g, '-');
      const inputHash = await computeSha256(normalizedInput);

      // Check if matches the 8-token Master Password SHA-256
      if (inputHash === config.targetHash) {
        // Attempt to claim 1/1 winner slot on database
        if (window.CTF_BACKEND) {
          writeLog("Memverifikasi ketersediaan kuota pemenang 1/1 ke server...", "info");
          const claimRes = await window.CTF_BACKEND.claimWinner("Peserta 9B");

          if (claimRes.success) {
            isCurrentWinner = true;
            handleSuccess();
          } else if (claimRes.reason === 'capacity_full') {
            playErrorBeep();
            writeLog(`❌ KAPASITAS 1/1 SUDAH TERCAPAI: Peserta lain baru saja mendahului Anda!`, "danger");
            lockFormForCapacity();
          } else {
            writeLog("Gagal verifikasi klaim: " + (claimRes.reason || 'Server error'), "danger");
            if (submitBtn) submitBtn.disabled = false;
          }
        } else {
          // Fallback if no backend
          handleSuccess();
        }
        return;
      }

      // If incorrect password
      setTimeout(() => {
        if (submitBtn && !isLockedOut) submitBtn.disabled = false;
        const inputTokens = normalizedInput.split('-');
        playErrorBeep();
        if (passInput) {
          passInput.style.borderColor = "#ef4444";
        }
        shakeElement(formCard);

        if (inputTokens.length !== 8) {
          writeLog(`ATURAN DERET: Terdeteksi ${inputTokens.length} kata (Dibutuhkan tepat 8 kata dipisah strip).`, "danger");
        } else {
          const expectedLengths = [6, 7, 3, 5, 5, 7, 6, 8];
          const actualLengths = inputTokens.map(t => t.length);
          const lengthMatch = JSON.stringify(expectedLengths) === JSON.stringify(actualLengths);

          if (!lengthMatch) {
            writeLog(`CHECKSUM PANJANG HURUF: Deret panjang huruf harus [6, 7, 3, 5, 5, 7, 6, 8]!`, "danger");
          } else {
            writeLog("RELATIONAL ORDER ERROR: Panjang huruf cocok tetapi urutan kata belum memenuhi 5 Aturan Posisi!", "danger");
          }
        }
        writeLog("HINT: Buka Inspect Element (F12) untuk melihat petunjuk lengkap!", "warn");
      }, 400);
    });
  }

  function handleSuccess() {
    playVictoryFanfare();
    writeLog("ACCESS GRANTED! Seluruh 8 teka-teki kata & aturan posisi terpecahkan sempurna.", "success");
    if (passInput) {
      passInput.style.borderColor = "var(--accent-success)";
    }

    setTimeout(() => {
      if (formCard) formCard.style.display = "none";
      if (victoryCard) victoryCard.style.display = "block";
      triggerSubtleConfetti();

      // Start Video
      if (congratsVideo) {
        congratsVideo.play().catch(() => {});
      }
    }, 600);
  }

  function lockFormForCapacity() {
    isLockedOut = true;
    if (capacityBanner) capacityBanner.style.display = "flex";
    if (submitBtn) {
      submitBtn.classList.add("disabled");
      submitBtn.disabled = true;
    }
    if (submitBolt) submitBolt.textContent = "🔒";
    if (submitBtnText) submitBtnText.textContent = "KAPASITAS 1/1 SUDAH TERCAPAI";
    if (stageBadge) {
      stageBadge.textContent = "● 1/1 CLAIMED";
      stageBadge.className = "neo-badge yellow";
    }
  }

  // 8. SURVEY MODAL & BANNED SCREEN HANDLERS
  const surveyModal = document.getElementById('surveyModal');
  const surveyForm = document.getElementById('surveyForm');
  const submitSurveyBtn = document.getElementById('submitSurveyBtn');
  let pendingBanInfo = null;

  function showBannedScreen(reason = null, expiry = null) {
    pendingBanInfo = { reason, expiry };

    // Check if user has already voted in the survey
    const alreadyVoted = localStorage.getItem("nexus_survey_voted") === "true";
    if (!alreadyVoted && surveyModal) {
      surveyModal.style.display = "flex";
    } else {
      displayFinalBanOverlay();
    }
  }

  function displayFinalBanOverlay() {
    if (surveyModal) surveyModal.style.display = "none";
    if (bannedOverlay) {
      bannedOverlay.style.display = "flex";
      if (bannedReason && pendingBanInfo?.reason) {
        bannedReason.textContent = pendingBanInfo.reason;
      }
      if (bannedExpiry && pendingBanInfo?.expiry) {
        const d = new Date(pendingBanInfo.expiry);
        bannedExpiry.textContent = isNaN(d) ? '7 Hari ke Depan' : d.toLocaleString('id-ID');
      }
    }
  }

  // Survey Form Submission Handler
  if (surveyForm) {
    surveyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const selectedOpt = surveyForm.querySelector('input[name="surveyVote"]:checked');
      if (!selectedOpt) return;

      const answerKey = selectedOpt.value;
      const labelMap = {
        HARDER: "Iya, persulit",
        CONTINUE_SAME: "Tidak, lanjutkan",
        DISLIKE_STOP: "Tidak, saya tidak suka game CTF ini, stop"
      };
      const answerText = labelMap[answerKey] || answerKey;

      if (submitSurveyBtn) {
        submitSurveyBtn.disabled = true;
        submitSurveyBtn.textContent = "⏳ Mengirim Vote...";
      }

      // Submit vote to backend
      if (window.CTF_BACKEND) {
        await window.CTF_BACKEND.submitSurveyVote(answerKey, answerText);
      }

      playVictoryFanfare();
      displayFinalBanOverlay();
    });
  }

  // 9. MANDATORY VIDEO ENDED LISTENER (REVEALS REDEEM BUTTON)
  if (congratsVideo) {
    congratsVideo.addEventListener('ended', () => {
      playVictoryFanfare();
      if (videoNotice) {
        videoNotice.className = "video-guard-notice completed";
      }
      if (videoNoticeText) {
        videoNoticeText.textContent = "✅ Video selesai! Tombol klaim hadiah resmi dibuka di bawah.";
      }
      if (redeemBtn) {
        redeemBtn.style.display = "flex";
        redeemBtn.animate([
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 400 });
      }
    });
  }

  // 10. REDEEM BUTTON CLICK (TRIGGERS 1-WEEK BAN & 10s COUNTDOWN FOR WINNER)
  if (redeemBtn) {
    redeemBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      redeemBtn.style.pointerEvents = 'none';

      // 1. Open Gemini Pro link in new window
      window.open(config.geminiRedeemUrl, '_blank');

      // 2. Trigger mass IP ban on backend
      if (window.CTF_BACKEND) {
        window.CTF_BACKEND.triggerMassBan();
      }

      // 3. Show 10-second countdown for winner
      if (claimCountdownBox && countdownSec) {
        claimCountdownBox.style.display = "flex";
        let timeLeft = 10;

        const countdownInterval = setInterval(() => {
          timeLeft--;
          countdownSec.textContent = timeLeft;

          if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            showBannedScreen(
              "Selamat! Hadiah Gemini Pro 18 Bulan Anda telah diklaim. Sesi ini telah selesai dan akses website dikunci selama 1 minggu.",
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            );
          }
        }, 1000);
      }
    });
  }

  // 11. ADMIN SURVEY ANALYTICS DASHBOARD
  const adminGatewayPanel = document.getElementById('adminGatewayPanel');
  const dominantBadge = document.getElementById('dominantBadge');
  const totalVotesCount = document.getElementById('totalVotesCount');
  const countHarder = document.getElementById('countHarder');
  const barHarder = document.getElementById('barHarder');
  const countContinue = document.getElementById('countContinue');
  const barContinue = document.getElementById('barContinue');
  const countStop = document.getElementById('countStop');
  const barStop = document.getElementById('barStop');
  const copyReportBtn = document.getElementById('copyReportBtn');
  const resetVotesBtn = document.getElementById('resetVotesBtn');

  let currentSurveyData = null;

  async function updateSurveyDashboard() {
    if (!window.CTF_BACKEND) return;
    const data = await window.CTF_BACKEND.fetchSurveyResults();
    if (!data) return;
    currentSurveyData = data;

    if (totalVotesCount) totalVotesCount.textContent = data.total;
    if (dominantBadge) {
      dominantBadge.textContent = `DOMINAN: ${data.dominant.label.toUpperCase()} (${data.dominant.percentage}%)`;
    }

    if (countHarder && barHarder) {
      countHarder.textContent = `${data.counts.HARDER} (${data.percentages.HARDER}%)`;
      barHarder.style.width = `${data.percentages.HARDER}%`;
    }

    if (countContinue && barContinue) {
      countContinue.textContent = `${data.counts.CONTINUE_SAME} (${data.percentages.CONTINUE_SAME}%)`;
      barContinue.style.width = `${data.percentages.CONTINUE_SAME}%`;
    }

    if (countStop && barStop) {
      countStop.textContent = `${data.counts.DISLIKE_STOP} (${data.percentages.DISLIKE_STOP}%)`;
      barStop.style.width = `${data.percentages.DISLIKE_STOP}%`;
    }
  }

  if (copyReportBtn) {
    copyReportBtn.addEventListener('click', () => {
      playKeyClick();
      if (!currentSurveyData) {
        alert("Belum ada data vote yang termuat.");
        return;
      }

      const d = currentSurveyData;
      const reportText = [
        "==================================================",
        "📊 LAPORAN HASIL VOTE SURVEI CTF EPISODE 2",
        "==================================================",
        `Total Responden : ${d.total} Siswa`,
        `Pilihan Dominan : ${d.dominant.label} (${d.dominant.percentage}%)`,
        "",
        "Rincian Perolehan Suara:",
        `1. ⚡ Iya, persulit                   : ${d.counts.HARDER} vote (${d.percentages.HARDER}%)`,
        `2. 🎯 Tidak, lanjutkan                : ${d.counts.CONTINUE_SAME} vote (${d.percentages.CONTINUE_SAME}%)`,
        `3. 🛑 Tidak, saya tidak suka CTF, stop : ${d.counts.DISLIKE_STOP} vote (${d.percentages.DISLIKE_STOP}%)`,
        "==================================================",
        "Laporan siap dikirim ke AI untuk perencanaan CTF selanjutnya!"
      ].join("\n");

      navigator.clipboard.writeText(reportText).then(() => {
        alert("📋 Laporan Hasil Vote berhasil disalin ke clipboard! Anda bisa langsung menempelkannya (Ctrl+V) ke chat!");
      }).catch(() => {
        prompt("Salin manual laporan di bawah ini:", reportText);
      });
    });
  }

  if (resetVotesBtn) {
    resetVotesBtn.addEventListener('click', async () => {
      const confirmReset = confirm("Apakah Anda yakin ingin mereset seluruh data survei vote?");
      if (!confirmReset) return;

      resetVotesBtn.disabled = true;
      const res = await window.CTF_BACKEND.resetSurveyVotes();
      resetVotesBtn.disabled = false;
      if (res.success) {
        alert("✅ Seluruh data survei berhasil di-reset!");
        updateSurveyDashboard();
      } else {
        alert("Gagal reset data survei: " + (res.error || "Akses ditolak"));
      }
    });
  }

  // 12. BACKEND VISITOR SCANNING & REALTIME SUBSCRIPTION
  if (window.CTF_BACKEND) {
    // Check Admin status asynchronously
    window.CTF_BACKEND.isAdmin().then(isAdminUser => {
      if (isAdminUser && adminGatewayPanel) {
        adminGatewayPanel.style.display = "block";
        updateSurveyDashboard();
      }
    });

    // 1. Scan Visitor IP
    window.CTF_BACKEND.scanVisitor().then(res => {
      if (res && res.banned) {
        showBannedScreen(res.ban_reason, res.banned_until);
      }
    });

    // 2. Check Initial State
    window.CTF_BACKEND.fetchState().then(state => {
      if (state && state.winner_name && !isCurrentWinner) {
        lockFormForCapacity();
      }
    });

    // 3. Realtime Listener
    window.CTF_BACKEND.subscribeToUpdates(
      // On ctf_state change
      (state) => {
        if (state && state.winner_name && !isCurrentWinner) {
          lockFormForCapacity();
        }
      },
      // On ctf_participants change
      (participantPayload) => {
        const record = participantPayload.new;
        if (record && record.is_banned && !isCurrentWinner) {
          // Check if this matches current client IP
          window.CTF_BACKEND.getClientIP().then(myIp => {
            if (record.ip_address === myIp) {
              showBannedScreen(record.ban_reason, record.banned_until);
            }
          });
        }
      },
      // On ctf_survey_votes change (Live updates for Admin Dashboard)
      () => {
        updateSurveyDashboard();
      }
    );
  }

  // 13. HELPER LOG & SHAKE
  function writeLog(msg, type = "info") {
    if (!logContent) return;
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logContent.appendChild(line);
    logContent.scrollTop = logContent.scrollHeight;
  }

  function shakeElement(el) {
    if (!el) return;
    el.animate([
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' }
    ], {
      duration: 250,
      easing: 'ease-in-out'
    });
  }

  // 14. AMBIENT MATRIX CANVAS (SUBTLE)
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(9, 13, 22, 0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      ctx.fillStyle = 'rgba(96, 165, 250, 0.25)';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 40);
  }

  // 15. SUBTLE VICTORY CONFETTI
  function triggerSubtleConfetti() {
    const colors = ['#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f8fafc'];
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('div');
      p.style.position = 'fixed';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = '-10px';
      p.style.width = Math.random() * 8 + 4 + 'px';
      p.style.height = Math.random() * 12 + 6 + 'px';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.borderRadius = '2px';
      p.style.zIndex = '9999';
      p.style.pointerEvents = 'none';

      document.body.appendChild(p);

      const fallDuration = Math.random() * 2.5 + 2.0;
      const rotationSpeed = Math.random() * 600 - 300;

      p.animate([
        { transform: 'translateY(0vh) rotate(0deg)', opacity: 0.9 },
        { transform: `translateY(105vh) rotate(${rotationSpeed}deg)`, opacity: 0.0 }
      ], {
        duration: fallDuration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => p.remove();
    }
  }
});
