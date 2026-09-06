/**
 * ====================================================================
 * APP.JS - NEXUS CYBER GATEWAY PENGOLAHAN KATA ENGINE
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. PRINT DOSSIER TO DEVTOOLS CONSOLE (INSPECT ELEMENT / F12)
  console.log(
    `%c` +
    `================================================================================\n` +
    ` ____  _____ _   _  ____  ___  _        _    _   _    _    _   _   _  __    _  _____  _    \n` +
    `|  _ \\| ____| \\ | |/ ___|/ _ \\| |      / \\  | | | |  / \\  | \\ | | | |/ /   / \\|_   _|/ \\   \n` +
    `| |_) |  _| |  \\| | |  _| | | | |     / _ \\ | |_| | / _ \\ |  \\| | | ' /   / _ \\ | | / _ \\  \n` +
    `|  __/| |___| |\\  | |_| | |_| | |___ / ___ \\|  _  |/ ___ \\| |\\  | | . \\  / ___ \\| |/ ___ \\ \n` +
    `|_|   |_____|_| \\_|\\____|\\___/|_____/_/   \\_\\_| |_/_/   \\_\\_| \\_| |_|\\_\\/_/   \\_\\_/_/   \\_\\\n` +
    `================================================================================\n` +
    `[ PENGOLAHAN KATA - STAGE 2: NEXUS GATEWAY ]\n\n` +
    `+------------------------------------------------------------------------------+\n` +
    `| 🧩 DOSSIER LOGIKA PENGOLAHAN KATA (8 MYSTERY WORDS & POSITIONAL RULES)        |\n` +
    `+------------------------------------------------------------------------------+\n\n` +
    `FASE 1: PECAHKAN 8 KATA MISTERI DI BAWAH INI:\n` +
    `[1] KATA A (Anagram AI)         : Susun huruf dari "INIMEG" (Nama AI Google)\n` +
    `[2] KATA B (Caesar Shift -3)    : Geser mundur 3 huruf pada sandi "SOHPLXP"\n` +
    `[3] KATA C (Akronim Huruf Depan): Huruf awal dari kalimat "Pengaman Ruang Otorisasi"\n` +
    `[4] KATA D (Riddle Karakter)    : Kata 5 huruf dengan huruf tengah 'W' (Tenaga/Daya)\n` +
    `[5] KATA E (Simpul Cyber)       : Simpul jaringan 5 huruf dengan pola "N _ X _ S"\n` +
    `[6] KATA F (Fisika Komputasi)   : Istilah fisika 7 huruf berawalan 'Q' & berakhiran 'M'\n` +
    `[7] KATA G (Istilah Sandi)      : Kata 6 huruf untuk kunci sandi / algoritma enkripsi\n` +
    `[8] KATA H (Lawan Kata)         : Lawan kata bahasa Inggris dari "DEACTIVATE"\n\n` +
    `--------------------------------------------------------------------------------\n` +
    `FASE 2: ATURAN POSISI LOGIC GRID (SUSUN POSISI SLOT 1 S/D 8):\n` +
    `* ATURAN 1 : Kata hasil Anagram (Kata A) menempati Slot 1 paling depan.\n` +
    `* ATURAN 2 : Dua kata berpanjang 7 huruf (Kata B & Kata F) TIDAK BOLEH bersebelahan.\n` +
    `* ATURAN 3 : Kata D (POWER) berada tepat di antara kata 3 huruf (Kata C) dan kata 5 huruf berakhiran 'S' (Kata E).\n` +
    `* ATURAN 4 : Rangkaian [Kata E] -> [Kata F] -> [Kata G] selalu bersambung secara berurutan.\n` +
    `* ATURAN 5 : Kata perintah aksi (Kata H) menempati Slot 8 paling akhir.\n\n` +
    `CHECKSUM PANJANG HURUF SLOT 1 S/D 8: [ 6, 7, 3, 5, 5, 7, 6, 8 ]\n` +
    `Format Kunci: KATA1-KATA2-KATA3-KATA4-KATA5-KATA6-KATA7-KATA8\n` +
    `================================================================================`,
    'color: #60a5fa; font-family: monospace; font-weight: bold;'
  );

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
  const bannedOverlay = document.getElementById('bannedOverlay');
  const bannedReason = document.getElementById('bannedReason');
  const bannedExpiry = document.getElementById('bannedExpiry');
  const claimCountdownBox = document.getElementById('claimCountdownBox');
  const countdownSec = document.getElementById('countdownSec');

  let isCurrentWinner = (localStorage.getItem("nexus_is_winner") === "true");
  let isLockedOut = false;

  if (redeemBtn) {
    redeemBtn.href = config.geminiRedeemUrl;
  }


  // Formula Chips (8 Slots) - Dynamically Generated per Session
  const formulaChipsContainer = document.querySelector('.formula-chips');
  let chips = [];

  function loadSessionPuzzle(sessionType = 'ikhwan') {
    if (config) config.activeSession = sessionType;
    const isAkhwat = sessionType === 'akhwat';
    const puzzle = config ? config.getPuzzle(sessionType) : null;
    if (!puzzle) return;

    // 1. Rebuild Chips HUD Elements
    if (formulaChipsContainer && puzzle.chips) {
      formulaChipsContainer.innerHTML = '';
      chips = [];
      puzzle.chips.forEach((c, idx) => {
        const span = document.createElement('span');
        span.className = 'chip';
        span.id = c.id;
        span.setAttribute('data-word', c.word);
        span.textContent = c.label;
        formulaChipsContainer.appendChild(span);
        chips.push({ el: span, word: c.word });

        if (idx < puzzle.chips.length - 1) {
          const sep = document.createElement('span');
          sep.className = 'chip-sep';
          sep.textContent = '➔';
          formulaChipsContainer.appendChild(sep);
        }
      });
    }

    // 2. Update Admin Session Badge & Switch Button
    const adminSessionTypeBadge = document.getElementById('adminSessionTypeBadge');
    const adminSwitchSessionBtn = document.getElementById('adminSwitchSessionBtn');

    if (adminSessionTypeBadge) {
      if (isAkhwat) {
        adminSessionTypeBadge.textContent = '👧 AKHWAT';
        adminSessionTypeBadge.className = 'admin-session-badge akhwat';
      } else {
        adminSessionTypeBadge.textContent = '👦 IKHWAN';
        adminSessionTypeBadge.className = 'admin-session-badge';
      }
    }

    if (adminSwitchSessionBtn) {
      if (isAkhwat) {
        adminSwitchSessionBtn.innerHTML = '🔀 SWITCH KE SESI IKHWAN';
        adminSwitchSessionBtn.style.borderColor = 'rgba(0, 240, 255, 0.4)';
        adminSwitchSessionBtn.style.color = '#00f0ff';
      } else {
        adminSwitchSessionBtn.innerHTML = '🔀 SWITCH KE SESI AKHWAT';
        adminSwitchSessionBtn.style.borderColor = 'rgba(236, 72, 153, 0.4)';
        adminSwitchSessionBtn.style.color = '#f472b6';
      }
    }

    // 3. Re-evaluate HUD with Current Value
    if (passInput) {
      updateFormulaHUD(passInput.value);
    }

    // 4. Update Owner Congratulations Card for active session
    if (config && config.getActiveOwnerMessage) {
      const activeMsg = config.getActiveOwnerMessage(sessionType);
      const ownerTitleText = document.getElementById('ownerTitleText');
      const ownerBodyText = document.getElementById('ownerBodyText');
      const ownerAuthorText = document.getElementById('ownerAuthorText');
      if (ownerTitleText && activeMsg) ownerTitleText.textContent = activeMsg.title;
      if (ownerBodyText && activeMsg) ownerBodyText.textContent = activeMsg.body;
      if (ownerAuthorText && activeMsg) ownerAuthorText.textContent = activeMsg.author;
    }
  }

  // Initial Load with default session
  loadSessionPuzzle('ikhwan');

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

    passInput.addEventListener('paste', () => {
      setTimeout(() => {
        updateFormulaHUD(passInput.value);
      }, 10);
    });

    passInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (authForm) {
          if (typeof authForm.requestSubmit === 'function') {
            authForm.requestSubmit();
          } else {
            authForm.dispatchEvent(new Event('submit', { cancelable: true }));
          }
        }
      }
    });
  }

  function updateFormulaHUD(val) {
    const tokens = (val || '').toUpperCase().split(/[-_\s]+/).map(t => t.trim()).filter(Boolean);
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
      const activePuzzle = config ? config.getPuzzle(config.activeSession) : null;
      const targetHash = activePuzzle ? activePuzzle.targetHash : (config?.targetHash);

      // Check if matches the active 8-token Master Password SHA-256
      if (inputHash === targetHash) {
        // Mark as current winner IMMEDIATELY to prevent Realtime WebSocket race condition!
        isCurrentWinner = true;
        localStorage.setItem("nexus_is_winner", "true");

        // Attempt to claim 1/1 winner slot on database
        if (window.CTF_BACKEND) {
          writeLog("Memverifikasi ketersediaan kuota pemenang 1/1 ke server...", "info");
          const claimRes = await window.CTF_BACKEND.claimWinner("Peserta");

          if (claimRes.success) {
            handleSuccess();
          } else if (claimRes.reason === 'capacity_full') {
            isCurrentWinner = false;
            localStorage.removeItem("nexus_is_winner");
            playErrorBeep();
            writeLog(`❌ KAPASITAS 1/1 SUDAH TERCAPAI: Peserta lain baru saja mendahului Anda!`, "danger");
            lockFormForCapacity();
          } else {
            isCurrentWinner = false;
            localStorage.removeItem("nexus_is_winner");
            writeLog("Gagal verifikasi klaim: " + (claimRes.reason || 'Server error'), "danger");
            if (submitBtn && !isLockedOut) submitBtn.disabled = false;
          }
        } else {
          isCurrentWinner = false;
          localStorage.removeItem("nexus_is_winner");
          // Strict server validation required - NO OFFLINE WIN ALLOWED!
          playErrorBeep();
          writeLog("❌ KONEKSI SERVER GAGAL: Tidak dapat memvalidasi kuota pemenang ke database. Pastikan koneksi internet aktif!", "danger");
          if (submitBtn && !isLockedOut) submitBtn.disabled = false;
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
          const expectedLengths = activePuzzle ? activePuzzle.expectedLengths : [6, 7, 3, 5, 5, 7, 6, 8];
          const actualLengths = inputTokens.map(t => t.length);
          const lengthMatch = JSON.stringify(expectedLengths) === JSON.stringify(actualLengths);

          if (!lengthMatch) {
            writeLog(`CHECKSUM PANJANG HURUF: Deret panjang huruf harus [${expectedLengths.join(', ')}]!`, "danger");
          } else {
            writeLog("RELATIONAL ORDER ERROR: Panjang huruf cocok tetapi urutan kata belum memenuhi 5 Aturan Posisi!", "danger");
          }
        }
        writeLog("HINT: Buka Inspect Element (F12) untuk melihat petunjuk lengkap!", "warn");
      }, 400);
    });
  }

  // 7. VICTORY HANDLER (SHOWS OWNER CONGRATULATIONS CARD)
  function handleSuccess() {
    isCurrentWinner = true;
    localStorage.setItem("nexus_is_winner", "true");
    playVictoryFanfare();
    writeLog("ACCESS GRANTED! Seluruh 8 teka-teki kata & aturan posisi terpecahkan sempurna.", "success");
    if (passInput) {
      passInput.style.borderColor = "var(--accent-success)";
    }

    // Pastikan modal survei / banned / capacity tertutup agar kartu selamat terlihat jelas
    if (surveyModal) surveyModal.style.display = "none";
    if (bannedOverlay) bannedOverlay.style.display = "none";
    if (capacityBanner) capacityBanner.style.display = "none";

    // Populate Owner Letter from Config
    if (config && config.getActiveOwnerMessage) {
      const activeMsg = config.getActiveOwnerMessage(config.activeSession);
      const ownerTitleText = document.getElementById('ownerTitleText');
      const ownerBodyText = document.getElementById('ownerBodyText');
      const ownerAuthorText = document.getElementById('ownerAuthorText');
      if (ownerTitleText) ownerTitleText.textContent = activeMsg.title;
      if (ownerBodyText) ownerBodyText.textContent = activeMsg.body;
      if (ownerAuthorText) ownerAuthorText.textContent = activeMsg.author;
    }

    // Tampilkan kartu kemenangan dan gulir langsung ke atas
    if (formCard) formCard.style.display = "none";
    if (victoryCard) {
      victoryCard.style.display = "block";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    triggerSubtleConfetti();

    // Hitung mundur 20 detik (cukup waktu untuk membaca surat)
    let timeLeft = 20;
    const ownerCountdownSec = document.getElementById('ownerCountdownSec');
    if (ownerCountdownSec) ownerCountdownSec.textContent = timeLeft;

    if (window._ownerCountdownInterval) clearInterval(window._ownerCountdownInterval);
    window._ownerCountdownInterval = setInterval(() => {
      timeLeft--;
      if (ownerCountdownSec) ownerCountdownSec.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(window._ownerCountdownInterval);
        if (victoryCard) victoryCard.style.display = "none";
        openSurveyModal(true);
      }
    }, 1000);

    // Tombol untuk langsung lanjut kapan saja tanpa harus menunggu 20 detik
    const proceedToSurveyBtn = document.getElementById('proceedToSurveyBtn');
    if (proceedToSurveyBtn) {
      proceedToSurveyBtn.onclick = () => {
        if (window._ownerCountdownInterval) clearInterval(window._ownerCountdownInterval);
        if (victoryCard) victoryCard.style.display = "none";
        openSurveyModal(true);
      };
    }
  }

  function lockFormForCapacity() {
    if (isCurrentWinner || localStorage.getItem("nexus_is_winner") === "true") {
      return;
    }
    isLockedOut = true;
    if (capacityBanner) capacityBanner.style.display = "flex";
    if (passInput) {
      passInput.disabled = true;
      passInput.placeholder = "KAPASITAS 1/1 TELAH TERKUNCI OLEH PEMENANG...";
      passInput.style.borderColor = "#f59e0b";
    }
    if (clearBtn) clearBtn.disabled = true;
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
    writeLog("⚠️ SISTEM TERKUNCI: Kuota pemenang 1/1 telah berhasil diklaim.", "warn");

    // Jika bukan pemenang dan belum vote, langsung nyalakan modal vote!
    if (!isCurrentWinner) {
      const alreadyVoted = localStorage.getItem("nexus_survey_voted") === "true";
      if (!alreadyVoted && surveyModal) {
        openSurveyModal(false);
      }
    }
  }

  // 8. SURVEY MODAL & BANNED SCREEN HANDLERS
  const surveyModal = document.getElementById('surveyModal');
  const surveyForm = document.getElementById('surveyForm');
  const submitSurveyBtn = document.getElementById('submitSurveyBtn');
  const submitSurveyBtnText = document.getElementById('submitSurveyBtnText');
  const surveyIcon = document.getElementById('surveyIcon');
  const surveyTitle = document.getElementById('surveyTitle');
  const surveySubtitle = document.getElementById('surveySubtitle');
  let pendingBanInfo = null;
  let stopwatchInterval = null;

  function openSurveyModal(isWinnerUser = false) {
    if (!surveyModal) return;
    surveyModal.style.display = "flex";

    if (isWinnerUser) {
      if (surveyIcon) surveyIcon.textContent = "🏆";
      if (surveyTitle) surveyTitle.textContent = "TAHAP TERAKHIR: SURVEI & KLAIM GEMINI PRO";
      if (surveySubtitle) {
        surveySubtitle.textContent = "Selamat Juara! Satu langkah terakhir sebelum kamu dialihkan langsung ke link aktivasi Gemini Pro 18 Bulan Anda, mohon berikan 1 vote pendapatmu untuk tantangan CTF berikutnya:";
      }
      if (submitSurveyBtnText) {
        submitSurveyBtnText.textContent = "🚀 KIRIM VOTE & AMBIL GEMINI PRO 18 BULAN ➔";
      }
    } else {
      if (surveyIcon) surveyIcon.textContent = "🧩";
      if (surveyTitle) surveyTitle.textContent = "SURVEI CTF EPISODE 2";
      if (surveySubtitle) {
        surveySubtitle.textContent = "Permainan telah selesai dan hadiah Gemini Pro telah diklaim! Sebelum akses website ditutup selama 1 minggu, mohon berikan pendapat Anda untuk pembuatan tantangan CTF episode berikutnya:";
      }
      if (submitSurveyBtnText) {
        submitSurveyBtnText.textContent = "KIRIM VOTE & SELESAI";
      }
    }
  }

  function showBannedScreen(reason = null, expiry = null) {
    if (isCurrentWinner || localStorage.getItem("nexus_is_winner") === "true") {
      return;
    }
    pendingBanInfo = { reason, expiry };

    // Check if user has already voted in the survey
    const alreadyVoted = localStorage.getItem("nexus_survey_voted") === "true";
    if (!alreadyVoted && surveyModal && !isCurrentWinner) {
      openSurveyModal(false);
    } else {
      displayFinalBanOverlay();
    }
  }

  function startLiveStopwatch(expiryIso) {
    if (stopwatchInterval) clearInterval(stopwatchInterval);

    const targetDate = expiryIso ? new Date(expiryIso) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const bannedStopwatch = document.getElementById('bannedStopwatch');
    const bannedExpiry = document.getElementById('bannedExpiry');

    if (bannedExpiry) {
      bannedExpiry.textContent = "Berlaku hingga: " + targetDate.toLocaleString('id-ID');
    }

    function tick() {
      const now = Date.now();
      const diff = Math.max(0, targetDate.getTime() - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (bannedStopwatch) {
        bannedStopwatch.textContent = `${days} Hari, ${hours} Jam, ${minutes} Menit, ${seconds} Detik`;
      }
    }

    tick();
    stopwatchInterval = setInterval(tick, 1000);
  }

  function displayFinalBanOverlay() {
    if (isCurrentWinner || localStorage.getItem("nexus_is_winner") === "true") {
      return;
    }
    if (surveyModal) surveyModal.style.display = "none";
    if (bannedOverlay) {
      bannedOverlay.style.display = "flex";
      if (bannedReason && pendingBanInfo?.reason) {
        bannedReason.textContent = pendingBanInfo.reason;
      }
      startLiveStopwatch(pendingBanInfo?.expiry);
    }
  }

  // Survey Form Submission Handler (Handles Winner Redirect & Participant Lock)
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
        submitSurveyBtn.textContent = isCurrentWinner
          ? "⏳ Membuka Link Aktivasi Gemini Pro 18 Bulan..."
          : "⏳ Mengirim Vote...";
      }

      // 1. Submit vote to backend
      if (window.CTF_BACKEND) {
        await window.CTF_BACKEND.submitSurveyVote(answerKey, answerText);
      }

      // 2. Jika PEMENANG -> Langsung Trigger Mass Ban & Redirect ke Link Gemini Pro 18 Bulan!
      if (isCurrentWinner) {
        if (window.CTF_BACKEND) {
          window.CTF_BACKEND.triggerMassBan();
        }
        playVictoryFanfare();
        const redeemTarget = (config && config.getRedeemUrl)
          ? config.getRedeemUrl(config.activeSession)
          : (config?.geminiRedeemUrl || "https://g.co/play/redeem");
        writeLog("Membuka link aktivasi Gemini Pro 18 Bulan...", "success");
        setTimeout(() => {
          window.location.href = redeemTarget;
        }, 800);
        return;
      }

      // 3. Jika PESERTA BIASA -> Langsung Tampilkan Layar Banned 1 Minggu dengan Stopwatch!
      playVictoryFanfare();
      displayFinalBanOverlay();
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
  const adminSealBtn = document.getElementById('adminSealBtn');
  const adminWinnerCard = document.getElementById('adminWinnerCard');
  const adminWinnerClassText = document.getElementById('adminWinnerClassText');
  const adminWinnerIpText = document.getElementById('adminWinnerIpText');

  let currentSurveyData = null;
  let currentGameState = null;

  async function updateSurveyDashboard() {
    if (!window.CTF_BACKEND) return;
    
    // 1. Fetch survey results
    const data = await window.CTF_BACKEND.fetchSurveyResults();
    if (data) {
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

    // 2. Fetch CTF Game State for Winner details (Admin Eyes Only)
    const state = await window.CTF_BACKEND.fetchState();
    if (state) {
      currentGameState = state;
      if ((state.winner_claimed || state.winner_name) && adminWinnerCard) {
        adminWinnerCard.style.display = 'flex';
        const winClass = state.winner_class || (state.winner_name ? state.winner_name.replace('Peserta Kelas ', '').replace('Peserta ', '') : '9B');
        if (adminWinnerClassText) {
          adminWinnerClassText.textContent = `KELAS: ${winClass}`;
        }
        if (adminWinnerIpText) {
          const timeStr = state.updated_at ? new Date(state.updated_at).toLocaleTimeString('id-ID') : '';
          adminWinnerIpText.textContent = `IP: ${state.winner_ip || '-'} ${timeStr ? '• ' + timeStr + ' WIB' : ''}`;
        }
      } else if (adminWinnerCard) {
        adminWinnerCard.style.display = 'none';
      }
    }
  }

  // ADMIN PANEL MINIMIZE / EXPAND TOGGLE
  const toggleAdminViewBtn = document.getElementById('toggleAdminViewBtn');
  const adminPanelBody = document.getElementById('adminPanelBody');

  if (toggleAdminViewBtn && adminPanelBody) {
    toggleAdminViewBtn.addEventListener('click', () => {
      playKeyClick();
      const isCollapsed = adminPanelBody.style.display === 'none';
      adminPanelBody.style.display = isCollapsed ? 'flex' : 'none';
      toggleAdminViewBtn.textContent = isCollapsed ? '−' : '+';
      toggleAdminViewBtn.title = isCollapsed ? 'Minimize Box' : 'Expand Box';
    });
  }

  // Admin Seal Token Action
  if (adminSealBtn) {
    adminSealBtn.addEventListener('click', () => {
      playKeyClick();
      if (confirm('Apakah Anda ingin keluar dari mode Admin dan mengunci kembali token sesi ini?')) {
        window.CTF_BACKEND.sealAdmin();
      }
    });
  }

  if (copyReportBtn) {
    copyReportBtn.addEventListener('click', () => {
      playKeyClick();
      if (!currentSurveyData) {
        alert("Belum ada data vote yang termuat.");
        return;
      }

      const d = currentSurveyData;
      const s = currentGameState;
      const winClass = s?.winner_class || (s?.winner_name ? s.winner_name.replace('Peserta Kelas ', '').replace('Peserta ', '') : null);

      const reportText = [
        "==================================================",
        "📊 LAPORAN RESMI CTF 2026 (HASIL VOTE & PEMENANG)",
        "==================================================",
        s?.winner_claimed ? `🏆 PEMENANG GEMINI PRO: KELAS ${winClass || '9B'}` : "🏆 STATUS PEMENANG     : Belum Ada Pemenang",
        s?.winner_ip ? `🌐 IP ADDRESS PEMENANG : ${s.winner_ip}` : "",
        "--------------------------------------------------",
        `Total Responden Vote  : ${d.total} Siswa`,
        `Pilihan Dominan Survei: ${d.dominant.label} (${d.dominant.percentage}%)`,
        "",
        "Rincian Perolehan Suara Survei:",
        `1. ⚡ Iya, persulit                   : ${d.counts.HARDER} vote (${d.percentages.HARDER}%)`,
        `2. 🎯 Tidak, lanjutkan                : ${d.counts.CONTINUE_SAME} vote (${d.percentages.CONTINUE_SAME}%)`,
        `3. 🛑 Tidak, saya tidak suka CTF, stop : ${d.counts.DISLIKE_STOP} vote (${d.percentages.DISLIKE_STOP}%)`,
        "==================================================",
        "Laporan siap dikirim ke AI untuk perencanaan CTF selanjutnya!"
      ].filter(Boolean).join("\n");

      navigator.clipboard.writeText(reportText).then(() => {
        alert("📋 Laporan Hasil Vote & Pemenang berhasil disalin ke clipboard! Anda bisa langsung menempelkannya (Ctrl+V) ke chat!");
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

  // Admin Switch Session Action (Ikhwan <-> Akhwat)
  const adminSwitchSessionBtn = document.getElementById('adminSwitchSessionBtn');
  if (adminSwitchSessionBtn) {
    adminSwitchSessionBtn.addEventListener('click', async () => {
      playKeyClick();
      const currentState = await window.CTF_BACKEND.fetchState();
      const currentType = window.CTF_BACKEND.getSessionType(currentState);
      const targetType = currentType === 'ikhwan' ? 'akhwat' : 'ikhwan';
      const targetLabel = targetType === 'akhwat' ? 'AKHWAT (PUTRI)' : 'IKHWAN (PUTRA)';

      const confirmSwitch = confirm(
        `Apakah Anda yakin ingin switch ke ${targetLabel}?\n\n` +
        `Sistem akan mengubah puzzle teka-teki kata & aturan posisi menjadi edisi ${targetLabel}, serta mereset status ban untuk sesi ini.`
      );
      if (!confirmSwitch) return;

      adminSwitchSessionBtn.disabled = true;
      adminSwitchSessionBtn.textContent = '⏳ Mengalihkan Sesi...';
      const res = await window.CTF_BACKEND.switchSession(targetType);
      adminSwitchSessionBtn.disabled = false;

      if (res.success) {
        playVictoryFanfare();
        loadSessionPuzzle(targetType);
        alert(`✅ Berhasil beralih ke ${targetLabel}!\nPuzzle kata Gateway sekarang aktif untuk ${targetLabel}.`);
        updateSurveyDashboard();
      } else {
        alert('Gagal switch sesi: ' + (res.error || 'Terjadi kesalahan'));
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
      const isWinner = isCurrentWinner || localStorage.getItem("nexus_is_winner") === "true";
      if (res && res.banned && !isWinner) {
        showBannedScreen(res.ban_reason, res.banned_until);
      }
      if (res && res.winner_claimed && !isWinner) {
        lockFormForCapacity();
      }
    });

    // 2. Check Initial State
    window.CTF_BACKEND.fetchState().then(state => {
      if (state) {
        const sType = window.CTF_BACKEND.getSessionType(state);
        loadSessionPuzzle(sType);
      }
      const isWinner = isCurrentWinner || localStorage.getItem("nexus_is_winner") === "true";
      if (isWinner) {
        handleSuccess();
        return;
      }
      if (state && (state.winner_claimed || state.winner_name) && !isWinner) {
        lockFormForCapacity();
      }
      if (state && state.ban_triggered_at && !isWinner) {
        const banExp = new Date(new Date(state.ban_triggered_at).getTime() + 7 * 24 * 60 * 60 * 1000);
        if (Date.now() < banExp.getTime()) {
          showBannedScreen(
            "Sesi kompetisi ini telah selesai dan hadiah Gemini Pro telah diklaim. Akses Anda telah di-ban selama 1 minggu di Website 1 (Portal) & Website 2 (Gateway).",
            banExp.toISOString()
          );
        }
      }
    });

    // 3. Realtime Listener
    window.CTF_BACKEND.subscribeToUpdates(
      // On ctf_state change
      (state) => {
        if (state) {
          const sType = window.CTF_BACKEND.getSessionType(state);
          loadSessionPuzzle(sType);
        }
        const isWinner = isCurrentWinner || localStorage.getItem("nexus_is_winner") === "true";
        if (state && (state.winner_claimed || state.winner_name) && !isWinner) {
          lockFormForCapacity();
        }
        if (state && state.ban_triggered_at && !isWinner) {
          const banExp = new Date(new Date(state.ban_triggered_at).getTime() + 7 * 24 * 60 * 60 * 1000);
          if (Date.now() < banExp.getTime()) {
            showBannedScreen(
              "Sesi kompetisi ini telah selesai dan hadiah Gemini Pro telah diklaim. Akses Anda telah di-ban selama 1 minggu di Website 1 (Portal) & Website 2 (Gateway).",
              banExp.toISOString()
            );
          }
        } else if (state && !state.ban_triggered_at && !state.winner_claimed) {
          // Admin me-reset sesi -> Buka kunci & bersihkan status pemenang lama
          isCurrentWinner = false;
          localStorage.removeItem("nexus_is_winner");
          if (window._ownerCountdownInterval) clearInterval(window._ownerCountdownInterval);
          if (victoryCard) victoryCard.style.display = "none";
          if (formCard) formCard.style.display = "block";
          if (stopwatchInterval) clearInterval(stopwatchInterval);
          if (bannedOverlay) bannedOverlay.style.display = "none";
          if (surveyModal) surveyModal.style.display = "none";
          if (capacityBanner) capacityBanner.style.display = "none";
          isLockedOut = false;
          if (passInput) {
            passInput.disabled = false;
            passInput.placeholder = "Ketik jawaban Anda di sini...";
            passInput.style.borderColor = "";
          }
          if (clearBtn) clearBtn.disabled = false;
          if (submitBtn) {
            submitBtn.classList.remove("disabled");
            submitBtn.disabled = false;
          }
          if (submitBolt) submitBolt.textContent = "⚡";
          if (submitBtnText) submitBtnText.textContent = "MASUKKAN JAWABAN";
        }
      },
      // On ctf_participants change
      (participantPayload) => {
        const record = participantPayload.new;
        const isWinner = isCurrentWinner || localStorage.getItem("nexus_is_winner") === "true";
        if (record && !isWinner) {
          // Check if this matches current client IP
          window.CTF_BACKEND.getClientIP().then(myIp => {
            if (record.ip_address === myIp) {
              if (record.is_banned) {
                showBannedScreen(record.ban_reason, record.banned_until);
              } else {
                if (stopwatchInterval) clearInterval(stopwatchInterval);
                if (bannedOverlay) bannedOverlay.style.display = "none";
              }
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

      if (document.body) {
        document.body.appendChild(p);
      }

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
