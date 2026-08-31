/**
 * ====================================================================
 * CONFIG.JS - KONFIGURASI LOGIC GRID PUZZLE WEBSITE 2 GATEWAY
 * ====================================================================
 * Master Configuration for Detective Logic Grid CTF Stage 2
 */

window.CTF_CONFIG = {
  // [CUSTOMIZE] Link Redeem Hadiah Gemini Pro (Ganti dengan link Anda kapan saja):
  geminiRedeemUrl: "https://g.co/play/redeem?code=GEMINI_PRO_REWARD_CLAIM",

  // [CUSTOMIZE] Sumber Video Ucapan Selamat (Ganti dengan file lokal 'congrats.mp4' atau URL video online):
  videoSource: "congrats.mp4",

  // Judul Event:
  eventTitle: "NEXUS CYBER GATEWAY v5.0 - DETECTIVE LOGIC EDITION",
  vaultName: "Gemini Pro Vault Portal",

  // 16 Word Pool (Kata Campuran & Terenkripsi):
  scrambledPool: [
    "INIMEG", "SOHPLXP", "PRO", "POWER", "NEXUS", "QUANTUM", "CIPHER", "ACTIVATE",
    "MATRIX", "VECTOR", "SHIELD", "BINARY", "KERNEL", "VORTEX", "NEURON", "BEACON"
  ],

  // Formula Kunci Valid Hasil Pecahkan Logic Grid:
  // [GEMINI] - [PREMIUM] - [PRO] - [POWER] - [NEXUS] - [QUANTUM] - [CIPHER] - [ACTIVATE]
  correctPassword: "GEMINI-PREMIUM-PRO-POWER-NEXUS-QUANTUM-CIPHER-ACTIVATE",

  // Expected Word Length Sequence:
  expectedLengths: [6, 7, 3, 5, 5, 7, 6, 8]
};

