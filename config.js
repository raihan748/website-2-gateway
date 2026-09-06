/**
 * ====================================================================
 * CONFIG.JS - KONFIGURASI LOGIC GRID PUZZLE WEBSITE 2 GATEWAY
 * ====================================================================
 * Master Configuration with Cryptographic Hash Verification & Obfuscation
 * Supports Dynamic Session Profiles: IKHWAN (PUTRA) vs AKHWAT (PUTRI)
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

  window.CTF_CONFIG = {
    // ====================================================================
    // 1. LINK AKTIVASI GOOGLE GEMINI PRO 18 BULAN PER SESI
    // ====================================================================
    // Anda dapat mengganti tautan di bawah ini dengan link redeem/voucher asli yang Anda siapkan:
    activationUrls: {
      ikhwan: "https://serviceactivation.google.com/subscription/new/AQCpiIE8pWV_Ml2STqKYcaTS7ekM0fec6wNwwG8TV3btM7MMsB4vwGXk-HRHJQVbc300o9S9mgfyhilzPA0nNL6HoICrKVrALWIeWM-waH-PGL1I-T-jyWLfV9RGkkfk0zS7RFNb4aHbHdT7-TnRhd6hSDNsJYDY1Wl23ABaAyAFv9-vD4rneBRNY8o0OTui-tJynWuh11axOXX-p1CZYtLr91cZPIGfTUTVf0JKtWuPzcYqJmxTHLZbwMaByB7Ekp26E4jT6GBwh80YSQ==",
      akhwat: "https://g.co/play/redeem?code=GEMINI_PRO_18_BULAN_AKHWAT"
    },

    // Current Active Session Type: 'ikhwan' | 'akhwat'
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
        ikhwan: 4, // Opsi 4: Apresiasi Resmi kepada Sang Juara (Sesi Ikhwan)
        akhwat: 2  // Opsi 2: Selamat dari Raihan (9B) - Santai, Akrab & Keren (Sesi Akhwat)
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
    // 3. DUAL PUZZLE SPECIFICATIONS (IKHWAN & AKHWAT)
    // ====================================================================
    puzzles: {
      // ------------------------------------------------------------------
      // SESI IKHWAN (PUTRA)
      // Solusi: GEMINI-PREMIUM-PRO-POWER-NEXUS-QUANTUM-CIPHER-ACTIVATE
      // ------------------------------------------------------------------
      ikhwan: {
        sessionName: "Sesi Putra (Kelas 7, 8, 9)",
        badgeLabel: "👦 SESI IKHWAN",
        scrambledPool: [
          "INIMEG", "SOHPLXP", "PRO", "POWER", "NEXUS", "QUANTUM", "CIPHER", "ACTIVATE",
          "MATRIX", "VECTOR", "SHIELD", "BINARY", "KERNEL", "VORTEX", "NEURON", "BEACON"
        ],
        targetHash: "cebb94befc62014be5955093830fbd05334d45df7c48edc2173aa707ff67ccdd",
        expectedLengths: [6, 7, 3, 5, 5, 7, 6, 8],
        chips: [
          { id: 'chip-1', word: 'GEMINI', label: '1. SLOT (6)' },
          { id: 'chip-2', word: 'PREMIUM', label: '2. SLOT (7)' },
          { id: 'chip-3', word: 'PRO', label: '3. SLOT (3)' },
          { id: 'chip-4', word: 'POWER', label: '4. SLOT (5)' },
          { id: 'chip-5', word: 'NEXUS', label: '5. SLOT (5)' },
          { id: 'chip-6', word: 'QUANTUM', label: '6. SLOT (7)' },
          { id: 'chip-7', word: 'CIPHER', label: '7. SLOT (6)' },
          { id: 'chip-8', word: 'ACTIVATE', label: '8. SLOT (8)' }
        ],
        dossier: {
          phase1: [
            "[1] KATA A (Anagram AI)         : Susun huruf dari \"INIMEG\" (Nama AI Google)",
            "[2] KATA B (Caesar Shift -3)    : Geser mundur 3 huruf pada sandi \"SOHPLXP\"",
            "[3] KATA C (Akronim Huruf Depan): Huruf awal dari kalimat \"Pengaman Ruang Otorisasi\"",
            "[4] KATA D (Riddle Karakter)    : Kata 5 huruf dengan huruf tengah 'W' (Tenaga/Daya)",
            "[5] KATA E (Simpul Cyber)       : Simpul jaringan 5 huruf dengan pola \"N _ X _ S\"",
            "[6] KATA F (Fisika Komputasi)   : Istilah fisika 7 huruf berawalan 'Q' & berakhiran 'M'",
            "[7] KATA G (Istilah Sandi)      : Kata 6 huruf untuk kunci sandi / algoritma enkripsi",
            "[8] KATA H (Lawan Kata)         : Lawan kata bahasa Inggris dari \"DEACTIVATE\""
          ],
          phase2: [
            "* ATURAN 1 : Kata hasil Anagram (Kata A) menempati Slot 1 paling depan.",
            "* ATURAN 2 : Dua kata berpanjang 7 huruf (Kata B & Kata F) TIDAK BOLEH bersebelahan.",
            "* ATURAN 3 : Kata D (POWER) berada tepat di antara kata 3 huruf (Kata C) dan kata 5 huruf berakhiran 'S' (Kata E).",
            "* ATURAN 4 : Rangkaian [Kata E] -> [Kata F] -> [Kata G] selalu bersambung secara berurutan.",
            "* ATURAN 5 : Kata perintah aksi (Kata H) menempati Slot 8 paling akhir."
          ],
          checksum: "[ 6, 7, 3, 5, 5, 7, 6, 8 ]"
        }
      },

      // ------------------------------------------------------------------
      // SESI AKHWAT (PUTRI) - MENCEGAH BYPASS VPN DARI PESERTA IKHWAN
      // Solusi: ATHENA-VALKYRIE-NOVA-PULSE-CELESTIA-HORIZON-AURORA-IGNITE
      // ------------------------------------------------------------------
      akhwat: {
        sessionName: "Sesi Putri (Kelas 7, 8, 9)",
        badgeLabel: "👧 SESI AKHWAT",
        scrambledPool: [
          "EHTANA", "VALKYRIE", "NOVA", "PULSE", "CELESTIA", "HORIZON", "DXURUD", "IGNITE",
          "STELLAR", "PHOENIX", "SOLARIS", "SYNAPSE", "CRYPTO", "GALAXY", "NEURON", "VORTEX"
        ],
        targetHash: "7e65afba492b9383700817d24af997403095483019d2c1f62d2ecb511c38a7c0",
        expectedLengths: [6, 8, 4, 5, 8, 7, 6, 6],
        chips: [
          { id: 'chip-1', word: 'ATHENA', label: '1. SLOT (6)' },
          { id: 'chip-2', word: 'VALKYRIE', label: '2. SLOT (8)' },
          { id: 'chip-3', word: 'NOVA', label: '3. SLOT (4)' },
          { id: 'chip-4', word: 'PULSE', label: '4. SLOT (5)' },
          { id: 'chip-5', word: 'CELESTIA', label: '5. SLOT (8)' },
          { id: 'chip-6', word: 'HORIZON', label: '6. SLOT (7)' },
          { id: 'chip-7', word: 'AURORA', label: '7. SLOT (6)' },
          { id: 'chip-8', word: 'IGNITE', label: '8. SLOT (6)' }
        ],
        dossier: {
          phase1: [
            "[1] KATA A (Anagram Mitologi)   : Susun huruf dari \"EHTANA\" (Dewi Kebijaksanaan)",
            "[2] KATA B (Ksatria Pelindung)  : Ksatria pelindung 8 huruf berawalan 'V' & berakhiran 'E' (\"VALKYRIE\")",
            "[3] KATA C (Ledakan Bintang)    : Ledakan bintang kosmik 4 huruf berawalan 'N' (\"NOVA\")",
            "[4] KATA D (Gelombang Energi)   : Detak sinyal denyut 5 huruf berakhiran 'SE' (\"PULSE\")",
            "[5] KATA E (Alam Surgawi)       : Istilah langit/angkasa agung 8 huruf (\"CELESTIA\")",
            "[6] KATA F (Garis Cakrawala)    : Batas pandang langit 7 huruf berawalan 'H' (\"HORIZON\")",
            "[7] KATA G (Caesar Shift -3)    : Geser mundur 3 huruf pada sandi fajar kutub \"DXURUD\" (\"AURORA\")",
            "[8] KATA H (Aksi Penyalaan)     : Perintah menyalakan sistem 6 huruf berawalan 'IG' (\"IGNITE\")"
          ],
          phase2: [
            "* ATURAN 1 : Kata hasil Anagram Dewi Kebijaksanaan (Kata A) menempati Slot 1 paling depan.",
            "* ATURAN 2 : Kata pelindung 8 huruf (Kata B) menempati Slot 2 tepat sebelum kata kosmik 4 huruf (Kata C).",
            "* ATURAN 3 : Kata C (NOVA) berada tepat di antara kata 8 huruf (Kata B) dan kata gelombang 5 huruf (Kata D).",
            "* ATURAN 4 : Rangkaian kosmik [Kata D] -> [Kata E] -> [Kata F] selalu bersambung secara berurutan.",
            "* ATURAN 5 : Kata hasil Caesar Shift (Kata G) berada di Slot 7, ditutup kata aksi eksekusi (Kata H) pada Slot 8."
          ],
          checksum: "[ 6, 8, 4, 5, 8, 7, 6, 6 ]"
        }
      }
    },

    // Helper untuk mengambil puzzle aktif
    getPuzzle(sessionType) {
      const type = sessionType || this.activeSession || 'ikhwan';
      return this.puzzles[type] || this.puzzles.ikhwan;
    },

    // Compatibility Getters
    get targetHash() {
      return this.getPuzzle(this.activeSession).targetHash;
    },

    get scrambledPool() {
      return this.getPuzzle(this.activeSession).scrambledPool;
    },

    get expectedLengths() {
      return this.getPuzzle(this.activeSession).expectedLengths;
    }
  };
})();
