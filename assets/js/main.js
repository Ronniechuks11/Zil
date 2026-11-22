/*
  ZIL PROPERTZ SOLUTIONS — front-end starter
  Add future listings to the `properties` array below. Keep contact details in the
  CONTACT SETTINGS block updated before publishing.
*/

// CONTACT SETTINGS — replace this placeholder with the official Zil Propertz email.
const contactEmail = 'replace-this-with-your-email@example.com';

// One source of truth for all property cards, search filters and the property detail view.
const properties = [
  {
    id: 'ZP-001',
    title: 'Luxury 7-Bedroom Detached House',
    status: 'For Sale',
    type: 'Detached House',
    location: 'City Estate, Enugu State',
    price: 400000000,
    bedrooms: 7,
    images: [
      'assets/images/exterior-front.jpg',
      'assets/images/exterior-porch.jpg',
      'assets/images/driveway-overview.jpg',
      'assets/images/interior-hallway.jpg',
      'assets/images/master-bedroom.jpg',
      'assets/images/kitchen-warm.jpg',
      'assets/images/kitchen-monochrome.jpg',
      'assets/images/garden-driveway.jpg',
      'assets/images/upper-balcony.jpg'
    ],
    titleDeed: '',
    description: 'A contemporary detached residence with a modern exterior, glass balconies, refined interior finishes and generous shared living spaces.'
  },
  {
    id: 'ZP-002',
    title: 'Contemporary 5-Bedroom Duplex',
    status: 'For Sale',
    type: 'Duplex',
    location: 'Centenary City Estate, Enugu State',
    price: 250000000,
    bedrooms: 5,
    titleDeed: 'C of O',
    description: 'Clean white facades, dark-glass balconies and a stamped-concrete driveway frame this duplex in the prestigious Centenary City Estate. Inside, marble-effect tiles, fitted wardrobes, a stone-topped kitchen and a crystal chandelier set a refined tone throughout.',
    labels: [
      'Front exterior', 'Side elevation and driveway', 'Interior with crystal chandelier',
      'Room with dark fitted wardrobe', 'Room with timber fitted wardrobe',
      'Kitchen detail', 'Kitchen', 'Bathroom'
    ],
    images: [
      'assets/images/centenary-exterior-front.jpg',
      'assets/images/centenary-exterior-side.jpg',
      'assets/images/centenary-interior-chandelier.jpg',
      'assets/images/centenary-bedroom-dark-wardrobe.jpg',
      'assets/images/centenary-bedroom-timber-wardrobe.jpg',
      'assets/images/centenary-kitchen-detail.jpg',
      'assets/images/centenary-kitchen.jpg',
      'assets/images/centenary-bathroom.jpg'
    ]
  },
  {
    id: 'ZP-003',
    title: '6-Bedroom Duplex',
    status: 'For Sale',
    type: 'Duplex',
    location: 'Centenary City Estate, Enugu State',
    price: 220000000,
    bedrooms: 6,
    titleDeed: 'C of O',
    description: 'A six-bedroom duplex in Centenary City Estate, Enugu State, offered for sale with a Certificate of Occupancy (C of O).',
    labels: [
      'Front exterior', 'Side elevation', 'Front and boundary wall',
      'Exterior perspective', 'Balcony and front facade'
    ],
    images: [
      'assets/images/centenary-6bed-front.jpg',
      'assets/images/centenary-6bed-side.jpg',
      'assets/images/centenary-6bed-front-angle.jpg',
      'assets/images/centenary-6bed-exterior-view.jpg',
      'assets/images/centenary-6bed-balcony-view.jpg'
    ]
  },
  {
    id: 'ZP-004',
    title: 'Contemporary 4-Bedroom Duplex',
    status: 'For Sale',
    type: 'Duplex',
    location: 'Centenary City Estate, Enugu State',
    price: 200000000,
    bedrooms: 4,
    titleDeed: 'C of O',
    description: 'A contemporary four-bedroom duplex in Centenary City Estate, Enugu State, offered for sale with a Certificate of Occupancy (C of O). The property features a white-and-brick exterior, an upper balcony, bright finished interiors, fitted wardrobes, a modern kitchen and a tiled bathroom.',
    labels: [
      'Front exterior', 'Full frontage and gate', 'Living area with chandelier',
      'Living area and kitchen area', 'Interior hallway', 'Upper balcony',
      'Built-in wardrobe', 'Bathroom', 'Fitted kitchen'
    ],
    images: [
      'assets/images/centenary-4bed-front.jpg',
      'assets/images/centenary-4bed-front-wide.jpg',
      'assets/images/centenary-4bed-living-room.jpg',
      'assets/images/centenary-4bed-living-room-kitchen.jpg',
      'assets/images/centenary-4bed-hallway.jpg',
      'assets/images/centenary-4bed-balcony.jpg',
      'assets/images/centenary-4bed-wardrobe.jpg',
      'assets/images/centenary-4bed-bathroom.jpg',
      'assets/images/centenary-4bed-kitchen.jpg'
    ]
  }
];

