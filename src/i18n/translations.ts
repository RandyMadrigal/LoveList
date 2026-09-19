export const LANGS = ["es", "en", "pt", "fr"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABELS: Record<Lang, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  fr: "Français",
};

const en = {
  "nav.brand": "why?",
  "nav.how": "How it works",
  "nav.create": "Create",
  "nav.language": "Language",
  "nav.home": "Home",

  "hero.eyebrow": "50 reasons, one heart",
  "hero.title": "Tell them why they're everything.",
  "hero.subtitle":
    "Create a page with 50 reasons why someone is special to you, and share it with a single link.",
  "hero.cta": "Create my page",
  "hero.secondary": "See how it works",

  "how.title": "Three steps. One unforgettable link.",
  "how.1.title": "Write a name",
  "how.1.text": "Add who it's for, who it's from, and an optional message.",
  "how.2.title": "Preview the reasons",
  "how.2.text":
    "We pick 50 reasons in your language. Not feeling them? Shuffle.",
  "how.3.title": "Share the link",
  "how.3.text":
    "The whole page lives inside the link. Nothing is stored on any server.",
  "cta.title": "Ready to make someone smile?",
  "cta.text": "It takes less than a minute.",

  "create.title": "Create a love page",
  "create.subtitle": "Fill in the details and preview your 50 reasons.",
  "create.name": "Who is it for?",
  "create.namePh": "Their name",
  "create.from": "From (optional)",
  "create.fromPh": "Your name",
  "create.message": "A message (optional)",
  "create.messagePh": "Write something from the heart…",
  "create.lang": "Language of the page",
  "create.generate": "Show my reasons",
  "create.shuffle": "Shuffle reasons",
  "create.needName": "Please enter a name 💖",
  "create.previewTitle": "Your page is ready",
  "create.link": "Your link",
  "create.copy": "Copy link",
  "create.open": "Open page",
  "create.copied": "Link copied 📎",
  "create.copyFailed": "Couldn't copy the link",

  "love.title": "{count} reasons why I love {name}",
  "love.heading": "reasons why I love {name}",
  "love.from": "With love, {from}",
  "love.share": "Share",
  "love.copyLink": "Copy link",
  "love.shareTitle": "50 reasons why I love {name}",
  "love.shareText": "Find out why {name} is so special to me ❤️",
  "love.copied": "Link copied 📎",
  "love.failed": "Couldn't share the link",
  "love.reason": "Reason {n}",
  "love.makeYours": "Make your own",

  "invalid.title": "This link doesn't work",
  "invalid.text":
    "It may be incomplete or damaged. Ask for a new one, or make your own.",
  "notfound.title": "Page not found",
  "notfound.text": "This love page doesn't exist 💔",
  "notfound.cta": "Back to home",

  "privacy.title": "Privacy",
  "privacy.p1":
    "We don't use accounts, databases or tracking. Everything you type stays in your browser.",
  "privacy.p2":
    "When you create a page, its content (name, message and a random seed) is encoded inside the link. Anyone who has the link can read it, so only share it with the people you mean to.",
  "privacy.p3": "Your language choice is saved locally in your browser.",
  "privacy.p4":
    "Links stop working 24 hours after they are created. That check happens in your browser, so it hides the page but does not erase what is inside the link.",
  "footer.made": "❤️",
  "footer.privacy": "Privacy",

  "create.styleTitle": "Choose the experience",
  "create.paletteTitle": "Pick a color mood",
  "create.expiryNote":
    "This link lasts 24 hours from the moment you create it.",
  "create.share": "Share",
  "create.nameModeTitle": "Their name inside the reasons",
  "create.nickname": "Pet name (optional)",
  "create.nicknamePh": "e.g. sweetheart",
  "create.nicknameHint":
    "Used instead of their name in the reasons that mention it.",
  "nameMode.never": "Never",
  "nameMode.sometimes": "Sometimes",
  "nameMode.always": "Always",

  "exp.story.name": "One at a time",
  "exp.story.desc": "Swipe through full-screen reasons.",
  "exp.envelope.name": "Envelope",
  "exp.envelope.desc": "A sealed letter that opens with a tap.",
  "exp.lyrics.name": "Lyrics",
  "exp.lyrics.desc": "Reasons glow one by one, like a song.",
  "exp.scroll.name": "Scroll story",
  "exp.scroll.desc": "One reason per screen as you scroll.",

  "palette.rose": "Rose",
  "palette.sunset": "Sunset",
  "palette.midnight": "Midnight",
  "palette.lavender": "Lavender",
  "palette.mint": "Mint",
  "palette.gold": "Gold",

  "exp.expiresIn": "Disappears in {time}",
  "exp.swipe": "Swipe to continue",
  "exp.progress": "{n} / {total}",
  "exp.introFor": "For {name}",
  "exp.endTitle": "And that's only the beginning.",
  "exp.tapToOpen": "Tap to open",
  "exp.letterFallback":
    "I wrote down some things I've always wanted to tell you.",
  "exp.readReasons": "Read the reasons",
  "exp.play": "Play",
  "exp.pause": "Pause",
  "exp.prev": "Previous",
  "exp.next": "Next",
  "exp.vibrationOn": "Vibration on",
  "exp.vibrationOff": "Vibration off",
  "exp.scrollHint": "Scroll",
  "expired.title": "This link has expired",
  "expired.text": "Links last 24 hours. Ask for a new one, or make your own.",
} as const;

