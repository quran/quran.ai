(() => {
  const storageKey = 'quran-docs-theme';
  const root = document.documentElement;
  const themeStatus = document.getElementById('theme-status');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const themeButtons = Array.from(document.querySelectorAll('[data-theme-choice]'));
  const hero = document.querySelector('.hero');
  const heroCopy = document.querySelector('.hero-copy');
  const heroActions = hero?.querySelector('.actions');
  const photoFrame = document.querySelector('.hero-photo-frame');
  const photoWindow = document.querySelector('.hero-photo-window');

  function resolveTheme(preference) {
    return preference === 'system' ? (media.matches ? 'navy' : 'sepia') : preference;
  }

  function applyTheme(preference, announce = false) {
    const resolved = resolveTheme(preference);
    root.dataset.themePreference = preference;
    root.dataset.theme = resolved;
    themeButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === preference));
    });
    if (announce && themeStatus) {
      const label = preference === 'system' ? `System theme, currently ${resolved}` : `${preference} theme`;
      themeStatus.textContent = label.charAt(0).toUpperCase() + label.slice(1) + '.';
    }
  }

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const preference = button.dataset.themeChoice;
      try { localStorage.setItem(storageKey, preference); } catch (_) {}
      applyTheme(preference, true);
    });
  });

  media.addEventListener('change', () => {
    if (root.dataset.themePreference === 'system') applyTheme('system');
  });

  function alignHeroPhoto() {
    if (!photoFrame || !hero || !heroActions || window.innerWidth <= 620) {
      photoFrame?.style.removeProperty('top');
      return;
    }
    const height = photoFrame.getBoundingClientRect().height;
    const top = heroActions.getBoundingClientRect().bottom - hero.getBoundingClientRect().top - height;
    photoFrame.style.top = `${top.toFixed(3)}px`;
  }

  function roundPhotoCorners() {
    if (!photoWindow) return;
    const { width, height } = photoWindow.getBoundingClientRect();
    if (!width || !height) return;
    const radius = Math.min(20, Math.min(width, height) * .08);
    const points = [[width * .3, 0], [width, 0], [width * .7, height], [0, height]];
    const rounded = points.map((point, index) => {
      const previous = points[(index + 3) % 4];
      const next = points[(index + 1) % 4];
      const before = [previous[0] - point[0], previous[1] - point[1]];
      const after = [next[0] - point[0], next[1] - point[1]];
      const beforeLength = Math.hypot(...before);
      const afterLength = Math.hypot(...after);
      const a = before.map((value) => value / beforeLength);
      const b = after.map((value) => value / afterLength);
      const angle = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1])));
      const distance = radius / Math.tan(angle / 2);
      return {
        before: [point[0] + a[0] * distance, point[1] + a[1] * distance],
        after: [point[0] + b[0] * distance, point[1] + b[1] * distance]
      };
    });
    const coordinates = (point) => point.map((value) => value.toFixed(3)).join(' ');
    let path = `M${coordinates(rounded[0].after)}`;
    for (const index of [1, 2, 3, 0]) {
      path += `L${coordinates(rounded[index].before)}A${radius.toFixed(3)} ${radius.toFixed(3)} 0 0 1 ${coordinates(rounded[index].after)}`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><path d="${path}Z" fill="white"/></svg>`;
    photoWindow.style.maskImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  applyTheme(root.dataset.themePreference || 'system');
  alignHeroPhoto();
  roundPhotoCorners();

  if ('ResizeObserver' in window) {
    const photoResize = new ResizeObserver(roundPhotoCorners);
    photoResize.observe(photoWindow);
    const heroResize = new ResizeObserver(alignHeroPhoto);
    heroResize.observe(document.querySelector('.site-shell'));
    heroResize.observe(heroCopy);
  } else {
    window.addEventListener('resize', () => {
      alignHeroPhoto();
      roundPhotoCorners();
    });
  }

  document.fonts?.ready.then(alignHeroPhoto);
})();
