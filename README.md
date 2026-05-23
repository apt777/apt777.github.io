# apt777.github.io

This repository has been reworked into a static personal workspace prototype.

## Local development

Run:

```bash
npm run dev
```

Then open:

- `http://127.0.0.1:4173/index.html`
- `http://127.0.0.1:4173/records.html`

## Current structure

- `index.html`: home dashboard
- `records.html`: records hub
- `record.html?space=...`: record space detail
- `js/site-data.js`: editable content data for categories and entries
- `js/site-app.js`: rendering logic
- `css/site.css`: redesign styles
- `docs/private-deployment.md`: private hosting notes

## Adding a new record space

Add one more object to the `recordSpaces` array in `js/site-data.js`.

Each space needs:

- `slug`
- `title`
- `shortLabel`
- `description`
- `cadence`
- `scope`
- `prompts`
- `entries`

## Security note

This is still a static site.

If you want the site to be accessible only to you, do not rely on client-side tricks. Put the final deployment behind a real authentication layer or a private network.