export type TranslationKey = keyof typeof en;
type Dict = Record<TranslationKey, string>;

const es: Dict = {
  "nav.brand": "why?",
  "nav.how": "Cómo funciona",
  "nav.create": "Crear",
  "nav.language": "Idioma",
  "nav.home": "Inicio",

  "hero.eyebrow": "50 razones, un corazón",
  "hero.title": "Dile por qué lo es todo para ti.",
  "hero.subtitle":
    "Crea una página con 50 razones por las que alguien es especial para ti y compártela con un solo enlace.",
  "hero.cta": "Crear mi página",
  "hero.secondary": "Ver cómo funciona",

  "how.title": "Tres pasos. Un enlace inolvidable.",
  "how.1.title": "Escribe un nombre",
  "how.1.text":
    "Indica para quién es, de parte de quién y un mensaje opcional.",
  "how.2.title": "Mira las razones",
  "how.2.text":
    "Elegimos 50 razones en tu idioma. ¿No te convencen? Mézclalas.",
  "how.3.title": "Comparte el enlace",
  "how.3.text":
    "Toda la página vive dentro del enlace. No se guarda nada en ningún servidor.",
  "cta.title": "¿Listo para sacar una sonrisa?",
  "cta.text": "Te toma menos de un minuto.",

  "create.title": "Crea una página de amor",
  "create.subtitle": "Completa los datos y mira tus 50 razones.",
  "create.name": "¿Para quién es?",
  "create.namePh": "Su nombre",
  "create.from": "De parte de (opcional)",
  "create.fromPh": "Tu nombre",
  "create.message": "Un mensaje (opcional)",
  "create.messagePh": "Escribe algo desde el corazón…",
  "create.lang": "Idioma de la página",
  "create.generate": "Ver mis razones",
  "create.shuffle": "Mezclar razones",
  "create.needName": "Por favor ingresa un nombre 💖",
  "create.previewTitle": "Tu página está lista",
  "create.link": "Tu enlace",
  "create.copy": "Copiar enlace",
  "create.open": "Abrir página",
  "create.copied": "Enlace copiado 📎",
  "create.copyFailed": "No se pudo copiar el enlace",

  "love.title": "{count} razones por las que amo a {name}",
  "love.heading": "razones por las que amo a {name}",
  "love.from": "Con amor, {from}",
  "love.share": "Compartir",
  "love.copyLink": "Copiar enlace",
  "love.shareTitle": "50 razones por las que amo a {name}",
  "love.shareText": "Descubre por qué {name} es tan especial para mí ❤️",
  "love.copied": "Enlace copiado 📎",
  "love.failed": "No se pudo compartir el enlace",
  "love.reason": "Razón {n}",
  "love.makeYours": "Crea la tuya",

  "invalid.title": "Este enlace no funciona",
  "invalid.text":
    "Puede estar incompleto o dañado. Pide uno nuevo o crea el tuyo.",
  "notfound.title": "Página no encontrada",
  "notfound.text": "Esta página de amor no existe 💔",
  "notfound.cta": "Volver al inicio",

  "privacy.title": "Privacidad",
  "privacy.p1":
    "No usamos cuentas, bases de datos ni rastreo. Todo lo que escribes se queda en tu navegador.",
  "privacy.p2":
    "Al crear una página, su contenido (nombre, mensaje y una semilla aleatoria) se codifica dentro del enlace. Cualquiera que tenga el enlace puede leerlo, así que compártelo solo con quien quieras.",
  "privacy.p3": "Tu idioma se guarda localmente en tu navegador.",
  "privacy.p4":
    "Los enlaces dejan de funcionar 24 horas después de crearse. Esa comprobación ocurre en tu navegador: oculta la página, pero no borra lo que va dentro del enlace.",
  "footer.made": "❤️",
  "footer.privacy": "Privacidad",

  "create.styleTitle": "Elige la experiencia",
  "create.paletteTitle": "Elige un ambiente de color",
  "create.expiryNote":
    "Este enlace dura 24 horas desde el momento en que lo creas.",
  "create.share": "Compartir",
  "create.nameModeTitle": "Su nombre dentro de las razones",
  "create.nickname": "Apodo cariñoso (opcional)",
  "create.nicknamePh": "ej. mi vida",
  "create.nicknameHint":
    "Se usa en lugar del nombre en las razones que lo mencionan.",
  "nameMode.never": "Nunca",
  "nameMode.sometimes": "A veces",
  "nameMode.always": "Siempre",

  "exp.story.name": "Una a la vez",
  "exp.story.desc": "Desliza razones a pantalla completa.",
  "exp.envelope.name": "Sobre",
  "exp.envelope.desc": "Una carta sellada que se abre con un toque.",
  "exp.lyrics.name": "Letra",
  "exp.lyrics.desc": "Las razones se iluminan una a una, como una canción.",
  "exp.scroll.name": "Historia con scroll",
  "exp.scroll.desc": "Una razón por pantalla mientras bajas.",

  "palette.rose": "Rosa",
  "palette.sunset": "Atardecer",
  "palette.midnight": "Medianoche",
  "palette.lavender": "Lavanda",
  "palette.mint": "Menta",
  "palette.gold": "Dorado",

  "exp.expiresIn": "Desaparece en {time}",
  "exp.swipe": "Desliza para continuar",
  "exp.progress": "{n} / {total}",
  "exp.introFor": "Para {name}",
  "exp.endTitle": "Y esto es solo el comienzo.",
  "exp.tapToOpen": "Toca para abrir",
  "exp.letterFallback": "Escribí algunas cosas que siempre he querido decirte.",
  "exp.readReasons": "Leer las razones",
  "exp.play": "Reproducir",
  "exp.pause": "Pausar",
  "exp.prev": "Anterior",
  "exp.next": "Siguiente",
  "exp.vibrationOn": "Vibración activada",
  "exp.vibrationOff": "Vibración desactivada",
  "exp.scrollHint": "Desliza",
  "expired.title": "Este enlace caducó",
  "expired.text": "Los enlaces duran 24 horas. Pide uno nuevo o crea el tuyo.",
};

