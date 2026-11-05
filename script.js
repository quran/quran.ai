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
    const radius = Math.min(40, Math.min(width, height) * .16);
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
    // Fade the photo out along a shallow line toward the lower left, into the page.
    photoWindow.style.maskImage += ', linear-gradient(241deg, #000 30%, rgb(0 0 0 / .6) 58%, transparent 90%)';
    // A second fade, from the lower right toward the upper left.
    photoWindow.style.maskImage += ', linear-gradient(293deg, #000 31%, rgb(0 0 0 / .55) 66%, transparent 100%)';
    // The hero clips the photo's right side; round and soften that cut instead of leaving a hard edge.
    const clipRight = hero.getBoundingClientRect().right - photoWindow.getBoundingClientRect().left;
    if (clipRight > 0 && clipRight < width) {
      const r = Math.min(12, height * .06);
      const edge = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><filter id="s"><feGaussianBlur stdDeviation="1.1"/></filter><rect x="${-2 * r}" y="0" width="${(clipRight + 2 * r - 1).toFixed(3)}" height="${height}" rx="${r.toFixed(3)}" fill="white" filter="url(#s)"/></svg>`;
      photoWindow.style.maskImage += `, url("data:image/svg+xml,${encodeURIComponent(edge)}")`;
    }
    photoWindow.style.maskComposite = 'intersect';
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

// Study session player: question cards load their clip, captions and transcript.
(() => {
  const clips = {"lead": {"dur": "1:14", "asked": ["what's meant by the seas boil over?", "are these the same moment?"], "copy": "We select four ayat of At-Takwir, the sun, the stars, the mountains and the seas, and ask what's meant by “the seas boil over.” The answer starts from the Arabic word, sujjirat, and sets out how al-Tabari reads it. Ibn Ashur agrees and connects it to Al-Infitar 82:3, so we open that ayah and ask whether the two describe the same moment.", "passages": "At-Takwir 81:1–6 · Al-Infitar 82:3", "sources": "al-Tabari, Ibn Ashur, Ibn Kathir", "poster": "/media/posters/seas-boil-over.jpg", "video": "/media/seas-boil-over.mp4", "vtt": "/media/captions/seas-boil-over.vtt", "transcript": ["Here's At-Takwir in the reader, right beside our conversation.", "Let's select the ayat about the sun, the stars, the mountains", "and the seas, and ask what's meant by “the seas boil over.”", "The answer goes straight to the key word, sujjirat, and its readings.", "Al-Tabari records three readings, and prefers the seas filling until they overflow.", "Ibn ʿĀshūr agrees, and links it to Al-Infitar 82:3.", "Let's follow that link. The same reader turns to Al-Infitar 82:3.", "So we ask a follow-up: are these the same moment?", "The two verses appear to describe the same", "upheaval, it says, seen from slightly different angles.", "But neither verse fixes the order, it notes, and if sujjirat means", "set on fire, they may describe different transformations."]}, "patience": {"dur": "1:12", "asked": ["what can we learn about patience and turning to allah from this?"], "copy": "We open Al-Anbiya at the page where the prophets' trials are told one after another, select from Ayyub's prayer through Yunus and Zakariyya, and ask what they teach. The answer takes each prayer in turn: Ayyub shows that patience doesn't mean hiding your pain, Yunus that turning back is still open after your own mistake, and Zakariyya that patience doesn't mean you stop hoping.", "passages": "Al-Anbiya 21:83–90", "sources": "al-Sa‘di, Ibn Kathir", "poster": "/media/posters/patience.jpg", "video": "/media/patience.mp4", "vtt": "/media/captions/patience.vtt", "transcript": ["Let's open Al-Anbiya at the page where the", "prophets' trials are told, one after another.", "We select from Ayyub's prayer through Yunus and Zakariyya,", "and ask what we can learn about patience and turning to Allah.", "Ayyub first: patience doesn't mean hiding your pain.", "“You can be patient and still cry, hurt, seek relief.”", "Yunus: when the hardship follows your own", "mistake, turning back to Allah is still open.", "Zakariyya: patience doesn't mean you stop hoping for something deeply.", "And the pattern through all three: each one called out, and Allah answered."]}, "asbab": {"dur": "0:54", "asked": ["what happened that this needed to be said?"], "copy": "Al-Duha opens with an oath, then: “your Lord has not forsaken you, nor does He hate you.” We select those three ayat and ask why it needed saying. Revelation had paused, the answer explains, and opponents mocked the Prophet ﷺ, saying his Lord had forsaken him. It also weighs the other reports al-Wahidi records, noting where Ibn Kathir questions one.", "passages": "Al-Duha 93:1–3", "sources": "al-Wahidi, Ibn Kathir, al-Tabari", "poster": "/media/posters/duha-asbab.jpg", "video": "/media/duha-asbab.mp4", "vtt": "/media/captions/duha-asbab.vtt", "transcript": ["Here's Al-Duha. It opens with an oath: by the morning", "brightness, and by the night when it grows still.", "We select the first three ayat, ending with “your Lord has not forsaken you,", "nor does He hate you,” and ask what happened that this needed to be said.", "What happened, it says: revelation paused, and opponents", "mocked the Prophet ﷺ, saying his Lord had forsaken him.", "Then Allah's answer in 93:3 denies both things", "they suggested: abandonment, and loss of love.", "It also weighs other reports al-Wahidi records,", "noting where Ibn Kathir questions one."]}, "sharh": {"dur": "1:00", "asked": ["why does this surah come right after ad-duha?"], "copy": "Al-Sharh begins right below Al-Duha on the same page. We select the last ayah of Al-Duha, “talk about the blessings of your Lord,” and the first of Al-Sharh, “Did We not relieve your heart for you?”, and ask why one follows the other. The answer reads the two as one conversation: al-Biqa‘i's Nazm al-Durar says so explicitly, and Ibn Ashur traces three connections between them.", "passages": "Al-Duha 93:11 · Al-Sharh 94:1", "sources": "al-Biqa‘i, Ibn Ashur", "poster": "/media/posters/duha-sharh.jpg", "video": "/media/duha-sharh.mp4", "vtt": "/media/captions/duha-sharh.vtt", "transcript": ["Here's Al-Duha, and right below it on the same page, Al-Sharh begins.", "Let's select the last ayah of Al-Duha, “talk about the blessings of", "your Lord,” and the first of Al-Sharh, “Did We not relieve your", "heart for you?”, and ask why this surah comes right after Al-Duha.", "The answer reads the two surahs as one conversation,", "and goes to the exact point where they meet.", "Al-Duha: speak of My blessings. Al-Sharh: remember the blessings I gave you.", "Al-Biqāʿī's Naẓm al-Durar says so explicitly, and Ibn ʿĀshūr traces three", "connections: past care, future reassurance, and a response to blessings."]}, "memory": {"dur": "1:28", "asked": ["how do I not slip into the other surah? need some kind of memory trick to help me. quiz me afterwards with some prompt cards or something like that."], "copy": "Al-Qalam 68:15 and Al-Mutaffifin 83:13 are word for word the same, which makes them easy to mix up when reciting. We saved a note on each while reading and send both together. The trick is to remember the scene on either side of the shared ayah, and then it tests us with five cards.", "passages": "Al-Qalam 68:15 · Al-Mutaffifin 83:13", "sources": "Sent from two saved notes", "poster": "/media/posters/memory-trick.jpg", "video": "/media/memory-trick.mp4", "vtt": "/media/captions/memory-trick.vtt", "transcript": ["Two passages that are easy to mix up when reciting from memory:", "Al-Qalam 68:15 and Al-Mutaffifin 83:13 are word for word the same.", "We saved notes on both while reading. Let's send them", "to ChatGPT, and ask for a memory trick and a quiz.", "Its trick is to remember the scene on either side: in Al-Qalam, a mark", "upon the snout; in Al-Mutaffifin, hearts covered by what they earned.", "It also flags an earlier overlap, muʿtadin athīm, found in both. From there", "Al-Mutaffifin goes straight to the shared ayah; Al-Qalam takes two more.", "Then it tests us with five cards. Reciting Al-Qalam 68:15,", "what comes next? 68:16, the mark upon the snout.", "Card two asks the same of Al-Mutaffifin 83:13,", "where the answer is the covered hearts of 83:14."]}, "falaq": {"dur": "3:09", "asked": ["what's the full range of meaning of this word's root across the quran?", "how does the sea splitting for musa fit the same idea?"], "copy": "We tap al-falaq in Al-Falaq 113:1 and ask about its root. ف ل ق means to split something open, the answer explains, and it follows the root through the Quran: seeds and fruit stones in 6:95, daybreak in 6:96, and the sea parting for Musa in 26:63. A follow-up asks how the sea fits the same idea.", "passages": "Al-Falaq 113:1 · Al-An‘am 6:95–96 · Ash-Shu‘ara 26:63", "sources": "Ibn Ashur, al-Tabari", "poster": "/media/posters/falaq-root.jpg", "video": "/media/falaq-root.mp4", "vtt": "/media/captions/falaq-root.vtt", "transcript": ["Tap any word in the mushaf, and its meaning appears above, card by card.", "Drag across the cards to follow a phrase, or step through it word by word.", "On a keyboard, the arrow keys move between words, and Shift selects a phrase.", "Select ٱلْفَلَقِ and ask about the full range of its root.", "ف ل ق means to split something open. It appears in just four places in the Quran.", "Seeds and fruit stones split open in Al-Anʿām 6:95, and the reader follows the link.", "The same root describes the sea parting for Musa in Ash-Shuʿarāʾ 26:63.", "So we ask how the sea fits the same idea.", "Seed, night and sea: each time, something closed splits open, and what it hid comes out.", "Read. Select. Ask. Discover."]}, "phrase": {"dur": "3:24", "asked": ["what does this phrase mean in classical arabic, past and future, or literally in front and behind? …", "what other idioms like this does the quran use, where the literal picture isn't the meaning?"], "copy": "In Ayat al-Kursi we drag across the word cards to select “He knows what is before them and what is behind them,” literally between their hands and behind them. The answer reads it as place, as time, and as the seen and the unseen, then follows the phrase to Saba 34:9 and As-Saff 61:6. A second question asks for other idioms whose literal picture isn't the meaning.", "passages": "Al-Baqarah 2:255 · Saba 34:9 · As-Saff 61:6", "sources": "al-Tabari, al-Zamakhshari, Ibn Ashur, Abu Hayyan, al-Jalalayn", "poster": "/media/posters/phrase-idioms.jpg", "video": "/media/phrase-idioms.mp4", "vtt": "/media/captions/phrase-idioms.vtt", "transcript": ["Drag across a whole phrase in Ayat al-Kursi: يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ.", "Then ask what it means in classical Arabic, and where else the Quran uses it.", "Literally “between their hands” and “behind them”: the scholars", "read it as place, as time, and as the seen and the unseen.", "In Saba 34:9 it's literal: the sky and earth in front of them and behind them.", "In As-Saff 61:6, “between my hands” means the Torah that came before.", "Then we ask for other idioms whose literal picture isn't the meaning.", "A hand chained to the neck, the wing of humility, ears struck into a long sleep.", "In Maryam 19:4, the word cards show the picture: a head that catches fire with grey.", "Read. Select. Ask. Discover."]}};
  const video = document.getElementById('player-video');
  const start = document.getElementById('player-start');
  const label = document.getElementById('player-label');
  const copy = document.getElementById('watch-copy');
  function esc(s) { return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]); }
  function load(key, play) {
    const c = clips[key];
    if (!c) return;
    video.pause();
    video.poster = c.poster; video.src = c.video;
    video.querySelectorAll('track').forEach((t) => t.remove());
    if (c.vtt) { const t = document.createElement('track'); Object.assign(t, { kind: 'captions', srclang: 'en', label: 'English', default: true, src: c.vtt }); video.appendChild(t); }
    label.textContent = c.dur;
    start.hidden = false; video.controls = false;
    copy.innerHTML = `<p class="asked-label">Asked</p><ul class="asked">${c.asked.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` +
      `<p class="copy">${esc(c.copy)}</p><p class="watch-meta"><span><strong>Passages</strong> ${esc(c.passages)}</span><span><strong>Sources named</strong> ${esc(c.sources)}</span><span>Recorded in ChatGPT on the web, October 2026. Waiting time is shortened.</span></p><details class="transcript"><summary>Transcript</summary><div>${c.transcript.map((l) => `<p>${esc(l)}</p>`).join('')}</div></details>`;
    document.querySelectorAll('.qcard').forEach((b) => b.setAttribute('aria-current', String(b.dataset.clip === key)));
    document.getElementById('watch').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (play) begin();
  }
  function begin() { start.hidden = true; video.controls = true; video.play().catch(() => {}); }
  start.addEventListener('click', begin);
  document.querySelectorAll('[data-clip]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); load(el.dataset.clip, false); }));
  window.copyStarter = function (btn) { navigator.clipboard?.writeText("Open the Qur'an reader.").catch(() => {}); btn.classList.add('copied'); btn.querySelector('.starter-tip').textContent = 'Copied'; clearTimeout(btn._t); btn._t = setTimeout(() => { btn.classList.remove('copied'); btn.querySelector('.starter-tip').textContent = ''; }, 1400); };
})();
