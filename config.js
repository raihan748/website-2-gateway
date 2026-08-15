/**
 * ====================================================================
 * CONFIG.JS - KONFIGURASI CTF WEBSITE 2 GATEWAY
 * ====================================================================
 * Master Configuration for Word-Puzzle CTF Stage 2
 */

window.CTF_CONFIG = {
  // Link Redeem Hadiah Gemini Pro:
  geminiRedeemUrl: "https://g.co/play/redeem?code=GEMINI_PRO_REWARD_CLAIM",

  // Judul Event:
  eventTitle: "NEXUS CYBER GATEWAY v5.0",
  vaultName: "Gemini Pro Vault Portal",

  // Kumpulan Raw Buffer Pool (14 kata acak yang harus diolah):
  rawWordPool: [
    "GEMINI", "PREMIUM", "PRO", "POWER", "NEXUS", "QUANTUM", "CIPHER", "ACTIVATE",
    "ALPHA", "ACCESS", "SYSTEM", "OVERDRIVE", "ULTIMATE", "GATEWAY"
  ],

  // Kunci Jawaban Valid Hasil Olah 8-Kata Berdasarkan Petunjuk:
  // Formula: [AI_CORE] - [CLASS] - [TIER] - [ENERGY] - [NETWORK] - [PHYSICS] - [CRYPTO] - [COMMAND]
  correctPassword: "GEMINI-PREMIUM-PRO-POWER-NEXUS-QUANTUM-CIPHER-ACTIVATE"
};
