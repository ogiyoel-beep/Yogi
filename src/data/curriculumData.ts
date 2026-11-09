import {
  TalentMeta,
  BodyRoleMeta,
  QuestMission,
  LessonContent,
  QuizQuestion,
  MosaicTile,
  AffirmationCard
} from '../types';

export const TALENT_CATEGORIES: Record<string, TalentMeta> = {
  kasih_empati: {
    id: 'kasih_empati',
    name: 'Karunia Kasih & Empati',
    color: '#E11D48',
    bgClass: 'bg-rose-50 text-rose-800 border-rose-200',
    borderClass: 'border-rose-400',
    iconName: 'Heart',
    description: 'Kemampuan peka merasakan pergumulan sesama, mendengarkan, menghibur, dan membawa damai.',
    biblicalExample: 'Orang Samaria yang Murah Hati (Lukas 10:33) & Bunda Maria yang peka di Perkawinan Kana.'
  },
  seni_kreasi: {
    id: 'seni_kreasi',
    name: 'Karunia Kreasi & Seni',
    color: '#D97706',
    bgClass: 'bg-amber-50 text-amber-800 border-amber-200',
    borderClass: 'border-amber-400',
    iconName: 'Palette',
    description: 'Kemampuan mengekspresikan keindahan ciptaan Allah melalui musik, lukisan, tutur kata, dan karya indah.',
    biblicalExample: 'Raja Daud yang mahir memetik kecapi dan menggubah Mazmur pujian bagi Tuhan.'
  },
  hikmat_nalar: {
    id: 'hikmat_nalar',
    name: 'Karunia Hikmat & Nalar',
    color: '#2563EB',
    bgClass: 'bg-blue-50 text-blue-800 border-blue-200',
    borderClass: 'border-blue-400',
    iconName: 'Brain',
    description: 'Kemampuan berpikir analitis, memecahkan masalah rumit, menyusun strategi, dan mencari kebenaran.',
    biblicalExample: 'Raja Salomo yang memohon hikmat kebijaksanaan untuk memimpin umat dengan adil (1 Raja 3).'
  },
  pelayanan_aksi: {
    id: 'pelayanan_aksi',
    name: 'Karunia Pelayanan & Aksi',
    color: '#059669',
    bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderClass: 'border-emerald-400',
    iconName: 'HandMetal',
    description: 'Ketangkasan fisik, kerajinan tangan, kesediaan bekerja keras membantu orang lain secara konkret.',
    biblicalExample: 'Marta yang melayani dengan sigap dan Tabita yang menjahit pakaian bagi para janda (Kisah 9:36).'
  },
  kepemimpinan: {
    id: 'kepemimpinan',
    name: 'Karunia Kepemimpinan & Komunikasi',
    color: '#7C3AED',
    bgClass: 'bg-purple-50 text-purple-800 border-purple-200',
    borderClass: 'border-purple-400',
    iconName: 'Compass',
    description: 'Kemampuan menggerakkan orang, membangun semangat kelompok, memediasi perselisihan, dan berani bersuara.',
    biblicalExample: 'Nehemia yang menggerakkan rakyat membangun kembali tembok Yerusalem dalam persatuan.'
  },
  spiritualitas_doa: {
    id: 'spiritualitas_doa',
    name: 'Karunia Spiritualitas & Doa',
    color: '#0D9488',
    bgClass: 'bg-teal-50 text-teal-800 border-teal-200',
    borderClass: 'border-teal-400',
    iconName: 'Sparkles',
    description: 'Kedekatan relasi dengan Tuhan, ketenangan batin, ketekunan berdoa, dan keteguhan iman.',
    biblicalExample: 'Nabi Samuel yang setia mendengarkan suara Tuhan: "Berbicaralah, TUHAN, hamba-Mu mendengar."'
  }
};