const imageLabels = [
  'Front exterior', 'Entrance porch', 'Driveway overview', 'Interior hallway',
  'Master bedroom', 'Warm-finish kitchen', 'Black and white kitchen',
  'Garden and driveway', 'Upper balcony'
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const formatPrice = value => '₦' + Number(value).toLocaleString('en-NG');
/* Each photo has a 480px and a 1080px WebP sibling; phones download the small one. */
const imageVariants = src => {
  const match = /^(.*)\.jpe?g$/i.exec(src);
  if (!match) return { src, srcset: '' };
  // The new portrait phone photos are 864px wide; keep their srcset descriptor accurate.
  const largestWidth = (match[1].includes('centenary-6bed-') || /centenary-4bed-(balcony|wardrobe)$/.test(match[1])) ? 864 : 1080;
  return { src: `${match[1]}-md.webp`, srcset: `${match[1]}-sm.webp 480w, ${match[1]}-md.webp 800w, ${match[1]}-lg.webp ${largestWidth}w` };
};
const labelFor = (property, index) => (property.labels && property.labels[index]) || imageLabels[index] || 'Property photo';

/* -------------------------------------------------------
   First-visit intro sequence — about two seconds
------------------------------------------------------- */
function setupPreloader() {
  const preloader = $('#preloader');
  const brand = $('#loader-brand');
  const percent = $('#loader-percent');
  if (!preloader) return;

  const word = 'ZIL PROPERTZ';
  [...word].forEach((character, index) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = character === ' ' ? '\u00a0' : character;
    span.style.animationDelay = `${0.68 + index * 0.045}s`;
    brand.appendChild(span);
  });

  let hasVisited = false;
  try { hasVisited = sessionStorage.getItem('zil-propertz-intro-seen') === '1'; } catch (_) {}
  if (hasVisited || prefersReducedMotion) {
    preloader.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
    startHeroEntrance();
    return;
  }

  document.body.classList.add('no-scroll');
  const start = performance.now();
  const duration = 1500;
  let rafId;
  const updateCounter = now => {
    const ratio = Math.min(1, (now - start) / duration);
    if (percent) percent.textContent = String(Math.round(ratio * 100)).padStart(2, '0');
    if (ratio < 1) rafId = requestAnimationFrame(updateCounter);
  };
  rafId = requestAnimationFrame(updateCounter);

  window.setTimeout(() => {
    startHeroEntrance();
    preloader.classList.add('is-exiting');
    try { sessionStorage.setItem('zil-propertz-intro-seen', '1'); } catch (_) {}
  }, 1700);
  window.setTimeout(() => {
    cancelAnimationFrame(rafId);
    preloader.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
  }, 2250);
}

function startHeroEntrance() {
  document.body.classList.remove('intro-pending');
  document.body.classList.add('intro-started');
}

/* -------------------------------------------------------
   Header, menu and anchor behaviour
------------------------------------------------------- */
function setupNavigation() {
  const header = $('#site-header');
  const toggle = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 30);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
  };

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    mobileNav?.classList.toggle('is-open', !isOpen);
    mobileNav?.setAttribute('aria-hidden', String(isOpen));
  });

  $$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}

/* -------------------------------------------------------
   Property rendering and live smart search
------------------------------------------------------- */
const filterState = { status: 'all', type: 'all', location: 'all', maxPrice: 'all' };
let visibleLimit = 6;

