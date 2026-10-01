// Product page: color + size options, quantity, add to cart, related items.
MS.header('Shop');
const p = MS.product(MS.param('id')) || MS.PRODUCTS[0]; // only a known product id is accepted
let color = p.colors[0], size = p.sizes[Math.min(1, p.sizes.length - 1)], qty = 1;
document.title = `${p.name} · MerchStand`;

document.getElementById('page').innerHTML = `
  ${MS.breadcrumbs([['Home', 'index.html'], ['Shop', 'shop.html'], [p.category, 'shop.html?cat=' + encodeURIComponent(p.category)], [p.name]])}
  <div class="product">
    <div class="thumb" id="big"></div>
    <div>
      ${p.tag ? `<span class="chip on">${MS.esc(p.tag)}</span>` : ''}
      <h1>${MS.esc(p.name)}</h1>
      <div class="price">${MS.money(p.price)}</div>
      <p class="muted">${MS.esc(p.about)}</p>
      <div class="opt-label">Color: <span id="colorName"></span></div>
      <div class="chips" id="colors"></div>
      <div class="opt-label">Size</div>
      <div class="chips" id="sizes"></div>
      <div class="opt-label">Quantity</div>
      <div class="qty"><button id="minus" aria-label="Less">−</button><b id="qty">1</b><button id="plus" aria-label="More">+</button></div>
      <p><button class="btn primary" id="add">Add to cart</button> <a class="btn light" href="cart.html">View cart</a></p>
      <p class="muted">Free shipping over ${MS.money(MS.SHOP.freeShippingOver)} · 30-day returns · secure checkout</p>
    </div>
  </div>
  <section class="section">${MS.adCard(1)}</section>
  <section class="section"><div class="section-head"><h2>You might also like</h2></div><div class="grid" id="related"></div></section>`;

const $ = (id) => document.getElementById(id);
function draw() {
  $('big').innerHTML = MS.mock(p.kind, color);
  $('colorName').textContent = color;
  $('colors').innerHTML = p.colors.map((c) => `<button class="swatch swatch-${c} ${c === color ? 'on' : ''}" data-color="${c}" aria-label="${c}"></button>`).join('');
  $('sizes').innerHTML = p.sizes.map((s) => `<button class="chip ${s === size ? 'on' : ''}" data-size="${MS.esc(s)}">${MS.esc(s)}</button>`).join('');
  $('qty').textContent = qty;
}
$('colors').addEventListener('click', (e) => { const b = e.target.closest('[data-color]'); if (b) { color = b.dataset.color; draw(); } });
$('sizes').addEventListener('click', (e) => { const b = e.target.closest('[data-size]'); if (b) { size = b.dataset.size; draw(); } });
$('minus').addEventListener('click', () => { qty = Math.max(1, qty - 1); draw(); });
$('plus').addEventListener('click', () => { qty = Math.min(10, qty + 1); draw(); });
$('add').addEventListener('click', () => MS.addToCart(p.id, color, size, qty));
$('related').innerHTML = MS.PRODUCTS.filter((x) => x.id !== p.id).sort((a, b) => (b.category === p.category) - (a.category === p.category)).slice(0, 4).map(MS.card).join('');
draw();
