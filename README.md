# Game Dock

A static game launcher for three browser-based experiences.

## Games

- **Mario 64** — 3D Platformer — https://ghostship.net64.dev/
- **Animal Crossing** — Life Simulation — https://turtlekiosk.github.io/slider/
- **Scramjet** — Web Experience — https://scramjet.mercurywork.shop/

## Structure

- `index.html` — launcher homepage
- `game.html` — shared iframe play screen
- `app.js` — game metadata, routing, and subdomain-aware selection
- `styles.css` — responsive UI

Each game can be opened with a clean route such as:

- `game.html?game=mario64`
- `game.html?game=animal`
- `game.html?game=scramjet`

The app also recognizes subdomain-style hostnames such as `mario`, `animal`, and `scramjet` when the hosting/DNS setup points those hosts at this site.

## GitHub Pages

Enable GitHub Pages for the repository using the `main` branch and the repository root. No build step is required.

## Iframe note

The launcher does not control the security policies of the external sites. If an external site sends headers that prevent framing, that site may appear blank or refuse to load inside the iframe; in that case the **Open source ↗** button opens it directly.
