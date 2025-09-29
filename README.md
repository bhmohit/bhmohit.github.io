# bhmohit.github.io

React port of the original HTML/CSS/JS terminal-style homepage, built with Vite + React.

## What changed
- Vite + React project with hot reload and optimized builds.
- All interactive behavior (banner, help, color/theme commands, history navigation, fake caret, etc.) is implemented in `src/App.jsx`.
- Existing styles in `styles.css` are preserved and bundled by Vite.

## Commands supported
- `help`, `about`, `projects`, `banner`, `light`, `dark`, `clear`, and any CSS color value to change text color (e.g., `red`, `#ff0000`, `rgb(255,0,0)`).

## Develop locally
Run the Vite dev server with hot reload:

```bash
npm install
npm run dev
```

## Deploy
This repository is set up with a GitHub Actions workflow to build with Vite and deploy the `dist/` folder to GitHub Pages on pushes to `main`.
