# Store icon prompts (Higgsfield, Nano Banana)

High-res icons that replace the pixel art on store.petsmc.net. Generate 1:1, then save each as a transparent PNG
(512 px is plenty) in `assets/icons/` and list it in `icons` in `assets/config.js` under the art name in the first column.

**Shared style (house style since 2026-10-27, after minebox.co/store; owner: "nab the icon style from here")**, put before
every prompt, then "The item: ...":
Hand-painted 2D cartoon mobile game item icon, slightly isometric three-quarter view, clean coloured outlines in a darker
shade of each colour (no black lines), smooth cel shading with soft painted gradients, warm saturated colours, a few white
four-point sparkles. ... Isolated on a plain white background, no text, no drop shadow, no border.
Nano Banana 2.1, 1:1, 1k, thinking High. Gems are glossy faceted bright purple; containers carry a pink paw print (PetsMC).
Done in this style: Starter Pack, 1,000 / 2,500 / 5,000 / 13,500 Gems (`assets/icons/`, sources in `docs/store-web/icon-trial/minebox-style/`).

| Art name | Used for | Prompt (after the shared style) |
|---|---|---|
| `card_gemchest` | Starter Pack | a small wooden treasure chest with gold trim, lid slightly open, three purple gems peeking out, a pink ribbon bow on top |
| `pack_0` | 1,000 Gems | a small pile of three faceted purple gems |
| `pack_1` | 2,500 Gems | a bigger pile of seven faceted purple gems with a few sparkles |
| `pack_2` | 5,000 Gems | a bulging brown leather sack overflowing with faceted purple gems |
| `pack_3` | 13,500 Gems | a large open treasure chest overflowing with a mountain of faceted purple gems, golden sparkles around it |
| `card_gems` | Gems category | one big faceted purple gem, gleaming |
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

Colours follow STYLE_BIBLE.md: Gems purple, ranks by tier, the brand pink.

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
