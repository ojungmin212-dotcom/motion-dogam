window.MOTIONS = window.MOTIONS || [];
window.MOTIONS.push(
  {
    no: 31,
    id: 'cursor-ring',
    cat: 'cursor',
    name: '커스텀 커서 링',
    en: 'Custom Cursor Ring',
    level: 2,
    trigger: 'mouse',
    timing: 'lerp 0.15 · 호버 300ms ease-out',
    desc: '작은 점은 포인터에 바로 붙고 큰 링은 살짝 늦게 따라오는 두 겹 커스텀 커서입니다. 링크나 버튼 위에서는 링이 커지며 아래 글자 색을 반전시켜 누를 수 있는 곳임을 알려 줍니다.',
    use: '포트폴리오·에이전시 사이트, 브랜드 캠페인 페이지, 인터랙티브 랜딩',
    tech: ['requestAnimationFrame', 'Pointer Events', 'CSS transition', 'mix-blend-mode'],
    terms: ['커스텀 커서 (Custom Cursor)', '커서 팔로워 (Cursor Follower)', '선형 보간 (Linear Interpolation, Lerp)', '혼합 모드 (Blend Mode)'],
    prompt: '사이트 전체의 기본 커서를 숨기고(cursor: none) 점과 링 두 겹으로 된 커스텀 커서(Custom Cursor)를 만들어줘. 지름 8px 점은 pointermove 좌표에 즉시 붙이고, 지름 36px에 1.5px 테두리인 링은 requestAnimationFrame 루프에서 선형 보간(Lerp) 0.15로 늦게 따라오게 해줘. 두 요소는 position: fixed와 pointer-events: none으로 두고 위치는 transform: translate로만 옮겨줘. 매 프레임 document.elementFromPoint로 포인터 아래의 a·button을 찾아서, 그 위에서는 링을 64px로 키우고 흰색으로 채운 뒤 mix-blend-mode: difference로 아래 글자가 반전되게 해줘(width·height·background 300ms ease-out). 터치 기기(@media (hover: none))에서는 커스텀 커서를 숨기고 기본 커서로 돌려줘.',
    html: `<div class="site">
  <nav class="nav">
    <button class="logo">MOTION</button>
    <div class="links">
      <button>소개</button>
      <button>작업</button>
      <button>문의</button>
    </div>
  </nav>
  <h1>작은 디테일이<br>브랜드를 기억하게 합니다</h1>
  <div class="actions">
    <button class="btn primary">프로젝트 시작하기</button>
    <button class="btn">작업 보기</button>
  </div>
</div>
<div class="cursor-ring"></div>
<div class="cursor-dot"></div>`,
    css: `body,
button {
  cursor: none;
}
.site {
  width: min(88vw, 720px);
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 9vh, 60px);
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav button {
  font: inherit;
  font-size: 14px;
  padding: 8px 4px;
  border: 0;
  background: none;
  color: var(--muted);
  transition: color .3s;
}
.nav button.is-hover {
  color: var(--fg);
}
.nav .logo {
  color: var(--fg);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .16em;
}
.links {
  display: flex;
  gap: clamp(10px, 3vw, 28px);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5.4vw, 52px);
  line-height: 1.2;
  letter-spacing: -0.03em;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--fg);
}
.btn.primary {
  background: var(--accent);
  border-color: transparent;
  color: #fff;
}

/* 커서: 점은 즉시, 링은 늦게 */
.cursor-dot,
.cursor-ring {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  border-radius: 50%;
  pointer-events: none;
}
.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
}
.cursor-ring {
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--fg);
  transition: width .3s ease-out, height .3s ease-out,
    background-color .3s ease-out, border-color .3s ease-out;
}
/* 링크 위: 커지고 흰색 + difference로 아래 색을 반전 */
.cursor-ring.is-link {
  width: 64px;
  height: 64px;
  border-color: transparent;
  background: #fff;
  mix-blend-mode: difference;
}`,
    js: `const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const site = document.querySelector('.site');
const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
const ringPos = { x: mouse.x, y: mouse.y };
let hovered = null;

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
let idleTimer;
addEventListener('pointermove', (e) => {
  auto = false;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { auto = true; }, 2500);
});

function place(el, x, y) {
  el.style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
}

function frame(now) {
  if (auto) {
    // 리사주 곡선의 위아래 끝이 메뉴 줄과 버튼 줄에 닿도록 맞춤
    const r = site.getBoundingClientRect();
    const t = now / 1000;
    mouse.x = r.left + r.width / 2 + Math.sin(t * 0.9) * r.width * 0.42;
    mouse.y = r.top + r.height / 2 - Math.sin(t * 1.3) * (r.height / 2 - 18);
  }

  // 점은 그대로, 링은 lerp 0.15로 뒤따라감
  ringPos.x += (mouse.x - ringPos.x) * 0.15;
  ringPos.y += (mouse.y - ringPos.y) * 0.15;
  place(dot, mouse.x, mouse.y);
  place(ring, ringPos.x, ringPos.y);

  // 포인터 아래 링크·버튼이 있으면 링 상태를 바꿈
  const el = document.elementFromPoint(mouse.x, mouse.y);
  const target = el ? el.closest('a, button') : null;
  if (target !== hovered) {
    if (hovered) hovered.classList.remove('is-hover');
    if (target) target.classList.add('is-hover');
    hovered = target;
    ring.classList.toggle('is-link', !!target);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 32,
    id: 'cursor-trail',
    cat: 'cursor',
    name: '커서 트레일',
    en: 'Cursor Trail',
    level: 2,
    trigger: 'mouse',
    timing: '포인트 수명 500ms · 60fps',
    desc: '포인터가 지나간 자리에 끝으로 갈수록 가늘어지는 빛의 리본이 남았다가 금방 사라집니다. 빠르게 움직이면 긴 곡선이 그려지고 멈추면 점으로 줄어듭니다.',
    use: '크리에이티브 포트폴리오, 이벤트·캠페인 페이지, 인터랙티브 히어로',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'Pointer Events'],
    terms: ['커서 트레일 (Cursor Trail)', '테이퍼드 스트로크 (Tapered Stroke)', '이차 베지어 곡선 (Quadratic Bézier Curve)', '색 보간 (Color Interpolation)'],
    prompt: '화면 전체를 덮는 HTML5 Canvas에 마우스 포인터를 따라 흐르는 커서 트레일(Cursor Trail)을 그려줘. 매 프레임 포인터 좌표를 생성 시각과 함께 배열에 넣고 500ms가 지난 점은 지워서, 멈추면 꼬리가 자연스럽게 줄어들게 해줘. 점 사이는 중점을 잇는 이차 베지어 곡선(Quadratic Bézier Curve)으로 부드럽게 연결하고, 남은 수명 비율에 따라 선 굵기를 꼬리 0px에서 머리 12px까지 점점 굵게(Tapered Stroke), 투명도도 0에서 1로 올려줘. 색은 꼬리의 브랜드 포인트 컬러에서 머리의 보조 컬러로 구간마다 섞고, 같은 선을 2.5배 굵기·투명도 15%로 먼저 한 번 그려 은은한 글로우를 줘. 캔버스는 pointer-events: none으로 두고 devicePixelRatio(최대 2)와 창 크기 변경에 대응해줘.',
    html: `<canvas id="trail"></canvas>
<header class="hero">
  <p class="eyebrow">CURSOR TRAIL</p>
  <h1>손끝이 지나간 자리에<br>빛이 남습니다</h1>
  <p class="sub">움직임의 흐름을 그대로 보여주는 인터랙션</p>
</header>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.hero {
  text-align: center;
  padding: 0 20px;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .24em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5.6vw, 54px);
  line-height: 1.2;
  letter-spacing: -0.03em;
}
.sub {
  margin: 14px 0 0;
  font-size: clamp(13px, 1.8vw, 16px);
  color: var(--muted);
}`,
    js: `const canvas = document.getElementById('trail');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const toRgb = (hex) => {
  const n = parseInt(hex.trim().replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const TAIL = toRgb(css.getPropertyValue('--accent') || '#7c8cff');
const HEAD = toRgb(css.getPropertyValue('--accent-2') || '#ffc857');
const LIFE = 500;    // 점 하나가 살아 있는 시간(ms)
const MAX_W = 12;    // 머리 쪽 최대 굵기(px)
const points = [];
const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
let w = 0, h = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener('resize', resize);
resize();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
let idleTimer;
addEventListener('pointermove', (e) => {
  auto = false;
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { auto = true; }, 2500);
});

// 0(꼬리) ~ 1(머리) 비율로 두 색을 섞음
function mix(k, alpha) {
  const c = TAIL.map((v, i) => Math.round(v + (HEAD[i] - v) * k));
  return 'rgba(' + c.join(',') + ',' + alpha + ')';
}

// 중점을 잇는 이차 베지어로 구간마다 굵기·색을 바꿔 그림
function drawPass(now, widthScale, alphaScale) {
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1], b = points[i], c = points[i + 1];
    const life = Math.max(0, 1 - (now - b.time) / LIFE);
    ctx.beginPath();
    ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
    ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
    ctx.lineWidth = life * MAX_W * widthScale;
    ctx.strokeStyle = mix(life, life * alphaScale);
    ctx.stroke();
  }
}

