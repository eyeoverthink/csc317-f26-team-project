// About page: the store, tour dates, mailing list, and how the store keeps shoppers safe.
MS.header('About');
const TOUR = [['Oct 18', 'San Francisco, CA', 'The Chapel'], ['Oct 21', 'Los Angeles, CA', 'Teragram Ballroom'], ['Oct 24', 'Portland, OR', 'Mississippi Studios'], ['Oct 27', 'Seattle, WA', 'Neumos']];
document.getElementById('page').innerHTML = `
  ${MS.breadcrumbs([['Home', 'index.html'], ['About']])}
  <h1>About the store</h1>
  <p>MerchStand is the official merch table, online: shirts, hoodies, records and posters, shipped from the band to you.</p>

  <section class="section" id="tour">
    <div class="section-head"><h2>Tour 2026</h2></div>
    <div class="grid">${TOUR.map(([d, c, v]) => `<div class="summary"><b>${d}</b><div>${c}</div><div class="muted">${v}</div></div>`).join('')}</div>
  </section>

  <section class="section" id="list">
    <div class="section-head"><h2>Join the mailing list</h2></div>
    <form id="listForm" class="summary" novalidate>
      <label class="field">Email <input name="email" type="email" maxlength="120" autocomplete="email" required></label>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn primary">Sign up</button>
      <p id="listMsg" class="muted" aria-live="polite"></p>
    </form>
  </section>

  <section class="section">
    <div class="section-head"><h2>Shopping safely</h2></div>
    <ul>
      <li>A strict Content-Security-Policy: the pages only run this store's own scripts.</li>
      <li>Everything you type is treated as text, never as code, before it's shown on a page.</li>
      <li>Forms check every field, ignore bots (a hidden honeypot field) and block rapid repeat submits.</li>
      <li>This is a class project: no card is charged and nothing leaves your browser.</li>
    </ul>
  </section>`;

document.getElementById('listForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target, msg = document.getElementById('listMsg');
  if (f.website.value) return; // honeypot: humans never fill this
  if (!MS.valid.email(f.email.value)) { msg.textContent = 'Please enter a valid email address.'; return; }
  msg.textContent = "You're on the list! (Saved in this browser only for the class project.)";
  f.reset();
});
