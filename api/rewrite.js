export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  try {
    const body = await readJsonBody(request);
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const targetLanguage = normalizeTargetLanguage(body.targetLanguage);

    if (!text) {
      return response.status(400).json({ error: "Text is required." });
    }

    const apiKey = String(request.headers["x-groq-api-key"] || "").trim() || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return response.status(500).json({ error: "Missing API key. Set GROQ_API_KEY or send X-Groq-Api-Key." });
    }

    const rewrite = await rewriteDraft(text, apiKey, targetLanguage);
    return response.status(200).json(rewrite);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.expose ? error.message : "Internal server error.";
    console.error(error);
    return response.status(statusCode).json({ error: message });
  }
}

async function readJsonBody(request) {
  if (request.body && typeof request.body === "object") {
    return request.body;
  }

  return new Promise((resolve, reject) => {
    let raw = "";

    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(httpError(413, "Request body too large."));
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
            correctedText: { type: "string" },
            changeSummary: { type: "string" },
            cards: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  sourceTerm: { type: "string" },
                  spanishTerm: { type: "string" },
                  exampleSentence: { type: "string" },
                  notes: { type: "string" },
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
  const languageLabel = languageLabelFor(targetLanguage);

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
    String(payload.changeSummary || "").trim() || "Se corrigio el texto y se registraron terminos pendientes.";
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
  return ["spanish", "polish", "russian", "ukrainian"].includes(value) ? value : "spanish";
}

function languageLabelFor(targetLanguage) {
  const labels = {
    spanish: "Spanish",
    polish: "Polish",
    russian: "Russian",
    ukrainian: "Ukrainian",
  };

  return labels[targetLanguage] || "Spanish";
}

async function safeReadText(response) {
  try {
    return await response.text();
  } catch {
    return "";
  }
}
