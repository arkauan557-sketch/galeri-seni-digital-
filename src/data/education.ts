import { EraArticle, QuizQuestion } from '../types/gallery';

export const ERA_ARTICLES: EraArticle[] = [
  {
    id: 'era-renaisans',
    era: 'Renaisans',
    period: 'Abad ke-14 – ke-16',
    title: 'Kelahiran Kembali Manusia & Perspektif',
    subtitle: 'Bagaimana Italia menemukan proporsi matematis, anatomi, dan teknik sfumato',
    readTime: '4 menit baca',
    keyFigures: 'Leonardo da Vinci · Michelangelo · Raphael',
    leadParagraph:
      'Setelah berabad-abad seni Eropa berfokus pada simbolisme datar abad pertengahan, era Renaisans di Florence menyalakan kembali minat terhadap filsafat klasik Yunani-Romawi, ilmu pengetahuan alam, dan martabat individu manusia.',
    bodyParagraphs: [
      'Para maestro Renaisans tidak lagi memandang melukis sekadar keterampilan tangan, melainkan disiplin intelektual yang setara dengan arsitektur dan geometri. Penemuan perspektif linear oleh Filippo Brunelleschi memungkinkan kanvas datar berubah menjadi jendela tiga dimensi yang meyakinkan.',
      'Leonardo da Vinci menyempurnakan pendekatan ini melalui studi anatomi langsung serta teknik sfumato—membaurkan transisi warna dan bayangan sehalus asap tanpa garis tepi kaku. Hasilnya bukan hanya kesempurnaan bentuk, melainkan kedalaman psikologis yang belum pernah disaksikan sebelumnya.',
    ],
    pullQuote:
      'Pelukis yang melukis hanya lewat praktik dan pandangan mata tanpa nalar ibarat cermin yang meniru tanpa memahami.',
    figureCaption: 'Fig. 1 — Penerapan sfumato dan lanskap perspektif atmosfer dalam Mona Lisa (1503).',
    imageUrl: '/src/assets/images/mona_lisa_painting_1794976020797.jpg',
  },
  {
    id: 'era-barok',
    era: 'Barok & Masa Keemasan Belanda',
    period: 'Abad ke-17',
    title: 'Teater Cahaya, Bayangan, dan Keintiman',
    subtitle: 'Dari drama gereja Roma hingga ruang tamu hening di Delft',
    readTime: '3 menit baca',
    keyFigures: 'Johannes Vermeer · Rembrandt · Caravaggio',
    leadParagraph:
      'Abad ke-17 memecah seni rupa Eropa ke dalam dua kutub cahaya yang memikat: drama kontras ekstrem chiaroscuro di Italia dan keheningan puitis ruang domestik di Republik Belanda.',
    bodyParagraphs: [
      'Di Belanda yang makmur karena perdagangan maritim, para pedagang menggantikan gereja dan raja sebagai patron seni utama. Mereka menginginkan lukisan berukuran lebih intim yang merekam kehidupan sehari-hari, peta dunia, surat cinta, dan ekspresi wajah yang jujur.',
      'Johannes Vermeer memanfaatkan cahaya alami yang masuk dari jendela sebelah kiri untuk memahat volume wajah dan kilau kain, menjadikan momen sesaat seorang gadis menoleh sebagai monumen ketenangan abadi.',
    ],
    pullQuote:
      'Dalam ruang gelap chiaroscuro, seberkas cahaya tunggal sudah cukup untuk melahirkan seluruh emosi sebuah kisah.',
    figureCaption: 'Fig. 2 — Pemanfaatan cahaya jendela samping pada Girl with a Pearl Earring (1665).',
    imageUrl: '/src/assets/images/pearl_earring_painting_1794976023055.jpg',
  },
  {
    id: 'era-impresionisme',
    era: 'Impresionisme',
    period: '1860 – 1886',
    title: 'Melukis di Ruang Terbuka & Menangkap Detik',
    subtitle: 'Revolusi kuas cepat yang membebaskan seniman dari studio tertutup',
    readTime: '4 menit baca',
    keyFigures: 'Claude Monet · Pierre-Auguste Renoir · Edgar Degas',
    leadParagraph:
      'Ditemukannya cat minyak dalam tabung timah portabel pada pertengahan abad ke-19 mengubah sejarah seni selamanya: para pelukis kini dapat membawa kanvas langsung ke pelabuhan, taman, dan tepi sungai.',
    bodyParagraphs: [
      'Kaum Impresionis menolak mencampur cat hingga mulus di palet atau menghaluskan jejak kuas. Mereka meletakkan sapuan warna murni secara berdampingan agar mata pengamat sendirilah yang memadukannya dari kejauhan—menghasilkan getaran cahaya alami yang jauh lebih hidup.',
      'Alih-alih melukis kisah mitologi kuno, mereka memuliakan perubahan cuaca, kabut pagi Le Havre, pantulan air, dan kehidupan urban Paris modern.',
    ],
    pullQuote:
      'Saya ingin melukis sebagaimana burung bernyanyi—spontan, jujur terhadap cahaya yang terus berubah setiap menit.',
    figureCaption: 'Fig. 3 — Sapuan kuas cepat dan pantulan fajar pada Impression, Sunrise (1872).',
    imageUrl: '/src/assets/images/impression_sunrise_painting_1794976022706.jpg',
  },
  {
    id: 'era-post-impresionisme',
    era: 'Post-Impresionisme & Awal Modern',
    period: '1886 – 1910',
    title: 'Ketika Warna Menjadi Bahasa Jiwa',
    subtitle: 'Melampaui pengamatan mata menuju ekspresi emosi, simbol, dan mimpi',
    readTime: '4 menit baca',
    keyFigures: 'Vincent van Gogh · Paul Cézanne · Gustav Klimt · Edvard Munch',
    leadParagraph:
      'Jika Impresionisme memotret cahaya sebagaimana ia jatuh di retina mata, generasi penerusnya bertanya: bagaimana cara melukis perasaan, kecemasan, cinta, dan getaran batin yang tak terlihat?',
    bodyParagraphs: [
      'Vincent van Gogh menebalkan sapuan catnya menjadi ritme impasto yang berputar-putar untuk mengekspresikan ketakjuban spiritual terhadap langit malam. Sementara itu, Edvard Munch memelintir warna senja menjadi gelombang emosi eksistensial.',
      'Di Wina, Gustav Klimt menggabungkan kekayaan ornamen emas dan simbolisme psikologis. Dari keberanian era inilah lahir Ekspresionisme, Kubisme, hingga Surealisme abad ke-20.',
    ],
    pullQuote:
      'Warna tidak lagi terikat pada benda aslinya; warna kini menjadi suara langsung dari pikiran sang seniman.',
    figureCaption: 'Fig. 4 — Pusaran impasto ekspresif pada The Starry Night (1889).',
    imageUrl: '/src/assets/images/starry_night_painting_1794976022651.jpg',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Teknik gradasi bayangan lembut tanpa garis batas tegas yang digunakan Leonardo da Vinci pada wajah Mona Lisa disebut apa?',
    imageUrl: '/src/assets/images/mona_lisa_painting_1794976020797.jpg',
    imageHint: 'Petunjuk visual: Perhatikan kelembutan transisi cahaya di sekitar pipi dan bibir.',
    options: ['Impasto', 'Sfumato', 'Pointillisme', 'Fresco'],
    correctIndex: 1,
    explanation:
      'Benar! Sfumato (berasal dari bahasa Italia "fumo" yang berarti asap) adalah teknik melapis puluhan cat transparan agar transisi cahaya dan bayangan selembut asap.',
  },
  {
    id: 'q2',
    question: 'Pigmen biru mahal apakah yang digunakan Johannes Vermeer pada lilitan sorban "Girl with a Pearl Earring"?',
    imageUrl: '/src/assets/images/pearl_earring_painting_1794976023055.jpg',
    imageHint: 'Petunjuk visual: Perhatikan warna biru pekat yang kontras dengan latar gelap.',
    options: [
      'Ultramarine dari batu lapis lazuli',
      'Indigo dari daun tropis',
      'Kobalt sintetis abad ke-20',
      'Azurite dari pegunungan Alpen',
    ],
    correctIndex: 0,
    explanation:
      'Tepat! Vermeer menggunakan ultramarine alami yang digiling dari batu lapis lazuli impor Afghanistan—pigmen yang harganya melebihi emas pada abad ke-17.',
  },
  {
    id: 'q3',
    question: 'Lukisan manakah yang judulnya memicu lahirnya istilah gerakan "Impresionisme" oleh kritikus seni pada tahun 1874?',
    imageUrl: '/src/assets/images/impression_sunrise_painting_1794976022706.jpg',
    options: [
      'The Great Wave off Kanagawa',
      'Impression, Sunrise',
      'The Starry Night',
      'The Persistence of Memory',
    ],
    correctIndex: 1,
    explanation:
      'Benar! Kritikus Louis Leroy menulis ulasan sindiran berjudul "Pameran Kaum Impresionis" setelah melihat karya Claude Monet ini, yang kemudian justru diabadikan sebagai nama aliran tersebut.',
  },
  {
    id: 'q4',
    question: 'Di balik keindahan "The Starry Night" (1889), objek langit apakah yang sebenarnya merupakan bintang paling terang di sebelah pohon cemara?',
    imageUrl: '/src/assets/images/starry_night_painting_1794976022651.jpg',
    options: [
      'Komet Halley',
      'Planet Venus (Bintang Kejora)',
      'Supernova Orion',
      'Gerhana Bulan Total',
    ],
    correctIndex: 1,
    explanation:
      'Tepat sekali! Catatan astronomi membuktikan planet Venus bersinar pada kecerahan maksimumnya menjelang fajar di Provence pada musim semi 1889.',
  },
  {
    id: 'q5',
    question: 'Letusan gunung berapi di Indonesia manakah yang diyakini para peneliti menghasilkan langit merah dramatis yang menginspirasi "The Scream" karya Edvard Munch?',
    imageUrl: '/src/assets/images/the_scream_painting_1794976024928.jpg',
    options: [
      'Gunung Tambora (1815)',
      'Gunung Krakatau (1883)',
      'Gunung Merapi (1872)',
      'Gunung Kelud (1901)',
    ],
    correctIndex: 1,
    explanation:
      'Benar! Abu vulkanik letusan Krakatau pada Agustus 1883 menyebar hingga langit Norwegia dan menciptakan fenomena senja merah menyala selama berbulan-bulan.',
  },
  {
    id: 'q6',
    question: 'Berapakah ukuran asli kanvas lukisan Surealis "The Persistence of Memory" karya Salvador Dalí yang menampilkan jam-jam meleleh?',
    imageUrl: '/src/assets/images/persistence_memory_painting_1794976029354.jpg',
    options: [
      'Mural raksasa 300 × 450 cm',
      'Kanvas sedang 120 × 160 cm',
      'Kanvas mungil 24 × 33 cm',
      'Panel kayu bulat diameter 90 cm',
    ],
    correctIndex: 2,
    explanation:
      'Tepat! Meski tampak seluas gurun, lukisan asli di MoMA New York ini sangat mungil—hanya 24 × 33 cm—seukuran selembar majalah.',
  },
];
