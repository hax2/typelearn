# TypeLearn

TypeLearn is a lightweight Spanish writing app for language learners.

You write mostly in Spanish. If you get stuck, drop in the English word or phrase you do not know yet. When you press `Ctrl+S` or `Cmd+S`, the app:

- rewrites the draft into natural Spanish
- fixes grammar and awkward phrasing
- extracts the English fallback terms you used
- adds those terms to a flashcard deck

## Run it

1. Create a `.env` file from `.env.example` and set `GROQ_API_KEY`.
2. Start the server:

```bash
npm start
```

3. Open `http://localhost:3000`.

The app stores your latest note and flashcard deck in `data/app-state.json`.
