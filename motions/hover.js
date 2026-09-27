window.MOTIONS = window.MOTIONS || [];
window.MOTIONS.push(
  {
    no: 58,
    id: 'magnetic-button',
    cat: 'hover',
    name: '마그네틱 버튼',
    en: 'Magnetic Button',
    level: 2,
    trigger: 'mouse',
    timing: '반경 80px · 스프링 탄성 복귀',
    desc: '포인터가 버튼 근처로 오면 버튼이 자석처럼 끌려오고, 안쪽 라벨은 더 크게 움직여 깊이감이 생깁니다. 범위를 벗어나면 스프링처럼 튕기며 제자리로 돌아옵니다.',
    use: 'CTA 버튼, 히어로 섹션 링크, 포트폴리오 내비게이션',
    tech: ['Pointer Events', 'requestAnimationFrame', 'CSS transform'],
    terms: ['마그네틱 효과 (Magnetic Effect)', '스프링 물리 (Spring Physics)', '탄성 이징 (Elastic Easing)', '포인터 추적 (Pointer Tracking)'],
    prompt: 'CTA 버튼에 포인터를 자석처럼 따라가는 마그네틱 버튼(Magnetic Button) 효과를 넣어줘. 포인터가 버튼 가장자리에서 80px 안으로 들어오면 버튼 중심에서 포인터까지 거리의 25~30%만큼 버튼을 포인터 쪽으로 옮기되 가장자리에서 멀어질수록 힘을 최대 절반까지 줄이고, 안쪽 라벨(텍스트·아이콘)은 그 1.6배만큼 더 움직여 층이 나뉜 듯한 깊이감을 줘. 위치는 requestAnimationFrame 루프에서 스프링 물리(Spring Physics, 강성 0.1 · 감쇠 0.82)로 따라가게 해서, 범위를 벗어나면 제자리로 돌아오며 2~3번 탄성 있게 흔들리다 멈추게 해줘(Elastic Easing). 거리 계산은 getBoundingClientRect 값에서 현재 이동량을 빼서 원래 위치 기준으로 해야 버튼이 포인터를 피해 떨리지 않아. 터치 기기와 prefers-reduced-motion 환경에서는 효과를 끄고 일반 버튼으로 동작하게 해줘.',
    html: `<div class="cta">
  <button class="magnet primary" data-strength="0.25">
    <span class="label">무료로 시작하기</span>
  </button>
  <button class="magnet round" data-strength="0.3" aria-label="다음으로">
    <span class="label">
      <svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </span>
  </button>
</div>
<div class="ghost" aria-hidden="true"></div>`,
    css: `body {
  touch-action: none;
}
.cta {
  display: flex;
  align-items: center;
  gap: clamp(48px, 9vw, 72px);
}
.magnet {
  border: 0;
  font: inherit;
  cursor: pointer;
  will-change: transform;
}
.magnet .label {
  display: inline-flex;
  align-items: center;
  pointer-events: none;
  will-change: transform;
}
.primary {
  position: relative;
  z-index: 1;
  padding: clamp(15px, 2.4vw, 20px) clamp(24px, 4vw, 36px);
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font-size: clamp(15px, 2vw, 17px);
  font-weight: 600;
  box-shadow: 0 12px 32px -12px var(--accent);
}
.round {
  display: grid;
  place-items: center;
  width: clamp(56px, 8vw, 68px);
  height: clamp(56px, 8vw, 68px);
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--fg);
}
.round svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
/* 자동 시연 중에만 보이는 가상 포인터 */
.ghost {
  position: fixed;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border-radius: 50%;
  border: 1.5px solid var(--muted);
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  transition: opacity .3s;
}
.ghost.on {
  opacity: .9;
}`,
    js: `const RANGE = 80; // 버튼 가장자리에서 80px 안으로 들어오면 끌어당김
const items = Array.from(document.querySelectorAll('.magnet'), el => ({
  el,
  label: el.querySelector('.label'),
  k: parseFloat(el.dataset.strength),
  x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0
}));

// 포인터 위치로 각 버튼의 목표 이동량을 계산
function aim(px, py) {
  items.forEach(it => {
    const r = it.el.getBoundingClientRect();
    // 현재 이동량을 빼서 원래 자리의 중심을 기준으로 삼음
    const cx = r.left + r.width / 2 - it.x;
    const cy = r.top + r.height / 2 - it.y;
    const dx = px - cx;
    const dy = py - cy;
    const gapX = Math.max(Math.abs(dx) - r.width / 2, 0);
    const gapY = Math.max(Math.abs(dy) - r.height / 2, 0);
    const dist = Math.hypot(gapX, gapY);
    // 범위 안이면 끌어당기되, 가장자리에서 멀수록 힘을 최대 절반까지 줄임
    const pull = dist < RANGE ? it.k * (1 - 0.5 * dist / RANGE) : 0;
    it.tx = dx * pull;
    it.ty = dy * pull;
  });
}

function tick() {
  items.forEach(it => {
    // 스프링: 목표로 당기는 힘 + 감쇠 → 놓으면 탄성 있게 흔들리며 복귀
    it.vx = (it.vx + (it.tx - it.x) * 0.1) * 0.82;
    it.vy = (it.vy + (it.ty - it.y) * 0.1) * 0.82;
    it.x += it.vx;
    it.y += it.vy;
    it.el.style.transform = 'translate(' + it.x + 'px,' + it.y + 'px)';
    // 라벨은 버튼보다 0.6배 더 움직여 깊이감을 줌
    it.label.style.transform = 'translate(' + it.x * 0.6 + 'px,' + it.y * 0.6 + 'px)';
  });
}

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
const ghost = document.querySelector('.ghost');
let auto = true;
let idle;
addEventListener('pointermove', e => {
  auto = false;
  ghost.classList.remove('on');
  aim(e.clientX, e.clientY);
  clearTimeout(idle);
  idle = setTimeout(() => { auto = true; }, 2500);
});
document.documentElement.addEventListener('pointerleave', () => aim(-1e4, -1e4));

function loop(now) {
  if (auto) {
    // 리사주 곡선을 따라 움직이는 가상 포인터
    const t = now / 1000;
    const x = innerWidth / 2 + Math.sin(t * 0.9) * innerWidth * 0.34;
    const y = innerHeight / 2 + Math.sin(t * 1.3) * innerHeight * 0.3;
    ghost.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    ghost.classList.add('on');
    aim(x, y);
  }
  tick();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);`
  },
  {
    no: 59,
    id: 'ripple-click',
    cat: 'hover',
    name: '리플 클릭',
    en: 'Ripple Click',
    level: 2,
    trigger: 'click',
    timing: '600ms · cubic-bezier(.22,1,.36,1)',
    desc: '누른 지점에서 원이 퍼져 나가며 사라지는 머티리얼 디자인의 터치 피드백입니다. 연달아 누르면 리플이 겹쳐서 각각 퍼집니다.',
    use: '버튼, 리스트 항목, 탭, 카드 클릭 피드백',
    tech: ['Pointer Events', 'CSS @keyframes'],
    terms: ['리플 효과 (Ripple Effect)', '머티리얼 디자인 (Material Design)', '터치 피드백 (Touch Feedback)'],
    prompt: '버튼을 누르면 누른 정확한 지점에서 원이 퍼져 나가는 머티리얼 리플(Material Ripple) 효과를 만들어줘. pointerdown 좌표를 버튼 기준 좌표로 바꾸고, 그 지점에서 버튼의 가장 먼 모서리까지의 거리를 반지름으로 하는 원형 span을 추가해 scale(0)에서 scale(1)로 600ms 동안 cubic-bezier(.22,1,.36,1)로 키우면서 불투명도는 0.32에서 0으로 ease-in으로 줄여줘. 리플 색은 버튼 글자색(currentColor)을 쓰고, 버튼에 position: relative와 overflow: hidden을 줘서 원이 버튼 모양 밖으로 나가지 않게 해줘. 빠르게 여러 번 눌러도 리플이 겹쳐서 각각 재생되게 하고, animationend에서 해당 span을 제거해 DOM이 쌓이지 않게 해줘. 키보드로 Enter나 Space를 눌렀을 때는 버튼 중앙에서 리플이 시작되게 해줘.',
    html: `<div class="card">
  <p class="eyebrow">PRO 플랜</p>
  <h2>월 9,900원으로<br>모든 기능을 무제한</h2>
  <div class="actions">
    <button class="btn primary">구독하기</button>
    <button class="btn secondary">7일 무료 체험</button>
  </div>
</div>`,
    css: `.card {
  width: min(88vw, 420px);
  padding: clamp(22px, 5vw, 36px);
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: 0 24px 48px -28px rgba(0, 0, 0, .35);
}
.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .14em;
  color: var(--accent);
}
h2 {
  margin: 0 0 clamp(18px, 4vh, 28px);
  font-size: clamp(20px, 3.6vw, 26px);
  line-height: 1.35;
  letter-spacing: -0.02em;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn {
  position: relative;
  overflow: hidden; /* 리플이 버튼 밖으로 나가지 않게 */
  padding: 16px;
  border: 0;
  border-radius: 14px;
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform .15s;
}
.btn:active {
  transform: scale(.98);
}
.primary {
  background: var(--accent);
  color: var(--bg);
}
.secondary {
  background: transparent;
  color: var(--fg);
  box-shadow: inset 0 0 0 1px var(--line);
}
.ripple {
  position: absolute;
  border-radius: 50%;
  background: currentColor;
  pointer-events: none;
  transform: scale(0);
  animation:
    ripple-grow 600ms cubic-bezier(.22, 1, .36, 1) forwards,
    ripple-fade 600ms ease-in forwards;
}
@keyframes ripple-grow {
  to { transform: scale(1); }
}
@keyframes ripple-fade {
  from { opacity: .32; }
  to { opacity: 0; }
}`,
    js: `// 누른 지점에서 버튼의 가장 먼 모서리까지 덮는 원을 만들어 퍼뜨림
function ripple(btn, x, y) {
  const r = btn.getBoundingClientRect();
  const ox = x - r.left;
  const oy = y - r.top;
  const radius = Math.hypot(Math.max(ox, r.width - ox), Math.max(oy, r.height - oy));
  const dot = document.createElement('span');
  dot.className = 'ripple';
  dot.style.width = dot.style.height = radius * 2 + 'px';
  dot.style.left = ox - radius + 'px';
  dot.style.top = oy - radius + 'px';
  btn.appendChild(dot);
  dot.addEventListener('animationend', () => dot.remove());
}

const buttons = Array.from(document.querySelectorAll('.btn'));
buttons.forEach(btn => {
  btn.addEventListener('pointerdown', e => ripple(btn, e.clientX, e.clientY));
});

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
function randomRipple(btn) {
  const r = btn.getBoundingClientRect();
  ripple(btn,
    r.left + r.width * (0.15 + Math.random() * 0.7),
    r.top + r.height * (0.2 + Math.random() * 0.6));
}
let turn = 0;
let demo = setTimeout(function autoClick() {
  const btn = buttons[turn++ % buttons.length];
  randomRipple(btn);
  // 가끔 연타해서 리플이 겹치는 모습도 보여줌
  if (Math.random() < 0.4) setTimeout(() => randomRipple(btn), 220);
  demo = setTimeout(autoClick, 2500 + Math.random() * 1000);
}, 600);
document.addEventListener('pointerdown', () => clearTimeout(demo));`
  },
  {
    no: 60,
    id: 'tilt-card',
    cat: 'hover',
    name: '3D 틸트 카드',
    en: '3D Tilt Card',
    level: 2,
    trigger: 'mouse',
    timing: '최대 12° · lerp 0.1 · 60fps',
    desc: '포인터 방향으로 카드가 입체적으로 기울고, 안쪽 요소들이 서로 다른 깊이로 떠 있어 층이 분리돼 보입니다. 표면에는 빛 반사가 포인터를 따라 움직입니다.',
    use: '멤버십·카드 상품 소개, 포트폴리오 썸네일, 제품 카드',
    tech: ['CSS 3D Transform', 'Pointer Events', 'requestAnimationFrame'],
    terms: ['3D 틸트 (3D Tilt)', '원근 투영 (Perspective)', '패럴랙스 깊이 (Parallax Depth)', '글레어 하이라이트 (Glare Highlight)'],
    prompt: '카드에 마우스를 올리면 포인터 방향으로 카드가 입체적으로 기울어지는 3D 틸트 카드(3D Tilt Card)를 만들어줘. 부모에 perspective: 900px을 주고, 카드 중심 기준 포인터 위치를 -1~1로 정규화해 rotateX·rotateY를 최대 12°까지 적용하되 requestAnimationFrame에서 lerp 0.1로 부드럽게 따라가게 해줘. 카드에 transform-style: preserve-3d를 주고 안쪽 요소를 translateZ 20~60px로 띄워 기울일 때 층마다 다르게 움직이는 패럴랙스 깊이(Parallax Depth)를 만들고, 포인터 위치에 흰색 radial-gradient 글레어(Glare Highlight)를 CSS 변수로 옮겨 빛이 반사되는 느낌을 줘. 포인터가 카드를 벗어나면 같은 lerp로 0°까지 천천히 돌아오게 해줘. 카드에 overflow: hidden을 주면 preserve-3d가 풀려 깊이가 사라지니 주의하고, 터치 기기와 prefers-reduced-motion 환경에서는 기울기를 끈 정적인 카드로 보여줘.',
    html: `<div class="scene">
  <div class="card">
    <div class="rings layer"></div>
    <div class="top layer">
      <span class="brand">MOTION</span>
      <span class="chip"></span>
    </div>
    <div class="title layer">
      <small>MEMBERSHIP</small>
      <strong>프리미엄 멤버십</strong>
    </div>
    <div class="meta layer">
      <span>김모션</span>
      <span>2027.03까지</span>
    </div>
    <div class="glare"></div>
  </div>
</div>`,
    css: `body {
  touch-action: none;
}
.scene {
  perspective: 900px;
}
.card {
  --rx: 0deg;
  --ry: 0deg;
  --gx: 50%;
  --gy: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: min(80vw, 380px);
  aspect-ratio: 1.58;
  padding: clamp(18px, 4vw, 26px);
  border-radius: 22px;
  color: var(--bg);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, .22), rgba(0, 0, 0, .28)),
    var(--accent);
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, .55);
  transform-style: preserve-3d; /* 자식의 translateZ가 살아 있게 */
  transform: rotateX(var(--rx)) rotateY(var(--ry));
}
.layer {
  transform: translateZ(var(--z));
}
.rings {
  --z: 20px;
  position: absolute;
  right: 7%;
  top: 22%;
  width: 36%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1.5px solid currentColor;
  opacity: .22;
}
.rings::after {
  content: '';
  position: absolute;
  inset: 20%;
  border-radius: 50%;
  border: 1.5px solid currentColor;
}
.top {
  --z: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: .2em;
}
.chip {
  width: 38px;
  height: 28px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--accent-2), rgba(255, 255, 255, .7));
}
.title {
  --z: 60px;
  display: grid;
  gap: 4px;
}
.title small {
  font-size: 11px;
  letter-spacing: .16em;
  opacity: .7;
}
.title strong {
  font-size: clamp(19px, 3.4vw, 25px);
  letter-spacing: -0.02em;
}
.meta {
  --z: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  opacity: .85;
}
/* 포인터 위치에 맺히는 빛 반사 */
.glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at var(--gx) var(--gy), rgba(255, 255, 255, .4), rgba(255, 255, 255, 0) 55%);
  pointer-events: none;
  transform: translateZ(1px);
}`,
    js: `const scene = document.querySelector('.scene');
const card = document.querySelector('.card');
const MAX = 12; // 최대 기울기(도)
let tx = 0, ty = 0; // 목표값 (-1 ~ 1)
let x = 0, y = 0;   // 현재값

const clamp = v => Math.max(-1, Math.min(1, v));

// 카드 중심 기준으로 포인터 위치를 -1 ~ 1로 정규화
function aim(px, py) {
  const r = scene.getBoundingClientRect(); // 기울지 않는 부모를 기준으로 측정
  tx = clamp(((px - r.left) / r.width) * 2 - 1);
  ty = clamp(((py - r.top) / r.height) * 2 - 1);
}

function render() {
  // lerp로 목표 각도를 부드럽게 따라감
  x += (tx - x) * 0.1;
  y += (ty - y) * 0.1;
  card.style.setProperty('--ry', (x * MAX).toFixed(2) + 'deg');
  card.style.setProperty('--rx', (-y * MAX).toFixed(2) + 'deg');
  card.style.setProperty('--gx', (50 + x * 50).toFixed(1) + '%');
  card.style.setProperty('--gy', (50 + y * 50).toFixed(1) + '%');
}

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
let idle;
addEventListener('pointermove', e => {
  auto = false;
  aim(e.clientX, e.clientY);
  clearTimeout(idle);
  idle = setTimeout(() => { auto = true; }, 2500);
});
// 포인터가 나가면 수평으로 복귀
document.documentElement.addEventListener('pointerleave', () => {
  tx = 0;
  ty = 0;
});

function loop(now) {
  if (auto) {
    // 카드 위를 리사주 곡선으로 도는 가상 포인터
    const t = now / 1000;
    const r = scene.getBoundingClientRect();
    aim(r.left + r.width * (0.5 + Math.sin(t * 0.9) * 0.45),
        r.top + r.height * (0.5 + Math.sin(t * 1.3) * 0.45));
  }
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);`
  },
  {
    no: 61,
    id: 'spotlight-card',
    cat: 'hover',
    name: '스포트라이트 카드',
    en: 'Spotlight Card',
    level: 2,
    trigger: 'mouse',
    timing: '실시간 추적 · 페이드 400ms',
    desc: '카드 그리드 위에서 포인터를 따라 표면과 테두리에 빛이 번집니다. 카드 사이를 지날 때 이웃 카드 테두리까지 함께 밝아지는 것이 특징입니다.',
    use: '기능 소개 그리드, 요금제 카드, 대시보드 위젯',
    tech: ['CSS Custom Properties', 'radial-gradient', 'CSS mask-composite', 'Pointer Events'],
    terms: ['스포트라이트 효과 (Spotlight Effect)', '방사형 그라디언트 (Radial Gradient)', '마스크 합성 (Mask Composite)', 'CSS 사용자 정의 속성 (CSS Custom Properties)'],
    prompt: '기능 소개 카드 3개가 놓인 그리드에서 포인터를 따라 카드 표면과 테두리에 은은한 빛이 번지는 스포트라이트 카드(Spotlight Card) 효과를 만들어줘. 그리드에 pointermove를 걸고 카드마다 getBoundingClientRect로 포인터의 카드 내부 좌표를 구해 CSS 변수 --x, --y에 넣어줘. 카드 ::before에는 radial-gradient(360px circle at var(--x) var(--y))로 브랜드 포인트 컬러를 불투명도 12% 정도로 깔고, ::after에는 padding 1px과 마스크 합성(Mask Composite, mask-composite: exclude)으로 테두리 1px만 남긴 뒤 반경 260px의 진한 그라디언트를 넣어 포인터 근처 테두리가 빛나게 해줘. 좌표는 모든 카드에 동시에 넣어서 카드 사이 간격을 지날 때도 이웃 카드 테두리가 함께 밝아지게 하고, 포인터가 그리드를 벗어나면 400ms 동안 글로우를 페이드아웃해줘. hover가 없는 터치 기기에서는 글로우 없이 기본 테두리만 보이게 해줘.',
    html: `<section class="grid">
  <article class="card">
    <svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"/></svg>
    <h3>실시간 동기화</h3>
    <p>모든 기기에 바로 반영돼요.</p>
  </article>
  <article class="card">
    <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
    <h3>종단간 암호화</h3>
    <p>나만 열어볼 수 있어요.</p>
  </article>
  <article class="card">
    <svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>
    <h3>자동 백업</h3>
    <p>매시간 스냅샷을 남겨요.</p>
  </article>
</section>`,
    css: `body {
  touch-action: none;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  width: min(92vw, 860px);
}
.card {
  --x: -999px;
  --y: -999px;
  position: relative;
  padding: clamp(20px, 3vw, 28px);
  border-radius: 18px;
  border: 1px solid var(--line);
  background: var(--surface);
}
.card > * {
  position: relative; /* 글로우 위에 콘텐츠를 올림 */
}
/* 표면 글로우 */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(360px circle at var(--x) var(--y), var(--accent), transparent 45%);
  opacity: 0;
  pointer-events: none;
  transition: opacity .4s;
}
/* 테두리 글로우: padding 1px만 남기고 안쪽은 마스크로 뚫음 */
.card::after {
  content: '';
  position: absolute;
  inset: -1px;
  padding: 1px;
  border-radius: inherit;
  background: radial-gradient(260px circle at var(--x) var(--y), var(--accent), transparent 60%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  opacity: 0;
  pointer-events: none;
  transition: opacity .4s;
}
.grid.on .card::before { opacity: .12; }
.grid.on .card::after { opacity: 1; }
.card svg {
  width: 28px;
  height: 28px;
  margin-bottom: 18px;
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.card h3 {
  margin: 0 0 6px;
  font-size: clamp(15px, 1.8vw, 17px);
  letter-spacing: -0.01em;
}
.card p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--muted);
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 10px;
    width: min(92vw, 420px);
  }
  .card {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 14px;
    align-items: center;
    padding: 16px 18px;
  }
  .card svg {
    grid-row: span 2;
    margin: 0;
  }
  .card h3 {
    margin: 0 0 2px;
  }
}`,
    js: `const grid = document.querySelector('.grid');
const cards = grid.querySelectorAll('.card');

// 포인터 좌표를 카드마다 자기 기준 좌표로 바꿔 --x, --y에 넣음
function spot(px, py) {
  cards.forEach(card => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', px - r.left + 'px');
    card.style.setProperty('--y', py - r.top + 'px');
  });
}

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
let idle;
grid.addEventListener('pointermove', e => {
  auto = false;
  grid.classList.add('on');
  spot(e.clientX, e.clientY);
  clearTimeout(idle);
  idle = setTimeout(() => { auto = true; }, 2500);
});
grid.addEventListener('pointerleave', () => {
  if (!auto) grid.classList.remove('on');
});

function loop(now) {
  if (auto) {
    // 그리드 위를 리사주 곡선으로 도는 가상 포인터
    const t = now / 1000;
    const r = grid.getBoundingClientRect();
    grid.classList.add('on');
    spot(r.left + r.width * (0.5 + Math.sin(t * 0.7) * 0.48),
         r.top + r.height * (0.5 + Math.sin(t * 1.1) * 0.6));
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);`
  },
  {
    no: 62,
    id: 'underline-slide',
    cat: 'hover',
    name: '밑줄 슬라이드 링크',
    en: 'Underline Slide Link',
    level: 1,
    trigger: 'hover',
    timing: '300ms · cubic-bezier(.65,0,.35,1)',
    desc: '마우스를 올리면 밑줄이 왼쪽에서 자라나고, 떼면 오른쪽으로 빠져나갑니다. 들어오고 나가는 방향이 달라 흐름이 자연스럽습니다.',
    use: '상단 내비게이션, 푸터 링크, 본문 인라인 링크',
    tech: ['CSS transition', 'transform-origin'],
    terms: ['밑줄 애니메이션 (Underline Animation)', '트랜스폼 원점 (Transform Origin)', '호버 상태 (Hover State)'],
    prompt: '내비게이션 링크에 마우스를 올리면 밑줄이 왼쪽에서 자라나고, 마우스를 떼면 오른쪽으로 빠져나가는 밑줄 슬라이드(Underline Slide) 효과를 만들어줘. 링크의 ::after를 높이 2px의 브랜드 포인트 컬러 선으로 두고 기본값을 transform: scaleX(0), transform-origin: right로 설정해줘. hover 상태에서는 scaleX(1)과 transform-origin: left로 바꿔서, 트랜스폼 원점 전환(Transform Origin Switch)만으로 들어올 때와 나갈 때 방향이 달라지게 해줘. transition은 transform 300ms cubic-bezier(.65,0,.35,1)로 하고, 글자색도 보조 텍스트 색에서 기본 텍스트 색으로 300ms 동안 바꿔줘. 키보드 사용자를 위해 :focus-visible에도 같은 밑줄을 적용하고, 여러 줄로 줄바꿈되는 긴 인라인 링크는 background-size 방식으로 대체해줘.',
    html: `<div class="wrap">
  <header class="nav">
    <a class="logo" href="#">MOTION</a>
    <nav class="links">
      <a class="link" href="#">제품</a>
      <a class="link" href="#">요금제</a>
      <a class="link" href="#">고객 사례</a>
      <a class="link" href="#">문의하기</a>
    </nav>
  </header>
  <p class="note">변경된 내용은 <a class="link" href="#">서비스 이용약관</a>에서 확인할 수 있어요.</p>
</div>`,
    css: `.wrap {
  display: grid;
  justify-items: center;
  gap: clamp(24px, 6vh, 40px);
  width: min(92vw, 760px);
}
.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px 40px;
  width: 100%;
  padding: 18px clamp(20px, 4vw, 32px);
  border-radius: 18px;
  border: 1px solid var(--line);
  background: var(--surface);
}
.logo {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .16em;
  color: var(--fg);
  text-decoration: none;
}
.links {
  display: flex;
  gap: clamp(18px, 3.4vw, 36px);
}
.note {
  margin: 0;
  font-size: 14px;
  color: var(--muted);
  text-align: center;
}
.link {
  position: relative;
  padding: 4px 0;
  color: var(--muted);
  font-size: clamp(14px, 1.9vw, 16px);
  font-weight: 500;
  text-decoration: none;
  outline: none;
  transition: color 300ms;
}
.note .link {
  font-size: inherit;
  color: var(--fg);
}
.link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right; /* 떠날 때: 오른쪽으로 빠져나감 */
  transition: transform 300ms cubic-bezier(.65, 0, .35, 1);
}
.link:hover,
.link:focus-visible,
.link.is-hover {
  color: var(--fg);
}
.link:hover::after,
.link:focus-visible::after,
.link.is-hover::after {
  transform: scaleX(1);
  transform-origin: left; /* 들어올 때: 왼쪽에서 자라남 */
}
@media (max-width: 560px) {
  .nav {
    flex-direction: column;
  }
}`,
    js: `// 데모에서는 링크 이동을 막음
document.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', e => e.preventDefault());
});

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
const links = Array.from(document.querySelectorAll('.link'));
let step = 0;
let paused = false;
let idle;
function cycle() {
  let delay = 1400;
  if (!paused) {
    const active = document.querySelector('.link.is-hover');
    if (active) {
      active.classList.remove('is-hover'); // 오른쪽으로 빠져나감
      delay = 450;
    } else {
      links[step++ % links.length].classList.add('is-hover'); // 왼쪽에서 자라남
    }
  }
  setTimeout(cycle, delay);
}
setTimeout(cycle, 600);
document.addEventListener('pointermove', () => {
  paused = true;
  links.forEach(l => l.classList.remove('is-hover'));
  clearTimeout(idle);
  idle = setTimeout(() => { paused = false; }, 2500);
});`
  },
  {
    no: 63,
    id: 'fill-sweep-button',
    cat: 'hover',
    name: '채우기 스윕 버튼',
    en: 'Fill Sweep Button',
    level: 1,
    trigger: 'hover',
    timing: '400ms · cubic-bezier(.65,0,.35,1)',
    desc: '마우스를 올리면 배경색이 왼쪽, 아래, 가운데 등 정해진 방향에서 쓸려 들어오며 버튼을 채우고 글자색이 반전됩니다.',
    use: 'CTA 버튼, 폼 제출 버튼, 랜딩 페이지 버튼',
    tech: ['CSS transition', '::before 가상 요소'],
    terms: ['채우기 스윕 (Fill Sweep)', '가상 요소 (Pseudo-element)', '색상 반전 (Color Inversion)'],
    prompt: '버튼에 마우스를 올리면 배경색이 한쪽에서 쓸려 들어오며 채워지는 채우기 스윕 버튼(Fill Sweep Button)을 만들어줘. 기본 상태는 브랜드 포인트 컬러 1.5px 테두리에 투명 배경, 포인트 컬러 글자로 두고, ::before 가상 요소(Pseudo-element)를 z-index: -1로 깔아 hover 때 transform으로 채워지게 해줘. 변형은 세 가지로 만들어줘: 왼쪽에서(scaleX 0→1, origin left), 아래에서(scaleY 0→1, origin bottom), 가운데 원형(버튼 너비 120% 지름의 원을 scale 0→1). 채우기와 글자색 반전(Color Inversion)은 모두 400ms cubic-bezier(.65,0,.35,1)로 맞추고, 버튼에 overflow: hidden과 isolation: isolate를 줘서 가상 요소가 모서리 밖이나 부모 배경 뒤로 새지 않게 해줘. hover가 없는 터치 기기와 키보드 사용자를 위해 :focus-visible과 :active에도 채워진 상태를 적용해줘.',
    html: `<div class="row">
  <figure>
    <button class="sweep from-left">시작하기</button>
    <figcaption>왼쪽에서</figcaption>
  </figure>
  <figure>
    <button class="sweep from-bottom">더 알아보기</button>
    <figcaption>아래에서</figcaption>
  </figure>
  <figure>
    <button class="sweep from-center">상담 신청</button>
    <figcaption>가운데서</figcaption>
  </figure>
</div>`,
    css: `.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(14px, 3vw, 28px);
  padding: 0 16px;
}
figure {
  display: grid;
  justify-items: center;
  gap: 10px;
  margin: 0;
}
figcaption {
  font-size: 12px;
  letter-spacing: .04em;
  color: var(--muted);
}
.sweep {
  position: relative;
  isolation: isolate; /* ::before가 부모 배경 뒤로 숨지 않게 */
  overflow: hidden;
  min-width: 160px;
  padding: 15px 28px;
  border: 1.5px solid var(--accent);
  border-radius: 12px;
  background: transparent;
  color: var(--accent);
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: color 400ms cubic-bezier(.65, 0, .35, 1);
}
.sweep::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  background: var(--accent);
  transition: transform 400ms cubic-bezier(.65, 0, .35, 1);
}
.from-left::before {
  transform: scaleX(0);
  transform-origin: left;
}
.from-bottom::before {
  transform: scaleY(0);
  transform-origin: bottom;
}
.from-center::before {
  inset: auto;
  left: 50%;
  top: 50%;
  width: 120%;
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
}
.sweep:hover,
.sweep:focus-visible,
.sweep.is-hover {
  color: var(--bg);
}
.from-left:hover::before,
.from-left:focus-visible::before,
.from-left.is-hover::before {
  transform: scaleX(1);
}
.from-bottom:hover::before,
.from-bottom:focus-visible::before,
.from-bottom.is-hover::before {
  transform: scaleY(1);
}
.from-center:hover::before,
.from-center:focus-visible::before,
.from-center.is-hover::before {
  transform: translate(-50%, -50%) scale(1);
}`,
    js: `// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
const buttons = Array.from(document.querySelectorAll('.sweep'));
let step = 0;
let paused = false;
let idle;
function cycle() {
  let delay = 1500;
  if (!paused) {
    const active = document.querySelector('.sweep.is-hover');
    if (active) {
      active.classList.remove('is-hover');
      delay = 500;
    } else {
      buttons[step++ % buttons.length].classList.add('is-hover');
    }
  }
  setTimeout(cycle, delay);
}
setTimeout(cycle, 600);
document.addEventListener('pointermove', () => {
  paused = true;
  buttons.forEach(b => b.classList.remove('is-hover'));
  clearTimeout(idle);
  idle = setTimeout(() => { paused = false; }, 2500);
});`
  },
  {
    no: 64,
    id: 'shine-sweep',
    cat: 'hover',
    name: '샤인 스윕',
    en: 'Shine Sweep',
    level: 1,
    trigger: 'auto',
    timing: '3.2s 주기 · 스윕 800ms',
    desc: '버튼 위로 비스듬한 빛줄기가 주기적으로 스쳐 지나가며 시선을 끕니다. 마우스를 올리면 바로 한 번 더 반짝입니다.',
    use: '메인 CTA, 결제·구독 버튼, 프로모션 배너',
    tech: ['CSS @keyframes', 'linear-gradient', 'skewX'],
    terms: ['샤인 효과 (Shine Effect)', '광택 스윕 (Gloss Sweep)', '기울이기 변형 (Skew Transform)'],
    prompt: '메인 CTA 버튼 위로 비스듬한 빛줄기가 주기적으로 스쳐 지나가는 샤인 스윕(Shine Sweep) 효과를 만들어줘. 버튼에 overflow: hidden을 주고 ::after를 버튼 너비 40%, 흰색 불투명도 0→60%→0의 가로 linear-gradient 띠로 만든 뒤 skewX(-20deg)로 기울여줘. @keyframes로 translateX(-150%)에서 translateX(300%)까지 이동시키되, 3.2초 주기 중 앞 25%(약 800ms)에만 움직이고 나머지는 쉬게 해서 반짝임이 과하지 않게 해줘. hover 시에는 750ms짜리 1회 스윕 애니메이션으로 바꿔 즉시 빛이 지나가게 하고, 버튼이 2px 떠오르며 그림자가 커지게 해줘. left 대신 transform만 애니메이션해서 레이아웃 재계산이 없게 하고, prefers-reduced-motion 환경에서는 빛줄기를 숨겨줘.',
    html: `<section class="hero">
  <p class="eyebrow">LIMITED OFFER</p>
  <h1>지금 가입하면<br>첫 달은 무료예요</h1>
  <button class="cta">
    무료로 시작하기
    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  </button>
  <p class="sub">신용카드 없이 30초면 시작할 수 있어요</p>
</section>`,
    css: `.hero {
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .22em;
  color: var(--accent);
}
h1 {
  margin: 0 0 clamp(20px, 5vh, 32px);
  font-size: clamp(24px, 5vw, 40px);
  line-height: 1.25;
  letter-spacing: -0.03em;
}
.cta {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 32px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font: inherit;
  font-size: clamp(15px, 2vw, 17px);
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 14px 34px -14px var(--accent);
  transition: transform .25s cubic-bezier(.22, 1, .36, 1), box-shadow .25s;
}
.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -14px var(--accent);
}
.cta svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
/* 빛줄기: 비스듬히 기울인 흰색 그라디언트 띠 */
.cta::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .6), transparent);
  transform: translateX(-150%) skewX(-20deg);
  pointer-events: none;
  animation: shine 3.2s cubic-bezier(.4, 0, .2, 1) 1s infinite;
}
.cta:hover::after {
  animation: shine-once 750ms cubic-bezier(.4, 0, .2, 1);
}
/* 주기의 앞 25%만 이동하고 나머지는 대기 */
@keyframes shine {
  0% { transform: translateX(-150%) skewX(-20deg); }
  25%, 100% { transform: translateX(300%) skewX(-20deg); }
}
@keyframes shine-once {
  to { transform: translateX(300%) skewX(-20deg); }
}
.sub {
  margin: 14px 0 0;
  font-size: 13px;
  color: var(--muted);
}`,
    js: ''
  },
  {
    no: 65,
    id: 'heart-burst',
    cat: 'hover',
    name: '좋아요 하트 버스트',
    en: 'Heart Burst Like',
    level: 2,
    trigger: 'click',
    timing: '팝 450ms · 파티클 600ms',
    desc: '좋아요를 누르면 하트가 튀어 오르며 채워지고, 링과 작은 파편이 사방으로 터집니다. 숫자가 함께 올라가 누르는 맛을 줍니다.',
    use: 'SNS 좋아요, 찜하기, 즐겨찾기 버튼',
    tech: ['Web Animations API', 'CSS @keyframes', 'SVG'],
    terms: ['하트 버스트 (Heart Burst)', '파티클 폭발 (Particle Burst)', '오버슈트 (Overshoot)', '마이크로 인터랙션 (Micro-interaction)'],
    prompt: '게시물 카드의 좋아요 하트 버튼을 누르면 하트가 튀어 오르며 주변으로 파편이 터지는 하트 버스트(Heart Burst) 애니메이션을 만들어줘. 클릭하면 하트를 scale 0.4 → 1.25 → 0.92 → 1로 450ms 동안 오버슈트(Overshoot) 있게 키우면서 외곽선만 있던 하트를 빨간색으로 채워줘. 동시에 하트 뒤에서 링이 scale 0.3에서 1.6으로 500ms 동안 퍼지며 테두리가 10px에서 1px로 얇아지다 사라지게 하고, 작은 원형 파티클 10개를 360°에 고르게(약간의 무작위 각도) 배치해 28~42px 바깥으로 600ms 동안 날아가며 작아지게 해줘(Web Animations API, 끝나면 요소 제거). 옆의 좋아요 수는 +1 되면서 아래에서 위로 살짝 올라오게 하고, 다시 누르면 채움을 해제하고 -1 하며 위에서 내려오게 해줘. 상태는 aria-pressed로 표시하고, 빠르게 연타해도 파티클 요소가 쌓이지 않도록 애니메이션이 끝날 때마다 정리해줘.',
    html: `<article class="post">
  <div class="thumb"></div>
  <footer>
    <div class="info">
      <strong>새벽 네 시의 도시</strong>
      <span>사진 · 모션랩</span>
    </div>
    <button class="like" aria-pressed="false" aria-label="좋아요">
      <span class="ring"></span>
      <svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 3.9 4 7.4 4c2 0 3.6 1.1 4.6 2.7C13 5.1 14.6 4 16.6 4c3.5 0 5.8 3.6 4.6 7.1-1.7 4.8-9.2 9.4-9.2 9.4z"/></svg>
    </button>
    <span class="count">128</span>
  </footer>
</article>`,
    css: `.post {
  --heart: #ff4d6d;
  width: min(86vw, 380px);
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: 0 24px 48px -30px rgba(0, 0, 0, .4);
}
.thumb {
  height: clamp(100px, 32vh, 190px);
  border-radius: 19px 19px 0 0;
  background:
    radial-gradient(circle at 72% 40%, var(--accent-2) 0 7%, transparent 7.5%),
    radial-gradient(circle at 72% 40%, color-mix(in srgb, var(--accent-2) 45%, transparent), transparent 42%),
    linear-gradient(180deg, var(--accent), var(--surface));
}
footer {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 14px 18px 14px 20px;
}
.info {
  flex: 1;
  display: grid;
  gap: 3px;
  min-width: 0;
}
.info strong {
  font-size: 15px;
}
.info span {
  font-size: 12.5px;
  color: var(--muted);
}
.like {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.like svg {
  width: 28px;
  height: 28px;
  fill: transparent;
  stroke: var(--muted);
  stroke-width: 1.8;
  transition: fill .2s, stroke .2s;
}
.like[aria-pressed="true"] svg {
  fill: var(--heart);
  stroke: var(--heart);
  animation: pop 450ms;
}
/* 하트 뒤로 퍼지는 링 */
.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--heart);
  opacity: 0;
  pointer-events: none;
}
.like[aria-pressed="true"] .ring {
  animation: ring 500ms ease-out;
}
.particle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  pointer-events: none;
}
.count {
  display: inline-block;
  min-width: 3ch;
  font-size: 15px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  transition: color .2s;
}
.like[aria-pressed="true"] + .count {
  color: var(--heart);
}
@keyframes pop {
  0% { transform: scale(.4); }
  50% { transform: scale(1.25); }
  75% { transform: scale(.92); }
  100% { transform: scale(1); }
}
@keyframes ring {
  0% { transform: scale(.3); opacity: 1; border-width: 10px; }
  100% { transform: scale(1.6); opacity: 0; border-width: 1px; }
}`,
    js: `const like = document.querySelector('.like');
const count = document.querySelector('.count');
const COLORS = ['#ff4d6d', 'var(--accent)', 'var(--accent-2)'];
let liked = false;
let n = 128;

// 작은 점 10개를 원형으로 흩뿌림
function burst() {
  const N = 10;
  for (let i = 0; i < N; i++) {
    const p = document.createElement('i');
    p.className = 'particle';
    p.style.background = COLORS[i % COLORS.length];
    like.appendChild(p);
    const angle = (i / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 28 + Math.random() * 14;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    // 전반부엔 빠르게 퍼지고, 후반부에 작아지며 사라짐
    p.animate([
      { transform: 'translate(' + dx * 0.3 + 'px,' + dy * 0.3 + 'px) scale(1)', opacity: 1, easing: 'cubic-bezier(.22,1,.36,1)' },
      { transform: 'translate(' + dx * 0.85 + 'px,' + dy * 0.85 + 'px) scale(1)', opacity: 1, offset: 0.5, easing: 'ease-in' },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(0)', opacity: 0 }
    ], { duration: 600 }).onfinish = () => p.remove();
  }
}

function toggle() {
  liked = !liked;
  n += liked ? 1 : -1;
  // aria-pressed가 바뀌면 CSS의 pop·ring 애니메이션이 재생됨
  like.setAttribute('aria-pressed', liked);
  count.textContent = n.toLocaleString('ko-KR');
  count.animate([
    { transform: 'translateY(' + (liked ? 8 : -8) + 'px)', opacity: 0 },
    { transform: 'none', opacity: 1 }
  ], { duration: 300, easing: 'cubic-bezier(.22,1,.36,1)' });
  if (liked) burst();
}
like.addEventListener('click', toggle);

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let demo = setTimeout(function autoClick() {
  toggle();
  demo = setTimeout(autoClick, liked ? 2600 : 900);
}, 600);
document.addEventListener('pointerdown', () => clearTimeout(demo));`
  },
  {
    no: 66,
    id: 'spring-toggle',
    cat: 'hover',
    name: '스프링 토글 스위치',
    en: 'Spring Toggle Switch',
    level: 2,
    trigger: 'click',
    timing: '450ms · 오버슈트 (.34,1.56,.64,1)',
    desc: '스위치를 켜고 끌 때 손잡이가 진행 방향으로 늘어나며 이동하고, 목표 지점을 살짝 지나쳤다 돌아옵니다. 쫀득한 탄성이 느껴지는 토글입니다.',
    use: '설정 화면, 알림 켜기·끄기, 필터 스위치',
    tech: ['CSS transition', 'Web Animations API', 'cubic-bezier'],
    terms: ['토글 스위치 (Toggle Switch)', '오버슈트 이징 (Overshoot Easing)', '스쿼시 앤 스트레치 (Squash and Stretch)'],
    prompt: '설정 화면의 토글 스위치를 켜고 끌 때 손잡이가 탄성 있게 튕기며 이동하는 스프링 토글 스위치(Spring Toggle Switch)를 만들어줘. 트랙은 52×30px 알약 모양, 손잡이는 24px 흰 원으로 두고, 켜지면 손잡이를 translate 22px 이동시키되 transition을 450ms cubic-bezier(.34,1.56,.64,1)로 줘서 목표 지점을 살짝 지나쳤다 돌아오는 오버슈트(Overshoot)를 만들어줘. 이동 초반에는 Web Animations API로 scale을 1 → 1.3/0.9(20% 지점) → 1(55% 지점)로 바꿔 손잡이가 진행 방향으로 늘어나는 스쿼시 앤 스트레치(Squash and Stretch)를 주고, transform-origin은 출발하는 쪽 끝으로 잡아서 오버슈트 전에 원래 모양으로 돌아오게 해줘. 트랙 색은 300ms 동안 회색에서 브랜드 포인트 컬러로 바뀌게 해줘. button에 role="switch"와 aria-checked를 달아서 스크린리더와 키보드(Space·Enter)로도 조작되게 해줘.',
    html: `<section class="panel">
  <h2>알림 설정</h2>
  <div class="row">
    <div>
      <strong>푸시 알림</strong>
      <span>새 메시지와 멘션을 알려드려요</span>
    </div>
    <button class="switch" role="switch" aria-checked="true" aria-label="푸시 알림"><span class="knob"></span></button>
  </div>
  <div class="row">
    <div>
      <strong>이메일 요약</strong>
      <span>매주 월요일 아침에 보내드려요</span>
    </div>
    <button class="switch" role="switch" aria-checked="false" aria-label="이메일 요약"><span class="knob"></span></button>
  </div>
  <div class="row">
    <div>
      <strong>방해 금지 모드</strong>
      <span>밤 11시부터 오전 7시까지</span>
    </div>
    <button class="switch" role="switch" aria-checked="false" aria-label="방해 금지 모드"><span class="knob"></span></button>
  </div>
</section>`,
    css: `.panel {
  width: min(90vw, 440px);
  padding: clamp(14px, 4vw, 22px) clamp(18px, 4vw, 28px);
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--surface);
}
h2 {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .08em;
  color: var(--muted);
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 0;
}
.row + .row {
  border-top: 1px solid var(--line);
}
.row div {
  display: grid;
  gap: 3px;
}
.row strong {
  font-size: 15px;
  font-weight: 600;
}
.row span {
  font-size: 12.5px;
  color: var(--muted);
}
.switch {
  flex: none;
  position: relative;
  width: 52px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--line);
  box-shadow: inset 0 0 0 1px var(--line);
  cursor: pointer;
  transition: background-color 300ms ease;
}
.switch[aria-checked="true"] {
  background: var(--accent);
}
.knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
  /* 오버슈트 이징: 목표 지점을 살짝 지나쳤다 돌아옴 */
  transition: translate 450ms cubic-bezier(.34, 1.56, .64, 1);
}
.switch[aria-checked="true"] .knob {
  translate: 22px 0;
}
.switch:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}`,
    js: `function toggle(sw) {
  const on = sw.getAttribute('aria-checked') !== 'true';
  sw.setAttribute('aria-checked', on);
  const knob = sw.querySelector('.knob');
  // 출발하는 쪽을 기준점으로 잡아 진행 방향으로 늘어나게 함
  knob.style.transformOrigin = on ? 'left center' : 'right center';
  // 출발 직후 늘어났다가 오버슈트 전에 원래 모양으로 돌아옴
  knob.animate(
    [{ scale: '1 1' }, { scale: '1.3 .9', offset: 0.2 }, { scale: '1 1', offset: 0.55 }, { scale: '1 1' }],
    { duration: 450 }
  );
}

const switches = Array.from(document.querySelectorAll('.switch'));
switches.forEach(sw => sw.addEventListener('click', () => toggle(sw)));

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let turn = 0;
let demo = setTimeout(function autoClick() {
  toggle(switches[turn++ % switches.length]);
  demo = setTimeout(autoClick, 1800 + Math.random() * 1000);
}, 600);
document.addEventListener('pointerdown', () => clearTimeout(demo));`
  },
  {
    no: 67,
    id: 'check-draw',
    cat: 'hover',
    name: '체크 드로잉 체크박스',
    en: 'Check Draw Checkbox',
    level: 2,
    trigger: 'click',
    timing: '드로잉 350ms · 취소선 400ms',
    desc: '체크하면 체크 표시가 펜으로 그리듯 그려지고, 박스가 톡 튀어 오르며 할 일 텍스트에 취소선이 그어집니다.',
    use: '투두 리스트, 체크리스트, 약관 동의 체크박스',
    tech: ['SVG', 'stroke-dashoffset', 'CSS transition'],
    terms: ['선 그리기 애니메이션 (Line Drawing Animation)', '스트로크 대시 오프셋 (Stroke Dashoffset)', '취소선 (Strike-through)', '커스텀 체크박스 (Custom Checkbox)'],
    prompt: '할 일 목록의 체크박스를 체크하면 체크 표시가 펜으로 그리듯 그려지는 체크 드로잉(Check Draw) 애니메이션을 만들어줘. 기본 체크박스는 시각적으로만 숨기고 22px 둥근 사각형 박스 안에 SVG 체크 path를 넣은 뒤, pathLength="1"과 stroke-dasharray: 1, stroke-dashoffset: 1로 숨겨 두었다가 :checked에서 stroke-dashoffset을 0으로 350ms 동안 줄여줘(Stroke Dashoffset). 박스는 브랜드 포인트 컬러로 채워지면서 400ms cubic-bezier(.34,1.56,.64,1)로 살짝 눌렸다 튀어나오는 팝(Pop) 효과를 주고, 라벨 텍스트에는 ::after 취소선(Strike-through)을 scaleX 0 → 1로 왼쪽에서 오른쪽으로 400ms 동안 그으면서 글자색을 흐리게 바꿔줘. 체크 → 취소선 순서가 보이도록 체크는 100ms, 취소선은 150ms 지연을 줘. 실제 input은 DOM에 남겨서 label 클릭, 키보드 Space, 스크린리더가 그대로 동작하게 하고 :focus-visible에는 박스 외곽선을 표시해줘.',
    html: `<section class="todo">
  <header>
    <h2>오늘 할 일</h2>
    <span class="progress">0/4</span>
  </header>
  <label class="item">
    <input type="checkbox">
    <span class="box"><svg viewBox="0 0 24 24"><path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
    <span class="text">디자인 시안 피드백 반영</span>
  </label>
  <label class="item">
    <input type="checkbox">
    <span class="box"><svg viewBox="0 0 24 24"><path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
    <span class="text">주간 회의록 정리</span>
  </label>
  <label class="item">
    <input type="checkbox">
    <span class="box"><svg viewBox="0 0 24 24"><path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
    <span class="text">배포 전 QA 체크</span>
  </label>
  <label class="item">
    <input type="checkbox">
    <span class="box"><svg viewBox="0 0 24 24"><path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
    <span class="text">팀 점심 예약하기</span>
  </label>
</section>`,
    css: `.todo {
  width: min(88vw, 400px);
  padding: clamp(16px, 4vw, 24px);
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--surface);
}
header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
}
h2 {
  margin: 0;
  font-size: 17px;
  letter-spacing: -0.01em;
}
.progress {
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
.item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 0;
  cursor: pointer;
}
/* 실제 체크박스는 접근성을 위해 남기고 눈에만 숨김 */
.item input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.box {
  flex: none;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  border: 2px solid var(--muted);
  transition: background-color 200ms, border-color 200ms;
}
.box svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--bg);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.box path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1; /* pathLength=1 기준으로 선 전체를 숨김 */
  transition: stroke-dashoffset 350ms cubic-bezier(.65, 0, .35, 1);
}
.text {
  position: relative;
  font-size: 15px;
  transition: color 300ms;
}
.text::after {
  content: '';
  position: absolute;
  left: -2px;
  right: -2px;
  top: 52%;
  height: 1.5px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 400ms cubic-bezier(.65, 0, .35, 1);
}
.item input:checked + .box {
  border-color: var(--accent);
  background: var(--accent);
  animation: pop 400ms cubic-bezier(.34, 1.56, .64, 1);
}
.item input:checked + .box path {
  stroke-dashoffset: 0;
  transition-delay: 100ms;
}
.item input:checked ~ .text {
  color: var(--muted);
}
.item input:checked ~ .text::after {
  transform: scaleX(1);
  transition-delay: 150ms;
}
.item input:focus-visible + .box {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
@keyframes pop {
  0% { transform: scale(1); }
  40% { transform: scale(.82); }
  100% { transform: scale(1); }
}`,
    js: `const inputs = Array.from(document.querySelectorAll('.item input'));
const progress = document.querySelector('.progress');

function update() {
  const done = inputs.filter(i => i.checked).length;
  progress.textContent = done + '/' + inputs.length;
}
inputs.forEach(i => i.addEventListener('change', update));

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let step = 0;
function autoCheck() {
  if (step < inputs.length) {
    inputs[step++].checked = true;
  } else {
    inputs.forEach(i => { i.checked = false; }); // 모두 해제하고 처음부터
    step = 0;
  }
  update();
  demo = setTimeout(autoCheck, step === inputs.length ? 2200 : 1500);
}
let demo = setTimeout(autoCheck, 600);
document.addEventListener('pointerdown', () => clearTimeout(demo));`
  },
  {
    no: 68,
    id: 'hamburger-morph',
    cat: 'hover',
    name: '햄버거 → X 모핑',
    en: 'Hamburger Menu Morph',
    level: 2,
    trigger: 'click',
    timing: '200ms+200ms 2단계 · 패널 450ms',
    desc: '햄버거 아이콘의 세 줄이 가운데로 모였다가 회전하며 X로 바뀌고, 메뉴 패널이 옆에서 밀려 들어옵니다.',
    use: '모바일 헤더, 반응형 내비게이션, 사이드 메뉴',
    tech: ['CSS transition', 'transition-delay', 'aria-expanded'],
    terms: ['햄버거 메뉴 (Hamburger Menu)', '아이콘 모핑 (Icon Morphing)', '오프캔버스 메뉴 (Off-canvas Menu)', '스태거 애니메이션 (Stagger Animation)'],
    prompt: '모바일 헤더의 햄버거 메뉴 아이콘을 누르면 세 줄이 X로 변하고 메뉴 패널이 옆에서 밀려 들어오는 햄버거 → X 모핑(Hamburger Menu Morph)을 만들어줘. 너비 22px, 두께 2px 선 3개를 7px 간격으로 두고, 열릴 때는 위아래 선이 200ms 동안 가운데로 모인 다음 250ms 동안 ±45°로 회전하는 2단계 전환(Two-step Transition)으로 해주고, 가운데 선은 모이는 순간 사라지게 해줘. 닫힐 때는 반대로 회전을 먼저 풀고 선을 벌려줘(translate와 rotate 개별 속성에 서로 다른 transition-delay 적용). 메뉴 패널은 translateX(100%)에서 0으로 450ms cubic-bezier(.22,1,.36,1)로 들어오고, 안의 링크는 150ms 뒤부터 50ms 간격 스태거(Stagger)로 페이드·슬라이드 인하며, 뒤 콘텐츠는 스크림(Scrim)으로 흐리게 덮어줘. 버튼의 aria-expanded와 aria-label을 상태에 맞게 갱신하고, Esc 키와 스크림 클릭으로도 메뉴가 닫히게 해줘.',
    html: `<div class="app">
  <header class="bar">
    <span class="logo">MOTION</span>
    <button class="burger" aria-label="메뉴 열기" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </header>
  <main class="content">
    <p class="eyebrow">NEW</p>
    <h1>움직임으로 완성하는<br>인터페이스</h1>
    <div class="skeleton"></div>
    <div class="skeleton short"></div>
  </main>
  <div class="scrim"></div>
  <nav class="menu">
    <a href="#" style="--i:0">홈</a>
    <a href="#" style="--i:1">제품 소개</a>
    <a href="#" style="--i:2">요금제</a>
    <a href="#" style="--i:3">고객센터</a>
  </nav>
</div>`,
    css: `.app {
  position: relative;
  overflow: hidden;
  width: min(92vw, 560px);
  height: clamp(260px, 82vh, 400px);
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--surface);
}
.bar {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 10px 0 22px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}
.logo {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: .16em;
}
.burger {
  position: relative;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--fg);
  cursor: pointer;
}
.burger span {
  position: absolute;
  left: 11px;
  top: 21px;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  /* 닫힐 때: 회전을 먼저 풀고, 그다음 선을 벌림 */
  transition: rotate 200ms ease, translate 200ms ease 200ms, opacity 100ms ease 200ms;
}
.burger span:nth-child(1) { translate: 0 -7px; }
.burger span:nth-child(3) { translate: 0 7px; }
/* 열릴 때: 가운데로 모인 뒤 회전 */
.app.is-open .burger span {
  transition: translate 200ms ease, rotate 250ms cubic-bezier(.34, 1.56, .64, 1) 200ms, opacity 100ms ease 100ms;
}
.app.is-open .burger span:nth-child(1) { translate: 0 0; rotate: 45deg; }
.app.is-open .burger span:nth-child(2) { opacity: 0; }
.app.is-open .burger span:nth-child(3) { translate: 0 0; rotate: -45deg; }
.content {
  padding: clamp(20px, 6vh, 36px) 22px;
}
.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .2em;
  color: var(--accent);
}
h1 {
  margin: 0 0 20px;
  font-size: clamp(22px, 4.4vw, 32px);
  line-height: 1.3;
  letter-spacing: -0.02em;
}
.skeleton {
  width: 80%;
  height: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background: var(--line);
}
.skeleton.short {
  width: 55%;
}
.scrim {
  position: absolute;
  z-index: 1;
  inset: 60px 0 0;
  background: var(--bg);
  opacity: 0;
  pointer-events: none;
  transition: opacity 400ms;
}
.menu {
  position: absolute;
  z-index: 2;
  top: 60px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: min(72%, 280px);
  padding: 14px 24px;
  border-left: 1px solid var(--line);
  background: var(--bg);
  transform: translateX(100%);
  transition: transform 450ms cubic-bezier(.22, 1, .36, 1);
}
.menu a {
  padding: 9px 0;
  color: var(--fg);
  font-size: clamp(17px, 2.6vw, 20px);
  font-weight: 600;
  text-decoration: none;
  opacity: 0;
  transform: translateX(24px);
  transition: opacity 300ms, transform 400ms cubic-bezier(.22, 1, .36, 1);
}
.app.is-open .scrim {
  opacity: .6;
  pointer-events: auto;
}
.app.is-open .menu {
  transform: none;
}
/* 링크는 50ms 간격으로 차례차례 들어옴 */
.app.is-open .menu a {
  opacity: 1;
  transform: none;
  transition-delay: calc(150ms + var(--i) * 50ms);
}`,
    js: `const app = document.querySelector('.app');
const burger = document.querySelector('.burger');

function setOpen(open) {
  app.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
}
const isOpen = () => app.classList.contains('is-open');

burger.addEventListener('click', () => setOpen(!isOpen()));
document.querySelector('.scrim').addEventListener('click', () => setOpen(false));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') setOpen(false);
});
// 데모에서는 링크 이동을 막고 메뉴만 닫음
document.querySelectorAll('.menu a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    setOpen(false);
  });
});

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let demo = setTimeout(function autoClick() {
  setOpen(!isOpen());
  demo = setTimeout(autoClick, 2600);
}, 600);
document.addEventListener('pointerdown', () => clearTimeout(demo));`
  },
  {
    no: 69,
    id: 'jelly-button',
    cat: 'hover',
    name: '젤리 버튼',
    en: 'Jelly Button',
    level: 1,
    trigger: 'click',
    timing: '800ms · 러버밴드 키프레임 6단계',
    desc: '클릭하면 버튼이 가로와 세로로 번갈아 늘어났다 줄어들며 젤리처럼 출렁입니다. 가볍고 장난스러운 피드백을 줍니다.',
    use: '장바구니 담기, 게임형 UI, 이벤트·리워드 버튼',
    tech: ['CSS @keyframes', 'CSS transform'],
    terms: ['러버밴드 효과 (Rubber Band Effect)', '스쿼시 앤 스트레치 (Squash and Stretch)', '젤리 효과 (Jelly Effect)'],
    prompt: '버튼을 클릭하면 젤리처럼 출렁이는 젤리 버튼(Jelly Button) 효과를 만들어줘. @keyframes로 러버밴드(Rubber Band) 형태의 스쿼시 앤 스트레치(Squash and Stretch)를 만들어서 0% scale(1,1) → 30% (1.25,0.75) → 40% (0.75,1.25) → 50% (1.15,0.85) → 65% (0.95,1.05) → 75% (1.05,0.95) → 100% (1,1) 순서로 800ms 동안 재생해줘. 가로로 늘어나면 세로는 그만큼 줄어들어 부피가 유지되는 느낌이 나야 해. 연속으로 클릭해도 매번 처음부터 재생되도록 클래스를 제거하고 offsetWidth로 강제 리플로우(Reflow)한 뒤 다시 붙이고, animationend에서 클래스를 정리해줘. prefers-reduced-motion 환경에서는 출렁임 대신 짧은 scale(0.97) 눌림 효과로 대체해줘.',
    html: `<div class="shop">
  <button class="jelly primary">
    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
    장바구니 담기
  </button>
  <button class="jelly round" aria-label="수량 추가">
    <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 5v14M5 12h14"/></svg>
  </button>
</div>`,
    css: `.shop {
  display: flex;
  align-items: center;
  gap: 16px;
}
.jelly {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.jelly svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.primary {
  padding: 18px 30px;
  border-radius: 18px;
  background: var(--accent);
  color: var(--bg);
  font-size: clamp(15px, 2.2vw, 17px);
  box-shadow: 0 14px 30px -14px var(--accent);
}
.round {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--fg);
}
.jelly.is-jelly {
  animation: jelly 800ms both;
}
/* 가로가 늘면 세로는 줄어드는 러버밴드 */
@keyframes jelly {
  0%   { transform: scale(1, 1); }
  30%  { transform: scale(1.25, .75); }
  40%  { transform: scale(.75, 1.25); }
  50%  { transform: scale(1.15, .85); }
  65%  { transform: scale(.95, 1.05); }
  75%  { transform: scale(1.05, .95); }
  100% { transform: scale(1, 1); }
}`,
    js: `function jelly(btn) {
  // 클래스를 뺐다가 강제 리플로우 후 다시 붙여 처음부터 재생
  btn.classList.remove('is-jelly');
  void btn.offsetWidth;
  btn.classList.add('is-jelly');
}

const buttons = Array.from(document.querySelectorAll('.jelly'));
buttons.forEach(btn => {
  btn.addEventListener('click', () => jelly(btn));
  btn.addEventListener('animationend', () => btn.classList.remove('is-jelly'));
});

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let turn = 0;
let demo = setTimeout(function autoClick() {
  jelly(buttons[turn++ % buttons.length]);
  demo = setTimeout(autoClick, 2200 + Math.random() * 800);
}, 600);
document.addEventListener('pointerdown', () => clearTimeout(demo));`
  },
  {
    no: 70,
    id: 'shake-error',
    cat: 'hover',
    name: '흔들림 에러 피드백',
    en: 'Shake Error Feedback',
    level: 2,
    trigger: 'click',
    timing: '400ms · 감쇠 흔들림 8→-2px',
    desc: '잘못된 값을 제출하면 입력창이 고개를 젓듯 좌우로 흔들리고 에러 메시지가 내려옵니다. 올바른 값이면 체크 아이콘이 그려집니다.',
    use: '로그인·회원가입 폼, 인증번호 입력, 쿠폰 코드 입력',
    tech: ['CSS @keyframes', 'grid-template-rows 전환', 'SVG stroke-dashoffset'],
    terms: ['흔들림 애니메이션 (Shake Animation)', '감쇠 진동 (Damped Oscillation)', '폼 유효성 검사 (Form Validation)', '인라인 에러 메시지 (Inline Error Message)'],
    prompt: '로그인 폼에서 잘못된 이메일로 제출하면 입력창이 좌우로 흔들리는 흔들림 에러 피드백(Shake Error Feedback)을 만들어줘. 제출할 때 정규식으로 이메일 형식을 검사하고, 틀리면 입력창을 translateX 0 → 8px → -6px → 4px → -2px → 0으로 폭이 점점 줄어드는 감쇠 진동(Damped Oscillation) 키프레임으로 400ms ease-out 동안 흔들어줘. 동시에 테두리와 포커스 링을 에러 빨간색으로 바꾸고, 입력창 아래 에러 메시지는 grid-template-rows 0fr → 1fr 전환으로 높이를 펼치면서 위에서 6px 내려오며 나타나게 해줘. 올바른 값이면 테두리를 초록색으로 바꾸고 입력창 오른쪽에 체크 아이콘을 stroke-dashoffset으로 350ms 동안 그린 뒤 버튼 문구를 "메일을 보냈어요"로 바꿔줘. 연속으로 틀려도 매번 흔들리도록 클래스를 떼고 리플로우 후 다시 붙이고, 다시 입력을 시작하면 에러 상태를 바로 해제하며, 스크린리더를 위해 메시지에 aria-live="polite", input에 aria-invalid를 설정해줘.',
    html: `<form class="login" novalidate>
  <h2>이메일로 시작하기</h2>
  <p class="sub">로그인 링크를 메일로 보내드려요</p>
  <label class="field" for="email">이메일</label>
  <div class="control">
    <input id="email" type="email" placeholder="name@company.com" autocomplete="off" spellcheck="false">
    <svg class="ok" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/></svg>
  </div>
  <div class="msg" aria-live="polite"><p>올바른 이메일 주소를 입력해 주세요</p></div>
  <button class="submit" type="submit">로그인 링크 받기</button>
</form>`,
    css: `.login {
  --danger: #f0455a;
  --success: #1fb57f;
  width: min(88vw, 380px);
  padding: clamp(18px, 5vw, 28px);
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--surface);
}
h2 {
  margin: 0;
  font-size: clamp(18px, 3vw, 21px);
  letter-spacing: -0.02em;
}
.sub {
  margin: 6px 0 clamp(12px, 4vh, 20px);
  font-size: 13px;
  color: var(--muted);
}
.field {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
}
.control {
  position: relative;
}
.control input {
  width: 100%;
  height: 48px;
  padding: 0 44px 0 14px;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  background: var(--bg);
  color: var(--fg);
  font: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color 200ms, box-shadow 200ms;
}
.control input::placeholder {
  color: var(--muted);
  opacity: .7;
}
.control input:focus,
.login.is-focus input {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent);
}
.login.is-error input {
  border-color: var(--danger);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--danger) 18%, transparent);
}
.login.is-valid input {
  border-color: var(--success);
  box-shadow: none;
}
/* 폭이 점점 줄어드는 감쇠 흔들림 */
.shake {
  animation: shake 400ms ease-out;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(8px); }
  40% { transform: translateX(-6px); }
  60% { transform: translateX(4px); }
  80% { transform: translateX(-2px); }
}
.ok {
  position: absolute;
  right: 14px;
  top: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  fill: none;
  stroke: var(--success);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 350ms cubic-bezier(.65, 0, .35, 1);
}
.login.is-valid .ok {
  stroke-dashoffset: 0;
}
/* 에러 메시지: grid-template-rows 0fr → 1fr로 높이를 펼침 */
.msg {
  display: grid;
  grid-template-rows: 0fr;
  margin-top: 0;
  transition: grid-template-rows 250ms ease-out, margin-top 250ms ease-out;
}
.msg p {
  overflow: hidden;
  margin: 0;
  font-size: 12.5px;
  color: var(--danger);
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 250ms, transform 250ms ease-out;
}
.login.is-error .msg {
  grid-template-rows: 1fr;
  margin-top: 8px;
}
.login.is-error .msg p {
  opacity: 1;
  transform: none;
}
.submit {
  width: 100%;
  height: 48px;
  margin-top: 16px;
  border: 0;
  border-radius: 12px;
  background: var(--accent);
  color: var(--bg);
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 120ms, background-color 300ms;
}
.submit:active,
.submit.is-press {
  transform: scale(.98);
}
.login.is-valid .submit {
  background: var(--success);
}`,
    js: `const form = document.querySelector('.login');
const input = document.getElementById('email');
const control = form.querySelector('.control');
const button = form.querySelector('.submit');
const EMAIL = /^[^ @]+@[^ @]+[.][^ @.]{2,}$/;

function clearState() {
  form.classList.remove('is-error', 'is-valid');
  input.removeAttribute('aria-invalid');
  button.textContent = '로그인 링크 받기';
}

function validate() {
  const ok = EMAIL.test(input.value.trim());
  form.classList.toggle('is-error', !ok);
  form.classList.toggle('is-valid', ok);
  input.setAttribute('aria-invalid', !ok);
  button.textContent = ok ? '메일을 보냈어요' : '로그인 링크 받기';
  if (!ok) {
    // 클래스를 뺐다가 리플로우 후 다시 붙여 매번 처음부터 흔들림
    control.classList.remove('shake');
    void control.offsetWidth;
    control.classList.add('shake');
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  validate();
});
input.addEventListener('input', clearState); // 다시 입력하면 에러 해제
control.addEventListener('animationend', () => control.classList.remove('shake'));

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
const timers = [];
const later = (fn, ms) => timers.push(setTimeout(fn, ms));
function typeText(text, at) {
  Array.from(text).forEach((ch, i) => {
    later(() => { input.value += ch; clearState(); }, at + i * 70);
  });
  return at + text.length * 70;
}
function press(at) {
  later(() => button.classList.add('is-press'), at);
  later(() => { button.classList.remove('is-press'); validate(); }, at + 140);
}
function run() {
  timers.length = 0;
  input.value = '';
  clearState();
  form.classList.add('is-focus');
  let t = typeText('hello@motion', 300); // 도메인 끝이 빠진 잘못된 값
  press(t + 400);
  t = typeText('.kr', t + 2000);         // 고쳐서 다시 제출
  press(t + 400);
  later(() => form.classList.remove('is-focus'), t + 700);
  later(run, t + 3200);
}
later(run, 300);
function stop() {
  timers.forEach(clearTimeout);
  form.classList.remove('is-focus');
  button.classList.remove('is-press');
}
document.addEventListener('pointerdown', stop);
document.addEventListener('keydown', stop);`
  },
  {
    no: 71,
    id: 'floating-label',
    cat: 'hover',
    name: '플로팅 라벨 인풋',
    en: 'Floating Label Input',
    level: 1,
    trigger: 'click',
    timing: '250ms · cubic-bezier(.4,0,.2,1)',
    desc: '입력창 안에 있던 라벨이 포커스하거나 값이 채워지면 위로 떠올라 작아지고, 밑줄이 가운데에서 양옆으로 펼쳐집니다.',
    use: '회원가입 폼, 문의·상담 신청 폼, 배송지 입력',
    tech: ['CSS :placeholder-shown', 'CSS transition'],
    terms: ['플로팅 라벨 (Floating Label)', '플레이스홀더 표시 상태 (:placeholder-shown)', '머티리얼 텍스트 필드 (Material Text Field)'],
    prompt: '상담 신청 폼의 입력창에 플레이스홀더처럼 보이던 라벨이 포커스하거나 값이 있으면 위로 떠오르며 작아지는 플로팅 라벨(Floating Label) 인풋을 만들어줘. input에 placeholder=" "(공백)를 넣고 바로 뒤 형제인 라벨을 절대 위치로 겹친 뒤, input:focus 또는 input:not(:placeholder-shown)일 때 라벨을 translateY(-10px) scale(0.75)로 옮기고(transform-origin: left top) 포커스 중에는 브랜드 포인트 컬러로 바꿔줘. 입력창 하단에는 2px 밑줄을 scaleX(0)으로 숨겨 두고 포커스 시 scaleX(1)로 가운데에서 양옆으로 펼쳐지게 해줘(Center-out Underline). 모든 전환은 250ms cubic-bezier(.4,0,.2,1)로 맞추고, 높이 56px 필드 안에서 떠오른 라벨과 입력 텍스트가 겹치지 않도록 input의 padding-top을 22px로 잡아줘. 브라우저 자동완성으로 값이 채워질 때도 라벨이 겹치지 않게 :-webkit-autofill 상태에서도 라벨을 띄워줘.',
    html: `<form class="form" novalidate>
  <h2>도입 상담 신청</h2>
  <label class="field">
    <input type="text" placeholder=" " autocomplete="off">
    <span class="label">이름</span>
    <i class="bar"></i>
  </label>
  <label class="field">
    <input type="email" placeholder=" " autocomplete="off">
    <span class="label">업무용 이메일</span>
    <i class="bar"></i>
  </label>
  <label class="field">
    <input type="text" placeholder=" " autocomplete="off">
    <span class="label">회사명</span>
    <i class="bar"></i>
  </label>
</form>`,
    css: `.form {
  display: grid;
  gap: 12px;
  width: min(88vw, 400px);
  padding: clamp(18px, 5vw, 28px);
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--surface);
}
h2 {
  margin: 0 0 4px;
  font-size: 18px;
  letter-spacing: -0.02em;
}
.field {
  position: relative;
  display: block;
  height: 56px;
  border-radius: 10px 10px 0 0;
  background: var(--bg);
}
.field input {
  width: 100%;
  height: 100%;
  padding: 22px 14px 6px;
  border: 0;
  border-bottom: 1px solid var(--line);
  border-radius: inherit;
  background: transparent;
  color: var(--fg);
  font: inherit;
  font-size: 15px;
  outline: none;
}
.label {
  position: absolute;
  left: 14px;
  top: 17px;
  font-size: 15px;
  line-height: 22px;
  color: var(--muted);
  transform-origin: left top;
  pointer-events: none;
  transition: transform 250ms cubic-bezier(.4, 0, .2, 1), color 250ms;
}
/* 가운데에서 양옆으로 펼쳐지는 밑줄 */
.bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transition: transform 250ms cubic-bezier(.4, 0, .2, 1);
}
/* 포커스되었거나 값이 있으면 라벨이 떠오르며 작아짐 */
.field input:focus + .label,
.field input:not(:placeholder-shown) + .label,
.field.is-focus .label {
  transform: translateY(-10px) scale(.75);
}
.field input:focus + .label,
.field.is-focus .label {
  color: var(--accent);
}
.field input:focus ~ .bar,
.field.is-focus .bar {
  transform: scaleX(1);
}
@media (max-height: 340px) {
  h2 { display: none; }
}`,
    js: `// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
const fields = Array.from(document.querySelectorAll('.field'));
const VALUES = ['김모션', 'hello@motion.kr', '모션랩'];
const timers = [];
const later = (fn, ms) => timers.push(setTimeout(fn, ms));

// 필드를 하나씩 포커스 → 한 글자씩 입력 → 포커스 해제
function run() {
  timers.length = 0;
  let t = 0;
  fields.forEach((field, i) => {
    const input = field.querySelector('input');
    later(() => field.classList.add('is-focus'), t);
    t += 450; // 라벨이 떠오른 다음 입력 시작
    Array.from(VALUES[i]).forEach(ch => {
      later(() => { input.value += ch; }, t);
      t += 90;
    });
    t += 500;
    later(() => field.classList.remove('is-focus'), t);
    t += 200;
  });
  // 잠시 뒤 모두 비우면 라벨이 제자리로 내려옴
  later(() => fields.forEach(f => { f.querySelector('input').value = ''; }), t + 1600);
  later(run, t + 2600);
}
later(run, 600);
document.addEventListener('pointerdown', () => {
  timers.forEach(clearTimeout);
  fields.forEach(f => f.classList.remove('is-focus'));
});`
  }
);