function frame(now) {
  if (auto) {
    const t = now / 1000;
    pointer.x = w / 2 + Math.sin(t * 1.3) * w * 0.34;
    pointer.y = h / 2 + Math.sin(t * 1.9) * h * 0.3;
  }
  points.push({ x: pointer.x, y: pointer.y, time: now });
  while (points.length && now - points[0].time > LIFE) points.shift();

  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = 'round';
  drawPass(now, 2.5, 0.15);   // 글로우
  drawPass(now, 1, 1);        // 본체

  // 머리 점 = 커서 위치
  ctx.fillStyle = mix(1, 1);
  ctx.beginPath();
  ctx.arc(pointer.x, pointer.y, MAX_W / 2, 0, Math.PI * 2);
  ctx.fill();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 33,
    id: 'cursor-spotlight',
    cat: 'cursor',
    name: '커서 스포트라이트',
    en: 'Cursor Spotlight',
    level: 1,
    trigger: 'mouse',
    timing: 'lerp 0.12 · 반경 24vmin 소프트 엣지',
    desc: '화면을 어둡게 덮고 포인터 주변만 손전등처럼 둥글게 밝혀 숨은 내용을 보여 줍니다. 빛의 가장자리가 부드럽게 번져 실제로 비추는 듯한 느낌이 납니다.',
    use: '티저·사전 공개 페이지, 이스터에그, 스토리텔링 섹션',
    tech: ['CSS mask-image', 'radial-gradient', 'CSS 사용자 정의 속성', 'Pointer Events'],
    terms: ['스포트라이트 효과 (Spotlight Effect)', '마스크 이미지 (Mask Image)', '원형 그라디언트 (Radial Gradient)', 'CSS 변수 (CSS Custom Properties)'],
    prompt: '섹션 전체를 거의 불투명한 어두운 오버레이로 덮고 마우스 포인터 주변만 손전등처럼 뚫려 아래 숨은 내용이 보이는 스포트라이트 효과(Spotlight Effect)를 만들어줘. 오버레이에 mask-image: radial-gradient(circle at var(--x) var(--y), transparent 0, transparent 반경의 40%, #000 반경)을 걸고, 자바스크립트에서는 CSS 변수(CSS Custom Properties) --x, --y만 갱신해줘. 반경은 clamp(90px, 24vmin, 170px)로 두고, 투명 구간과 불투명 구간 사이를 넓게 벌려 빛의 가장자리가 부드럽게 번지게 해줘. 좌표는 requestAnimationFrame 루프에서 lerp 0.12로 따라가게 해서 빛이 살짝 미끄러지듯 움직이게 하고, 오버레이는 pointer-events: none으로 둬서 아래 내용을 그대로 선택·클릭할 수 있게 해줘. Safari를 위해 -webkit-mask-image도 같이 넣고, 터치 기기에서는 손가락 드래그 위치를 따라가다 손을 떼면 화면 중앙으로 돌아오게 해줘.',
    html: `<section class="scene">
  <p class="eyebrow">COMING SOON</p>
  <h1>빛이 닿는 곳에<br>새 시즌이 있습니다</h1>
  <p class="date">10월 14일 저녁 8시 첫 공개</p>
</section>
<div class="dark"></div>`,
    css: `.scene {
  position: fixed;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 12px;
  padding: 0 20px;
  text-align: center;
  /* 빛이 어디를 비춰도 무언가 보이도록 배경에 색 번짐과 점 패턴을 깔아 둠 */
  background:
    radial-gradient(circle at 22% 28%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 36%),
    radial-gradient(circle at 78% 72%, color-mix(in srgb, var(--accent-2) 40%, transparent), transparent 38%),
    radial-gradient(var(--line) 1.2px, transparent 1.6px) 0 0 / 22px 22px,
    var(--bg);
}
.eyebrow {
  margin: 0;
  font-size: 12px;
  letter-spacing: .3em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(28px, 6.4vw, 64px);
  line-height: 1.15;
  letter-spacing: -0.03em;
}
.date {
  margin: 0;
  font-size: clamp(13px, 1.8vw, 16px);
  color: var(--muted);
}

/* 어두운 막: 포인터 위치만 원형으로 뚫림 */
.dark {
  --x: 50%;
  --y: 50%;
  --r: clamp(90px, 24vmin, 170px);
  position: fixed;
  inset: 0;
  background: rgba(6, 7, 12, .95);
  pointer-events: none;
  -webkit-mask-image: radial-gradient(circle at var(--x) var(--y), transparent 0, transparent calc(var(--r) * .4), #000 var(--r));
  mask-image: radial-gradient(circle at var(--x) var(--y), transparent 0, transparent calc(var(--r) * .4), #000 var(--r));
}`,
    js: `const dark = document.querySelector('.dark');
const target = { x: innerWidth / 2, y: innerHeight / 2 };
const pos = { x: target.x, y: target.y };

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
let idleTimer;
addEventListener('pointermove', (e) => {
  auto = false;
  target.x = e.clientX;
  target.y = e.clientY;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { auto = true; }, 2500);
});

function frame(now) {
  if (auto) {
    const t = now / 1000;
    target.x = innerWidth / 2 + Math.sin(t * 0.9) * innerWidth * 0.32;
    target.y = innerHeight / 2 + Math.sin(t * 1.3) * innerHeight * 0.26;
  }
  // 빛이 살짝 미끄러지듯 따라오게 lerp
  pos.x += (target.x - pos.x) * 0.12;
  pos.y += (target.y - pos.y) * 0.12;
  // CSS 변수만 바꾸면 마스크 그라디언트가 따라 움직임
  dark.style.setProperty('--x', pos.x + 'px');
  dark.style.setProperty('--y', pos.y + 'px');
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 34,
    id: 'blend-cursor',
    cat: 'cursor',
    name: '블렌드 모드 커서',
    en: 'Blend Mode Cursor',
    level: 2,
    trigger: 'mouse',
    timing: 'lerp 0.18 · 확대 450ms ease-out',
    desc: '흰 원 커서가 mix-blend-mode: difference로 겹친 부분의 배경과 글자 색을 뒤집습니다. 큰 헤드라인 위에 올라가면 원이 커지며 글자가 반전된 색으로 드러납니다.',
    use: '에이전시·스튜디오 사이트, 타이포 중심 히어로, 포트폴리오 인트로',
    tech: ['mix-blend-mode', 'CSS transition', 'requestAnimationFrame', 'Pointer Events'],
    terms: ['블렌드 모드 (Blend Mode)', '차이 혼합 (Difference Blending)', '커스텀 커서 (Custom Cursor)', '쌓임 맥락 (Stacking Context)'],
    prompt: '기본 커서를 숨기고 흰색으로 채운 원을 커서로 쓰되 mix-blend-mode: difference를 줘서 겹치는 배경과 글자의 색이 반전되는 블렌드 모드(Blend Mode) 커서를 만들어줘. 원은 지름 120px 요소를 평소 scale(0.22)로 줄여 두고, 헤드라인 글자 위에 올라가면 scale(1)로 키워줘(transform 450ms cubic-bezier(.22,1,.36,1)). 위치는 requestAnimationFrame 루프에서 lerp 0.18로 포인터를 따라가게 하고, 헤드라인 위인지는 매 프레임 document.elementFromPoint로 확인해줘. 바깥 요소에 위치 transform과 mix-blend-mode를 함께 두고 안쪽 요소는 흰 원을 그리며 scale만 담당하게 나눠줘. 안쪽에 blend를 걸면 바깥 transform이 만든 쌓임 맥락(Stacking Context) 안에서만 섞여 반전이 사라지니 주의하고, 터치 기기에서는 커서를 숨겨줘.',
    html: `<main class="stage">
  <p class="eyebrow">STUDIO MOTION · 2026</p>
  <h1 class="headline">
    <span>보이는 것</span>
    <span>너머를</span>
    <span>디자인합니다</span>
  </h1>
  <p class="caption">브랜드 경험 · 인터랙션 · 모션</p>
</main>
<div class="blob"><span></span></div>`,
    css: `body {
  cursor: none;
}
.stage {
  text-align: center;
  padding: 0 16px;
}
.eyebrow {
  margin: 0 0 18px;
  font-size: 12px;
  letter-spacing: .24em;
  color: var(--muted);
}
.headline {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: clamp(38px, 10vw, 104px);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.045em;
}
.caption {
  margin: 20px 0 0;
  font-size: 14px;
  color: var(--muted);
}

/* 바깥: 위치 + 블렌드 / 안쪽: 흰 원 + 크기 */
.blob {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: clamp(96px, 18vmin, 140px);
  aspect-ratio: 1;
  pointer-events: none;
  mix-blend-mode: difference;
}
.blob span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #fff;
  transform: scale(.22);
  transition: transform .45s cubic-bezier(.22, 1, .36, 1);
}
.blob.is-big span {
  transform: scale(1);
}`,
    js: `const blob = document.querySelector('.blob');
const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
const pos = { x: mouse.x, y: mouse.y };

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
let idleTimer;
addEventListener('pointermove', (e) => {
  auto = false;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { auto = true; }, 2500);
});

