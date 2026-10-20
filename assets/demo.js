/* The SAMPLE catalogue, in the shape Tebex's Headless API returns (GET /categories?includePackages=1).
 * Only used while config.js has no tebexToken; the page then shows the SAMPLE strip and nothing can be bought.
 * Amounts and prices are the PROPOSED ones from docs/design/monetization.md (not decided: the final balancing run). */
window.PM_DEMO = {
  webstore: { id: 1906958, name: 'PetsMC', currency: 'USD', platform_type: 'Minecraft (Offline/Geyser)' },
  categories: [
    { id: 1, name: 'Gems', description: '<p>Gems buy cosmetics and the Pet Pass. They never make a pet stronger.</p>',
      packages: [
        { id: 100, image: 'assets/img/card_gemchest.png', name: 'Starter Pack', base_price: 4.99, total_price: 4.99, currency: 'USD',
          description: '<p>500 Gems and the Founder pet hat. One per player.</p>' },
        { id: 101, image: 'assets/img/pack_0.png', name: '1,000 Gems', base_price: 9.99, total_price: 9.99, currency: 'USD', description: '<p>1,000 Gems, delivered in game the moment you pay.</p>' },
        { id: 102, image: 'assets/img/pack_1.png', name: '2,500 Gems', base_price: 19.99, total_price: 19.99, currency: 'USD', description: '<p>2,500 Gems, delivered in game the moment you pay.</p>' },
        { id: 103, image: 'assets/img/pack_2.png', name: '5,000 Gems', base_price: 34.99, total_price: 34.99, currency: 'USD', description: '<p>5,000 Gems, delivered in game the moment you pay.</p>' },
        { id: 104, image: 'assets/img/pack_3.png', name: '13,500 Gems', base_price: 79.99, total_price: 79.99, currency: 'USD', description: '<p>13,500 Gems, delivered in game the moment you pay.</p>' }
      ] },
    { id: 2, name: 'Ranks', description: '<p>A rank is kept forever. Moving up costs only the difference.</p>',
      packages: [
        { id: 201, image: 'assets/img/rank_vip.png', name: 'VIP', base_price: 4.99, total_price: 4.99, currency: 'USD', description: '<p>The VIP badge and a name colour.</p>' },
        { id: 202, image: 'assets/img/rank_vip_plus.png', name: 'VIP+', base_price: 9.99, total_price: 9.99, currency: 'USD', description: '<p>Everything in VIP, chat colours and /hat.</p>' },
        { id: 203, image: 'assets/img/rank_mvp.png', name: 'MVP', base_price: 19.99, total_price: 19.99, currency: 'USD', description: '<p>Everything in VIP+, more pet storage and Gems every month.</p>' },
        { id: 204, image: 'assets/img/rank_mvp_plus.png', name: 'MVP+', base_price: 34.99, total_price: 34.99, currency: 'USD', description: '<p>Everything in MVP and your own join message.</p>' },
        { id: 205, image: 'assets/img/rank_mvp_plus_plus.png', name: 'MVP++', base_price: 59.99, total_price: 59.99, currency: 'USD', description: '<p>Everything, and the most Gems every month.</p>' }
      ] },
    { id: 3, name: 'Pet Pass', description: '<p>Six weeks, 50 tiers. Tiers come from playing, never from paying.</p>',
      packages: [
        { id: 301, image: 'assets/img/card_pass.png', name: 'Pet Pass: Premium Track', base_price: 9.99, total_price: 9.99, currency: 'USD',
          description: '<p>Unlocks the premium rewards of this season: cosmetics, and 450 Gems back as you climb.</p>' }
      ] },
    { id: 4, name: 'Pet Club', description: '<p>Gems, a Club-only cosmetic and the Club badge, every month. Cancel any time.</p>',
      packages: [
        { id: 401, image: 'assets/img/card_club.png', name: 'Pet Club', type: 'subscription', base_price: 4.99, total_price: 4.99, currency: 'USD',
          description: '<p>600 Gems every month, one Club-only cosmetic a month, the Club badge and name colour.</p>' }
      ] }
  ]
};
