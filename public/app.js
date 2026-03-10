const STORAGE_KEY = "typelearn.state.v4";
const SETTINGS_KEY = "typelearn.settings.v1";

const DEFAULT_STATE = {
  note: "",
  deck: [],
  lastSavedAt: null,
  lastSummary: "Press Ctrl+S to fix grammar and translate English terms.",
  lastNewCards: 0,
  practiceMode: false,
};

const DEFAULT_SETTINGS = {
  groqApiKey: "",
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

bootstrap();

function bootstrap() {
  editor.value = state.note;
  groqApiKeyInput.value = state.settings.groqApiKey;
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

practiceToggle.addEventListener("click", () => {
  state.practiceMode = !state.practiceMode;
  persistState();
  syncPracticeToggle();
  renderDeck();
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
      body: JSON.stringify({ text: editor.value }),
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
  };

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));

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
    deckEmpty.hidden = false;
    return;
  }

  deckEmpty.hidden = true;

  for (const card of state.deck) {
    const fragment = cardTemplate.content.cloneNode(true);
    const cardNode = fragment.querySelector(".flashcard");
    const button = fragment.querySelector(".flip-button");

    fragment.querySelector('[data-field="sourceTerm"]').textContent = card.sourceTerm;
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
  };
}

function loadSettings() {
  const parsed = loadJson(SETTINGS_KEY, DEFAULT_SETTINGS);

  return {
    groqApiKey: typeof parsed.groqApiKey === "string" ? parsed.groqApiKey : DEFAULT_SETTINGS.groqApiKey,
  };
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
