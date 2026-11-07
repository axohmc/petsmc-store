# PetsMC store (store.petsmc.net)

**Since 2026-11-05 (T-1214, owner Axoh: "ok deploy to the live store") the store is the XraySMP-layout page**: logo over
the header bar, category tiles with the store renders and the menus' glyph patterns, Gems / Pet Pass / Pet Club pickers,
Bundles in three groups, the ranks table, login window and cart drawer, all white with rounded corners. Its source and
every round of the owner's notes: [docs/store-web/xraysmp-layout/](../../docs/store-web/xraysmp-layout/README.md).
**Do not edit `index.html` or `img/` here by hand**: edit the sample's `index.html` and run
`python docs/store-web/xraysmp-layout/build_live.py`, which writes them (a full page head, the coming-soon gate, the
SAMPLE strip, no art tools).

| File | What |
|---|---|
| `index.html` | The page (built by build_live.py): its CSS, its sample catalogue and its script are inside it |
| `img/` | Its pictures: the owner's logo and paw, the store renders (pixel look), the line icons, the favicons |
| `assets/` | **The old Tebex-theme site (T-0690), no longer loaded by the page.** Kept for its Tebex Headless calls (`store.js`) and config, which the new page does not have yet: once Tebex is linked, its checkout moves over |
| `CNAME`, `robots.txt`, `.nojekyll` | GitHub Pages: the custom domain, no indexing while the gate is on |

Since 2026-11-06 (T-1253) a pink limited-deal band sits above the header, the header has a Discord box and an online-now count, the home has a community goal bar (a Key All every $500, shown as a percent with no money on it, T-1279) and recent buyers' skins (both SAMPLE until the game posts to `FEED_URL`, T-1286: PetsCelebrations 1.4.0 to `https://petsmcpromo.com/api/store/feed`), and the footer is contact and copyright only. Before that (T-1251) the home got a limited-deal bar on top, a Top players board (sample data until the game exports `LB_URL`) instead of the welcome and How to buy, no white subtext on the tiles, and a slowly drifting background.

Not done yet: checkout (the page's cart is a sample; nothing can be bought, as before), the Discord invite, the Founder
pet hat icon and the link preview image.

The older note on the Tebex-theme site follows.

## The Tebex-theme site (T-0690, 2026-10-20 to 2026-11-05)

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
Publish a change: copy this folder over that repo's root and push `main` (all of `img/`, not only new files: T-1266 found the live `img/` missing everything added after round 1). DNS: Namecheap, `CNAME store -> axohmc.github.io`.

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
