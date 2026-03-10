const STORAGE_KEY = "typelearn.state.v2";
const SETTINGS_KEY = "typelearn.settings.v1";

const DEFAULT_STATE = {
  note: "",
  deck: [],
  lastSavedAt: null,
  lastSummary: "Press Ctrl+S after writing to correct the draft and add flashcards.",
  lastNewCards: 0,
  practiceMode: false,
};

const DEFAULT_SETTINGS = {
  apiBaseUrl: "",
  appSecret: "",
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
const apiBaseUrlInput = document.querySelector("#apiBaseUrl");
const appSecretInput = document.querySelector("#appSecret");
const saveSettingsButton = document.querySelector("#saveSettingsButton");
const clearLocalDataButton = document.querySelector("#clearLocalDataButton");
const settingsSummary = document.querySelector("#settingsSummary");

bootstrap();

function bootstrap() {
  editor.value = state.note;
  apiBaseUrlInput.value = state.settings.apiBaseUrl;
  appSecretInput.value = state.settings.appSecret;
  renderDeck();
  renderMeta();
  syncPracticeToggle();
  updateSettingsSummary();

  if (state.settings.apiBaseUrl && state.settings.appSecret) {
    setStatus("Ready to revise.", false);
  } else {
    setStatus("Configure the Worker URL and access secret before saving.", false);
  }
}

editor.addEventListener("input", () => {
  state.note = editor.value;
  persistState();
});

saveButton.addEventListener("click", () => {
  void saveDraft();
});

saveSettingsButton.addEventListener("click", () => {
  persistSettingsFromInputs();
});

clearLocalDataButton.addEventListener("click", () => {
  clearLocalData();
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

  const settings = persistSettingsFromInputs();

  if (!settings.apiBaseUrl || !settings.appSecret) {
    setStatus("Add the Worker URL and access secret first.", true);
    updateSummary("Your text is still local, but the app cannot call the API yet.");
    return;
  }

  const rewriteUrl = buildRewriteUrl(settings.apiBaseUrl);

  state.saving = true;
  saveButton.disabled = true;
  saveButton.textContent = "Saving...";
  setStatus("Fixing grammar and translating gaps...", false);

  try {
    const response = await fetch(rewriteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Typelearn-Secret": settings.appSecret,
      },
      body: JSON.stringify({ text: editor.value }),
    });
    const payload = await readResponsePayload(response);

    if (!response.ok) {
      throw new Error(payload.error || "Save failed.");
    }

    const normalizedCards = Array.isArray(payload.cards) ? payload.cards.map(normalizeCard) : [];
    const mergedDeck = mergeDeck(state.deck, normalizedCards);

    state.note = String(payload.correctedText || editor.value);
    state.deck = mergedDeck.deck;
    state.lastSavedAt = new Date().toISOString();
    state.lastSummary = String(payload.changeSummary || "Draft updated.");
    state.lastNewCards = mergedDeck.addedCount;

    editor.value = state.note;
    persistState();
    renderDeck();
    renderMeta();
    setStatus("Draft corrected and saved.", false);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Save failed.", true);
    updateSummary("The draft is still saved locally, but the API request did not complete.");
  } finally {
    state.saving = false;
    saveButton.disabled = false;
    saveButton.textContent = "Fix + Save";
  }
}

function persistSettingsFromInputs() {
  state.settings = {
    apiBaseUrl: normalizeApiBase(apiBaseUrlInput.value),
    appSecret: String(appSecretInput.value || "").trim(),
  };

  apiBaseUrlInput.value = state.settings.apiBaseUrl;
  appSecretInput.value = state.settings.appSecret;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
  updateSettingsSummary();
  return state.settings;
}

function updateSettingsSummary() {
  if (state.settings.apiBaseUrl && state.settings.appSecret) {
    settingsSummary.textContent = `Using ${buildRewriteUrl(state.settings.apiBaseUrl)}. The access secret is stored only on this device.`;
    return;
  }

  settingsSummary.textContent =
    "Add your Worker URL and access secret once on this device. They are stored only in your browser.";
}

function clearLocalData() {
  const confirmed = window.confirm("Clear the local note, flashcards, and saved settings on this device?");

  if (!confirmed) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SETTINGS_KEY);

  state.note = DEFAULT_STATE.note;
  state.deck = [];
  state.lastSavedAt = null;
  state.lastSummary = DEFAULT_STATE.lastSummary;
  state.lastNewCards = 0;
  state.practiceMode = false;
  state.settings = { ...DEFAULT_SETTINGS };

  editor.value = "";
  apiBaseUrlInput.value = "";
  appSecretInput.value = "";
  renderDeck();
  renderMeta();
  syncPracticeToggle();
  updateSettingsSummary();
  setStatus("Local data cleared.", false);
}

function renderMeta() {
  updateSummary(state.lastSummary);
  lastSaved.textContent = state.lastSavedAt ? formatSavedTime(state.lastSavedAt) : "Nothing saved yet";
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
  practiceToggle.textContent = state.practiceMode ? "Reveal by tap" : "Practice mode";
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
    apiBaseUrl: normalizeApiBase(parsed.apiBaseUrl),
    appSecret: typeof parsed.appSecret === "string" ? parsed.appSecret : DEFAULT_SETTINGS.appSecret,
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

function normalizeApiBase(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function buildRewriteUrl(apiBaseUrl) {
  return apiBaseUrl.endsWith("/api/rewrite") ? apiBaseUrl : `${apiBaseUrl}/api/rewrite`;
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
  return `Saved locally ${date.toLocaleString()}`;
}
