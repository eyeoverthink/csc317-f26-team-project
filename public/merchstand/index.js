// Home page: hero, ads, featured merch, categories, everything.
MS.header('Home');
const featured = MS.PRODUCTS.filter((p) => p.tag);
const cats = [...new Set(MS.PRODUCTS.map((p) => p.category))];
document.getElementById('page').innerHTML = `
  <section class="hero">
    <div>
      <p class="muted">${MS.esc(MS.SHOP.tagline)}</p>
      <h1>Wear the music.</h1>
      <p>Tees, hoodies, vinyl, posters and more, straight from the band. Free shipping over ${MS.money(MS.SHOP.freeShippingOver)}.</p>
      <p><a class="btn primary" href="shop.html">Shop all merch</a> <a class="btn light" href="shop.html?cat=Music">Get the album</a></p>
    </div>
    <div class="art">${['logo-tee', 'debut-vinyl', 'tour-hoodie', 'dad-cap'].map((id) => { const p = MS.product(id); return `<a class="thumb" href="product.html?id=${p.id}" aria-label="${MS.esc(p.name)}">${MS.mock(p.kind, p.colors[0])}</a>`; }).join('')}</div>
  </section>

  <section class="section"><div class="ads">${MS.adCard(0)}${MS.adCard(1)}${MS.adCard(2)}</div></section>

  <section class="section">
    <div class="section-head"><h2>Fan favorites</h2><a class="muted" href="shop.html">See all →</a></div>
    <div class="grid">${featured.map(MS.card).join('')}</div>
  </section>

  <section class="section">
    <div class="section-head"><h2>Shop by category</h2></div>
    <div class="chips">${cats.map((c) => `<a class="chip" href="shop.html?cat=${encodeURIComponent(c)}">${MS.esc(c)}</a>`).join('')}</div>
  </section>

  <section class="section">
    <div class="section-head"><h2>Everything</h2></div>
    <div class="grid">${MS.PRODUCTS.map(MS.card).join('')}</div>
  </section>`;
