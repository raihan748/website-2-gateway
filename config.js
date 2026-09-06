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
      akhwat: "https://serviceactivation.google.com/subscription/new/AQCpiIHGdBqnTnI_yB1MhdolnGcRuDR4trFuUpLmWavHi2sG7J-jKORhzxraj7oaxXPAmyq6hRep3zm4uWp9AcSL8vyHQyGgaWt1o6a5A9_R-hZQZlGaQGtbWotxRP29Bi9z49OkTppReMPGSKBe7loPmFmwFDy5gv8f_Ad-GrmdbYjwmaA7O_DdVmjdDTNFV5ngoe7SiWMZOfYWtJUHWP8WDTA34LDaAJv2RmUiBiRtU9Tca2IOJk55UIRzT_XGhelHdai4pqFzqMawFA=="
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
            "* ATURAN 3 : Kata D berada tepat di antara kata 3 huruf (Kata C) dan kata 5 huruf berakhiran 'S' (Kata E).",
            "* ATURAN 4 : Rangkaian [Kata E] -> [Kata F] -> [Kata G] selalu bersambung secara berurutan.",
            "* ATURAN 5 : Kata perintah aksi (Kata H) menempati Slot 8 paling akhir."
          ],
          checksum: "[ 6, 7, 3, 5, 5, 7, 6, 8 ]"
        }
      },

      // ------------------------------------------------------------------
      // SESI AKHWAT (PUTRI) - MENCEGAH BYPASS VPN DARI PESERTA IKHWAN
      // ------------------------------------------------------------------
      akhwat: {
        sessionName: "Sesi Putri (Kelas 7, 8, 9)",
        badgeLabel: "👧 SESI AKHWAT",
        targetHash: "7e65afba492b9383700817d24af997403095483019d2c1f62d2ecb511c38a7c0",
        expectedLengths: [6, 8, 4, 5, 8, 7, 6, 6],
        chips: [
          { id: 'chip-1', hash: '7e9968b23a07d46569685d724b788f49779e7de2ff3ae6b5de049282a62c1216', label: '1. SLOT (6)' },
          { id: 'chip-2', hash: 'f4a79aeb476f321d3e17a850601842a5335dfd652b653cf00716a278bcc7b28c', label: '2. SLOT (8)' },
          { id: 'chip-3', hash: 'c2385250186d29ac49370c0d87d40cfc0b434bdba9ae2e74e9a94c1cda87d667', label: '3. SLOT (4)' },
          { id: 'chip-4', hash: '64ab2b69dba510be526608f4e67142d34068fb7cfd6771529a7c54b5cd7a0675', label: '4. SLOT (5)' },
          { id: 'chip-5', hash: 'badcd5f9c0cab9f7a6e3e393b20437c501e6f20c2bc57d4a3d4b7e991bf091cb', label: '5. SLOT (8)' },
          { id: 'chip-6', hash: '7e4e26183aacdb054b06f550fb2db860b40106ad27aa9d649e101d581f588b56', label: '6. SLOT (7)' },
          { id: 'chip-7', hash: '1e28b2651a6d1b2486987925a85576dce1f8713e46acab058d9b200e409e4887', label: '7. SLOT (6)' },
          { id: 'chip-8', hash: '1c075f99f707c959588fd72aabe60e08f787505534d5f75ac5516c62e904fefa', label: '8. SLOT (6)' }
        ],
        dossier: {
          phase1: [
            "[1] KATA A (Anagram Mitologi)   : Susun huruf dari \"EHTANA\" (Dewi Kebijaksanaan)",
            "[2] KATA B (Ksatria Pelindung)  : Ksatria pelindung 8 huruf berawalan 'V' & berakhiran 'E'",
            "[3] KATA C (Ledakan Bintang)    : Ledakan bintang kosmik 4 huruf berawalan 'N'",
            "[4] KATA D (Gelombang Energi)   : Detak sinyal denyut 5 huruf berakhiran 'SE'",
            "[5] KATA E (Alam Surgawi)       : Istilah langit/angkasa agung 8 huruf",
            "[6] KATA F (Garis Cakrawala)    : Batas pandang langit 7 huruf berawalan 'H'",
            "[7] KATA G (Caesar Shift -3)    : Geser mundur 3 huruf pada sandi fajar kutub \"DXURUD\"",
            "[8] KATA H (Aksi Penyalaan)     : Perintah menyalakan sistem 6 huruf berawalan 'IG'"
          ],
          phase2: [
            "* ATURAN 1 : Kata hasil Anagram Dewi Kebijaksanaan (Kata A) menempati Slot 1 paling depan.",
            "* ATURAN 2 : Kata pelindung 8 huruf (Kata B) menempati Slot 2 tepat sebelum kata kosmik 4 huruf (Kata C).",
            "* ATURAN 3 : Kata C berada tepat di antara kata 8 huruf (Kata B) dan kata gelombang 5 huruf (Kata D).",
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
      return [];
    },

    get expectedLengths() {
      return this.getPuzzle(this.activeSession).expectedLengths;
    }
  };
})();
