const STORAGE_KEY = "typelearn.state.v4";
const SETTINGS_KEY = "typelearn.settings.v1";
const SUPPORTED_LANGUAGE_KEYS = ["spanish", "polish", "russian", "ukrainian"];

const TARGET_LANGUAGES = {
  spanish: {
    key: "spanish",
    name: "Spanish",
    pickerLabel: "Spanish / Espanol",
    voiceCode: "es-ES",
    eyebrow: "Spanish writing lab",
    heroTitle: "Write in Spanish. Borrow from English only when you have to.",
    subtitle:
      "Choose Spanish, write freely, then use Check + Fix to clean the draft, translate English gaps, and turn those missing words into flashcards.",
    placeholder: "Escribe aqui. Si no sabes una palabra, ponla en English y pulsa Check + Fix.",
    cardHint: "Tap to reveal the Spanish answer.",
    cardLabel: "Spanish",
    deckEmpty: "Your missing English words will show up here as study cards after each pass.",
    promptLabel: "Idea para escribir",
    promptCategoryLabel: "Categoria",
    noPrompt: "Todavia no hay ideas disponibles en este modo.",
    promptButtonNew: "Otra idea",
    promptButtonInsert: "Insertar idea",
    promptButtonSpeak: "Escuchar idea",
    promptButtonStop: "Parar audio",
    starterIntro: "Empieza con esta frase y desarrollala con detalles:",
    starterFollowup: "Sigue con:",
    practiceModeIdle: "Modo practica",
    practiceModeActive: "Mostrar respuestas al tocar",
    prompts: {
      opinion: {
        label: "Opiniones",
        entries: [
          { type: "prompt", text: "Solo puedes quedarte con tres aplicaciones en tu telefono. Cuales eliges y por que?" },
          { type: "prompt", text: "Deberian las escuelas ensenar habilidades practicas como impuestos y contratos? Defiende tu postura." },
          { type: "prompt", text: "Seria mejor vivir diez anos en una ciudad enorme o en un pueblo pequeno? Explica tu decision." },
          { type: "prompt", text: "La mayoria de los trabajos de oficina deberian seguir siendo remotos? Argumenta tu respuesta." },
          { type: "prompt", text: "Que habilidad deberia aprender todo el mundo antes de cumplir 18 anos?" },
        ],
      },
      stories: {
        label: "Historias",
        entries: [
          { type: "prompt", text: "Cuenta la historia de una pequena decision que cambio por completo tu dia." },
          { type: "prompt", text: "Describe el dia de viaje mas caotico que has vivido, desde el principio hasta el final." },
          { type: "prompt", text: "Escribe sobre una conversacion que te hizo cambiar de opinion." },
          { type: "prompt", text: "Perdiste el rumbo en un lugar desconocido. Que paso y como saliste de ahi?" },
          { type: "prompt", text: "En un restaurante te dieron el pedido equivocado y estabas con prisa. Explica que hiciste." },
        ],
      },
      daily: {
        label: "Vida diaria",
        entries: [
          { type: "prompt", text: "Describe tu rutina de la manana y lo que te gustaria mejorar." },
          { type: "prompt", text: "Tienes un fin de semana libre, sin obligaciones y sin internet. Como lo aprovechas?" },
          { type: "prompt", text: "Haz una resena breve de una pelicula o serie que viste hace poco." },
          { type: "prompt", text: "Describe una comida local que los visitantes suelen entender mal." },
          { type: "prompt", text: "Escribe sobre un habito que mejoro tu humor o tu productividad." },
        ],
      },
      scenario: {
        label: "Escenarios",
        entries: [
          { type: "prompt", text: "Un amigo extranjero viene a visitarte durante 48 horas. Organiza el itinerario completo y explica tus elecciones." },
          { type: "prompt", text: "Si tuvieras que mudarte a otro pais el mes que viene, cual seria tu mayor miedo y tu mayor ilusion?" },
          { type: "prompt", text: "Disena tu apartamento ideal con detalles sobre la ubicacion, la distribucion y el barrio." },
          { type: "prompt", text: "Estas preparando una playlist para un viaje largo de noche. Que energia quieres al principio, en medio y al final?" },
          { type: "prompt", text: "Escribe un mensaje para tu version de hace cinco anos." },
        ],
      },
      starters: {
        label: "Frases para continuar",
        entries: [
          {
            type: "starter",
            lead: "Lo que mas me sorprendio de ese dia fue...",
            cues: ["Empieza con la situacion exacta.", "Explica por que te sorprendio.", "Cuenta lo que cambio despues."],
          },
          {
            type: "starter",
            lead: "Nunca pense que diria esto, pero ahora creo que...",
            cues: ["Di que opinabas antes.", "Explica que hizo cambiar tu postura.", "Termina con un ejemplo concreto."],
          },
          {
            type: "starter",
            lead: "Si manana tuviera que empezar de cero en otra ciudad, primero...",
            cues: ["Describe tu primera decision.", "Cuenta que seria lo mas dificil.", "Explica que te daria tranquilidad."],
          },
          {
            type: "starter",
            lead: "La razon real por la que sigo volviendo a ese lugar es...",
            cues: ["Describe el lugar con detalles.", "Explica la conexion emocional.", "Anade una pequena historia personal."],
          },
          {
            type: "starter",
            lead: "Lo que me hubiera gustado decir en ese momento era...",
            cues: ["Resume la escena.", "Escribe lo que no dijiste.", "Explica por que te quedaste callado o callada."],
          },
        ],
      },
    },
  },
  polish: {
    key: "polish",
    name: "Polish",
    pickerLabel: "Polish / Polski",
    voiceCode: "pl-PL",
    eyebrow: "Polish writing lab",
    heroTitle: "Write in Polish. Borrow from English only when you have to.",
    subtitle:
      "Choose Polish, write freely, then use Check + Fix to clean the draft, translate English gaps, and turn those missing words into flashcards.",
    placeholder: "Pisz po polsku. Jesli nie znasz slowa, wpisz je in English i nacisnij Check + Fix.",
    cardHint: "Tap to reveal the Polish answer.",
    cardLabel: "Polish",
    deckEmpty: "Missing English words will appear here as Polish study cards after each pass.",
    promptLabel: "Pomysl do pisania",
    promptCategoryLabel: "Kategoria",
    noPrompt: "W tym trybie nie ma jeszcze podpowiedzi.",
    promptButtonNew: "Inny pomysl",
    promptButtonInsert: "Wstaw pomysl",
    promptButtonSpeak: "Odtworz",
    promptButtonStop: "Zatrzymaj audio",
    starterIntro: "Zacznij od tego zdania i rozwin je szczegolowo:",
    starterFollowup: "Potem dopisz:",
    practiceModeIdle: "Tryb cwiczen",
    practiceModeActive: "Pokazuj odpowiedzi po dotknieciu",
    prompts: {
      opinion: {
        label: "Opinie",
        entries: [
          { type: "prompt", text: "Mozesz zostawic tylko trzy aplikacje w telefonie. Ktore wybierasz i dlaczego?" },
          { type: "prompt", text: "Czy szkola powinna uczyc praktycznych rzeczy, jak podatki i umowy? Wyjasnij stanowisko." },
          { type: "prompt", text: "Wolisz mieszkac w duzym miescie czy w malym miasteczku przez nastepne 10 lat? Uzasadnij." },
          { type: "prompt", text: "Czy praca zdalna powinna zostac na stale w wiekszosci prac biurowych? Uzasadnij odpowiedz." },
          { type: "prompt", text: "Jaka umiejetnosc kazdy powinien poznac przed 18 rokiem zycia?" },
        ],
      },
      stories: {
        label: "Historie",
        entries: [
          { type: "prompt", text: "Opisz najbardziej chaotyczny dzien podrozy, jaki miales." },
          { type: "prompt", text: "Opisz mala decyzje, ktora zmienila twoj dzien." },
          { type: "prompt", text: "Opisz rozmowe, po ktorej zmieniles zdanie na wazny temat." },
          { type: "prompt", text: "Opowiedz historie o tym, jak zgubiles sie w nieznanym miejscu." },
          { type: "prompt", text: "W restauracji dostajesz zle zamowienie i bardzo sie spieszysz. Co robisz?" },
        ],
      },
      daily: {
        label: "Codziennosc",
        entries: [
          { type: "prompt", text: "Opisz swoja poranna rutyne i co chcesz w niej poprawic." },
          { type: "prompt", text: "Masz wolny weekend bez internetu. Jak go spedzasz?" },
          { type: "prompt", text: "Napisz krotka recenzje filmu lub serialu, ktory ostatnio widziales." },
          { type: "prompt", text: "Opisz lokalne danie, ktore turysci czesto zle rozumieja." },
          { type: "prompt", text: "Napisz o nawyku, ktory poprawil twoj humor albo produktywnosc." },
        ],
      },
      scenario: {
        label: "Scenariusze",
        entries: [
          { type: "prompt", text: "Przyjaciel przyjezdza do ciebie na 2 dni. Zaplanuj mu caly pobyt i uzasadnij wybor miejsc." },
          { type: "prompt", text: "Gdybys mial przeprowadzic sie do nowego kraju za miesiac, czego najbardziej bys sie bal, a co by cie cieszylo?" },
          { type: "prompt", text: "Opisz swoje wymarzone mieszkanie: lokalizacje, uklad i okolice." },
          { type: "prompt", text: "Tworzysz playliste na nocna jazde samochodem. Jaki klimat wybierasz na poczatek, srodek i koniec?" },
          { type: "prompt", text: "Napisz wiadomosc do siebie sprzed pieciu lat." },
        ],
      },
      starters: {
        label: "Poczatki zdan",
        entries: [
          {
            type: "starter",
            lead: "Najbardziej zaskoczylo mnie wtedy to, ze...",
            cues: ["Opisz, co dokladnie sie stalo.", "Wyjasnij, dlaczego bylo to nieoczekiwane.", "Napisz, co zmienilo sie potem."],
          },
          {
            type: "starter",
            lead: "Nigdy nie sadzilem, ze to powiem, ale teraz uwazam, ze...",
            cues: ["Wyjasnij, co myslales wczesniej.", "Powiedz, co zmienilo twoje zdanie.", "Dodaj konkretny przyklad."],
          },
          {
            type: "starter",
            lead: "Gdybym jutro musial zaczac od zera w nowym miescie, najpierw...",
            cues: ["Opisz pierwszy krok.", "Napisz, co byloby najtrudniejsze.", "Wyjasnij, co daloby ci spokoj."],
          },
          {
            type: "starter",
            lead: "Prawdziwy powod, dla ktorego wracam w to miejsce, jest taki, ze...",
            cues: ["Opisz to miejsce szczegolowo.", "Wyjasnij emocjonalna wiez.", "Dodaj krotka osobista historie."],
          },
          {
            type: "starter",
            lead: "To, co naprawde chcialem wtedy powiedziec, to...",
            cues: ["Zarysuj scene.", "Napisz, czego nie powiedziales lub nie powiedzialas.", "Wyjasnij, dlaczego milczales lub milczalas."],
          },
        ],
      },
    },
  },
  russian: {
    key: "russian",
    name: "Russian",
    pickerLabel: "Russian / Русский",
    voiceCode: "ru-RU",
    eyebrow: "Russian writing lab",
    heroTitle: "Write in Russian. Borrow from English only when you have to.",
    subtitle:
      "Choose Russian, write freely, then use Check + Fix to clean the draft, translate English gaps, and turn those missing words into flashcards.",
    placeholder: "Пиши по-русски. Если не знаешь слово, вставь его in English и нажми Check + Fix.",
    cardHint: "Tap to reveal the Russian answer.",
    cardLabel: "Russian",
    deckEmpty: "Missing English words will appear here as Russian study cards after each pass.",
    promptLabel: "Идея для текста",
    promptCategoryLabel: "Категория",
    noPrompt: "Пока для этого режима нет подсказок.",
    promptButtonNew: "Другая идея",
    promptButtonInsert: "Вставить идею",
    promptButtonSpeak: "Озвучить",
    promptButtonStop: "Остановить звук",
    starterIntro: "Начни с этой фразы и развей ее подробно:",
    starterFollowup: "Потом добавь:",
    practiceModeIdle: "Режим практики",
    practiceModeActive: "Показывать ответ по нажатию",
    prompts: {
      opinion: {
        label: "Мнения",
        entries: [
          { type: "prompt", text: "Если бы в телефоне можно было оставить только три приложения, какие бы ты выбрал и почему?" },
          { type: "prompt", text: "Должны ли школы учить практическим вещам, например налогам и договорам? Обоснуй свою позицию." },
          { type: "prompt", text: "Где лучше прожить следующие десять лет: в огромном городе или в маленьком городе? Объясни выбор." },
          { type: "prompt", text: "Должна ли удаленная работа остаться нормой для большинства офисных профессий? Аргументируй." },
          { type: "prompt", text: "Какой навык каждый человек должен освоить до восемнадцати лет?" },
        ],
      },
      stories: {
        label: "Истории",
        entries: [
          { type: "prompt", text: "Расскажи о маленьком решении, которое полностью изменило твой день." },
          { type: "prompt", text: "Опиши самый хаотичный день в поездке от начала до конца." },
          { type: "prompt", text: "Напиши о разговоре, после которого ты поменял мнение." },
          { type: "prompt", text: "Ты потерялся в незнакомом месте. Что произошло и как ты выбрался?" },
          { type: "prompt", text: "В ресторане тебе принесли не тот заказ, а ты очень спешил. Что ты сделал?" },
        ],
      },
      daily: {
        label: "Повседневность",
        entries: [
          { type: "prompt", text: "Опиши свою утреннюю рутину и то, что ты хочешь в ней улучшить." },
          { type: "prompt", text: "У тебя свободные выходные без дел и без интернета. Как ты их проведешь?" },
          { type: "prompt", text: "Напиши короткую рецензию на фильм или сериал, который ты недавно посмотрел." },
          { type: "prompt", text: "Опиши местное блюдо, которое приезжие часто понимают неправильно." },
          { type: "prompt", text: "Расскажи о привычке, которая улучшила твое настроение или продуктивность." },
        ],
      },
      scenario: {
        label: "Сценарии",
        entries: [
          { type: "prompt", text: "К тебе на сорок восемь часов приезжает друг из другой страны. Составь полный план и объясни свои решения." },
          { type: "prompt", text: "Если бы тебе пришлось переехать в другую страну уже в следующем месяце, чего бы ты больше всего боялся и чему бы радовался?" },
          { type: "prompt", text: "Опиши квартиру мечты: район, планировку и атмосферу." },
          { type: "prompt", text: "Ты собираешь плейлист для долгой ночной поездки. Какое настроение должно быть в начале, середине и конце?" },
          { type: "prompt", text: "Напиши сообщение себе пятилетней давности." },
        ],
      },
      starters: {
        label: "Начала фраз",
        entries: [
          {
            type: "starter",
            lead: "Больше всего меня тогда удивило то, что...",
            cues: ["Начни с точной ситуации.", "Объясни, почему это было неожиданно.", "Расскажи, что изменилось потом."],
          },
          {
            type: "starter",
            lead: "Я никогда не думал, что скажу это, но теперь считаю, что...",
            cues: ["Скажи, что ты думал раньше.", "Объясни, что изменило твое мнение.", "Заверши конкретным примером."],
          },
          {
            type: "starter",
            lead: "Если бы завтра мне пришлось начинать с нуля в новом городе, сначала я бы...",
            cues: ["Опиши первый шаг.", "Скажи, что было бы самым трудным.", "Объясни, что помогло бы почувствовать опору."],
          },
          {
            type: "starter",
            lead: "Настоящая причина, по которой я снова и снова возвращаюсь в это место, в том, что...",
            cues: ["Опиши место в деталях.", "Объясни эмоциональную связь.", "Добавь короткую личную историю."],
          },
          {
            type: "starter",
            lead: "На самом деле мне тогда хотелось сказать...",
            cues: ["Кратко опиши сцену.", "Напиши, чего ты не сказал.", "Объясни, почему промолчал."],
          },
        ],
      },
    },
  },
  ukrainian: {
    key: "ukrainian",
    name: "Ukrainian",
    pickerLabel: "Ukrainian / Українська",
    voiceCode: "uk-UA",
    eyebrow: "Ukrainian writing lab",
    heroTitle: "Write in Ukrainian. Borrow from English only when you have to.",
    subtitle:
      "Choose Ukrainian, write freely, then use Check + Fix to clean the draft, translate English gaps, and turn those missing words into flashcards.",
    placeholder: "Пиши українською. Якщо не знаєш слова, встав його in English і натисни Check + Fix.",
    cardHint: "Tap to reveal the Ukrainian answer.",
    cardLabel: "Ukrainian",
    deckEmpty: "Missing English words will appear here as Ukrainian study cards after each pass.",
    promptLabel: "Ідея для письма",
    promptCategoryLabel: "Категорія",
    noPrompt: "Для цього режиму поки немає підказок.",
    promptButtonNew: "Інша ідея",
    promptButtonInsert: "Вставити ідею",
    promptButtonSpeak: "Озвучити",
    promptButtonStop: "Зупинити звук",
    starterIntro: "Почни з цього речення і розвинь його докладно:",
    starterFollowup: "Потім додай:",
    practiceModeIdle: "Режим практики",
    practiceModeActive: "Показувати відповідь після натискання",
    prompts: {
      opinion: {
        label: "Думки",
        entries: [
          { type: "prompt", text: "Якщо б у телефоні можна було залишити лише три застосунки, які б ти вибрав і чому?" },
          { type: "prompt", text: "Чи повинна школа вчити практичних речей, наприклад податків і договорів? Обґрунтуй свою позицію." },
          { type: "prompt", text: "Де краще прожити наступні десять років: у великому місті чи в маленькому містечку? Поясни вибір." },
          { type: "prompt", text: "Чи має віддалена робота залишитися нормою для більшості офісних професій? Аргументуй." },
          { type: "prompt", text: "Яку навичку кожна людина повинна опанувати до вісімнадцяти років?" },
        ],
      },
      stories: {
        label: "Історії",
        entries: [
          { type: "prompt", text: "Розкажи про маленьке рішення, яке повністю змінило твій день." },
          { type: "prompt", text: "Опиши найхаотичніший день подорожі від початку до кінця." },
          { type: "prompt", text: "Напиши про розмову, після якої ти змінив або змінила думку." },
          { type: "prompt", text: "Ти загубився або загубилася в незнайомому місці. Що сталося і як ти вибрався чи вибралася?" },
          { type: "prompt", text: "У ресторані тобі принесли не те замовлення, а ти дуже поспішав чи поспішала. Що ти зробив або зробила?" },
        ],
      },
      daily: {
        label: "Щоденне життя",
        entries: [
          { type: "prompt", text: "Опиши свою ранкову рутину і те, що ти хочеш у ній покращити." },
          { type: "prompt", text: "У тебе вільні вихідні без справ і без інтернету. Як ти їх проведеш?" },
          { type: "prompt", text: "Напиши короткий відгук про фільм або серіал, який ти нещодавно подивився чи подивилася." },
          { type: "prompt", text: "Опиши місцеву страву, яку відвідувачі часто неправильно розуміють." },
          { type: "prompt", text: "Розкажи про звичку, яка покращила твій настрій або продуктивність." },
        ],
      },
      scenario: {
        label: "Сценарії",
        entries: [
          { type: "prompt", text: "До тебе на сорок вісім годин приїжджає друг або подруга з іншої країни. Склади повний план і поясни свої рішення." },
          { type: "prompt", text: "Якби тобі довелося переїхати до іншої країни вже наступного місяця, чого б ти найбільше боявся або боялася і чому б радів чи раділа?" },
          { type: "prompt", text: "Опиши квартиру мрії: район, планування і атмосферу." },
          { type: "prompt", text: "Ти складаєш плейлист для довгої нічної поїздки. Який настрій має бути на початку, посередині та наприкінці?" },
          { type: "prompt", text: "Напиши повідомлення собі п'ятирічної давності." },
        ],
      },
      starters: {
        label: "Початки речень",
        entries: [
          {
            type: "starter",
            lead: "Найбільше мене тоді здивувало те, що...",
            cues: ["Почни з точної ситуації.", "Поясни, чому це було несподівано.", "Розкажи, що змінилося потім."],
          },
          {
            type: "starter",
            lead: "Я ніколи не думав або не думала, що скажу це, але тепер вважаю, що...",
            cues: ["Скажи, що ти думав або думала раніше.", "Поясни, що змінило твою думку.", "Заверши конкретним прикладом."],
          },
          {
            type: "starter",
            lead: "Якби завтра мені довелося починати з нуля в новому місті, спочатку я б...",
            cues: ["Опиши перший крок.", "Скажи, що було б найважчим.", "Поясни, що допомогло б відчути опору."],
          },
          {
            type: "starter",
            lead: "Справжня причина, чому я знову і знову повертаюся в це місце, у тому, що...",
            cues: ["Опиши місце в деталях.", "Поясни емоційний зв'язок.", "Додай коротку особисту історію."],
          },
          {
            type: "starter",
            lead: "Насправді тоді мені хотілося сказати...",
            cues: ["Коротко опиши сцену.", "Напиши, чого ти не сказав або не сказала.", "Поясни, чому промовчав або промовчала."],
          },
        ],
      },
    },
  },
};

