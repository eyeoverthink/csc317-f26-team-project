// Cart page: line items, quantities, totals, and a validated checkout (honeypot + resubmit guard).
MS.header('Cart');
const page = document.getElementById('page');
let lastSubmit = 0;

function draw() {
  const cart = MS.cart(), t = MS.totals();
  page.innerHTML = `
    ${MS.breadcrumbs([['Home', 'index.html'], ['Cart']])}
    <h1>Your cart</h1>
    ${cart.length ? `
    <div class="two">
      <section>${cart.map((l) => { const p = MS.product(l.id), k = MS.key(l); return `
        <div class="line">
          <a class="thumb" href="product.html?id=${p.id}">${MS.mock(p.kind, l.color)}</a>
          <div><b>${MS.esc(p.name)}</b><div class="muted">${MS.esc(l.color)} · ${MS.esc(l.size)} · ${MS.money(p.price)} each</div>
            <button class="chip" data-k="${MS.esc(k)}" data-q="0">Remove</button></div>
          <div class="qty"><button data-k="${MS.esc(k)}" data-q="${l.qty - 1}" aria-label="Less">−</button><b>${l.qty}</b><button data-k="${MS.esc(k)}" data-q="${l.qty + 1}" aria-label="More">+</button></div>
          <div class="price">${MS.money(p.price * l.qty)}</div>
        </div>`; }).join('')}
      </section>
      <aside>
        <div class="summary">
          <div class="row"><span>Items (${t.count})</span><span>${MS.money(t.sub)}</span></div>
          <div class="row"><span>Shipping</span><span>${t.shipping ? MS.money(t.shipping) : 'FREE'}</span></div>
          <div class="row"><span>Tax (8.625%)</span><span>${MS.money(t.tax)}</span></div>
          <div class="row total"><span>Total</span><span>${MS.money(t.total)}</span></div>
          ${t.shipping ? `<p class="muted">Add ${MS.money(MS.SHOP.freeShippingOver - t.sub)} more for free shipping.</p>` : ''}
        </div>
        <form id="checkout" class="summary section" novalidate>
          <h2>Checkout</h2>
          <label class="field">Full name <input name="name" maxlength="60" autocomplete="name" required></label>
          <label class="field">Email <input name="email" type="email" maxlength="120" autocomplete="email" required></label>
          <label class="field">Street address <input name="address" maxlength="120" autocomplete="street-address" required></label>
          <label class="field">ZIP code <input name="zip" maxlength="10" inputmode="numeric" autocomplete="postal-code" required></label>
          <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
          <p id="err" class="muted" aria-live="polite"></p>
          <button class="btn primary">Place order</button>
          <p class="muted">Class project: no card is charged and nothing is sent anywhere.</p>
        </form>
      </aside>
    </div>` : `<div class="empty">Your cart is empty. <a href="shop.html"><b>Find something you love →</b></a></div><section class="section">${MS.adCard(0)}</section>`}`;
  const form = document.getElementById('checkout');
  if (form) form.addEventListener('submit', submit);
}

function submit(e) {
  e.preventDefault();
  const f = e.target, err = document.getElementById('err');
  if (f.website.value) return; // honeypot: bots fill hidden fields, people don't
  if (Date.now() - lastSubmit < 10000) { err.textContent = 'Please wait a few seconds before trying again.'; return; }
  const bad = [['name', 'your full name'], ['email', 'a valid email'], ['address', 'a street address'], ['zip', 'a 5-digit ZIP code']].find(([k]) => !MS.valid[k](f[k].value));
  if (bad) { err.textContent = `Please enter ${bad[1]}.`; f[bad[0]].focus(); return; }
  lastSubmit = Date.now();
  const order = MS.checkout({ name: f.name.value.trim(), email: f.email.value.trim() });
  page.innerHTML = `<div class="hero"><div><h1>Thank you, ${MS.esc(order.name)}!</h1>
    <p>Order <b>${order.id}</b> · ${MS.money(order.totals.total)}. A receipt would go to ${MS.esc(order.email)}.</p>
    <p><a class="btn primary" href="shop.html">Keep shopping</a></p></div></div>`;
}

page.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) MS.setQty(b.dataset.k, Number(b.dataset.q)); });
MS.on(draw);
