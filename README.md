# Ten Till Dark
A playable first-person Western duel built with Three.js and React. Keyboard and mouse required.

- Tap W, then hold W: Aim.
- Tap W, then hold D: Quick Draw.
- Tap S, then hold S: Brace.
- Tap S, then hold A: Trick.
- Trace or steady the mouse guide; release the held key to commit.
- Q/E lean, C crouch, Escape pause. Hover chambers and tap R during the mid-duel reload.

## Run
`npm install` then `npm run dev`.

## Test and build
`node --experimental-strip-types --test tests/duel.test.mjs`
`npm run build`

See `docs/original-core.md`, `docs/design.md`, and `docs/art-prompts.md` for the source brief, implemented decisions and image-generation provenance. The game runs locally without an API key or backend game service. No multiplayer or saved progression is claimed.