function propertyMatches(property) {
  const statusMatch = filterState.status === 'all' || property.status === filterState.status;
  const typeMatch = filterState.type === 'all' || property.type === filterState.type;
  const locationMatch = filterState.location === 'all' || property.location === filterState.location;
  const priceMatch = filterState.maxPrice === 'all' || property.price <= Number(filterState.maxPrice);
  return statusMatch && typeMatch && locationMatch && priceMatch;
}

function createPropertyCard(property, index) {
  const card = document.createElement('article');
  card.className = 'property-card reveal-up';
  card.dataset.propertyId = property.id;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View ${property.title}`);
  const cover = imageVariants(property.images[0]);
  card.innerHTML = `
    <div class="property-card-image">
      <img src="${cover.src}" srcset="${cover.srcset}" sizes="(min-width:760px) 33vw, 100vw" alt="${property.title} in ${property.location}" loading="lazy" decoding="async">
      <div class="property-badges"><span class="property-badge status">${property.status}</span><span class="property-badge">${property.type}</span></div>
      <button class="card-open" type="button" aria-label="View property details">↗</button>
    </div>
    <div class="property-card-body">
      <div class="property-meta"><span>${property.id}</span><span>${property.titleDeed ? property.titleDeed.toUpperCase() : 'FEATURED PROPERTY'}</span></div>
      <h3>${property.title}</h3>
      <div class="property-card-location">${property.location}</div>
      <div class="property-card-bottom"><strong class="property-card-price">${formatPrice(property.price)}</strong><span class="property-card-bedrooms">${property.bedrooms} bedrooms</span></div>
    </div>`;
  card.addEventListener('click', () => openPropertyModal(property.id));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.target.closest('button')) return;
      event.preventDefault();
      openPropertyModal(property.id);
    }
  });
  return card;
}

function renderProperties() {
  const grid = $('#property-grid');
  const empty = $('#empty-state');
  const count = $('#listing-count');
  const loadMore = $('#load-more');
  const note = $('#load-more-note');
  if (!grid) return;

  const matches = properties.filter(propertyMatches);
  const visible = matches.slice(0, visibleLimit);
  grid.replaceChildren(...visible.map(createPropertyCard));
  if (empty) empty.hidden = matches.length > 0;
  if (count) count.textContent = `${String(matches.length).padStart(2, '0')} ${matches.length === 1 ? 'property' : 'properties'} selected`;
  if (loadMore) {
    loadMore.disabled = false;
    loadMore.classList.toggle('is-complete', matches.length <= visible.length);
    loadMore.querySelector('span').textContent = matches.length > visible.length ? 'Load more properties' : 'You’ve seen all current properties';
    loadMore.querySelector('i').textContent = matches.length > visible.length ? '＋' : '✓';
  }
  if (note) note.textContent = matches.length > visible.length ? `${visible.length} of ${matches.length} properties shown.` : 'You’re viewing all current listings.';
  observeReveals(grid);
}

function populateSearchOptions() {
  const definitions = [
    { selector: '#filter-status', key: 'status', placeholder: 'Any status', label: value => value.replace('For ', 'For ').replace(/^For (\w)/, (_, first) => `For ${first.toLowerCase()}`) },
    { selector: '#filter-type', key: 'type', placeholder: 'Any property', label: value => value },
    { selector: '#filter-location', key: 'location', placeholder: 'Any location', label: value => value.replace(', Enugu State', ', Enugu') }
  ];
  definitions.forEach(({ selector, key, placeholder, label }) => {
    const select = $(selector);
    if (!select) return;
    const options = [...new Set(properties.map(property => property[key]).filter(Boolean))];
    select.replaceChildren(new Option(placeholder, 'all'));
    options.forEach(value => select.add(new Option(label(value), value)));
    const heroSelect = $(`#hero-${key}`);
    if (heroSelect) {
      const heroPlaceholder = key === 'status' ? 'Buy or rent' : key === 'type' ? 'Any property' : 'Anywhere';
      heroSelect.replaceChildren(new Option(heroPlaceholder, 'all'));
      options.forEach(value => heroSelect.add(new Option(label(value), value)));
    }
  });
}

