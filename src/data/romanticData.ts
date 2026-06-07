import { LoveCoupon, MemoryCard, RomanticQuote } from "../types";

export const ROMANTIC_QUOTES: RomanticQuote[] = [
  { text: "En todo el mundo no hay corazón para mí como el tuyo. En todo el mundo no hay amor para ti como el mío.", author: "Maya Angelou" },
  { text: "Si sé lo que es el amor, es gracias a ti, mi Pichis hermosa.", author: "Herman Hesse (adaptado para mi niña peshosha) 💖" },
  { text: "Te amo no solo por lo que eres, sino por lo que soy cuando estoy contigo, mi Pichis.", author: "Roy Croft" },
  { text: "Mi lugar favorito en el mundo entero es estar a tu lado, tomados de la mano.", author: "Tu novio Angel Antonio \"Anto\" 🥰" },
  { text: "Prometo amarte en tus días de sol, pero sobre todo abrazarte fuerte en tus días de lluvia.", author: "Anto" },
  { text: "Eres la casualidad más bonita que ha llegado a mi vida y no te cambiaría por nada en el universo.", author: "De Angel Antonio para Alicia Salas ✨" },
  { text: "Contigo el tiempo vuela, las risas sobran, y mi corazón late de felicidad absoluta.", author: "Tu novio consentido" },
  { text: "No te amo solo por un momento, te amo con cada latido que da mi corazón, mi niña peshosha.", author: "Para mi reina Alicia \"Pichis\"" }
];

export const INITIAL_COUPONS: LoveCoupon[] = [
  {
    id: "coupon-1",
    title: "Vale por una Tarde de Películas y Mimos",
    description: "Válido para una tarde entera acurrucados con tu snack favorito, mantitas y caricias ilimitadas. ¡Anto no puede decir que no a su niña peshosha!",
    category: "Cine y Relax",
    code: "VALE-CINE-KISS-77",
    emoji: "🍿"
  },
  {
    id: "coupon-2",
    title: "Vale por una Cena Especial Preparada por Anto",
    description: "Válido para que Anto te cocine tu comida favorita, ponga velas y ponga música romántica de fondo para consentirte como la reina que eres.",
    category: "Gastronomía de Amor",
    code: "VALE-CENA-CHEF-99",
    emoji: "🍝"
  },
  {
    id: "coupon-3",
    title: "Vale por un Abrazo Infinito de Oso (5 Minutos+)",
    description: "Cuando mi Pichis tenga frío, cansancio o simplemente quiera refugiarse, este ticket le da derecho a un abrazo súper apretado de oso de parte de Anto.",
    category: "Cariño Directo",
    code: "VALE-ABRAZO-OSO-00",
    emoji: "🧸"
  },
  {
    id: "coupon-4",
    title: "Vale por un Helado o Postre Sorpresa",
    description: "Canjeable en cualquier momento para que Anto vaya corriendo a buscar tu helado favorito o postre preferido para alegrar a su niña hermosa.",
    category: "Dulzuras de Pareja",
    code: "VALE-DULCE-PICHIS-22",
    emoji: "🍦"
  },
  {
    id: "coupon-5",
    title: "Vale por un Día Entero de Consentimiento Absoluto",
    description: "Hoy Anto de 17 años es el asistente personal de amor de su hermosa novia Pichis de 18. ¡Hará todo lo que le pidas con besitos incluidos!",
    category: "Realeza Humilde",
    code: "VALE-REINA-PICHIS-11",
    emoji: "👑"
  },
  {
    id: "coupon-6",
    title: "Vale por un Paseo Sin Rumbo y Tomados de la Mano",
    description: "Válido para desconectarnos del celular, salir a caminar, ver el atardecer y platicar de nuestra hermosa historia de amor que empezó el 19 de junio del 2025.",
    category: "Aventura Tranquila",
    code: "VALE-PASEO-JUNTOS-55",
    emoji: "🌅"
  }
];

