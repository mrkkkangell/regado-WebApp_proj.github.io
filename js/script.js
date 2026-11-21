/* =========================================================================
 * script.js — Yu-Gi-Oh! Website Recreation
 * ITE17 – Web Application Development 1 | Final Project
 * =========================================================================
 * Comprehensive front-end behavior:
 *  1. Core Utilities & Storage Persistence
 *  2. Shared Components (Nav, Offcanvas, Modals, Toasts)
 *  3. Home Page (Split-Screen Hero Carousel & Content Grids)
 *  4. Series Page
 *  5. Watch Page (Promo Carousel, Filter Bar & 4-Col Grid)
 *  6. Characters Page (One-at-a-Time Hero, State A & State B Detail)
 *  7. Cards Page (One-at-a-Time Hero, State A & State B Detail)
 *  8. News Page (3-Col Grid & Pagination)
 *  9. Page-to-Page Navigation & Hash Routing
 * ========================================================================= */

(function () {
  'use strict';

  /* ===== 1. CORE UTILITIES & STORAGE PERSISTENCE ===== */

  // Safe localStorage helper with memory fallback
  const memoryStore = {};
  const storage = {
    get: function (key, defaultVal) {
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : defaultVal;
      } catch (e) {
        return memoryStore[key] !== undefined ? memoryStore[key] : defaultVal;
      }
    },
    set: function (key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {
        memoryStore[key] = val;
      }
    }
  };

  // State keys
  const KEY_DECK = 'ygo_deck';
  const KEY_WATCHLIST = 'ygo_watchlist';
  const KEY_USER = 'ygo_user';

  // Global app state
  const AppState = {
    deck: storage.get(KEY_DECK, []),
    watchlist: storage.get(KEY_WATCHLIST, []),
    user: storage.get(KEY_USER, null),
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  /** Render 5-dot level indicator */
  function renderLevelDots(level) {
    let html = '<div class="level-dots" aria-label="Level ' + level + '">';
    for (let i = 1; i <= 5; i++) {
      html += '<span class="level-dot' + (i <= level ? ' filled' : '') + '"></span>';
    }
    html += '</div>';
    return html;
  }

  /** Display Bootstrap Toast */
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toastEl = document.createElement('div');
    toastEl.className = 'toast ygo-toast align-items-center show';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML =
      '<div class="d-flex justify-content-between align-items-center toast-body">' +
      '<span>' + message + '</span>' +
      '<button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast" aria-label="Close"></button>' +
      '</div>';

    container.appendChild(toastEl);

    setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => toastEl.remove(), 250);
    }, 2200);

    const closeBtn = toastEl.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => toastEl.remove());
    }
  }

  /** Update floating My Deck badge */
  function updateDeckBadge() {
    const badges = document.querySelectorAll('.deck-badge-count');
    const badgeBtn = document.querySelector('.deck-badge');
    const count = AppState.deck.length;

    badges.forEach(b => {
      b.textContent = count;
    });

    if (badgeBtn) {
      badgeBtn.classList.remove('bump');
      // Trigger reflow to restart animation
      void badgeBtn.offsetWidth;
      badgeBtn.classList.add('bump');
    }

    renderDeckOffcanvas();
  }

  /** Toggle Card in My Deck */
  function toggleDeckCard(slug, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const idx = AppState.deck.indexOf(slug);
    const cardName = getNameBySlug(slug);

    if (idx > -1) {
      AppState.deck.splice(idx, 1);
      showToast(cardName + ' removed from My Deck');
    } else {
      AppState.deck.push(slug);
      showToast(cardName + ' added to My Deck');
    }

    storage.set(KEY_DECK, AppState.deck);
    updateDeckBadge();
    updateSaveButtonStates();
  }

  /** Toggle Episode in Watchlist */
  function toggleWatchlistEpisode(slug, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const idx = AppState.watchlist.indexOf(slug);
    const ep = EPISODES.find(e => e.slug === slug);
    const epTitle = ep ? ep.title : slug;

    if (idx > -1) {
      AppState.watchlist.splice(idx, 1);
      showToast(epTitle + ' removed from Watchlist');
    } else {
      AppState.watchlist.push(slug);
      showToast(epTitle + ' added to Watchlist');
    }

    storage.set(KEY_WATCHLIST, AppState.watchlist);
    updateSaveButtonStates();
  }

  /** Update all save button visual states (+ vs checkmark) */
  function updateSaveButtonStates() {
    document.querySelectorAll('[data-save-card]').forEach(btn => {
      const slug = btn.getAttribute('data-save-card');
      const isSaved = AppState.deck.includes(slug);
      btn.classList.toggle('is-saved', isSaved);
      btn.setAttribute('aria-label', isSaved ? 'Remove from My Deck' : 'Add to My Deck');
      btn.innerHTML = isSaved ? '&#10003;' : '+';
    });

    document.querySelectorAll('[data-save-episode]').forEach(btn => {
      const slug = btn.getAttribute('data-save-episode');
      const isSaved = AppState.watchlist.includes(slug);
      btn.classList.toggle('is-saved', isSaved);
      btn.setAttribute('aria-label', isSaved ? 'Remove from Watchlist' : 'Add to Watchlist');
      btn.innerHTML = isSaved ? '&#10003;' : '+';
    });
  }

  /* ===== 2. SHARED COMPONENTS (NAV, OFFCANVAS, MODALS) ===== */

  function initSharedComponents() {
    // 1. Deck badge click
    const deckBadge = document.querySelector('.deck-badge');
    const deckOffcanvasEl = document.getElementById('deckOffcanvas');
    if (deckBadge && deckOffcanvasEl && window.bootstrap) {
      const bsOffcanvas = new bootstrap.Offcanvas(deckOffcanvasEl);
      deckBadge.addEventListener('click', () => bsOffcanvas.show());
    }

    // 2. Login state & modal
    const loginLink = document.querySelector('.ygo-login-link');
    const loginModalEl = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');

    function updateLoginUI() {
      if (!loginLink) return;
      if (AppState.user && AppState.user.loggedIn) {
        loginLink.innerHTML =
          '<span class="ygo-greeting">Hello, ' + (AppState.user.name || 'Duelist') + '!</span> <a href="#" id="logoutBtn" style="color:#aaa;text-decoration:none;">(Logout)</a>';
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AppState.user = null;
            storage.set(KEY_USER, null);
            updateLoginUI();
            showToast('Logged out successfully');
          });
        }
      } else {
        loginLink.innerHTML = '<a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" style="color:var(--nav-link);text-decoration:none;">Login</a>';
      }
    }
    updateLoginUI();

    if (loginForm && loginModalEl && window.bootstrap) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim() || 'Duelist';
        AppState.user = { loggedIn: true, name: username };
        storage.set(KEY_USER, AppState.user);
        updateLoginUI();
        const modalInstance = bootstrap.Modal.getInstance(loginModalEl);
        if (modalInstance) modalInstance.hide();
        showToast('Welcome back, ' + username + '!');
      });
    }

    // 3. Clear deck button
    const clearDeckBtn = document.getElementById('clearDeckBtn');
    if (clearDeckBtn) {
      clearDeckBtn.addEventListener('click', () => {
        AppState.deck = [];
        storage.set(KEY_DECK, []);
        updateDeckBadge();
        updateSaveButtonStates();
        showToast('My Deck cleared');
      });
    }

    updateDeckBadge();
    updateSaveButtonStates();
  }

  /** Render cards inside My Deck Offcanvas */
  function renderDeckOffcanvas() {
    const listEl = document.getElementById('deckList');
    if (!listEl) return;

    if (AppState.deck.length === 0) {
      listEl.innerHTML = '<li class="deck-empty-msg">No cards saved yet. Click the + on any card to add it to your deck!</li>';
      return;
    }

    let html = '';
    AppState.deck.forEach((slug, idx) => {
      const card = CARDS.find(c => c.slug === slug);
      const name = card ? card.name : getNameBySlug(slug);
      html +=
        '<li class="deck-list-item show" style="transition-delay:' + (idx * 40) + 'ms">' +
        '<a href="cards.html#card=' + slug + '">' + name + '</a>' +
        '<button type="button" class="deck-remove-btn" data-remove-deck="' + slug + '" aria-label="Remove ' + name + '">&times;</button>' +
        '</li>';
    });
    listEl.innerHTML = html;

    listEl.querySelectorAll('[data-remove-deck]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const slug = btn.getAttribute('data-remove-deck');
        toggleDeckCard(slug, e);
      });
    });
  }

  /** Open Episode Player Modal */
  function openEpisodeModal(slug) {
    const ep = EPISODES.find(e => e.slug === slug);
    if (!ep) return;

    const modalEl = document.getElementById('episodePlayerModal');
    if (!modalEl || !window.bootstrap) return;

    const titleEl = modalEl.querySelector('.modal-title');
    const infoEl = modalEl.querySelector('.episode-modal-info');
    const posterImg = modalEl.querySelector('.episode-player-poster');
    const playBtn = modalEl.querySelector('.episode-player-play-btn');

    if (titleEl) titleEl.textContent = ep.title;
    if (infoEl) {
      infoEl.innerHTML =
        '<div><strong>Series:</strong> ' + ep.series + ' | <strong>Season:</strong> ' + ep.season + ' | <strong>Episode:</strong> ' + ep.number + '</div>' +
        '<div><strong>Duration:</strong> ' + ep.duration + '</div>';
    }
    if (posterImg) {
      posterImg.src = imgPath('episodes', ep.slug, 'jpg');
      posterImg.alt = ep.title;
    }

    if (playBtn) {
      playBtn.classList.remove('pulse');
      void playBtn.offsetWidth;
      playBtn.classList.add('pulse');

      playBtn.onclick = function () {
        const playerArea = modalEl.querySelector('.episode-player-area');
        if (ep.video) {
          playerArea.innerHTML = '<video controls autoplay style="width:100%;height:100%;"><source src="' + ep.video + '" type="video/mp4">Your browser does not support video.</video>';
        } else {
          showToast('Streaming preview: ' + ep.title);
        }
      };
    }

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  /* ===== 3. HOME PAGE (HERO CAROUSEL & CONTENT) ===== */

  function initHomePage() {
    const heroEl = document.querySelector('.home-hero');
    if (!heroEl) return;

    let currentSlide = 0;
    const totalSlides = HERO_SLIDES.length;
    let timer = null;
    let isTransitioning = false;
    let progressStartTime = 0;
    let progressElapsed = 0;
    let isPaused = false;

    const titleEl = heroEl.querySelector('.hero-title');
    const summaryEl = heroEl.querySelector('.hero-summary');
    const btnEl = heroEl.querySelector('.hero-inspect-btn');
    const badgeNumEl = heroEl.querySelector('.hero-rail-badge-num');
    const counterEl = heroEl.querySelector('.hero-rail-counter');
    const previewCards = heroEl.querySelectorAll('.hero-preview-card');
    const progressFill = heroEl.querySelector('.hero-progress-fill');
    const prevBtn = heroEl.querySelector('.hero-prev-btn');
    const nextBtn = heroEl.querySelector('.hero-next-btn');

    function renderSlide(index) {
      const slide = HERO_SLIDES[index];

      // 1. Background hue cross-fade
      heroEl.style.background = 'radial-gradient(circle at 70% 40%, hsl(' + slide.hue + ' 55% 13%), #04060b 65%)';

      // 2. Rail badge vertical roll
      if (badgeNumEl) {
        badgeNumEl.classList.remove('roll-in');
        badgeNumEl.classList.add('roll-out');
        setTimeout(() => {
          badgeNumEl.textContent = index + 1;
          badgeNumEl.classList.remove('roll-out');
          badgeNumEl.classList.add('roll-in');
        }, 150);
      }

      // Slide counter
      if (counterEl) {
        counterEl.style.opacity = '0';
        setTimeout(() => {
          counterEl.textContent = '0' + (index + 1) + '/0' + totalSlides;
          counterEl.style.opacity = '1';
        }, 150);
      }

      // 3. Staggered text swap (fade out 200ms, swap, fade in translateY(16px to 0) 450ms)
      if (titleEl && summaryEl && btnEl) {
        titleEl.classList.remove('show');
        summaryEl.classList.remove('show');
        btnEl.classList.remove('show');

        setTimeout(() => {
          titleEl.textContent = slide.title;
          summaryEl.textContent = slide.summary;
          btnEl.href = 'cards.html#card=' + slide.slug;

          titleEl.classList.add('show');
          summaryEl.classList.add('show');
          btnEl.classList.add('show');
        }, 200);
      }

      // 4. Preview strip rotation (3 cards: current, next, next+1)
      previewCards.forEach((card, pos) => {
        const slideIdx = (index + pos) % totalSlides;
        const s = HERO_SLIDES[slideIdx];
        const img = card.querySelector('img');
        const label = card.querySelector('.preview-label');

        if (pos === 0) {
          card.classList.add('hero-preview-active');
        } else {
          card.classList.remove('hero-preview-active');
        }

        if (img) {
          img.src = imgPath('cards', s.slug, 'jpg');
          img.alt = s.title;
        }
        if (label) {
          label.textContent = s.title;
        }
        card.setAttribute('data-slide-target', slideIdx);
      });

      // 5. Restart linear progress bar
      if (progressFill && !AppState.prefersReducedMotion) {
        progressFill.classList.remove('animate', 'paused');
        progressFill.style.width = '0%';
        void progressFill.offsetWidth; // reflow
        progressFill.classList.add('animate');
        progressStartTime = Date.now();
        progressElapsed = 0;
      }
    }

    function goToSlide(targetIdx) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = (targetIdx + totalSlides) % totalSlides;
      renderSlide(currentSlide);

      setTimeout(() => {
        isTransitioning = false;
      }, 700);
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoplay() {
      if (AppState.prefersReducedMotion) return;
      stopAutoplay();
      timer = setInterval(nextSlide, 4500);
    }

    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Attach listeners
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });

    // Preview clicks jump to target slide
    previewCards.forEach(card => {
      card.addEventListener('click', () => {
        const target = parseInt(card.getAttribute('data-slide-target'), 10);
        if (!isNaN(target)) {
          goToSlide(target);
          startAutoplay();
        }
      });
    });

    // Pause on hover & focus
    heroEl.addEventListener('mouseenter', () => {
      isPaused = true;
      stopAutoplay();
      if (progressFill) {
        const computedWidth = window.getComputedStyle(progressFill).width;
        progressFill.style.width = computedWidth;
        progressFill.classList.remove('animate');
        progressFill.classList.add('paused');
      }
    });

    heroEl.addEventListener('mouseleave', () => {
      if (!isPaused) return;
      isPaused = false;
      if (progressFill && !AppState.prefersReducedMotion) {
        progressFill.classList.remove('paused');
        progressFill.classList.add('animate');
      }
      startAutoplay();
    });

    // Keyboard navigation (with e.preventDefault() to prevent screen adjustment)
    heroEl.setAttribute('tabindex', '0');
    function handleHomeKeyNav(e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        startAutoplay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        startAutoplay();
      }
    }
    window.addEventListener('keydown', handleHomeKeyNav);

    // Initial render
    renderSlide(0);
    startAutoplay();

    // Render Home News Rows (6 rows)
    const newsContainer = document.getElementById('homeNewsList');
    if (newsContainer) {
      let newsHtml = '';
      NEWS.slice(0, 6).forEach(n => {
        newsHtml +=
          '<a href="news.html#' + n.slug + '" class="home-news-row">' +
          '<img src="' + imgPath('news', n.slug, 'jpg') + '" alt="' + n.title + '" width="130" height="54" loading="lazy" class="home-news-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="home-news-info">' +
          '<div class="home-news-title">' + n.title + '</div>' +
          '<div class="home-news-date">' + n.date + ' | ' + n.time + '</div>' +
          '<div class="home-news-excerpt">' + n.excerpt + '</div>' +
          '</div>' +
          '</a>';
      });
      newsContainer.innerHTML = newsHtml;
    }

    // Render Home Episodes Grid (first 5 episodes)
    const episodesContainer = document.getElementById('homeEpisodesGrid');
    if (episodesContainer) {
      let epHtml = '';
      EPISODES.slice(0, 5).forEach(ep => {
        epHtml +=
          '<div class="white-tile" data-open-episode="' + ep.slug + '">' +
          '<img src="' + imgPath('episodes', ep.slug, 'jpg') + '" alt="' + ep.title + '" width="170" height="96" loading="lazy" class="white-tile-img episode-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="white-tile-body">' +
          '<div class="white-tile-meta">' + ep.series + ' S:' + ep.season + ' Ep:' + ep.number + ' | ' + ep.duration + '</div>' +
          '<div class="white-tile-title">' + ep.title + '</div>' +
          '</div>' +
          '</div>';
      });
      episodesContainer.innerHTML = epHtml;

      episodesContainer.querySelectorAll('[data-open-episode]').forEach(tile => {
        tile.addEventListener('click', () => {
          openEpisodeModal(tile.getAttribute('data-open-episode'));
        });
      });
    }

    // Render Home Characters List (right column, 9 stacked rows)
    const charsContainer = document.getElementById('homeCharsList');
    if (charsContainer) {
      let charHtml = '';
      CHARACTERS.slice(0, 9).forEach(ch => {
        charHtml +=
          '<a href="characters.html#character=' + ch.slug + '" class="home-char-row">' +
          '<img src="' + imgPath('characters', ch.slug, 'png') + '" alt="' + ch.name + '" width="44" height="44" loading="lazy" class="home-char-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="home-char-name">' + ch.name + '</div>' +
          '</a>';
      });
      charsContainer.innerHTML = charHtml;
    }

    // Render Home Cards Grid (right column, 5 cards in 2 columns)
    const cardsContainer = document.getElementById('homeCardsGrid');
    if (cardsContainer) {
      let cardsHtml = '';
      CARDS.slice(0, 5).forEach(cd => {
        cardsHtml +=
          '<a href="cards.html#card=' + cd.slug + '" class="white-tile" style="text-decoration:none;color:inherit;">' +
          '<img src="' + imgPath('cards', cd.slug, 'jpg') + '" alt="' + cd.name + '" width="125" height="125" loading="lazy" class="white-tile-img" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="white-tile-body">' +
          '<div class="white-tile-name">' + cd.name + '</div>' +
          '</div>' +
          '</a>';
      });
      cardsContainer.innerHTML = cardsHtml;
    }
  }

  /* ===== 4. SERIES PAGE ===== */

  function initSeriesPage() {
    const listEl = document.getElementById('seriesList');
    if (!listEl) return;

    let html = '';
    SERIES_DATA.forEach(s => {
      html +=
        '<div class="series-row">' +
        '<img src="' + imgPath('series', s.slug, 'jpg') + '" alt="' + s.title + '" width="206" height="102" loading="lazy" class="series-banner" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
        '<div class="series-info">' +
        '<h2 class="series-title">' + s.title + '</h2>' +
        '<div class="series-tagline">' + s.tagline + '</div>' +
        '<div class="series-desc">' + s.description + '</div>' +
        '<a href="watch.html#series=' + s.slug + '" class="series-discover">Discover More &rarr;</a>' +
        '</div>' +
        '</div>';
    });
    listEl.innerHTML = html;
  }

  /* ===== 5. WATCH PAGE ===== */

  function initWatchPage() {
    const gridEl = document.getElementById('episodesGrid');
    if (!gridEl) return;

    let currentPage = 1;
    const perPage = 12;
    let activeFilter = 'all';
    let searchQuery = '';
    let isPaging = false;

    // Render Watch promo banners
    const bannersRow = document.getElementById('watchBannersRow');
    if (bannersRow) {
      let bHtml = '';
      WATCH_BANNERS.forEach(b => {
        bHtml +=
          '<div class="watch-banner">' +
          '<img src="' + imgPath('banners', b.slug, 'jpg') + '" alt="' + b.title + '" width="240" height="174" class="watch-banner-img" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="watch-banner-text">' +
          '<h3 class="watch-banner-title">' + b.title + '</h3>' +
          '<div class="watch-banner-subtitle">' + b.subtitle + '</div>' +
          '<a href="' + b.link + '" class="watch-banner-link">LEARN MORE &rarr;</a>' +
          '</div>' +
          '</div>';
      });
      bannersRow.innerHTML = bHtml;
    }

    function getFilteredEpisodes() {
      return EPISODES.filter(ep => {
        const matchesFilter = activeFilter === 'all' || ep.seriesSlug === activeFilter ||
          (activeFilter === 'english' && true);
        const matchesSearch = !searchQuery ||
          ep.title.toLowerCase().includes(searchQuery) ||
          ep.series.toLowerCase().includes(searchQuery);
        return matchesFilter && matchesSearch;
      });
    }

    function renderEpisodesGrid() {
      const filtered = getFilteredEpisodes();
      const totalPages = Math.ceil(filtered.length / perPage) || 1;
      if (currentPage > totalPages) currentPage = totalPages;

      const start = (currentPage - 1) * perPage;
      const pageItems = filtered.slice(start, start + perPage);

      if (pageItems.length === 0) {
        gridEl.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:#888; font-size:14px;">No episodes found.</div>';
        renderPagination(totalPages);
        return;
      }

      let html = '';
      pageItems.forEach((ep, idx) => {
        const isSaved = AppState.watchlist.includes(ep.slug);
        html +=
          '<div class="white-tile tile-stagger" style="position:relative; transition-delay:' + (idx * 20) + 'ms;" data-open-ep="' + ep.slug + '">' +
          '<button type="button" class="white-tile-save' + (isSaved ? ' is-saved' : '') + '" data-save-episode="' + ep.slug + '" aria-label="' + (isSaved ? 'Remove from Watchlist' : 'Save to Watchlist') + '">' +
          (isSaved ? '&#10003;' : '+') +
          '</button>' +
          '<img src="' + imgPath('episodes', ep.slug, 'jpg') + '" alt="' + ep.title + '" width="200" height="112" loading="lazy" class="white-tile-img episode-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="white-tile-body">' +
          '<div class="white-tile-meta">' + ep.series + ' S:' + ep.season + ' Ep:' + ep.number + ' | ' + ep.duration + '</div>' +
          '<div class="white-tile-title">' + ep.title + '</div>' +
          '</div>' +
          '</div>';
      });
      gridEl.innerHTML = html;

      // Attach event listeners
      gridEl.querySelectorAll('[data-open-ep]').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('[data-save-episode]')) return;
          openEpisodeModal(card.getAttribute('data-open-ep'));
        });
      });

      gridEl.querySelectorAll('[data-save-episode]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          toggleWatchlistEpisode(btn.getAttribute('data-save-episode'), e);
        });
      });

      // Animate cards entrance
      requestAnimationFrame(() => {
        gridEl.querySelectorAll('.tile-stagger').forEach(t => t.classList.add('show'));
      });

      renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
      const pagContainer = document.getElementById('watchPagination');
      if (!pagContainer) return;

      let html = '';
      for (let p = 1; p <= totalPages; p++) {
        html += '<button type="button" class="page-box' + (p === currentPage ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
      }
      if (totalPages > 1) {
        html += '<button type="button" class="page-box' + (currentPage === totalPages ? ' disabled' : '') + '" data-page="next">&gt;</button>';
      }
      pagContainer.innerHTML = html;

      pagContainer.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (isPaging) return;
          const target = btn.getAttribute('data-page');
          let newPage = currentPage;
          if (target === 'next') {
            newPage = Math.min(currentPage + 1, totalPages);
          } else {
            newPage = parseInt(target, 10);
          }

          if (newPage !== currentPage) {
            transitionToPage(newPage);
          }
        });
      });
    }

    function transitionToPage(newPage) {
      if (isPaging) return;
      isPaging = true;
      gridEl.setAttribute('aria-busy', 'true');
      gridEl.classList.add('grid-fading-out');

      setTimeout(() => {
        currentPage = newPage;
        renderEpisodesGrid();
        gridEl.classList.remove('grid-fading-out');
        gridEl.setAttribute('aria-busy', 'false');
        isPaging = false;

        // Smooth scroll to grid if top is above viewport
        const rect = gridEl.getBoundingClientRect();
        if (rect.top < 52) {
          window.scrollTo({
            top: window.scrollY + rect.top - 60,
            behavior: 'smooth'
          });
        }

        // Update URL hash without refresh
        history.replaceState(null, '', '#page=' + currentPage);
      }, 180);
    }

    // Filter bar clicks
    const filterButtons = document.querySelectorAll('#watchFilterBar .filter-item');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        currentPage = 1;
        transitionToPage(1);
      });
    });

    // Search input (debounced 250ms)
    const searchInput = document.getElementById('watchSearchInput');
    let searchDebounce = null;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
          searchQuery = e.target.value.toLowerCase().trim();
          currentPage = 1;
          transitionToPage(1);
        }, 250);
      });
    }

    // Parse URL hash for series filter or page
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    if (params.has('series')) {
      const s = params.get('series');
      activeFilter = s;
      filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === s) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
    if (params.has('page')) {
      currentPage = parseInt(params.get('page'), 10) || 1;
    }

    renderEpisodesGrid();
  }

  /* ===== 6. CHARACTERS PAGE (TWO STATES: BROWSE & VIEW BIO) ===== */

  function initCharactersPage() {
    const heroEl = document.querySelector('.character-hero');
    if (!heroEl) return;

    let characterList = [...CHARACTERS];
    let currentIndex = 0;
    let isTransitioning = false;
    let storedScrollPos = 0;
    let state = 'A'; // 'A' = Browse, 'B' = Detail

    // Hero element references
    const cardContainer = heroEl.querySelector('.item-hero-card-col');
    const tagEl = heroEl.querySelector('.item-hero-tag');
    const titleEl = heroEl.querySelector('.item-hero-title');
    const descEl = heroEl.querySelector('.item-hero-desc');
    const viewBioBtn = heroEl.querySelector('.item-hero-btn');
    const dotsContainer = heroEl.querySelector('.item-hero-dots');
    const prevBtn = heroEl.querySelector('.item-hero-prev-btn');
    const nextBtn = heroEl.querySelector('.item-hero-next-btn');
    const progressFill = heroEl.querySelector('.item-progress-fill');
    const counterEl = heroEl.querySelector('.item-progress-counter');
    const detailPanel = document.getElementById('characterDetailPanel');
    const browseGridSection = document.getElementById('characterBrowseSection');
    const gridEl = document.getElementById('charactersGrid');

    function renderHeroCard(direction) {
      const ch = characterList[currentIndex];
      if (!ch) return;

      const total = characterList.length;
      const isSaved = AppState.deck.includes(ch.slug);

      // Card exit / enter
      const oldCard = cardContainer.querySelector('.portrait-card-hero');
      if (oldCard) {
        oldCard.classList.add(direction === 'next' ? 'exiting' : 'exiting-reverse');
      }

      setTimeout(() => {
        cardContainer.innerHTML =
          '<div class="portrait-card portrait-card-hero entering-left">' +
          '<div class="portrait-card-header">' +
          '<span class="portrait-card-name">' + ch.name + '</span>' +
          renderLevelDots(ch.level) +
          '</div>' +
          '<div class="portrait-card-img-wrap">' +
          '<button type="button" class="save-btn' + (isSaved ? ' is-saved' : '') + '" data-save-card="' + ch.slug + '" aria-label="' + (isSaved ? 'Remove from Deck' : 'Add to Deck') + '">' +
          (isSaved ? '&#10003;' : '+') +
          '</button>' +
          '<img src="' + imgPath('characters', ch.slug, 'png') + '" alt="' + ch.name + '" width="340" height="480" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="portrait-card-caption">' + ch.series + '</div>' +
          '</div>' +
          '</div>';

        // Attach save button listener
        const saveBtn = cardContainer.querySelector('.save-btn');
        if (saveBtn) {
          saveBtn.addEventListener('click', (e) => toggleDeckCard(ch.slug, e));
        }
      }, oldCard ? 200 : 0);

      // Update text block
      if (tagEl && titleEl && descEl) {
        tagEl.classList.remove('show');
        titleEl.classList.remove('show');
        descEl.classList.remove('show');

        setTimeout(() => {
          const curNum = (currentIndex + 1 < 10 ? '0' : '') + (currentIndex + 1);
          const totNum = (total < 10 ? '0' : '') + total;
          tagEl.textContent = 'DUELIST ' + curNum + '/' + totNum;
          titleEl.textContent = ch.name;
          descEl.textContent = ch.description;

          tagEl.classList.add('show');
          titleEl.classList.add('show');
          descEl.classList.add('show');
        }, 150);
      }

      // Update dots (scroll only container, never the page)
      if (dotsContainer) {
        dotsContainer.innerHTML = characterList.map((_, i) =>
          '<button type="button" class="item-dot' + (i === currentIndex ? ' active' : '') + '" data-dot-idx="' + i + '" aria-label="Go to character ' + (i + 1) + '"></button>'
        ).join('');

        const activeDot = dotsContainer.querySelector('.item-dot.active');
        if (activeDot && dotsContainer) {
          const scrollTarget = activeDot.offsetLeft - (dotsContainer.clientWidth / 2) + (activeDot.clientWidth / 2);
          dotsContainer.scrollTo({ left: scrollTarget, behavior: 'smooth' });
        }

        dotsContainer.querySelectorAll('.item-dot').forEach(dot => {
          dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-dot-idx'), 10);
            if (idx !== currentIndex) {
              goToCharacter(idx, idx > currentIndex ? 'next' : 'prev');
            }
          });
        });
      }

      // Update progress bar
      if (progressFill) {
        const pct = ((currentIndex + 1) / total) * 100;
        progressFill.style.width = pct + '%';
      }
      if (counterEl) {
        const curNum = (currentIndex + 1 < 10 ? '0' : '') + (currentIndex + 1);
        const totNum = (total < 10 ? '0' : '') + total;
        counterEl.textContent = curNum + ' —— ' + totNum;
      }

      // Highlight active grid card in State A
      if (gridEl) {
        gridEl.querySelectorAll('.white-tile').forEach(tile => {
          if (tile.getAttribute('data-slug') === ch.slug) {
            tile.classList.add('selected');
          } else {
            tile.classList.remove('selected');
          }
        });
      }
    }

    function goToCharacter(index, direction) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex = (index + characterList.length) % characterList.length;
      renderHeroCard(direction);

      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToCharacter(currentIndex - 1, 'prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => goToCharacter(currentIndex + 1, 'next'));

    // Keyboard support (prevent horizontal window shift)
    heroEl.setAttribute('tabindex', '0');
    function handleCharKeyNav(e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToCharacter(currentIndex - 1, 'prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToCharacter(currentIndex + 1, 'next');
      }
    }
    window.addEventListener('keydown', handleCharKeyNav);

    // Series Pills filtering
    const seriesPills = document.querySelectorAll('.series-pill');
    seriesPills.forEach(pill => {
      pill.addEventListener('click', () => {
        seriesPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-series');

        if (filter === 'all') {
          characterList = [...CHARACTERS];
        } else {
          characterList = CHARACTERS.filter(c => c.seriesSlug === filter);
          if (characterList.length === 0) characterList = [...CHARACTERS];
        }
        currentIndex = 0;
        goToCharacter(0, 'next');
        renderCharacterGrid();
      });
    });

    // Render Browse Grid (State A)
    function renderCharacterGrid() {
      if (!gridEl) return;
      let html = '';
      characterList.forEach((ch, idx) => {
        html +=
          '<div class="white-tile tile-stagger' + (idx === currentIndex ? ' selected' : '') + '" data-slug="' + ch.slug + '" style="transition-delay:' + (idx * 15) + 'ms;">' +
          '<img src="' + imgPath('characters', ch.slug, 'png') + '" alt="' + ch.name + '" width="132" height="190" loading="lazy" class="white-tile-img char-portrait" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="white-tile-body">' +
          '<div class="white-tile-name">' + ch.name + '</div>' +
          '</div>' +
          '</div>';
      });
      gridEl.innerHTML = html;

      gridEl.querySelectorAll('.white-tile').forEach((tile, i) => {
        tile.addEventListener('click', () => {
          goToCharacter(i, i > currentIndex ? 'next' : 'prev');
          // Smooth scroll to hero
          window.scrollTo({
            top: heroEl.offsetTop - 52,
            behavior: 'smooth'
          });
        });
      });

      requestAnimationFrame(() => {
        gridEl.querySelectorAll('.tile-stagger').forEach(t => t.classList.add('show'));
      });
    }

    // STATE B: View Bio Detail Panel
    function openDetailPanel(characterSlug, isDeepLink) {
      const ch = CHARACTERS.find(c => c.slug === characterSlug) || characterList[currentIndex];
      if (!ch) return;

      // Sync carousel index to this character
      const targetIdx = characterList.findIndex(c => c.slug === ch.slug);
      if (targetIdx > -1 && targetIdx !== currentIndex) {
        currentIndex = targetIdx;
        renderHeroCard('next');
      }

      state = 'B';
      if (!isDeepLink) {
        storedScrollPos = window.scrollY;
      }

      // Check mobile (<768px): open modal instead
      if (window.innerWidth < 768) {
        openDuelistBioModal(ch);
        return;
      }

      if (!detailPanel) return;

      // Build 3-column detail HTML
      const nicknamesStr = ch.nicknames.join(', ') || 'None';
      const alliesHtml = ch.allies.map(slug =>
        '<a href="characters.html#character=' + slug + '" class="detail-mini-card" data-slug="' + slug + '">' +
        '<img src="' + imgPath('characters', slug, 'png') + '" alt="' + getNameBySlug(slug) + '" width="44" height="44" class="detail-mini-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
        '<span class="detail-mini-name">' + getNameBySlug(slug) + '</span>' +
        '</a>'
      ).join('') || '<span style="color:#888;">None</span>';

      const relativesHtml = ch.relatives.map(slug =>
        '<div class="detail-mini-card">' +
        '<img src="' + imgPath('characters', slug, 'png') + '" alt="' + getNameBySlug(slug) + '" width="44" height="44" class="detail-mini-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
        '<span class="detail-mini-name">' + getNameBySlug(slug) + '</span>' +
        '</div>'
      ).join('') || '<span style="color:#888;">None</span>';

      // Associated episodes
      const epObjects = EPISODES.filter(ep => ep.characters.includes(ch.slug) || ch.episodes.includes(ep.slug));
      let episodesHtml = '';
      if (epObjects.length > 0) {
        epObjects.forEach((ep, idx) => {
          const cardsHtml = ep.cards.map(cdSlug =>
            '<a href="cards.html#card=' + cdSlug + '" class="detail-assoc-link">' + getNameBySlug(cdSlug) + '</a>'
          ).join('') || '<span style="color:#888;">No cards listed</span>';

          episodesHtml +=
            '<div class="detail-episode-row show" style="transition-delay:' + (idx * 70) + 'ms;">' +
            '<div class="detail-episode-thumb-wrap" data-open-ep="' + ep.slug + '">' +
            '<img src="' + imgPath('episodes', ep.slug, 'jpg') + '" alt="' + ep.title + '" width="200" height="150" class="detail-episode-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
            '<div class="detail-episode-play">&#9658;</div>' +
            '</div>' +
            '<div class="detail-episode-info">' +
            '<h3 class="detail-episode-title">' + ep.title + '</h3>' +
            '<div class="detail-episode-series">' + ep.series + '</div>' +
            '<div class="detail-episode-meta">Season: ' + ep.season + ' | Episode: ' + ep.number + ' | Duration: ' + ep.duration + '</div>' +
            '</div>' +
            '<div class="detail-episode-divider"></div>' +
            '<div class="detail-episode-assoc">' +
            '<div class="detail-assoc-title">Cards associated with character in this episode:</div>' +
            cardsHtml +
            '</div>' +
            '</div>';
        });
      } else {
        episodesHtml = '<div style="padding:20px; background:#fff; border-radius:6px; color:#888;">No associated episodes listed.</div>';
      }

      // Signature cards grid at bottom of detail panel
      let allCharsGridHtml = '';
      CHARACTERS.slice(0, 8).forEach(c => {
        const isSaved = AppState.deck.includes(c.slug);
        allCharsGridHtml +=
          '<div class="portrait-card signature-card-item" data-select-char="' + c.slug + '">' +
          '<div class="portrait-card-header">' +
          '<span class="portrait-card-name">' + c.name + '</span>' +
          renderLevelDots(c.level) +
          '</div>' +
          '<div class="portrait-card-img-wrap">' +
          '<button type="button" class="save-btn' + (isSaved ? ' is-saved' : '') + '" data-save-card="' + c.slug + '" aria-label="' + (isSaved ? 'Remove' : 'Save') + '">' +
          (isSaved ? '&#10003;' : '+') +
          '</button>' +
          '<img src="' + imgPath('characters', c.slug, 'png') + '" alt="' + c.name + '" width="160" height="230" loading="lazy" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '</div>' +
          '</div>';
      });

      detailPanel.innerHTML =
        '<button type="button" class="back-pill" id="detailBackBtn">&larr; Back to all characters</button>' +
        '<div class="detail-columns">' +
        '<div class="detail-col">' +
        '<div class="detail-col-title">Nicknames</div>' +
        '<div class="detail-col-text">' + nicknamesStr + '</div>' +
        '</div>' +
        '<div class="detail-col">' +
        '<div class="detail-col-title">Bio</div>' +
        '<div class="detail-col-text">' +
        '<div class="bio-entry"><span class="bio-label">Born:</span> <span class="bio-value">' + ch.bio.born + '</span></div>' +
        '<div class="bio-entry"><span class="bio-label">Education:</span> <span class="bio-value">' + ch.bio.education + '</span></div>' +
        '<div class="bio-entry"><span class="bio-label">Occupation:</span> <span class="bio-value">' + ch.bio.occupation + '</span></div>' +
        '<div class="bio-entry"><span class="bio-label">Astrological Sign:</span> <span class="bio-value">' + ch.bio.sign + '</span></div>' +
        '<div class="bio-entry"><span class="bio-label">Favorite Food:</span> <span class="bio-value">' + ch.bio.food + '</span></div>' +
        '</div>' +
        '</div>' +
        '<div class="detail-col-divider"></div>' +
        '<div class="detail-col">' +
        '<div class="detail-col-title">Relatives</div>' +
        '<div class="detail-mini-grid">' + relativesHtml + '</div>' +
        '<div class="detail-col-title" style="margin-top:16px;">Friends / Allies</div>' +
        '<div class="detail-mini-grid">' + alliesHtml + '</div>' +
        '</div>' +
        '</div>' +
        '<div class="detail-episodes-heading">' +
        '<h2 class="detail-episodes-title">' + ch.name + ' <span>Episodes / Cards:</span></h2>' +
        '<div class="detail-view-links">' +
        '<a href="cards.html" class="detail-view-link">View All ' + ch.name + ' Cards</a>' +
        '<a href="watch.html" class="detail-view-link">View All ' + ch.name + ' Episodes</a>' +
        '</div>' +
        '</div>' +
        '<div class="detail-episodes-list">' + episodesHtml + '</div>' +
        '<div class="detail-lower-section">' +
        '<div class="section-header">' +
        '<h2 class="section-header-title">All Characters</h2>' +
        '<span style="font-size:10px; color:#888;">Select a duelist to show them above</span>' +
        '</div>' +
        '<div class="signature-cards-grid">' + allCharsGridHtml + '</div>' +
        '</div>';

      // Attach detail panel listeners
      const backBtn = document.getElementById('detailBackBtn');
      if (backBtn) backBtn.addEventListener('click', closeDetailPanel);

      detailPanel.querySelectorAll('[data-open-ep]').forEach(thumb => {
        thumb.addEventListener('click', () => openEpisodeModal(thumb.getAttribute('data-open-ep')));
      });

      detailPanel.querySelectorAll('[data-select-char]').forEach(item => {
        item.addEventListener('click', () => {
          const slug = item.getAttribute('data-select-char');
          openDetailPanel(slug, false);
          window.scrollTo({ top: heroEl.offsetTop - 52, behavior: 'smooth' });
        });
      });

      detailPanel.querySelectorAll('[data-save-card]').forEach(btn => {
        btn.addEventListener('click', (e) => toggleDeckCard(btn.getAttribute('data-save-card'), e));
      });

      // Show panel
      detailPanel.style.display = 'block';
      detailPanel.classList.remove('hiding');
      void detailPanel.offsetWidth;
      detailPanel.classList.add('show');

      // Update URL hash
      history.pushState(null, '', '#character=' + ch.slug);

      // Smooth scroll if not deep link
      if (!isDeepLink) {
        window.scrollTo({
          top: detailPanel.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    }

    function closeDetailPanel() {
      if (!detailPanel) return;
      state = 'A';
      detailPanel.classList.remove('show');
      detailPanel.classList.add('hiding');

      setTimeout(() => {
        detailPanel.style.display = 'none';
        detailPanel.classList.remove('hiding');
        history.replaceState(null, '', 'characters.html');

        if (storedScrollPos > 0) {
          window.scrollTo({ top: storedScrollPos, behavior: 'smooth' });
        } else if (browseGridSection) {
          window.scrollTo({ top: browseGridSection.offsetTop - 60, behavior: 'smooth' });
        }
        if (viewBioBtn) viewBioBtn.focus();
      }, 250);
    }

    // Mobile Duelist Bio Modal
    function openDuelistBioModal(ch) {
      let modalEl = document.getElementById('duelistBioModal');
      if (!modalEl && window.bootstrap) {
        // Dynamic creation if not in HTML
        modalEl = document.createElement('div');
        modalEl.id = 'duelistBioModal';
        modalEl.className = 'modal fade';
        modalEl.setAttribute('tabindex', '-1');
        document.body.appendChild(modalEl);
      }
      if (!modalEl || !window.bootstrap) return;

      modalEl.innerHTML =
        '<div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">' +
        '<div class="modal-content" style="background:var(--paper); color:var(--navy);">' +
        '<div class="modal-header" style="border-bottom:1px solid #ddd;">' +
        '<h5 class="modal-title font-oswald">' + ch.name + ' - Duelist Bio</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p><strong>Series:</strong> ' + ch.series + '</p>' +
        '<p><strong>Nicknames:</strong> ' + ch.nicknames.join(', ') + '</p>' +
        '<p><strong>Born:</strong> ' + ch.bio.born + '</p>' +
        '<p><strong>Occupation:</strong> ' + ch.bio.occupation + '</p>' +
        '<p><strong>Favorite Food:</strong> ' + ch.bio.food + '</p>' +
        '<p>' + ch.description + '</p>' +
        '</div>' +
        '</div>' +
        '</div>';

      const bsModal = new bootstrap.Modal(modalEl);
      bsModal.show();
    }

    if (viewBioBtn) {
      viewBioBtn.addEventListener('click', () => {
        openDetailPanel(characterList[currentIndex].slug, false);
      });
    }

    // Initial render
    renderHeroCard('next');
    renderCharacterGrid();

    // Check hash for deep link
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    if (params.has('character')) {
      const slug = params.get('character');
      openDetailPanel(slug, true);
    }

    // Listen for hashchange
    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.slice(1);
      const newParams = new URLSearchParams(newHash);
      if (newParams.has('character')) {
        openDetailPanel(newParams.get('character'), false);
      } else if (state === 'B') {
        closeDetailPanel();
      }
    });
  }

  /* ===== 7. CARDS PAGE (TWO STATES: BROWSE & INSPECT CARD) ===== */

  function initCardsPage() {
    const heroEl = document.querySelector('.card-hero');
    if (!heroEl) return;

    // All cards included in the carousel
    let cardList = [...CARDS];
    let currentIndex = 0;
    let isTransitioning = false;
    let storedScrollPos = 0;
    let state = 'A'; // 'A' = Browse, 'B' = Detail

    // Pagination for Browse grid
    let currentPage = 1;
    const perPage = 24;
    let activeFilter = 'all';
    let searchQuery = '';
    let isPaging = false;

    // Hero element references
    const cardContainer = heroEl.querySelector('.item-hero-card-col');
    const tagEl = heroEl.querySelector('.item-hero-tag');
    const titleEl = heroEl.querySelector('.item-hero-title');
    const descEl = heroEl.querySelector('.item-hero-desc');
    const inspectBtn = heroEl.querySelector('.item-hero-btn');
    const dotsContainer = heroEl.querySelector('.item-hero-dots');
    const prevBtn = heroEl.querySelector('.item-hero-prev-btn');
    const nextBtn = heroEl.querySelector('.item-hero-next-btn');
    const progressFill = heroEl.querySelector('.item-progress-fill');
    const counterEl = heroEl.querySelector('.item-progress-counter');
    const detailPanel = document.getElementById('cardDetailPanel');
    const browseGridSection = document.getElementById('cardBrowseSection');
    const gridEl = document.getElementById('cardsGrid');

    function renderHeroCard(direction) {
      const cd = cardList[currentIndex];
      if (!cd) return;

      const total = cardList.length;
      const isSaved = AppState.deck.includes(cd.slug);

      const oldCard = cardContainer.querySelector('.portrait-card-hero');
      if (oldCard) {
        oldCard.classList.add(direction === 'next' ? 'exiting' : 'exiting-reverse');
      }

      setTimeout(() => {
        cardContainer.innerHTML =
          '<div class="portrait-card portrait-card-hero entering-left">' +
          '<div class="portrait-card-header">' +
          '<span class="portrait-card-name">' + cd.name + '</span>' +
          renderLevelDots(cd.level) +
          '</div>' +
          '<div class="portrait-card-img-wrap">' +
          '<button type="button" class="save-btn' + (isSaved ? ' is-saved' : '') + '" data-save-card="' + cd.slug + '" aria-label="' + (isSaved ? 'Remove from Deck' : 'Add to Deck') + '">' +
          (isSaved ? '&#10003;' : '+') +
          '</button>' +
          '<img src="' + imgPath('cards', cd.slug, 'jpg') + '" alt="' + cd.name + '" width="340" height="480" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="portrait-card-caption">' + cd.race + ' / ' + cd.type + '</div>' +
          '</div>' +
          '</div>';

        const saveBtn = cardContainer.querySelector('.save-btn');
        if (saveBtn) {
          saveBtn.addEventListener('click', (e) => toggleDeckCard(cd.slug, e));
        }
      }, oldCard ? 200 : 0);

      // Text block
      if (tagEl && titleEl && descEl) {
        tagEl.classList.remove('show');
        titleEl.classList.remove('show');
        descEl.classList.remove('show');

        setTimeout(() => {
          const curNum = (currentIndex + 1 < 10 ? '0' : '') + (currentIndex + 1);
          const totNum = (total < 10 ? '0' : '') + total;
          tagEl.textContent = 'CARD ' + curNum + '/' + totNum;
          titleEl.textContent = cd.name;
          descEl.textContent = cd.text;

          tagEl.classList.add('show');
          titleEl.classList.add('show');
          descEl.classList.add('show');
        }, 150);
      }

      // Dots
      if (dotsContainer) {
        dotsContainer.innerHTML = cardList.map((_, i) =>
          '<button type="button" class="item-dot' + (i === currentIndex ? ' active' : '') + '" data-dot-idx="' + i + '" aria-label="Go to card ' + (i + 1) + '"></button>'
        ).join('');

        const activeDot = dotsContainer.querySelector('.item-dot.active');
        if (activeDot && dotsContainer) {
          const scrollTarget = activeDot.offsetLeft - (dotsContainer.clientWidth / 2) + (activeDot.clientWidth / 2);
          dotsContainer.scrollTo({ left: scrollTarget, behavior: 'smooth' });
        }

        dotsContainer.querySelectorAll('.item-dot').forEach(dot => {
          dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-dot-idx'), 10);
            if (idx !== currentIndex) {
              goToCard(idx, idx > currentIndex ? 'next' : 'prev');
            }
          });
        });
      }

      // Progress bar
      if (progressFill) {
        const pct = ((currentIndex + 1) / total) * 100;
        progressFill.style.width = pct + '%';
      }
      if (counterEl) {
        const curNum = (currentIndex + 1 < 10 ? '0' : '') + (currentIndex + 1);
        const totNum = (total < 10 ? '0' : '') + total;
        counterEl.textContent = curNum + ' —— ' + totNum;
      }
    }

    function goToCard(index, direction) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex = (index + cardList.length) % cardList.length;
      renderHeroCard(direction);

      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToCard(currentIndex - 1, 'prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => goToCard(currentIndex + 1, 'next'));

    // Keyboard support (prevent horizontal window shift)
    heroEl.setAttribute('tabindex', '0');
    function handleCardKeyNav(e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToCard(currentIndex - 1, 'prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToCard(currentIndex + 1, 'next');
      }
    }
    window.addEventListener('keydown', handleCardKeyNav);

    // Hero search input (above hero)
    const heroSearchInput = document.getElementById('cardHeroSearchInput');
    if (heroSearchInput) {
      heroSearchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        const foundIdx = cardList.findIndex(c => c.name.toLowerCase().includes(val));
        if (foundIdx > -1 && foundIdx !== currentIndex) {
          goToCard(foundIdx, 'next');
        }
      });
    }

    // Browse Grid: filtering & pagination
    function getFilteredCards() {
      return CARDS.filter(cd => {
        const matchesType = activeFilter === 'all' ||
          (activeFilter === 'monsters' && (cd.type.includes('Monster') || cd.type === 'Monster')) ||
          (activeFilter === 'spells' && cd.type.includes('Spell')) ||
          (activeFilter === 'traps' && cd.type.includes('Trap')) ||
          (activeFilter === 'others' && !cd.type.includes('Monster') && !cd.type.includes('Spell') && !cd.type.includes('Trap'));
        const matchesSearch = !searchQuery ||
          cd.name.toLowerCase().includes(searchQuery) ||
          cd.type.toLowerCase().includes(searchQuery);
        return matchesType && matchesSearch;
      });
    }

    function renderCardsGrid() {
      if (!gridEl) return;
      const filtered = getFilteredCards();
      const totalPages = Math.ceil(filtered.length / perPage) || 1;
      if (currentPage > totalPages) currentPage = totalPages;

      const start = (currentPage - 1) * perPage;
      const pageItems = filtered.slice(start, start + perPage);

      if (pageItems.length === 0) {
        gridEl.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:#888; font-size:14px;">No cards found.</div>';
        renderPagination(totalPages);
        return;
      }

      let html = '';
      pageItems.forEach((cd, idx) => {
        html +=
          '<div class="white-tile tile-stagger" data-slug="' + cd.slug + '" style="transition-delay:' + (idx * 15) + 'ms;">' +
          '<img src="' + imgPath('cards', cd.slug, 'jpg') + '" alt="' + cd.name + '" width="132" height="132" loading="lazy" class="white-tile-img" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="white-tile-body">' +
          '<div class="white-tile-name">' + cd.name + '</div>' +
          '</div>' +
          '</div>';
      });
      gridEl.innerHTML = html;

      gridEl.querySelectorAll('.white-tile').forEach(tile => {
        tile.addEventListener('click', () => {
          const slug = tile.getAttribute('data-slug');
          const cardIdx = cardList.findIndex(c => c.slug === slug);
          if (cardIdx > -1) {
            goToCard(cardIdx, cardIdx > currentIndex ? 'next' : 'prev');
          }
          gridEl.querySelectorAll('.white-tile').forEach(t => t.classList.remove('selected'));
          tile.classList.add('selected');
          window.scrollTo({ top: heroEl.offsetTop - 52, behavior: 'smooth' });
        });
      });

      requestAnimationFrame(() => {
        gridEl.querySelectorAll('.tile-stagger').forEach(t => t.classList.add('show'));
      });

      renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
      const pagContainer = document.getElementById('cardPagination');
      if (!pagContainer) return;

      let html = '';
      for (let p = 1; p <= totalPages; p++) {
        html += '<button type="button" class="page-box' + (p === currentPage ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
      }
      if (totalPages > 1) {
        html += '<button type="button" class="page-box' + (currentPage === totalPages ? ' disabled' : '') + '" data-page="next">&gt;</button>';
      }
      pagContainer.innerHTML = html;

      pagContainer.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (isPaging) return;
          const target = btn.getAttribute('data-page');
          let newPage = currentPage;
          if (target === 'next') {
            newPage = Math.min(currentPage + 1, totalPages);
          } else {
            newPage = parseInt(target, 10);
          }
          if (newPage !== currentPage) {
            transitionToPage(newPage);
          }
        });
      });
    }

    function transitionToPage(newPage) {
      if (isPaging) return;
      isPaging = true;
      gridEl.setAttribute('aria-busy', 'true');
      gridEl.classList.add('grid-fading-out');

      setTimeout(() => {
        currentPage = newPage;
        renderCardsGrid();
        gridEl.classList.remove('grid-fading-out');
        gridEl.setAttribute('aria-busy', 'false');
        isPaging = false;

        const rect = gridEl.getBoundingClientRect();
        if (rect.top < 52) {
          window.scrollTo({
            top: window.scrollY + rect.top - 60,
            behavior: 'smooth'
          });
        }
        history.replaceState(null, '', '#page=' + currentPage);
      }, 180);
    }

    // Filter bar
    const filterButtons = document.querySelectorAll('#cardsFilterBar .filter-item');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        currentPage = 1;
        transitionToPage(1);
      });
    });

    const filterSearch = document.getElementById('cardsSearchInput');
    let searchDebounce = null;
    if (filterSearch) {
      filterSearch.addEventListener('input', (e) => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
          searchQuery = e.target.value.toLowerCase().trim();
          currentPage = 1;
          transitionToPage(1);
        }, 250);
      });
    }

    // STATE B: Inspect Card Detail Panel
    function openDetailPanel(cardSlug, isDeepLink) {
      const cd = CARDS.find(c => c.slug === cardSlug) || cardList[currentIndex];
      if (!cd) return;

      const cardIdx = cardList.findIndex(c => c.slug === cd.slug);
      if (cardIdx > -1 && cardIdx !== currentIndex) {
        currentIndex = cardIdx;
        renderHeroCard('next');
      }

      state = 'B';
      if (!isDeepLink) {
        storedScrollPos = window.scrollY;
      }

      if (window.innerWidth < 768) {
        openCardInspectorModal(cd);
        return;
      }

      if (!detailPanel) return;

      const akaStr = cd.aka.join(', ') || 'None';
      const relatedHtml = cd.related.map(slug =>
        '<div class="detail-mini-card" data-open-card="' + slug + '">' +
        '<img src="' + imgPath('cards', slug, 'jpg') + '" alt="' + getNameBySlug(slug) + '" width="44" height="44" class="detail-mini-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
        '<span class="detail-mini-name">' + getNameBySlug(slug) + '</span>' +
        '</div>'
      ).join('') || '<span style="color:#888;">None</span>';

      const duelistsHtml = cd.duelists.map(slug =>
        '<a href="characters.html#character=' + slug + '" class="detail-mini-card">' +
        '<img src="' + imgPath('characters', slug, 'png') + '" alt="' + getNameBySlug(slug) + '" width="44" height="44" class="detail-mini-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
        '<span class="detail-mini-name">' + getNameBySlug(slug) + '</span>' +
        '</a>'
      ).join('') || '<span style="color:#888;">None</span>';

      const epObjects = EPISODES.filter(ep => ep.cards.includes(cd.slug) || cd.episodes.includes(ep.slug));
      let episodesHtml = '';
      if (epObjects.length > 0) {
        epObjects.forEach((ep, idx) => {
          const charsHtml = ep.characters.map(chSlug =>
            '<a href="characters.html#character=' + chSlug + '" class="detail-assoc-link">' + getNameBySlug(chSlug) + '</a>'
          ).join('') || '<span style="color:#888;">No characters listed</span>';

          episodesHtml +=
            '<div class="detail-episode-row show" style="transition-delay:' + (idx * 70) + 'ms;">' +
            '<div class="detail-episode-thumb-wrap" data-open-ep="' + ep.slug + '">' +
            '<img src="' + imgPath('episodes', ep.slug, 'jpg') + '" alt="' + ep.title + '" width="200" height="150" class="detail-episode-thumb" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
            '<div class="detail-episode-play">&#9658;</div>' +
            '</div>' +
            '<div class="detail-episode-info">' +
            '<h3 class="detail-episode-title">' + ep.title + '</h3>' +
            '<div class="detail-episode-series">' + ep.series + '</div>' +
            '<div class="detail-episode-meta">Season: ' + ep.season + ' | Episode: ' + ep.number + ' | Duration: ' + ep.duration + '</div>' +
            '</div>' +
            '<div class="detail-episode-divider"></div>' +
            '<div class="detail-episode-assoc">' +
            '<div class="detail-assoc-title">Characters associated with card in this episode:</div>' +
            charsHtml +
            '</div>' +
            '</div>';
        });
      } else {
        episodesHtml = '<div style="padding:20px; background:#fff; border-radius:6px; color:#888;">No associated episodes listed.</div>';
      }

      // Lower section: signature cards grid on left, MY DECK box on right
      let sigCardsHtml = '';
      cardList.slice(0, 12).forEach(c => {
        const isSaved = AppState.deck.includes(c.slug);
        sigCardsHtml +=
          '<div class="portrait-card signature-card-item" data-select-card="' + c.slug + '">' +
          '<div class="portrait-card-header">' +
          '<span class="portrait-card-name">' + c.name + '</span>' +
          renderLevelDots(c.level) +
          '</div>' +
          '<div class="portrait-card-img-wrap">' +
          '<button type="button" class="save-btn' + (isSaved ? ' is-saved' : '') + '" data-save-card="' + c.slug + '" aria-label="' + (isSaved ? 'Remove' : 'Save') + '">' +
          (isSaved ? '&#10003;' : '+') +
          '</button>' +
          '<img src="' + imgPath('cards', c.slug, 'jpg') + '" alt="' + c.name + '" width="160" height="230" loading="lazy" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '</div>' +
          '</div>';
      });

      let deckBoxItemsHtml = '';
      if (AppState.deck.length === 0) {
        deckBoxItemsHtml = '<li style="color:#888; padding:8px 0;">No cards saved.</li>';
      } else {
        AppState.deck.forEach(s => {
          deckBoxItemsHtml += '<li class="detail-deck-item"><span>' + getNameBySlug(s) + '</span></li>';
        });
      }

      detailPanel.innerHTML =
        '<button type="button" class="back-pill" id="cardDetailBackBtn">&larr; Back to all cards</button>' +
        '<div class="detail-columns">' +
        '<div class="detail-col">' +
        '<div class="detail-col-title">Also Known As</div>' +
        '<div class="detail-col-text">' + akaStr + '</div>' +
        '</div>' +
        '<div class="detail-col">' +
        '<div class="detail-col-title">Card Details</div>' +
        '<div class="detail-col-text">' +
        '<div><strong>Type:</strong> ' + cd.type + '</div>' +
        '<div><strong>Attribute:</strong> ' + (cd.attribute || 'N/A') + '</div>' +
        '<div><strong>Level / Rank:</strong> ' + (cd.level || 'N/A') + '</div>' +
        '<div><strong>ATK / DEF:</strong> ' + (cd.atk !== null ? cd.atk : '-') + ' / ' + (cd.def !== null ? cd.def : '-') + '</div>' +
        '<div class="tcg-info-row">' +
        '<a href="https://www.yugioh-card.com" target="_blank" rel="noopener" class="tcg-link">View TCG info</a>' +
        '<span style="color:#ccc;">|</span>' +
        '<a href="https://www.konami.com" target="_blank" rel="noopener" class="tcg-link">KONAMI</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="detail-col-divider"></div>' +
        '<div class="detail-col">' +
        '<div class="detail-col-title">Related Cards</div>' +
        '<div class="detail-mini-grid">' + relatedHtml + '</div>' +
        '<div class="detail-col-title" style="margin-top:16px;">Duelists</div>' +
        '<div class="detail-mini-grid">' + duelistsHtml + '</div>' +
        '</div>' +
        '</div>' +
        '<div class="detail-episodes-heading">' +
        '<h2 class="detail-episodes-title">' + cd.name + ' <span>Episodes / Cards:</span></h2>' +
        '<div class="detail-view-links">' +
        '<a href="characters.html" class="detail-view-link">View All ' + cd.name + ' Characters</a>' +
        '<a href="watch.html" class="detail-view-link">View All ' + cd.name + ' Episodes</a>' +
        '</div>' +
        '</div>' +
        '<div class="detail-episodes-list">' + episodesHtml + '</div>' +
        '<div class="detail-lower-section">' +
        '<div class="detail-lower-layout">' +
        '<div class="detail-lower-main">' +
        '<div class="section-header">' +
        '<h2 class="section-header-title">Browse Cards</h2>' +
        '<span style="font-size:10px; color:#888;">Select a card to show them above</span>' +
        '</div>' +
        '<div class="signature-cards-grid">' + sigCardsHtml + '</div>' +
        '</div>' +
        '<div class="detail-deck-sidebar">' +
        '<div class="detail-deck-title">My Deck</div>' +
        '<div class="deck-count-label">' + AppState.deck.length + ' cards saved</div>' +
        '<ul class="detail-deck-list" id="detailDeckList">' + deckBoxItemsHtml + '</ul>' +
        '<button type="button" class="detail-deck-clear-btn" id="detailClearDeckBtn">Clear Deck</button>' +
        '</div>' +
        '</div>' +
        '</div>';

      const backBtn = document.getElementById('cardDetailBackBtn');
      if (backBtn) backBtn.addEventListener('click', closeDetailPanel);

      const clearBtn = document.getElementById('detailClearDeckBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          AppState.deck = [];
          storage.set(KEY_DECK, []);
          updateDeckBadge();
          updateSaveButtonStates();
          const list = document.getElementById('detailDeckList');
          if (list) list.innerHTML = '<li style="color:#888; padding:8px 0;">No cards saved.</li>';
          showToast('My Deck cleared');
        });
      }

      detailPanel.querySelectorAll('[data-open-ep]').forEach(thumb => {
        thumb.addEventListener('click', () => openEpisodeModal(thumb.getAttribute('data-open-ep')));
      });

      detailPanel.querySelectorAll('[data-select-card]').forEach(item => {
        item.addEventListener('click', () => {
          const slug = item.getAttribute('data-select-card');
          openDetailPanel(slug, false);
          window.scrollTo({ top: heroEl.offsetTop - 52, behavior: 'smooth' });
        });
      });

      detailPanel.querySelectorAll('[data-open-card]').forEach(item => {
        item.addEventListener('click', () => {
          const slug = item.getAttribute('data-open-card');
          openDetailPanel(slug, false);
          window.scrollTo({ top: heroEl.offsetTop - 52, behavior: 'smooth' });
        });
      });

      detailPanel.querySelectorAll('[data-save-card]').forEach(btn => {
        btn.addEventListener('click', (e) => toggleDeckCard(btn.getAttribute('data-save-card'), e));
      });

      detailPanel.style.display = 'block';
      detailPanel.classList.remove('hiding');
      void detailPanel.offsetWidth;
      detailPanel.classList.add('show');

      history.pushState(null, '', '#card=' + cd.slug);

      if (!isDeepLink) {
        window.scrollTo({
          top: detailPanel.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    }

    function closeDetailPanel() {
      if (!detailPanel) return;
      state = 'A';
      detailPanel.classList.remove('show');
      detailPanel.classList.add('hiding');

      setTimeout(() => {
        detailPanel.style.display = 'none';
        detailPanel.classList.remove('hiding');
        history.replaceState(null, '', 'cards.html');

        if (storedScrollPos > 0) {
          window.scrollTo({ top: storedScrollPos, behavior: 'smooth' });
        } else if (browseGridSection) {
          window.scrollTo({ top: browseGridSection.offsetTop - 60, behavior: 'smooth' });
        }
        if (inspectBtn) inspectBtn.focus();
      }, 250);
    }

    function openCardInspectorModal(cd) {
      let modalEl = document.getElementById('cardInspectorModal');
      if (!modalEl && window.bootstrap) {
        modalEl = document.createElement('div');
        modalEl.id = 'cardInspectorModal';
        modalEl.className = 'modal fade';
        modalEl.setAttribute('tabindex', '-1');
        document.body.appendChild(modalEl);
      }
      if (!modalEl || !window.bootstrap) return;

      modalEl.innerHTML =
        '<div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">' +
        '<div class="modal-content" style="background:var(--paper); color:var(--navy);">' +
        '<div class="modal-header" style="border-bottom:1px solid #ddd;">' +
        '<h5 class="modal-title font-oswald">' + cd.name + ' - Card Details</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p><strong>Type:</strong> ' + cd.type + '</p>' +
        '<p><strong>Attribute:</strong> ' + cd.attribute + '</p>' +
        '<p><strong>Level / Rank:</strong> ' + cd.level + '</p>' +
        '<p><strong>ATK / DEF:</strong> ' + (cd.atk || '-') + ' / ' + (cd.def || '-') + '</p>' +
        '<p>' + cd.text + '</p>' +
        '</div>' +
        '</div>' +
        '</div>';

      const bsModal = new bootstrap.Modal(modalEl);
      bsModal.show();
    }

    if (inspectBtn) {
      inspectBtn.addEventListener('click', () => {
        openDetailPanel(featuredCards[currentIndex].slug, false);
      });
    }

    renderHeroCard('next');
    renderCardsGrid();

    // Check hash for deep link
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    if (params.has('card')) {
      const slug = params.get('card');
      openDetailPanel(slug, true);
    }

    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.slice(1);
      const newParams = new URLSearchParams(newHash);
      if (newParams.has('card')) {
        openDetailPanel(newParams.get('card'), false);
      } else if (state === 'B') {
        closeDetailPanel();
      }
    });
  }

  /* ===== 8. NEWS PAGE ===== */

  function initNewsPage() {
    const gridEl = document.getElementById('newsGrid');
    if (!gridEl) return;

    let currentPage = 1;
    const perPage = 6;
    let isPaging = false;

    function renderNewsGrid() {
      const totalPages = Math.ceil(NEWS.length / perPage) || 1;
      if (currentPage > totalPages) currentPage = totalPages;

      const start = (currentPage - 1) * perPage;
      const pageItems = NEWS.slice(start, start + perPage);

      let html = '';
      pageItems.forEach((n, idx) => {
        html +=
          '<article class="news-card tile-stagger" style="transition-delay:' + (idx * 25) + 'ms;">' +
          '<div class="news-card-edge"></div>' +
          '<img src="' + imgPath('news', n.slug, 'jpg') + '" alt="' + n.title + '" width="272" height="110" loading="lazy" class="news-card-img" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';this.classList.add(\'is-placeholder\');">' +
          '<div class="news-card-body">' +
          '<h2 class="news-card-title">' + n.title + '</h2>' +
          '<div class="news-card-date">' + n.date + ' | ' + n.time + '</div>' +
          '<div class="news-card-excerpt">' + n.excerpt + '</div>' +
          '</div>' +
          '</article>';
      });
      gridEl.innerHTML = html;

      requestAnimationFrame(() => {
        gridEl.querySelectorAll('.tile-stagger').forEach(t => t.classList.add('show'));
      });

      renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
      const pagContainer = document.getElementById('newsPagination');
      if (!pagContainer) return;

      let html = '';
      for (let p = 1; p <= totalPages; p++) {
        html += '<button type="button" class="page-box' + (p === currentPage ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
      }
      if (totalPages > 1) {
        html += '<button type="button" class="page-box' + (currentPage === totalPages ? ' disabled' : '') + '" data-page="next">&gt;</button>';
      }
      pagContainer.innerHTML = html;

      pagContainer.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (isPaging) return;
          const target = btn.getAttribute('data-page');
          let newPage = currentPage;
          if (target === 'next') {
            newPage = Math.min(currentPage + 1, totalPages);
          } else {
            newPage = parseInt(target, 10);
          }
          if (newPage !== currentPage) {
            transitionToPage(newPage);
          }
        });
      });
    }

    function transitionToPage(newPage) {
      if (isPaging) return;
      isPaging = true;
      gridEl.setAttribute('aria-busy', 'true');
      gridEl.classList.add('grid-fading-out');

      setTimeout(() => {
        currentPage = newPage;
        renderNewsGrid();
        gridEl.classList.remove('grid-fading-out');
        gridEl.setAttribute('aria-busy', 'false');
        isPaging = false;

        const rect = gridEl.getBoundingClientRect();
        if (rect.top < 52) {
          window.scrollTo({
            top: window.scrollY + rect.top - 60,
            behavior: 'smooth'
          });
        }
        history.replaceState(null, '', '#page=' + currentPage);
      }, 180);
    }

    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    if (params.has('page')) {
      currentPage = parseInt(params.get('page'), 10) || 1;
    }

    renderNewsGrid();
  }

  /* ===== 9. PAGE-TO-PAGE NAVIGATION — WIPE TRANSITION ===== */

  function initPageTransitions() {
    // ----- 1. Create the wipe panel (once per page load) -----
    const wipe = document.createElement('div');
    wipe.id = 'page-wipe';
    document.body.appendChild(wipe);

    // WIPE TIMING (must match CSS transition: 340ms)
    const WIPE_DURATION = 340;

    // ----- 2. ENTER animation: panel starts covering → slides out right -----
    //   The panel starts at translateX(0) (covering) only when wipe-in is set.
    //   On a fresh load it is at translateX(-100%) so just do nothing.
    //   On navigation, the previous page added wipe-in; the new page should
    //   reveal itself by sliding the panel out.
    //
    //   Because the new page starts fresh, we:
    //   a) Set panel to cover instantly (no transition), then
    //   b) trigger wipe-out in the next animation frame so the browser paints
    //      the page behind the panel before sliding it away.
    //
    // Force panel to cover first (synchronous, no animation)
    wipe.style.transition = 'none';
    wipe.classList.remove('wipe-out');
    wipe.classList.add('wipe-in');           // translateX(0) — covers page

    // Let the browser paint one frame, then reveal
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Restore CSS transition, then slide out
        wipe.style.transition = '';
        wipe.classList.remove('wipe-in');
        wipe.classList.add('wipe-out');      // translateX(100%) — exits right
      });
    });

    // ----- 3. Intercept internal link clicks for wipe-out exit -----
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Skip hash-only, javascript:, external, mailto, target="_blank", or modifier clicks
      if (
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        link.target === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.button !== 0
      ) {
        return;
      }

      e.preventDefault();

      // Slide wipe panel IN (covers page) then navigate
      wipe.style.transition = '';
      wipe.classList.remove('wipe-out');
      wipe.classList.add('wipe-in');         // translateX(0) — covers page

      let navigated = false;
      const proceed = () => {
        if (!navigated) {
          navigated = true;
          window.location.href = href;
        }
      };

      // Navigate as soon as panel finishes covering (transitionend)
      wipe.addEventListener('transitionend', function onEnd(ev) {
        if (ev.propertyName === 'transform') {
          wipe.removeEventListener('transitionend', onEnd);
          proceed();
        }
      });

      // Safety fallback if transitionend never fires
      setTimeout(proceed, WIPE_DURATION + 60);
    });

    // ----- 4. Handle bfcache (browser Back/Forward) -----
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        // Page was restored from cache; instantly hide the wipe panel
        wipe.style.transition = 'none';
        wipe.classList.remove('wipe-in', 'wipe-out');
        // Force translateX(-100%) (hidden off-screen left)
        wipe.style.transform = 'translateX(-100%)';
      }
    });
  }

  /* ===== INITIALIZE APPLICATION ===== */
  document.addEventListener('DOMContentLoaded', () => {
    initSharedComponents();
    initHomePage();
    initSeriesPage();
    initWatchPage();
    initCharactersPage();
    initCardsPage();
    initNewsPage();
    initPageTransitions();
  });
})();
