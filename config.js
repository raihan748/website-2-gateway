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
    // URL Link Aktivasi Gemini Pro 18 Bulan:
    // (Bisa Anda ganti langsung dengan link voucher/aktivasi yang sedang Anda siapkan)
    activationUrl: "https://g.co/play/redeem?code=GEMINI_PRO_18_BULAN_VIP",

    // Getter untuk Link Redeem (Didekripsi secara dinamis saat runtime jika activationUrl kosong):
    get geminiRedeemUrl() {
      return this.activationUrl || _nxDec(_E_REDEEM);
    },

    // ====================================================================
    // PESAN UCAPAN SELAMAT DARI OWNER (RAIHAN, 9B) KEPADA PEMENANG
    // ====================================================================
    // Anda bisa memilih Opsi 1, 2, 3, atau 4 di bawah ini dengan mengubah selectedOption:
    ownerCongrats: {
      selectedOption: 1, // Ubah angka ini (1, 2, 3, atau 4) sesuai selera Anda!

      options: {
        1: {
          title: "👑 PESAN PENGHORMATAN RESMI DARI OWNER",
          body: "Selamat! Kamu telah membuktikan kecerdasan, ketelitian, dan ketangguhan logika yang luar biasa. Dari seluruh siswa yang bertarung di matriks teka-teki ini, kamulah orang pertama yang berhasil menembus seluruh 8 lapisan cipher dan aturan posisiku tanpa celah. Hadiah Google Gemini Pro 18 Bulan ini adalah bukti nyata dedikasi dan kehebatan analisismu. Nikmati kemenangan mutlakmu!",
          author: "Raihan, Kelas 9B (Creator & Architect of Nexus CTF)"
        },
        2: {
          title: "🔥 SELAMAT DARI RAIHAN (9B)",
          body: "Wah, gila keren banget! Selamat ya buat kamu yang udah berhasil jadi juara 1 di CTF ini! Jujur, teka-teki 8 kata dan aturan posisi kemarin aku bikin sengaja rumit biar bener-bener nguji otak kita, tapi kamu berhasil pecahin paling pertama dan paling cepet se-sekolah. Selamat menikmati Google Gemini Pro 18 Bulan gratis, semoga kepake banget buat belajar dan eksplorasi AI kamu ke depan!",
          author: "Raihan (Kelas 9B)"
        },
        3: {
          title: "⚡ VERIFIED: GRANDMASTER CIPHER BREAKER",
          body: "Akses Terverifikasi: Protokol Rahasia Berhasil Dikuasai. Selamat Agen! Kamu adalah agen terbaik yang mampu mengurai enkripsi paling kompleks di Nexus 2026 sebelum orang lain menyadarinya. Kemenangan ini membuktikan kamu berada di kasta tertinggi pemecah kode. Hadiah voucher eksklusif Gemini Pro 18 Bulan kini resmi menjadi milikmu!",
          author: "Raihan, 9B (System Administrator & Puzzle Architect)"
        },
        4: {
          title: "🏆 APRESIASI RESMI KEPADA SANG JUARA",
          body: "Selamat kepada Sang Juara! Kamu telah menorehkan rekor bersejarah sebagai pemecah sandi tercepat dan tercerdas di ajang Nexus Cyber CTF 2026. Hadiah Gemini Pro 18 Bulan ini adalah apresiasi setinggi-tingginya dari saya atas usaha brilian dan kecepatan analisismu hari ini. Sukses selalu!",
          author: "Raihan, Kelas 9B"
        }
      }
    },

    // Helper untuk mengambil pesan aktif
    getActiveOwnerMessage() {
      const opt = this.ownerCongrats.selectedOption || 1;
      return this.ownerCongrats.options[opt] || this.ownerCongrats.options[1];
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