function setupSearch() {
  populateSearchOptions();
  const searchForm = $('#property-search');
  const fields = {
    status: $('#filter-status'), type: $('#filter-type'),
    location: $('#filter-location'), maxPrice: $('#filter-price')
  };
  const heroFields = {
    status: $('#hero-status'), type: $('#hero-type'),
    location: $('#hero-location'), maxPrice: $('#hero-price')
  };
  Object.entries(heroFields).forEach(([key, field]) => {
    if (!field) return;
    const mainField = fields[key];
    if (mainField && [...mainField.options].some(option => option.value === field.value)) field.value = mainField.value;
    field.addEventListener('change', () => {
      if (mainField && [...mainField.options].some(option => option.value === field.value)) mainField.value = field.value;
      filterState[key] = field.value;
    });
  });
  $('#hero-search')?.addEventListener('submit', event => {
    event.preventDefault();
    Object.entries(heroFields).forEach(([key, field]) => {
      if (field) {
        filterState[key] = field.value;
        if (fields[key]) fields[key].value = field.value;
      }
    });
    visibleLimit = 6;
    renderProperties();
    $('#properties')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
  Object.entries(fields).forEach(([key, field]) => {
    field?.addEventListener('change', () => {
      filterState[key] = field.value;
      if (heroFields[key]) heroFields[key].value = field.value;
      visibleLimit = 6;
      renderProperties();
    });
  });
  searchForm?.addEventListener('submit', event => {
    event.preventDefault();
    renderProperties();
    $('#properties')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
  $('#reset-filters')?.addEventListener('click', () => {
    Object.entries(fields).forEach(([key, field]) => {
      if (field) field.value = 'all';
      if (heroFields[key]) heroFields[key].value = 'all';
      filterState[key] = 'all';
    });
    visibleLimit = 6;
    renderProperties();
  });
  $('#load-more')?.addEventListener('click', () => {
    const matches = properties.filter(propertyMatches);
    if (matches.length > visibleLimit) {
      visibleLimit += 6;
      renderProperties();
    } else {
      const note = $('#load-more-note');
      if (note) note.textContent = 'This is the complete live inventory. Contact Zil to request additional options.';
    }
  });
  renderProperties();
}

/* -------------------------------------------------------
   Property detail panel, gallery and full-screen lightbox
------------------------------------------------------- */
let activeProperty = properties[0];
let activeImageIndex = 0;
let returnFocusTo = null;

function updateGallery() {
  if (!activeProperty) return;
  const image = activeProperty.images[activeImageIndex];
  const galleryImage = $('#gallery-image');
  const lightboxImage = $('#lightbox-image');
  if (galleryImage) {
    galleryImage.style.opacity = '0.25';
    const variant = imageVariants(image);
    window.setTimeout(() => {
      galleryImage.srcset = variant.srcset;
      galleryImage.sizes = '(min-width:1100px) 46vw, 100vw';
      galleryImage.src = variant.src;
      galleryImage.alt = `${activeProperty.title} — ${labelFor(activeProperty, activeImageIndex)}`;
      galleryImage.style.opacity = '1';
    }, 90);
  }
  if (lightboxImage) {
    const large = imageVariants(image);
    lightboxImage.srcset = large.srcset;
    lightboxImage.sizes = '92vw';
    lightboxImage.src = large.src;
    lightboxImage.alt = `${activeProperty.title} — ${labelFor(activeProperty, activeImageIndex)}`;
  }
  const counter = `${String(activeImageIndex + 1).padStart(2, '0')} / ${String(activeProperty.images.length).padStart(2, '0')}`;
  const galleryCounter = $('#gallery-counter');
  const lightboxCounter = $('#lightbox-counter');
  if (galleryCounter) galleryCounter.textContent = counter;
  if (lightboxCounter) lightboxCounter.textContent = counter;
  $$('.gallery-thumb').forEach((thumb, index) => {
    thumb.classList.toggle('active', index === activeImageIndex);
    thumb.setAttribute('aria-current', String(index === activeImageIndex));
  });
  const activeThumb = $('.gallery-thumb.active');
  // Scroll only the thumbnail strip sideways. scrollIntoView would also scroll the whole listing panel.
  const strip = $('#gallery-thumbs');
  if (activeThumb && strip) {
    const left = activeThumb.offsetLeft - (strip.clientWidth - activeThumb.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }
}

function changeGallery(direction) {
  if (!activeProperty) return;
  activeImageIndex = (activeImageIndex + direction + activeProperty.images.length) % activeProperty.images.length;
  updateGallery();
}

function openPropertyModal(propertyId = properties[0]?.id) {
  const property = properties.find(item => item.id === propertyId) || properties[0];
  const modal = $('#property-modal');
  if (!property || !modal) return;
  activeProperty = property;
  activeImageIndex = 0;
  returnFocusTo = document.activeElement;
  $('#modal-title').textContent = property.title;
  $('.modal-location').textContent = property.location;
  $('.modal-price').textContent = formatPrice(property.price);
  const facts = $$('.modal-facts strong');
  if (facts[0]) facts[0].textContent = property.bedrooms;
  if (facts[1]) facts[1].textContent = property.type;
  if (facts[2]) facts[2].textContent = property.status;
  if (facts[3]) facts[3].textContent = property.titleDeed || 'To be confirmed';
  $('#modal-id').textContent = ' / ' + property.id;
  $('#modal-status-line').textContent = `${property.status.toUpperCase()} · ${property.location.split(', ').pop().toUpperCase()}`;
  $('.modal-description').textContent = property.description || '';

  const thumbs = $('#gallery-thumbs');
  thumbs.replaceChildren(...property.images.map((src, index) => {
    const button = document.createElement('button');
    button.className = `gallery-thumb${index === 0 ? ' active' : ''}`;
    button.type = 'button';
    button.setAttribute('aria-label', `Show photo ${index + 1}: ${labelFor(property, index)}`);
    const thumb = imageVariants(src);
    button.innerHTML = `<img src="${thumb.src}" srcset="${thumb.srcset}" sizes="60px" alt="" loading="lazy" decoding="async">`;
    button.addEventListener('click', () => { activeImageIndex = index; updateGallery(); });
    return button;
  }));
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  updateGallery();
  window.setTimeout(() => $('#modal-close')?.focus({ preventScroll: true }), 150);
}

function closePropertyModal() {
  const modal = $('#property-modal');
  if (!modal) return;
  closeLightbox();
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  if (returnFocusTo && typeof returnFocusTo.focus === 'function') returnFocusTo.focus();
}

function openLightbox() {
  const lightbox = $('#lightbox');
  if (!lightbox) return;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  updateGallery();
}
function closeLightbox() {
  const lightbox = $('#lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
}

function setupPropertyModal() {
  document.addEventListener('click', event => {
    const openButton = event.target.closest('[data-open-property]');
    if (openButton) openPropertyModal(openButton.dataset.id || properties[0]?.id);
    if (event.target.closest('[data-close-modal]')) closePropertyModal();
  });
  $('#gallery-prev')?.addEventListener('click', () => changeGallery(-1));
  $('#gallery-next')?.addEventListener('click', () => changeGallery(1));
  $('#gallery-open')?.addEventListener('click', openLightbox);
  $('#lightbox-close')?.addEventListener('click', closeLightbox);
  $('#lightbox-prev')?.addEventListener('click', () => changeGallery(-1));
  $('#lightbox-next')?.addEventListener('click', () => changeGallery(1));
  $('#modal-enquire')?.addEventListener('click', () => {
    closePropertyModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeLightbox();
      closePropertyModal();
    }
    if (event.key === 'ArrowRight' && $('#property-modal')?.classList.contains('is-open')) changeGallery(1);
    if (event.key === 'ArrowLeft' && $('#property-modal')?.classList.contains('is-open')) changeGallery(-1);
  });

  // Swipe gestures work on touch screens and pointer devices.
  ['#gallery-main', '#lightbox'].forEach(selector => {
    const surface = $(selector);
    if (!surface) return;
    let startX = 0;
    let startY = 0;
    surface.addEventListener('pointerdown', event => { startX = event.clientX; startY = event.clientY; });
    surface.addEventListener('pointerup', event => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) changeGallery(dx < 0 ? 1 : -1);
    });
  });
}

/* -------------------------------------------------------
   Scroll reveals and count-up stats
------------------------------------------------------- */
let revealObserver;
function observeReveals(root = document) {
  const targets = $$('.reveal-up, .reveal-image', root);
  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    targets.forEach(element => {
      if (element.dataset.gsapReady === '1') return;
      element.dataset.gsapReady = '1';
      const isImage = element.classList.contains('reveal-image');
      window.gsap.fromTo(element,
        isImage ? { clipPath: 'inset(0 0 100% 0)' } : { opacity: 0, y: 30 },
        { clipPath: isImage ? 'inset(0 0 0% 0)' : undefined, opacity: isImage ? undefined : 1, y: isImage ? undefined : 0,
          duration: isImage ? 1.15 : .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } }
      );
    });
    return;
  }
  if (!('IntersectionObserver' in window)) {
    targets.forEach(element => element.classList.add('is-visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -35px 0px' });
  }
  targets.forEach(element => {
    if (!element.classList.contains('is-visible')) revealObserver.observe(element);
  });
}

function setupCountUps() {
  const counters = $$('[data-count]');
  const animateCounter = element => {
    if (element.dataset.counted) return;
    element.dataset.counted = '1';
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || '';
    if (prefersReducedMotion) { element.textContent = target.toLocaleString('en-NG') + suffix; return; }
    const start = performance.now();
    const duration = 1300;
    const tick = now => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = Math.round(target * eased).toLocaleString('en-NG') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) { counters.forEach(animateCounter); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: .7 });
  counters.forEach(counter => observer.observe(counter));
}

