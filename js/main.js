
   (function () {
  const grid = document.getElementById('product-grid');
  if (!grid) return; // other pages (about, contact, privacy) have no grid

  const filters = document.getElementById('filters');
  const search = document.getElementById('search');
  let products = [];
  let activeCategory = 'All';

  function stars(rating) {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }

  function makeCard(p) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.name;
    img.loading = 'lazy';

    const h2 = document.createElement('h2');
    h2.textContent = p.name;

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = p.category + (p.rating ? ' · ' + stars(p.rating) : '');

    const desc = document.createElement('p');
    desc.textContent = p.description;

    const a = document.createElement('a');
    a.href = p.link;
    a.className = 'btn';
    a.target = '_blank';
    a.rel = 'sponsored nofollow noopener';
    a.textContent = 'Buy on Amazon →';

    card.append(img, h2, meta, desc, a);
    return card;
  }

  function render() {
    const q = search ? search.value.trim().toLowerCase() : '';
    const list = products.filter(p =>
      (activeCategory === 'All' || p.category === activeCategory) &&
      (p.name + ' ' + p.description).toLowerCase().includes(q)
    );
    grid.replaceChildren(...list.map(makeCard));
    if (!list.length) {
      const msg = document.createElement('p');
      msg.className = 'grid-message';
      msg.textContent = 'No reviews match your search.';
      grid.append(msg);
    }
  }

  function buildFilters() {
    if (!filters) return;
    const cats = ['All', ...new Set(products.map(p => p.category))];
    filters.replaceChildren(...cats.map(c => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (c === activeCategory ? ' active' : '');
      b.textContent = c;
      b.addEventListener('click', () => {
        activeCategory = c;
        buildFilters();
        render();
      });
      return b;
    }));
  }

  fetch('data/products.json')
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => { products = data; buildFilters(); render(); })
    .catch(() => {
      grid.innerHTML = '<p class="grid-message">Reviews are unavailable right now. Please try again later.</p>';
    });

  if (search) search.addEventListener('input', render);
})();  