export const LESSONS: LessonContent[] = [
  {
    id: 'imago-dei',
    number: '01',
    title: 'Aku Diciptakan Sebagai Citra Allah (Imago Dei)',
    subtitle: 'Manusia Diciptakan Istimewa, Unik, dan Sungguh Amat Baik',
    scripturePassage: {
      reference: 'Kejadian 1:26-31',
      text: 'Maka Allah menciptakan manusia itu menurut gambar-Nya, menurut gambar Allah diciptakan-Nya dia; laki-laki dan perempuan diciptakan-Nya mereka... Maka Allah melihat segala yang dijadikan-Nya itu, sungguh amat baik adanya.',
      highlightVerse: 'Kejadian 1:31a - "Maka Allah melihat segala yang dijadikan-Nya itu, sungguh amat baik adanya."'
    },
    theologicalCore: [
      'Istilah Latin "Imago Dei" berarti Gambar dan Rupa Allah. Ini adalah martabat luhur yang tidak dimiliki oleh ciptaan lain (hewan, tumbuhan, benda langit).',
      'Allah memberikan akal budi, kebebasan berkehendak (free will), hati nurani, serta kemampuan untuk mengasihi dan berelasi.',
      'Karena setiap manusia adalah Citra Allah, maka setiap orang tanpa terkecuali memiliki martabat yang suci dan patut dihormati. Merendahkan orang lain sama dengan merendahkan Sang Pencipta.'
    ],
    practicalAspects: [
      {
        category: 'Keunikan Fisik',
        explanation: 'Setiap rincian tubuh kita unik: sidik jari, struktur iris mata, suara, susunan DNA, dan garis wajah.',
        example: 'Dari 8 miliar manusia di bumi, tidak ada satu pun yang memiliki sidik jari identik denganmu!'
      },
      {
        category: 'Keunikan Psikis & Sifat',
        explanation: 'Karakter temperamen, kepribadian (introvert/ekstrovert), cara memproses perasaan, dan selera minat.',
        example: 'Ada teman yang tenang dan teliti saat mendengar, ada yang ekspresif penuh semangat saat berbicara.'
      },
      {
        category: 'Panggilan Kristiani',
        explanation: 'Menyadari diri sebagai Citra Allah membebaskan kita dari rasa minder (inferioritas) maupun rasa sombong.',
        example: 'Berhenti membanding-bandingkan diri secara negatif di media sosial; kamu dirancang dengan maksud Ilahi.'
      }
    ],
    reflectiveQuestions: [
      'Saat bercermin hari ini, apa hal pertama yang kamu syukuri dari fisik dan pribadimu?',
      'Pernahkah kamu merasa minder karena berbeda dari teman sebayamu? Bagaimana pandangan iman Katolik membantu memulihkannya?',
      'Bagaimana caramu menghormati teman yang memiliki latar belakang fisik atau sifat yang sangat berbeda denganmu?'
    ],
    actionCall: 'Tuliskan satu doa syukur di cermin kamarmu hari ini: "Tuhan, terima kasih telah menciptakanku sungguh amat baik."',
    imagePath: '/src/assets/images/mosaic_creation_imago_dei_1794193337246.jpg'
  },
  {
    id: 'mazmur-139',
    number: '02',
    title: 'Dahsyat dan Ajaib Kejadianku',
    subtitle: 'Allah Mengenal dan Merajut Diriku Sejak dalam Kandungan Ibu',
    scripturePassage: {
      reference: 'Mazmur 139:13-16',
      text: 'Sebab Engkaulah yang membentuk buah pinggangku, menenun aku dalam kandungan ibuku. Aku bersyukur kepada-Mu oleh karena kejadianku dahsyat dan ajaib; ajaib apa yang Kaubuat, dan jiwaku benar-benar menyadarinya.',
      highlightVerse: 'Mazmur 139:14 - "Aku bersyukur kepada-Mu oleh karena kejadianku dahsyat dan ajaib."'
    },
    theologicalCore: [
      'Daud melukiskan Allah bukan sekadar pembuat pabrik massal, melainkan seorang penenun yang teliti, penuh kasih, dan personal.',
      'Tidak ada manusia yang merupakan sebuah "kebetulan" atau "kesalahan produksi". Di hadapan Allah, kita direncanakan dengan tujuan keselamatan yang mulia.',
      'Keterbatasan fisik atau kekurangan yang kita miliki bukanlah tanda Allah tidak adil, melainkan bagian dari misteri hidup yang mengundang kita saling melengkapi dan bergantung pada rahmat-Nya.'
    ],
    practicalAspects: [
      {
        category: 'Penerimaan Diri (Self-Acceptance)',
        explanation: 'Menerima diri seutuhnya: mengakui kelebihan tanpa tinggi hati, dan mengakui kelemahan tanpa membenci diri.',
        example: 'Jika kamu kurang mahir berolahraga lari, mungkin Tuhan menganugerahkanmu ketenangan menulis atau melukis.'
      },
      {
        category: 'Menolak Budaya Perundungan (Stop Bullying)',
        explanation: 'Menghina kekurangan fisik (body shaming) atau mengejek sifat seseorang melukai karya tenunan Allah yang ajaib.',
        example: 'Menjadi pembela ketika melihat teman diejek di kelas atau di grup chat WhatsApp.'
      },
      {
        category: 'Kekuatan dalam Kelemahan',
        explanation: 'Santo Paulus mengingatkan: "Cukuplah kasih karunia-Ku bagimu, sebab justru dalam kelemahanlah kuasa-Ku menjadi sempurna" (2 Kor 12:9).',
        example: 'Keterbatasan fisik para atlet paralimpiade yang menjadi inspirasi iman dan ketangguhan bagi dunia.'
      }
    ],
    reflectiveQuestions: [
      'Kelemahan atau keterbatasan apa yang selama ini paling sulit kamu terima dari dirimu?',
      'Bagaimana ayat Mazmur 139:14 mengubah caramu memandang kelemahan tersebut?',
      'Pernahkah kamu tanpa sengaja mencela ciptaan Tuhan melalui ejekan kepada orang lain?'
    ],
    actionCall: 'Pilihlah satu hal yang biasanya membuatmu merasa tidak percaya diri, dan katakan: "Aku diciptakan Tuhan dengan dahsyat dan ajaib."',
    imagePath: '/src/assets/images/garden_of_talents_1794193337255.jpg'
  },
  {
    id: 'tubuh-kristus',
    number: '03',
    title: 'Satu Tubuh, Banyak Anggota',
    subtitle: 'Keunikan Kita Dirancang untuk Saling Melengkapi dalam Gereja',
    scripturePassage: {
      reference: '1 Korintus 12:12-27',
      text: 'Karena sama seperti tubuh itu satu dan anggota-anggotanya banyak, dan semua anggota itu, sekalipun banyak, merupakan satu tubuh, demikian pula Kristus... Andaikata tubuh seluruhnya adalah mata, di manakah pendengaran? Andaikata seluruhnya adalah pendengaran, di manakah penciuman?... Jadi mata tidak dapat berkata kepada tangan: "Aku tidak membutuhkan engkau."',
      highlightVerse: '1 Korintus 12:21 - "Mata tidak dapat berkata kepada tangan: Aku tidak membutuhkan engkau."'
    },
    theologicalCore: [
      'Gereja adalah Tubuh Mistik Kristus. Kristus adalah Kepalanya, dan kita semua adalah anggota-anggota tubuh-Nya.',
      'Perbedaan adalah anugerah Roh Kudus agar kita saling membutuhkan. Jika semua orang sama persis seperti robot, persekutuan kasih (communio) tidak akan pernah terwujud.',
      'Anggota tubuh yang tampaknya paling lemah atau tersembunyi justru seringkali yang paling penting dan patut dihormati (1 Kor 12:22-23).'
    ],
    practicalAspects: [
      {
        category: 'Si Mata vs Si Tangan',
        explanation: 'Orang yang punya visi/gagasan (Mata) tidak dapat merealisasikannya tanpa orang yang suka bekerja praktis (Tangan).',
        example: 'Dalam tugas kelompok kelas 7, ada yang menyusun ide presentasi, ada yang membuat poster visual, ada yang bicara.'
      },
      {
        category: 'Si Telinga vs Si Hati',
        explanation: 'Pendengar yang setia memberi ruang curhat, sementara pembawa semangat menyalakan sukacita saat teman lelah.',
        example: 'Saat temanmu sedang sedih karena nilai turun, peran pendengar lebih dibutuhkan daripada penceramah.'
      },
      {
        category: 'Solidaritas Kristiani',
        explanation: '"Jika satu anggota menderita, semua anggota turut menderita; jika satu anggota dihormati, semua anggota turut bersukacita" (1 Kor 12:26).',
        example: 'Tidak ada iri hati ketika teman meraih medali; kita bersukacita bersama karena keberhasilannya mengharumkan tubuh bersama.'
      }
    ],
    reflectiveQuestions: [
      'Dalam pertemanan di kelas 7, peran anggota tubuh mana yang paling cocok menggambarkan dirimu: mata, telinga, tangan, kaki, atau hati?',
      'Siapakah teman di kelasmu yang memiliki talenta yang tidak kamu miliki, dan bagaimana talenta itu telah membantumu?',
      'Apa yang terjadi jika suatu kelompok hanya mau berteman dengan orang yang sifatnya sama persis?'
    ],
    actionCall: 'Kirimkan pesan apresiasi sederhana kepada salah satu teman sekelasmu yang jasanya sering tidak terlihat.',
    imagePath: '/src/assets/images/collaborative_body_of_christ_1794193338179.jpg'
  },
  {
    id: 'talenta-keterbatasan',
    number: '04',
    title: 'Mengembangkan Talenta & Menerima Keterbatasan',
    subtitle: 'Panggilan Menjadi Hamba yang Setia dan Bertanggung Jawab',
    scripturePassage: {
      reference: 'Matius 25:14-30',
      text: 'Yang seorang diberikannya lima talenta, yang seorang lagi dua dan yang seorang lain lagi satu, masing-masing menurut kesanggupannya... Maka kata tuannya kepadanya: Baik sekali perbuatanmu itu, hai hambaku yang baik dan setia; engkau telah setia dalam perkara kecil, aku akan memberikan kepadamu tanggung jawab dalam perkara yang besar.',
      highlightVerse: 'Matius 25:21 - "Baik sekali perbuatanmu itu, hai hambaku yang baik dan setia."'
    },
    theologicalCore: [
      'Kata "Talenta" dalam Alkitab awalnya adalah satuan mata uang bernilai sangat tinggi, namun secara kiasan melambangkan anugerah, kemampuan, dan waktu yang Tuhan percayakan.',
      'Jumlah talenta yang diberikan tidak sama (5, 2, 1), bukan karena Tuhan pilih kasih, melainkan sesuai kesanggupan dan keunikan misi masing-masing.',
      'Dosa hamba yang memiliki 1 talenta bukanlah karena ia hanya punya satu, melainkan karena rasa takut, curiga kepada Tuhan, dan mengubur talentanya di dalam tanah.'
    ],
    practicalAspects: [
      {
        category: 'Jangan Mengubur Talenta',
        explanation: 'Rasa malu, malas berlatih, dan takut ditertawakan teman adalah cangkul yang mengubur talenta pemberian Allah.',
        example: 'Berani mencoba ikut koor paroki, membaca lektor, bergabung di ekskul robotik, basket, atau menggambar.'
      },
      {
        category: 'Melipatgandakan untuk Orang Lain',
        explanation: 'Talenta kita bukan untuk menyombongkan diri (show off), melainkan untuk memuliakan Tuhan dan menolong sesama.',
        example: 'Jika kamu pintar matematika, ajarkan temanmu yang kesulitan dengan sabar tanpa merendahkannya.'
      },
      {
        category: 'Kerendahan Hati Mengakui Batas',
        explanation: 'Mengakui keterbatasan membuka pintu kerjasama: "Aku butuh kamu, dan kamu butuh aku."',
        example: 'Meminta tolong dengan sopan bukan tanda kelemahan, melainkan tanda kematangan iman.'
      }
    ],
    reflectiveQuestions: [
      'Talenta apa yang saat ini kamu rasa sedang kamu "kubur" karena malu atau takut gagal?',
      'Langkah kecil apa yang bisa kamu ambil minggu ini untuk mengasah talenta tersebut?',
      'Bagaimana caramu menggunakan bakat yang kamu miliki untuk pelayanan di lingkungan gereja atau sekolah?'
    ],
    actionCall: 'Tentukan satu komitmen nyata untuk melatih talentamu dalam 7 hari ke depan!',
    imagePath: '/src/assets/images/hero_stained_glass_cross_1794193335064.jpg'
  }
];

