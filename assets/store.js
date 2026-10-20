/* PetsMC store: Tebex's Headless store theme (github.com/tebexio/Headless-Template, MIT, Nuxt + Pinia) ported to
 * one plain script so the site is static files only. Same flow as the theme: read the webstore and its categories,
 * log in with a Minecraft name (that creates the basket), add / gift / remove packages, checkout in Tebex.js's window.
 * With no tebexToken in config.js it runs on the SAMPLE catalogue (demo.js) and nothing reaches Tebex. */
(function () {
  'use strict';
  var C = window.PM_CONFIG || {};
  var DEMO = !C.tebexToken;
  var API = 'https://headless.tebex.io/api';
  var NAME_OK = /^\.?[A-Za-z0-9_]{3,16}$/;
  var $ = function (id) { return document.getElementById(id); };
  var S = { webstore: null, categories: [], packages: {}, basket: null, user: read('pm.user'), pending: null };

  /* ------------------------------------------------ small helpers */
  function read(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function write(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }
  function money(n) {
    try { return new Intl.NumberFormat('en-US', { style: 'currency', currency: (S.webstore && S.webstore.currency) || 'USD' }).format(n || 0); }
    catch (e) { return '$' + Number(n || 0).toFixed(2); }
  }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function look(cat) {
    var n = String(cat.name).toLowerCase();
    return (C.looks || []).filter(function (l) { return n.indexOf(l.match) >= 0; })[0] || { colour: 'steel', art: ['card_gemchest'], icon: 'card_gemchest' };
  }
  function art(name) { return 'assets/img/' + name + '.png'; }
  function pkgImage(p) { return p.image || art(p._look.art[Math.min(p._index, p._look.art.length - 1)]); }
  function imgTag(src, alt) {
    var px = src.indexOf('assets/img/') === 0;
    return '<img' + (px ? ' class="px"' : '') + ' src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy">';
  }
  function price(p) {
    var base = Number(p.base_price || 0), off = Number(p.discount || 0);
    var sub = p.type === 'subscription' ? '<span class="pkg__sub">/ month</span>' : '';
    return '<div class="pkg__price"><span class="lab lab--ink c-gold s4">' + money(base - off) + '</span>' +
      (off > 0 ? '<span class="pkg__was">' + money(base) + '</span>' : '') + sub + '</div>';
  }
  function avatar(name) { return name && C.avatarUrl ? C.avatarUrl.replace('{name}', encodeURIComponent(name.replace(/^\./, ''))) : 'assets/img/icon.png'; }
  var ICON_GIFT = '<svg viewBox="0 0 24 24"><path d="M20 7h-2.2A3 3 0 0 0 12 3.5 3 3 0 0 0 6.2 7H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM15 5a1 1 0 1 1 0 2h-2a2 2 0 0 1 2-2zM9 5a2 2 0 0 1 2 2H9a1 1 0 1 1 0-2zm2 15H7v-8h4v8zm0-10H5V9h6v1zm6 10h-4v-8h4v8zm2-10h-6V9h6v1z"/></svg>';
  var ICON_X = '<svg viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';

  /* ------------------------------------------------ the gate (config.js gateHash = SHA-256 of the password) */
  function sha256(text) {
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (b) {
        return Array.prototype.map.call(new Uint8Array(b), function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
      });
    }
    return Promise.resolve(sha256js(text));
  }
  function sha256js(ascii) { // plain-http fallback (crypto.subtle needs https)
    function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
    var words = [], len = ascii.length * 8, h = [], k = [], i, j, isP = {}, n = 2;
    for (var c = 0; c < 64; n++) { if (!isP[n]) { for (i = 0; i < 313; i += n) isP[i] = n; h[c] = (Math.pow(n, .5) * 4294967296) | 0; k[c++] = (Math.pow(n, 1 / 3) * 4294967296) | 0; } }
    h = h.slice(0, 8); ascii = unescape(encodeURIComponent(ascii)); len = ascii.length * 8; ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii.length; i++) words[i >> 2] |= ascii.charCodeAt(i) << ((3 - i) % 4) * 8;
    words[words.length] = (len / 4294967296) | 0; words[words.length] = len;
    for (j = 0; j < words.length;) {
      var w = words.slice(j, j += 16), old = h.slice(0);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2], a = h[0], e = h[4];
        var t1 = h[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & h[5]) ^ (~e & h[6])) + k[i] +
          (w[i] = i < 16 ? w[i] : (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0);
        var t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & h[1]) ^ (a & h[2]) ^ (h[1] & h[2]));
        h = [(t1 + t2) | 0].concat(h); h[4] = (h[4] + t1) | 0; h.length = 8;
      }
      for (i = 0; i < 8; i++) h[i] = (h[i] + old[i]) | 0;
    }
    return h.map(function (v) { return ('00000000' + (v >>> 0).toString(16)).slice(-8); }).join('');
  }
  function gate() {
    if (!C.gateHash || read('pm.gate') === C.gateHash) return Promise.resolve();
    $('gate').hidden = false;
    setTimeout(function () { $('gatePass').focus(); }, 50);
    return new Promise(function (resolve) {
      $('gateForm').addEventListener('submit', function (ev) {
        ev.preventDefault();
        sha256($('gatePass').value.trim()).then(function (hex) {
          if (hex === C.gateHash) { write('pm.gate', hex); $('gate').hidden = true; resolve(); return; }
          $('gateErr').hidden = false; $('gate').classList.remove('shake'); void $('gate').offsetWidth; $('gate').classList.add('shake');
          $('gatePass').select();
        });
      });
    });
  }

  /* ------------------------------------------------ Tebex Headless API (the theme's services/*.ts) */
  function call(url, method, body) {
    return fetch(url, {
      method: method || 'GET',
      headers: body ? { 'Content-Type': 'application/json', Accept: 'application/json' } : { Accept: 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok || j.status === 'error' || j.error) throw new Error(j.detail || j.title || j.message || 'The store did not answer. Try again.');
        return j.data !== undefined ? j.data : j;
      });
    });
  }
  function acct(path) { return API + '/accounts/' + C.tebexToken + path; }
  function bsk(path) { return API + '/baskets/' + S.basket.ident + path; }
  function here() { return location.href.split('#')[0]; }

  function loadStore() {
    if (DEMO) return Promise.resolve([window.PM_DEMO.webstore, JSON.parse(JSON.stringify(window.PM_DEMO.categories))]);
    var q = '/categories?includePackages=1' + (S.basket ? '&basketIdent=' + encodeURIComponent(S.basket.ident) : '');
    return Promise.all([call(acct('')), call(acct(q))]);
  }
  function createBasket(username) {
    if (DEMO) return Promise.resolve({ ident: 'sample', username: username, packages: [], total_price: 0 });
    var body = { username: username, complete_url: here() + '#/thanks', cancel_url: here(), complete_auto_redirect: true };
    if (C.basketEndpoint) return call(C.basketEndpoint, 'POST', body).then(function (j) { return call(acct('/baskets/' + j.ident)); });
    return call(acct('/baskets'), 'POST', body);
  }
  function refreshBasket() {
    var id = read('pm.basket');
    if (DEMO) { S.basket = id && read('pm.sampleBasket'); return Promise.resolve(); }
    if (!id) return Promise.resolve();
    return call(acct('/baskets/' + id)).then(function (b) {
      if (b.complete) { logout(true); return; }
      S.basket = b;
    }, function (e) {
      if (/not found/i.test(e.message)) { S.basket = null; write('pm.basket', null); }
    });
  }
  function saveBasket(b) {
    S.basket = b; write('pm.basket', b ? b.ident : null);
    if (DEMO) write('pm.sampleBasket', b);
    paintCart();
  }
  function demoAdd(p, qty, giftTo) {
    var b = S.basket, line = b.packages.filter(function (x) { return x.id === p.id; })[0];
    if (line) line.in_basket.quantity += qty;
    else b.packages.push({ id: p.id, name: p.name, image: pkgImage(p), in_basket: { quantity: qty, price: p.base_price - (p.discount || 0), gift_username: giftTo || null } });
    b.total_price = b.packages.reduce(function (t, x) { return t + x.in_basket.price * x.in_basket.quantity; }, 0);
    return Promise.resolve(b);
  }

  /* ------------------------------------------------ actions (the theme's stores/basket.ts and stores/auth.ts) */
  function login(name) {
    name = String(name || '').trim();
    if (!NAME_OK.test(name)) return Promise.reject(new Error('Type your name exactly as it shows in game.'));
    return createBasket(name).then(function (b) {
      S.user = { username: name }; write('pm.user', S.user);
      saveBasket(b); paintUser();
      var next = S.pending; S.pending = null;
      if (next) return next();
    });
  }
  function logout(silent) {
    S.user = null; write('pm.user', null); saveBasket(null); paintUser();
    if (!silent) toast('pink', 'Logged out', 'Your cart was cleared.');
  }
  function needLogin(then) {
    if (S.user && S.basket) return then();
    S.pending = then; openLogin();
    return Promise.resolve();
  }
  function addToCart(id, qty) {
    var p = S.packages[id];
    return needLogin(function () {
      var job = DEMO ? demoAdd(p, qty || 1) : call(bsk('/packages'), 'POST', { package_id: String(id), quantity: qty || 1 });
      return job.then(function (b) {
        saveBasket(b);
        toast('green', 'Added to cart', p.name);
        if (C.showCartOnAdd) openSide('cartSide');
      });
    });
  }
  function giftTo(id, name) {
    var p = S.packages[id];
    name = String(name || '').trim();
    if (!NAME_OK.test(name)) return Promise.reject(new Error('Type their name exactly as it shows in game.'));
    return needLogin(function () {
      var job = DEMO ? demoAdd(p, 1, name) : lookup(name).then(function (uid) {
        return call(bsk('/packages'), 'POST', { package_id: String(id), target_username_id: uid });
      });
      return job.then(function (b) {
        saveBasket(b); closeModal();
        toast('green', 'Gift added', p.name + ' for ' + name);
        if (C.showCartOnAdd) openSide('cartSide');
      });
    });
  }
  function lookup(name) { // a Java name to its UUID; a Bedrock (.name) gift goes by name, Tebex resolves it
    if (name.charAt(0) === '.') return Promise.resolve(name);
    return fetch('https://playerdb.co/api/player/minecraft/' + encodeURIComponent(name)).then(function (r) { return r.json(); })
      .then(function (j) { if (!j.success) throw new Error('No Minecraft player is called ' + name + '.'); return j.data.player.id; });
  }
  function removeFromCart(id) {
    if (DEMO) {
      var b = S.basket; b.packages = b.packages.filter(function (x) { return x.id !== id; });
      b.total_price = b.packages.reduce(function (t, x) { return t + x.in_basket.price * x.in_basket.quantity; }, 0);
      saveBasket(b); return Promise.resolve();
    }
    return call(bsk('/packages/remove'), 'POST', { package_id: id }).then(saveBasket);
  }
  function checkout() {
    if (!S.basket || !S.basket.packages.length) return;
    closeAll();
    if (DEMO) { toast('pink', 'Sample store', 'Checkout opens here once the store is live.'); return; }
    loadTebexJs().then(function () {
      var cfg = Object.assign({}, C.tebexJsConfig || {}, { ident: S.basket.ident });
      window.Tebex.checkout.init(cfg);
      window.Tebex.checkout.launch();
    }, function () { location.href = S.basket.links && S.basket.links.checkout || here(); });
  }
  var tebexJs;
  function loadTebexJs() {
    if (tebexJs) return tebexJs;
    tebexJs = new Promise(function (ok, fail) {
      var s = document.createElement('script');
      s.src = 'https://js.tebex.io/v/1.0.0.js'; s.async = true;
      s.onload = function () {
        window.Tebex.checkout.on('payment_complete', function () {
          toast('green', 'Thank you!', 'Your purchase arrives in game within a minute.');
          if (C.confetti) confetti();
          logout(true);
        });
        window.Tebex.checkout.on('close', function () { refreshBasket().then(paintCart); });
        ok();
      };
      s.onerror = fail;
      document.head.appendChild(s);
    });
    return tebexJs;
  }

  /* ------------------------------------------------ painting */
  function render(webstore, categories) {
    S.webstore = webstore;
    S.categories = (categories || []).filter(function (c) { return c.packages && c.packages.length; });
    S.categories.forEach(function (c) {
      c._look = look(c);
      c.packages.forEach(function (p, i) { p._look = c._look; p._index = i; S.packages[p.id] = p; });
    });
    $('cats').innerHTML = S.categories.length > 3 ? S.categories.map(function (c) {
      return '<a class="cat c-' + c._look.colour + '" href="#cat-' + slug(c.name) + '">' + imgTag(art(c._look.icon), '') +
        '<span class="lab lab--ink s3">' + esc(c.name) + '</span></a>';
    }).join('') : '';
    $('menuList').innerHTML = S.categories.map(function (c) {
      return '<a class="c-' + c._look.colour + '" href="#cat-' + slug(c.name) + '" data-close>' + imgTag(art(c._look.icon), '') +
        '<span class="lab lab--ink s3">' + esc(c.name) + '</span></a>';
    }).join('');
    $('sections').innerHTML = S.categories.length ? S.categories.map(function (c) {
      var single = c.packages.length === 1;
      return '<section class="category c-' + c._look.colour + '" id="cat-' + slug(c.name) + '">' +
        '<div class="hcard">' + imgTag(art(c._look.icon), '') + '<h2 class="lab lab--btn s4">' + esc(c.name) + '</h2>' +
        (c.description ? '<div class="hcard__desc">' + c.description + '</div>' : '') + '</div>' +
        '<div class="grid">' + c.packages.map(function (p) { return card(p, single); }).join('') + '</div></section>';
    }).join('') : '<div class="empty">The store is being stocked. Check back soon!</div>';
  }
  function card(p, row) {
    return '<article class="pkg' + (row ? ' pkg--row' : '') + '">' +
      '<div class="pkg__img" data-open="' + p.id + '">' + imgTag(pkgImage(p), p.name) + '</div>' +
      '<div class="pkg__meta" data-open="' + p.id + '"><span class="pkg__name">' + esc(p.name) + '</span>' + price(p) +
      (row && p.description ? '<div class="pkg__desc">' + p.description + '</div>' : '') + '</div>' +
      '<div class="pkg__actions">' +
      '<button class="btn btn--s c-green" type="button" data-add="' + p.id + '"><span class="lab lab--btn s2">Add to cart</span></button>' +
      (p.disable_gifting ? '' : '<button class="btn btn--s btn--sq c-pink gift" type="button" data-gift="' + p.id + '" aria-label="Gift ' + esc(p.name) + '">' + ICON_GIFT + '</button>') +
      '</div></article>';
  }
  function paintUser() {
    var u = S.user;
    $('loginLabel').textContent = u ? u.username : 'Login';
    var img = $('loginAvatar');
    img.onerror = function () { img.onerror = null; img.src = 'assets/img/icon.png'; };
    img.src = u ? avatar(u.username) : 'assets/img/icon.png';
  }
  function paintCart() {
    var b = S.basket, items = (b && b.packages) || [];
    $('cartCount').textContent = items.length;
    $('cartList').innerHTML = items.length ? items.map(function (x) {
      var ib = x.in_basket || {};
      return '<div class="citem"><div class="citem__img">' + imgTag(x.image || (S.packages[x.id] ? pkgImage(S.packages[x.id]) : 'assets/img/icon.png'), '') + '</div>' +
        '<div class="citem__body"><div class="citem__name">' + esc(x.name) + '</div><div class="lab lab--ink c-gold s2">' + money(ib.price) + '</div>' +
        (ib.gift_username ? '<div class="citem__gift">Gift for ' + esc(ib.gift_username) + '</div>' : '') + '</div>' +
        '<span class="citem__qty">x' + (ib.quantity || 1) + '</span>' +
        '<button class="ibtn citem__x" type="button" data-remove="' + x.id + '" aria-label="Remove ' + esc(x.name) + '">' + ICON_X + '</button></div>';
    }).join('') : '<div class="cart__empty"><img class="px" src="assets/img/pet_cat.png" alt="">Your cart is empty.</div>';
    $('cartTotal').hidden = !items.length;
    $('cartTotalVal').textContent = money(b && b.total_price);
    $('checkoutBtn').disabled = !items.length;
  }

  /* ------------------------------------------------ windows: sidebars, modal, toasts */
  function openSide(id) { closeModal(); ['menuSide', 'cartSide'].forEach(function (s) { setSide(s, s === id); }); $('overlay').hidden = false; document.body.classList.add('locked'); }
  function setSide(id, on) { $(id).classList.toggle('is-open', on); $(id).setAttribute('aria-hidden', on ? 'false' : 'true'); }
  function closeAll() { setSide('menuSide', false); setSide('cartSide', false); $('overlay').hidden = true; closeModal(); document.body.classList.remove('locked'); }
  function openModal(html, wide) {
    setSide('menuSide', false); setSide('cartSide', false); $('overlay').hidden = true;
    $('modalBody').innerHTML = html; $('modalCard').classList.toggle('modal__card--wide', !!wide);
    $('modal').hidden = false; document.body.classList.add('locked');
    var f = $('modalBody').querySelector('input'); if (f) setTimeout(function () { f.focus(); }, 30);
  }
  function closeModal() {
    if ($('modal').hidden) return;
    $('modal').hidden = true; document.body.classList.remove('locked');
    if (/^#\/package\//.test(location.hash)) history.replaceState(null, '', here());
  }
  function openLogin() {
    if (S.user) {
      openModal('<h2 class="lab lab--ink c-pink s4">Log out?</h2><div class="who"><img src="' + esc(avatar(S.user.username)) + '" alt="" onerror="this.src=\'assets/img/icon.png\'">' + esc(S.user.username) + '</div>' +
        '<button class="btn btn--wide c-red" type="button" data-logout><span class="lab lab--btn s3">Log out</span></button>');
      return;
    }
    openModal('<form data-login><h2 class="lab lab--ink c-pink s4">Enter your Minecraft username</h2>' +
      '<p class="modal__hint">Your purchases are delivered to this player. Bedrock players: type a dot first, like <b>.Steve</b>.</p>' +
      '<input class="field" name="u" type="text" placeholder="Username" maxlength="17" autocomplete="username" spellcheck="false">' +
      '<button class="btn btn--wide c-green" type="submit"><span class="lab lab--btn s3">Login</span></button></form>');
  }
  function openPackage(id) {
    var p = S.packages[id]; if (!p) return;
    var qty = p.type === 'subscription' ? '' : '<div class="qty" role="group" aria-label="Quantity">' + [1, 5, 10].map(function (q) {
      return '<button type="button" data-qty="' + q + '" aria-pressed="' + (q === 1) + '">' + q + 'x</button>'; }).join('') + '</div>';
    openModal('<div class="pview"><div class="pview__img">' + imgTag(pkgImage(p), p.name) + '</div><div>' +
      '<h2 class="lab lab--ink c-pink s4">' + esc(p.name) + '</h2>' + price(p) +
      '<div class="pview__desc">' + (p.description || '') + '</div>' + qty +
      '<div class="pview__actions"><button class="btn c-green" type="button" data-add="' + p.id + '" data-modal-add><span class="lab lab--btn s3">Add to cart</span></button>' +
      (p.disable_gifting ? '' : '<button class="btn btn--sq c-pink gift" type="button" data-gift="' + p.id + '" aria-label="Gift">' + ICON_GIFT + '</button>') +
      '</div></div></div>', true);
  }
  function openGift(id) {
    var p = S.packages[id]; if (!p) return;
    openModal('<form data-giftform="' + id + '"><h2 class="lab lab--ink c-pink s4">Gift ' + esc(p.name) + '</h2>' +
      '<p class="modal__hint">Who is it for? It is delivered to their account; you pay.</p>' +
      '<input class="field" name="u" type="text" placeholder="Recipient Minecraft username" maxlength="17" spellcheck="false">' +
      '<button class="btn btn--wide c-green" type="submit"><span class="lab lab--btn s3">Add gift to cart</span></button></form>');
  }
  function toast(colour, title, text) {
    var t = document.createElement('div');
    t.className = 'toast c-' + colour;
    t.innerHTML = '<div><b>' + esc(title) + '</b>' + esc(text || '') + '</div>';
    $('toasts').appendChild(t);
    setTimeout(function () { t.remove(); }, 4200);
  }
  function confetti() {
    var colours = ['#ff4da9', '#ffcc24', '#4ddc1e', '#19b8ff', '#ad68f4', '#ff9428'];
    for (var i = 0; i < 60; i++) {
      var d = document.createElement('span');
      d.className = 'confetti';
      d.style.left = Math.random() * 100 + 'vw';
      d.style.color = colours[i % colours.length];
      d.style.animation = 'fall ' + (1.6 + Math.random() * 1.6) + 's ' + (Math.random() * .5) + 's linear forwards';
      document.body.appendChild(d);
      setTimeout(d.remove.bind(d), 4000);
    }
  }
  function busy(btn, job) {
    if (!btn || btn.classList.contains('is-busy')) return;
    btn.classList.add('is-busy');
    Promise.resolve().then(job).catch(function (e) { toast('red', 'Oops', e.message); })
      .then(function () { btn.classList.remove('is-busy'); });
  }
  function copyIp() {
    var ip = C.serverIp;
    (navigator.clipboard ? navigator.clipboard.writeText(ip) : Promise.reject()).then(function () {
      toast('blue', 'Copied!', ip + ': paste it in Multiplayer, Add Server.');
    }, function () { toast('blue', 'Server address', ip); });
  }

  /* ------------------------------------------------ events */
  function wire() {
    document.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-add],[data-gift],[data-open],[data-remove],[data-close],[data-logout],[data-play],[data-qty]');
      if (!t) return;
      if (t.hasAttribute('data-qty')) {
        t.parentNode.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); });
      } else if (t.hasAttribute('data-add')) {
        var sel = t.hasAttribute('data-modal-add') && $('modalBody').querySelector('[aria-pressed="true"]');
        var q = sel ? Number(sel.getAttribute('data-qty')) : 1;
        busy(t, function () { return addToCart(Number(t.getAttribute('data-add')), q); });
      } else if (t.hasAttribute('data-gift')) {
        openGift(Number(t.getAttribute('data-gift')));
      } else if (t.hasAttribute('data-open')) {
        history.replaceState(null, '', '#/package/' + t.getAttribute('data-open'));
        openPackage(Number(t.getAttribute('data-open')));
      } else if (t.hasAttribute('data-remove')) {
        busy(t, function () { return removeFromCart(Number(t.getAttribute('data-remove'))); });
      } else if (t.hasAttribute('data-logout')) {
        closeModal(); logout();
      } else if (t.hasAttribute('data-play')) {
        copyIp();
      } else if (t.hasAttribute('data-close')) {
        closeAll();
      }
    });
    document.addEventListener('submit', function (ev) {
      var f = ev.target;
      if (f.hasAttribute('data-login')) {
        ev.preventDefault();
        busy(f.querySelector('.btn'), function () {
          return login(f.u.value).then(function () {
            if ($('modalBody').querySelector('[data-login]')) closeModal();
            toast('green', 'Logged in', 'Shopping as ' + S.user.username);
          });
        });
      } else if (f.hasAttribute('data-giftform')) {
        ev.preventDefault();
        var id = Number(f.getAttribute('data-giftform')), who = f.u.value;
        busy(f.querySelector('.btn'), function () { return giftTo(id, who); });
      }
    });
    $('overlay').addEventListener('click', closeAll);
    $('modal').addEventListener('click', function (ev) { if (ev.target === $('modal')) closeModal(); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeAll(); });
    $('menuBtn').addEventListener('click', function () { openSide('menuSide'); });
    $('cartBtn').addEventListener('click', function () { openSide('cartSide'); });
    $('loginBtn').addEventListener('click', openLogin);
    $('checkoutBtn').addEventListener('click', checkout);
    window.addEventListener('scroll', function () { $('header').classList.toggle('is-stuck', window.scrollY > 10); }, { passive: true });
  }
  function route() {
    var m = location.hash.match(/^#\/package\/(\d+)/);
    if (m) openPackage(Number(m[1]));
    if (location.hash === '#/thanks') {
      toast('green', 'Thank you!', 'Your purchase arrives in game within a minute.');
      if (C.confetti) confetti();
      logout(true); history.replaceState(null, '', here());
    }
  }

  /* ------------------------------------------------ start */
  function start() {
    $('app').hidden = false;
    $('sample').hidden = !DEMO;
    $('year').textContent = new Date().getFullYear();
    $('heroTitle').textContent = (C.hero && C.hero.title) || 'PetsMC Store';
    $('heroSub').textContent = (C.hero && C.hero.subtitle) || '';
    $('heroBedrock').textContent = C.bedrock || '';
    document.querySelectorAll('[data-ip]').forEach(function (n) { n.textContent = C.serverIp; });
    if (C.discordUrl) { $('discordBtn').href = C.discordUrl; $('discordBtn').hidden = false; }
    if (C.mainSiteUrl) $('homeBtn').href = C.mainSiteUrl;
    $('ownLinks').innerHTML = (C.links || []).map(function (l) { return '<a href="' + esc(l.url) + '">' + esc(l.label) + '</a>'; }).join('');
    wire(); paintUser();
    refreshBasket().then(function () {
      paintCart();
      return loadStore();
    }).then(function (r) { render(r[0], r[1]); route(); }, function (e) {
      $('sections').innerHTML = '<div class="empty">The store could not load (' + esc(e.message) + '). Refresh the page in a moment.</div>';
    });
  }
  gate().then(start);
})();