const DEFAULT_STATE = {
  note: "",
  deck: [],
  lastSavedAt: null,
  lastSummary: "Use Check + Fix to clean the draft and translate missing terms.",
  lastNewCards: 0,
  practiceMode: false,
  promptCategory: "opinion",
  currentPromptIndexByCategory: {},
};

const DEFAULT_SETTINGS = {
  groqApiKey: "",
  targetLanguage: "spanish",
};

const state = {
  ...loadState(),
  settings: loadSettings(),
  saving: false,
  speaking: false,
};

const editor = document.querySelector("#editor");
const saveButton = document.querySelector("#saveButton");
const changeSummary = document.querySelector("#changeSummary");
const deckList = document.querySelector("#deckList");
const deckEmpty = document.querySelector("#deckEmpty");
const practiceToggle = document.querySelector("#practiceToggle");
const cardTemplate = document.querySelector("#cardTemplate");
const groqApiKeyInput = document.querySelector("#groqApiKey");
const saveKeyButton = document.querySelector("#saveKeyButton");
const languageSelect = document.querySelector("#languageSelect");
const languageHint = document.querySelector("#languageHint");
const eyebrow = document.querySelector("#eyebrow");
const heroTitle = document.querySelector("#heroTitle");
const subtitle = document.querySelector("#subtitle");
const promptLabel = document.querySelector("#promptLabel");
const promptText = document.querySelector("#promptText");
const promptCategorySelect = document.querySelector("#promptCategory");
const nextPromptButton = document.querySelector("#nextPromptButton");
const insertPromptButton = document.querySelector("#insertPromptButton");
const speakPromptButton = document.querySelector("#speakPromptButton");

