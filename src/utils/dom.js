export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function setCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

export function initScrollAnimations() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

export function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;
  if (window.matchMedia('(hover: none)').matches) {
    spotlight.style.display = 'none';
    return;
  }
  document.addEventListener('pointermove', (e) => {
    spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

export function initSkillBars() {
  const fills = document.querySelectorAll('.cv-skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = `${fill.getAttribute('data-width')}%`;
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.2 }
  );

  fills.forEach((fill) => observer.observe(fill));
}

export function initStatsCounters() {
  const statsSection = document.getElementById('stats');
  const counters = document.querySelectorAll('.stat-number[data-counter-target]');
  if (!statsSection || !counters.length) return;

  let hasAnimated = false;

  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-counter-target') || 0);
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = 1400;
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  const startCounters = () => {
    if (hasAnimated) return;
    hasAnimated = true;
    counters.forEach(animateCounter);
  };

  if (typeof IntersectionObserver === 'undefined') {
    startCounters();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(statsSection);
}