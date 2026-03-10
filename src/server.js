import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ensureStateFile, readState } from "./storage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const STATE_FILE = path.join(ROOT_DIR, "data", "app-state.json");

await loadEnvFile(path.join(ROOT_DIR, ".env"));
await ensureStateFile(STATE_FILE);
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    if (request.method === "GET" && url.pathname === "/api/state") {
      const state = await readState(STATE_FILE);
      return sendJson(response, 200, decorateState(state));
    }

    if (request.method === "POST" && url.pathname === "/api/rewrite") {
      const body = await readJsonBody(request);
      const text = typeof body.text === "string" ? body.text.trim() : "";
      const targetLanguage = normalizeTargetLanguage(body.targetLanguage);

      if (!text) {
        return sendJson(response, 400, { error: "Text is required." });
      }

      const apiKey = String(request.headers["x-groq-api-key"] || "").trim() || process.env.GROQ_API_KEY;

      if (!apiKey) {
        return sendJson(response, 500, {
          error: "Missing API key. Set GROQ_API_KEY or send X-Groq-Api-Key.",
        });
      }

      const rewrite = await rewriteDraft(text, apiKey, targetLanguage);
      return sendJson(response, 200, {
        correctedText: rewrite.correctedText,
        changeSummary: rewrite.changeSummary,
        cards: rewrite.cards,
      });
    }

    if (request.method === "GET") {
      return serveStaticAsset(url.pathname, response);
    }

    return sendJson(response, 404, { error: "Not found." });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.expose ? error.message : "Internal server error.";
    console.error(error);
    return sendJson(response, statusCode, { error: message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`TypeLearn running at http://${HOST}:${PORT}`);
});

async function loadEnvFile(filePath) {
  try {
    const contents = await readFile(filePath, "utf8");

    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Failed to load .env:", error);
    }
  }
}

async function serveStaticAsset(requestPath, response) {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.normalize(path.join(PUBLIC_DIR, normalizedPath));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    return sendJson(response, 403, { error: "Forbidden." });
  }

  try {
    const contents = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypeFor(filePath),
      "Cache-Control": "no-store",
    });
    response.end(contents);
  } catch (error) {
    if (error.code === "ENOENT") {
      return sendJson(response, 404, { error: "Not found." });
    }

    throw error;
  }
}

function contentTypeFor(filePath) {
  if (filePath.endsWith(".html")) {
    return "text/html; charset=utf-8";
  }

  if (filePath.endsWith(".css")) {
    return "text/css; charset=utf-8";
  }

  if (filePath.endsWith(".js")) {
    return "application/javascript; charset=utf-8";
  }

  if (filePath.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }

  return "text/plain; charset=utf-8";
}

function decorateState(state) {
  return {
    note: state.note,
    deck: state.deck,
    lastSavedAt: state.lastSavedAt,
    lastSummary: state.lastSummary,
    stats: {
      totalCards: state.deck.length,
    },
  };
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let raw = "";

    request.on("data", (chunk) => {
      raw += chunk;

      if (raw.length > 1_000_000) {
        reject(httpError(413, "Request body too large."));
        request.destroy();
      }
    });

    request.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(httpError(400, "Invalid JSON body."));
      }
    });

    request.on("error", reject);
  });
}

function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.expose = true;
  return error;
}

async function rewriteDraft(text, apiKey, targetLanguage) {
  const strictAttempt = await requestGroqChat(apiKey, buildStrictRewritePayload(text, targetLanguage));

  if (strictAttempt.ok) {
    const parsed = normalizeRewritePayload(parseGroqJsonContent(strictAttempt.result), text);
    return finalizeRewritePayload(parsed);
  }

  if (!isJsonValidationFailure(strictAttempt.details)) {
    throw httpError(
      502,
      `Groq request failed (${strictAttempt.status}): ${strictAttempt.details || "unknown error"}`,
    );
  }

  console.warn("Groq strict schema failed validation; falling back to JSON object mode.");

  const fallbackAttempt = await requestGroqChat(apiKey, buildFallbackRewritePayload(text, targetLanguage));

  if (!fallbackAttempt.ok) {
    throw httpError(
      502,
      `Groq fallback request failed (${fallbackAttempt.status}): ${fallbackAttempt.details || "unknown error"}`,
    );
  }

  const parsed = normalizeRewritePayload(parseGroqJsonContent(fallbackAttempt.result), text);
  return finalizeRewritePayload(parsed);
}