function frame(now) {
  if (auto) {
    const t = now / 1000;
    mouse.x = innerWidth / 2 + Math.sin(t * 0.9) * innerWidth * 0.36;
    mouse.y = innerHeight / 2 + Math.sin(t * 1.3) * innerHeight * 0.34;
  }
  pos.x += (mouse.x - pos.x) * 0.18;
  pos.y += (mouse.y - pos.y) * 0.18;
  blob.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) translate(-50%, -50%)';

  // 헤드라인 글자 위에 있으면 원을 키움
  const el = document.elementFromPoint(mouse.x, mouse.y);
  blob.classList.toggle('is-big', !!(el && el.closest('.headline span')));
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 35,
    id: 'sparkle-cursor',
    cat: 'cursor',
    name: '스파클 커서',
    en: 'Sparkle Cursor',
    level: 2,
    trigger: 'mouse',
    timing: '수명 0.6–1.1s · 최대 120개',
    desc: '포인터가 움직이는 동안 작은 별 모양 반짝이가 흩뿌려져 떠다니다가 돌면서 작아지고 사라집니다. 가볍고 축제 같은 분위기를 더해 줍니다.',
    use: '이벤트·시즌 프로모션, 선물·뷰티 브랜드, 게임·키즈 서비스',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'Pointer Events'],
    terms: ['파티클 이미터 (Particle Emitter)', '스파클 효과 (Sparkle Effect)', '오브젝트 풀 (Object Pool)', '델타 타임 (Delta Time)'],
    prompt: '화면 위에 HTML5 Canvas를 겹쳐서 마우스가 움직일 때 포인터 위치에서 작은 별 모양 반짝이가 흩뿌려지는 스파클 효과(Sparkle Effect)를 만들어줘. 포인터가 8px 움직일 때마다 지나온 선분 위에 입자를 1~2개씩 만들고, 입자마다 랜덤 방향 속도 0.2~1.2px/frame, 살짝 위로 뜨는 초기 속도, 약한 중력 0.02, 회전 속도 ±0.1rad, 크기 5~14px, 수명 0.6~1.1초를 줘. 별은 바깥 반지름과 그 38%인 안쪽 반지름을 번갈아 잇는 4갈래 별 경로로 그리고, 수명이 줄수록 크기는 작아지고 투명도는 0으로 사라지게 해줘. 색은 브랜드 포인트 컬러, 보조 컬러, 기본 글자색 중 랜덤으로 고르고, 움직임은 델타 타임(Delta Time)으로 계산해서 주사율이 달라도 속도가 같게 해줘. 입자는 최대 120개짜리 오브젝트 풀(Object Pool)에서 재사용하고, 캔버스는 pointer-events: none과 devicePixelRatio(최대 2)에 맞춰줘.',
    html: `<canvas id="sparkle"></canvas>
<header class="hero">
  <p class="eyebrow">HOLIDAY EDITION</p>
  <h1>작은 반짝임이<br>특별한 순간을 만듭니다</h1>
  <button class="cta">선물 고르기</button>
</header>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.hero {
  display: grid;
  justify-items: center;
  gap: 14px;
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0;
  font-size: 12px;
  letter-spacing: .26em;
  color: var(--accent-2);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5.4vw, 52px);
  line-height: 1.2;
  letter-spacing: -0.03em;
}
.cta {
  margin-top: 8px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
}`,
    js: `const canvas = document.getElementById('sparkle');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const COLORS = ['--accent', '--accent-2', '--fg'].map((v) => css.getPropertyValue(v).trim());
const MAX = 120;
// 입자 객체를 미리 만들어 두고 재사용 (오브젝트 풀)
const pool = Array.from({ length: MAX }, () => ({ alive: false }));
const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
const last = { x: pointer.x, y: pointer.y };
let w = 0, h = 0, prev = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener('resize', resize);
resize();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
let idleTimer;
addEventListener('pointermove', (e) => {
  auto = false;
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { auto = true; }, 2500);
});

function spawn(x, y) {
  const p = pool.find((q) => !q.alive);
  if (!p) return;
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.2 + Math.random();
  p.alive = true;
  p.x = x;
  p.y = y;
  p.vx = Math.cos(angle) * speed;
  p.vy = Math.sin(angle) * speed - 0.5;   // 살짝 위로 튀어 오름
  p.rot = Math.random() * Math.PI;
  p.spin = (Math.random() - 0.5) * 0.2;
  p.size = 5 + Math.random() * 9;
  p.life = 1;
  p.decay = 1 / (36 + Math.random() * 30); // 0.6~1.1초 (60fps 기준)
  p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
}

// 바깥·안쪽 반지름을 번갈아 잇는 4갈래 별
function star(x, y, r, rot) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const rad = i % 2 === 0 ? r : r * 0.38;
    const a = rot + (i * Math.PI) / 4;
    ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad);
  }
  ctx.closePath();
  ctx.fill();
}

function frame(now) {
  const dt = prev ? Math.min((now - prev) / 16.67, 3) : 1;  // 60fps = 1
  prev = now;
  if (auto) {
    const t = now / 1000;
    pointer.x = w / 2 + Math.sin(t * 0.9) * w * 0.34;
    pointer.y = h / 2 + Math.sin(t * 1.3) * h * 0.3;
  }

  // 8px 움직일 때마다 지나온 선분 위에 입자를 뿌림
  const dx = pointer.x - last.x, dy = pointer.y - last.y;
  const dist = Math.hypot(dx, dy);
  if (dist > 8) {
    const n = Math.min(4, Math.floor(dist / 8));
    for (let i = 1; i <= n; i++) {
      const x = last.x + (dx * i) / n, y = last.y + (dy * i) / n;
      spawn(x, y);
      if (Math.random() < 0.4) spawn(x, y);
    }
    last.x = pointer.x;
    last.y = pointer.y;
  }

  ctx.clearRect(0, 0, w, h);
  for (const p of pool) {
    if (!p.alive) continue;
    p.vy += 0.02 * dt;           // 약한 중력
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.spin * dt;
    p.life -= p.decay * dt;
    if (p.life <= 0) { p.alive = false; continue; }
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    star(p.x, p.y, p.size * p.life, p.rot);  // 수명에 따라 작아짐
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 36,
    id: 'eyes-follow',
    cat: 'cursor',
    name: '눈동자 따라보기',
    en: 'Eyes Follow Cursor',
    level: 2,
    trigger: 'mouse',
    timing: 'lerp 0.2 · 깜빡임 2.2–4.8s 랜덤',
    desc: '마스코트 캐릭터의 두 눈동자가 포인터 방향을 바라보며 눈 안에서만 움직이고, 가끔 눈을 깜빡입니다. 화면에 생동감과 친근함을 주는 작은 장치입니다.',
    use: '404·빈 화면 일러스트, 로그인 폼 마스코트, 챗봇·브랜드 캐릭터',
    tech: ['Math.atan2', 'requestAnimationFrame', 'CSS transform', 'Pointer Events'],
    terms: ['시선 추적 (Eye Tracking)', '아크탄젠트 (atan2)', '반경 제한 (Radius Clamping)', '마스코트 인터랙션 (Mascot Interaction)'],
    prompt: '둥근 마스코트 캐릭터의 두 눈동자가 마우스 포인터를 바라보는 시선 추적(Eye Tracking) 인터랙션을 만들어줘. 눈마다 getBoundingClientRect로 중심을 구하고 Math.atan2(dy, dx)로 방향을 잡은 뒤, 이동 거리는 포인터까지 거리 × 0.08을 (눈 반지름 - 눈동자 반지름) × 0.85로 제한(Radius Clamping)해서 눈동자가 흰자 밖으로 나가지 않게 해줘. 눈동자는 transform: translate로만 옮기고 requestAnimationFrame 루프에서 lerp 0.2로 부드럽게 따라가게 하며, 얼굴 전체도 포인터 쪽으로 최대 6px 살짝 움직여 입체감을 줘. 2.2~4.8초마다 랜덤하게 눈을 scaleY(0.1)로 90ms 동안 감았다 뜨게 하고, 네 번에 한 번쯤은 두 번 연속 깜빡이게 해줘. 눈 중심 좌표는 미리 계산해 두고 창 크기가 바뀌거나 스크롤될 때만 다시 계산해줘.',
    html: `<div class="buddy">
  <div class="head">
    <div class="eyes">
      <div class="eye"><div class="pupil"></div></div>
      <div class="eye"><div class="pupil"></div></div>
    </div>
    <div class="cheeks"><i></i><i></i></div>
    <div class="mouth"></div>
  </div>
  <div class="shadow"></div>
  <p class="caption">무엇을 도와드릴까요?</p>
</div>
<div class="ghost"></div>`,
    css: `.buddy {
  --s: clamp(140px, 38vmin, 230px);
  display: grid;
  justify-items: center;
  gap: 10px;
}
.head {
  position: relative;
  width: var(--s);
  height: calc(var(--s) * .88);
  display: grid;
  align-content: center;
  justify-items: center;
  gap: calc(var(--s) * .07);
  border-radius: 50% 50% 46% 46% / 56% 56% 44% 44%;
  background: radial-gradient(circle at 34% 26%, color-mix(in srgb, var(--accent) 55%, #fff), var(--accent) 62%);
  box-shadow: inset -10px -14px 0 rgba(0, 0, 0, .1);
}
.eyes {
  display: flex;
  gap: calc(var(--s) * .12);
}
.eye {
  width: calc(var(--s) * .25);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  transition: transform .09s ease-in;
}
.eyes.is-blink .eye {
  transform: scaleY(.1);
}
.pupil {
  position: relative;
  width: 48%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #1a1c24;
}
.pupil::after {
  content: '';
  position: absolute;
  top: 18%;
  left: 20%;
  width: 32%;
  height: 32%;
  border-radius: 50%;
  background: #fff;
}
.cheeks {
  position: absolute;
  top: 60%;
  left: 12%;
  right: 12%;
  display: flex;
  justify-content: space-between;
}
.cheeks i {
  width: 16%;
  aspect-ratio: 1.6;
  border-radius: 50%;
  background: var(--accent-2);
  opacity: .55;
}
.mouth {
  width: calc(var(--s) * .14);
  height: calc(var(--s) * .07);
  border: 3px solid #1a1c24;
  border-top: 0;
  border-radius: 0 0 999px 999px;
}
.shadow {
  width: calc(var(--s) * .7);
  height: 12px;
  border-radius: 50%;
  background: var(--line);
}
.caption {
  margin: 6px 0 0;
  font-size: clamp(14px, 2vw, 17px);
  font-weight: 600;
  color: var(--muted);
}

/* 자동 시연 중 가상 포인터 표시 */
.ghost {
  position: fixed;
  left: -7px;
  top: -7px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--fg);
  box-shadow: 0 0 0 6px var(--line);
  pointer-events: none;
  opacity: 0;
  transition: opacity .3s;
}
body.is-auto .ghost {
  opacity: .9;
}`,
    js: `const head = document.querySelector('.head');
const eyesBox = document.querySelector('.eyes');
const eyes = [...document.querySelectorAll('.eye')].map((el) => ({
  pupil: el.querySelector('.pupil'), cx: 0, cy: 0, max: 0, x: 0, y: 0
}));
const ghost = document.querySelector('.ghost');
const mouse = { x: innerWidth / 2, y: innerHeight * 0.2 };
const tilt = { x: 0, y: 0 };
let face = { x: 0, y: 0 };

// 눈 중심과 이동 한계를 미리 계산 (리사이즈·스크롤 때만 다시)
function measure() {
  eyes.forEach((eye) => {
    const r = eye.pupil.parentElement.getBoundingClientRect();
    eye.cx = r.left + r.width / 2;
    eye.cy = r.top + r.height / 2;
    eye.max = (r.width / 2 - eye.pupil.offsetWidth / 2) * 0.85;
  });
  const hr = head.getBoundingClientRect();
  face = { x: hr.left + hr.width / 2, y: hr.top + hr.height / 2 };
}
addEventListener('resize', measure);
addEventListener('scroll', measure, true);
measure();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
let idleTimer;
document.body.classList.add('is-auto');
addEventListener('pointermove', (e) => {
  auto = false;
  document.body.classList.remove('is-auto');
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    auto = true;
    document.body.classList.add('is-auto');
  }, 2500);
});

