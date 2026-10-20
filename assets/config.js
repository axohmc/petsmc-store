/* PetsMC store: the only file an owner edits. Products, prices, pictures and descriptions are NOT here: they come live
 * from Tebex (creator.tebex.io > Packages). No secrets in this file: the public token is public by design.
 * Based on Tebex's own Headless store theme (github.com/tebexio/Headless-Template, app.config.ts). */
window.PM_CONFIG = {
  storeName: 'PetsMC',
  /* Tebex PUBLIC token (creator.tebex.io > Integrations > Webstore / Developers > API Keys, "Public token").
   * Empty = the SAMPLE catalogue in demo.js (proposed packs and prices, nothing is sold). */
  tebexToken: '',
  /* Optional: the basket worker (../tebex-store/worker/basket-worker.js) when Tebex refuses a basket for a named
   * player without the private key. Empty = the page asks Tebex directly, as Tebex's theme does. */
  basketEndpoint: '',

  serverIp: 'play.petsmc.net',
  bedrock: 'Bedrock: petsmc.net, port 25576',
  discordUrl: '',                       // invite link; empty hides the button
  mainSiteUrl: '',                      // the home button; empty = top of the store
  avatarUrl: 'https://mc-heads.net/avatar/{name}/64',

  hero: { title: 'PetsMC Store', subtitle: 'Gems, ranks and the Pet Pass. Looks and comforts only: nothing here makes a pet stronger.' },
  /* Coming-soon gate. Not real security (the page is public), it only keeps a passer-by out until launch.
   * gateHash = SHA-256 of the password; '' turns the gate off. Current password: 123 (owner, 2026-10-20). */
  gateHash: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',

  /* Tebex.js checkout window (docs.tebex.io/developers/tebex.js) */
  tebexJsConfig: { theme: 'light', colors: [{ name: 'primary', color: '#ff4da9' }, { name: 'secondary', color: '#4ddc1e' }] },
  showCartOnAdd: true,
  confetti: true,

  /* A category's look, by its name (lower case, first match wins). colour = the Gem Shop colour of its header and
   * cards; art = the picture used when a Tebex package has no image of its own (img/<art>.png). */
  looks: [
    { match: 'gem',      colour: 'purple', art: ['pack_0', 'pack_1', 'pack_2', 'pack_3'], icon: 'card_gems' },
    { match: 'rank',     colour: 'blue',   art: ['rank_vip', 'rank_vip_plus', 'rank_mvp', 'rank_mvp_plus', 'rank_mvp_plus_plus'], icon: 'card_ranks' },
    { match: 'pass',     colour: 'gold',   art: ['card_pass'], icon: 'card_pass' },
    { match: 'club',     colour: 'pink',   art: ['card_club'], icon: 'card_club' },
    { match: 'cosmetic', colour: 'orange', art: ['card_cosmetics'], icon: 'card_cosmetics' },
    { match: 'egg',      colour: 'green',  art: ['card_egg'], icon: 'card_egg' },
    { match: '',         colour: 'steel',  art: ['card_gemchest'], icon: 'card_gemchest' }
  ],
  /* High-res icons (transparent PNG / WebP in assets/icons/) that replace the pixel art of the same name, for example
   * pack_0: 'gems-1000.png'. A name not listed keeps the pixel art. */
  icons: {},
  /* Footer links to the store's own pages once written (terms, privacy, refunds): {label, url} */
  links: []
};
