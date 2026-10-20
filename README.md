# PetsMC store (store.petsmc.net)

The PetsMC web store, built on **Tebex's own Headless store theme** ([tebexio/Headless-Template](https://github.com/tebexio/Headless-Template),
MIT, see `LICENSE-tebex-template.txt`) and restyled in the PetsMC Gem Shop look. Tebex's theme is a Nuxt app; this is the
same layout and the same Tebex calls ported to plain HTML, CSS and one script, so it is static files only and runs on any
static host. Board task T-0690 (owner Axoh, 2026-10-20).

| File | What |
|---|---|
| `index.html` | The page: the password gate, header (home, categories, play, logo, login, cart), hero, footer with Tebex's strip and the Mojang notice |
| `assets/config.js` | **The only file an owner edits**: Tebex public token, server IP, Discord, the gate password hash, each category's colour and fallback picture |
| `assets/store.js` | Tebex Headless API: webstore, categories, username login (creates the basket), add / gift / remove, Tebex.js checkout window |
| `assets/store.css` | Tebex's layout in the PetsMC style (STYLE_BIBLE.md: flat faces, one darker edge, square corners, colours by meaning) |
| `assets/demo.js` | The SAMPLE catalogue shown while `tebexToken` is empty (proposed packs and prices, nothing can be bought) |
| `assets/img/` | PetsMC art (logo, Gem packs, rank badges, category pictures), copied from `web/tebex-store/site/assets/art/` |
| `CNAME`, `robots.txt`, `.nojekyll` | GitHub Pages: the custom domain, no indexing while the gate is on |

## Where it runs

GitHub Pages from the public repo **axohmc/petsmc-store** (only the contents of this folder; this repo stays the source).
Publish a change: copy this folder over that repo's root and push `main`. DNS: Namecheap, `CNAME store -> axohmc.github.io`.

## The password gate

`gateHash` in config.js is the SHA-256 of the password (now `123`, the owner's choice, to keep passers-by out until launch).
It is **not** security: the files are public, anyone who reads them can skip it. Launch = set `gateHash: ''`, remove the
`robots` meta line from index.html and `robots.txt`, push.

## Going live (owner, in the Tebex panel)

1. creator.tebex.io: create the categories and packages (Gems, Ranks, Pet Pass, Pet Club, ...) with their commands and
   pictures; publish the webstore.
2. Copy the **public token** into `tebexToken` in config.js. The sample strip disappears and the real catalogue loads.
3. Tebex panel > Webstore settings: allow `https://store.petsmc.net` as the Headless site / return URL if Tebex asks.
4. If logging in says Tebex needs the private key for a named player, deploy `../tebex-store/worker/basket-worker.js`
   and put its URL in `basketEndpoint` (the private key never goes in this folder).
5. Test Mode: buy each pack once, check it arrives, switch Test Mode off.
