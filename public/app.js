const state = {
  practiceMode: false,
  saving: false,
  deck: [],
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

bootstrap();

async function bootstrap() {
  try {
    setStatus("Loading your workspace...", false);
    const response = await fetch("/api/state");
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Failed to load state.");
    }

    editor.value = payload.note || "";
    state.deck = Array.isArray(payload.deck) ? payload.deck : [];
    renderDeck();
    updateSummary(payload.lastSummary || "Ready.");
    lastSaved.textContent = payload.lastSavedAt ? formatSavedTime(payload.lastSavedAt) : "No saves yet";
    cardCount.textContent = `${payload.stats?.totalCards || 0} cards`;
    newCardsCount.textContent = "0 new";
    setStatus("Ready to revise.", false);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Failed to load workspace.", true);
    updateSummary("The app could not load your saved note.");
  }
}

saveButton.addEventListener("click", () => {
  void saveDraft();
});

practiceToggle.addEventListener("click", () => {
  state.practiceMode = !state.practiceMode;
  practiceToggle.setAttribute("aria-pressed", String(state.practiceMode));
  practiceToggle.textContent = state.practiceMode ? "Show answers by tap" : "Practice mode";
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

  state.saving = true;
  saveButton.disabled = true;
  saveButton.textContent = "Saving...";
  setStatus("Fixing grammar and translating gaps...", false);

  try {
    const response = await fetch("/api/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: editor.value }),
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Save failed.");
    }

    editor.value = payload.note || "";
    state.deck = Array.isArray(payload.deck) ? payload.deck : [];
    renderDeck();
    updateSummary(payload.lastSummary || "Draft updated.");
    setStatus("Draft corrected and saved.", false);
    lastSaved.textContent = payload.lastSavedAt ? formatSavedTime(payload.lastSavedAt) : "Saved";
    cardCount.textContent = `${payload.stats?.totalCards || 0} cards`;
    newCardsCount.textContent = `${payload.newCards || 0} new`;
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Save failed.", true);
    updateSummary("The draft was not updated. Check the server and your Groq key.");
  } finally {
    state.saving = false;
    saveButton.disabled = false;
    saveButton.textContent = "Fix + Save";
  }
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