export const BODY_ROLES: Record<string, BodyRoleMeta> = {
  mata: {
    id: 'mata',
    title: 'Si Mata (Visi & Pengamat)',
    symbol: '👁️',
    description: 'Peka melihat detail, membaca situasi terselubung, dan menemukan kebutuhan orang yang terabaikan.',
    scriptureQuote: '"Mata adalah pelita tubuh. Jika matamu baik, teranglah seluruh tubuhmu." (Mat 6:22)',
    specialAbility: 'Wawasan Terang: Menemukan akar masalah dan petunjuk tersembunyi yang dilewatkan orang lain.',
    color: '#0284C7'
  },
  telinga: {
    id: 'telinga',
    title: 'Si Telinga (Pendengar & Empati)',
    symbol: '👂',
    description: 'Sabar mendengarkan keluh kesah tanpa menghakimi, memahami nada emosi, dan meredakan amarah.',
    scriptureQuote: '"Setiap orang hendaklah cepat untuk mendengar, tetapi lambat untuk berkata-kata." (Yak 1:19)',
    specialAbility: 'Hening Kasih: Menenangkan orang yang panik atau terluka emosional melalui kehadiran yang mendengar.',
    color: '#E11D48'
  },
  tangan: {
    id: 'tangan',
    title: 'Si Tangan (Aksi & Pelayanan)',
    symbol: '🖐️',
    description: 'Sigap bertindak, terampil merakit solusi praktis, membagikan pertolongan materi, dan bekerja keras.',
    scriptureQuote: '"Marilah kita mengasihi bukan dengan perkataan saja, tetapi dengan perbuatan dan dalam kebenaran." (1 Yoh 3:18)',
    specialAbility: 'Aksi Nyata: Mengubah gagasan menjadi bantuan fisik langsung dan perbaikan nyata.',
    color: '#059669'
  },
  kaki: {
    id: 'kaki',
    title: 'Si Kaki (Langkah & Penggerak)',
    symbol: '🦶',
    description: 'Berani melangkah keluar dari zona nyaman, menjangkau yang jauh, dan pantang menyerah saat lelah.',
    scriptureQuote: '"Betapa indahnya kedatangan mereka yang membawa kabar baik!" (Rom 10:15)',
    specialAbility: 'Langkah Teguh: Membuka jalan baru dan memotivasi seluruh tim untuk terus maju.',
    color: '#D97706'
  },
  hati: {
    id: 'hati',
    title: 'Si Hati (Doa & Semangat Kasih)',
    symbol: '❤️',
    description: 'Menjaga kehangatan persaudaraan, berdoa syafaat saat rintangan besar, dan memancarkan harapan.',
    scriptureQuote: '"Di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan." (Kol 3:14)',
    specialAbility: 'Doa Syafaat: Memulihkan semangat seluruh tim yang patah arang dan menghadirkan damai Kristus.',
    color: '#9333EA'
  }
};