export const INITIAL_MEMORIES: MemoryCard[] = [
  {
    id: "memory-1",
    date: "14 de Febrero",
    title: "Nuestra Primera Cita Especial",
    description: "Esa tarde donde las miradas lo dijeron todo y las risas no pararon. El comienzo del capítulo más hermoso de todos.",
    category: "romantic",
    imageUrl: "https://picsum.photos/seed/first_date/500/400"
  },
  {
    id: "memory-2",
    date: "Tarde de Lluvia",
    title: "Un Atardecer Perfectamente Juntos",
    description: "Compartiendo auriculares, escuchando nuestra música preferida y viendo llover desde la ventana. No hacía falta nada más.",
    category: "cozy",
    imageUrl: "https://picsum.photos/seed/rainy_cozy/500/400"
  },
  {
    id: "memory-3",
    date: "Día de Risas",
    title: "Nuestra Foto Más Divertida",
    description: "Haciendo caras graciosas, despeinados y felices. Juntos podemos ser nosotros mismos sin filtros ni temores.",
    category: "funny",
    imageUrl: "https://picsum.photos/seed/funny_love/500/400"
  },
  {
    id: "memory-4",
    date: "Fin de Semana",
    title: "Esa Pequeña Gran Escapada",
    description: "Explorando nuevos rincones, tomando fotos bonitas y descubriendo que cualquier lugar del mundo es perfecto si estoy contigo.",
    category: "adventure",
    imageUrl: "https://picsum.photos/seed/love_trip/500/400"
  }
];

export const FLOWER_SPECIES = [
  {
    type: "rose" as const,
    name: "Rosa Roja del Amor Eterno",
    color: "from-rose-500 to-red-600",
    bloomShape: "🌹",
    description: "Símbolo de la pasión, el respeto infinito y la fuerza del amor que Anto (17) te tiene a ti, su Pichis hermosa (18).",
    messages: [
      "Eres mi pensamiento al despertar, mi niñaa peshosha.",
      "Cada rosa tiene espinas, pero nuestro amor es perfecta armonía.",
      "Con todo mi corazón, te pertenezco mi Pichis.",
      "Pichis, eres el destello de luz que ilumina incluso mis días más oscuros."
    ]
  },
  {
    type: "tulip" as const,
    name: "Tulipán Rosado de la Ternura",
    color: "from-pink-400 to-rose-400",
    bloomShape: "🌷",
    description: "Representa el cariño puro, el romance sincero y el cuidado mutuo todos los días entre nosotros.",
    messages: [
      "Amo tu risa contagiosa, me vuelve loco.",
      "Tus ojos son mi paisaje preferido en el mundo entero.",
      "Gracias por hacerme el novio de 17 años más feliz del mundo al lado de mi hermosa novia de 18. 🥰",
      "Junto a ti, Pichis, aprendí la belleza del amor verdadero."
    ]
  },
  {
    type: "sunflower" as const,
    name: "Girasol Radiante de la Alegría",
    color: "from-yellow-400 to-amber-500",
    bloomShape: "🌻",
    description: "Símbolo de la energía positiva, la calidez y la lealtad absoluta en nuestro caminar desde el 19 de junio del 2025.",
    messages: [
      "Eres mi sol en días nublados, mi Pichis.",
      "Adoro ver cómo eres tan única, inteligente y valiente.",
      "¡Qué lindo coincidir en esta vida contigo el 19 de junio del 2025!",
      "Pichis, brillas con luz propia y me llenas de orgullo constante."
    ]
  },
  {
    type: "orchid" as const,
    name: "Orquídea Mágica de la Admiración",
    color: "from-purple-400 to-fuchsia-500",
    bloomShape: "🌸",
    description: "Expresa la belleza inigualable de tu ser, tu elegancia y el asombro continuo que inspiras en Anto.",
    messages: [
      "Admiro tu inmensa bondad y ternura.",
      "Eres una mujer increíble de 18 años, inteligente y hermosa. Nunca lo olvides.",
      "Me enamoro de ti de nuevo cada día.",
      "Mi mundo es mil veces más hermoso porque decidiste ser mi novia, mi niñaa peshosha."
    ]
  }
];
