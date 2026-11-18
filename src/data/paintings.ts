import { Painting, WallPreset } from '../types/gallery';

export const GALLERY_INTERIOR_IMAGE =
  '/src/assets/images/gallery_hero_interior_1794976026926.jpg';

export const WALL_PRESETS: WallPreset[] = [
  { id: 'alabaster', name: 'Alabaster Galeri', hex: '#F4F1EA', isDark: false },
  { id: 'warm-cream', name: 'Krem Hangat', hex: '#E8DFD1', isDark: false },
  { id: 'sage', name: 'Sage Klasik', hex: '#CBD2C6', isDark: false },
  { id: 'prussian', name: 'Biru Prusia', hex: '#233342', isDark: true },
  { id: 'terracotta', name: 'Terracotta Senja', hex: '#7A3E2E', isDark: true },
  { id: 'charcoal', name: 'Arang Museum', hex: '#262320', isDark: true },
];

export const PAINTINGS: Painting[] = [
  {
    id: 'starry-night',
    accessionNumber: 'ACC. 1889.06.01',
    title: 'The Starry Night',
    englishTitle: 'De sterrennacht',
    artist: 'Vincent van Gogh',
    artistLifespan: '1853–1890',
    nationality: 'Belanda',
    year: 1889,
    yearDisplay: '1889',
    movement: 'Post-Impresionisme',
    medium: 'Cat minyak di atas kanvas',
    dimensions: '73.7 × 92.1 cm',
    museumLocation: 'Museum of Modern Art (MoMA), New York',
    imageUrl: '/src/assets/images/starry_night_painting_1794976022651.jpg',
    aspectRatio: '4:3',
    featuredWeekly: true,
    quote: 'Memandang bintang selalu membuatku bermimpi, sesederhana titik-titik hitam di atas peta yang menandai kota dan desa.',
    quoteAttribution: 'Vincent van Gogh, Surat kepada Theo (1888)',
    summary:
      'Pusaran langit malam kobalt yang bergolak di atas desa tenang Saint-Rémy-de-Provence, memadukan pengamatan astronomis dengan gejolak batin sang pelukis.',
    history: {
      background:
        'Dilukis pada Juni 1889 dari jendela kamar perawatan berjeruji besi di Saint-Paul-de-Mausole, Saint-Rémy-de-Provence, Prancis. Karena dilarang melukis di kamar tidurnya, Van Gogh merekam pemandangan fajar melalui ingatan dan sketsa arang di studionya di lantai dasar.',
      symbolism:
        'Pohon cemara yang menjulang gelap di sisi kiri melambangkan jembatan antara bumi dan keabadian, sementara pusaran kabut bintang menggambarkan energi kosmik kehidupan. Desa di bagian bawah bukanlah gambaran akurat Saint-Rémy, melainkan gabungan kenangan kampung halaman Van Gogh di Belanda.',
      mysteryAndFacts:
        'Penelitian astrofisika modern menemukan bahwa pola pusaran awan dalam lukisan ini secara matematis mendekati teori turbulensi aliran fluida Kolmogorov. Bintang paling terang di sebelah pohon cemara sebenarnya adalah planet Venus, yang memang bersinar sangat terang pada musim semi 1889.',
    },
    palette: [
      { name: 'Ultramarine Dalam', hex: '#1B3B6F', pigmentNote: 'Dominan langit malam dan kontur bukit' },
      { name: 'Kobalt Langit', hex: '#3D6FA8', pigmentNote: 'Aliran pusaran angin malam' },
      { name: 'Kuning Krom', hex: '#E8B838', pigmentNote: 'Cahaya bulan sabit dan inti bintang' },
      { name: 'Hijau Cemara', hex: '#1D2D24', pigmentNote: 'Siluet pohon cemara di latar depan' },
      { name: 'Krem Pucat', hex: '#EBDFA7', pigmentNote: 'Halo cahaya di sekitar benda langit' },
    ],
    audioGuide: {
      durationSeconds: 78,
      narrator: 'Kurator Nadia Kusuma',
      segments: [
        {
          timeSeconds: 0,
          label: '01. Jendela Saint-Rémy',
          transcript:
            'Selamat datang di hadapan The Starry Night. Bayangkan bulan Juni 1889, saat Vincent van Gogh memandang langit menjelang fajar dari balik jeruji kamarnya di Prancis Selatan.',
        },
        {
          timeSeconds: 26,
          label: '02. Sapuan Impasto & Gerak Kosmos',
          transcript:
            'Perhatikan sapuan kuas tebal atau impasto yang melingkar. Van Gogh tidak sekadar menggambar bintang, ia melukis irama udara dan cahaya yang bergerak menembus kegelapan.',
        },
        {
          timeSeconds: 52,
          label: '03. Pohon Cemara & Desa Kenangan',
          transcript:
            'Di sisi kiri, cemara gelap menjulang bagaikan nyala api, menghubungkan desa kecil bercahaya hangat di bawah dengan luasnya langit tak bertepi.',
        },
      ],
    },
    reproductionBasePrice: 1250000,
  },
  {
    id: 'mona-lisa',
    accessionNumber: 'ACC. 1503.01.04',
    title: 'Mona Lisa',
    englishTitle: 'La Gioconda',
    artist: 'Leonardo da Vinci',
    artistLifespan: '1452–1519',
    nationality: 'Italia',
    year: 1503,
    yearDisplay: '1503–1519',
    movement: 'Renaisans',
    medium: 'Cat minyak di atas panel kayu poplar',
    dimensions: '77 × 53 cm',
    museumLocation: 'Musée du Louvre, Paris',
    imageUrl: '/src/assets/images/mona_lisa_painting_1794976020797.jpg',
    aspectRatio: '3:4',
    featuredWeekly: true,
    quote: 'Lukisan adalah puisi yang terlihat daripada didengar, dan puisi adalah lukisan yang didengar daripada terlihat.',
    quoteAttribution: 'Leonardo da Vinci, Trattato della Pittura',
    summary:
      'Potret Renaisans paling masyhur di dunia, terkenal berkat teknik gradasi halus sfumato dan tatapan penuh teka-teki yang mengikuti pengamat.',
    history: {
      background:
        'Dipercaya sebagai potret Lisa Gherardini, istri pedagang sutra Florence bernama Francesco del Giocondo. Leonardo mulai mengerjakannya sekitar tahun 1503 dan membawanya ke Prancis pada 1516, terus menyempurnakan lapisan glaze tipis hingga akhir hayatnya.',
      symbolism:
        'Pose piramida yang tenang, tangan yang saling bertumpu lembut, dan lanskap berliku tanpa jembatan manusia di belakangnya merepresentasikan keharmonisan antara tubuh manusia dan alam semesta menurut filsafat humanisme Renaisans.',
      mysteryAndFacts:
        'Senyum Mona Lisa tampak berubah tergantung titik fokus mata penonton karena perbedaan sensitivitas penglihatan sentral dan perifer. Lukisan ini juga sempat dicuri dari Louvre pada 1911 oleh Vincenzo Peruggia dan baru ditemukan dua tahun kemudian di Florence—peristiwa yang melambungkan ketenarannya secara global.',
    },
    palette: [
      { name: 'Umber Bakar', hex: '#4A3423', pigmentNote: 'Bayangan lembut teknik sfumato' },
      { name: 'Ochre Emas', hex: '#9A7842', pigmentNote: 'Rona kulit hangat dan busana brokat' },
      { name: 'Lapis Lazuli Kabut', hex: '#54737B', pigmentNote: 'Perspektif atmosfer pegunungan jauh' },
      { name: 'Karmijn Tua', hex: '#5A221E', pigmentNote: 'Lapisan velvet lengan gaun' },
      { name: 'Gading Kusam', hex: '#D6C29F', pigmentNote: 'Sorotan halus pada wajah dan tangan' },
    ],
    audioGuide: {
      durationSeconds: 72,
      narrator: 'Kurator Nadia Kusuma',
      segments: [
        {
          timeSeconds: 0,
          label: '01. Keajaiban Sfumato',
          transcript:
            'Leonardo da Vinci melukis hingga tiga puluh lapisan cat minyak transparan, beberapa lebih tipis dari sehelai rambut, untuk menghilangkan garis batas keras di sekitar mata dan bibir.',
        },
        {
          timeSeconds: 25,
          label: '02. Teka-teki Senyuman',
          transcript:
            'Ketika Anda menatap langsung ke bibirnya, senyumnya tampak memudar. Namun saat pandangan beralih ke matanya, bayangan di sudut bibir kembali menciptakan senyum samar.',
        },
        {
          timeSeconds: 50,
          label: '03. Dunia di Balik Jendela',
          transcript:
            'Perhatikan dua sisi lanskap di belakangnya yang memiliki ketinggian cakrawala sedikit berbeda—strategi halus Leonardo untuk menciptakan kedalaman ruang yang hidup.',
        },
      ],
    },
    reproductionBasePrice: 1450000,
  },
  {
    id: 'pearl-earring',
    accessionNumber: 'ACC. 1665.03.12',
    title: 'Girl with a Pearl Earring',
    englishTitle: 'Meisje met de parel',
    artist: 'Johannes Vermeer',
    artistLifespan: '1632–1675',
    nationality: 'Belanda',
    year: 1665,
    yearDisplay: 'sekitar 1665',
    movement: 'Barok',
    medium: 'Cat minyak di atas kanvas',
    dimensions: '44.5 × 39 cm',
    museumLocation: 'Mauritshuis, Den Haag',
    imageUrl: '/src/assets/images/pearl_earring_painting_1794976023055.jpg',
    aspectRatio: '3:4',
    featuredWeekly: true,
    quote: 'Cahaya bukan sekadar penerang benda, melainkan napas keheningan yang membuat sebuah momen terasa abadi.',
    quoteAttribution: 'Catatan Kuratorial Mauritshuis tentang Vermeer',
    summary:
      'Sering dijuluki "Mona Lisa dari Utara", karya tronie Belanda ini memancarkan keintiman lewat kilau dua sapuan cat yang membentuk sebutir mutiara.',
    history: {
      background:
        'Diciptakan pada masa keemasan seni lukis Belanda di Delft. Karya ini bukan potret resmi pesanan bangsawan, melainkan sebuah "tronie"—studi ekspresi wajah dan busana eksotis (seperti sorban biru) yang memamerkan kecakapan pelukis menangkap cahaya.',
      symbolism:
        'Tatapan mata yang baru saja menoleh, bibir sedikit terbuka seakan hendak berbicara, dan anting mutiara besar menjadi simbol kemurnian sekaligus kefanaan waktu dalam tradisi seni Barok Belanda.',
      mysteryAndFacts:
        'Pemeriksaan mikroskopis modern mengungkap bahwa anting mutiara tersebut tidak memiliki kait pengait yang jelas; mutiara itu hanyalah dua sapuan putih timbal dan pantulan kerah putih di latar gelap. Latar belakangnya dahulu berwarna hijau tua transparan sebelum menggelap seiring abad.',
    },
    palette: [
      { name: 'Lapis Lazuli Delft', hex: '#2B5382', pigmentNote: 'Pigmen mahal batu lapis pada sorban' },
      { name: 'Ochre Kuning', hex: '#C2934E', pigmentNote: 'Ekor kain sorban yang menjuntai' },
      { name: 'Putih Mutiara', hex: '#ECE9E1', pigmentNote: 'Kilau utama pada anting dan kerah' },
      { name: 'Hitam Gading', hex: '#181715', pigmentNote: 'Latar chiaroscuro yang menonjolkan figur' },
      { name: 'Terakota Bibir', hex: '#B45D4C', pigmentNote: 'Sentuhan hangat alami pada raut wajah' },
    ],
    audioGuide: {
      durationSeconds: 66,
      narrator: 'Kurator Raka Pratama',
      segments: [
        {
          timeSeconds: 0,
          label: '01. Rahasia Dua Sapuan Kuas',
          transcript:
            'Dari kejauhan, anting mutiara tampak berkilau padat. Namun bila didekati, Vermeer hanya menggunakan dua sapuan cat putih terpisah di atas bayangan lembut.',
        },
        {
          timeSeconds: 24,
          label: '02. Kemewahan Pigmen Biru',
          transcript:
            'Untuk sorban biru itu, Vermeer menggunakan ultramarine alami yang digiling dari batu lapis lazuli Afghanistan—pigmen yang harganya melebihi emas pada abad ke-17.',
        },
        {
          timeSeconds: 46,
          label: '03. Keintiman Momen',
          transcript:
            'Tidak ada nama model yang tercatat. Misteri identitasnya justru membuat penonton merasa berhadapan dengan sosok nyata yang menoleh sesaat ke arah kita.',
        },
      ],
    },
    reproductionBasePrice: 1180000,
  },
  {
    id: 'impression-sunrise',
    accessionNumber: 'ACC. 1872.11.02',
    title: 'Impression, Sunrise',
    englishTitle: 'Impression, soleil levant',
    artist: 'Claude Monet',
    artistLifespan: '1840–1926',
    nationality: 'Prancis',
    year: 1872,
    yearDisplay: '1872',
    movement: 'Impresionisme',
    medium: 'Cat minyak di atas kanvas',
    dimensions: '48 × 63 cm',
    museumLocation: 'Musée Marmottan Monet, Paris',
    imageUrl: '/src/assets/images/impression_sunrise_painting_1794976022706.jpg',
    aspectRatio: '4:3',
    quote: 'Mereka bertanya judul lukisan ini untuk katalog. Karena tidak bisa disebut pemandangan Le Havre, saya berkata: tuliskan saja Impresi.',
    quoteAttribution: 'Claude Monet (1874)',
    summary:
      'Lukisan pelabuhan Le Havre saat fajar yang secara tidak sengaja melahirkan nama gerakan Impresionisme melalui kritik tajam seorang jurnalis seni.',
    history: {
      background:
        'Dilukis di kampung halaman Monet, Le Havre, Prancis, pada tahun 1872 dan dipamerkan dalam pameran independen pertama para perupa muda Paris pada April 1874—sebuah pameran yang menentang aturan kaku Académie des Beaux-Arts.',
      symbolism:
        'Daripada merayakan kejayaan industri pelabuhan Prancis secara realistis, Monet menangkap pengalaman visual sesaat: bagaimana kabut pagi melarutkan bentuk derek besi dan perahu menjadi nada warna abu-abu kebiruan yang puitis.',
      mysteryAndFacts:
        'Kritikus Louis Leroy awalnya menulis ulasan sinis berjudul "Pameran Kaum Impresionis" untuk mengejek gaya sketsa Monet. Para pelukis justru menerima ejekan itu sebagai kehormatan. Analisis astronomis modern membuktikan lukisan ini dibuat tepat pada 13 November 1872 pukul 07:35 pagi.',
    },
    palette: [
      { name: 'Oranye Kadmium', hex: '#E8632B', pigmentNote: 'Bola matahari terbit dan pantulan air' },
      { name: 'Biru Kabut Le Havre', hex: '#6F8293', pigmentNote: 'Atmosfer kabut pelabuhan fajar' },
      { name: 'Abu Lembayung', hex: '#988F96', pigmentNote: 'Gradasi langit dan asap kapal uap' },
      { name: 'Arang Perahu', hex: '#2E343B', pigmentNote: 'Siluet perahu dayung di latar depan' },
      { name: 'Krem Fajar', hex: '#DFC7AD', pigmentNote: 'Cahaya pagi yang menembus awan' },
    ],
    audioGuide: {
      durationSeconds: 69,
      narrator: 'Kurator Nadia Kusuma',
      segments: [
        {
          timeSeconds: 0,
          label: '01. Lahirnya Sebuah Gerakan',
          transcript:
            'Pada 1874, judul lukisan ini menjadi bahan cemoohan kritikus akademis yang menganggapnya belum selesai. Namun dari sinilah era seni modern Eropa dimulai.',
        },
        {
          timeSeconds: 25,
          label: '02. Ilusi Luminans',
          transcript:
            'Jika lukisan ini diubah menjadi hitam-putih, matahari oranye itu hampir menghilang karena tingkat kecerahannya identik dengan langit abu-abu di sekitarnya—sebuah trik optik brilian.',
        },
        {
          timeSeconds: 48,
          label: '03. Melukis Udara, Bukan Benda',
          transcript:
            'Monet melatih mata kita untuk melihat getaran cahaya dan kelembapan kabut pelabuhan, bukan sekadar detail kayu kapal atau tali-temali.',
        },
      ],
    },
    reproductionBasePrice: 1120000,
  },
  {
    id: 'great-wave',
    accessionNumber: 'ACC. 1831.02.36',
    title: 'The Great Wave off Kanagawa',
    englishTitle: 'Kanagawa-oki Nami Ura',
    artist: 'Katsushika Hokusai',
    artistLifespan: '1760–1849',
    nationality: 'Jepang',
    year: 1831,
    yearDisplay: 'sekitar 1831',
    movement: 'Ukiyo-e',
    medium: 'Cetakan cukil kayu warna (nishiki-e) di atas kertas washi',
    dimensions: '25.7 × 37.9 cm',
    museumLocation: 'Metropolitan Museum of Art / Tokyo National Museum',
    imageUrl: '/src/assets/images/great_wave_painting_1794976024563.jpg',
    aspectRatio: '4:3',
    quote: 'Sejak usia enam tahun aku gemar menggambar bentuk benda. Pada usia tujuh puluh tiga, barulah aku sedikit memahami struktur alam.',
    quoteAttribution: 'Katsushika Hokusai (1834)',
    summary:
      'Mahakarya cetak cukil kayu Jepang yang memadukan kekuatan dahsyat samudra dengan ketenangan Gunung Fuji di kejauhan melalui pigmen Biru Prusia.',
    history: {
      background:
        'Merupakan cetakan pertama dari seri legendaris "Tiga Puluh Enam Pemandangan Gunung Fuji" yang dibuat Hokusai saat berusia 71 tahun pada akhir era Edo. Karya ini kemudian menginspirasi pelukis Barat seperti Van Gogh, Monet, dan komposer Claude Debussy.',
      symbolism:
        'Ombak raksasa yang mencengkeram tiga perahu nelayan oshiokuri-bune melambangkan kekuatan alam yang tak terduga sekaligus ketabahan manusia. Kontrasnya, Gunung Fuji tetap kokoh dan hening di pusat bingkai sebagai lambang keabadian.',
      mysteryAndFacts:
        'Karya ini menandai revolusi warna di Jepang karena Hokusai memanfaatkan pigmen sintetis impor Eropa bernama "Berolin-ai" (Biru Prusia) yang jauh lebih tahan pudar dibandingkan pewarna nila tradisional.',
    },
    palette: [
      { name: 'Biru Prusia (Bero-ai)', hex: '#143356', pigmentNote: 'Kedalaman tubuh gelombang samudra' },
      { name: 'Biru Indigo Pucat', hex: '#4B749F', pigmentNote: 'Gradasi buih dan puncak ombak' },
      { name: 'Kertas Washi Hangat', hex: '#E8D5B2', pigmentNote: 'Langit senja dan kertas dasar cetakan' },
      { name: 'Ochre Kayu Perahu', hex: '#B8945F', pigmentNote: 'Tiga perahu nelayan yang terombang-ambing' },
      { name: 'Putih Salju Fuji', hex: '#F3EFE6', pigmentNote: 'Puncak Gunung Fuji dan buih ombak' },
    ],
    audioGuide: {
      durationSeconds: 64,
      narrator: 'Kurator Raka Pratama',
      segments: [
        {
          timeSeconds: 0,
          label: '01. Cukilan Kayu Era Edo',
          transcript:
            'Karya ini bukanlah lukisan tunggal, melainkan hasil kolaborasi pelukis, pemahat blok kayu ceri, dan pencetak yang menghasilkan ribuan lembar pada zamannya.',
        },
        {
          timeSeconds: 22,
          label: '02. Dinamika Kiri ke Kanan',
          transcript:
            'Dalam tradisi baca Jepang dari kanan ke kiri, perahu nelayan tampak melaju menantang ombak yang datang menghadang secara dramatis.',
        },
        {
          timeSeconds: 44,
          label: '03. Pengaruh Lintas Benua',
          transcript:
            'Ketika pelabuhan Jepang terbuka pada pertengahan abad ke-19, cetakan Hokusai memicu gelombang "Japonisme" yang mengubah arah seni modern Eropa.',
        },
      ],
    },
    reproductionBasePrice: 980000,
  },
  {
    id: 'the-scream',
    accessionNumber: 'ACC. 1893.09.07',
    title: 'The Scream',
    englishTitle: 'Skrik',
    artist: 'Edvard Munch',
    artistLifespan: '1863–1944',
    nationality: 'Norwegia',
    year: 1893,
    yearDisplay: '1893',
    movement: 'Ekspresionisme',
    medium: 'Minyak, tempera, dan pastel di atas karton',
    dimensions: '91 × 73.5 cm',
    museumLocation: 'National Museum of Norway, Oslo',
    imageUrl: '/src/assets/images/the_scream_painting_1794976024928.jpg',
    aspectRatio: '3:4',
    quote: 'Aku berdiri gemetar karena cemas, dan kurasakan jeritan tak berujung menggema menembus alam semesta.',
    quoteAttribution: 'Edvard Munch, Buku Harian Nice (1892)',
    summary:
      'Ikon universal kecemasan eksistensial manusia modern di bawah langit senja merah darah yang berombak di atas fyord Oslo.',
    history: {
      background:
        'Terinspirasi oleh pengalaman nyata Munch saat berjalan di bukit Ekeberg yang menghadap kota Kristiania (kini Oslo) bersama dua temannya ketika matahari terbenam mendadak mewarnai awan seperti lidah api dan darah.',
      symbolism:
        'Figur di latar depan tidak sedang berteriak, melainkan menutup telinga dari "jeritan alam" yang mengguncang jiwanya. Garis jembatan yang lurus dan kaku kontras dengan garis-garis langit dan air yang beriak gelisah.',
      mysteryAndFacts:
        'Sejarawan cuaca menduga langit merah darah yang dilihat Munch pada 1883 dipicu oleh partikel abu vulkanik letusan dahsyat Gunung Krakatau di Indonesia yang menyebar hingga atmosfer Eropa Utara dan menghasilkan senja merah menyala selama berbulan-bulan.',
    },
    palette: [
      { name: 'Merah Senja Krakatau', hex: '#A73422', pigmentNote: 'Gelombang awan dramatis di langit' },
      { name: 'Oranye Api', hex: '#D87528', pigmentNote: 'Pendar cahaya matahari terbenam' },
      { name: 'Biru Fyord Malam', hex: '#1B2D45', pigmentNote: 'Teluk Oslo yang bergelombang' },
      { name: 'Ochre Karton', hex: '#9A784B', pigmentNote: 'Permukaan karton mentah yang sengaja terlihat' },
      { name: 'Pucat Tulang', hex: '#C7B88E', pigmentNote: 'Wajah figur yang terdistorsi oleh emosi' },
    ],
    audioGuide: {
      durationSeconds: 70,
      narrator: 'Kurator Nadia Kusuma',
      segments: [
        {
          timeSeconds: 0,
          label: '01. Senja yang Mengguncang',
          transcript:
            'Di bukit Ekeberg, Munch merasakan kelelahan fisik dan batin yang mendalam. Saat dua rekannya terus melangkah tenang di belakang, dunia di sekelilingnya terasa bergetar.',
        },
        {
          timeSeconds: 25,
          label: '02. Jejak Letusan Krakatau',
          transcript:
            'Banyak peneliti meyakini langit merah menyala dalam memori Munch berasal dari fenomena optik atmosfer akibat letusan Krakatau pada 1883 di Nusantara.',
        },
        {
          timeSeconds: 48,
          label: '03. Manifestasi Ekspresionisme',
          transcript:
            'Munch tidak berusaha menyalin realitas foto. Ia memelintir warna dan perspektif agar penonton merasakan langsung getaran psikologis sang pelukis.',
        },
      ],
    },
    reproductionBasePrice: 1150000,
  },
  {
    id: 'persistence-of-memory',
    accessionNumber: 'ACC. 1931.04.15',
    title: 'The Persistence of Memory',
    englishTitle: 'La persistencia de la memoria',
    artist: 'Salvador Dalí',
    artistLifespan: '1904–1989',
    nationality: 'Spanyol',
    year: 1931,
    yearDisplay: '1931',
    movement: 'Surealisme',
    medium: 'Cat minyak di atas kanvas',
    dimensions: '24 × 33 cm',
    museumLocation: 'Museum of Modern Art (MoMA), New York',
    imageUrl: '/src/assets/images/persistence_memory_painting_1794976029354.jpg',
    aspectRatio: '4:3',
    quote: 'Perbedaan antara diriku dan orang gila hanyalah bahwa aku tidak gila.',
    quoteAttribution: 'Salvador Dalí',
    summary:
      'Lanskap mimpi Surealis berukuran mungil yang mempertanyakan kekakuan waktu melalui arloji-arloji saku yang meleleh di pantai Catalonia.',
    history: {
      background:
        'Dilukis pada 1931 ketika Dalí baru berusia 27 tahun di Port Lligat, Catalonia. Menurut penuturan Dalí, gagasan jam yang meleleh muncul setelah ia memandang keju Camembert yang meleleh di bawah sinar matahari sore.',
      symbolism:
        'Arloji lunak melambangkan relativitas waktu dalam alam mimpi dan bawah sadar—tempat di mana hukum fisika dan kronologi manusia kehilangan kuasanya. Semut-semut yang berkerumun di jam jingga adalah simbol Dalí untuk pembusukan dan kefanaan.',
      mysteryAndFacts:
        'Berbeda dari bayangan orang yang mengira lukisan ini berukuran raksasa, kanvas aslinya hanya sebesar selembar kertas majalah (24 × 33 cm). Tebing emas di latar belakang adalah gambaran nyata Tanjung Creus di tanah kelahiran Dalí.',
    },
    palette: [
      { name: 'Emas Tebing Catalonia', hex: '#D49A45', pigmentNote: 'Tebing berbatu Tanjung Creus' },
      { name: 'Biru Mediterania', hex: '#4B8396', pigmentNote: 'Laut dan cakrawala yang hening' },
      { name: 'Cokelat Bayangan', hex: '#382B22', pigmentNote: 'Latar depan yang memanjang dalam senja' },
      { name: 'Perak Meleleh', hex: '#CED3D4', pigmentNote: 'Permukaan jam lunak yang memantulkan langit' },
      { name: 'Pasir Ocher', hex: '#9D7B52', pigmentNote: 'Dataran tandus alam mimpi' },
    ],
    audioGuide: {
      durationSeconds: 65,
      narrator: 'Kurator Raka Pratama',
      segments: [
        {
          timeSeconds: 0,
          label: '01. Fotografi Mimpi Dilukis Tangan',
          transcript:
            'Dalí menyebut tekniknya sebagai "fotografi mimpi yang dilukis dengan tangan". Meskipun subjeknya mustahil di dunia nyata, detail teksturnya digarap seakurat lukisan klasik.',
        },
        {
          timeSeconds: 24,
          label: '02. Ukuran yang Mengejutkan',
          transcript:
            'Hampir setiap pengunjung museum terkejut melihat ukuran aslinya yang kecil—hanya dua puluh empat kali tiga puluh tiga sentimeter—namun terasa seluas gurun.',
        },
        {
          timeSeconds: 46,
          label: '03. Waktu yang Cair',
          transcript:
            'Di tengah zaman modern yang terobsesi pada mesin waktu dan jadwal pabrik, Dalí membebaskan jam dari kekakuannya.',
        },
      ],
    },
    reproductionBasePrice: 1090000,
  },
  {
    id: 'the-kiss',
    accessionNumber: 'ACC. 1908.05.22',
    title: 'The Kiss',
    englishTitle: 'Der Kuss',
    artist: 'Gustav Klimt',
    artistLifespan: '1862–1918',
    nationality: 'Austria',
    year: 1908,
    yearDisplay: '1907–1908',
    movement: 'Simbolisme',
    medium: 'Cat minyak, daun emas, perak, dan platinum di atas kanvas',
    dimensions: '180 × 180 cm',
    museumLocation: 'Österreichische Galerie Belvedere, Wina',
    imageUrl: '/src/assets/images/the_kiss_painting_1794976025670.jpg',
    aspectRatio: '1:1',
    quote: 'Siapa pun yang ingin mengenal diriku sebagai seniman harus memandang lukisanku dengan saksama dan mencari siapa aku sebenarnya.',
    quoteAttribution: 'Gustav Klimt',
    summary:
      'Puncak Periode Emas Gustav Klimt yang memadukan lembaran emas asli bergaya mosaik Bizantium dengan kelembutan emosi Art Nouveau Wina.',
    history: {
      background:
        'Dikerjakan antara 1907 dan 1908 di puncak gerakan Vienna Secession. Ayah Klimt adalah seorang pengukir emas, dan keahlian kerajinan logam itu menginspirasi Klimt setelah ia terpukau melihat mosaik emas abad ke-6 di Ravenna, Italia.',
      symbolism:
        'Jubah kedua figur membedakan energi maskulin (persegi panjang hitam-putih tegas) dan feminin (lingkaran bunga warna-warni yang lembut), namun keduanya menyatu dalam satu aura emas di tepi padang bunga.',
      mysteryAndFacts:
        'Lukisan ini dibeli langsung oleh pemerintah Austria pada tahun 1908 sebelum sempat selesai dipamerkan dengan harga tertinggi dalam sejarah Austria saat itu, dan sejak itu tidak pernah meninggalkan Wina.',
    },
    palette: [
      { name: 'Emas Daun Wina', hex: '#D4A83C', pigmentNote: 'Ornamen mosaik dan aura pelukan' },
      { name: 'Perunggu Klasik', hex: '#7A542B', pigmentNote: 'Latar berbintik logam antik' },
      { name: 'Merah Mawar Taman', hex: '#BD4235', pigmentNote: 'Bunga-bunga kecil di tepi jurang' },
      { name: 'Hitam Geometris', hex: '#23201D', pigmentNote: 'Motif blok tegas pada jubah pria' },
      { name: 'Hijau Padang Rumput', hex: '#4C643C', pigmentNote: 'Hamparan flora di kaki pasangan' },
    ],
    audioGuide: {
      durationSeconds: 68,
      narrator: 'Kurator Nadia Kusuma',
      segments: [
        {
          timeSeconds: 0,
          label: '01. Periode Emas Wina',
          transcript:
            'Klimt menempelkan lembaran tipis emas asli dua puluh empat karat langsung ke kanvas minyak, membuat lukisan ini berubah kilauannya setiap kali arah cahaya ruangan bergeser.',
        },
        {
          timeSeconds: 24,
          label: '02. Geometri Dua Jiwa',
          transcript:
            'Perhatikan pola di jubah mereka: bentuk kotak-kotak hitam abu-abu melambangkan ketegasan, sementara pusaran spiral bunga melambangkan kelembutan yang saling melengkapi.',
        },
        {
          timeSeconds: 47,
          label: '03. Keheningan di Tepi Jurang',
          transcript:
            'Di bawah kaki sang wanita, padang bunga berhenti mendadak di tepi jurang—mengingatkan kita bahwa momen kebahagiaan sejati sering hadir di batas kefanaan.',
        },
      ],
    },
    reproductionBasePrice: 1380000,
  },
];
