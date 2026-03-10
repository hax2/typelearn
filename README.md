# TypeLearn

TypeLearn is a lightweight Spanish writing app for language learners.

You write mostly in Spanish. If you get stuck, drop in the English word or phrase you do not know yet. When you press `Ctrl+S` or `Cmd+S`, the app:

- rewrites the draft into natural Spanish
- fixes grammar and awkward phrasing
- extracts the English fallback terms you used
- adds those terms to a flashcard deck

## Local run

1. Create a `.env` file from `.env.example`.
2. Start the server:

```bash
npm start
```

3. Open `http://localhost:3000`.

You can either:

- set `GROQ_API_KEY` in `.env` and leave the UI key field empty
- paste your key into the UI key field (stored in your browser only)

The note and flashcards are stored in browser `localStorage`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, import `hax2/typelearn`.
3. Add environment variable `GROQ_API_KEY` in Vercel project settings (optional if you plan to paste key in UI).
4. Deploy.

After deploy:

- open your Vercel URL
- if no server key is configured, paste your Groq key in `Groq API key` and click `Save key`
- write text and press `Ctrl+S`
