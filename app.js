/**
 * ====================================================================
 * APP.JS - NEXUS CYBER GATEWAY 1000x GAME ENGINE v5.0
 * ====================================================================
 * Features:
 * 1. Dual-Stream Matrix Rain Canvas (Cyan, Magenta & Gold drops)
 * 2. Polyphonic Web Audio API Synthesizer (Key clicks, alarms, fanfare)
 * 3. Custom Cyber Crosshair Reticle Cursor
 * 4. 3-State Theme Engine (Cyber / Matrix / Synth)
 * 5. Real-Time Dynamic Formula Matrix HUD Tracker
 * 6. Honeypot Anti-Tamper & Security Lockdown Cooldown
 * 7. Mega Holographic Victory Unboxing & Multi-Layer Confetti
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. POLYPHONIC WEB AUDIO SYNTHESIZER
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

  function playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.12, decay = true) {
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
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      }

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playKeyClick() {
    playTone(1300 + Math.random() * 500, 'triangle', 0.02, 0.08);
  }

  function playLaserSweep() {
    if (!sfxEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  }

  function playAlarmSound() {
    playTone(440, 'sawtooth', 0.15, 0.15);
    setTimeout(() => playTone(330, 'sawtooth', 0.15, 0.15), 150);
    setTimeout(() => playTone(440, 'sawtooth', 0.15, 0.15), 300);
    setTimeout(() => playTone(330, 'sawtooth', 0.15, 0.15), 450);
  }

  function playVictoryFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'triangle', 0.28, 0.14), idx * 95);
    });
  }

  // Sound Toggle
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');

  soundToggleBtn.addEventListener('click', () => {
    initAudio();
    sfxEnabled = !sfxEnabled;
    if (sfxEnabled) {
      soundIcon.textContent = '🔊';
      soundLabel.textContent = 'SFX: ON';
      soundToggleBtn.style.borderColor = 'var(--pink-pop)';
      playVictoryFanfare();
    } else {
      soundIcon.textContent = '🔇';
      soundLabel.textContent = 'SFX: OFF';
      soundToggleBtn.style.borderColor = '#555';
    }
  });

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

  // 3. CUSTOM CYBER CURSOR
  const cursor = document.getElementById('cyberCursor');
  const cursorDot = document.getElementById('cursorDot');

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
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  document.querySelectorAll('a, button, input').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      playTone(1100, 'sine', 0.02, 0.04);
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

  // 4. CONFIG & DOM ELEMENTS
  const config = window.CTF_CONFIG || {
    geminiRedeemUrl: "https://g.co/play/redeem?code=DEFAULT",
    rawHoneypotString: "PRO-PRO-PRO-GEMINI-PREMIUM-POWER-NEXUS-ACTIVATE",
    correctPassword: "GEMINI-PREMIUM-PRO-POWER-NEXUS-ACTIVATE"
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
  const formulaCount = document.getElementById('formulaCount');

  redeemBtn.href = config.geminiRedeemUrl;

  // Formula Chips
  const chipBrand = document.getElementById('chip-brand');
  const chipSpec = document.getElementById('chip-spec');
  const chipTier = document.getElementById('chip-tier');
  const chipStatus = document.getElementById('chip-status');
  const chipSys = document.getElementById('chip-sys');
  const chipAct = document.getElementById('chip-act');

  clearBtn.addEventListener('click', () => {
    passInput.value = '';
    passInput.focus();
    updateFormulaHUD('');
    playKeyClick();
  });

  clearTermBtn.addEventListener('click', () => {
    logContent.innerHTML = '';
    writeLog("Terminal buffer cleared.", "info");
    playKeyClick();
  });

  passInput.addEventListener('input', (e) => {
    playKeyClick();
    updateFormulaHUD(e.target.value);
  });

  function updateFormulaHUD(val) {
    const upper = val.toUpperCase();
    const c1 = upper.includes('GEMINI');
    const c2 = upper.includes('PREMIUM');
    const c3 = upper.includes('PRO');
    const c4 = upper.includes('POWER');
    const c5 = upper.includes('NEXUS');
    const c6 = upper.includes('ACTIVATE');

    chipBrand.classList.toggle('active', c1);
    chipSpec.classList.toggle('active', c2);
    chipTier.classList.toggle('active', c3);
    chipStatus.classList.toggle('active', c4);
    chipSys.classList.toggle('active', c5);
    chipAct.classList.toggle('active', c6);

    const locked = [c1, c2, c3, c4, c5, c6].filter(Boolean).length;
    formulaCount.textContent = `${locked} / 6 LOCKED`;
    formulaCount.style.color = locked === 6 ? 'var(--green-pop)' : 'var(--yellow-pop)';
  }

  passInput.addEventListener('paste', () => {
    writeLog("⚠️ CLIPBOARD INTERCEPT: Pasted input stream detected.", "warn");
  });

  // 5. 3D CARD TILT PHYSICS
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      const targetCard = formCard.style.display === 'none' ? victoryCard : formCard;
      targetCard.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    document.addEventListener('mouseleave', () => {
      formCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
      victoryCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  }

  // 6. SUBMISSION & HONEYPOT VERIFICATION
  let failedAttempts = 0;
  let isCooldown = false;

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isCooldown) {
      writeLog("⏳ COOLDOWN ACTIVE: Mohon tunggu sebelum mencoba kembali!", "danger");
      return;
    }

    const userInput = passInput.value.trim();
    if (!userInput) {
      writeLog("⚠️ Harap masukkan Access Key!", "warn");
      return;
    }

    writeLog("🔍 Parsing & analyzing token sequence against security hash...", "info");
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.disabled = false;
      const normalizedInput = userInput.toUpperCase().replace(/\s+/g, '-');
      const normalizedHoneypot = config.rawHoneypotString.toUpperCase().replace(/\s+/g, '-');
      const normalizedCorrect = config.correctPassword.toUpperCase().replace(/\s+/g, '-');

      // CASE 1: RAW HONEYPOT TRAP
      if (normalizedInput === normalizedHoneypot) {
        handleHoneypotTrigger("❌ HONEYPOT TRIGGERED! Anda menyalin raw stream tanpa deduplikasi kata!");
        return;
      }

      // CASE 2: DECOY PASSWORDS
      const decoyPasswords = [
        "NEXUS-PRO-GEMINI-ACTIVATE-PREMIUM-POWER",
        "PREMIUM-GEMINI-PRO-NEXUS-POWER-ACTIVATE",
        "gemini-premium-pro-power-nexus-activate",
        "PRO-GEMINI-PREMIUM-POWER-NEXUS-ACTIVATE",
        "ACTIVATE-NEXUS-POWER-PRO-PREMIUM-GEMINI"
      ].map(p => p.toUpperCase().replace(/\s+/g, '-'));

      if (decoyPasswords.includes(normalizedInput)) {
        handleHoneypotTrigger("❌ DECOY TRAP! Urutan kata tidak sesuai formula [BRAND]-[SPEC]-[TIER]-[STATUS]-[SYS]-[ACTION]!");
        return;
      }

      // CASE 3: CORRECT MASTER PASSWORD
      if (normalizedInput === normalizedCorrect) {
        handleSuccess();
        return;
      }

      // CASE 4: GENERIC WRONG PASSCODE
      failedAttempts++;
      playAlarmSound();
      writeLog(`❌ INVALID ACCESS KEY! Access Denied (Attempt ${failedAttempts}).`, "danger");
      passInput.style.borderColor = "var(--pink-pop)";
      shakeElement(formCard);

      if (failedAttempts >= 5) {
        startCooldown(10);
      }
    }, 550);
  });

  function handleHoneypotTrigger(message) {
    playAlarmSound();
    writeLog(message, "danger");
    writeLog("💡 HINT: Hapus kata duplikat dan susun kata: GEMINI -> PREMIUM -> PRO -> POWER -> NEXUS -> ACTIVATE", "warn");
    passInput.style.borderColor = "var(--pink-pop)";
    shakeElement(formCard);
  }

  function handleSuccess() {
    playVictoryFanfare();
    writeLog("✅ ACCESS GRANTED! Master Vault unlocked successfully.", "success");
    passInput.style.borderColor = "var(--green-pop)";

    setTimeout(() => {
      formCard.style.display = "none";
      victoryCard.style.display = "block";
      triggerMegaConfetti();
    }, 900);
  }

  function startCooldown(seconds) {
    isCooldown = true;
    let remaining = seconds;
    passInput.disabled = true;
    submitBtn.disabled = true;

    const interval = setInterval(() => {
      writeLog(`🚨 SECURITY LOCKDOWN: Cooldown active (${remaining}s)...`, "danger");
      remaining--;
      if (remaining < 0) {
        clearInterval(interval);
        isCooldown = false;
        failedAttempts = 0;
        passInput.disabled = false;
        submitBtn.disabled = false;
        writeLog("🟢 Security lockdown cleared. Ready for input.", "info");
      }
    }, 1000);
  }

  // 7. HELPER LOG & SHAKE
  function writeLog(msg, type = "info") {
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logContent.appendChild(line);
    logContent.scrollTop = logContent.scrollHeight;
  }

  function shakeElement(el) {
    el.animate([
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' }
    ], {
      duration: 350,
      easing: 'ease-in-out'
    });
  }

  // 8. FAKE GLOBAL BYPASS HONEYPOTS
  window.adminUnlock = function() {
    writeLog("⚠️ HONEYPOT ALERT: adminUnlock() is a fake bypass console hook!", "danger");
    return "BLOCKED";
  };
  window.bypassAuth = function() {
    writeLog("⚠️ HONEYPOT ALERT: bypassAuth() trap triggered!", "danger");
    return "BLOCKED";
  };

  // 9. DUAL-STREAM NEON MATRIX CANVAS
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/=+-';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(6, 8, 19, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillStyle = i % 3 === 0 ? '#ff007a' : (i % 7 === 0 ? '#ffe600' : '#00f0ff');
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 33);
  }

  // 10. MEGA CONFETTI EXPLOSION
  function triggerMegaConfetti() {
    const colors = ['#00f0ff', '#ff007a', '#ffe600', '#00ff66', '#ffffff', '#b55fe6', '#ffbe0b'];
    for (let i = 0; i < 110; i++) {
      const p = document.createElement('div');
      p.style.position = 'fixed';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = '-15px';
      p.style.width = Math.random() * 12 + 6 + 'px';
      p.style.height = Math.random() * 18 + 8 + 'px';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.border = '2px solid #000';
      p.style.borderRadius = '3px';
      p.style.zIndex = '9999';
      p.style.pointerEvents = 'none';

      document.body.appendChild(p);

      const fallDuration = Math.random() * 3.5 + 2.5;
      const rotationSpeed = Math.random() * 800 - 400;

      p.animate([
        { transform: 'translateY(0vh) rotate(0deg)', opacity: 1 },
        { transform: `translateY(105vh) rotate(${rotationSpeed}deg)`, opacity: 0.15 }
      ], {
        duration: fallDuration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => p.remove();
    }
  }
});