/* -------------------------------------------------------
   Auto-advancing, draggable service principles carousel
------------------------------------------------------- */
function setupValuesCarousel() {
  const carousel = $('#values-carousel');
  if (!carousel) return;
  const slides = $$('.values-slide', carousel);
  const dots = $$('.value-dot', carousel);
  if (!slides.length) return;
  let active = 0;
  let intervalId = null;
  let pointerStart = null;

  const show = index => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === active));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === active));
  };
  const stop = () => { if (intervalId) window.clearInterval(intervalId); intervalId = null; };
  const start = () => {
    stop();
    if (!prefersReducedMotion) intervalId = window.setInterval(() => show(active + 1), 6000);
  };
  $('#values-prev')?.addEventListener('click', () => { show(active - 1); start(); });
  $('#values-next')?.addEventListener('click', () => { show(active + 1); start(); });
  dots.forEach(dot => dot.addEventListener('click', () => { show(Number(dot.dataset.slide)); start(); }));
  carousel.addEventListener('pointerdown', event => { pointerStart = event.clientX; stop(); });
  carousel.addEventListener('pointerup', event => {
    if (pointerStart === null) return;
    const delta = event.clientX - pointerStart;
    if (Math.abs(delta) > 45) show(active + (delta < 0 ? 1 : -1));
    pointerStart = null;
    start();
  });
  carousel.addEventListener('pointercancel', () => { pointerStart = null; start(); });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  start();
}

