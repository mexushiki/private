document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     INTERFACE 1 — flower bloom -> popup surprise
  --------------------------------------------------------- */
  const flowerBtn   = document.getElementById('flower-btn');
  const popupOverlay= document.getElementById('popup-overlay');
  const popupClose  = document.getElementById('popup-close');
  const popupTitle  = document.getElementById('popup-title');
  const popupMsg    = document.getElementById('popup-message');
  const toGalleryBtn= document.getElementById('to-gallery-btn');
  const toSpeechBtn = document.getElementById('to-speech-btn');
  const backToStart = document.getElementById('back-to-start-btn');
  const petalLayer  = document.getElementById('petal-layer');

  let bloomed = false;

  function spawnConfetti(count = 22) {
    const emojis = ['🌸', '💗', '✨', '🌷'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'confetti-petal';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.animationDuration = (2.2 + Math.random() * 1.8) + 's';
      el.style.animationDelay = (Math.random() * 0.6) + 's';
      el.style.fontSize = (1 + Math.random() * 1.1) + 'rem';
      petalLayer.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }
  }

  function openPopup() {
    // Content already lives in the DOM via template rendering; this just
    // guarantees it's populated even before bloom, then reveals it.
    popupOverlay.classList.add('show');
  }

  function closePopup() {
    popupOverlay.classList.remove('show');
  }

  if (flowerBtn) {
    flowerBtn.addEventListener('click', () => {
      if (bloomed) return;
      bloomed = true;
      flowerBtn.classList.add('bloomed', 'picked');
      spawnConfetti();
      setTimeout(openPopup, 650); // let the bloom animation finish first
    });
  }

  if (popupClose) popupClose.addEventListener('click', closePopup);
  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) closePopup();
    });
  }

  if (toGalleryBtn) {
    toGalleryBtn.addEventListener('click', () => {
      closePopup();
      document.getElementById('page-gallery').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     INTERFACE 2 — reveal the "next" button once she scrolls
     down to the bottom of the gallery
  --------------------------------------------------------- */
  const revealZone = document.getElementById('reveal-zone');
  if (revealZone && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealZone.classList.add('revealed');
        }
      });
    }, { threshold: 0.4 });
    observer.observe(revealZone);
  } else if (revealZone) {
    revealZone.classList.add('revealed'); // fallback
  }

  if (toSpeechBtn) {
    toSpeechBtn.addEventListener('click', () => {
      document.getElementById('page-speech').scrollIntoView({ behavior: 'smooth' });
      startTypewriter();
    });
  }

  if (backToStart) {
    backToStart.addEventListener('click', () => {
      document.getElementById('page-flower').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     INTERFACE 3 — typewriter speech + ambient floating hearts
  --------------------------------------------------------- */
  const speechEl = document.getElementById('speech-text');
  let typed = false;

  function startTypewriter() {
    if (typed || !speechEl) return;
    typed = true;
    const full = speechEl.dataset.full || '';
    speechEl.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    let i = 0;

    function tick() {
      if (i <= full.length) {
        speechEl.textContent = full.slice(0, i);
        speechEl.appendChild(cursor);
        i += 2; // small batches read faster without feeling instant
        setTimeout(tick, 18);
      } else {
        cursor.remove();
      }
    }
    tick();
  }

  // Also trigger the typewriter if she scrolls to interface 3 any other way
  const speechSection = document.getElementById('page-speech');
  if (speechSection && 'IntersectionObserver' in window) {
    const speechObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startTypewriter();
        }
      });
    }, { threshold: 0.3 });
    speechObserver.observe(speechSection);
  }

  const heartsHost = document.getElementById('floating-hearts');
  if (heartsHost) {
    setInterval(() => {
      const h = document.createElement('span');
      h.textContent = '💗';
      h.style.left = Math.random() * 100 + '%';
      h.style.animationDuration = (6 + Math.random() * 6) + 's';
      h.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
      heartsHost.appendChild(h);
      setTimeout(() => h.remove(), 13000);
    }, 900);
  }
});
