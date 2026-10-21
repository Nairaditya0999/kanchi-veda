/* =============================================
   KANCHIVEDA – CATALOG SCRIPT
   ============================================= */

const WA_NUMBER = '919004714311';

// =========================================
// TABS
// =========================================
const tabs     = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.cat-section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.cat;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    sections.forEach(s => s.classList.remove('active'));
    const target = document.getElementById('cat-' + cat);
    if (target) target.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// =========================================
// LIGHTBOX
// =========================================
const lightbox   = document.getElementById('lightbox');
const lbImgEl    = document.getElementById('lb-img');
const lbTitle    = document.getElementById('lb-title');
const lbPrice    = document.getElementById('lb-price');
const lbClose    = document.getElementById('lb-close');
const lbOrderBtn = document.getElementById('lb-order-btn');

function buildWhatsAppLink(price) {
  const msg = encodeURIComponent(
    'Hello Kanchiveda! I am interested in ordering a saree.\nPrice range: ' + price + '\nPlease share more details.'
  );
  return 'https://wa.me/' + WA_NUMBER + '?text=' + msg;
}

function openLightbox(card) {
  // ✅ KEY FIX: grab the actual <img> src from inside the card
  const imgTag = card.querySelector('img');
  const src    = imgTag ? imgTag.src : '';          // absolute URL, always works
  const price  = card.dataset.price || '';

  lbImgEl.src          = src;
  lbImgEl.alt          = 'Saree';
  lbTitle.textContent  = '';                        // no title needed
  lbPrice.textContent  = price;
  lbOrderBtn.href      = buildWhatsAppLink(price);

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  // clear src after closing so it doesn't flash
  setTimeout(() => { lbImgEl.src = ''; }, 200);
}

// Attach click to every product card
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', function () {
    openLightbox(this);
  });
});

// Close button
lbClose.addEventListener('click', closeLightbox);

// Tap the black backdrop outside the image
lightbox.addEventListener('click', function (e) {
  if (e.target === this) closeLightbox();
});

// Escape key on desktop
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
