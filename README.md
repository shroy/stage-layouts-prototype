# Animated card layout prototype

A small React prototype exploring how video-call cards can rearrange when participants join, leave, or get pinned. Three participants start on stage. Add more from the strip at the bottom, then pin or remove cards to see the transitions.

![Participant cards rearranging as people are added to and removed from the stage](assets/layout-demo.gif)

## The layout experiment

I tried [Flexbox](src/layouts-flex.scss) and [CSS Grid](src/layouts-grid.scss) versions first. They handled individual arrangements, but made it harder to animate cards freely between positions and support different stage flows. The active version uses [positioned cards](src/layouts-position.scss), giving me direct control over each card's size and coordinates. That made it easier to support different flows, animate between them, and tune performance.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm start
```

Open the local URL printed by Vite. Run `npm run build` to check TypeScript and create a production build.

Participant photos come from remote URLs; an initials placeholder appears if a photo is unavailable.