bootstrap();

function bootstrap() {
  editor.value = state.note;
  groqApiKeyInput.value = state.settings.groqApiKey;
  syncLanguagePicker();
  syncLanguageMode();
  syncPromptCategoryOptions();
  ensurePromptSelectionValid();
  syncPrompt();
  renderDeck();
  renderMeta();
  syncPracticeToggle();
  syncSpeechButton();
}

editor.addEventListener("input", () => {
  state.note = editor.value;
  persistState();
});

saveButton.addEventListener("click", () => {
  void saveDraft();
});

saveKeyButton.addEventListener("click", () => {
  persistSettingsFromInputs();
});

languageSelect.addEventListener("change", () => {
  stopSpeaking();
  state.settings.targetLanguage = normalizeTargetLanguage(languageSelect.value);
  state.promptCategory = firstPromptCategoryKey();
  state.currentPromptIndexByCategory = {};
  persistSettings();
  persistState();
  syncLanguagePicker();
  syncLanguageMode();
  syncPromptCategoryOptions();
  ensurePromptSelectionValid();
  syncPrompt();
  renderDeck();
});

practiceToggle.addEventListener("click", () => {
  state.practiceMode = !state.practiceMode;
  persistState();
  syncPracticeToggle();
  renderDeck();
});

promptCategorySelect.addEventListener("change", () => {
  stopSpeaking();
  state.promptCategory = promptCategorySelect.value;
  ensurePromptSelectionValid();
  persistState();
  syncPrompt();
});