export const QUEST_MISSIONS: QuestMission[] = [
  {
    id: 'misi-1-teman-terasingkan',
    title: 'Misi 1: Teman Baru yang Mengasingkan Diri',
    context: 'Di kelas 7, ada murid baru bernama Kevin yang selalu duduk sendirian di pojok kelas saat istirahat. Dia tampak murung dan sering menunduk saat diajak bicara.',
    location: 'Ruang Kelas 7B SMP',
    requiredRoles: ['mata', 'telinga', 'hati'],
    challengeDescription: 'Beberapa teman mengira Kevin sombong. Namun tim Tubuh Kristus ingin mendekatinya dengan kasih sejati.',
    choices: [
      {
        id: 'c1',
        description: 'Kombinasi Si Mata & Si Telinga: Mengamati tanpa menghakimi, lalu duduk di sampingnya saat istirahat dan mengajaknya mengobrol santai tentang hobinya.',
        involvedRoles: ['mata', 'telinga'],
        outcomeText: 'Kevin tersentuh! Ternyata dia bukan sombong, melainkan merasa cemas karena baru pindah kota dan belum kenal siapa-siapa. Dia merasa sangat dihargai karena ada teman yang mau mendengarkan.',
        success: true,
        spiritualReflection: 'Kejadian 1:31 mengingatkan bahwa Kevin adalah ciptaan berharga. Telinga yang mendengarkan membuka pintu hati yang terkunci.'
      },
      {
        id: 'c2',
        description: 'Kombinasi Si Tangan saja: Langsung menarik tangannya secara paksa ke tengah lapangan untuk ikut main bola.',
        involvedRoles: ['tangan'],
        outcomeText: 'Kevin merasa kaget dan semakin takut karena dipaksa sebelum merasa aman.',
        success: false,
        spiritualReflection: 'Tangan tanpa telinga dan hati bisa menjadi terlalu terburu-buru. Kasih membutuhkan kepekaan mendengarkan terlebih dahulu.'
      },
      {
        id: 'c3',
        description: 'Kombinasi Si Telinga & Si Hati: Mendoakannya dalam doa pagi kelas, lalu membawakannya bekal kue buatan sendiri sambil mengajaknya bergabung ke kelompok belajar.',
        involvedRoles: ['telinga', 'hati'],
        outcomeText: 'Luar biasa! Kevin menangis haru karena merasakan kasih persaudaraan yang tulus. Dia mulai tersenyum dan mulai membuka diri.',
        success: true,
        spiritualReflection: '1 Korintus 12:26: "Jika satu anggota bersukacita, semua anggota turut bersukacita."'
      }
    ]
  },
  {
    id: 'misi-2-bencana-banjir',
    title: 'Misi 2: Aksi Kasih untuk Korban Genangan Air',
    context: 'Hujan deras semalaman membuat perkampungan di dekat sekolah tergenang air. Beberapa warga dan anak-anak balita mengungsi ke aula serbaguna.',
    location: 'Posko Pengungsian Dekat Paroki',
    requiredRoles: ['tangan', 'kaki', 'hati'],
    challengeDescription: 'Bantuan makanan menumpuk di posko tetapi belum terpilah, sementara anak-anak balita di posko tampak ketakutan dan bosan.',
    choices: [
      {
        id: 'c1',
        description: 'Sinergi Si Tangan & Si Kaki: Si Kaki mengantar paket logistik ke rumah-rumah warga lansia yang terisolir, sementara Si Tangan memilah pakaian dan menyiapkan makanan hangat.',
        involvedRoles: ['tangan', 'kaki'],
        outcomeText: 'Penyaluran bantuan berjalan sangat cepat dan tepat sasaran! Warga lansia sangat bersyukur atas ketulusan siswa-siswi kelas 7.',
        success: true,
        spiritualReflection: 'Yakobus 2:17 mengingatkan bahwa iman tanpa perbuatan pada hakikatnya adalah mati. Tangan dan Kaki bekerja sebagai instrumen kasih Allah.'
      },
      {
        id: 'c2',
        description: 'Sinergi Si Mata, Si Hati & Si Tangan: Si Mata melihat anak-anak yang murung, Si Hati berdoa bersama, dan Si Tangan mengajak mereka bernyanyi & mendongengkan kisah Alkitab.',
        involvedRoles: ['mata', 'hati', 'tangan'],
        outcomeText: 'Tangis anak-anak di posko berubah menjadi tawa ceria! Para orang tua merasa lega dan dikuatkan di tengah cobaan.',
        success: true,
        spiritualReflection: 'Matius 25:40: "Segala sesuatu yang kamu lakukan untuk salah seorang dari saudara-Ku yang paling hina ini, kamu telah melakukannya untuk Aku."'
      },
      {
        id: 'c3',
        description: 'Si Mata hanya berfoto di lokasi untuk memposting di media sosial agar viral.',
        involvedRoles: ['mata'],
        outcomeText: 'Warga merasa risih karena penderitaan mereka dijadikan konten tanpa bantuan nyata.',
        success: false,
        spiritualReflection: 'Mata yang mencari pujian diri sendiri bukanlah mata Roh Kristus. Kasih sejati tidak memegahkan diri.'
      }
    ]
  },
  {
    id: 'misi-3-festival-seni-paroki',
    title: 'Misi 3: Festival Bakat & Bazar Amal OMK/Remaja',
    context: 'Paroki mengadakan festival seni dan bazar amal untuk beasiswa anak tidak mampu. Kelas 7 diminta menampilkan satu pameran kolaboratif dalam 3 hari!',
    location: 'Gereja Paroki St. Petrus',
    requiredRoles: ['mata', 'tangan', 'kaki', 'hati', 'telinga'],
    challengeDescription: 'Setiap siswa memiliki minat berbeda: ada yang suka musik, ada yang jago gambar, ada yang rapi mengatur anggaran, dan ada yang pemalu.',
    choices: [
      {
        id: 'c1',
        description: 'Kolaborasi Penuh 5 Anggota: Si Mata merancang konsep mosaik kaca; Si Tangan melukis & membuat kerajinan; Si Kaki mencari sponsor & menyebarkan undangan; Si Telinga memediasi perbedaan pendapat; Si Hati membuka dengan doa novena.',
        involvedRoles: ['mata', 'tangan', 'kaki', 'hati', 'telinga'],
        outcomeText: 'Kemenangan besar! Stan pameran kelas 7 menjadi yang paling harmonis dan inspiratif. Dana beasiswa yang terkumpul melampaui target!',
        success: true,
        spiritualReflection: 'Roma 12:4-6: "Kita mempunyai karunia yang berlain-lainan menurut kasih karunia yang dianugerahkan kepada kita."'
      },
      {
        id: 'c2',
        description: 'Satu orang yang merasa paling pintar mengambil alih seluruh pekerjaan sendirian tanpa melibatkan teman yang lain.',
        involvedRoles: ['mata'],
        outcomeText: 'Pekerjaan tidak selesai tepat waktu, orang tersebut kelelahan dan teman-teman lain merasa tidak dihargai.',
        success: false,
        spiritualReflection: '1 Korintus 12:17: "Andaikata tubuh seluruhnya adalah mata, di manakah pendengaran?" Kerjasama mengalahkan egoisme individu.'
      }
    ]
  }
];

