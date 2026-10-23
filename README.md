# Card layout prototype

A small React prototype for experimenting with CSS card layouts. Three participants start on stage. Add more from the strip at the bottom, then pin or remove cards to see how the stage rearranges them. Unavailable remote photos display an initials placeholder.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm start
```

Open the local URL printed by Vite. Run `npm run build` to check TypeScript and create a production build.

The active layout is in `src/layouts-position.scss`. Earlier grid and flex experiments remain in `src/layouts-grid.scss` and `src/layouts-flex.scss`.
