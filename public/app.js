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
    promptLabel: "Optional prompt (Spanish)",
    prompts: [
      "Your friend from another country is visiting for 48 hours. Plan the full itinerary and explain your choices.",
      "You can keep only three apps on your phone. Which ones stay and why?",
      "Describe your most chaotic travel day from start to finish.",
      "Would you rather live in a huge city or a small town for the next ten years? Defend your choice.",
      "Write a message to your past self from five years ago.",
      "A restaurant gave you the wrong order and you are in a rush. Describe what happened and what you did.",
      "Tell the story of a small decision that changed your day.",
      "Describe your dream apartment in detail, including location, layout, and neighborhood.",
      "Write about a skill everyone should learn before age 18.",
      "You have one free weekend with no obligations and no internet. What do you do?",
      "Should schools teach practical life skills like taxes and contracts? Explain your position.",
      "Describe a conversation that made you rethink your opinion.",
      "If you had to move to a new country next month, what would be your biggest fear and biggest excitement?",
      "Write a short review of a movie or series you recently watched.",
      "Explain your morning routine and what you want to improve.",
      "Tell a story about getting lost in an unfamiliar place.",
      "Describe a local food that visitors often misunderstand.",
      "You are creating a playlist for a long night drive. What songs or moods go first, middle, and last?",
      "Write about a habit that improved your mood or productivity.",
      "Should remote work be permanent for most office jobs? Argue your side.",
    ],
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
    promptLabel: "Optional prompt (Polish)",
    prompts: [
      "Przyjaciel przyjezdza do ciebie na 2 dni. Zaplanuj mu caly pobyt i uzasadnij wybor miejsc.",
      "Mozesz zostawic tylko trzy aplikacje w telefonie. Ktore wybierasz i dlaczego?",
      "Opisz najbardziej chaotyczny dzien podrozy, jaki miales.",
      "Wolisz mieszkac w duzym miescie czy w malym miasteczku przez nastepne 10 lat? Uzasadnij.",
      "Napisz wiadomosc do siebie sprzed pieciu lat.",
      "W restauracji dostajesz zle zamowienie i bardzo sie spieszysz. Co robisz?",
      "Opisz mala decyzje, ktora zmienila twoj dzien.",
      "Opisz swoje wymarzone mieszkanie: lokalizacje, uklad i okolice.",
      "Jaka umiejetnosc kazdy powinien poznac przed 18 rokiem zycia?",
      "Masz wolny weekend bez internetu. Jak go spedzasz?",
      "Czy szkola powinna uczyc praktycznych rzeczy, jak podatki i umowy? Wyjasnij stanowisko.",
      "Opisz rozmowe, po ktorej zmieniles zdanie na wazny temat.",
      "Gdybys mial przeprowadzic sie do nowego kraju za miesiac, czego najbardziej bys sie bal, a co by cie cieszylo?",
      "Napisz krotka recenzje filmu lub serialu, ktory ostatnio widziales.",
      "Opisz swoja poranna rutyne i co chcesz w niej poprawic.",
      "Opowiedz historie o tym, jak zgubiles sie w nieznanym miejscu.",
      "Opisz lokalne danie, ktore turysci czesto zle rozumieja.",
      "Tworzysz playliste na nocna jazde samochodem. Jaki klimat wybierasz na poczatek, srodek i koniec?",
      "Napisz o nawyku, ktory poprawil twoj humor albo produktywnosc.",
      "Czy praca zdalna powinna zostac na stale w wiekszosci prac biurowych? Uzasadnij odpowiedz.",
    ],
  },
};

const DEFAULT_STATE = {
  note: "",
  deck: [],
  lastSavedAt: null,
  lastSummary: "Press Ctrl+S to fix grammar and translate English terms.",
  lastNewCards: 0,
  practiceMode: false,
  currentPromptIndex: 0,
};

const DEFAULT_SETTINGS = {
  groqApiKey: "",
  targetLanguage: "spanish",
};

const state = {
  ...loadState(),
  settings: loadSettings(),
  saving: false,
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
const nextPromptButton = document.querySelector("#nextPromptButton");
const insertPromptButton = document.querySelector("#insertPromptButton");

bootstrap();

function bootstrap() {
  editor.value = state.note;
  groqApiKeyInput.value = state.settings.groqApiKey;
  syncLanguageMode();
  ensurePromptIndexValid();
  syncPrompt();
  renderDeck();
  renderMeta();
  syncPracticeToggle();

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
  const current = currentLanguageConfig();
  state.settings.targetLanguage = current.name === "Spanish" ? "polish" : "spanish";
  state.currentPromptIndex = 0;
  persistSettings();
  persistState();
  syncLanguageMode();
  ensurePromptIndexValid();
  syncPrompt();
  renderDeck();
});

practiceToggle.addEventListener("click", () => {
  state.practiceMode = !state.practiceMode;
  persistState();
  syncPracticeToggle();
  renderDeck();
});

nextPromptButton.addEventListener("click", () => {
  const prompts = currentLanguageConfig().prompts || [];

  if (!prompts.length) {
    return;
  }

  state.currentPromptIndex = nextPromptIndex(prompts.length, state.currentPromptIndex);
  persistState();
  syncPrompt();
});

insertPromptButton.addEventListener("click", () => {
  const prompt = currentPromptText();

  if (!prompt) {
    return;
  }

  const currentValue = editor.value;
  const selectionStart = editor.selectionStart ?? currentValue.length;
  const selectionEnd = editor.selectionEnd ?? currentValue.length;
  const prefix = currentValue.slice(0, selectionStart);
  const suffix = currentValue.slice(selectionEnd);
  const separatorBefore = prefix && !prefix.endsWith("\n") ? "\n\n" : "";
  const separatorAfter = suffix && !suffix.startsWith("\n") ? "\n\n" : "";
  const inserted = `${separatorBefore}${prompt}${separatorAfter}`;
  editor.value = `${prefix}${inserted}${suffix}`;
  editor.focus();
  const caret = prefix.length + inserted.length;
  editor.setSelectionRange(caret, caret);
  state.note = editor.value;
  persistState();
});

window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    void saveDraft();
  }
});

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
  practiceToggle.textContent = state.practiceMode ? "Show answers by tap" : "Practice mode";
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
      currentPromptIndex: state.currentPromptIndex,
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
    currentPromptIndex: Number.isFinite(parsed.currentPromptIndex) ? parsed.currentPromptIndex : 0,
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
}

function syncPrompt() {
  const config = currentLanguageConfig();
  const prompt = currentPromptText();
  promptLabel.textContent = config.promptLabel;
  promptText.textContent = prompt || "No prompts available for this mode yet.";
  const isDisabled = !prompt;
  nextPromptButton.disabled = isDisabled;
  insertPromptButton.disabled = isDisabled;
}

function currentPromptText() {
  const prompts = currentLanguageConfig().prompts || [];

  if (!prompts.length) {
    return "";
  }

  ensurePromptIndexValid();
  return prompts[state.currentPromptIndex];
}

function ensurePromptIndexValid() {
  const prompts = currentLanguageConfig().prompts || [];

  if (!prompts.length) {
    state.currentPromptIndex = 0;
    return;
  }

  if (!Number.isInteger(state.currentPromptIndex) || state.currentPromptIndex < 0 || state.currentPromptIndex >= prompts.length) {
    state.currentPromptIndex = 0;
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
