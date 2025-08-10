document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  navToggle && navToggle.addEventListener('click', function () {
    navList.classList.toggle('show');
  });

  // Close nav when clicking outside (mobile)
  document.addEventListener('click', function (e) {
    if (navList && navToggle && !navList.contains(e.target) && !navToggle.contains(e.target)) {
      navList.classList.remove('show');
    }
  });

  // --- Set copyright year dynamically ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Tile Calculator ---
  const calcBtn = document.getElementById('calcBtn');
  const calcClear = document.getElementById('calcClear');
  const resultEl = document.getElementById('calcResult');

  calcBtn && calcBtn.addEventListener('click', function () {
    const l = parseFloat(document.getElementById('roomLength').value);
    const w = parseFloat(document.getElementById('roomWidth').value);
    const tl = parseFloat(document.getElementById('tileLength').value);
    const tw = parseFloat(document.getElementById('tileWidth').value);

    if (!(l > 0 && w > 0 && tl > 0 && tw > 0)) {
      resultEl.textContent = 'Please fill all fields with values > 0.';
      return;
    }

    const roomArea = l * w;                // sq ft
    const tileArea = tl * tw;              // sq ft per tile
    const tilesNeededRaw = roomArea / tileArea;
    const tilesWithMargin = Math.ceil(tilesNeededRaw * 1.10); // 10% margin
    resultEl.textContent = `Room area: ${roomArea.toFixed(2)} sq ft. Tile area: ${tileArea.toFixed(3)} sq ft. You will need approximately ${tilesWithMargin} tiles (including 10% margin).`;
  });

  calcClear && calcClear.addEventListener('click', function () {
    ['roomLength', 'roomWidth', 'tileLength', 'tileWidth'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    resultEl.textContent = '';
  });

  // --- Contact form basic handler (no backend) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! Your message has been received. We will contact you soon.');
      contactForm.reset();
    });
  }

  // --- Gallery Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close-lightbox');
  const galleryImages = document.querySelectorAll('.gallery-item img');

  galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';           // use flex to center content
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Expanded image';
      document.body.style.overflow = 'hidden';   // disable background scroll
    });
  });

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';           // re-enable background scroll
  }

  closeBtn && closeBtn.addEventListener('click', closeLightbox);

  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });
});