const pt: Dict = {
  "nav.brand": "why?",
  "nav.how": "Como funciona",
  "nav.create": "Criar",
  "nav.language": "Idioma",
  "nav.home": "Início",

  "hero.eyebrow": "50 razões, um coração",
  "hero.title": "Diz-lhe porque é tudo para ti.",
  "hero.subtitle":
    "Cria uma página com 50 razões pelas quais alguém é especial para ti e partilha-a com um único link.",
  "hero.cta": "Criar a minha página",
  "hero.secondary": "Ver como funciona",

  "how.title": "Três passos. Um link inesquecível.",
  "how.1.title": "Escreve um nome",
  "how.1.text": "Indica para quem é, de quem é e uma mensagem opcional.",
  "how.2.title": "Vê as razões",
  "how.2.text": "Escolhemos 50 razões no teu idioma. Não gostaste? Mistura.",
  "how.3.title": "Partilha o link",
  "how.3.text":
    "A página inteira vive dentro do link. Nada é guardado em nenhum servidor.",
  "cta.title": "Pronto para arrancar um sorriso?",
  "cta.text": "Leva menos de um minuto.",

  "create.title": "Cria uma página de amor",
  "create.subtitle": "Preenche os dados e vê as tuas 50 razões.",
  "create.name": "Para quem é?",
  "create.namePh": "O nome",
  "create.from": "De (opcional)",
  "create.fromPh": "O teu nome",
  "create.message": "Uma mensagem (opcional)",
  "create.messagePh": "Escreve algo do coração…",
  "create.lang": "Idioma da página",
  "create.generate": "Ver as minhas razões",
  "create.shuffle": "Misturar razões",
  "create.needName": "Por favor insere um nome 💖",
  "create.previewTitle": "A tua página está pronta",
  "create.link": "O teu link",
  "create.copy": "Copiar link",
  "create.open": "Abrir página",
  "create.copied": "Link copiado 📎",
  "create.copyFailed": "Não foi possível copiar o link",

  "love.title": "{count} razões pelas quais amo {name}",
  "love.heading": "razões pelas quais amo {name}",
  "love.from": "Com amor, {from}",
  "love.share": "Partilhar",
  "love.copyLink": "Copiar link",
  "love.shareTitle": "50 razões pelas quais amo {name}",
  "love.shareText": "Descobre porque {name} é tão especial para mim ❤️",
  "love.copied": "Link copiado 📎",
  "love.failed": "Não foi possível partilhar o link",
  "love.reason": "Razão {n}",
  "love.makeYours": "Cria a tua",

  "invalid.title": "Este link não funciona",
  "invalid.text":
    "Pode estar incompleto ou danificado. Pede um novo ou cria o teu.",
  "notfound.title": "Página não encontrada",
  "notfound.text": "Esta página de amor não existe 💔",
  "notfound.cta": "Voltar ao início",

  "privacy.title": "Privacidade",
  "privacy.p1":
    "Não usamos contas, bases de dados nem rastreamento. Tudo o que escreves fica no teu navegador.",
  "privacy.p2":
    "Ao criar uma página, o seu conteúdo (nome, mensagem e uma semente aleatória) é codificado dentro do link. Quem tiver o link pode lê-lo, por isso partilha-o só com quem quiseres.",
  "privacy.p3": "O teu idioma é guardado localmente no navegador.",
  "privacy.p4":
    "Os links deixam de funcionar 24 horas depois de criados. Essa verificação acontece no teu navegador: esconde a página, mas não apaga o que vai dentro do link.",
  "footer.made": "❤️",
  "footer.privacy": "Privacidade",

  "create.styleTitle": "Escolhe a experiência",
  "create.paletteTitle": "Escolhe um ambiente de cor",
  "create.expiryNote":
    "Este link dura 24 horas desde o momento em que o crias.",
  "create.share": "Partilhar",
  "create.nameModeTitle": "O nome dentro das razões",
  "create.nickname": "Apelido carinhoso (opcional)",
  "create.nicknamePh": "ex.: meu amor",
  "create.nicknameHint": "Usado no lugar do nome nas razões que o mencionam.",
  "nameMode.never": "Nunca",
  "nameMode.sometimes": "Às vezes",
  "nameMode.always": "Sempre",

  "exp.story.name": "Uma de cada vez",
  "exp.story.desc": "Desliza razões em ecrã inteiro.",
  "exp.envelope.name": "Envelope",
  "exp.envelope.desc": "Uma carta selada que se abre com um toque.",
  "exp.lyrics.name": "Letra",
  "exp.lyrics.desc": "As razões acendem-se uma a uma, como uma canção.",
  "exp.scroll.name": "História com scroll",
  "exp.scroll.desc": "Uma razão por ecrã enquanto desces.",

  "palette.rose": "Rosa",
  "palette.sunset": "Pôr do sol",
  "palette.midnight": "Meia-noite",
  "palette.lavender": "Lavanda",
  "palette.mint": "Menta",
  "palette.gold": "Dourado",

  "exp.expiresIn": "Desaparece em {time}",
  "exp.swipe": "Desliza para continuar",
  "exp.progress": "{n} / {total}",
  "exp.introFor": "Para {name}",
  "exp.endTitle": "E isto é só o começo.",
  "exp.tapToOpen": "Toca para abrir",
  "exp.letterFallback": "Escrevi algumas coisas que sempre quis dizer-te.",
  "exp.readReasons": "Ler as razões",
  "exp.play": "Reproduzir",
  "exp.pause": "Pausar",
  "exp.prev": "Anterior",
  "exp.next": "Seguinte",
  "exp.vibrationOn": "Vibração ativada",
  "exp.vibrationOff": "Vibração desativada",
  "exp.scrollHint": "Desliza",
  "expired.title": "Este link expirou",
  "expired.text": "Os links duram 24 horas. Pede um novo ou cria o teu.",
};

