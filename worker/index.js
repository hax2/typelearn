export default {
  async fetch(request, env) {
    try {
      if (request.method === "OPTIONS") {
        return handleOptions(request, env);
      }

      const url = new URL(request.url);

      if (url.pathname !== "/api/rewrite" || request.method !== "POST") {
        return json({ error: "Not found." }, 404, request, env);
      }

      enforceOrigin(request, env);
      enforceSecret(request, env);

      const body = await readJsonBody(request);
      const text = typeof body.text === "string" ? body.text.trim() : "";

      if (!text) {
        return json({ error: "Text is required." }, 400, request, env);
      }

      if (!env.GROQ_API_KEY) {
        return json({ error: "Missing GROQ_API_KEY secret." }, 500, request, env);
      }

      const rewrite = await rewriteSpanishDraft(text, env.GROQ_API_KEY);
      return json(rewrite, 200, request, env);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const message = error.expose ? error.message : "Internal server error.";
      console.error(error);
      return json({ error: message }, statusCode, request, env);
    }
  },
};

function handleOptions(request, env) {
  enforceOrigin(request, env);

  return new Response(null, {
    status: 204,
    headers: buildCorsHeaders(request, env),
  });
}

function enforceOrigin(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigin = String(env.ALLOWED_ORIGIN || "").trim();

  if (!allowedOrigin) {
    throw httpError(500, "Missing ALLOWED_ORIGIN setting.");
  }

  if (origin !== allowedOrigin) {
    throw httpError(403, "Origin not allowed.");
  }
}

function enforceSecret(request, env) {
  const expectedSecret = String(env.APP_SECRET || "");
  const providedSecret = String(request.headers.get("X-Typelearn-Secret") || "");

  if (!expectedSecret) {
    throw httpError(500, "Missing APP_SECRET secret.");
  }

  if (providedSecret !== expectedSecret) {
    throw httpError(401, "Invalid access secret.");
  }
}

function buildCorsHeaders(request, env) {
  return {
    "Access-Control-Allow-Origin": String(env.ALLOWED_ORIGIN || request.headers.get("Origin") || ""),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Typelearn-Secret",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
    "Cache-Control": "no-store",
  };
}

function json(payload, status, request, env) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...buildCorsHeaders(request, env),
    },
  });
}

function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.expose = true;
  return error;
}

async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    throw httpError(400, "Invalid JSON body.");
  }
}

async function rewriteSpanishDraft(text, apiKey) {
  const strictAttempt = await requestGroqChat(apiKey, buildStrictRewritePayload(text));

  if (strictAttempt.ok) {
    return normalizeRewritePayload(parseGroqJsonContent(strictAttempt.result), text);
  }

  if (!isJsonValidationFailure(strictAttempt.details)) {
    throw httpError(
      502,
      `Groq request failed (${strictAttempt.status}): ${strictAttempt.details || "unknown error"}`,
    );
  }

  console.warn("Groq strict schema failed validation; falling back to JSON object mode.");

  const fallbackAttempt = await requestGroqChat(apiKey, buildFallbackRewritePayload(text));

  if (!fallbackAttempt.ok) {
    throw httpError(
      502,
      `Groq fallback request failed (${fallbackAttempt.status}): ${fallbackAttempt.details || "unknown error"}`,
    );
  }

  return normalizeRewritePayload(parseGroqJsonContent(fallbackAttempt.result), text);
}

function buildStrictRewritePayload(text) {
  return {
    model: "openai/gpt-oss-20b",
    temperature: 0.2,
    messages: buildRewriteMessages(text),
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "spanish_learning_revision",
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

function buildFallbackRewritePayload(text) {
  return {
    model: "openai/gpt-oss-20b",
    temperature: 0,
    messages: [
      ...buildRewriteMessages(text),
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

function buildRewriteMessages(text) {
  return [
    {
      role: "system",
      content:
        "You help Spanish learners write naturally. The user writes mostly in Spanish and sometimes leaves English words or short English phrases in the draft when they do not know the Spanish term. Rewrite the full draft in idiomatic Spanish while preserving meaning, tone, point of view, tense, formatting, and paragraph breaks. Only create flashcards for English fallback terms that appear in the original draft. Do not create cards for general grammar fixes. Keep cards concise and deduplicated.",
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
      createdAt: new Date().toISOString(),
    }))
    .filter((card) => card.sourceTerm && card.spanishTerm);

  return {
    correctedText,
    changeSummary,
    cards,
  };
}

function isJsonValidationFailure(details) {
  return typeof details === "string" && details.includes("json_validate_failed");
}

async function safeReadText(response) {
  try {
    return await response.text();
  } catch {
    return "";
  }
}