export const INITIAL_MOSAIC_TILES: MosaicTile[] = [
  {
    id: 'tile-1',
    x: 0,
    y: 0,
    authorName: 'Maria Gracia',
    schoolRole: 'SMP 7A',
    talentCategory: 'seni_kreasi',
    talentName: 'Menyanyi Koor & Menggambar Sketsa Alkitab',
    affirmation: 'Tuhan menganugerahkan suara untuk memuji nama-Nya dan menggambar wajah teman dengan senyuman.',
    timestamp: Date.now() - 3600000 * 5,
    likes: 12
  },
  {
    id: 'tile-2',
    x: 1,
    y: 0,
    authorName: 'Fransiskus Mario',
    schoolRole: 'SMP 7A',
    talentCategory: 'kasih_empati',
    talentName: 'Menjadi Pendengar yang Sabar',
    affirmation: 'Aku bersyukur bisa menemani teman yang sedang sedih tanpa langsung menghakimi atau menyebarkan rahasianya.',
    timestamp: Date.now() - 3600000 * 4,
    likes: 18
  },
  {
    id: 'tile-3',
    x: 2,
    y: 0,
    authorName: 'Gabriel Arya',
    schoolRole: 'SMP 7B',
    talentCategory: 'pelayanan_aksi',
    talentName: 'Ketangkasan Olahraga & Membantu Angkat Barang',
    affirmation: 'Tubuhku yang kuat adalah berkah untuk menolong ibu guru dan membantu teman yang kelelahan.',
    timestamp: Date.now() - 3600000 * 3,
    likes: 9
  },
  {
    id: 'tile-4',
    x: 0,
    y: 1,
    authorName: 'Theresia Angel',
    schoolRole: 'SMP 7A',
    talentCategory: 'spiritualitas_doa',
    talentName: 'Ketekunan Berdoa Rosario & Kedamaian Batin',
    affirmation: 'Aku percaya doa seorang sahabat mampu menguatkan mereka yang sedang menghadapi ujian berat.',
    timestamp: Date.now() - 3600000 * 2,
    likes: 15
  },
  {
    id: 'tile-5',
    x: 1,
    y: 1,
    authorName: 'Ignasius Kevin',
    schoolRole: 'SMP 7C',
    talentCategory: 'hikmat_nalar',
    talentName: 'Logika Pemrograman & Memecahkan Soal Matematika',
    affirmation: 'Akal budi adalah cermin kebijaksanaan Allah; aku senang mengajari teman yang kesulitan rumus.',
    timestamp: Date.now() - 3600000 * 1,
    likes: 14
  },
  {
    id: 'tile-6',
    x: 2,
    y: 1,
    authorName: 'Yosef Satria',
    schoolRole: 'SMP 7B',
    talentCategory: 'kepemimpinan',
    talentName: 'Mempersatukan Teman yang Berselisih',
    affirmation: 'Menjadi jembatan damai di kelas saat ada perdebatan kelompok adalah panggilan sukacitaku.',
    timestamp: Date.now() - 1800000,
    likes: 21
  }
];