nextPromptButton.addEventListener("click", () => {
  const prompts = currentPromptEntries();

  if (!prompts.length) {
    return;
  }

  state.currentPromptIndexByCategory[state.promptCategory] = nextPromptIndex(prompts.length, currentPromptIndex());
  persistState();
  syncPrompt();
});

insertPromptButton.addEventListener("click", () => {
  const prompt = currentPromptText();

  if (!prompt) {
    return;
  }

  insertIntoEditor(prompt);
});

speakPromptButton.addEventListener("click", () => {
  if (state.speaking) {
    stopSpeaking();
    return;
  }

  speakCurrentPrompt();
});

window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    void saveDraft();
  }
});

window.addEventListener("beforeunload", () => {
  stopSpeaking();
});

async function saveDraft() {
  if (state.saving) {
    return;
  }

  persistSettingsFromInputs(false);
  state.saving = true;
  saveButton.disabled = true;
  saveButton.textContent = "Checking...";
  updateSummary("Checking grammar and filling missing terms...", false);

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (state.settings.groqApiKey) {
      headers["X-Groq-Api-Key"] = state.settings.groqApiKey;
    }

    const response = await fetch("/api/rewrite", {
      method: "POST",
      headers,
      body: JSON.stringify({ text: editor.value, targetLanguage: state.settings.targetLanguage }),
    });

    const payload = await readResponsePayload(response);

    if (!response.ok) {
      throw new Error(payload.error || "Check + Fix failed.");
    }

    const nextCards = Array.isArray(payload.cards) ? payload.cards.map(normalizeCard) : [];
    const merged = mergeDeck(state.deck, nextCards);

    state.note = String(payload.correctedText || editor.value);
    state.deck = merged.deck;
    state.lastSavedAt = new Date().toISOString();
    state.lastSummary = String(payload.changeSummary || "Draft updated.");
    state.lastNewCards = merged.addedCount;

    editor.value = state.note;
    persistState();
    renderDeck();
    renderMeta();
  } catch (error) {
    console.error(error);
    updateSummary(error.message || "Check + Fix failed.", true);
  } finally {
    state.saving = false;
    saveButton.disabled = false;
    saveButton.textContent = "Check + Fix";
  }
}

