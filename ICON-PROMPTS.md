# Store icon prompts (Higgsfield, Nano Banana)

High-res icons that replace the pixel art on store.petsmc.net. Generate 1:1, then save each as a transparent PNG
(512 px is plenty) in `assets/icons/` and list it in `icons` in `assets/config.js` under the art name in the first column.

**House style (owner, 2026-10-27): low-poly pink gems.** Flat hard facets, bright magenta, a bold dark outline, no soft
painted shading. The owner's own reference picture (a "6 GEM PACK" sheet, the top pink row) is attached in the Higgsfield
prompt box as the ONLY reference; the picture itself is not in the repo. Keep prompts to one short line: the owner found
long style prompts make the icons look AI-made. Pattern:
`Same style as the top row of the reference. <the item>. White background.`
Nano Banana 2.1, 1:1, 1k, thinking High. Cut out the white afterwards (flood fill from the corners), 512 px PNG, 320 px WebP.
Done in this style: Starter Pack, 1,000 / 2,500 / 5,000 / 13,500 Gems (`assets/icons/`, cut-outs in
`docs/store-web/icon-trial/r5-lowpoly-pink/`). The owner: "good enough". 1,000 Gems matches the reference best; the
others have many small gems. Next time, ask for a few big gems, and add `gems-1000` as a second reference.
Rejected earlier: the five-style trial below, then Minebox-style painted icons (too detailed), plain outlined (dull).

| Art name | Used for | Item (in the pattern above) |
|---|---|---|
| `card_gemchest` | Starter Pack | A pink gift box with pink gems |
| `pack_0` | 1,000 Gems | Three pink gems |
| `pack_1` | 2,500 Gems | A pile of pink gems |
| `pack_2` | 5,000 Gems | A bag of pink gems |
| `pack_3` | 13,500 Gems | A treasure chest overflowing with pink gems |
| `card_gems` | Gems category | one big faceted pink gem |
| `rank_vip` | VIP | a grey-silver shield badge with one small star |
| `rank_vip_plus` | VIP+ | a cyan shield badge with one star and a small plus sign shape |
| `rank_mvp` | MVP | a green shield badge with two stars and laurel leaves |
| `rank_mvp_plus` | MVP+ | a purple shield badge with three stars and laurel leaves |
| `rank_mvp_plus_plus` | MVP++ | an orange-gold shield badge with a small crown on top, three stars and laurel leaves |
| `card_ranks` | Ranks category | a golden crown with pink and blue jewels |
| `card_pass` | Pet Pass | a red and gold admission ticket with a gold star in the middle and a paw print stamp |
| `card_club` | Pet Club | a big pink paw print badge with a gold rim and a tiny crown |
| `card_cosmetics` | Cosmetics (later) | a pink top hat with a bow, for a pet |
| `card_egg` | Eggs (later) | a spotted pet egg, cream with pink spots, glowing softly |

Colours: the gem packs are pink (the owner's reference); ranks by tier as in STYLE_BIBLE.md.

## Style trial (owner 2026-10-27): one icon, five styles

Owner: "make some style versions ... similar server stores like colorgens, i want icons to look the same and cartoony
like that. Make 5 icons of the same icon in different styles". Reference: store.colorgens.com (chunky 3D Minecraft-block
renders on bold flat colour cards). Test icon: **2,500 Gems** (`pack_1`). Nano Banana 2.1, 1:1, 1k, plain white background
(cut out afterwards). The owner picks one; that style then replaces the shared style above for every icon.

| # | Style | Prompt |
|---|---|---|
| A | ColorGens voxel | A pile of seven chunky faceted purple gems built from Minecraft-style voxel blocks, isometric 3D render, crisp cube edges, bright saturated purple with lighter top faces and darker side faces, soft studio lighting, a few small sparkle pixels, game store icon, centred, plain white background, no text |
| B | Glossy mobile-game 3D | A pile of seven big rounded cartoon purple gems, glossy candy-like 3D render, smooth bevelled facets, strong white specular highlights, soft rim light, playful mobile game shop icon in the style of Clash Royale and Brawl Stars, centred, plain white background, no text |
| C | Bold cartoon sticker | A pile of seven chunky cartoon purple gems, flat cel shading in three tones, thick dark purple outline around every gem, a white shine stroke on each, sticker-like cartoon game icon, centred, plain white background, no text |
| D | Soft clay toy | A pile of seven chunky purple gems that look like soft matte clay or vinyl toy pieces, rounded edges, pastel lilac and violet, gentle soft shadows, cute cosy cartoon style like Animal Crossing, centred, plain white background, no text |
| E | HD Minecraft item | A pile of seven purple gems as a high-resolution Minecraft-style item: chunky 3D blocks with a fine pixel-art texture on every face, Minecraft lighting with a bright top and darker sides, slight bloom, in the style of a premium Minecraft server store render, centred, plain white background, no text |