async function safeReadText(response) {
  try {
    return await response.text();
  } catch {
    return "";
  }
}

function buildStrictRewritePayload(text, targetLanguage) {
  return {
    model: "openai/gpt-oss-20b",
    temperature: 0.2,
    messages: buildRewriteMessages(text, targetLanguage),
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "language_learning_revision",
        strict: true,
        schema: {
          type: "object",
          properties: {
            correctedText: {
              type: "string",
            },
            changeSummary: {
              type: "string",
            },
            cards: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  sourceTerm: {
                    type: "string",
                  },
                  spanishTerm: {
                    type: "string",
                  },
                  exampleSentence: {
                    type: "string",
                  },
                  notes: {
                    type: "string",
                  },
                },
                required: ["sourceTerm", "spanishTerm", "exampleSentence", "notes"],
                additionalProperties: false,
              },
            },
          },
          required: ["correctedText", "changeSummary", "cards"],
          additionalProperties: false,
        },
      },
    },
  };
}

function buildFallbackRewritePayload(text, targetLanguage) {
  return {
    model: "openai/gpt-oss-20b",
    temperature: 0,
    messages: [
      ...buildRewriteMessages(text, targetLanguage),
      {
        role: "system",
        content:
          "Return only a valid JSON object with this exact shape: {\"correctedText\":\"string\",\"changeSummary\":\"string\",\"cards\":[{\"sourceTerm\":\"string\",\"spanishTerm\":\"string\",\"exampleSentence\":\"string\",\"notes\":\"string\"}]}. Always include all keys. Use [] when there are no cards. Do not wrap the JSON in markdown.",
      },
    ],
    response_format: {
      type: "json_object",
    },
  };
}

function buildRewriteMessages(text, targetLanguage) {
  const languageLabel = targetLanguage === "polish" ? "Polish" : "Spanish";

  return [
    {
      role: "system",
      content:
        `You help ${languageLabel} learners write naturally. The user writes mostly in ${languageLabel} and sometimes leaves English words or short English phrases in the draft when they do not know the ${languageLabel} term. Rewrite the full draft in idiomatic ${languageLabel} while preserving meaning, tone, point of view, tense, formatting, and paragraph breaks. Only create flashcards for English fallback terms that appear in the original draft. Do not create cards for general grammar fixes. Keep cards concise and deduplicated. Use the output key named "spanishTerm" for the translated term even when the target language is not Spanish.`,
    },
    {
      role: "user",
      content: text,
    },
  ];
}

async function requestGroqChat(apiKey, payload) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      details: await safeReadText(response),
    };
  }

  return {
    ok: true,
    status: response.status,
    result: await response.json(),
  };
}

function parseGroqJsonContent(result) {
  const content = result?.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    throw httpError(502, "Groq returned an unexpected response.");
  }

  try {
    return JSON.parse(content);
  } catch {
    throw httpError(502, "Groq returned invalid JSON.");
  }
}

function normalizeRewritePayload(payload, originalText) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw httpError(502, "Groq returned an invalid payload shape.");
  }

  const correctedText = String(payload.correctedText || "").trim() || originalText;
  const changeSummary =
    String(payload.changeSummary || "").trim() || "Se corrigió el texto y se registraron términos pendientes.";
  const rawCards = Array.isArray(payload.cards) ? payload.cards : [];

  const cards = rawCards
    .map((card) => ({
      sourceTerm: String(card?.sourceTerm || "").trim(),
      spanishTerm: String(card?.spanishTerm || "").trim(),
      exampleSentence: String(card?.exampleSentence || "").trim(),
      notes: String(card?.notes || "").trim(),
    }))
    .filter((card) => card.sourceTerm && card.spanishTerm);

  return {
    correctedText,
    changeSummary,
    cards,
  };
}

function finalizeRewritePayload(payload) {
  const timestamp = new Date().toISOString();

  return {
    correctedText: payload.correctedText,
    changeSummary: payload.changeSummary,
    cards: payload.cards.map((card) => ({
      ...card,
      id: `${card.sourceTerm.toLowerCase()}::${card.spanishTerm.toLowerCase()}`,
      createdAt: timestamp,
    })),
  };
}

function isJsonValidationFailure(details) {
  return typeof details === "string" && details.includes("json_validate_failed");
}

function normalizeTargetLanguage(value) {
  return value === "polish" ? "polish" : "spanish";
}
