/**
 * ====================================================================
 * CONFIG.JS - KONFIGURASI LOGIC GRID PUZZLE WEBSITE 2 GATEWAY
 * ====================================================================
 * Master Configuration with Cryptographic Hash Verification & Obfuscation
 */

(function () {
  // Runtime Deobfuscation Helper (XOR + Base64)
  function _nxDec(b64, k = 0x5a) {
    try {
      const raw = atob(b64);
      let res = '';
      for (let i = 0; i < raw.length; i++) {
        res += String.fromCharCode(raw.charCodeAt(i) ^ (k + (i % 7)));
      }
      return res;
    } catch (e) {
      return '';
    }
  }

  // Encrypted Reward URL Payload (G.co Redeem Voucher)
  const _E_REDEEM = "Mi8oLS1lT3U8cj4xcBA2OiVyLDoEPz4xYj0wBD9mGxgTFi4TBAwPEQAyHwwdDxoAIxYaFRA=";

  window.CTF_CONFIG = {
    // Getter untuk Link Redeem (Didekripsi secara dinamis saat runtime):
    get geminiRedeemUrl() {
      return _nxDec(_E_REDEEM);
    },

    // Judul Event:
    eventTitle: "NEXUS CYBER GATEWAY v5.0 - DETECTIVE LOGIC EDITION",
    vaultName: "Gemini Pro Vault Portal",

    // 16 Word Pool (Kata Campuran & Terenkripsi):
    scrambledPool: [
      "INIMEG", "SOHPLXP", "PRO", "POWER", "NEXUS", "QUANTUM", "CIPHER", "ACTIVATE",
      "MATRIX", "VECTOR", "SHIELD", "BINARY", "KERNEL", "VORTEX", "NEURON", "BEACON"
    ],

    // SHA-256 Hash Target Password (Tidak menyimpan teks kunci mentah di file):
    targetHash: "cebb94befc62014be5955093830fbd05334d45df7c48edc2173aa707ff67ccdd",

    // Expected Word Length Sequence:
    expectedLengths: [6, 7, 3, 5, 5, 7, 6, 8]
  };
})();
