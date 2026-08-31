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

  if (redeemBtn) {
    redeemBtn.href = config.geminiRedeemUrl;
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

  // 7. SUBMISSION & DETECTIVE LOGIC VERIFICATION
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userInput = passInput ? passInput.value.trim() : '';
      if (!userInput) {
        writeLog("Harap masukkan 8-Slot Master Formula Key!", "warn");
        return;
      }

      writeLog("Menguji deret kata terhadap 5 Aturan Posisi Logic Grid...", "info");
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
        const normalizedInput = userInput.toUpperCase().replace(/\s+/g, '-');
        const normalizedCorrect = config.correctPassword.toUpperCase().replace(/\s+/g, '-');

        // Check if matches the 8-token Master Password
        if (normalizedInput === normalizedCorrect) {
          handleSuccess();
          return;
        }

        // Check length and give constructive hints
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
    }, 600);
  }

  // 8. HELPER LOG & SHAKE
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

  // 9. AMBIENT MATRIX CANVAS (SUBTLE)
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

  // 10. SUBTLE VICTORY CONFETTI
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
