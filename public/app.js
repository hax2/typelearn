const STORAGE_KEY = "typelearn.state.v4";
const SETTINGS_KEY = "typelearn.settings.v1";

const TARGET_LANGUAGES = {
  spanish: {
    name: "Spanish",
    modeLabel: "Mode: Spanish",
    eyebrow: "Spanish-first writing lab",
    heroTitle: "Write in Spanish. Borrow from English only when you have to.",
    subtitle:
      "Press Ctrl+S or Cmd+S to clean the draft, translate English gaps into Spanish, and turn those missing words into flashcards.",
    placeholder: "Escribe aqui. Si no sabes una palabra, ponla en English y guarda.",
    cardHint: "Tap to reveal the Spanish answer.",
    cardLabel: "Spanish",
    deckEmpty: "Your missing English words will show up here as study cards after each save.",
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
          {
            type: "prompt",
            text: "Solo puedes quedarte con tres aplicaciones en tu telefono. Cuales eliges y por que?",
          },
          {
            type: "prompt",
            text: "Deberian las escuelas ensenar habilidades practicas como impuestos, contratos y presupuestos? Defiende tu postura.",
          },
          {
            type: "prompt",
            text: "Seria mejor vivir los proximos diez anos en una ciudad enorme o en un pueblo pequeno? Explica tu decision.",
          },
          {
            type: "prompt",
            text: "La mayoria de los trabajos de oficina deberian seguir siendo remotos? Argumenta tu respuesta.",
          },
          {
            type: "prompt",
            text: "Que habilidad deberia aprender todo el mundo antes de cumplir 18 anos?",
          },
        ],
      },
      stories: {
        label: "Historias",
        entries: [
          {
            type: "prompt",
            text: "Cuenta la historia de una pequena decision que cambio por completo tu dia.",
          },
          {
            type: "prompt",
            text: "Describe el dia de viaje mas caotico que has vivido, desde el principio hasta el final.",
          },
          {
            type: "prompt",
            text: "Escribe sobre una conversacion que te hizo cambiar de opinion.",
          },
          {
            type: "prompt",
            text: "Perdiste el rumbo en un lugar desconocido. Que paso y como saliste de ahi?",
          },
          {
            type: "prompt",
            text: "En un restaurante te dieron el pedido equivocado y estabas con prisa. Explica que hiciste.",
          },
        ],
      },
      daily: {
        label: "Vida diaria",
        entries: [
          {
            type: "prompt",
            text: "Describe tu rutina de la manana y lo que te gustaria mejorar.",
          },
          {
            type: "prompt",
            text: "Tienes un fin de semana libre, sin obligaciones y sin internet. Como lo aprovechas?",
          },
          {
            type: "prompt",
            text: "Haz una resena breve de una pelicula o serie que viste hace poco.",
          },
          {
            type: "prompt",
            text: "Describe una comida local que los visitantes suelen entender mal.",
          },
          {
            type: "prompt",
            text: "Escribe sobre un habito que mejoro tu humor o tu productividad.",
          },
        ],
      },
      scenario: {
        label: "Escenarios",
        entries: [
          {
            type: "prompt",
            text: "Un amigo extranjero viene a visitarte durante 48 horas. Organiza el itinerario completo y explica tus elecciones.",
          },
          {
            type: "prompt",
            text: "Si tuvieras que mudarte a otro pais el mes que viene, cual seria tu mayor miedo y tu mayor ilusion?",
          },
          {
            type: "prompt",
            text: "Disena tu apartamento ideal con detalles sobre la ubicacion, la distribucion y el barrio.",
          },
          {
            type: "prompt",
            text: "Estas preparando una playlist para un viaje largo de noche. Que energia quieres al principio, en medio y al final?",
          },
          {
            type: "prompt",
            text: "Escribe un mensaje para tu version de hace cinco anos.",
          },
        ],
      },
      starters: {
        label: "Frases para continuar",
        entries: [
          {
            type: "starter",
            lead: "Lo que mas me sorprendio de ese dia fue...",
            cues: [
              "Empieza con la situacion exacta.",
              "Explica por que te sorprendio.",
              "Cuenta lo que cambio despues.",
            ],
          },
          {
            type: "starter",
            lead: "Nunca pense que diria esto, pero ahora creo que...",
            cues: [
              "Di que opinabas antes.",
              "Explica que hizo cambiar tu postura.",
              "Termina con un ejemplo concreto.",
            ],
          },
          {
            type: "starter",
            lead: "Si manana tuviera que empezar de cero en otra ciudad, primero...",
            cues: [
              "Describe tu primera decision.",
              "Cuenta que seria lo mas dificil.",
              "Explica que te daria tranquilidad.",
            ],
          },
          {
            type: "starter",
            lead: "La razon real por la que sigo volviendo a ese lugar es...",
            cues: [
              "Describe el lugar con detalles.",
              "Explica la conexion emocional.",
              "Anade una pequena historia personal.",
            ],
          },
          {
            type: "starter",
            lead: "Lo que me hubiera gustado decir en ese momento era...",
            cues: [
              "Resume la escena.",
              "Escribe lo que no dijiste.",
              "Explica por que te quedaste callado o callada.",
            ],
          },
        ],
      },
    },
  },
  polish: {
    name: "Polish",
    modeLabel: "Mode: Polish",
    eyebrow: "Polish-first writing lab",
    heroTitle: "Write in Polish. Borrow from English only when you have to.",
    subtitle:
      "Press Ctrl+S or Cmd+S to clean the draft, translate English gaps into Polish, and turn those missing words into flashcards.",
    placeholder: "Pisz po polsku. Jesli nie znasz slowa, wpisz je in English i zapisz.",
    cardHint: "Tap to reveal the Polish answer.",
    cardLabel: "Polish",
    deckEmpty: "Missing English words will appear here as Polish study cards after each save.",
    promptLabel: "Optional prompt",
    promptCategoryLabel: "Prompt category",
    noPrompt: "No prompts available for this mode yet.",
    promptButtonNew: "New prompt",
    promptButtonInsert: "Insert prompt",
    promptButtonSpeak: "Speak prompt",
    promptButtonStop: "Stop audio",
    starterIntro: "Start with this sentence and build it out with details:",
    starterFollowup: "Keep going with:",
    practiceModeIdle: "Practice mode",
    practiceModeActive: "Show answers by tap",
    prompts: {
      opinion: {
        label: "Opinions",
        entries: [
          {
            type: "prompt",
            text: "Mozesz zostawic tylko trzy aplikacje w telefonie. Ktore wybierasz i dlaczego?",
          },
          {
            type: "prompt",
            text: "Czy szkola powinna uczyc praktycznych rzeczy, jak podatki i umowy? Wyjasnij stanowisko.",
          },
          {
            type: "prompt",
            text: "Wolisz mieszkac w duzym miescie czy w malym miasteczku przez nastepne 10 lat? Uzasadnij.",
          },
          {
            type: "prompt",
            text: "Czy praca zdalna powinna zostac na stale w wiekszosci prac biurowych? Uzasadnij odpowiedz.",
          },
          {
            type: "prompt",
            text: "Jaka umiejetnosc kazdy powinien poznac przed 18 rokiem zycia?",
          },
        ],
      },
      stories: {
        label: "Stories",
        entries: [
          {
            type: "prompt",
            text: "Opisz najbardziej chaotyczny dzien podrozy, jaki miales.",
          },
          {
            type: "prompt",
            text: "Opisz mala decyzje, ktora zmienila twoj dzien.",
          },
          {
            type: "prompt",
            text: "Opisz rozmowe, po ktorej zmieniles zdanie na wazny temat.",
          },
          {
            type: "prompt",
            text: "Opowiedz historie o tym, jak zgubiles sie w nieznanym miejscu.",
          },
          {
            type: "prompt",
            text: "W restauracji dostajesz zle zamowienie i bardzo sie spieszysz. Co robisz?",
          },
        ],
      },
      daily: {
        label: "Daily life",
        entries: [
          {
            type: "prompt",
            text: "Opisz swoja poranna rutyne i co chcesz w niej poprawic.",
          },
          {
            type: "prompt",
            text: "Masz wolny weekend bez internetu. Jak go spedzasz?",
          },
          {
            type: "prompt",
            text: "Napisz krotka recenzje filmu lub serialu, ktory ostatnio widziales.",
          },
          {
            type: "prompt",
            text: "Opisz lokalne danie, ktore turysci czesto zle rozumieja.",
          },
          {
            type: "prompt",
            text: "Napisz o nawyku, ktory poprawil twoj humor albo produktywnosc.",
          },
        ],
      },
      scenario: {
        label: "Scenarios",
        entries: [
          {
            type: "prompt",
            text: "Przyjaciel przyjezdza do ciebie na 2 dni. Zaplanuj mu caly pobyt i uzasadnij wybor miejsc.",
          },
          {
            type: "prompt",
            text: "Gdybys mial przeprowadzic sie do nowego kraju za miesiac, czego najbardziej bys sie bal, a co by cie cieszylo?",
          },
          {
            type: "prompt",
            text: "Opisz swoje wymarzone mieszkanie: lokalizacje, uklad i okolice.",
          },
          {
            type: "prompt",
            text: "Tworzysz playliste na nocna jazde samochodem. Jaki klimat wybierasz na poczatek, srodek i koniec?",
          },
          {
            type: "prompt",
            text: "Napisz wiadomosc do siebie sprzed pieciu lat.",
          },
        ],
      },
      starters: {
        label: "Sentence starters",
        entries: [
          {
            type: "starter",
            lead: "Najbardziej zaskoczylo mnie wtedy to, ze...",
            cues: [
              "Opisz, co dokladnie sie stalo.",
              "Wyjasnij, dlaczego bylo to nieoczekiwane.",
              "Napisz, co zmienilo sie potem.",
            ],
          },
          {
            type: "starter",
            lead: "Nigdy nie sadzilem, ze to powiem, ale teraz uwazam, ze...",
            cues: [
              "Wyjasnij, co myslales wczesniej.",
              "Powiedz, co zmienilo twoje zdanie.",
              "Dodaj konkretny przyklad.",
            ],
          },
          {
            type: "starter",
            lead: "Gdybym jutro musial zaczac od zera w nowym miescie, najpierw...",
            cues: [
              "Opisz pierwszy krok.",
              "Napisz, co byloby najtrudniejsze.",
              "Wyjasnij, co daloby ci spokoj.",
            ],
          },
          {
            type: "starter",
            lead: "Prawdziwy powod, dla ktorego wracam w to miejsce, jest taki, ze...",
            cues: [
              "Opisz to miejsce szczegolowo.",
              "Wyjasnij emocjonalna wiez.",
              "Dodaj krotka osobista historie.",
            ],
          },
          {
            type: "starter",
            lead: "To, co naprawde chcialem wtedy powiedziec, to...",
            cues: [
              "Zarysuj scene.",
              "Napisz, czego nie powiedziales lub nie powiedzialas.",
              "Wyjasnij, dlaczego milczales lub milczalas.",
            ],
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
  lastSummary: "Press Ctrl+S to fix grammar and translate English terms.",
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
const saveStatus = document.querySelector("#saveStatus");
const lastSaved = document.querySelector("#lastSaved");
const cardCount = document.querySelector("#cardCount");
const newCardsCount = document.querySelector("#newCardsCount");
const changeSummary = document.querySelector("#changeSummary");
const deckList = document.querySelector("#deckList");
const deckEmpty = document.querySelector("#deckEmpty");
const practiceToggle = document.querySelector("#practiceToggle");
const cardTemplate = document.querySelector("#cardTemplate");
const groqApiKeyInput = document.querySelector("#groqApiKey");
const saveKeyButton = document.querySelector("#saveKeyButton");
const languageToggle = document.querySelector("#languageToggle");
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
  syncLanguageMode();
  syncPromptCategoryOptions();
  ensurePromptSelectionValid();
  syncPrompt();
  renderDeck();
  renderMeta();
  syncPracticeToggle();
  syncSpeechButton();

  if (state.settings.groqApiKey) {
    setStatus("Ready. Using browser-stored API key.", false);
  } else {
    setStatus("Ready. Using server API key if configured.", false);
  }
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

languageToggle.addEventListener("click", () => {
  stopSpeaking();
  const current = currentLanguageConfig();
  state.settings.targetLanguage = current.name === "Spanish" ? "polish" : "spanish";
  state.promptCategory = firstPromptCategoryKey();
  state.currentPromptIndexByCategory = {};
  persistSettings();
  persistState();
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

  const currentIndex = currentPromptIndex();
  state.currentPromptIndexByCategory[state.promptCategory] = nextPromptIndex(prompts.length, currentIndex);
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

if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    if (state.speaking) {
      syncSpeechButton();
    }
  });
}

async function saveDraft() {
  if (state.saving) {
    return;
  }

  persistSettingsFromInputs();
  state.saving = true;
  saveButton.disabled = true;
  saveButton.textContent = "Saving...";
  setStatus("Fixing grammar and translating gaps...", false);

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
      throw new Error(payload.error || "Save failed.");
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
    setStatus("Draft corrected and saved.", false);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Save failed.", true);
    updateSummary("The draft stays local. Verify your API key or server configuration.");
  } finally {
    state.saving = false;
    saveButton.disabled = false;
    saveButton.textContent = "Fix + Save";
  }
}

function persistSettingsFromInputs() {
  state.settings = {
    groqApiKey: String(groqApiKeyInput.value || "").trim(),
    targetLanguage: normalizeTargetLanguage(state.settings.targetLanguage),
  };

  persistSettings();

  if (state.settings.groqApiKey) {
    setStatus("API key saved in browser storage.", false);
  } else {
    setStatus("Key cleared. App will use server key if available.", false);
  }
}

function renderMeta() {
  updateSummary(state.lastSummary);
  lastSaved.textContent = state.lastSavedAt ? formatSavedTime(state.lastSavedAt) : "No saves yet";
  cardCount.textContent = `${state.deck.length} cards`;
  newCardsCount.textContent = `${state.lastNewCards} new`;
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

  return {
    note: typeof parsed.note === "string" ? parsed.note : DEFAULT_STATE.note,
    deck: Array.isArray(parsed.deck) ? parsed.deck.map(normalizeCard) : [],
    lastSavedAt: typeof parsed.lastSavedAt === "string" ? parsed.lastSavedAt : DEFAULT_STATE.lastSavedAt,
    lastSummary: typeof parsed.lastSummary === "string" ? parsed.lastSummary : DEFAULT_STATE.lastSummary,
    lastNewCards: Number.isFinite(parsed.lastNewCards) ? parsed.lastNewCards : DEFAULT_STATE.lastNewCards,
    practiceMode: Boolean(parsed.practiceMode),
    promptCategory: typeof parsed.promptCategory === "string" ? parsed.promptCategory : DEFAULT_STATE.promptCategory,
    currentPromptIndexByCategory:
      parsed.currentPromptIndexByCategory && typeof parsed.currentPromptIndexByCategory === "object"
        ? parsed.currentPromptIndexByCategory
        : {},
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

function setStatus(message, isError) {
  saveStatus.textContent = message;
  saveStatus.dataset.error = isError ? "true" : "false";
}

function updateSummary(message) {
  changeSummary.textContent = message;
}

function formatSavedTime(timestamp) {
  const date = new Date(timestamp);
  return `Saved ${date.toLocaleString()}`;
}

function normalizeTargetLanguage(value) {
  return value === "polish" ? "polish" : "spanish";
}

function currentLanguageConfig() {
  return TARGET_LANGUAGES[normalizeTargetLanguage(state.settings.targetLanguage)];
}

function syncLanguageMode() {
  state.settings.targetLanguage = normalizeTargetLanguage(state.settings.targetLanguage);
  const config = currentLanguageConfig();
  languageToggle.textContent = config.modeLabel;
  eyebrow.textContent = config.eyebrow;
  heroTitle.textContent = config.heroTitle;
  subtitle.textContent = config.subtitle;
  editor.placeholder = config.placeholder;
  deckEmpty.textContent = config.deckEmpty;
  syncPracticeToggle();
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

function promptCategories() {
  return Object.entries(currentLanguageConfig().prompts || {});
}

function firstPromptCategoryKey() {
  const categories = promptCategories();
  return categories.length ? categories[0][0] : "";
}

function currentPromptEntries() {
  const category = currentLanguageConfig().prompts?.[state.promptCategory];
  return Array.isArray(category?.entries) ? category.entries : [];
}

function currentPromptIndex() {
  const rawIndex = state.currentPromptIndexByCategory?.[state.promptCategory];
  return Number.isInteger(rawIndex) ? rawIndex : 0;
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
    const cueLines = Array.isArray(entry.cues)
      ? entry.cues.map((cue, index) => `${index + 1}. ${cue}`).join("\n")
      : "";
    return `${config.starterIntro}\n${entry.lead}\n\n${config.starterFollowup}\n${cueLines}`;
  }

  return String(entry.text || "").trim();
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

  const currentIndex = currentPromptIndex();
  if (currentIndex < 0 || currentIndex >= prompts.length) {
    state.currentPromptIndexByCategory[state.promptCategory] = 0;
  }
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
    setStatus("Browser TTS is not available in this browser.", true);
    return;
  }

  stopSpeaking(false);

  const utterance = new SpeechSynthesisUtterance(prompt);
  utterance.lang = currentLanguageVoiceCode();
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
    setStatus("Browser TTS could not play this prompt.", true);
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
  speakPromptButton.textContent = state.speaking ? config.promptButtonStop || "Stop audio" : config.promptButtonSpeak;
}

function currentLanguageVoiceCode() {
  return state.settings.targetLanguage === "polish" ? "pl-PL" : "es-ES";
}

function pickVoice(languageCode) {
  if (!("speechSynthesis" in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang === languageCode) || voices.find((voice) => voice.lang.startsWith(languageCode.slice(0, 2))) || null;
}