/* -------------------------------------------------------
   Contact form — opens a prefilled email, no backend assumed
------------------------------------------------------- */
function setupContactForm() {
  const form = $('#contact-form');
  const feedback = $('#form-feedback');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const interest = String(data.get('interest') || '').trim();
    const location = String(data.get('location') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Zil Propertz enquiry — ${interest}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\nPreferred location: ${location || 'Not specified'}\n\nMessage:\n${message || 'No additional message.'}`
    );
    if (contactEmail.includes('replace-this-with-your-email')) {
      if (feedback) feedback.textContent = 'The form is ready. Add the official business email in assets/js/main.js to activate email delivery.';
      return;
    }
    if (feedback) feedback.textContent = 'Opening your email app with the enquiry details…';
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
}

/* -------------------------------------------------------
   Small finishing touches
------------------------------------------------------- */
function setupMagneticButtons() {
  if (prefersReducedMotion || window.matchMedia('(hover: none)').matches) return;
  $$('.magnetic').forEach(element => {
    element.addEventListener('mousemove', event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .08;
      const y = (event.clientY - rect.top - rect.height / 2) * .08;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('mouseleave', () => { element.style.transform = ''; });
  });
}

function setupYear() {
  const year = $('#current-year');
  if (year) year.textContent = new Date().getFullYear();
}

function init() {
  if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
  setupPreloader();
  setupNavigation();
  setupSearch();
  setupPropertyModal();
  setupCountUps();
  setupValuesCarousel();
  setupContactForm();
  setupMagneticButtons();
  setupYear();
  observeReveals(document);

  // GSAP is progressive enhancement: the site remains functional without the CDN.
  if (window.gsap && window.ScrollTrigger) window.ScrollTrigger.refresh();
}

document.addEventListener('DOMContentLoaded', init);
