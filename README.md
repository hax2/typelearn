# TypeLearn

TypeLearn is now split into two pieces so it can run on GitHub Pages without exposing your Groq key:

- `docs/`: a static frontend for GitHub Pages
- `worker/`: a Cloudflare Worker that holds the Groq key and rewrites the text

The frontend stores your note, deck, and access settings in `localStorage` on the current device. Nothing is committed back to the repo.

## Local preview

This only previews the static frontend:

```bash
npm start
```

Open `http://127.0.0.1:3000`.

The preview server does not proxy Groq. In the UI, you still need to point the app at a deployed Worker URL.

## Deploy the Worker

1. Install and authenticate Wrangler.
2. In `worker/wrangler.jsonc`, keep `ALLOWED_ORIGIN` set to your live Pages origin. For this repo it is currently `https://www.samermakes.com`.
3. Deploy the Worker from the `worker/` directory.
4. Add the secrets on the Worker:

```bash
cd worker
wrangler secret put GROQ_API_KEY
wrangler secret put APP_SECRET
wrangler deploy
```

`APP_SECRET` is your own private access password for this app. It is separate from the Groq key. Enter it in the frontend once; it stays in your browser only.

## GitHub Pages

Serve the `docs/` directory from the `main` branch. The frontend assets use relative paths so the project site works at:

`https://www.samermakes.com/typelearn/`

Once the Worker is live:

1. Open the Pages site.
2. Paste the Worker URL into `Worker URL`.
3. Paste your `APP_SECRET` into `Access secret`.
4. Press `Fix + Save`.