const fr: Dict = {
  "nav.brand": "why?",
  "nav.how": "Comment ça marche",
  "nav.create": "Créer",
  "nav.language": "Langue",
  "nav.home": "Accueil",

  "hero.eyebrow": "50 raisons, un seul cœur",
  "hero.title": "Dis-lui pourquoi il ou elle est tout pour toi.",
  "hero.subtitle":
    "Crée une page avec 50 raisons pour lesquelles quelqu'un est spécial à tes yeux, et partage-la avec un simple lien.",
  "hero.cta": "Créer ma page",
  "hero.secondary": "Voir comment ça marche",

  "how.title": "Trois étapes. Un lien inoubliable.",
  "how.1.title": "Écris un prénom",
  "how.1.text":
    "Indique pour qui c'est, de la part de qui, et un message facultatif.",
  "how.2.title": "Découvre les raisons",
  "how.2.text":
    "Nous choisissons 50 raisons dans ta langue. Pas convaincu ? Mélange.",
  "how.3.title": "Partage le lien",
  "how.3.text":
    "Toute la page vit dans le lien. Rien n'est stocké sur un serveur.",
  "cta.title": "Prêt à faire sourire quelqu'un ?",
  "cta.text": "Cela prend moins d'une minute.",

  "create.title": "Crée une page d'amour",
  "create.subtitle": "Remplis les infos et découvre tes 50 raisons.",
  "create.name": "Pour qui ?",
  "create.namePh": "Son prénom",
  "create.from": "De la part de (facultatif)",
  "create.fromPh": "Ton prénom",
  "create.message": "Un message (facultatif)",
  "create.messagePh": "Écris quelque chose du fond du cœur…",
  "create.lang": "Langue de la page",
  "create.generate": "Voir mes raisons",
  "create.shuffle": "Mélanger les raisons",
  "create.needName": "Merci de saisir un prénom 💖",
  "create.previewTitle": "Ta page est prête",
  "create.link": "Ton lien",
  "create.copy": "Copier le lien",
  "create.open": "Ouvrir la page",
  "create.copied": "Lien copié 📎",
  "create.copyFailed": "Impossible de copier le lien",

  "love.title": "{count} raisons pour lesquelles j'aime {name}",
  "love.heading": "raisons pour lesquelles j'aime {name}",
  "love.from": "Avec amour, {from}",
  "love.share": "Partager",
  "love.copyLink": "Copier le lien",
  "love.shareTitle": "50 raisons pour lesquelles j'aime {name}",
  "love.shareText": "Découvre pourquoi {name} est si spécial pour moi ❤️",
  "love.copied": "Lien copié 📎",
  "love.failed": "Impossible de partager le lien",
  "love.reason": "Raison {n}",
  "love.makeYours": "Crée la tienne",

  "invalid.title": "Ce lien ne fonctionne pas",
  "invalid.text":
    "Il est peut-être incomplet ou abîmé. Demandes-en un nouveau ou crée le tien.",
  "notfound.title": "Page introuvable",
  "notfound.text": "Cette page d'amour n'existe pas 💔",
  "notfound.cta": "Retour à l'accueil",

  "privacy.title": "Confidentialité",
  "privacy.p1":
    "Nous n'utilisons ni comptes, ni base de données, ni suivi. Tout ce que tu écris reste dans ton navigateur.",
  "privacy.p2":
    "Quand tu crées une page, son contenu (prénom, message et une graine aléatoire) est encodé dans le lien. Toute personne qui a le lien peut le lire : ne le partage qu'avec qui tu veux.",
  "privacy.p3":
    "Ton choix de langue est enregistré localement dans ton navigateur.",
  "privacy.p4":
    "Les liens cessent de fonctionner 24 heures après leur création. Cette vérification se fait dans ton navigateur : elle masque la page mais n'efface pas ce que contient le lien.",
  "footer.made": "❤️",
  "footer.privacy": "Confidentialité",

  "create.styleTitle": "Choisis l'expérience",
  "create.paletteTitle": "Choisis une ambiance de couleur",
  "create.expiryNote":
    "Ce lien dure 24 heures à partir du moment où tu le crées.",
  "create.share": "Partager",
  "create.nameModeTitle": "Son prénom dans les raisons",
  "create.nickname": "Petit nom (facultatif)",
  "create.nicknamePh": "ex. mon cœur",
  "create.nicknameHint":
    "Utilisé à la place du prénom dans les raisons qui le mentionnent.",
  "nameMode.never": "Jamais",
  "nameMode.sometimes": "Parfois",
  "nameMode.always": "Toujours",

  "exp.story.name": "Une à la fois",
  "exp.story.desc": "Fais défiler les raisons en plein écran.",
  "exp.envelope.name": "Enveloppe",
  "exp.envelope.desc": "Une lettre scellée qui s'ouvre d'un toucher.",
  "exp.lyrics.name": "Paroles",
  "exp.lyrics.desc": "Les raisons s'illuminent une à une, comme une chanson.",
  "exp.scroll.name": "Histoire à défiler",
  "exp.scroll.desc": "Une raison par écran en faisant défiler.",

  "palette.rose": "Rose",
  "palette.sunset": "Coucher de soleil",
  "palette.midnight": "Minuit",
  "palette.lavender": "Lavande",
  "palette.mint": "Menthe",
  "palette.gold": "Doré",

  "exp.expiresIn": "Disparaît dans {time}",
  "exp.swipe": "Glisse pour continuer",
  "exp.progress": "{n} / {total}",
  "exp.introFor": "Pour {name}",
  "exp.endTitle": "Et ce n'est que le début.",
  "exp.tapToOpen": "Touche pour ouvrir",
  "exp.letterFallback":
    "J'ai noté quelques choses que j'ai toujours voulu te dire.",
  "exp.readReasons": "Lire les raisons",
  "exp.play": "Lecture",
  "exp.pause": "Pause",
  "exp.prev": "Précédent",
  "exp.next": "Suivant",
  "exp.vibrationOn": "Vibration activée",
  "exp.vibrationOff": "Vibration désactivée",
  "exp.scrollHint": "Défile",
  "expired.title": "Ce lien a expiré",
  "expired.text":
    "Les liens durent 24 heures. Demandes-en un nouveau ou crée le tien.",
};

export const TRANSLATIONS: Record<Lang, Dict> = { en, es, pt, fr };

export function translate(
  lang: Lang,
  key: TranslationKey,
  vars?: Record<string, string | number>,
): string {
  let text = TRANSLATIONS[lang][key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}

export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved && (LANGS as readonly string[]).includes(saved)) {
      return saved as Lang;
    }
  } catch {
    /* storage unavailable */
  }
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return (LANGS as readonly string[]).includes(nav) ? (nav as Lang) : "en";
}
