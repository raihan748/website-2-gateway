/**
 * ====================================================================
 * APP.JS - NEXUS CYBER GATEWAY 8-SLOT WORD PUZZLE ENGINE v5.0
 * ====================================================================
 * Features:
 * 1. 8-Slot Real-Time Formula Matrix HUD
 * 2. Polyphonic Web Audio API Synthesizer (Key clicks & Victory fanfare)
 * 3. 3-State Dynamic Theme Switcher (Cyber / Matrix / Synth)
 * 4. Dual-Stream Matrix Rain Canvas
 * 5. Holographic Victory Unboxing & Confetti
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

  function playErrorBeep() {
    playTone(280, 'sawtooth', 0.15, 0.12);
    setTimeout(() => playTone(220, 'sawtooth', 0.18, 0.12), 140);
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
    geminiRedeemUrl: "https://g.co/play/redeem?code=GEMINI_PRO_REWARD_CLAIM",
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
  const formulaCount = document.getElementById('formulaCount');

  redeemBtn.href = config.geminiRedeemUrl;

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
    const tokens = val.toUpperCase().split(/[-_\s]+/).map(t => t.trim()).filter(Boolean);
    let locked = 0;

    chips.forEach(({ el, word }) => {
      const isPresent = tokens.includes(word);
      el.classList.toggle('active', isPresent);
      if (isPresent) locked++;
    });

    formulaCount.textContent = `${locked} / 8 ASSEMBLED`;
    formulaCount.style.color = locked === 8 ? 'var(--green-pop)' : 'var(--yellow-pop)';
  }

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

  // 6. SUBMISSION & PURE PUZZLE VERIFICATION (NO HONEYPOT LOCKOUT)
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userInput = passInput.value.trim();
    if (!userInput) {
      writeLog("⚠️ Harap masukkan 8-Slot Master Formula Key!", "warn");
      return;
    }

    writeLog("🔍 Validating 8-Slot syntactic hierarchy...", "info");
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.disabled = false;
      const normalizedInput = userInput.toUpperCase().replace(/\s+/g, '-');
      const normalizedCorrect = config.correctPassword.toUpperCase().replace(/\s+/g, '-');

      // Check if matches the 8-token Master Password
      if (normalizedInput === normalizedCorrect) {
        handleSuccess();
        return;
      }

      // Check length and give intelligent constructive hints
      const inputTokens = normalizedInput.split('-');
      playErrorBeep();
      passInput.style.borderColor = "var(--pink-pop)";
      shakeElement(formCard);

      if (inputTokens.length !== 8) {
        writeLog(`❌ INVALID WORD COUNT: Terdeteksi ${inputTokens.length} kata (Dibutuhkan tepat 8 kata dipisah strip).`, "danger");
      } else {
        writeLog("❌ SEQUENCE MISMATCH: 8 kata terdeteksi tapi urutannya belum sesuai hierarki semantik.", "danger");
      }
      writeLog("💡 HINT: Buka Inspect Element (F12) -> Lihat 'Panduan Lengkap & Petunjuk Olah Kata'!", "warn");
    }, 450);
  });

  function handleSuccess() {
    playVictoryFanfare();
    writeLog("✅ ACCESS GRANTED! 8-Slot Master Formula matched perfectly.", "success");
    passInput.style.borderColor = "var(--green-pop)";

    setTimeout(() => {
      formCard.style.display = "none";
      victoryCard.style.display = "block";
      triggerMegaConfetti();
    }, 800);
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
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(0)' }
    ], {
      duration: 300,
      easing: 'ease-in-out'
    });
  }

  // 8. DUAL-STREAM NEON MATRIX CANVAS
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

  // 9. MEGA CONFETTI EXPLOSION
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