function persistSettingsFromInputs(showMessage = true) {
  state.settings = {
    groqApiKey: String(groqApiKeyInput.value || "").trim(),
    targetLanguage: normalizeTargetLanguage(state.settings.targetLanguage),
  };

  persistSettings();

  if (showMessage) {
    updateSummary(
      state.settings.groqApiKey
        ? "Custom API key saved in this browser."
        : "Custom API key cleared. The app will use the server key if one is configured.",
      false,
    );
  }
}

function renderMeta() {
  updateSummary(state.lastSummary, false);
}

function renderDeck() {
  deckList.innerHTML = "";

  if (!state.deck.length) {
    deckEmpty.textContent = currentLanguageConfig().deckEmpty;
    deckEmpty.hidden = false;
    return;
  }

  deckEmpty.hidden = true;

  for (const card of state.deck) {
    const fragment = cardTemplate.content.cloneNode(true);
    const cardNode = fragment.querySelector(".flashcard");
    const button = fragment.querySelector(".flip-button");

    fragment.querySelector('[data-field="sourceTerm"]').textContent = card.sourceTerm;
    fragment.querySelector('[data-field="cardHint"]').textContent = currentLanguageConfig().cardHint;
    fragment.querySelector('[data-field="targetLabel"]').textContent = currentLanguageConfig().cardLabel;
    fragment.querySelector('[data-field="spanishTerm"]').textContent = card.spanishTerm;
    fragment.querySelector('[data-field="exampleSentence"]').textContent = card.exampleSentence;
    fragment.querySelector('[data-field="notes"]').textContent = card.notes;

    if (!state.practiceMode) {
      cardNode.classList.add("revealed");
    }

    button.addEventListener("click", () => {
      cardNode.classList.toggle("revealed");
    });

    deckList.appendChild(fragment);
  }
}

