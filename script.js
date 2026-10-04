(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const hero = document.querySelector('.hero');
  const heroCopy = document.querySelector('.hero-copy');
  const heroActions = hero?.querySelector('.actions');
  const photoFrame = document.querySelector('.hero-photo-frame');
  const photoWindow = document.querySelector('.hero-photo-window');
  const pageFrame = document.querySelector('.page-frame');
  const atmosphere = document.querySelector('.hero-atmosphere');

  function applySystemTheme() {
    root.dataset.theme = media.matches ? 'navy' : 'sepia';
  }

  media.addEventListener('change', applySystemTheme);

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

  function positionAtmosphere() {
    if (!atmosphere || !photoFrame || !pageFrame) return;
    if (window.innerWidth <= 620) {
      atmosphere.hidden = true;
      return;
    }
    const stage = document.body.getBoundingClientRect();
    const photo = photoFrame.getBoundingClientRect();
    const unit = pageFrame.getBoundingClientRect().width / 740;
    const photoX = photo.left - stage.left;
    const photoY = photo.top - stage.top;
    // Retain the grid's phase and fade around the photo while letting it cross the content edge.
    const gridX = photoX - 78 * unit;
    const gridY = photoY - 76 * unit;
    const gridWidth = photo.width + 78 * unit;
    const gridHeight = photo.height + 76 * unit;
    const values = {
      unit,
      'photo-x': photoX, 'photo-y': photoY,
      'photo-width': photo.width, 'photo-height': photo.height,
      'grid-x': gridX, 'grid-y': gridY,
      'grid-cx': gridX + .67 * gridWidth, 'grid-cy': gridY + .53 * gridHeight,
      'grid-rx': .61 * gridWidth, 'grid-ry': .66 * gridHeight
    };
    Object.entries(values).forEach(([key, value]) => {
      atmosphere.style.setProperty(`--${key}`, `${value}px`);
    });
    atmosphere.hidden = false;
  }

  function layoutHero() {
    alignHeroPhoto();
    roundPhotoCorners();
    positionAtmosphere();
  }

  applySystemTheme();
  layoutHero();

  if ('ResizeObserver' in window) {
    const heroResize = new ResizeObserver(layoutHero);
    heroResize.observe(photoWindow);
    heroResize.observe(document.body);
    heroResize.observe(heroCopy);
  } else {
    window.addEventListener('resize', layoutHero);
  }

  document.fonts?.ready.then(layoutHero);
})();
