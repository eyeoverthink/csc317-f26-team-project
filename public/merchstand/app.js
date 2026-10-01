/* MerchStand: shared code for the 5 pages of a merch store (catalog, product mockups, cart).
   Rename the store and its colors here. Products are drawn as simple SVG mockups, so there are no image files. */
(function () {
  'use strict';

  const SHOP = { name: 'Merch', accent: 'Stand', tagline: 'Official merch, records and more.', currency: 'USD', taxRate: 0.08625, freeShippingOver: 60, shipping: 5.99 };

  const COLORS = { black: '#1b1b1b', white: '#f4f4f0', lavender: '#c9c1f2', lime: '#d9f36b', coral: '#ff8a70', sky: '#9fd3ff', sand: '#e9d8b4' };
  const PRODUCTS = [
    { id: 'logo-tee', name: 'Logo Tee', kind: 'tee', category: 'Apparel', price: 28, colors: ['black', 'white', 'lavender'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], tag: 'Best seller', about: 'Heavyweight cotton tee with the band logo on the chest.' },
    { id: 'tour-hoodie', name: 'Tour Hoodie', kind: 'hoodie', category: 'Apparel', price: 58, colors: ['black', 'sand', 'sky'], sizes: ['S', 'M', 'L', 'XL'], tag: 'New', about: 'Fleece hoodie with the tour dates printed down the back.' },
    { id: 'dad-cap', name: 'Dad Cap', kind: 'cap', category: 'Accessories', price: 24, colors: ['black', 'lime', 'coral'], sizes: ['One size'], about: 'Washed cotton cap with an embroidered logo. Adjustable strap.' },
    { id: 'debut-vinyl', name: 'Debut LP (Vinyl)', kind: 'vinyl', category: 'Music', price: 32, colors: ['black', 'lavender'], sizes: ['12" LP'], tag: 'Limited', about: 'The debut album on 180 g vinyl with a printed inner sleeve.' },
    { id: 'debut-cd', name: 'Debut Album (CD)', kind: 'cd', category: 'Music', price: 14, colors: ['white'], sizes: ['CD'], about: 'The debut album on CD with a 12-page lyric booklet.' },
    { id: 'tour-poster', name: 'Tour Poster', kind: 'poster', category: 'Posters', price: 20, colors: ['coral', 'sky', 'lime'], sizes: ['18×24"', '24×36"'], about: 'Screen-printed tour poster on heavy paper.' },
    { id: 'sticker-pack', name: 'Sticker Pack', kind: 'sticker', category: 'Accessories', price: 8, colors: ['lavender', 'lime'], sizes: ['6 stickers'], about: 'Six vinyl stickers, waterproof, for laptops and water bottles.' },
    { id: 'tote-bag', name: 'Tote Bag', kind: 'tote', category: 'Accessories', price: 22, colors: ['sand', 'black'], sizes: ['One size'], about: 'Sturdy canvas tote with the logo on both sides.' },
  ];
  const product = (id) => PRODUCTS.find((p) => p.id === id);
  const money = (n) => '$' + n.toFixed(2);

  // ---------------------------------------------------------------- SVG mockups
  function mock(kind, colorName) {
    const c = COLORS[colorName] || colorName, s = '#111', light = ['white', 'sand', 'lime', 'sky', 'lavender'].includes(colorName);
    const logo = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${light ? '#111' : '#fff'}"/><text x="${x}" y="${y + r * 0.35}" font-size="${r}" text-anchor="middle" font-weight="800" fill="${light ? '#fff' : '#111'}" font-family="Arial">M</text>`;
    const shapes = {
      tee: `<path d="M60 40 L85 28 Q100 40 115 28 L140 40 L165 70 L145 85 L138 78 L138 170 L62 170 L62 78 L55 85 L35 70 Z" fill="${c}" stroke="${s}" stroke-width="4" stroke-linejoin="round"/>${logo(100, 95, 16)}`,
      hoodie: `<path d="M62 46 Q100 10 138 46 L168 80 L150 96 L140 88 L140 172 L60 172 L60 88 L50 96 L32 80 Z" fill="${c}" stroke="${s}" stroke-width="4" stroke-linejoin="round"/><path d="M78 48 Q100 72 122 48" fill="none" stroke="${s}" stroke-width="4"/><rect x="74" y="128" width="52" height="26" rx="6" fill="none" stroke="${s}" stroke-width="3"/>${logo(100, 100, 13)}`,
      cap: `<path d="M48 120 Q50 62 100 58 Q150 62 152 120 Z" fill="${c}" stroke="${s}" stroke-width="4"/><path d="M40 120 L175 120 Q180 136 150 138 L52 134 Q38 132 40 120 Z" fill="${c}" stroke="${s}" stroke-width="4"/>${logo(100, 96, 13)}`,
      vinyl: `<rect x="30" y="35" width="120" height="130" rx="6" fill="${c}" stroke="${s}" stroke-width="4"/><circle cx="125" cy="100" r="55" fill="#111" stroke="${s}" stroke-width="4"/><circle cx="125" cy="100" r="40" fill="none" stroke="#333" stroke-width="2"/><circle cx="125" cy="100" r="18" fill="${COLORS.coral}"/><rect x="30" y="35" width="70" height="130" fill="${c}" stroke="${s}" stroke-width="4"/>${logo(65, 100, 16)}`,
      cd: `<rect x="40" y="40" width="120" height="120" rx="8" fill="#f4f4f0" stroke="${s}" stroke-width="4"/><circle cx="100" cy="100" r="46" fill="url(#cdg)" stroke="${s}" stroke-width="3"/><circle cx="100" cy="100" r="10" fill="#fff" stroke="${s}" stroke-width="3"/><defs><linearGradient id="cdg"><stop offset="0" stop-color="#d9f36b"/><stop offset=".5" stop-color="#9fd3ff"/><stop offset="1" stop-color="#c9c1f2"/></linearGradient></defs>`,
      poster: `<rect x="50" y="25" width="100" height="150" fill="${c}" stroke="${s}" stroke-width="4"/><circle cx="100" cy="80" r="28" fill="#fff" stroke="${s}" stroke-width="3"/><rect x="65" y="125" width="70" height="8" fill="#111"/><rect x="72" y="140" width="56" height="6" fill="#111"/><rect x="78" y="152" width="44" height="6" fill="#111"/>${logo(100, 80, 14)}`,
      sticker: `<rect x="40" y="45" width="70" height="70" rx="14" fill="${c}" stroke="${s}" stroke-width="4" transform="rotate(-10 75 80)"/><circle cx="125" cy="110" r="34" fill="${COLORS.coral}" stroke="${s}" stroke-width="4"/><path d="M60 140 L90 120 L110 150 Z" fill="${COLORS.sky}" stroke="${s}" stroke-width="4"/>${logo(75, 80, 14)}`,
      tote: `<path d="M75 60 Q75 30 100 30 Q125 30 125 60" fill="none" stroke="${s}" stroke-width="5"/><path d="M45 60 L155 60 L148 172 L52 172 Z" fill="${c}" stroke="${s}" stroke-width="4" stroke-linejoin="round"/>${logo(100, 115, 20)}`,
    };
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${kind}">${shapes[kind] || ''}</svg>`;
  }

  // ---------------------------------------------------------------- cart (saved in this browser)
  const load = () => { try { return JSON.parse(localStorage.getItem('merchstand.cart')) || []; } catch { return []; } };
  let cart = load();
  const save = () => { try { localStorage.setItem('merchstand.cart', JSON.stringify(cart)); } catch { /* private mode */ } emit(); };
  const key = (l) => `${l.id}|${l.color}|${l.size}`;
  function addToCart(id, color, size, qty) {
    const l = cart.find((x) => key(x) === `${id}|${color}|${size}`);
    if (l) l.qty = Math.min(20, l.qty + qty); else cart.push({ id, color, size, qty });
    save(); toast(`Added ${product(id).name} to your cart`);
  }
  function setQty(k, qty) { cart = cart.map((l) => (key(l) === k ? { ...l, qty } : l)).filter((l) => l.qty > 0); save(); }
  function totals() {
    const sub = cart.reduce((s, l) => s + product(l.id).price * l.qty, 0);
    const shipping = sub === 0 || sub >= SHOP.freeShippingOver ? 0 : SHOP.shipping;
    const tax = Math.round(sub * SHOP.taxRate * 100) / 100;
    return { count: cart.reduce((s, l) => s + l.qty, 0), sub, shipping, tax, total: sub + shipping + tax };
  }
  function checkout(info) {
    const order = { id: 'MS-' + Date.now().toString(36).toUpperCase(), items: cart, totals: totals(), name: info.name, email: info.email };
    cart = []; save(); return order;
  }

  const listeners = new Set();
  const on = (fn) => { listeners.add(fn); fn(); };
  function emit() { listeners.forEach((fn) => fn()); }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 1600); }

  // ---------------------------------------------------------------- shared layout
  function header(active) {
    const links = [['index.html', 'Home'], ['shop.html', 'Shop'], ['about.html', 'About'], ['cart.html', 'Cart']];
    document.body.insertAdjacentHTML('afterbegin', `<header class="topbar"><div class="wrap">
      <a class="brand" href="index.html">${esc(SHOP.name)}<span>${esc(SHOP.accent)}</span></a>
      <div class="hsearch"><input id="hsearch" type="search" maxlength="60" placeholder="Search merch…" aria-label="Search the store"><div class="suggest" id="hsuggest" hidden></div></div>
      <button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false">☰</button>
      <nav class="nav" id="nav">${links.map(([h, l]) => `<a href="${h}" class="${l === active ? 'active' : ''}">${l}${l === 'Cart' ? ' <span class="badge" id="cartCount">0</span>' : ''}</a>`).join('')}</nav>
    </div></header>`);
    document.body.insertAdjacentHTML('beforeend', `<footer><div class="wrap">© ${new Date().getFullYear()} ${esc(SHOP.name + SHOP.accent)} · class project store, no real payments ·
      <span class="eot-credit">UI flavor by Vaughn Scott / EyeOverThink®</span></div></footer>`);
    announcementBar(); headerSearch(); merchBot();
    const mb = document.getElementById('menuBtn'), nav = document.getElementById('nav');
    mb.addEventListener('click', () => { const open = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', open); });
    on(() => { const c = document.getElementById('cartCount'); if (c) { c.textContent = totals().count; c.style.display = totals().count ? '' : 'none'; } });
  }
  function card(p) {
    return `<a class="card" href="product.html?id=${p.id}">
      <div class="thumb">${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ''}${mock(p.kind, p.colors[0])}</div>
      <div class="name">${esc(p.name)}</div>
      <div class="meta">${esc(p.category)} · <span class="price">${money(p.price)}</span></div></a>`;
  }


  // ---------------------------------------------------------------- security helpers
  // Read a URL parameter only if it matches the expected shape (prevents odd values reaching the page).
  const param = (name, re = /^[a-z0-9-]{1,40}$/i) => { const v = new URLSearchParams(location.search).get(name); return v && re.test(v) ? v : null; };
  const valid = {
    name: (v) => /^[\p{L} .'-]{2,60}$/u.test(v.trim()),
    email: (v) => /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i.test(v.trim()),
    zip: (v) => /^\d{5}(-\d{4})?$/.test(v.trim()),
    address: (v) => v.trim().length >= 6 && v.trim().length <= 120,
  };

  // ---------------------------------------------------------------- ads (in-house promos, clearly labeled)
  const ANNOUNCEMENTS = ['Free shipping on orders over $60', 'New: Tour Hoodie in three colors', 'Bundle a Tee + Vinyl and save 15% at checkout', 'Limited Debut LP pressing: only 300 made'];
  const ADS = [
    { title: 'Tour 2026', text: 'Tickets on sale now. Fall dates in 12 cities.', cta: 'See dates', href: 'about.html#tour', color: 'coral' },
    { title: 'Bundle & save', text: 'Logo Tee + Debut LP. Save 15% together.', cta: 'Shop the bundle', href: 'shop.html?q=debut', color: 'lime' },
    { title: 'Join the list', text: 'Early access to drops and pre-sales.', cta: 'Sign up', href: 'about.html#list', color: 'lavender' },
  ];
  function announcementBar() {
    const bar = document.createElement('div'); bar.className = 'announce'; bar.setAttribute('role', 'status');
    let i = 0; bar.textContent = ANNOUNCEMENTS[0];
    setInterval(() => { i = (i + 1) % ANNOUNCEMENTS.length; bar.textContent = ANNOUNCEMENTS[i]; }, 4000);
    document.body.prepend(bar);
  }
  function adCard(n = 0) {
    const a = ADS[n % ADS.length];
    return `<a class="ad ad-${a.color}" href="${a.href}"><span class="ad-label">Ad</span><b>${esc(a.title)}</b><span>${esc(a.text)}</span><span class="ad-cta">${esc(a.cta)} →</span></a>`;
  }

  // ---------------------------------------------------------------- search
  function search(q) {
    const words = String(q || '').toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return PRODUCTS.slice();
    return PRODUCTS.map((p) => {
      const hay = `${p.name} ${p.category} ${p.kind} ${p.colors.join(' ')} ${p.about}`.toLowerCase();
      const score = words.reduce((s, w) => s + (p.name.toLowerCase().includes(w) ? 3 : hay.includes(w) ? 1 : 0), 0);
      return { p, score, all: words.every((w) => hay.includes(w)) };
    }).filter((x) => x.all).sort((a, b) => b.score - a.score).map((x) => x.p);
  }
  function headerSearch() {
    const box = document.getElementById('hsearch'), list = document.getElementById('hsuggest');
    if (!box) return;
    const draw = () => {
      const q = box.value.trim(); if (!q) { list.hidden = true; return; }
      const r = search(q).slice(0, 6);
      list.innerHTML = r.length ? r.map((p) => `<a href="product.html?id=${p.id}"><span class="mini">${mock(p.kind, p.colors[0])}</span>${esc(p.name)}<span class="muted">${money(p.price)}</span></a>`).join('')
        + `<a class="all" href="shop.html?q=${encodeURIComponent(q)}">See all results for “${esc(q)}”</a>` : `<div class="none">No matches for “${esc(q)}”</div>`;
      list.hidden = false;
    };
    box.addEventListener('input', draw);
    box.addEventListener('keydown', (e) => { if (e.key === 'Enter') location.href = 'shop.html?q=' + encodeURIComponent(box.value.trim()); if (e.key === 'Escape') list.hidden = true; });
    document.addEventListener('click', (e) => { if (!e.target.closest('.hsearch')) list.hidden = true; });
  }
  function breadcrumbs(items) {
    return `<nav class="crumbs" aria-label="Breadcrumb">${items.map(([label, href], i) => (href && i < items.length - 1 ? `<a href="${href}">${esc(label)}</a>` : `<span>${esc(label)}</span>`)).join('<i>/</i>')}</nav>`;
  }

  // ---------------------------------------------------------------- MerchBot: a shopping assistant that runs in the page
  const BOT_FACE = `<svg viewBox="0 0 64 64" aria-hidden="true"><line x1="32" y1="4" x2="32" y2="13" stroke="#111" stroke-width="3"/><circle cx="32" cy="5" r="4" fill="#ff8a70" stroke="#111" stroke-width="2"/>
    <rect x="9" y="13" width="46" height="38" rx="12" fill="#d9f36b" stroke="#111" stroke-width="3"/><circle cx="24" cy="31" r="5" fill="#111"/><circle cx="40" cy="31" r="5" fill="#111"/>
    <path d="M24 41 Q32 47 40 41" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/><rect x="2" y="26" width="7" height="12" rx="3" fill="#111"/><rect x="55" y="26" width="7" height="12" rx="3" fill="#111"/></svg>`;
  function botReply(text) {
    const t = text.toLowerCase().trim();
    const found = search(t.replace(/\b(add|buy|show|find|me|a|an|the|to|my|cart|please|i|want|need|looking|for)\b/g, ' ')).slice(0, 3);
    const budget = (t.match(/\$?\s?(\d{1,4})/) || [])[1];
    if (/^(hi|hey|hello|yo|sup)\b/.test(t)) return { text: `Hey! I'm MerchBot. I can find merch, help with sizes, or add things to your cart. What are you looking for?`, chips: ['Gift under $30', 'Size help', 'Shipping'] };
    if (/size|fit|small|large|xl/.test(t)) return { text: `Tees and hoodies fit true to size. Between sizes? Go up one for a relaxed fit. Tees: S 34–36", M 38–40", L 42–44", XL 46–48" chest.`, chips: ['Show tees', 'Show hoodies'] };
    if (/ship|deliver|arrive/.test(t)) return { text: `Shipping is ${money(SHOP.shipping)}, and free over ${money(SHOP.freeShippingOver)}. Orders ship in 2–4 business days.`, chips: ['Show bestsellers'] };
    if (/return|refund|exchange/.test(t)) return { text: `Unworn items can be returned within 30 days. Sizes exchange free.` };
    if (/cart|total|checkout/.test(t) && !/add/.test(t)) { const x = totals(); return { text: x.count ? `You have ${x.count} item${x.count > 1 ? 's' : ''}: ${money(x.total)} with tax and shipping.` : `Your cart is empty. Want a suggestion?`, chips: x.count ? ['Go to cart'] : ['Show bestsellers'] }; }
    if (/gift|under|cheap|budget/.test(t) && budget) {
      const r = PRODUCTS.filter((p) => p.price <= Number(budget)).sort((a, b) => b.price - a.price).slice(0, 3);
      return r.length ? { text: `Under $${budget}, I'd pick:`, products: r } : { text: `Nothing under $${budget} yet. The Sticker Pack is ${money(8)}.` };
    }
    if (/best|popular|recommend|suggest/.test(t)) return { text: `Fan favorites right now:`, products: PRODUCTS.filter((p) => p.tag).slice(0, 3) };
    if (/^add\b|buy/.test(t) && found.length) { const p = found[0]; addToCart(p.id, p.colors[0], p.sizes[Math.min(1, p.sizes.length - 1)], 1); return { text: `Added a ${p.name} (${p.colors[0]}, ${p.sizes[Math.min(1, p.sizes.length - 1)]}) to your cart. Change the color or size on its page anytime.`, chips: ['Go to cart'] }; }
    if (found.length && found.length < PRODUCTS.length) return { text: `Here's what I found:`, products: found };
    return { text: `I can find merch ("hoodie", "vinyl"), suggest gifts ("gift under $30"), help with sizes, or tell you about shipping.`, chips: ['Gift under $30', 'Show bestsellers', 'Shipping'] };
  }
  function merchBot() {
    document.body.insertAdjacentHTML('beforeend', `<button class="bot-fab" id="botFab" aria-label="Open MerchBot">${BOT_FACE}</button>
      <section class="bot" id="bot" hidden aria-label="MerchBot chat"><header>${BOT_FACE}<b>MerchBot</b><span class="muted">shopping helper</span><button id="botClose" aria-label="Close">✕</button></header>
      <div class="bot-log" id="botLog" aria-live="polite"></div>
      <form id="botForm"><input id="botIn" maxlength="200" autocomplete="off" placeholder="Ask about merch, sizes, gifts…"><button class="btn primary" type="submit">Send</button></form></section>`);
    const log = document.getElementById('botLog'), panel = document.getElementById('bot'), input = document.getElementById('botIn');
    const say = (who, html) => { log.insertAdjacentHTML('beforeend', `<div class="msg ${who}">${html}</div>`); log.scrollTop = log.scrollHeight; };
    const answer = (q) => {
      say('me', esc(q));
      say('typing', '<i></i><i></i><i></i>');
      setTimeout(() => {
        log.querySelector('.typing')?.remove();
        const r = botReply(q);
        say('them', esc(r.text) + (r.products ? `<div class="bot-products">${r.products.map((p) => `<a href="product.html?id=${p.id}">${mock(p.kind, p.colors[0])}<span>${esc(p.name)}<b>${money(p.price)}</b></span></a>`).join('')}</div>` : '')
          + (r.chips ? `<div class="bot-chips">${r.chips.map((c) => `<button type="button" class="chip" data-q="${esc(c)}">${esc(c)}</button>`).join('')}</div>` : ''));
      }, 450 + Math.random() * 400);
    };
    log.addEventListener('click', (e) => {
      const c = e.target.closest('[data-q]'); if (!c) return;
      if (c.dataset.q === 'Go to cart') { location.href = 'cart.html'; return; }
      answer(c.dataset.q);
    });
    document.getElementById('botFab').addEventListener('click', () => { panel.hidden = !panel.hidden; if (!panel.hidden) { if (!log.children.length) answer('hi'); input.focus(); } });
    document.getElementById('botClose').addEventListener('click', () => { panel.hidden = true; });
    document.getElementById('botForm').addEventListener('submit', (e) => { e.preventDefault(); const q = input.value.trim(); if (q) { input.value = ''; answer(q); } });
  }

  window.MS = { SHOP, COLORS, PRODUCTS, product, money, mock, addToCart, setQty, totals, checkout, cart: () => cart, key, on, esc, header, card, toast, param, valid, search, breadcrumbs, adCard };
})();
