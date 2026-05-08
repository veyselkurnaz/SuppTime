/* SuppTime — Pure JS Logic (No React, No Babel) */
document.addEventListener('DOMContentLoaded', () => {
  const I18N = window.I18N;
  const REVIEWS = window.REVIEWS;

  const LANG_ORDER = ['en','tr','ko','ja','zh-cn','zh-tw','de','es','pt-br','it','nl','pl','ru','id','vi','th','ar'];
  
  // Detection Logic
  function detectInitialLang() {
    const userLangs = navigator.languages || [navigator.language || navigator.userLanguage];
    for (let lang of userLangs) {
      const code = lang.toLowerCase();
      // Match full code (e.g., pt-br)
      if (LANG_ORDER.includes(code)) return code;
      // Match base code (e.g., tr-TR -> tr)
      const base = code.split('-')[0];
      if (LANG_ORDER.includes(base)) return base;
    }
    return 'en'; // Default
  }

  let currentLang = detectInitialLang();

  const ICONS = {
    zap: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/></svg>',
    watch: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6l1-3h4l1 3M9 18l1 3h4l1-3"/></svg>',
    bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10.5 21a1.5 1.5 0 0 0 3 0"/></svg>',
    shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4"/></svg>',
    check: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
    check_dl: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
    star: '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3 7 7 .8-5.3 4.7 1.6 7L12 17.8 5.7 21.5l1.6-7L2 9.8 9 9z"/></svg>'
  };

  const FEATURE_ICONS = ['zap', 'watch', 'bell', 'shield'];

  function shortCode(c) { 
    if (c === 'pt-br') return 'PT';
    if (c === 'zh-cn') return '简';
    if (c === 'zh-tw') return '繁';
    return c.toUpperCase(); 
  }

  // Element Refs
  const langBtn = document.getElementById('lang-btn');
  const langMenu = document.getElementById('lang-menu');
  const currentLangCode = document.getElementById('current-lang-code');

  // DOM Elements to render lists
  const featuresGrid = document.getElementById('features-grid');
  const galleryRow = document.getElementById('gallery-row');
  const watchList = document.getElementById('watch-list');
  const reviewsGrid = document.getElementById('reviews-grid');
  const dlBullets = document.getElementById('dl-bullets');
  const footLinks = document.getElementById('foot-links');

  // Nav Scroll state
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }, { passive: true });

  // Language Menu Toggling
  let langMenuOpen = false;
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenuOpen = !langMenuOpen;
    langMenu.style.display = langMenuOpen ? 'grid' : 'none';
  });
  document.addEventListener('mousedown', (e) => {
    if (langMenuOpen && !langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenuOpen = false;
      langMenu.style.display = 'none';
    }
  });

  // Render Language Menu
  function renderLangMenu() {
    langMenu.innerHTML = '';
    LANG_ORDER.forEach(code => {
      const opt = I18N[code];
      const btn = document.createElement('button');
      btn.className = 'lang-opt' + (code === currentLang ? ' is-active' : '');
      
      let checkIcon = code === currentLang ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>` : '';
      
      btn.innerHTML = `
        <span style="font-family: var(--mono); font-size: 11px; opacity: 0.5; width: 26px;">${shortCode(code)}</span>
        <span>${opt.langName}</span>
        ${checkIcon}
      `;
      
      btn.addEventListener('click', () => {
        setLang(code);
        langMenuOpen = false;
        langMenu.style.display = 'none';
      });
      langMenu.appendChild(btn);
    });
  }

  // Nested property accessor (e.g. "hero.headline_1")
  function getProp(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  // Set Language
  function setLang(lang) {
    currentLang = lang;
    const t = I18N[lang];
    
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir || 'ltr';
    document.body.className = `lang-${lang}`;
    currentLangCode.textContent = shortCode(lang);

    // Update simple text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = getProp(t, el.getAttribute('data-i18n'));
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const val = getProp(t, el.getAttribute('data-i18n-html'));
      if (val !== undefined) el.innerHTML = val.replace(/\n/g, '<br/>');
    });

    // Update Images
    document.querySelectorAll('[data-lang-img]').forEach(img => {
      const num = img.getAttribute('data-lang-img');
      img.src = `screens/${lang}/${num}.jpg`;
      img.onerror = () => { img.src = `screens/en/${num}.jpg`; };
    });

    renderLangMenu();
    renderDynamicLists(t, lang);
  }

  // Render Dynamic Lists
  function renderDynamicLists(t, lang) {
    // 1. Features
    featuresGrid.innerHTML = '';
    t.features.list.forEach((f, i) => {
      const iconHtml = ICONS[FEATURE_ICONS[i]];
      featuresGrid.innerHTML += `
        <article class="feature glass feature-${i}">
          <div class="feature-icon">${iconHtml}</div>
          <div class="feature-body">
            <h3 class="feature-title">${f.title}</h3>
            <p class="feature-desc">${f.desc}</p>
          </div>
        </article>
      `;
    });

    // 2. Gallery
    galleryRow.innerHTML = '';
    [1, 2, 3, 4].forEach((n, i) => {
      galleryRow.innerHTML += `
        <figure class="gallery-card" style="--i: ${i}">
          <img src="screens/${lang}/${n}.jpg" onerror="this.src='screens/en/${n}.jpg'" class="gallery-img" loading="${n > 1 ? 'lazy' : 'eager'}" />
        </figure>
      `;
    });

    // 3. Watch Bullets
    watchList.innerHTML = '';
    t.watch.bullets.forEach(b => {
      watchList.innerHTML += `<li><span class="watch-check">${ICONS.check}</span><span>${b}</span></li>`;
    });

    // 4. FAQ
    const faqList = document.getElementById('faq-list');
    faqList.innerHTML = '';
    const faqItems = (t.faq && t.faq.items) ? t.faq.items : window.I18N.en.faq.items;
    const faqTitle = (t.faq && t.faq.title) ? t.faq.title : window.I18N.en.faq.title;
    
    document.querySelector('[data-i18n="faq.title"]').textContent = faqTitle;
    
    faqItems.forEach(item => {
      faqList.innerHTML += `
        <div class="faq-item">
          <h3 class="faq-q">${item.q}</h3>
          <p class="faq-a">${item.a}</p>
        </div>
      `;
    });

    // 5. Download Bullets
    dlBullets.innerHTML = '';
    t.download_cta.bullets.forEach(b => {
      dlBullets.innerHTML += `<div class="dl-bullet"><span class="dl-bullet-check">${ICONS.check_dl}</span><span>${b}</span></div>`;
    });

    // 7. Social Proof Fallback
    const ratingEl = document.querySelector('[data-i18n="hero.rating"]');
    if (ratingEl) {
      ratingEl.textContent = t.hero.rating || window.I18N.en.hero.rating;
    }
    footLinks.innerHTML = '';
    t.footer.links.forEach((l, i) => {
      let href = '#';
      if (i === 0) href = 'privacy.html';
      if (i === 2) href = 'mailto:veyselkurnaz@icloud.com';
      footLinks.innerHTML += `<a href="${href}">${l}</a>`;
    });

    // 6. Reviews (3-Row Ticker logic)
    const row1 = document.getElementById('reviews-row-1');
    const row2 = document.getElementById('reviews-row-2');
    const row3 = document.getElementById('reviews-row-3');
    
    if (!row1 || !row2 || !row3) return;
    
    row1.innerHTML = row2.innerHTML = row3.innerHTML = '';
    
    const chunks = [
      REVIEWS.slice(0, 10),
      REVIEWS.slice(10, 20),
      REVIEWS.slice(20, 30)
    ];

    function createReviewCard(r) {
      const qLang = r.country === 'Korea' ? 'ko' : r.country === 'Japan' ? 'ja' : r.country === 'Germany' ? 'de' : r.country === 'Brazil' ? 'pt' : r.country === 'Turkey' ? 'tr' : r.country === 'Indonesia' ? 'id' : r.country === 'Spain' ? 'es' : r.country === 'Thailand' ? 'th' : r.country === 'France' ? 'fr' : r.country === 'Italy' ? 'it' : r.country === 'Russia' ? 'ru' : r.country === 'Poland' ? 'pl' : r.country === 'Sweden' ? 'sv' : r.country === 'UAE' ? 'ar' : r.country === 'China' ? 'zh' : 'en';
      let starsHtml = '';
      for(let s=0; s<5; s++) starsHtml += ICONS.star;
      
      return `
        <article class="review glass">
          <div class="review-head">
            <span class="review-flag" aria-hidden="true">${r.flag}</span>
            <div class="review-meta">
              <div class="review-name">${r.name}</div>
              <div class="review-role">${r.role}</div>
            </div>
            <span class="review-stars">${starsHtml}</span>
          </div>
          <p class="review-quote" lang="${qLang}">${r.quote}</p>
          <div class="review-foot">
            <span class="review-country">${r.country.toUpperCase()}</span>
          </div>
        </article>
      `;
    }

    chunks.forEach((chunk, idx) => {
      const container = [row1, row2, row3][idx];
      const html = chunk.map(createReviewCard).join('');
      container.innerHTML = html + html; // Duplicate for loop
    });
  }

  // Init
  setLang(currentLang);
});