function syncPracticeToggle() {
  practiceToggle.setAttribute("aria-pressed", String(state.practiceMode));
  practiceToggle.textContent = state.practiceMode
    ? currentLanguageConfig().practiceModeActive
    : currentLanguageConfig().practiceModeIdle;
}

function persistState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      note: state.note,
      deck: state.deck,
      lastSavedAt: state.lastSavedAt,
      lastSummary: state.lastSummary,
      lastNewCards: state.lastNewCards,
      practiceMode: state.practiceMode,
      promptCategory: state.promptCategory,
      currentPromptIndexByCategory: state.currentPromptIndexByCategory,
    }),
  );
}

function loadState() {
  const parsed = loadJson(STORAGE_KEY, DEFAULT_STATE);
  const legacyPromptIndex = Number.isFinite(parsed.currentPromptIndex) ? parsed.currentPromptIndex : 0;
  const indexMap =
    parsed.currentPromptIndexByCategory && typeof parsed.currentPromptIndexByCategory === "object"
      ? parsed.currentPromptIndexByCategory
      : { opinion: legacyPromptIndex };

  return {
    note: typeof parsed.note === "string" ? parsed.note : DEFAULT_STATE.note,
    deck: Array.isArray(parsed.deck) ? parsed.deck.map(normalizeCard) : [],
    lastSavedAt: typeof parsed.lastSavedAt === "string" ? parsed.lastSavedAt : DEFAULT_STATE.lastSavedAt,
    lastSummary: typeof parsed.lastSummary === "string" ? parsed.lastSummary : DEFAULT_STATE.lastSummary,
    lastNewCards: Number.isFinite(parsed.lastNewCards) ? parsed.lastNewCards : DEFAULT_STATE.lastNewCards,
    practiceMode: Boolean(parsed.practiceMode),
    promptCategory: typeof parsed.promptCategory === "string" ? parsed.promptCategory : DEFAULT_STATE.promptCategory,
    currentPromptIndexByCategory: indexMap,
  };
}