function frame(now) {
  if (auto) {
    const t = now / 1000;
    mouse.x = innerWidth / 2 + Math.sin(t * 0.9) * innerWidth * 0.4;
    mouse.y = innerHeight / 2 + Math.sin(t * 1.3) * innerHeight * 0.38;
    ghost.style.transform = 'translate(' + mouse.x + 'px, ' + mouse.y + 'px)';
  }

  eyes.forEach((eye) => {
    const dx = mouse.x - eye.cx, dy = mouse.y - eye.cy;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(eye.max, Math.hypot(dx, dy) * 0.08);  // 흰자 밖으로 못 나가게
    eye.x += (Math.cos(angle) * dist - eye.x) * 0.2;
    eye.y += (Math.sin(angle) * dist - eye.y) * 0.2;
    eye.pupil.style.transform = 'translate(' + eye.x + 'px, ' + eye.y + 'px)';
  });

  // 얼굴도 포인터 쪽으로 최대 6px
  const clamp6 = (v) => Math.max(-6, Math.min(6, v));
  tilt.x += (clamp6((mouse.x - face.x) * 0.02) - tilt.x) * 0.1;
  tilt.y += (clamp6((mouse.y - face.y) * 0.02) - tilt.y) * 0.1;
  head.style.transform = 'translate(' + tilt.x + 'px, ' + tilt.y + 'px)';
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// 랜덤 간격으로 깜빡임, 가끔 두 번 연속
function blink() {
  eyesBox.classList.add('is-blink');
  setTimeout(() => eyesBox.classList.remove('is-blink'), 120);
}
(function loop() {
  setTimeout(() => {
    blink();
    if (Math.random() < 0.25) setTimeout(blink, 260);
    loop();
  }, 2200 + Math.random() * 2600);
})();`
  },
  {
    no: 37,
    id: 'proximity-grid',
    cat: 'cursor',
    name: '근접 반응 그리드',
    en: 'Proximity Grid',
    level: 2,
    trigger: 'mouse',
    timing: '반경 160px · lerp 0.12 · 60fps',
    desc: '촘촘한 사각형 격자가 포인터와의 거리에 따라 커지고 회전하며 포인트 컬러로 물듭니다. 포인터가 지나간 자리는 천천히 원래 상태로 가라앉습니다.',
    use: '테크·AI 히어로 배경, 기능 소개 섹션, 인터랙티브 배너',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'Pointer Events'],
    terms: ['근접 효과 (Proximity Effect)', '거리 감쇠 (Distance Falloff)', '선형 보간 (Linear Interpolation, Lerp)', '인터랙티브 그리드 (Interactive Grid)'],
    prompt: 'HTML5 Canvas로 섹션 배경 전체에 26px 간격의 작은 정사각형 격자를 깔고, 마우스 포인터와 가까운 칸일수록 커지고 회전하며 빛나는 근접 효과(Proximity Effect)를 만들어줘. 칸마다 포인터와의 거리 d로 영향도 (1 - d / 160px)²를 구하는 거리 감쇠(Distance Falloff)를 쓰고, 영향도에 따라 크기는 3px에서 14px로, 회전은 0°에서 45°로, 색은 흐린 보조 글자색에서 브랜드 포인트 컬러로 바꿔줘. 각 칸의 현재 값은 목표값을 향해 lerp 0.12로 따라가게 해서 포인터가 지나간 자리가 천천히 가라앉는 잔상이 남게 해줘. 칸마다 setTransform 한 번으로 이동·회전을 처리하고 같은 색끼리 모아 두 번에 나눠 그려서 수백 칸도 60fps를 유지해줘. 포인터가 섹션을 벗어나면 모든 칸이 원래 상태로 돌아오게 하고, 창 크기와 devicePixelRatio(최대 2)가 바뀌면 격자를 다시 만들어줘.',
    html: `<canvas id="grid"></canvas>
<header class="hero">
  <p class="eyebrow">REALTIME ENGINE</p>
  <h1>가까이 갈수록<br>살아나는 화면</h1>
</header>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  /* 가장자리는 부드럽게 흐리게 */
  -webkit-mask-image: radial-gradient(ellipse at center, #000 50%, transparent 100%);
  mask-image: radial-gradient(ellipse at center, #000 50%, transparent 100%);
}
.hero {
  position: relative;
  padding: 28px 40px;
  text-align: center;
  pointer-events: none;
  /* 글자 뒤만 배경색으로 살짝 가려 가독성 확보 */
  background: radial-gradient(closest-side, var(--bg) 55%, transparent);
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .26em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(26px, 5.6vw, 54px);
  line-height: 1.15;
  letter-spacing: -0.03em;
}`,
    js: `const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const ACCENT = css.getPropertyValue('--accent').trim() || '#7c8cff';
const MUTED = css.getPropertyValue('--muted').trim() || '#8a91a3';
const GAP = 26, RADIUS = 160;
const pointer = { x: -9999, y: -9999 };
let w = 0, h = 0, dpr = 1, cells = [];

// 화면 크기에 맞춰 가운데 정렬된 격자를 다시 만듦
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const cols = Math.ceil(w / GAP) + 1, rows = Math.ceil(h / GAP) + 1;
  const ox = (w - (cols - 1) * GAP) / 2, oy = (h - (rows - 1) * GAP) / 2;
  cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) cells.push({ x: ox + c * GAP, y: oy + r * GAP, v: 0 });
  }
}
addEventListener('resize', resize);
resize();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
let idleTimer;
addEventListener('pointermove', (e) => {
  auto = false;
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { auto = true; }, 2500);
});
// 포인터가 벗어나면 모든 칸이 가라앉음
document.documentElement.addEventListener('pointerleave', () => {
  pointer.x = pointer.y = -9999;
});

function drawCell(cell, extra) {
  const size = 3 + cell.v * 11 + extra;
  const a = cell.v * Math.PI / 4;            // 최대 45°
  const cos = Math.cos(a) * dpr, sin = Math.sin(a) * dpr;
  ctx.setTransform(cos, sin, -sin, cos, cell.x * dpr, cell.y * dpr);
  ctx.fillRect(-size / 2, -size / 2, size, size);
}

