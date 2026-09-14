# Legal Transformation Partners

Standalone Vite and React website for Legal Transformation Partners.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Development

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:3000`.

## Service request email

Service requests are sent through FormSubmit's AJAX relay to
`legaltransformationpartners@gmail.com`. The first production submission
requires confirming the activation email sent by FormSubmit. To use another
relay, set `VITE_SERVICE_REQUEST_ENDPOINT` to its JSON POST endpoint before
building the site.

## Production build

```sh
npm run build
npm run preview
```