export const INITIAL_AFFIRMATIONS: AffirmationCard[] = [
  {
    id: 'aff-1',
    fromStudent: 'Maria G.',
    toStudent: 'Fransiskus M.',
    talentRecognized: 'Kepekaan Hati Mendengarkan',
    message: 'Terima kasih Frans, minggu lalu saat nilaiku kurang baik kamu mau mendengarkan curhatku dengan sabar. Kamu sungguh mencerminkan kasih Yesus!',
    verseAnchor: 'Yakobus 1:19',
    timestamp: Date.now() - 7200000,
    category: 'kasih_empati'
  },
  {
    id: 'aff-2',
    fromStudent: 'Gabriel A.',
    toStudent: 'Ignasius K.',
    talentRecognized: 'Kesabaran Menjelaskan Pelajaran',
    message: 'Kevin, terima kasih sudah mengajariku matematika kemarin tanpa bosan. Otak encermu adalah berkat besar bagi kelas kita.',
    verseAnchor: 'Amsal 4:7',
    timestamp: Date.now() - 5400000,
    category: 'hikmat_nalar'
  },
  {
    id: 'aff-3',
    fromStudent: 'Theresia A.',
    toStudent: 'Maria G.',
    talentRecognized: 'Suara Merdu di Paduan Suara',
    message: 'Suaramu saat mazmur tanggapan di misa pembukaan tahun ajaran kemarin membuat hatiku tenang dan bersyukur pada Tuhan.',
    verseAnchor: 'Mazmur 100:2',
    timestamp: Date.now() - 3600000,
    category: 'seni_kreasi'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Saat melihat seorang teman sekelas duduk sendirian dan tampak menangis di waktu istirahat, apa reaksi spontanmu?',
    options: [
      {
        text: 'Mendekatinya perlahan, duduk di sampingnya, dan menawarkan tisu sambil siap mendengarkan bila ia ingin bercerita.',
        category: 'kasih_empati',
        trait: 'Peka terhadap luka batin sesama'
      },
      {
        text: 'Membuatkannya gambar lucu atau kartu penghiburan kecil dengan kata-kata puisi hangat.',
        category: 'seni_kreasi',
        trait: 'Mengekspresikan empati lewat karya seni'
      },
      {
        text: 'Membantunya mencari tahu sumber masalahnya dan memikirkan jalan keluar logis selangkah demi selangkah.',
        category: 'hikmat_nalar',
        trait: 'Pendekatan analitis dan solutif'
      },
      {
        text: 'Membelikannya air minum hangat atau mengajaknya berjalan pelan mencari udara segar.',
        category: 'pelayanan_aksi',
        trait: 'Tindakan praktis tanggap darurat'
      }
    ]
  },
  {
    id: 2,
    question: 'Ketika kelasmu mendapat tugas kelompok proyek Pendidikan Agama Katolik, bagian tugas apa yang paling membuatmu bersemangat?',
    options: [
      {
        text: 'Mendesain poster visual, mengedit video, atau mengatur tata panggung dan musik pengiring.',
        category: 'seni_kreasi',
        trait: 'Daya kreasi estetika tinggi'
      },
      {
        text: 'Meneliti referensi ayat Kitab Suci, membedah arti katekismus, dan menyusun argumen yang terstruktur.',
        category: 'hikmat_nalar',
        trait: 'Pencari kebenaran dan nalar tajam'
      },
      {
        text: 'Membagi tugas secara adil, menyemangati anggota tim, dan mempresentasikan hasil di depan kelas.',
        category: 'kepemimpinan',
        trait: 'Kepemimpinan dan komunikasi persuasif'
      },
      {
        text: 'Menyiapkan bahan perlengkapan, memotong karton, mengatur meja pameran, dan memastikan semua barang siap.',
        category: 'pelayanan_aksi',
        trait: 'Kesiapan melayani di balik layar'
      }
    ]
  },
  {
    id: 3,
    question: 'Bagaimana caramu biasanya mengucap syukur kepada Tuhan saat mengalami hari yang sangat membahagiakan?',
    options: [
      {
        text: 'Duduk hening di kapel/gereja atau kamar, berdoa dengan mata terpejam, dan merasakan hadirat damai-Nya.',
        category: 'spiritualitas_doa',
        trait: 'Kedalaman kontemplasi batin'
      },
      {
        text: 'Mentraktir atau membagikan makanan kecil kepada teman-teman dan membantu mereka yang membutuhkan.',
        category: 'pelayanan_aksi',
        trait: 'Menyalurkan berkat lewat perbuatan konkret'
      },
      {
        text: 'Memeluk orang tua atau sahabat dan mengucapkan terima kasih atas keberadaan mereka dalam hidupku.',
        category: 'kasih_empati',
        trait: 'Kekayaan ungkapan kasih relasional'
      },
      {
        text: 'Membuat lagu, menulis catatan refleksi di buku harian, atau melukis kenangan indah tersebut.',
        category: 'seni_kreasi',
        trait: 'Mengabadikan karya Allah lewat karya indah'
      }
    ]
  },
  {
    id: 4,
    question: 'Jika terjadi perselisihan pendapat yang panas antara dua sahabatmu dalam pemilihan ketua kelas, apa yang kamu lakukan?',
    options: [
      {
        text: 'Menjadi penengah netral, mengajak mereka duduk bersama, dan mencari titik temu yang adil bagi keduanya.',
        category: 'kepemimpinan',
        trait: 'Pembangun jembatan perdamaian'
      },
      {
        text: 'Mendengarkan uneg-uneg masing-masing secara terpisah agar emosi mereka mereda terlebih dahulu.',
        category: 'kasih_empati',
        trait: 'Menenangkan badai emosi'
      },
      {
        text: 'Menganalisis aturan pemilihan secara objektif untuk melihat solusi paling logis dan tidak melanggar kesepakatan.',
        category: 'hikmat_nalar',
        trait: 'Keadilan berbasis nalar jernih'
      },
      {
        text: 'Mendoakan secara khusus agar Roh Kudus melembutkan hati keduanya demi kerukunan persekutuan.',
        category: 'spiritualitas_doa',
        trait: 'Mengandalkan kekuatan doa syafaat'
      }
    ]
  },
  {
    id: 5,
    question: 'Di antara teladan orang kudus berikut, semangat siapakah yang paling membuat hatimu bergetar kagum?',
    options: [
      {
        text: 'Santo Fransiskus dari Asisi yang mencintai alam ciptaan, mendendangkan Kidung Saudara Matahari, dan hidup bersahaja.',
        category: 'seni_kreasi',
        trait: 'Kekaguman akan keindahan ciptaan Ilahi'
      },
      {
        text: 'Santa Teresa dari Kalkuta yang melayani orang-orang miskin, sakit, dan terlantar dengan sentuhan tangan penuh kasih.',
        category: 'pelayanan_aksi',
        trait: 'Pelayanan radikal bagi yang tersingkir'
      },
      {
        text: 'Santo Thomas Aquinas yang mendedikasikan hidupnya untuk belajar, menulis teologi, dan menerangi akal budi iman.',
        category: 'hikmat_nalar',
        trait: 'Kecintaan pada hikmat dan kebenaran'
      },
      {
        text: 'Santo Yohanes Paulus II yang berani mengarungi dunia, merangkul generasi muda, dan menyerukan perdamaian dunia.',
        category: 'kepemimpinan',
        trait: 'Kepemimpinan berani dan visioner'
      }
    ]
  }
];

export const TEACHER_RPP_INFO = {
  mataPelajaran: 'Pendidikan Agama Katolik dan Budi Pekerti',
  faseKelas: 'Fase D (SMP Kelas VII)',
  elemen: 'Pribadi Peserta Didik',
  capaianPembelajaran: 'Peserta didik mampu memahami dirinya sebagai pribadi yang unik seturut citra Allah (Imago Dei), mensyukuri keunikan dirinya dengan segala kelebihan dan keterbatasannya, serta mewujudkannya dalam sikap saling menghormati dan bekerjasama dalam persekutuan (Tubuh Kristus).',
  dimensiProfilPancasila: [
    'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia (menghargai martabat diri dan sesama sebagai citra Allah)',
    'Gotong Royong (kolaborasi anggota Tubuh Kristus)',
    'Mandiri (mengenal potensi dan keunikan pribadi)',
    'Bernalar Kritis & Kreatif (mengembangkan talenta demi kebaikan bersama)'
  ],
  metodePembelajaran: 'Discovery Learning, Refleksi Kitab Suci, Gamifikasi Kolaboratif Berbasis Web (Mosaik Tubuh Kristus & Simulasi Peran).'
};
