/**
 * ====================================================================
 * CONFIG.JS - KONFIGURASI LOGIC GRID PUZZLE WEBSITE 2 GATEWAY
 * ====================================================================
 * Master Configuration with Cryptographic Hash Verification & Obfuscation
 * Active Session Profile: IKHWAN (PUTRA)
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

  // Encrypted Reward URL Payload Fallback
  const _E_REDEEM = "Mi8oLS1lT3U8cj4xcBA2OiVyLDoEPz4xYj0wBD9mGxgTFi4TBAwPEQAyHwwdDxoAIxYaFRA=";
  const _E_PROFILE_B = "eyJzZXNzaW9uTmFtZSI6IlNlc2kgUHV0cmkgKEtlbGFzIDcsIDgsIDkpIiwiYmFkZ2VMYWJlbCI6IvCfkacgU0VTSSBBS0hXQVQiLCJ0YXJnZXRIYXNoIjoiN2U2NWFmYmE0OTJiOTM4MzcwMDgxN2QyNGFmOTk3NDAzMDk1NDgzMDE5ZDJjMWY2MmQyZWNiNTExYzM4YTdjMCIsImV4cGVjdGVkTGVuZ3RocyI6WzYsOCw0LDUsOCw3LDYsNl0sImNoaXBzIjpbeyJpZCI6ImNoaXAtMSIsImhhc2giOiI3ZTk5NjhiMjNhMDdkNDY1Njk2ODVkNzI0Yjc4OGY0OTc3OWU3ZGUyZmYzYWU2YjVkZTA0OTI4MmE2MmMxMjE2IiwibGFiZWwiOiIxLiBTTE9UICg2KSJ9LHsiaWQiOiJjaGlwLTIiLCJoYXNoIjoiZjRhNzlhZWI0NzZmMzIxZDNlMTdhODUwNjAxODQyYTUzMzVkZmQ2NTJiNjUzY2YwMDcxNmEyNzhiY2M3YjI4YyIsImxhYmVsIjoiMi4gU0xPVCAoOCkifSx7ImlkIjoiY2hpcC0zIiwiaGFzaCI6ImMyMzg1MjUwMTg2ZDI5YWM0OTM3MGMwZDg3ZDQwY2ZjMGI0MzRiZGJhOWFlMmU3NGU5YTk0YzFjZGE4N2Q2NjciLCJsYWJlbCI6IjMuIFNMT1QgKDQpIn0seyJpZCI6ImNoaXAtNCIsImhhc2giOiI2NGFiMmI2OWRiYTUxMGJlNTI2NjA4ZjRlNjcxNDJkMzQwNjhmYjdjZmQ2NzcxNTI5YTdjNTRiNWNkN2EwNjc1IiwibGFiZWwiOiI0LiBTTE9UICg1KSJ9LHsiaWQiOiJjaGlwLTUiLCJoYXNoIjoiYmFkY2Q1ZjljMGNhYjlmN2E2ZTNlMzkzYjIwNDM3YzUwMWU2ZjIwYzJiYzU3ZDRhM2Q0YjdlOTkxYmYwOTFjYiIsImxhYmVsIjoiNS4gU0xPVCAoOCkifSx7ImlkIjoiY2hpcC02IiwiaGFzaCI6IjdlNGUyNjE4M2FhY2RiMDU0YjA2ZjU1MGZiMmRiODYwYjQwMTA2YWQyN2FhOWQ2NDllMTAxZDU4MWY1ODhiNTYiLCJsYWJlbCI6IjYuIFNMT1QgKDcpIn0seyJpZCI6ImNoaXAtNyIsImhhc2giOiIxZTI4YjI2NTFhNmQxYjI0ODY5ODc5MjVhODU1NzZkY2UxZjg3MTNlNDZhY2FiMDU4ZDliMjAwZTQwOWU0ODg3IiwibGFiZWwiOiI3LiBTTE9UICg2KSJ9LHsiaWQiOiJjaGlwLTgiLCJoYXNoIjoiMWMwNzVmOTlmNzA3Yzk1OTU4OGZkNzJhYWJlNjBlMDhmNzg3NTA1NTM0ZDVmNzVhYzU1MTZjNjJlOTA0ZmVmYSIsImxhYmVsIjoiOC4gU0xPVCAoNikifV19";

  window.CTF_CONFIG = {
    // ====================================================================
    // 1. LINK AKTIVASI GOOGLE GEMINI PRO 18 BULAN
    // ====================================================================
    activationUrls: {
      ikhwan: "https://serviceactivation.google.com/subscription/new/AQCpiIE8pWV_Ml2STqKYcaTS7ekM0fec6wNwwG8TV3btM7MMsB4vwGXk-HRHJQVbc300o9S9mgfyhilzPA0nNL6HoICrKVrALWIeWM-waH-PGL1I-T-jyWLfV9RGkkfk0zS7RFNb4aHbHdT7-TnRhd6hSDNsJYDY1Wl23ABaAyAFv9-vD4rneBRNY8o0OTui-tJynWuh11axOXX-p1CZYtLr91cZPIGfTUTVf0JKtWuPzcYqJmxTHLZbwMaByB7Ekp26E4jT6GBwh80YSQ=="
    },

    // Current Active Session Type: 'ikhwan'
    activeSession: 'ikhwan',

    // Helper untuk mengambil link redeem sesuai sesi aktif
    getRedeemUrl(sessionType) {
      const type = sessionType || this.activeSession || 'ikhwan';
      return (this.activationUrls && this.activationUrls[type]) 
        ? this.activationUrls[type] 
        : (this.activationUrls?.ikhwan || _nxDec(_E_REDEEM));
    },

    get geminiRedeemUrl() {
      return this.getRedeemUrl(this.activeSession);
    },

    // ====================================================================
    // 2. PESAN UCAPAN SELAMAT DARI OWNER (RAIHAN, 9B) KEPADA PEMENANG
    // ====================================================================
    ownerCongrats: {
      selectedOption: 4, // Default fallback
      selectedOptions: {
        ikhwan: 4 // Opsi 4: Apresiasi Resmi kepada Sang Juara (Sesi Ikhwan)
      },

      options: {
        1: {
          title: "👑 PESAN PENGHORMATAN RESMI DARI OWNER",
          body: "Selamat! Kamu telah membuktikan kecerdasan, ketelitian, dan ketangguhan logika yang luar biasa. Dari seluruh siswa yang bertarung di matriks teka-teki ini, kamulah orang pertama yang berhasil menembus seluruh 8 lapisan cipher dan aturan posisiku tanpa celah. Hadiah Google Gemini Pro 18 Bulan ini adalah bukti nyata dedikasi dan kehebatan analisismu. Nikmati kemenangan mutlakmu!",
          author: "-Raihan 9B"
        },
        2: {
          title: "🔥 SELAMAT DARI RAIHAN (9B)",
          body: "Wah, gila keren banget! Selamat ya buat kamu yang udah berhasil jadi juara 1 di CTF ini! Jujur, teka-teki 8 kata dan aturan posisi kemarin aku bikin sengaja rumit biar bener-bener nguji otak kita, tapi kamu berhasil pecahin paling pertama dan paling cepet se-sekolah. Selamat menikmati Google Gemini Pro 18 Bulan gratis, semoga kepake banget buat belajar dan eksplorasi AI kamu ke depan!",
          author: "-Raihan 9B"
        },
        3: {
          title: "⚡ VERIFIED: GRANDMASTER CIPHER BREAKER",
          body: "Akses Terverifikasi: Protokol Rahasia Berhasil Dikuasai. Selamat Agen! Kamu adalah agen terbaik yang mampu mengurai enkripsi paling kompleks di Nexus 2026 sebelum orang lain menyadarinya. Kemenangan ini membuktikan kamu berada di kasta tertinggi pemecah kode. Hadiah voucher eksklusif Gemini Pro 18 Bulan kini resmi menjadi milikmu!",
          author: "-Raihan 9B"
        },
        4: {
          title: "🏆 APRESIASI RESMI KEPADA SANG JUARA",
          body: "Selamat kepada Sang Juara! Kamu telah menorehkan rekor bersejarah sebagai pemecah sandi tercepat dan tercerdas di ajang Nexus Cyber CTF 2026. Hadiah Gemini Pro 18 Bulan ini adalah apresiasi setinggi-tingginya dari saya atas usaha brilian dan kecepatan analisismu hari ini. Sukses selalu!",
          author: "-Raihan 9B"
        }
      }
    },

    getActiveOwnerMessage(sessionType) {
      const type = sessionType || this.activeSession || 'ikhwan';
      const opt = (this.ownerCongrats.selectedOptions && this.ownerCongrats.selectedOptions[type])
        ? this.ownerCongrats.selectedOptions[type]
        : (this.ownerCongrats.selectedOption || 4);
      return this.ownerCongrats.options[opt] || this.ownerCongrats.options[4];
    },

    // Judul Event:
    eventTitle: "NEXUS CYBER GATEWAY v5.0 - DETECTIVE LOGIC EDITION",
    vaultName: "Gemini Pro Vault Portal",

    // ====================================================================
    // 3. PUZZLE SPECIFICATIONS (SESI PUTRA)
    // ====================================================================
    puzzles: {
      // ------------------------------------------------------------------
      // SESI IKHWAN (PUTRA)
      // ------------------------------------------------------------------
      ikhwan: {
        sessionName: "Sesi Putra (Kelas 7, 8, 9)",
        badgeLabel: "👦 SESI IKHWAN",
        targetHash: "cebb94befc62014be5955093830fbd05334d45df7c48edc2173aa707ff67ccdd",
        expectedLengths: [6, 7, 3, 5, 5, 7, 6, 8],
        chips: [
          { id: 'chip-1', hash: '8a2266f450423a535981b12c13c39562b59e4ff8f8574a9b3a6d7a8c526b681c', label: '1. SLOT (6)' },
          { id: 'chip-2', hash: '0afea7d744b825aa58996d28692d6624f8ae6c360b88f0990f66f4db0e83eabc', label: '2. SLOT (7)' },
          { id: 'chip-3', hash: '7821a03e83d54c4519defe9980f3c2f15a57a4cb39d1416b4bae327a98c6447a', label: '3. SLOT (3)' },
          { id: 'chip-4', hash: '10149aa571ab7f5f987c9fec11ed8062491e6fee2cd7fa0e3058088af42a0f2a', label: '4. SLOT (5)' },
          { id: 'chip-5', hash: '52b797a276d825aaa28f449f1d35682bd4d271f6455be84e3869cdd7aed2ca03', label: '5. SLOT (5)' },
          { id: 'chip-6', hash: 'afcbd832f42e36fb086363789b438948fab1762e725638c28991e4d4e4768db5', label: '6. SLOT (7)' },
          { id: 'chip-7', hash: 'e555a71f0ce4ab12bc3de31adda7979c753fa3f9edd36e8cd8929d5bd4b7e906', label: '7. SLOT (6)' },
          { id: 'chip-8', hash: 'f5dcf0be62e222c4a5e9e367c3feeb42e690c797b4980a45fe4014c64c587f1d', label: '8. SLOT (8)' }
        ],
        dossier: {
          slots: [
            "[SLOT 1] (6 Huruf) : Susun huruf  \"I - N - I - M - E - G\" (Clue: Nama AI buatan Google)",
            "[SLOT 2] (7 Huruf) : Susun huruf  \"M - I - U - M - E - R - P\" (Clue: Akun spesial / langganan berbayar)",
            "[SLOT 3] (3 Huruf) : Susun huruf  \"O - R - P\" (Clue: Versi lanjutan / profesional dari Gemini)",
            "[SLOT 4] (5 Huruf) : Susun huruf  \"R - E - W - O - P\" (Clue: Bahasa Inggris kekuatan/daya/tenaga)",
            "[SLOT 5] (5 Huruf) : Susun huruf  \"S - U - X - E - N\" (Clue: Simpul jaringan cyber / Tema CTF kita)",
            "[SLOT 6] (7 Huruf) : Susun huruf  \"M - U - T - N - A - U - Q\" (Clue: Fisika & komputasi canggih masa depan)",
            "[SLOT 7] (6 Huruf) : Susun huruf  \"R - E - H - P - I - C\" (Clue: Algoritma kunci sandi / enkripsi rahasia)",
            "[SLOT 8] (8 Huruf) : Susun huruf  \"E - T - A - V - I - T - C - A\" (Clue: Bahasa Inggris nyalakan/aktifkan sistem)"
          ],
          format: "SLOT1-SLOT2-SLOT3-SLOT4-SLOT5-SLOT6-SLOT7-SLOT8",
          checksum: "[ 6, 7, 3, 5, 5, 7, 6, 8 ]"
        }
      }
    },

    // Helper untuk mengambil puzzle aktif
    getPuzzle(sessionType) {
      const type = sessionType || this.activeSession || 'ikhwan';
      if (type === 'akhwat') {
        try {
          return JSON.parse(atob(_E_PROFILE_B));
        } catch (e) {
          return this.puzzles.ikhwan;
        }
      }
      return this.puzzles.ikhwan;
    },

    // Compatibility Getters
    get targetHash() {
      return this.getPuzzle(this.activeSession).targetHash;
    },

    get scrambledPool() {
      return [];
    },

    get expectedLengths() {
      return this.getPuzzle(this.activeSession).expectedLengths;
    }
  };
})();
