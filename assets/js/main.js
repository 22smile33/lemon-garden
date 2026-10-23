/* =========================================================
   ROLL 016 — interactions
   Film strip, contact sheet, lightbox. No dependencies.
   ========================================================= */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var PHOTOS = [
    { file: '01', w: 1800, h: 1012, credit: '' },
    { file: '02', w: 1800, h: 1012, credit: '' },
    { file: '03', w: 1800, h: 1012, credit: '' },
    { file: '04', w: 1800, h: 1012, credit: '' },
    { file: '05', w: 1800, h: 1012, credit: '' },
    { file: '06', w: 1800, h: 1012, credit: '' },
    { file: '07', w: 1800, h: 1012, credit: '' },
    { file: '08', w: 1800, h: 1266, credit: 'photo.8.credit' },
    { file: '09', w: 1800, h: 1266, credit: 'photo.9.credit' },
    { file: '10', w: 1800, h: 1266, credit: 'photo.10.credit' },
    { file: '11', w: 1800, h: 1012, credit: '' },
    { file: '12', w: 1800, h: 1012, credit: '' },
    { file: '13', w: 1800, h: 1012, credit: 'photo.13.credit' },
    { file: '14', w: 1800, h: 1012, credit: '' },
    { file: '15', w: 1800, h: 1012, credit: '' },
    { file: '16', w: 1800, h: 1012, credit: '' }
  ];

  var I18N = {
    zh: {
      'meta.title': 'ROLL 016 — lemonの秘密花园 · VRChat 影像志',
      'meta.desc': '十六帧 VRChat 影像：霓虹、烟花、营地、婚礼，和屏幕里不想结束的夜晚。',
      'nav.roll': '胶卷',
      'nav.sheet': '印样',
      'nav.notes': '手记',
      'nav.garden': '花园',
      'hero.lede': '十六帧，十六个不想结束的夜晚。霓虹、烟花、营地、婚礼，还有屏幕里那些被留下来的瞬间。',
      'hero.stat1': '帧',
      'hero.stat2': '章',
      'hero.stat3': '座花园',
      'hero.cta': '展开胶卷',
      'hero.join': '加入群组',
      'hero.hint': '向下滚动，展开整卷',
      'print.vows': 'the vows',
      'print.sky': 'pink sky',
      'print.neon': 'neon',
      'roll.title': '整卷胶片',
      'roll.desc': '左右拖动，或按方向键。每一帧都可以点开。',
      'roll.hint': '拖动 / 滑动 · 点击放大',
      'sheet.title': '接触印样',
      'sheet.desc': '十六帧排在一起，像刚从暗房里拿出来。',
      'notes.title': '拍摄手记',
      'notes.desc': '关于灯光、屏幕，和一次婚礼。',
      'note.1.title': '灯光亮起来的时候',
      'note.1.body': '第一次在 VRChat 里跳舞，是在一个满是星星的世界。我们谁也不会跳，但音乐响起来的时候，好像也没那么重要。',
      'note.1.quote': '那一晚我们跳到了很晚。',
      'note.2.title': '屏幕里的我们',
      'note.2.body': '有时会忘记，这些照片其实是对着一块屏幕拍的。但照片里的风、灯光和笑声，都是真的。',
      'note.2.quote': '虚拟世界也可以很认真。',
      'note.3.title': '花园里的婚礼',
      'note.3.body': '她走过红毯的时候，所有人都安静了一秒。那一刻突然觉得，就算只是像素和 polygons，誓言也是真的。',
      'note.3.quote': '愿意和你一起，再看很多次烟花。',
      'garden.title': '一座只在虚拟世界里存在的花园。',
      'garden.p1': 'lemonの秘密花园 是一个以 VRChat 为据点的小群组。我们在不同的世界里拍照、跳舞、参加婚礼，也一起发呆。',
      'garden.p2': '这些照片大多来自朋友们的镜头。谢谢你按下快门，也谢谢每一个出现在画面里的人。',
      'garden.stat': '个夜晚',
      'garden.join': '在 VRChat 加入我们',
      'garden.note': '入群前请先读群规，友善相处。',
      'credits.title': '画面署名',
      'footer.top': '回到顶部 ↑',
      'footer.note': '静态站点 · 无追踪',
      'lightbox.label': '照片查看器',
      'lightbox.close': '关闭 ×',
      'lightbox.closeAria': '关闭',
      'lightbox.prev': '上一张',
      'lightbox.next': '下一张',
      'ui.frame': '帧',
      'ui.play': '播放',
      'ui.pause': '暂停',
      'photo.1.title': '霓虹舞步',
      'photo.1.alt': '霓虹灯下跳舞的两位 VRChat avatar',
      'photo.2.title': '城市上空',
      'photo.2.alt': '城市夜景上空的两位带翅膀 avatar',
      'photo.3.title': '夜色三人',
      'photo.3.alt': '夜色中的三位深色系 avatar',
      'photo.4.title': '粉色天空',
      'photo.4.alt': '粉色天空中飞行的两位 avatar',
      'photo.5.title': '烟花与你',
      'photo.5.alt': '烟花下的两位 avatar 特写',
      'photo.6.title': '屏幕里的我们',
      'photo.6.alt': '秋日森林中的一块屏幕，屏幕里是三位 avatar',
      'photo.7.title': '舞台五人',
      'photo.7.alt': '霓虹舞台上的五位 avatar',
      'photo.8.title': '拍立得之夜',
      'photo.8.alt': '拍立得相纸上的两位 avatar，带摄影署名',
      'photo.8.credit': '摄影 chigu333 · 01/16/2026 · MR MMD World',
      'photo.8.short': 'chigu333',
      'photo.9.title': '营地与篝火',
      'photo.9.alt': '篝火、彩虹旗与营地里的 avatar',
      'photo.9.credit': '摄影 bao咖咖 · 06/26/2026 · VRChat Official Pride',
      'photo.9.short': 'bao咖咖',
      'photo.10.title': '重庆的夜',
      'photo.10.alt': '重庆夜景前的白发 avatar',
      'photo.10.credit': 'Captured by link0319 · 06/16/2025 · Chongqing Night',
      'photo.10.short': 'link0319',
      'photo.11.title': '挤在一起',
      'photo.11.alt': '四位 avatar 挤在一起',
      'photo.12.title': '卡拉OK',
      'photo.12.alt': '卡拉OK屏幕上的两位 avatar',
      'photo.13.title': '生日帖',
      'photo.13.alt': '两位 avatar 举着一张社交媒体帖子打印件',
      'photo.13.credit': '画面中的帖子：总督喵喵 @MoffCat',
      'photo.13.short': '总督喵喵',
      'photo.14.title': '走过红毯',
      'photo.14.alt': '粉色地毯上走来的新娘',
      'photo.15.title': '花束',
      'photo.15.alt': '石墙前抱着花束的新娘',
      'photo.16.title': '舞台边',
      'photo.16.alt': '舞台灯光下的两位 avatar 特写'
    },
    en: {
      'meta.title': "ROLL 016 — lemon's secret garden · VRChat Photo Roll",
      'meta.desc': 'Sixteen frames from VRChat: neon, fireworks, a campfire, a wedding, and nights we did not want to end.',
      'nav.roll': 'Roll',
      'nav.sheet': 'Contact',
      'nav.notes': 'Notes',
      'nav.garden': 'Garden',
      'hero.lede': "Sixteen frames, sixteen nights we didn't want to end. Neon, fireworks, a campfire, a wedding — and all the moments we kept on a screen.",
      'hero.stat1': 'frames',
      'hero.stat2': 'chapters',
      'hero.stat3': 'garden',
      'hero.cta': 'Unroll the film',
      'hero.join': 'Join the group',
      'hero.hint': 'Scroll to unroll the film',
      'print.vows': 'the vows',
      'print.sky': 'pink sky',
      'print.neon': 'neon',
      'roll.title': 'The roll',
      'roll.desc': 'Drag sideways, or use the arrow keys. Every frame opens.',
      'roll.hint': 'Drag / swipe · click to enlarge',
      'sheet.title': 'Contact sheet',
      'sheet.desc': 'Sixteen frames side by side, straight out of the darkroom.',
      'notes.title': 'Field notes',
      'notes.desc': 'About lights, screens, and a wedding.',
      'note.1.title': 'When the lights came on',
      'note.1.body': 'The first time we danced in VRChat was in a world full of stars. None of us could dance, but once the music started it did not seem to matter.',
      'note.1.quote': 'We stayed until very late.',
      'note.2.title': 'Us, on a screen',
      'note.2.body': 'Sometimes I forget these photos were taken in front of a screen. But the wind, the lights and the laughter in them were real.',
      'note.2.quote': 'A virtual world can still be serious.',
      'note.3.title': 'A wedding in the garden',
      'note.3.body': 'When she walked down the aisle, everyone went quiet for a second. Even if it was only pixels and polygons, the vows felt real.',
      'note.3.quote': "I'd watch the fireworks with you again.",
      'garden.title': 'A garden that only exists in the virtual world.',
      'garden.p1': "lemon's secret garden is a small VRChat group. We take photos, dance, attend weddings, and do nothing together in worlds that are not on any map.",
      'garden.p2': 'Most of these frames came from our friends’ cameras. Thank you for pressing the shutter, and thank you to everyone in the frame.',
      'garden.stat': 'nights',
      'garden.join': 'Join us on VRChat',
      'garden.note': 'Please read the group rules first — and be kind.',
      'credits.title': 'Frame credits',
      'footer.top': 'Back to top ↑',
      'footer.note': 'Static site · no tracking',
      'lightbox.label': 'Photo viewer',
      'lightbox.close': 'Close ×',
      'lightbox.closeAria': 'Close',
      'lightbox.prev': 'Previous',
      'lightbox.next': 'Next',
      'ui.frame': 'Frame',
      'ui.play': 'Play',
      'ui.pause': 'Pause',
      'photo.1.title': 'Neon steps',
      'photo.1.alt': 'Two VRChat avatars dancing under neon lights',
      'photo.2.title': 'Above the city',
      'photo.2.alt': 'Two winged avatars above a city at night',
      'photo.3.title': 'Three in the dark',
      'photo.3.alt': 'Three dark-clad avatars at night',
      'photo.4.title': 'Pink sky',
      'photo.4.alt': 'Two avatars flying through a pink sky',
      'photo.5.title': 'Fireworks, with you',
      'photo.5.alt': 'Close-up of two avatars under fireworks',
      'photo.6.title': 'Us on a screen',
      'photo.6.alt': 'A screen in an autumn forest showing three avatars',
      'photo.7.title': 'Five on stage',
      'photo.7.alt': 'Five avatars posing on a neon stage',
      'photo.8.title': 'Photobooth night',
      'photo.8.alt': 'Photobooth print of two avatars with a photographer credit',
      'photo.8.credit': 'Photo: chigu333 · 01/16/2026 · MR MMD World',
      'photo.8.short': 'chigu333',
      'photo.9.title': 'Campfire',
      'photo.9.alt': 'Avatars around a campfire with pride flags',
      'photo.9.credit': 'Photo: bao咖咖 · 06/26/2026 · VRChat Official Pride',
      'photo.9.short': 'bao咖咖',
      'photo.10.title': 'Chongqing night',
      'photo.10.alt': 'A white-haired avatar in front of the Chongqing skyline',
      'photo.10.credit': 'Captured by link0319 · 06/16/2025 · Chongqing Night',
      'photo.10.short': 'link0319',
      'photo.11.title': 'Pile up',
      'photo.11.alt': 'Four avatars cuddled together',
      'photo.12.title': 'Karaoke',
      'photo.12.alt': 'Two avatars on a karaoke screen',
      'photo.13.title': 'A birthday post',
      'photo.13.alt': 'Two avatars holding a printed social post',
      'photo.13.credit': 'Post by 总督喵喵 @MoffCat',
      'photo.13.short': '总督喵喵',
      'photo.14.title': 'Down the aisle',
      'photo.14.alt': 'A bride walking down a pink aisle',
      'photo.15.title': 'The bouquet',
      'photo.15.alt': 'A bride holding a bouquet by a stone wall',
      'photo.16.title': 'By the stage',
      'photo.16.alt': 'Close-up of two avatars under stage lights'
    }
  };

  var state = { lang: 'zh', photo: 0, playing: false, resumeAfterLightbox: false };
  var els = {};
  var filmRaf = 0;
  var filmLast = 0;
  var frameStepCache = 0;
  var filmPadLeft = 0;
  var filmViewWidth = 0;

  function t(key) {
    var dict = I18N[state.lang] || I18N.zh;
    return typeof dict[key] === 'string' ? dict[key] : (I18N.zh[key] || key);
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  /* ---------------- language ---------------- */

  function applyLanguage(lang, options) {
    if (!I18N[lang]) return;
    options = options || {};
    state.lang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    $$('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.dataset.i18n);
    });

    $$('[data-i18n-aria-label]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
    });

    document.title = t('meta.title');
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc'));

    els.langBtn.textContent = lang === 'zh' ? 'EN' : '中';
    els.langBtn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');

    updateMediaLabels();
    updateStripLabels();
    updatePlayLabel();

    if (els.lightbox && els.lightbox.open) goPhoto(state.photo);

    if (options.persist !== false) {
      try { localStorage.setItem('roll.lang', lang); } catch (e) {}
    }
  }

  function updateMediaLabels() {
    $$('[data-photo]').forEach(function (btn) {
      var i = Number(btn.dataset.photo);
      var n = i + 1;
      var img = $('img', btn);
      var title = t('photo.' + n + '.title');
      if (img) img.alt = t('photo.' + n + '.alt');
      btn.setAttribute('aria-label', t('ui.frame') + ' ' + pad(n) + ' — ' + title);
    });
  }

  function updatePlayLabel() {
    if (!els.playBtn) return;
    els.playBtn.setAttribute('aria-label', state.playing ? t('ui.pause') : t('ui.play'));
  }

  function updateStripLabels() {
    $$('.lb-thumb').forEach(function (btn, i) {
      btn.setAttribute('aria-label', t('photo.' + (i + 1) + '.title'));
    });
  }

  /* ---------------- header ---------------- */

  function initHeader() {
    var bar = els.topbar;
    function update() {
      bar.classList.toggle('is-scrolled', (window.scrollY || window.pageYOffset) > 12);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();

    if (!('IntersectionObserver' in window)) return;
    var links = {};
    $$('.nav a').forEach(function (a) {
      var id = a.getAttribute('href').replace('#', '');
      links[id] = a;
    });
    var sections = ['roll', 'sheet', 'notes', 'garden']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        $$('.nav a').forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = links[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------------- film strip ---------------- */

  function frameStep() {
    if (frameStepCache) return frameStepCache;
    var first = $('.frame', els.film);
    var w = first ? first.getBoundingClientRect().width : 0;
    frameStepCache = (w || 420) + 20;
    return frameStepCache;
  }

  function scrollFilm(direction) {
    var max = els.film.scrollWidth - els.film.clientWidth;
    if (max <= 0) return;
    var target = Math.max(0, Math.min(max, els.film.scrollLeft + direction * frameStep()));
    if (typeof els.film.scrollTo === 'function') {
      try {
        els.film.scrollTo({ left: target, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        return;
      } catch (e) {}
    }
    els.film.scrollLeft = target;
  }

  function refreshFilmMetrics() {
    frameStepCache = 0;
    var style = window.getComputedStyle(els.film);
    filmPadLeft = parseFloat(style.paddingLeft) || 0;
    filmViewWidth = els.film.clientWidth;
  }

  function updateProgress() {
    var step = frameStep();
    var n = PHOTOS.length;
    var loopWidth = n * step;
    var frameWidth = Math.max(1, step - 20);
    var rel = loopWidth > 0 ? ((els.film.scrollLeft - step) % loopWidth + loopWidth) % loopWidth : 0;
    var center = rel + (filmViewWidth || els.film.clientWidth) / 2;
    var indexFloat = step > 0 ? (center - filmPadLeft - frameWidth / 2) / step : 0;

    while (indexFloat >= n) indexFloat -= n;
    if (indexFloat < 0) indexFloat = 0;

    var ratio = n > 1 ? Math.min(1, Math.max(0, indexFloat / (n - 1))) : 0;
    els.progress.style.width = (ratio * 100).toFixed(3) + '%';

    var index = Math.min(n, Math.max(1, Math.floor(indexFloat) + 1));
    if (els.counter) els.counter.textContent = pad(index) + ' / ' + n;
  }

  function playLoop(time) {
    if (!state.playing) return;
    if (!filmLast) filmLast = time;
    var dt = Math.min((time - filmLast) / 1000, 0.05);
    filmLast = time;

    var step = frameStep();
    var loopWidth = PHOTOS.length * step;
    if (loopWidth > 0) {
      var start = step;
      var end = start + loopWidth;
      var next = els.film.scrollLeft + 120 * dt;
      if (next >= end) next -= loopWidth;
      if (next < start) next += loopWidth;
      els.film.scrollLeft = next;
      updateProgress();
    }
    filmRaf = window.requestAnimationFrame(playLoop);
  }

  function setPlaying(next) {
    state.playing = next;
    els.playBtn.textContent = next ? 'PAUSE' : 'PLAY';
    els.playBtn.setAttribute('aria-pressed', String(next));
    updatePlayLabel();

    if (filmRaf) {
      window.cancelAnimationFrame(filmRaf);
      filmRaf = 0;
    }
    filmLast = 0;
    els.film.classList.toggle('is-playing', next);
    if (next) filmRaf = window.requestAnimationFrame(playLoop);
  }

  function initFilm() {
    var film = els.film;

    var originals = $$('.frame', film);
    var pre = originals[originals.length - 1].cloneNode(true);
    pre.setAttribute('aria-hidden', 'true');
    pre.setAttribute('tabindex', '-1');
    els.track.insertBefore(pre, els.track.firstChild);

    originals.forEach(function (frame) {
      var clone = frame.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      els.track.appendChild(clone);
    });

    $$('.frame img', film).forEach(function (img) { img.draggable = false; });

    film.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', function () {
      var oldStep = frameStepCache || frameStep();
      var rel = els.film.scrollLeft - oldStep;
      refreshFilmMetrics();
      var newStep = frameStep();
      var loopWidth = PHOTOS.length * newStep;
      rel = ((rel % loopWidth) + loopWidth) % loopWidth;
      els.film.style.scrollBehavior = 'auto';
      els.film.scrollLeft = newStep + rel;
      els.film.style.scrollBehavior = '';
      updateProgress();
    });

    els.prevBtn.addEventListener('click', function () {
      if (state.playing) setPlaying(false);
      scrollFilm(-1);
    });
    els.nextBtn.addEventListener('click', function () {
      if (state.playing) setPlaying(false);
      scrollFilm(1);
    });
    els.playBtn.addEventListener('click', function () {
      setPlaying(!state.playing);
    });

    film.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (state.playing) setPlaying(false);
        scrollFilm(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (state.playing) setPlaying(false);
        scrollFilm(-1);
      }
    });

    var down = false;
    var startX = 0;
    var startScroll = 0;
    var moved = false;

    film.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'touch') return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      down = true;
      moved = false;
      startX = event.clientX;
      startScroll = film.scrollLeft;
      film.classList.add('is-dragging');
      if (state.playing) setPlaying(false);
    });

    window.addEventListener('pointermove', function (event) {
      if (!down) return;
      var dx = event.clientX - startX;
      if (Math.abs(dx) > 5) moved = true;
      film.scrollLeft = startScroll - dx;
    });

    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      film.classList.remove('is-dragging');
      if (moved) els.suppressClick = true;
    });

    film.addEventListener('pointercancel', function () {
      down = false;
      film.classList.remove('is-dragging');
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden && state.playing) setPlaying(false);
    });

    refreshFilmMetrics();
    var startStep = frameStep();
    film.style.scrollBehavior = 'auto';
    film.scrollLeft = startStep;
    film.style.scrollBehavior = '';
    updateProgress();
    setPlaying(true);
  }

  /* ---------------- lightbox ---------------- */

  function buildStrip() {
    PHOTOS.forEach(function (photo, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lb-thumb';
      btn.setAttribute('aria-label', t('photo.' + (i + 1) + '.title'));
      var img = document.createElement('img');
      img.src = 'assets/img/thumbs/' + photo.file + '.webp';
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      btn.appendChild(img);
      btn.addEventListener('click', function () { goPhoto(i); });
      els.strip.appendChild(btn);
    });
  }

  function goPhoto(index) {
    state.photo = (index + PHOTOS.length) % PHOTOS.length;
    var photo = PHOTOS[state.photo];
    var n = state.photo + 1;

    els.lbImg.src = 'assets/img/' + photo.file + '.webp';
    els.lbImg.width = photo.w;
    els.lbImg.height = photo.h;
    els.lbImg.alt = t('photo.' + n + '.alt');
    els.lbCount.textContent = 'FRAME ' + pad(n) + ' / ' + PHOTOS.length;
    els.lbTitle.textContent = t('photo.' + n + '.title');
    els.lbCredit.textContent = photo.credit ? t(photo.credit) : "lemon's secret garden · VRChat";

    $$('.lb-thumb').forEach(function (btn, i) {
      if (i === state.photo) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });

    var active = $$('.lb-thumb')[state.photo];
    if (active && els.strip.scrollWidth > els.strip.clientWidth) {
      els.strip.scrollLeft = active.offsetLeft - els.strip.clientWidth / 2 + active.offsetWidth / 2;
    }
  }

  function openPhoto(index) {
    if (els.suppressClick) {
      els.suppressClick = false;
      return;
    }
    state.resumeAfterLightbox = state.playing;
    if (state.playing) setPlaying(false);
    goPhoto(index);
    if (!els.lightbox.open) show(els.lightbox);
    els.lightbox.scrollTop = 0;
    lock();
  }

  function stepPhoto(delta) {
    goPhoto(state.photo + delta);
  }

  function initLightbox() {
    buildStrip();

    $$('[data-photo]').forEach(function (btn) {
      btn.addEventListener('click', function () { openPhoto(Number(btn.dataset.photo)); });
    });

    els.lbPrev.addEventListener('click', function () { stepPhoto(-1); });
    els.lbNext.addEventListener('click', function () { stepPhoto(1); });

    els.lightbox.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') { event.preventDefault(); stepPhoto(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); stepPhoto(1); }
    });

    var startX = null;
    var startY = null;
    var stage = $('.lb-stage', els.lightbox);

    stage.addEventListener('pointerdown', function (event) {
      startX = event.clientX;
      startY = event.clientY;
    });
    stage.addEventListener('pointerup', function (event) {
      if (startX === null) return;
      var dx = event.clientX - startX;
      var dy = event.clientY - startY;
      startX = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        stepPhoto(dx < 0 ? 1 : -1);
      }
    });
    stage.addEventListener('pointercancel', function () { startX = null; });
  }

  /* ---------------- dialogs ---------------- */

  function show(dialog) {
    if (typeof dialog.showModal === 'function') {
      try { dialog.showModal(); } catch (e) { dialog.setAttribute('open', ''); }
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function lock() {
    document.documentElement.classList.add('is-locked');
  }

  function unlock() {
    if (!els.lightbox.open) document.documentElement.classList.remove('is-locked');
  }

  function initDialogs() {
    $$('[data-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dialog = btn.closest('dialog');
        if (dialog) dialog.close();
      });
    });

    els.lightbox.addEventListener('click', function (event) {
      if (event.target === els.lightbox) els.lightbox.close();
    });
    els.lightbox.addEventListener('close', function () {
      unlock();
      if (state.resumeAfterLightbox) {
        state.resumeAfterLightbox = false;
        setPlaying(true);
      }
    });

    var lb = $('.lb', els.lightbox);
    if (lb) {
      lb.addEventListener('click', function (event) {
        if (event.target === lb) els.lightbox.close();
      });
    }
  }

  /* ---------------- reveal ---------------- */

  function initReveal() {
    var items = $$('.section-head, .roll-head, .sheet, .note, .garden-grid, .credits');
    items.forEach(function (el) { el.classList.add('reveal'); });

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- deep links ---------------- */

  function initDeepLinks() {
    var hash = '';
    try { hash = decodeURIComponent(window.location.hash.replace(/^#/, '')); } catch (e) {}
    var match = hash.match(/^frame-(\d+)$/);
    if (match) {
      var index = Number(match[1]) - 1;
      if (index >= 0 && index < PHOTOS.length) openPhoto(index);
    }
  }

  /* ---------------- init ---------------- */

  function init() {
    els.topbar = document.getElementById('topbar');
    els.langBtn = document.getElementById('lang-btn');
    els.film = document.getElementById('film');
    els.track = document.getElementById('film-track');
    els.prevBtn = document.getElementById('film-prev');
    els.nextBtn = document.getElementById('film-next');
    els.playBtn = document.getElementById('film-play');
    els.progress = document.getElementById('film-progress');
    els.counter = document.getElementById('film-counter');
    els.lightbox = document.getElementById('lightbox');
    els.lbImg = document.getElementById('lb-img');
    els.lbCount = document.getElementById('lb-count');
    els.lbTitle = document.getElementById('lb-title');
    els.lbCredit = document.getElementById('lb-credit');
    els.lbPrev = document.getElementById('lb-prev');
    els.lbNext = document.getElementById('lb-next');
    els.strip = document.getElementById('lb-strip');
    els.suppressClick = false;

    var params = new URLSearchParams(window.location.search);
    var saved = null;
    try { saved = localStorage.getItem('roll.lang'); } catch (e) {}
    var lang = params.get('lang') || saved;
    if (lang !== 'zh' && lang !== 'en') lang = 'zh';

    initHeader();
    initFilm();
    initLightbox();
    initDialogs();
    initReveal();

    applyLanguage(lang, { persist: Boolean(saved || params.get('lang')) });
    els.langBtn.addEventListener('click', function () {
      applyLanguage(state.lang === 'zh' ? 'en' : 'zh');
    });

    initDeepLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
