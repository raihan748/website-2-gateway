/**
 * ====================================================================
 * APP.JS - CORE LOGIC FOR WEBSITE 2 GATEWAY & HONEYPOT VERIFICATION
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Matrix Background Effect
  initMatrixEffect();

  // 2. Elements
  const authForm = document.getElementById('authForm');
  const passInput = document.getElementById('passInput');
  const terminalLog = document.getElementById('terminalLog');
  const formCard = document.getElementById('formCard');
  const victoryCard = document.getElementById('victoryCard');
  const redeemBtn = document.getElementById('redeemBtn');

  // Load config redeem link
  const config = window.CTF_CONFIG || {
    geminiRedeemUrl: "https://g.co/play/redeem?code=DEFAULT",
    rawHoneypotString: "PRO-PRO-PRO-GEMINI-PREMIUM-POWER-NEXUS-ACTIVATE",
    correctPassword: "GEMINI-PREMIUM-PRO-POWER-NEXUS-ACTIVATE"
  };

  redeemBtn.href = config.geminiRedeemUrl;

  let attemptCount = 0;
  let isCooldown = false;

  // Anti-paste detection
  passInput.addEventListener('paste', (e) => {
    writeLog("⚠️ DETECTED PASTE OPERATION: Analyzing clipboard content...", "warn");
    setTimeout(() => {
      writeLog("⚠️ SYSTEM ALERT: Copy-pasting is not recommended for security reasons.", "danger");
    }, 500);
  });

  // FAKE WINDOW FUNCTIONS (HONEYPOTS)
  window.adminUnlock = function() {
    console.error("[SECURITY BREACH DETECTED] Attempted to invoke window.adminUnlock()");
    writeLog("❌ HONEYPOT TRIGGERED: Fake window.adminUnlock() invoked!", "danger");
    return "Nice try, hacker. This function is a honeypot.";
  };

  window.bypassAuth = function() {
    console.error("[SECURITY BREACH DETECTED] Attempted to invoke window.bypassAuth()");
    writeLog("❌ HONEYPOT TRIGGERED: Fake window.bypassAuth() invoked!", "danger");
    return "Bypass failed. You've been logged.";
  };

  // 3. Form Submit Listener
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isCooldown) {
      writeLog("⛔ SYSTEM LOCKDOWN IN EFFECT. Please wait.", "danger");
      shakeInput();
      return;
    }

    const userInput = passInput.value.trim();

    if (!userInput) {
      writeLog("⚠️ Harap masukkan Access Key!", "warn");
      return;
    }

    writeLog("🔍 Analyzing Access Key stream...", "log");

    setTimeout(() => {
      // Normalisasi input
      const normalizedInput = userInput.toUpperCase().replace(/\s+/g, '-');
      const rawUserInput = userInput;
      const normalizedHoneypot = config.rawHoneypotString.toUpperCase().replace(/\s+/g, '-');
      const normalizedCorrect = config.correctPassword.toUpperCase().replace(/\s+/g, '-');

      // Honeypots
      const trapAdminOverride = "NEXUS-PRO-GEMINI-ACTIVATE-PREMIUM-POWER";
      const trapBackupRecovery = "PREMIUM-GEMINI-PRO-NEXUS-POWER-ACTIVATE";
      const trapLowercase = "gemini-premium-pro-power-nexus-activate";
      const trapLegacy = "PRO-GEMINI-PREMIUM-POWER-NEXUS-ACTIVATE";
      const trapReverse = "ACTIVATE-NEXUS-POWER-PRO-PREMIUM-GEMINI";

      // CASE 1: TRAP LOWERCASE EXACT MATCH
      if (rawUserInput === trapLowercase) {
        writeLog("❌ HONEYPOT TRIGGERED [CASE-SENSITIVITY TRAP]!", "danger");
        writeLog("⚠️ Kunci harus selalu UPPERCASE! Anda jatuh ke jebakan DEV DEBUG.", "warn");
        handleWrongAttempt();
        return;
      }

      // CASE 2: RAW HONEYPOT TRAP
      if (normalizedInput === normalizedHoneypot) {
        writeLog("❌ HONEYPOT TRIGGERED [RAW STREAM TRAP]!", "danger");
        writeLog("⚠️ Anda menyalin string mentah! Kata-katanya harus diolah & disusun kembali!", "warn");
        handleWrongAttempt();
        return;
      }

      // CASE 3: OTHER TRAPS
      if (normalizedInput === trapAdminOverride) {
        writeLog("❌ HONEYPOT TRIGGERED [ADMIN OVERRIDE FAKE]!", "danger");
        writeLog("⚠️ Anda tertipu oleh komentar HTML yang menyesatkan! Susun ulang formulanya.", "warn");
        handleWrongAttempt();
        return;
      }

      if (normalizedInput === trapBackupRecovery) {
        writeLog("❌ HONEYPOT TRIGGERED [BACKUP RECOVERY DECOY]!", "danger");
        writeLog("⚠️ Config palsu terdeteksi. Jangan mudah percaya komentar di HTML!", "warn");
        handleWrongAttempt();
        return;
      }

      if (normalizedInput === trapLegacy) {
        writeLog("❌ HONEYPOT TRIGGERED [LEGACY ACCESS TRAP]!", "danger");
        writeLog("⚠️ Jangan mengekstrak value dari hidden input secara mentah-mentah!", "warn");
        handleWrongAttempt();
        return;
      }

      if (normalizedInput === trapReverse) {
        writeLog("❌ HONEYPOT TRIGGERED [REVERSE ORDER TRAP]!", "danger");
        writeLog("⚠️ Susunan terbalik! Anda pasti mengambil dari Emergency Bypass.", "warn");
        handleWrongAttempt();
        return;
      }

      // CASE 4: CORRECT PASSWORD (Sudah diolah kata demi kata)
      if (normalizedInput === normalizedCorrect && rawUserInput !== trapLowercase) {
        writeLog("✅ ACCESS GRANTED! Vault cipher decrypted successfully.", "success");
        passInput.style.borderColor = "var(--green-pop)";
        
        setTimeout(() => {
          formCard.style.display = "none";
          victoryCard.style.display = "block";
          triggerConfetti();
        }, 1200);
        return;
      }

      // CASE 5: WRONG PASSWORD
      writeLog("❌ INVALID PASSCODE! Access Denied.", "danger");
      handleWrongAttempt();

    }, 500);
  });

  function handleWrongAttempt() {
    passInput.style.borderColor = "var(--pink-pop)";
    shakeInput();
    attemptCount++;

    if (attemptCount >= 5) {
      isCooldown = true;
      writeLog("⛔ MAXIMUM ATTEMPTS REACHED. INITIATING COOLDOWN...", "danger");
      passInput.disabled = true;
      let secondsLeft = 10;
      
      const countdownInterval = setInterval(() => {
        if (secondsLeft > 0) {
          writeLog(`⛔ SYSTEM LOCKED. Retry available in ${secondsLeft}s`, "danger");
          secondsLeft--;
        } else {
          clearInterval(countdownInterval);
          isCooldown = false;
          attemptCount = 0;
          passInput.disabled = false;
          passInput.value = "";
          writeLog("🟢 SYSTEM UNLOCKED. You may try again.", "success");
        }
      }, 1000);
    }
  }

  // Helper Functions
  function writeLog(msg, type = "log") {
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    if (type === 'danger') {
      line.style.color = 'red';
      line.style.fontWeight = 'bold';
    }
    line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    terminalLog.appendChild(line);
    terminalLog.scrollTop = terminalLog.scrollHeight;
  }

  function shakeInput() {
    passInput.animate([
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' }
    ], {
      duration: 400,
      easing: 'ease-in-out'
    });
  }

  // Matrix Rain Canvas Animation
  function initMatrixEffect() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(13, 15, 23, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00f0ff';
      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 33);
  }

  // Confetti Animation on Win
  function triggerConfetti() {
    const colors = ['#00f0ff', '#ff007a', '#ffe600', '#00ff66', '#ffffff'];
    for (let i = 0; i < 70; i++) {
      const p = document.createElement('div');
      p.style.position = 'fixed';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = '-10px';
      p.style.width = Math.random() * 10 + 6 + 'px';
      p.style.height = Math.random() * 16 + 8 + 'px';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.border = '2px solid #000';
      p.style.borderRadius = '3px';
      p.style.zIndex = '999';
      p.style.pointerEvents = 'none';
      document.body.appendChild(p);

      const duration = Math.random() * 2 + 2;
      p.animate([
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(105vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });

      setTimeout(() => p.remove(), duration * 1000);
    }
  }
});
