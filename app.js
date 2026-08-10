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

  // 3. Form Submit Listener
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = passInput.value.trim();

    if (!userInput) {
      writeLog("⚠️ Harap masukkan Access Key!", "warn");
      return;
    }

    writeLog("🔍 Analyzing Access Key stream...", "log");

    setTimeout(() => {
      // Normalisasi input
      const normalizedInput = userInput.toUpperCase().replace(/\s+/g, '-');
      const normalizedHoneypot = config.rawHoneypotString.toUpperCase().replace(/\s+/g, '-');
      const normalizedCorrect = config.correctPassword.toUpperCase().replace(/\s+/g, '-');

      // CASE 1: HONEYPOT TRAP (Menyalin raw string mentah-mentah)
      if (normalizedInput === normalizedHoneypot) {
        writeLog("❌ HONEYPOT TRIGGERED!", "danger");
        setTimeout(() => {
          writeLog("⚠️ Anda menyalin string mentah dari Inspect Element! Kata-katanya harus diolah & disusun kembali sesuai petunjuk!", "warn");
        }, 600);
        passInput.style.borderColor = "var(--pink-pop)";
        shakeInput();
        return;
      }

      // CASE 2: CORRECT PASSWORD (Sudah diolah kata demi kata)
      if (normalizedInput === normalizedCorrect) {
        writeLog("✅ ACCESS GRANTED! Vault cipher decrypted successfully.", "success");
        passInput.style.borderColor = "var(--green-pop)";
        
        setTimeout(() => {
          formCard.style.display = "none";
          victoryCard.style.display = "block";
          triggerConfetti();
        }, 1200);
        return;
      }

      // CASE 3: WRONG PASSWORD
      writeLog("❌ INVALID PASSCODE! Access Denied.", "danger");
      passInput.style.borderColor = "var(--pink-pop)";
      shakeInput();

    }, 500);
  });

  // Helper Functions
  function writeLog(msg, type = "log") {
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
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