function loadSettings() {
  const parsed = loadJson(SETTINGS_KEY, DEFAULT_SETTINGS);

  return {
    groqApiKey: typeof parsed.groqApiKey === "string" ? parsed.groqApiKey : DEFAULT_SETTINGS.groqApiKey,
    targetLanguage: normalizeTargetLanguage(parsed.targetLanguage),
  };
}

function persistSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function loadJson(storageKey, fallback) {
  try {
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function normalizeCard(rawCard) {
  const sourceTerm = String(rawCard?.sourceTerm || "").trim();
  const spanishTerm = String(rawCard?.spanishTerm || "").trim();
  const exampleSentence = String(rawCard?.exampleSentence || "").trim();
  const notes = String(rawCard?.notes || "").trim();
  const createdAt = String(rawCard?.createdAt || new Date().toISOString());
  const id = String(rawCard?.id || `${sourceTerm.toLowerCase()}::${spanishTerm.toLowerCase()}`);

  return {
    id,
    sourceTerm,
    spanishTerm,
    exampleSentence,
    notes,
    createdAt,
  };
}

function mergeDeck(existingDeck, incomingDeck) {
  const cardsById = new Map(existingDeck.map((card) => [card.id, normalizeCard(card)]));
  let addedCount = 0;

  for (const rawCard of incomingDeck) {
    const card = normalizeCard(rawCard);

    if (!card.sourceTerm || !card.spanishTerm) {
      continue;
    }

    if (!cardsById.has(card.id)) {
      cardsById.set(card.id, card);
      addedCount += 1;
      continue;
    }

    const current = cardsById.get(card.id);
    cardsById.set(card.id, {
      ...current,
      exampleSentence: current.exampleSentence || card.exampleSentence,
      notes: current.notes || card.notes,
    });
  }

  return {
    deck: Array.from(cardsById.values()).sort((left, right) => right.createdAt.localeCompare(left.createdAt)),
    addedCount,
  };
}

async function readResponsePayload(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return {
    error: await response.text(),
  };
}

function updateSummary(message, isError) {
  changeSummary.textContent = message;
  changeSummary.dataset.error = isError ? "true" : "false";
}

function normalizeTargetLanguage(value) {
  return SUPPORTED_LANGUAGE_KEYS.includes(value) ? value : "spanish";
}

function currentLanguageConfig() {
  return TARGET_LANGUAGES[normalizeTargetLanguage(state.settings.targetLanguage)];
}

function syncLanguagePicker() {
  languageSelect.innerHTML = "";

  for (const key of SUPPORTED_LANGUAGE_KEYS) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = TARGET_LANGUAGES[key].pickerLabel;
    languageSelect.appendChild(option);
  }

  languageSelect.value = normalizeTargetLanguage(state.settings.targetLanguage);
}

function syncLanguageMode() {
  state.settings.targetLanguage = normalizeTargetLanguage(state.settings.targetLanguage);
  const config = currentLanguageConfig();
  eyebrow.textContent = config.eyebrow;
  heroTitle.textContent = config.heroTitle;
  subtitle.textContent = config.subtitle;
  editor.placeholder = config.placeholder;
  deckEmpty.textContent = config.deckEmpty;
  languageHint.textContent = `Current target language: ${config.name}. You can switch any time without leaving the page.`;
  syncPracticeToggle();
}

function promptCategories() {
  return Object.entries(currentLanguageConfig().prompts || {});
}

function firstPromptCategoryKey() {
  const categories = promptCategories();
  return categories.length ? categories[0][0] : "";
}

function syncPromptCategoryOptions() {
  const categories = promptCategories();
  const currentValue = state.promptCategory;
  promptCategorySelect.innerHTML = "";

  for (const [key, category] of categories) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = category.label;
    promptCategorySelect.appendChild(option);
  }

  const hasCurrent = categories.some(([key]) => key === currentValue);
  state.promptCategory = hasCurrent ? currentValue : firstPromptCategoryKey();
  promptCategorySelect.value = state.promptCategory;
}

