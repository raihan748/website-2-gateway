/**
 * ====================================================================
 * CONFIG.JS - KONFIGURASI ADMIN CTF WEBSITE 2 GATEWAY
 * ====================================================================
 * Silakan ganti link di bawah ini sebelum event CTF dimulai.
 * Masukkan link redeem resmi / voucher Gemini Pro Anda.
 */

window.CTF_CONFIG = {
  // LINK REDEEM GEMINI PRO (Ganti string di bawah ini):
  geminiRedeemUrl: "https://g.co/play/redeem?code=YOUR_GEMINI_PRO_CODE_HERE",
  
  // Judul Event & Vault Name:
  eventTitle: "NEXUS CYBER GATEWAY v4.0",
  vaultName: "Gemini Pro Vault",

  // Raw Honeypot Trap string (di inspect element):
  rawHoneypotString: "PRO-PRO-PRO-GEMINI-PREMIUM-POWER-NEXUS-ACTIVATE",

  // Password yang BENAR setelah diolah kata-demi-kata:
  // Formula: GEMINI - PREMIUM - PRO - POWER - NEXUS - ACTIVATE
  correctPassword: "GEMINI-PREMIUM-PRO-POWER-NEXUS-ACTIVATE"
};
