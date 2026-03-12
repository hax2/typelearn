import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_STATE = {
  note: "",
  deck: [],
  lastSavedAt: null,
  lastSummary: "Usa Check + Fix para corregir tu texto y guardar nuevas tarjetas.",
};

function normalizeCard(card) {
  const sourceTerm = String(card.sourceTerm || "").trim();
  const spanishTerm = String(card.spanishTerm || "").trim();
  const exampleSentence = String(card.exampleSentence || "").trim();
  const notes = String(card.notes || "").trim();
  const createdAt = String(card.createdAt || new Date().toISOString());
  const id = String(card.id || `${sourceTerm.toLowerCase()}::${spanishTerm.toLowerCase()}`);

  return {
    id,
    sourceTerm,
    spanishTerm,
    exampleSentence,
    notes,
    createdAt,
  };
}

export async function ensureStateFile(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    await writeFile(filePath, JSON.stringify(DEFAULT_STATE, null, 2));
  }
}

export async function readState(filePath) {
  await ensureStateFile(filePath);
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);

  return {
    note: typeof parsed.note === "string" ? parsed.note : DEFAULT_STATE.note,
    deck: Array.isArray(parsed.deck) ? parsed.deck.map(normalizeCard) : [],
    lastSavedAt: typeof parsed.lastSavedAt === "string" ? parsed.lastSavedAt : DEFAULT_STATE.lastSavedAt,
    lastSummary: typeof parsed.lastSummary === "string" ? parsed.lastSummary : DEFAULT_STATE.lastSummary,
  };
}

export async function writeState(filePath, state) {
  await ensureStateFile(filePath);

  const nextState = {
    note: typeof state.note === "string" ? state.note : DEFAULT_STATE.note,
    deck: Array.isArray(state.deck) ? state.deck.map(normalizeCard) : [],
    lastSavedAt: typeof state.lastSavedAt === "string" ? state.lastSavedAt : DEFAULT_STATE.lastSavedAt,
    lastSummary: typeof state.lastSummary === "string" ? state.lastSummary : DEFAULT_STATE.lastSummary,
  };

  await writeFile(filePath, JSON.stringify(nextState, null, 2));
  return nextState;
}

export function mergeDeck(existingDeck, incomingDeck) {
  const byId = new Map();

  for (const card of existingDeck.map(normalizeCard)) {
    byId.set(card.id, card);
  }

  for (const rawCard of incomingDeck) {
    const card = normalizeCard(rawCard);

    if (!card.sourceTerm || !card.spanishTerm) {
      continue;
    }

    const current = byId.get(card.id);

    if (!current) {
      byId.set(card.id, card);
      continue;
    }

    byId.set(card.id, {
      ...current,
      exampleSentence: current.exampleSentence || card.exampleSentence,
      notes: current.notes || card.notes,
    });
  }

  return Array.from(byId.values()).sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}