function currentPromptEntries() {
  const category = currentLanguageConfig().prompts?.[state.promptCategory];
  return Array.isArray(category?.entries) ? category.entries : [];
}

function currentPromptIndex() {
  const rawIndex = state.currentPromptIndexByCategory?.[state.promptCategory];
  return Number.isInteger(rawIndex) ? rawIndex : 0;
}

function ensurePromptSelectionValid() {
  const categories = promptCategories();

  if (!categories.some(([key]) => key === state.promptCategory)) {
    state.promptCategory = firstPromptCategoryKey();
  }

  const prompts = currentPromptEntries();

  if (!prompts.length) {
    state.currentPromptIndexByCategory[state.promptCategory] = 0;
    return;
  }

  const index = currentPromptIndex();
  if (index < 0 || index >= prompts.length) {
    state.currentPromptIndexByCategory[state.promptCategory] = 0;
  }
}

function currentPromptEntry() {
  const prompts = currentPromptEntries();

  if (!prompts.length) {
    return null;
  }

  ensurePromptSelectionValid();
  return prompts[currentPromptIndex()] || null;
}

function currentPromptText() {
  const entry = currentPromptEntry();

  if (!entry) {
    return "";
  }

  if (entry.type === "starter") {
    const config = currentLanguageConfig();
    const cueLines = entry.cues.map((cue, index) => `${index + 1}. ${cue}`).join("\n");
    return `${config.starterIntro}\n${entry.lead}\n\n${config.starterFollowup}\n${cueLines}`;
  }

  return String(entry.text || "").trim();
}

function syncPrompt() {
  const config = currentLanguageConfig();
  const prompt = currentPromptText();
  promptLabel.textContent = config.promptLabel;
  promptText.textContent = prompt || config.noPrompt;
  nextPromptButton.textContent = config.promptButtonNew;
  insertPromptButton.textContent = config.promptButtonInsert;
  promptCategorySelect.setAttribute("aria-label", config.promptCategoryLabel);
  const isDisabled = !prompt;
  nextPromptButton.disabled = isDisabled;
  insertPromptButton.disabled = isDisabled;
  syncSpeechButton();
}

function nextPromptIndex(total, current) {
  if (total <= 1) {
    return 0;
  }

  let index = Math.floor(Math.random() * total);
  if (index === current) {
    index = (index + 1) % total;
  }
  return index;
}

function insertIntoEditor(text) {
  const currentValue = editor.value;
  const selectionStart = editor.selectionStart ?? currentValue.length;
  const selectionEnd = editor.selectionEnd ?? currentValue.length;
  const prefix = currentValue.slice(0, selectionStart);
  const suffix = currentValue.slice(selectionEnd);
  const separatorBefore = prefix && !prefix.endsWith("\n") ? "\n\n" : "";
  const separatorAfter = suffix && !suffix.startsWith("\n") ? "\n\n" : "";
  const inserted = `${separatorBefore}${text}${separatorAfter}`;
  editor.value = `${prefix}${inserted}${suffix}`;
  editor.focus();
  const caret = prefix.length + inserted.length;
  editor.setSelectionRange(caret, caret);
  state.note = editor.value;
  persistState();
}

function speakCurrentPrompt() {
  const prompt = currentPromptText();

  if (!prompt) {
    return;
  }

  if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
    updateSummary("Browser TTS is not available in this browser.", true);
    return;
  }

  stopSpeaking(false);

  const utterance = new SpeechSynthesisUtterance(prompt);
  utterance.lang = currentLanguageConfig().voiceCode;
  utterance.rate = 0.96;
  utterance.pitch = 1;

  const voice = pickVoice(utterance.lang);
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    state.speaking = true;
    syncSpeechButton();
  };

  utterance.onend = () => {
    state.speaking = false;
    syncSpeechButton();
  };

  utterance.onerror = () => {
    state.speaking = false;
    syncSpeechButton();
    updateSummary("Browser TTS could not play this prompt.", true);
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function stopSpeaking(updateButton = true) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  state.speaking = false;

  if (updateButton) {
    syncSpeechButton();
  }
}

function syncSpeechButton() {
  const config = currentLanguageConfig();
  const prompt = currentPromptText();
  const supported = "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
  speakPromptButton.disabled = !prompt || !supported;
  speakPromptButton.textContent = state.speaking ? config.promptButtonStop : config.promptButtonSpeak;
}

function pickVoice(languageCode) {
  if (!("speechSynthesis" in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang === languageCode) || voices.find((voice) => voice.lang.startsWith(languageCode.slice(0, 2))) || null;
}
