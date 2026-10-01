// Shop page: search, category filter, sort, with an ad card in the results.
MS.header('Shop');
const cats = ['All', ...new Set(MS.PRODUCTS.map((p) => p.category))];
let cat = cats.includes(new URLSearchParams(location.search).get('cat')) ? new URLSearchParams(location.search).get('cat') : 'All';
const initialQ = (new URLSearchParams(location.search).get('q') || '').slice(0, 60);

document.getElementById('page').innerHTML = `
  ${MS.breadcrumbs([['Home', 'index.html'], ['Shop']])}
  <h1>Shop</h1>
  <div class="toolbar">
    <input id="q" type="search" maxlength="60" placeholder="Search tees, vinyl, posters…" aria-label="Search products">
    <select id="sort" aria-label="Sort">
      <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="az">Name A–Z</option>
    </select>
  </div>
  <div class="chips" id="cats"></div>
  <div class="section-head section"><h2 id="heading">All merch</h2><span class="muted" id="count"></span></div>
  <div class="grid" id="results"></div>`;

const q = document.getElementById('q'), sort = document.getElementById('sort');
q.value = initialQ;
function drawCats() { document.getElementById('cats').innerHTML = cats.map((c) => `<button class="chip ${c === cat ? 'on' : ''}" data-c="${MS.esc(c)}">${MS.esc(c)}</button>`).join(''); }
function draw() {
  let list = MS.search(q.value).filter((p) => cat === 'All' || p.category === cat);
  if (sort.value === 'low') list.sort((a, b) => a.price - b.price);
  if (sort.value === 'high') list.sort((a, b) => b.price - a.price);
  if (sort.value === 'az') list.sort((a, b) => a.name.localeCompare(b.name));
  const cards = list.map(MS.card);
  if (cards.length > 4) cards.splice(4, 0, MS.adCard(1));
  document.getElementById('results').innerHTML = cards.length ? cards.join('') : `<div class="empty">No merch matches “${MS.esc(q.value)}”. Try “hoodie” or “vinyl”, or ask MerchBot (bottom right).</div>`;
  document.getElementById('heading').textContent = cat === 'All' ? (q.value ? `Results for “${q.value}”` : 'All merch') : cat;
  document.getElementById('count').textContent = `${list.length} item${list.length === 1 ? '' : 's'}`;
}
document.getElementById('cats').addEventListener('click', (e) => { const b = e.target.closest('[data-c]'); if (b) { cat = b.dataset.c; drawCats(); draw(); } });
q.addEventListener('input', draw);
sort.addEventListener('change', draw);
drawCats(); draw();