function frame(now) {
  if (auto) {
    const t = now / 1000;
    pointer.x = w / 2 + Math.sin(t * 0.7) * w * 0.38;
    pointer.y = h / 2 + Math.sin(t * 1.1) * h * 0.36;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1차: 값 갱신 + 기본(흐린) 칸
  ctx.fillStyle = MUTED;
  for (const cell of cells) {
    const d = Math.hypot(cell.x - pointer.x, cell.y - pointer.y);
    const target = d < RADIUS ? (1 - d / RADIUS) ** 2 : 0;  // 거리 감쇠
    cell.v += (target - cell.v) * 0.12;
    ctx.globalAlpha = 0.35 * (1 - cell.v);
    drawCell(cell, 0);
  }
  // 2차: 영향을 받은 칸만 포인트 컬러로 덧칠
  ctx.fillStyle = ACCENT;
  for (const cell of cells) {
    if (cell.v < 0.01) continue;
    ctx.globalAlpha = Math.min(1, cell.v * 1.3);
    drawCell(cell, 0);
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 72,
    id: 'rotating-cube',
    cat: 'depth',
    name: '3D 회전 큐브',
    en: 'Rotating 3D Cube',
    level: 2,
    trigger: 'auto',
    timing: '무한 루프 · X 18s · Y 12s linear',
    desc: 'CSS 3D 변환으로 조립한 정육면체가 두 축으로 천천히 돌며 여섯 면의 라벨을 차례로 보여 줍니다. 마우스를 올리면 부드럽게 느려지다 멈춥니다.',
    use: '서비스 단계·기능 소개, 히어로 3D 오브제, 로딩 화면 장식',
    tech: ['CSS 3D Transforms', 'CSS @keyframes', 'Web Animations API'],
    terms: ['원근감 (Perspective)', '3D 공간 유지 (transform-style: preserve-3d)', 'CSS 큐브 (CSS Cube)', '재생 속도 제어 (Playback Rate)'],
    prompt: 'CSS 3D 변환만으로 여섯 면에 단계 라벨이 있는 정육면체를 만들고 두 축으로 계속 돌게 해줘. 부모에 perspective: 900px을 주고 큐브에는 transform-style: preserve-3d(3D 공간 유지)를 걸어, 각 면을 rotateY(0°, 90°, 180°, -90°)와 rotateX(±90°)로 돌린 뒤 translateZ(한 변의 절반)만큼 밀어내 조립해줘. 회전은 요소를 두 겹으로 나눠 바깥은 rotateX 18초, 안쪽은 rotateY 12초 linear 무한 루프로 돌려서 주기가 다른 두 축이 섞이게 해줘. 마우스를 올리면 Web Animations API로 두 애니메이션의 playbackRate를 매 프레임 lerp 0.06으로 0까지 줄여 부드럽게 멈추고, 벗어나면 같은 방식으로 1까지 다시 가속해줘. 면은 불투명하게 칠해서 깊이 정렬이 깨지지 않게 하고, prefers-reduced-motion이면 회전을 멈춘 비스듬한 각도로 보여줘.',
    html: `<div class="wrap">
  <div class="scene">
    <div class="spin-x">
      <div class="cube">
        <div class="face front"><b>01</b>기획</div>
        <div class="face right"><b>02</b>디자인</div>
        <div class="face back"><b>03</b>모션</div>
        <div class="face left"><b>04</b>개발</div>
        <div class="face top"><b>05</b>테스트</div>
        <div class="face bottom"><b>06</b>출시</div>
      </div>
    </div>
  </div>
  <div class="floor"></div>
</div>`,
    css: `.wrap {
  --s: clamp(96px, min(24vw, 30vh), 170px);
  display: grid;
  justify-items: center;
  gap: calc(var(--s) * .55);
}
.scene {
  width: var(--s);
  height: var(--s);
  perspective: 900px;
}
.spin-x,
.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
/* 두 겹으로 나눠 주기가 다른 두 축 회전을 섞음 */
.spin-x {
  animation: spin-x 18s linear infinite;
}
.cube {
  animation: spin-y 12s linear infinite;
}
@keyframes spin-x {
  from { transform: rotateX(-24deg); }
  to { transform: rotateX(336deg); }
}
@keyframes spin-y {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}
.face {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 6px;
  text-align: center;
  font-size: calc(var(--s) * .11);
  font-weight: 600;
  border-radius: 6px;
  background: color-mix(in srgb, var(--accent) var(--tint), var(--surface));
  box-shadow: inset 0 0 0 1px var(--line);
}
.face b {
  font-size: calc(var(--s) * .26);
  line-height: 1;
  color: var(--accent);
}
/* 각 면을 돌린 뒤 한 변의 절반만큼 밀어냄 */
.front  { --tint: 18%; transform: translateZ(calc(var(--s) / 2)); }
.right  { --tint: 8%;  transform: rotateY(90deg) translateZ(calc(var(--s) / 2)); }
.back   { --tint: 18%; transform: rotateY(180deg) translateZ(calc(var(--s) / 2)); }
.left   { --tint: 8%;  transform: rotateY(-90deg) translateZ(calc(var(--s) / 2)); }
.top    { --tint: 28%; transform: rotateX(90deg) translateZ(calc(var(--s) / 2)); }
.bottom { --tint: 4%;  transform: rotateX(-90deg) translateZ(calc(var(--s) / 2)); }
.floor {
  width: calc(var(--s) * 1.2);
  height: calc(var(--s) * .16);
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--fg) 22%, transparent), transparent);
}
@media (prefers-reduced-motion: reduce) {
  .spin-x, .cube { animation-play-state: paused; }
  .cube { transform: rotateY(-35deg); }
}`,
    js: `// 마우스를 올리면 재생 속도를 0까지 부드럽게 낮춤 (Web Animations API)
const scene = document.querySelector('.scene');
let target = 1;
let rate = 1;
scene.addEventListener('pointerenter', () => { target = 0; });
scene.addEventListener('pointerleave', () => { target = 1; });

function tick() {
  if (rate !== target) {
    rate += (target - rate) * 0.06;
    if (Math.abs(target - rate) < 0.002) rate = target;
    document.getAnimations().forEach((a) => { a.playbackRate = rate; });
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);`
  },
  {
    no: 73,
    id: 'carousel-3d',
    cat: 'depth',
    name: '3D 링 캐러셀',
    en: '3D Ring Carousel',
    level: 2,
    trigger: 'auto',
    timing: '2.2s 간격 · 900ms ease-in-out',
    desc: '카드 8장을 원형으로 세워 두고 링 전체를 한 칸씩 돌려 앞 카드를 바꿔 보여 주는 3D 캐러셀입니다. 앞 카드는 선명하고 뒤로 갈수록 흐려져 깊이감이 납니다.',
    use: '포트폴리오·작품 갤러리, 상품 컬렉션 쇼케이스, 여행지·이벤트 라인업',
    tech: ['CSS 3D Transforms', 'CSS transition', 'CSS 사용자 정의 속성'],
    terms: ['3D 캐러셀 (3D Carousel)', '원근감 (Perspective)', 'Z축 이동 (translateZ)', '자동 재생 슬라이더 (Autoplay Slider)'],
    prompt: '카드 8장을 원형 링으로 세운 3D 캐러셀(3D Carousel)을 만들어줘. 각 카드는 rotateY(n × 45°) translateZ(r)로 배치하고, 반지름 r은 카드 너비 ÷ 2 ÷ tan(22.5°)에 여유를 조금 더한 값(카드 너비 × 1.36)으로 잡아줘. 부모에 perspective: 1000px, 링에 transform-style: preserve-3d를 주고, 링 자체를 translateZ(-r) rotateX(-8deg) rotateY(-step × 45°)로 돌려서 앞 카드가 원래 크기로 보이게 해줘. 2.2초마다 step을 1씩 올려 transform 900ms cubic-bezier(.65,0,.35,1)로 회전시키고, 이전·다음 버튼을 누르면 한 칸씩 이동하면서 자동 재생 타이머를 다시 시작해줘. 카드마다 현재 각도의 cos 값으로 투명도를 0.25~1 사이로 줘서 뒤쪽 카드를 흐리게 하고, step은 8로 나머지 연산하지 말고 계속 누적해야 마지막 카드에서 첫 카드로 넘어갈 때 링이 반대로 한 바퀴 도는 문제가 생기지 않아.',
    html: `<div class="carousel">
  <div class="scene">
    <div class="ring">
      <article class="card" style="--i:0"><span>01</span><h3>제주</h3><p>바람의 섬</p></article>
      <article class="card" style="--i:1"><span>02</span><h3>부산</h3><p>바다와 야경</p></article>
      <article class="card" style="--i:2"><span>03</span><h3>강릉</h3><p>커피 한 잔</p></article>
      <article class="card" style="--i:3"><span>04</span><h3>경주</h3><p>천년의 도시</p></article>
      <article class="card" style="--i:4"><span>05</span><h3>여수</h3><p>밤바다 산책</p></article>
      <article class="card" style="--i:5"><span>06</span><h3>전주</h3><p>한옥 골목</p></article>
      <article class="card" style="--i:6"><span>07</span><h3>속초</h3><p>설악과 호수</p></article>
      <article class="card" style="--i:7"><span>08</span><h3>통영</h3><p>작은 항구</p></article>
    </div>
  </div>
  <div class="controls">
    <button class="nav prev" aria-label="이전"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
    <span class="count">01 / 08</span>
    <button class="nav next" aria-label="다음"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
  </div>
</div>`,
    css: `.carousel {
  --w: clamp(100px, min(19vw, 34vh), 180px);
  --r: calc(var(--w) * 1.36);   /* 반지름 ≈ 너비/2/tan(22.5°) + 여유 */
  display: grid;
  justify-items: center;
  gap: clamp(18px, 6vh, 40px);
}
.scene {
  width: var(--w);
  height: calc(var(--w) * 1.32);
  perspective: 1000px;
}
.ring {
  --angle: 0deg;
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: translateZ(calc(var(--r) * -1)) rotateX(-8deg) rotateY(var(--angle));
  transition: transform .9s cubic-bezier(.65, 0, .35, 1);
}
.card {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12%;
  overflow: hidden;
  border-radius: calc(var(--w) * .1);
  background: var(--surface);
  border: 1px solid var(--line);
  transform: rotateY(calc(var(--i) * 45deg)) translateZ(var(--r));
  transition: opacity .9s, border-color .9s;
}
.card::before {
  content: '';
  position: absolute;
  width: 110%;
  aspect-ratio: 1;
  top: -34%;
  right: -40%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 68%);
  opacity: .55;
}
.card:nth-child(even)::before {
  background: radial-gradient(circle, var(--accent-2), transparent 68%);
}
.card.is-active {
  border-color: color-mix(in srgb, var(--accent) 60%, transparent);
}
.card span {
  position: absolute;
  top: 12%;
  left: 12%;
  font-size: max(9px, calc(var(--w) * .08));
  letter-spacing: .1em;
  color: var(--muted);
}
.card h3 {
  position: relative;
  margin: 0;
  font-size: max(15px, calc(var(--w) * .16));
  letter-spacing: -0.02em;
}
.card p {
  position: relative;
  margin: 4px 0 0;
  font-size: max(11px, calc(var(--w) * .085));
  color: var(--muted);
}
.controls {
  display: flex;
  align-items: center;
  gap: 16px;
}
.nav {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  padding: 0;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--fg);
  cursor: pointer;
  transition: border-color .2s;
}
.nav:hover {
  border-color: var(--accent);
}
.nav svg {
  width: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.count {
  min-width: 56px;
  text-align: center;
  font-size: 13px;
  letter-spacing: .08em;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}`,
    js: `const ring = document.querySelector('.ring');
const cards = [...document.querySelectorAll('.card')];
const count = document.querySelector('.count');
const N = cards.length, STEP = 360 / N;
const pad = (n) => String(n).padStart(2, '0');
let step = 0;
let timer;

function render() {
  // step은 누적값 그대로 사용 (나머지 연산을 하면 끝에서 역회전이 생김)
  ring.style.setProperty('--angle', (-step * STEP) + 'deg');
  const active = ((step % N) + N) % N;
  cards.forEach((card, i) => {
    // 앞(0°)일수록 1, 뒤(180°)일수록 0.25
    const rel = ((i - step) * STEP * Math.PI) / 180;
    card.style.opacity = (0.25 + 0.75 * (Math.cos(rel) + 1) / 2).toFixed(2);
    card.classList.toggle('is-active', i === active);
  });
  count.textContent = pad(active + 1) + ' / ' + pad(N);
}

function restart() {
  clearInterval(timer);
  timer = setInterval(() => { step++; render(); }, 2200);
}

function go(dir) {
  step += dir;
  render();
  restart();
}

document.querySelector('.prev').addEventListener('click', () => go(-1));
document.querySelector('.next').addEventListener('click', () => go(1));
render();
restart();`
  },
  {
    no: 74,
    id: 'infinite-marquee',
    cat: 'depth',
    name: '무한 마키',
    en: 'Infinite Marquee',
    level: 1,
    trigger: 'auto',
    timing: '무한 루프 · 28s / 36s linear',
    desc: '로고와 키워드가 두 줄로 서로 반대 방향을 향해 끊김 없이 흘러가는 띠입니다. 양 끝은 부드럽게 사라지고 마우스를 올리면 그 줄이 잠시 멈춥니다.',
    use: '고객사·파트너 로고 섹션, 키워드 배너, 푸터 위 브랜드 띠',
    tech: ['CSS @keyframes', 'CSS mask-image'],
    terms: ['무한 마키 (Infinite Marquee)', '심리스 루프 (Seamless Loop)', '페이드 마스크 (Fade Mask)', '애니메이션 일시 정지 (animation-play-state)'],
    prompt: '고객사 로고 줄과 키워드 칩 줄, 두 줄이 서로 반대 방향으로 끊김 없이 흐르는 무한 마키(Infinite Marquee)를 만들어줘. 각 줄은 같은 아이템 묶음을 두 번 이어 붙인 트랙(display: flex, width: max-content)으로 만들고, 트랙을 translateX(0)에서 translateX(-50%)까지 linear 무한 반복시켜 심리스 루프(Seamless Loop)가 되게 해줘. 묶음 안의 gap과 같은 크기의 padding-right를 묶음 끝에 넣어야 이음새에서 간격이 튀지 않아. 첫 줄은 28초, 둘째 줄은 36초에 animation-direction: reverse로 반대로 흐르게 하고, 줄 양 끝은 mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)로 부드럽게 사라지게 해줘. 마우스를 올린 줄은 animation-play-state: paused로 멈추고, 복제한 묶음에는 aria-hidden="true"를 달아 스크린 리더가 두 번 읽지 않게 해줘.',
    html: `<section class="brands">
  <p class="label">5,000개 이상의 팀이 함께 만들고 있어요</p>
  <div class="marquee">
    <div class="track">
      <div class="group">
        <span class="logo"><i class="m-circle"></i>NOVA</span>
        <span class="logo serif">Lumen</span>
        <span class="logo"><i class="m-square"></i>KITE</span>
        <span class="logo wide">ORBIT</span>
        <span class="logo"><i class="m-tri"></i>atlas</span>
        <span class="logo heavy">Parallel</span>
        <span class="logo"><i class="m-ring"></i>moss</span>
        <span class="logo wide">VERTEX</span>
      </div>
      <!-- 같은 묶음을 한 번 더: -50% 이동하면 처음과 똑같은 화면 -->
      <div class="group" aria-hidden="true">
        <span class="logo"><i class="m-circle"></i>NOVA</span>
        <span class="logo serif">Lumen</span>
        <span class="logo"><i class="m-square"></i>KITE</span>
        <span class="logo wide">ORBIT</span>
        <span class="logo"><i class="m-tri"></i>atlas</span>
        <span class="logo heavy">Parallel</span>
        <span class="logo"><i class="m-ring"></i>moss</span>
        <span class="logo wide">VERTEX</span>
      </div>
    </div>
  </div>
  <div class="marquee reverse">
    <div class="track">
      <div class="group">
        <span class="chip">브랜딩</span>
        <span class="chip">UX 리서치</span>
        <span class="chip">모션 그래픽</span>
        <span class="chip">웹 개발</span>
        <span class="chip">3D 렌더링</span>
        <span class="chip">콘텐츠 전략</span>
        <span class="chip">퍼포먼스 마케팅</span>
      </div>
      <div class="group" aria-hidden="true">
        <span class="chip">브랜딩</span>
        <span class="chip">UX 리서치</span>
        <span class="chip">모션 그래픽</span>
        <span class="chip">웹 개발</span>
        <span class="chip">3D 렌더링</span>
        <span class="chip">콘텐츠 전략</span>
        <span class="chip">퍼포먼스 마케팅</span>
      </div>
    </div>
  </div>
</section>`,
    css: `.brands {
  width: 100vw;
  display: grid;
  gap: clamp(14px, 3.4vh, 24px);
}
.label {
  margin: 0 0 6px;
  text-align: center;
  font-size: 13px;
  color: var(--muted);
}
/* 양 끝을 부드럽게 지움 */
.marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.reverse .track {
  animation-duration: 36s;
  animation-direction: reverse;
}
.marquee:hover .track {
  animation-play-state: paused;
}
@keyframes marquee {
  to { transform: translateX(-50%); }
}
/* gap과 같은 padding-right를 줘야 이음새 간격이 같음 */
.group {
  display: flex;
  align-items: center;
  gap: 48px;
  padding-right: 48px;
}
.reverse .group {
  gap: 12px;
  padding-right: 12px;
}
.logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-size: clamp(18px, 2.6vw, 24px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--muted);
  transition: color .2s;
}
.logo:hover { color: var(--fg); }
.logo.serif { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 700; }
.logo.wide { font-size: clamp(14px, 2vw, 18px); font-weight: 600; letter-spacing: .22em; }
.logo.heavy { font-style: italic; font-weight: 900; letter-spacing: -0.04em; }
.logo i { width: 18px; height: 18px; background: currentColor; }
.logo .m-circle { border-radius: 50%; }
.logo .m-square { border-radius: 4px; transform: rotate(45deg) scale(.8); }
.logo .m-tri { clip-path: polygon(50% 0, 100% 100%, 0 100%); }
.logo .m-ring { border-radius: 50%; background: none; box-shadow: inset 0 0 0 4px currentColor; }
.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  white-space: nowrap;
  font-size: clamp(13px, 1.6vw, 15px);
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
}
.chip::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}`,
    js: ''
  },
  {
    no: 75,
    id: 'synthwave-grid',
    cat: 'depth',
    name: '레트로 원근 그리드',
    en: 'Synthwave Perspective Grid',
    level: 2,
    trigger: 'auto',
    timing: '무한 루프 · 1칸 0.9s linear',
    desc: '원근으로 눕힌 네온 격자 바닥이 끝없이 다가오고, 지평선 위에는 줄무늬가 파인 노을 태양이 걸린 80년대 레트로 장면입니다.',
    use: '음악·게임·이벤트 랜딩, 레트로 테마 히어로, 404 페이지',
    tech: ['CSS 3D Transforms', 'repeating-linear-gradient', 'CSS @keyframes', 'CSS mask-image'],
    terms: ['원근 격자 (Perspective Grid)', '신스웨이브 (Synthwave)', '소실점 (Vanishing Point)', '무한 스크롤 배경 (Infinite Scrolling Background)'],
    prompt: '화면 아래 절반에 80년대 신스웨이브(Synthwave) 스타일의 원근 격자(Perspective Grid) 바닥을 만들고 끝없이 다가오게 해줘. 바닥 요소에 repeating-linear-gradient 두 개(0deg, 90deg)로 48px 간격의 2px 핫핑크 네온 선을 그리고, 부모에 perspective: 120px을 준 뒤 바닥을 transform-origin: bottom 기준 rotateX(78deg)로 눕혀줘. 소실점(Vanishing Point)이 지평선과 맞도록 perspective-origin의 y를 120px × cot(78°) ≈ 26px로 두고, 바닥은 좌우로 화면 너비의 7.6배쯤 넓게 잡아 먼 쪽 가장자리가 보이지 않게 해줘. 바닥의 transform을 rotateX(78deg) translateY(0)에서 translateY(48px)까지 0.9초 linear 무한 반복해 한 칸씩 끊김 없이 다가오게 하고, 먼 쪽은 mask-image로 지평선 근처에서 흐려지게 해줘. 지평선 위에는 노랑에서 핫핑크로 넘어가는 태양을 반쯤 걸치고, 아래로 갈수록 두꺼워지는 가로 줄무늬를 mask-image의 linear-gradient 정지점으로 뚫어줘. 지평선에는 핑크 글로우 선과, 먼 격자의 계단 현상을 가려 주는 안개 그라디언트를 바닥 위에 겹쳐 넣고, prefers-reduced-motion이면 바닥 애니메이션을 멈춰줘.',
    html: `<div class="retro">
  <div class="sky">
    <div class="sun"></div>
  </div>
  <div class="ground">
    <div class="floor"></div>
  </div>
</div>`,
    css: `.retro {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: var(--bg);
}
.sky {
  position: absolute;
  inset: 0 0 44% 0;
  display: grid;
  justify-items: center;
  align-items: end;
  overflow: hidden;
  background:
    radial-gradient(ellipse 70% 70% at 50% 100%, rgba(255, 61, 139, .38), transparent 70%),
    radial-gradient(var(--line) 1px, transparent 1.4px) 0 0 / 34px 34px;
}
/* 태양: 아래로 갈수록 두꺼워지는 줄무늬를 마스크로 뚫음 */
.sun {
  width: clamp(120px, 36vmin, 250px);
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translateY(30%);
  background: linear-gradient(#ffd23f 10%, #ff8a3d 45%, #ff3d8b 75%);
  -webkit-mask-image: linear-gradient(#000 38%, transparent 38% 40.5%, #000 40.5% 46%, transparent 46% 49.5%, #000 49.5% 54%, transparent 54% 58.5%, #000 58.5% 62%, transparent 62% 67.5%, #000 67.5%);
  mask-image: linear-gradient(#000 38%, transparent 38% 40.5%, #000 40.5% 46%, transparent 46% 49.5%, #000 49.5% 54%, transparent 54% 58.5%, #000 58.5% 62%, transparent 62% 67.5%, #000 67.5%);
}
.ground {
  position: absolute;
  inset: 56% 0 0 0;
  overflow: hidden;
  perspective: 120px;
  perspective-origin: 50% 26px;   /* 120px × cot(78°): 소실점 = 지평선 */
  border-top: 2px solid #ff4fd8;
  box-shadow: 0 -4px 28px rgba(255, 79, 216, .75);
}
/* 지평선 안개: 먼 격자가 안개 속에서 나타나는 느낌 */
.ground::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(color-mix(in srgb, #ff3d8b 26%, var(--bg)) 14%, transparent 54%);
}
.floor {
  position: absolute;
  left: -330%;
  right: -330%;
  bottom: 0;
  height: 800px;
  transform-origin: 50% 100%;
  background:
    repeating-linear-gradient(90deg, rgba(255, 79, 216, .85) 0 2px, transparent 2px 48px),
    repeating-linear-gradient(0deg, rgba(255, 79, 216, .85) 0 2px, transparent 2px 48px);
  /* 먼 쪽(위)은 지평선 근처에서 흐려짐 */
  -webkit-mask-image: linear-gradient(to top, #000 26%, transparent 84%);
  mask-image: linear-gradient(to top, #000 26%, transparent 84%);
  animation: drive .9s linear infinite;
}
/* 격자 한 칸(48px)만큼 앞으로 → 처음과 같은 모습이라 끊김 없음 */
@keyframes drive {
  from { transform: rotateX(78deg) translateY(0); }
  to { transform: rotateX(78deg) translateY(48px); }
}
@media (prefers-reduced-motion: reduce) {
  .floor { animation-play-state: paused; }
}`,
    js: ''
  },
  {
    no: 76,
    id: 'orbit-icons',
    cat: 'depth',
    name: '궤도 아이콘',
    en: 'Orbiting Icons',
    level: 2,
    trigger: 'auto',
    timing: '무한 루프 · 궤도 20s / 32s / 46s',
    desc: '가운데 로고를 중심으로 동심원 궤도 위를 아이콘 칩들이 서로 다른 속도로 돕니다. 아이콘은 반대로 회전해 항상 똑바로 선 채 움직입니다.',
    use: '연동·통합 서비스 소개, 생태계·파트너 섹션, 기능 허브 일러스트',
    tech: ['CSS @keyframes', 'CSS transform', 'CSS 사용자 정의 속성'],
    terms: ['궤도 애니메이션 (Orbit Animation)', '역회전 (Counter-Rotation)', '동심원 레이아웃 (Concentric Layout)', '방사형 배치 (Radial Positioning)'],
    prompt: '가운데 로고를 중심으로 동심원 궤도 3개를 그리고, 그 위를 아이콘 칩이 서로 다른 속도로 도는 궤도 애니메이션(Orbit Animation)을 만들어줘. 궤도는 전체 크기의 44%, 70%, 96% 지름을 가진 원형 점선 테두리로 두고, 궤도 요소 자체를 rotate 0°→360°로 각각 20초, 32초(역방향), 46초 linear 무한 반복시켜줘. 칩은 궤도를 꽉 채우는 슬롯을 rotate(시작 각도)로 돌린 뒤 슬롯 맨 위 가운데에 붙이는 방사형 배치(Radial Positioning)로 놓고, 칩에는 rotate: -시작 각도와 함께 궤도와 같은 주기의 반대 방향 회전(Counter-Rotation) 애니메이션을 줘서 아이콘이 항상 똑바로 서 있게 해줘. 주기와 방향은 궤도마다 CSS 변수(--dur, --dir)로 넘겨 칩이 궤도와 정확히 같은 값을 쓰게 하고, 마우스를 올리면 궤도와 칩의 animation-play-state를 함께 paused로 바꿔 어긋나지 않게 멈춰줘. 작은 화면에서는 칩 크기를 clamp(30px, 9vmin, 44px)로 줄여 궤도끼리 겹치지 않게 해줘.',
    html: `<div class="orbit">
  <div class="ring r3" style="--dur:46s; --dir:normal">
    <div class="slot" style="--a:0deg"><span class="chip"><svg viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg></span></div>
    <div class="slot" style="--a:120deg"><span class="chip"><svg viewBox="0 0 24 24"><path d="M4 20h16M7 16v-5M12 16V6M17 16v-8"/></svg></span></div>
    <div class="slot" style="--a:240deg"><span class="chip"><svg viewBox="0 0 24 24"><path d="M3 6h18v12H3zM3 7l9 6 9-6"/></svg></span></div>
  </div>
  <div class="ring r2" style="--dur:32s; --dir:reverse">
    <div class="slot" style="--a:60deg"><span class="chip"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg></span></div>
    <div class="slot" style="--a:180deg"><span class="chip"><svg viewBox="0 0 24 24"><path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.1 11 3.5 3.5 0 0 0 7 18z"/></svg></span></div>
    <div class="slot" style="--a:300deg"><span class="chip"><svg viewBox="0 0 24 24"><path d="M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3"/></svg></span></div>
  </div>
  <div class="ring r1" style="--dur:20s; --dir:normal">
    <div class="slot" style="--a:30deg"><span class="chip accent"><svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg></span></div>
    <div class="slot" style="--a:210deg"><span class="chip accent"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z"/></svg></span></div>
  </div>
  <div class="core"><svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/></svg></div>
</div>`,
    css: `.orbit {
  --chip: clamp(30px, 9vmin, 44px);
  position: relative;
  width: min(92vw, 88vh, 480px);
  aspect-ratio: 1;
}
/* 궤도 자체가 회전 */
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed var(--line);
  animation: spin var(--dur) linear infinite var(--dir);
}
.r1 { inset: 28%; }
.r2 { inset: 15%; }
.r3 { inset: 2%; }
/* 슬롯을 시작 각도만큼 돌리고 칩은 슬롯 맨 위에 붙임 */
.slot {
  position: absolute;
  inset: 0;
  transform: rotate(var(--a));
}
.chip {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--chip);
  height: var(--chip);
  margin: calc(var(--chip) / -2) 0 0 calc(var(--chip) / -2);
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--fg);
  box-shadow: 0 6px 18px color-mix(in srgb, var(--fg) 10%, transparent);
  /* 시작 각도 + 궤도 회전을 모두 되돌려 항상 똑바로 */
  rotate: calc(var(--a) * -1);
  animation: unspin var(--dur) linear infinite var(--dir);
}
.chip.accent {
  color: var(--accent);
}
.chip svg {
  width: 48%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.orbit:hover .ring,
.orbit:hover .chip {
  animation-play-state: paused;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes unspin {
  to { transform: rotate(-360deg); }
}
.core {
  position: absolute;
  inset: 39%;
  display: grid;
  place-items: center;
  border-radius: 28%;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 55%, var(--accent-2)));
  box-shadow:
    0 0 0 8px color-mix(in srgb, var(--accent) 14%, transparent),
    0 12px 40px color-mix(in srgb, var(--accent) 45%, transparent);
}
.core svg {
  width: 44%;
  fill: #fff;
}`,
    js: ''
  },
  {
    no: 77,
    id: 'card-flip',
    cat: 'depth',
    name: '3D 카드 플립',
    en: '3D Card Flip',
    level: 1,
    trigger: 'hover',
    timing: '700ms · cubic-bezier(.4,.2,.2,1)',
    desc: '카드에 마우스를 올리면 Y축으로 180° 뒤집히며 뒷면의 설명이 나타납니다. 원근감이 더해져 실제 종이 카드를 돌리는 듯한 입체감이 납니다.',
    use: '기능·서비스 소개 카드, 팀원 소개, 요금제·퀴즈 카드',
    tech: ['CSS 3D Transforms', 'CSS transition', 'backface-visibility'],
    terms: ['카드 플립 (Card Flip)', '뒷면 숨김 (backface-visibility)', '원근감 (Perspective)', '3D 공간 유지 (transform-style: preserve-3d)'],
    prompt: '기능 소개 카드 3장에 마우스를 올리면 Y축으로 180° 뒤집혀 뒷면 설명이 보이는 카드 플립(Card Flip)을 만들어줘. 카드 바깥 요소에 perspective: 1000px을 주고, 안쪽 요소에 transform-style: preserve-3d와 transform 700ms cubic-bezier(.4,.2,.2,1) 전환을 걸어 hover 시 rotateY(180deg)로 돌려줘. 앞면과 뒷면은 같은 자리에 absolute로 겹치고 둘 다 backface-visibility: hidden(Safari용 -webkit- 포함)을 준 뒤, 뒷면만 미리 rotateY(180deg)로 돌려 둬. 앞면에는 아이콘과 제목, 뒷면에는 브랜드 포인트 컬러 배경에 큰 숫자 하나와 짧은 설명을 넣어줘. 터치 기기에서는 hover가 없으니 탭하면 .is-flipped 클래스를 토글해 뒤집히게 하고, 키보드 포커스(:focus-within)에서도 뒤집히게 해줘.',
    html: `<div class="cards">
  <div class="card">
    <div class="inner">
      <div class="face front">
        <span class="icon"><svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg></span>
        <div><h3>빠른 배포</h3><p>DEPLOY</p></div>
      </div>
      <div class="face back">
        <strong>3초</strong>
        <p>커밋 한 번에 전 세계 반영</p>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="inner">
      <div class="face front">
        <span class="icon"><svg viewBox="0 0 24 24"><path d="M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3"/></svg></span>
        <div><h3>안전한 보관</h3><p>SECURITY</p></div>
      </div>
      <div class="face back">
        <strong>256bit</strong>
        <p>종단간 암호화로 보호</p>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="inner">
      <div class="face front">
        <span class="icon"><svg viewBox="0 0 24 24"><path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14a6 6 0 0 1 3.5 6"/></svg></span>
        <div><h3>실시간 협업</h3><p>TEAMWORK</p></div>
      </div>
      <div class="face back">
        <strong>50명</strong>
        <p>한 문서를 동시에 편집</p>
      </div>
    </div>
  </div>
</div>`,
    css: `.cards {
  display: flex;
  gap: clamp(10px, 2.4vw, 22px);
}
.card {
  width: clamp(92px, 27vw, 210px);
  aspect-ratio: 3 / 4;
  perspective: 1000px;
}
.inner {
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform .7s cubic-bezier(.4, .2, .2, 1);
}
.card:hover .inner,
.card.is-hover .inner {
  transform: rotateY(180deg);
}
/* 앞·뒷면을 겹치고 뒤를 향한 면은 숨김 */
.face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: clamp(10px, 2.2vw, 20px);
  border-radius: clamp(12px, 2vw, 18px);
  border: 1px solid var(--line);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.front {
  justify-content: space-between;
  background: var(--surface);
}
.back {
  justify-content: flex-end;
  background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 75%, var(--accent-2)), var(--accent));
  color: #fff;
  transform: rotateY(180deg);
}
.icon {
  width: clamp(30px, 5vw, 44px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 30%;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
}
.icon svg {
  width: 55%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
h3 {
  margin: 0;
  font-size: clamp(13px, 2.2vw, 20px);
  letter-spacing: -0.02em;
}
.front p {
  margin: 4px 0 0;
  font-size: clamp(9px, 1.2vw, 11px);
  letter-spacing: .14em;
  color: var(--muted);
}
.back strong {
  font-size: clamp(20px, 4.4vw, 40px);
  line-height: 1;
  letter-spacing: -0.03em;
}
.back p {
  margin: 8px 0 0;
  font-size: clamp(11px, 1.5vw, 14px);
  line-height: 1.4;
  opacity: .9;
}`,
    js: `// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
const wrap = document.querySelector('.cards');
const cards = [...document.querySelectorAll('.card')];
let index = 0;
let timer = null;
let resume = null;

// 카드를 한 장씩 차례로 뒤집고, 한 박자는 모두 앞면으로
function step() {
  cards.forEach((card, i) => card.classList.toggle('is-hover', i === index));
  index = (index + 1) % (cards.length + 1);
}
function start() {
  stop();
  step();
  timer = setInterval(step, 1600);
}
function stop() {
  clearInterval(timer);
  cards.forEach((card) => card.classList.remove('is-hover'));
}

wrap.addEventListener('pointerenter', () => {
  clearTimeout(resume);
  stop();
});
wrap.addEventListener('pointerleave', () => {
  resume = setTimeout(start, 2500);
});
start();`
  },
  {
    no: 78,
    id: 'tab-indicator',
    cat: 'depth',
    name: '슬라이딩 탭 인디케이터',
    en: 'Sliding Tab Indicator',
    level: 2,
    trigger: 'click',
    timing: '420ms · cubic-bezier(.22,1,.36,1)',
    desc: '세그먼트 탭의 선택 표시 알약이 클릭한 탭으로 미끄러지며 너비까지 맞춰 늘어나고 줄어듭니다. 아래 내용은 부드럽게 교차 페이드됩니다.',
    use: '설정·대시보드 탭, 월간·연간 요금 전환, 상품 상세 탭',
    tech: ['CSS transition', 'offsetLeft / offsetWidth', 'ResizeObserver'],
    terms: ['슬라이딩 인디케이터 (Sliding Indicator)', '세그먼트 컨트롤 (Segmented Control)', '교차 페이드 (Cross-fade)', '레이아웃 측정 (Layout Measurement)'],
    prompt: '알약 모양 세그먼트 컨트롤(Segmented Control) 탭을 만들고, 선택 표시가 클릭한 탭으로 미끄러지며 너비까지 맞춰 변하는 슬라이딩 인디케이터(Sliding Indicator)를 넣어줘. 인디케이터는 탭 목록 안에 absolute로 하나만 두고, 클릭한 탭의 offsetLeft와 offsetWidth를 읽어 transform: translateX와 width에 넣은 뒤 둘 다 420ms cubic-bezier(.22,1,.36,1)로 전환해줘. 선택된 탭의 글자색도 같은 시간에 바뀌게 하고, 아래 패널들은 grid로 한 칸에 겹쳐 둔 채 opacity와 translateY(8px)를 300ms로 교차 페이드(Cross-fade)해줘. 첫 렌더에서는 전환 없이 바로 제자리에 놓고(위치 지정 후 강제 리플로우, 그다음 transition 켜기), ResizeObserver로 탭 목록 크기가 바뀌면 다시 측정해줘. role="tablist", role="tab", aria-selected를 갱신하고 좌우 화살표 키로도 탭을 옮길 수 있게 해줘.',
    html: `<div class="widget">
  <div class="tabs" role="tablist">
    <span class="indicator"></span>
    <button class="tab is-active" role="tab" aria-selected="true">개요</button>
    <button class="tab" role="tab" aria-selected="false">주요 기능</button>
    <button class="tab" role="tab" aria-selected="false">요금제</button>
    <button class="tab" role="tab" aria-selected="false">후기</button>
  </div>
  <div class="panels">
    <section class="panel is-active" role="tabpanel">
      <span class="tag">OVERVIEW</span>
      <h3>한 화면에서 흐름을 관리하세요</h3>
      <p>기획부터 출시까지 팀의 모든 작업을 하나의 보드에 모았어요.</p>
    </section>
    <section class="panel" role="tabpanel">
      <span class="tag">FEATURES</span>
      <h3>반복 작업은 자동으로</h3>
      <p>규칙을 한 번 만들어 두면 알림과 담당자 배정이 알아서 처리돼요.</p>
    </section>
    <section class="panel" role="tabpanel">
      <span class="tag">PRICING</span>
      <h3>월 12,000원부터</h3>
      <p>14일 무료 체험 후 팀 규모에 맞춰 언제든 바꿀 수 있어요.</p>
    </section>
    <section class="panel" role="tabpanel">
      <span class="tag">REVIEW</span>
      <h3>“회의 시간이 절반으로 줄었어요”</h3>
      <p>프로덕트 팀 리드 · 김서연</p>
    </section>
  </div>
</div>`,
    css: `.widget {
  width: min(92vw, 520px);
  display: grid;
  justify-items: center;
  gap: 16px;
}
.tabs {
  position: relative;
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
}
/* 인디케이터 하나를 옮기고 늘리는 방식 */
.indicator {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  width: 0;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--accent) 40%, transparent);
}
.indicator.is-ready {
  transition: transform .42s cubic-bezier(.22, 1, .36, 1), width .42s cubic-bezier(.22, 1, .36, 1);
}
.tab {
  position: relative;
  z-index: 1;
  padding: 10px clamp(12px, 2.6vw, 20px);
  font: inherit;
  font-size: clamp(13px, 1.6vw, 15px);
  font-weight: 600;
  white-space: nowrap;
  border: 0;
  border-radius: 999px;
  background: none;
  color: var(--muted);
  cursor: pointer;
  transition: color .42s;
}
.tab.is-active {
  color: #fff;
}
/* 패널을 한 칸에 겹쳐 교차 페이드 */
.panels {
  display: grid;
  width: 100%;
}
.panel {
  grid-area: 1 / 1;
  padding: clamp(18px, 3.4vw, 28px);
  border-radius: 18px;
  border: 1px solid var(--line);
  background: var(--surface);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity .3s ease, transform .3s ease;
  pointer-events: none;
}
.panel.is-active {
  opacity: 1;
  transform: none;
  pointer-events: auto;
  transition-delay: .08s;
}
.tag {
  font-size: 11px;
  letter-spacing: .2em;
  color: var(--accent);
}
.panel h3 {
  margin: 10px 0 8px;
  font-size: clamp(17px, 2.8vw, 22px);
  letter-spacing: -0.02em;
}
.panel p {
  margin: 0;
  font-size: clamp(13px, 1.7vw, 15px);
  line-height: 1.55;
  color: var(--muted);
}`,
    js: `const tabList = document.querySelector('.tabs');
const tabs = [...document.querySelectorAll('.tab')];
const panels = [...document.querySelectorAll('.panel')];
const indicator = document.querySelector('.indicator');
let current = 0;

// 활성 탭의 위치·너비를 재서 인디케이터에 적용
function moveIndicator() {
  const tab = tabs[current];
  indicator.style.width = tab.offsetWidth + 'px';
  indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
}

function select(i) {
  current = i;
  tabs.forEach((tab, n) => {
    tab.classList.toggle('is-active', n === i);
    tab.setAttribute('aria-selected', String(n === i));
  });
  panels.forEach((panel, n) => panel.classList.toggle('is-active', n === i));
  moveIndicator();
}

// 첫 위치는 전환 없이 → 강제 리플로우 후 transition 켜기
moveIndicator();
void indicator.offsetWidth;
indicator.classList.add('is-ready');
new ResizeObserver(moveIndicator).observe(tabList);

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let demo = setTimeout(function next() {
  select((current + 1) % tabs.length);
  demo = setTimeout(next, 2800);
}, 600);

tabs.forEach((tab, i) => tab.addEventListener('click', () => {
  clearTimeout(demo);
  select(i);
}));

// 좌우 화살표 키로 이동
tabList.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  clearTimeout(demo);
  const i = (current + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  select(i);
  tabs[i].focus();
});`
  }
);
