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

// DECOY CONFIGURATIONS TO TRAP PARTICIPANTS
window.DECOY_CONFIG_1 = {
  adminBypass: "NEXUS-PRO-GEMINI-ACTIVATE-PREMIUM-POWER",
  securityLevel: "MAX",
  // NOTE TO SELF: Use this bypass if the main formula fails
};

window.DECOY_CONFIG_2 = {
  recoveryKey: "PREMIUM-GEMINI-PRO-NEXUS-POWER-ACTIVATE",
  isEmergency: true,
  // DANGER: Only use recovery key if database goes down
};

window.ADMIN_CONFIG_DEBUG = {
  legacyAccess: "PRO-GEMINI-PREMIUM-POWER-NEXUS-ACTIVATE",
  bypassAuth: "ACTIVATE-NEXUS-POWER-PRO-PREMIUM-GEMINI"
};
