window.MOTIONS = window.MOTIONS || [];
window.MOTIONS.push(
  {
    no: 9,
    id: 'flow-field',
    cat: 'bg',
    name: '플로우 필드',
    en: 'Flow Field',
    level: 3,
    trigger: 'auto',
    timing: '무한 루프 · 60fps · 잔상 알파 0.1',
    desc: '노이즈로 만든 보이지 않는 벡터 필드를 따라 수많은 입자가 흐르며 가느다란 잔상을 남기는 배경입니다. 흐름 자체가 천천히 변해 연기나 물결 같은 무늬가 끝없이 새로 생깁니다.',
    use: '히어로 섹션 배경, 제너러티브 아트 페이지, 음악·크리에이티브 서비스 랜딩',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'Path2D'],
    terms: ['플로우 필드 (Flow Field)', '벡터 필드 (Vector Field)', '값 노이즈 (Value Noise)', '모션 트레일 (Motion Trail)', '제너러티브 아트 (Generative Art)'],
    prompt: 'HTML5 Canvas로 히어로 섹션 배경 전체에 입자 1,200개가 보이지 않는 흐름을 따라 움직이는 플로우 필드(Flow Field) 배경을 만들어줘. 3D 값 노이즈(Value Noise)를 직접 구현해서 (x, y, 시간) 위치의 노이즈 값에 4π를 곱한 각도를 그 자리의 이동 방향으로 쓰고, 옥타브 2개(가중치 0.7, 0.3)를 겹쳐 큰 소용돌이 안에 잔결이 보이게 해줘. 입자는 프레임마다 1~2px씩 이동하면서 이전 위치에서 새 위치까지 두께 1.3px, 불투명도 0.9의 선을 긋고, 수명(60~240프레임)이 끝나거나 화면 밖으로 나가면 무작위 위치에서 다시 태어나게 해줘. 매 프레임 캔버스를 배경색 알파 0.1로 덮어 잔상(Motion Trail)이 서서히 사라지게 하고, 노이즈의 시간 축을 초당 0.08씩 늘려 흐름 자체가 계속 변하게 해줘. 색은 브랜드 포인트 컬러 60%, 보조 컬러 30%, 회색 10%로 나누고 색별로 Path2D에 모아 한 번에 stroke해줘. devicePixelRatio(최대 2)와 창 크기 변경에 대응하고, 노이즈 스케일을 화면 폭에 반비례시켜 모바일에서도 소용돌이 개수가 비슷하게 보이게 해줘.',
    html: `<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">FLOW FIELD</p>
  <h1>보이지 않는 흐름을 그리다</h1>
</header>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}
.hero {
  position: relative;
  isolation: isolate;
  padding: 28px 40px;
  text-align: center;
  pointer-events: none;
}
/* 글자 뒤만 배경색으로 은은하게 덮어 가독성 확보 */
.hero::before {
  content: '';
  position: absolute;
  inset: -30% -12%;
  z-index: -1;
  background: radial-gradient(closest-side, var(--bg) 35%, transparent);
  opacity: .9;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .28em;
  color: var(--accent);
}
.hero h1 {
  margin: 0;
  font-size: clamp(22px, 4.6vw, 44px);
  font-weight: 700;
  letter-spacing: -0.02em;
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const BG = css.getPropertyValue('--bg').trim() || '#0c0e14';
const COLORS = [
  css.getPropertyValue('--accent').trim() || '#7c8cff',
  css.getPropertyValue('--accent-2').trim() || '#ffc857',
  css.getPropertyValue('--muted').trim() || '#8a91a3'
];
const COUNT = 1200;

// 정수 격자점마다 항상 같은 0~1 난수를 돌려주는 해시
function hash(x, y, z) {
  let n = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1440662683);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}
const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

// 3D 값 노이즈(Value Noise): 주변 격자점 8개의 난수를 부드럽게 보간 (z축 = 시간)
function noise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const u = smooth(x - xi), v = smooth(y - yi), s = smooth(z - zi);
  const plane = (k) => lerp(
    lerp(hash(xi, yi, k), hash(xi + 1, yi, k), u),
    lerp(hash(xi, yi + 1, k), hash(xi + 1, yi + 1, k), u),
    v
  );
  return lerp(plane(zi), plane(zi + 1), s);
}

// 색 비율: 포인트 60% · 보조 30% · 회색 10%
const particles = Array.from({ length: COUNT }, (_, i) => ({
  x: 0, y: 0, life: 0,
  color: i % 10 < 6 ? 0 : i % 10 < 9 ? 1 : 2,
  speed: 1 + Math.random()
}));
function spawn(p) {
  p.x = Math.random() * w;
  p.y = Math.random() * h;
  p.life = 60 + Math.random() * 180;
}

let w = 0, h = 0, scale = 0.004;
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);
  scale = 3.2 / Math.max(w, 400); // 화면 폭과 관계없이 소용돌이가 3개 남짓 보이게
  particles.forEach(spawn);       // 캔버스가 지워졌으니 입자도 새로 흩뿌림
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

let last = 0;
function frame(now) {
  const dt = last ? Math.min(now - last, 50) / 16.7 : 1; // 주사율과 관계없이 같은 속도
  last = now;
  const t = now * 0.00008; // 필드가 변하는 속도

  // 배경색을 낮은 알파로 덮어 이전 궤적이 서서히 사라지게 (잔상)
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  const paths = COLORS.map(() => new Path2D());
  for (const p of particles) {
    const nx = p.x * scale, ny = p.y * scale;
    // 옥타브 2개를 겹친 노이즈 값을 이동 각도로 사용
    const n = noise(nx, ny, t) * 0.7 + noise(nx * 2.3, ny * 2.3, t * 1.6 + 7) * 0.3;
    const angle = n * Math.PI * 4;
    const x = p.x + Math.cos(angle) * p.speed * dt;
    const y = p.y + Math.sin(angle) * p.speed * dt;
    paths[p.color].moveTo(p.x, p.y);
    paths[p.color].lineTo(x, y);
    p.x = x;
    p.y = y;
    p.life -= dt;
    if (p.life < 0 || x < 0 || x > w || y < 0 || y > h) spawn(p);
  }
  ctx.globalAlpha = 0.9;
  ctx.lineWidth = 1.3;
  paths.forEach((path, i) => {
    ctx.strokeStyle = COLORS[i];
    ctx.stroke(path);
  });
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 10,
    id: 'mouse-repel',
    cat: 'bg',
    name: '마우스 반발 파티클',
    en: 'Mouse Repel Particles',
    level: 3,
    trigger: 'mouse',
    timing: '스프링 k 0.05 · 감쇠 0.86 · 반경 110px',
    desc: '격자로 놓인 점들이 포인터를 피해 밀려났다가 스프링처럼 살짝 출렁이며 제자리로 돌아옵니다. 표면을 손으로 쓸어 넘기는 듯한 촉감을 줍니다.',
    use: '인터랙티브 히어로 배경, 포트폴리오 인트로, 테크 제품 랜딩',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'Pointer Events'],
    terms: ['반발력 (Repulsion Force)', '스프링 물리 (Spring Physics)', '감쇠 (Damping)', '인터랙티브 파티클 (Interactive Particles)'],
    prompt: '히어로 섹션 배경 전체에 20~24px 간격의 도트 격자를 HTML5 Canvas로 깔고, 포인터가 다가가면 반경 110px 안의 점들이 바깥으로 밀려나는 마우스 반발 파티클(Repulsion Particles)을 만들어줘. 반발력은 (1 - 거리/반경)² × 3.2로 가까울수록 강하게 속도에 더하고, 각 점에는 원래 자리로 당기는 스프링 물리(Spring Physics, 강성 0.05)와 감쇠(Damping) 0.86을 적용해 포인터가 지나간 뒤 살짝 출렁이며 제자리로 돌아오게 해줘. 밀려난 거리에 비례해 점 반지름을 1.6px에서 최대 3.4px까지 키우고, 회색 점 위에 브랜드 포인트 컬러를 거리/18 불투명도로 겹쳐 서서히 물들게 해줘. Pointer Events로 마우스와 터치를 모두 받고(캔버스에 touch-action: none), 포인터가 화면을 벗어나면 반발을 꺼서 모든 점이 복귀하게 해줘. 창 크기가 바뀌면 격자를 다시 계산하고 devicePixelRatio(최대 2)에 맞춰 캔버스 해상도를 조정해줘.',
    html: `<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">INTERACTIVE SURFACE</p>
  <h1>손끝을 따라 물러나는 점들</h1>
</header>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
}
.hero {
  position: fixed;
  left: clamp(20px, 5vw, 56px);
  bottom: clamp(20px, 8vh, 52px);
  pointer-events: none;
}
.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: .24em;
  color: var(--accent);
}
.hero h1 {
  margin: 0;
  max-width: 12em;
  font-size: clamp(22px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const MUTED = css.getPropertyValue('--muted').trim() || '#8a91a3';
const ACCENT = css.getPropertyValue('--accent').trim() || '#7c8cff';

const RADIUS = 110; // 반발 반경(px)
const PUSH = 3.2;   // 밀어내는 힘
const K = 0.05;     // 스프링 강성: 원래 자리로 당기는 힘
const DAMP = 0.86;  // 감쇠: 1에 가까울수록 오래 출렁임

let w = 0, h = 0, dots = [];
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // 화면 폭에 맞춰 20~24px 간격 격자를 가운데 정렬로 다시 깔기
  const gap = Math.max(20, Math.min(24, w / 44));
  const cols = Math.floor(w / gap), rows = Math.floor(h / gap);
  const ox = (w - (cols - 1) * gap) / 2, oy = (h - (rows - 1) * gap) / 2;
  dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = ox + c * gap, y = oy + r * gap;
      dots.push({ hx: x, hy: y, x: x, y: y, vx: 0, vy: 0, off: 0 });
    }
  }
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

const pointer = { x: -9999, y: -9999 };
let lastMove = -Infinity;
addEventListener('pointermove', (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  lastMove = performance.now();
});
document.documentElement.addEventListener('pointerleave', () => {
  pointer.x = pointer.y = -9999; // 화면 밖으로 나가면 반발 끄기
});

function frame(now) {
  // 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
  if (now - lastMove > 2500) {
    const t = now / 1000;
    pointer.x = w / 2 + Math.sin(t * 0.9) * w * 0.36;
    pointer.y = h / 2 + Math.sin(t * 1.3) * h * 0.32;
  }

  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  const moved = [];
  for (const d of dots) {
    const dx = d.x - pointer.x, dy = d.y - pointer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < RADIUS && dist > 0.1) {
      // 가까울수록 강하게: (1 - 거리/반경)²
      const f = (1 - dist / RADIUS) ** 2 * PUSH;
      d.vx += (dx / dist) * f;
      d.vy += (dy / dist) * f;
    }
    // 스프링 + 감쇠: 원래 자리로 당기면서 속도를 조금씩 줄임
    d.vx = (d.vx + (d.hx - d.x) * K) * DAMP;
    d.vy = (d.vy + (d.hy - d.y) * K) * DAMP;
    d.x += d.vx;
    d.y += d.vy;
    ctx.moveTo(d.x + 1.6, d.y);
    ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
    d.off = Math.hypot(d.x - d.hx, d.y - d.hy);
    if (d.off > 0.5) moved.push(d);
  }
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = MUTED;
  ctx.fill();

  // 밀려난 점은 거리만큼 커지고 포인트 컬러로 물듦
  ctx.fillStyle = ACCENT;
  for (const d of moved) {
    ctx.globalAlpha = Math.min(1, d.off / 18);
    ctx.beginPath();
    ctx.arc(d.x, d.y, 1.6 + Math.min(d.off, 40) * 0.045, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 11,
    id: 'particle-text',
    cat: 'bg',
    name: '파티클 텍스트',
    en: 'Particle Text',
    level: 3,
    trigger: 'mouse',
    timing: '스프링 k 0.02~0.05 · 감쇠 0.86',
    desc: '흩어진 입자들이 날아와 하나의 단어를 이루고, 포인터가 가까이 오면 흩어졌다가 다시 모입니다. 브랜드 이름이나 슬로건을 인상적으로 보여줄 때 잘 어울립니다.',
    use: '브랜드 로고 인트로, 히어로 타이틀, 이벤트 티저 페이지',
    tech: ['HTML5 Canvas', 'getImageData', 'requestAnimationFrame', 'Pointer Events'],
    terms: ['파티클 텍스트 (Particle Text)', '픽셀 샘플링 (Pixel Sampling)', '오프스크린 캔버스 (Offscreen Canvas)', '스프링 이징 (Spring Easing)'],
    prompt: '히어로 중앙에 "MOTION"이라는 단어를 입자 1,400개 안팎으로 이루어진 파티클 텍스트(Particle Text)로 만들어줘. 오프스크린 캔버스(Offscreen Canvas)에 굵기 800 글꼴로 단어를 화면 폭의 84%(높이의 38% 이하) 크기로 그린 뒤, getImageData로 알파값이 128을 넘는 픽셀을 일정 간격으로 샘플링(Pixel Sampling)해서 입자의 목표 좌표로 써줘. 입자는 화면 곳곳의 무작위 위치에서 출발해 입자마다 다른 스프링 강성(0.02~0.05)과 감쇠 0.86으로 목표까지 날아와 살짝 튕기며 글자를 이루게 하고, 왼쪽에서 오른쪽으로 갈수록 브랜드 포인트 컬러에서 보조 컬러로 확률적으로 섞이게 해줘. 포인터가 글자 크기의 55% 반경 안에 들어오면 (1 - 거리/반경) × 4의 힘을 속도에 더해 입자를 바깥으로 흩트리고, 포인터가 떠나면 같은 스프링으로 다시 모이게 해줘. 창 크기가 바뀌면 글자를 다시 샘플링해 기존 입자에 새 목표를 배정하고, 샘플 간격을 채워진 픽셀 수에 맞춰 조절해 모바일에서도 60fps를 유지해줘.',
    html: `<canvas id="c"></canvas>
<p class="caption">움직임으로 기억되는 브랜드</p>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
}
.caption {
  position: fixed;
  left: 0;
  right: 0;
  bottom: clamp(18px, 12vh, 64px);
  margin: 0;
  text-align: center;
  font-size: clamp(13px, 1.8vw, 16px);
  letter-spacing: .08em;
  color: var(--muted);
  pointer-events: none;
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const COLORS = [
  css.getPropertyValue('--accent').trim() || '#7c8cff',
  css.getPropertyValue('--accent-2').trim() || '#ffc857'
];
const FONT = getComputedStyle(document.body).fontFamily;
const WORD = 'MOTION';

let w = 0, h = 0, dotR = 2, radius = 80;
const particles = [];

// 오프스크린 캔버스에 글자를 그린 뒤 픽셀을 샘플링해 목표 좌표 목록을 만듦
function buildTargets() {
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const o = off.getContext('2d');
  let size = h * 0.38;
  o.font = '800 ' + size + 'px ' + FONT;
  size *= Math.min(1, (w * 0.84) / o.measureText(WORD).width); // 폭의 84% 안에 맞춤
  o.font = '800 ' + size + 'px ' + FONT;
  const m = o.measureText(WORD);
  const left = (w - m.width) / 2;
  o.fillText(WORD, left, h * 0.44 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);

  const data = o.getImageData(0, 0, w, h).data;
  let filled = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 128) filled++;
  const step = Math.max(3, Math.ceil(Math.sqrt(filled / 1400))); // 입자 1,400개 안팎
  const targets = [];
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 128) targets.push({ x: x, y: y, mix: (x - left) / m.width });
    }
  }
  dotR = step * 0.38;
  radius = size * 0.55;
  return targets;
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (!w || !h) return;
  const targets = buildTargets();
  particles.length = Math.min(particles.length, targets.length);
  targets.forEach((t, i) => {
    // 새 입자는 화면 아무 곳에서나 출발해 목표로 날아옴
    const p = particles[i] || (particles[i] = {
      x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0,
      k: 0.02 + Math.random() * 0.03, phase: Math.random() * Math.PI * 2
    });
    p.tx = t.x;
    p.ty = t.y;
    p.color = Math.random() < t.mix ? 1 : 0; // 왼쪽→오른쪽 포인트→보조 컬러 그라디언트
  });
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

const pointer = { x: -9999, y: -9999 };
let lastMove = -Infinity;
addEventListener('pointermove', (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  lastMove = performance.now();
});
document.documentElement.addEventListener('pointerleave', () => {
  pointer.x = pointer.y = -9999;
});

function frame(now) {
  const t = now / 1000;
  // 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다 (글자가 모인 뒤부터 시작)
  if (now > 1800 && now - lastMove > 2500) {
    pointer.x = w / 2 + Math.sin(t * 0.8) * w * 0.36;
    pointer.y = h * 0.44 + Math.sin(t * 1.7) * h * 0.14;
  }

  ctx.clearRect(0, 0, w, h);
  const paths = [new Path2D(), new Path2D()];
  const r2 = radius * radius;
  for (const p of particles) {
    const dx = p.x - pointer.x, dy = p.y - pointer.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < r2 && d2 > 0.01) {
      // 포인터 근처 입자를 바깥으로 흩트림
      const d = Math.sqrt(d2);
      const f = (1 - d / radius) * 4;
      p.vx += (dx / d) * f;
      p.vy += (dy / d) * f;
    }
    // 스프링 이징: 목표 위치로 당기고 감쇠 → 살짝 튕기며 안착
    p.vx = (p.vx + (p.tx - p.x) * p.k) * 0.86;
    p.vy = (p.vy + (p.ty - p.y) * p.k) * 0.86;
    p.x += p.vx;
    p.y += p.vy;
    // 제자리에서도 아주 미세하게 떨려 살아 있는 느낌
    const x = p.x + Math.sin(t * 2 + p.phase) * 0.4;
    const y = p.y + Math.cos(t * 1.7 + p.phase) * 0.4;
    paths[p.color].moveTo(x + dotR, y);
    paths[p.color].arc(x, y, dotR, 0, Math.PI * 2);
  }
  ctx.fillStyle = COLORS[0];
  ctx.fill(paths[0]);
  ctx.fillStyle = COLORS[1];
  ctx.fill(paths[1]);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 12,
    id: 'fireflies',
    cat: 'bg',
    name: '반딧불이',
    en: 'Fireflies',
    level: 2,
    trigger: 'auto',
    timing: '무한 루프 · 깜빡임 주기 3~10초',
    desc: '따뜻한 빛을 내는 작은 점들이 부드러운 곡선을 그리며 떠다니고, 제각각 천천히 밝아졌다 어두워집니다. 조용하고 서정적인 밤 분위기를 만듭니다.',
    use: '감성 브랜드 랜딩, 여행·캠핑 서비스, 야간 테마 이벤트 페이지',
    tech: ['HTML5 Canvas', 'requestAnimationFrame'],
    terms: ['반딧불이 파티클 (Firefly Particles)', '랜덤 워크 (Random Walk)', '조향 행동 (Steering Behavior)', '글로우 효과 (Glow Effect)'],
    prompt: '히어로 섹션 배경에 반딧불이 40마리가 천천히 떠다니며 깜빡이는 반딧불이 파티클(Firefly Particles)을 HTML5 Canvas로 만들어줘. 각 반딧불이는 회전 속도에 매 프레임 ±0.003rad의 난수를 더하고 0.98씩 감쇠시키는 랜덤 워크(Random Walk) 조향으로 급하게 꺾이지 않고 부드러운 곡선을 그리며 초당 5~33px로 이동하게 해줘. 밝기는 3~10초 주기 사인파를 0~1로 바꾼 뒤 2.5제곱해서 대부분 은은하다가 가끔 환하게 차오르게 하고, 깊이 값(0.35~1)에 따라 크기·속도·투명도를 달리해 원근감을 줘. 빛은 보조 컬러로 물들인 방사형 그라디언트 스프라이트를 미리 한 장 만들어 drawImage로 찍고, 밝을수록 글로우 지름을 30px에서 80px까지 키운 뒤 가운데에 작은 심지 점을 그려줘. 화면 밖으로 40px 넘게 나간 반딧불이는 반대편에서 다시 나타나게 하고, prefers-reduced-motion이 켜져 있으면 이동은 멈추고 깜빡임만 남겨줘.',
    html: `<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">SUMMER NIGHT</p>
  <h1>작은 빛들이 머무는 밤</h1>
  <p class="sub">조용히 떠다니는 불빛으로 화면에 온기를 더합니다.</p>
</header>`,
    css: `body {
  /* 바닥에서 은은하게 올라오는 따뜻한 빛 */
  background:
    radial-gradient(120% 60% at 50% 115%, color-mix(in srgb, var(--accent-2) 18%, transparent), transparent 70%),
    var(--bg);
}
canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}
.hero {
  position: relative;
  padding: 0 24px;
  text-align: center;
  pointer-events: none;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .28em;
  color: var(--accent-2);
}
.hero h1 {
  margin: 0;
  font-size: clamp(24px, 4.8vw, 46px);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.sub {
  margin: 12px 0 0;
  font-size: clamp(13px, 1.7vw, 16px);
  color: var(--muted);
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const GLOW = getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim() || '#ffc857';
const COUNT = 40;

// 글로우 스프라이트: 흰 방사형 그라디언트를 만든 뒤 보조 컬러로 물들임
const sprite = document.createElement('canvas');
sprite.width = sprite.height = 64;
const sg = sprite.getContext('2d');
const grad = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
grad.addColorStop(0, 'rgba(255,255,255,1)');
grad.addColorStop(0.2, 'rgba(255,255,255,0.55)');
grad.addColorStop(0.5, 'rgba(255,255,255,0.12)');
grad.addColorStop(1, 'rgba(255,255,255,0)');
sg.fillStyle = grad;
sg.fillRect(0, 0, 64, 64);
sg.globalCompositeOperation = 'source-in';
sg.fillStyle = GLOW;
sg.fillRect(0, 0, 64, 64);

const flies = Array.from({ length: COUNT }, () => {
  const z = 0.35 + Math.random() * 0.65; // 깊이: 가까울수록 크고 빠르고 밝게
  return {
    x: 0,
    y: 0,
    z: z,
    angle: Math.random() * Math.PI * 2,
    turn: 0,
    speed: (0.25 + Math.random() * 0.3) * z,
    pulse: 0.6 + Math.random() * 1.5, // 깜빡임 속도 (주기 약 3~10초)
    phase: Math.random() * Math.PI * 2
  };
});

let w = 0, h = 0;
function resize() {
  const pw = w, ph = h;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // 크기가 바뀌면 위치를 비율대로 옮기고, 처음이면 무작위로 흩뿌림
  for (const f of flies) {
    f.x = pw ? (f.x / pw) * w : Math.random() * w;
    f.y = ph ? (f.y / ph) * h : Math.random() * h;
  }
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

let last = 0;
function frame(now) {
  const dt = last ? Math.min(now - last, 50) / 16.7 : 1;
  last = now;
  const t = now / 1000;
  ctx.clearRect(0, 0, w, h);
  for (const f of flies) {
    // 부드러운 무작위 조향: 회전 속도에 작은 난수를 더하고 감쇠 → 급하게 꺾이지 않음
    f.turn = f.turn * 0.98 + (Math.random() - 0.5) * 0.006;
    f.angle += f.turn * dt;
    f.x += Math.cos(f.angle) * f.speed * dt;
    f.y += Math.sin(f.angle) * f.speed * dt;
    // 화면 밖으로 나가면 반대편에서 다시 등장
    if (f.x < -40) f.x = w + 40; else if (f.x > w + 40) f.x = -40;
    if (f.y < -40) f.y = h + 40; else if (f.y > h + 40) f.y = -40;

    // 사인파를 거듭제곱해 대부분 은은하다가 가끔 환하게 차오르는 깜빡임
    const b = Math.pow(0.5 + 0.5 * Math.sin(t * f.pulse + f.phase), 2.5);
    const alpha = (0.15 + 0.85 * b) * (0.4 + 0.6 * f.z);
    const g = (30 + 50 * b) * f.z;
    ctx.globalAlpha = alpha;
    ctx.drawImage(sprite, f.x - g / 2, f.y - g / 2, g, g);
    // 가운데 심지
    ctx.globalAlpha = Math.min(1, alpha + 0.25);
    ctx.fillStyle = GLOW;
    ctx.beginPath();
    ctx.arc(f.x, f.y, 0.8 + 1.4 * f.z, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 13,
    id: 'aurora-blobs',
    cat: 'bg',
    name: '오로라 그라디언트',
    en: 'Aurora Gradient',
    level: 1,
    trigger: 'auto',
    timing: '18~30s · ease-in-out · alternate',
    desc: '크게 흐린 색 덩어리 네 개가 화면 위쪽에서 서로 다른 긴 주기로 떠다니며 섞여 오로라 같은 그라디언트를 만듭니다. CSS만으로 가볍게 깊이감 있는 배경을 줄 수 있습니다.',
    use: 'SaaS 히어로 배경, 로그인·가입 화면, 제품 소개 섹션',
    tech: ['CSS @keyframes', 'CSS filter: blur()', 'CSS transform'],
    terms: ['오로라 그라디언트 (Aurora Gradient)', '메시 그라디언트 (Mesh Gradient)', '블러 블롭 (Blurred Blobs)', '앰비언트 배경 (Ambient Background)'],
    prompt: '히어로 섹션 제목 뒤에 CSS만으로 천천히 흐르는 오로라 그라디언트(Aurora Gradient) 배경을 만들어줘. 화면 긴 변의 56%(최소 320px) 크기 가로로 긴 타원 블롭(aspect-ratio 1.5) 2개와 36~40% 크기 블롭 2개를 브랜드 포인트 컬러, 청록색, 보조 컬러로 칠해 화면 위쪽에 모아 두고, 각각 filter: blur(60px)와 불투명도 0.3~0.5를 줘서 경계 없이 번지게 해줘. 블롭마다 18s, 22s, 26s, 30s처럼 서로 다른 길이의 @keyframes로 translate(최대 화면 폭의 50%)와 scale(0.9~1.2)을 ease-in-out, alternate로 무한 반복시켜, 주기가 엇갈리면서 같은 모양이 반복되지 않는 것처럼 보이게 해줘. 블롭 레이어는 position: fixed, overflow: hidden, pointer-events: none으로 콘텐츠 뒤에 깔고, mask-image: linear-gradient(to bottom, #000 30%, transparent)로 아래쪽이 배경색에 스며들게 해줘. 애니메이션은 transform만 바꾸고 will-change: transform을 줘서 레이아웃 재계산을 피하고, prefers-reduced-motion이 켜져 있으면 애니메이션을 멈춘 정지 그라디언트로 보여줘.',
    html: `<div class="aurora" aria-hidden="true">
  <span class="blob b1"></span>
  <span class="blob b2"></span>
  <span class="blob b3"></span>
  <span class="blob b4"></span>
</div>
<header class="hero">
  <p class="eyebrow">AURORA</p>
  <h1>빛이 번지는<br>새로운 시작</h1>
  <p class="sub">천천히 흐르는 색이 첫 화면에 깊이를 더합니다.</p>
</header>`,
    css: `.aurora {
  --c3: #2ec5b6; /* 세 번째 색: 오로라 청록 */
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  /* 아래로 갈수록 배경색에 스며들게 */
  -webkit-mask-image: linear-gradient(to bottom, #000 30%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 30%, transparent 100%);
}
/* 크게 흐린 타원을 긴 주기로 서로 엇갈리게 움직임 */
.blob {
  position: absolute;
  width: max(56vmax, 320px);
  aspect-ratio: 1.5;
  border-radius: 50%;
  filter: blur(60px);
  opacity: .5;
  will-change: transform;
  animation: 22s ease-in-out infinite alternate;
}
.b1 { top: -30%; left: -18%; background: var(--accent); animation-name: drift-1; }
.b2 { top: -22%; right: -22%; background: var(--c3); opacity: .42; animation-name: drift-2; animation-duration: 26s; }
.b3 { top: 6%; left: 30%; width: max(40vmax, 240px); background: var(--accent-2); opacity: .3; animation-name: drift-3; animation-duration: 18s; }
.b4 { top: 16%; left: -12%; width: max(36vmax, 220px); background: var(--c3); opacity: .3; animation-name: drift-4; animation-duration: 30s; }
@keyframes drift-1 { 50% { transform: translate(20vw, 8vh) scale(1.1); } 100% { transform: translate(36vw, -4vh) scale(.95); } }
@keyframes drift-2 { 50% { transform: translate(-24vw, 10vh) scale(1.15); } 100% { transform: translate(-40vw, 2vh) scale(.9); } }
@keyframes drift-3 { 50% { transform: translate(-22vw, 12vh) scale(1.2); } 100% { transform: translate(14vw, -6vh) scale(.9); } }
@keyframes drift-4 { 50% { transform: translate(26vw, -8vh) scale(1.1); } 100% { transform: translate(50vw, 6vh) scale(1); } }
.hero {
  position: relative;
  padding: 0 24px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 12px;
  font-size: 12px;
  letter-spacing: .32em;
  opacity: .7;
}
.hero h1 {
  margin: 0;
  font-size: clamp(28px, 6vw, 60px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
}
.sub {
  margin: 16px 0 0;
  font-size: clamp(13px, 1.8vw, 17px);
  opacity: .72;
}`,
    js: ''
  },
  {
    no: 14,
    id: 'gooey-metaballs',
    cat: 'bg',
    name: '메타볼 (구이 효과)',
    en: 'Gooey Metaballs',
    level: 2,
    trigger: 'auto',
    timing: '무한 루프 · blur 12 · 알파 ×24 −10',
    desc: '흐림과 알파 대비 필터를 겹쳐, 가까워진 원끼리 액체처럼 녹아 붙었다가 늘어나며 떨어지게 만드는 효과입니다. 말랑하고 유기적인 느낌을 줍니다.',
    use: '히어로 일러스트, 로딩 화면, 브랜드 그래픽 요소',
    tech: ['SVG filter', 'feGaussianBlur', 'feColorMatrix', 'requestAnimationFrame'],
    terms: ['메타볼 (Metaballs)', '구이 효과 (Gooey Effect)', 'SVG 필터 (SVG Filter)', '알파 임계값 (Alpha Threshold)'],
    prompt: 'SVG 필터로 원들이 액체처럼 붙었다 떨어지는 메타볼(Metaballs) 구이 효과(Gooey Effect)를 히어로 중앙 그래픽으로 만들어줘. 원들을 담은 <g>에 feGaussianBlur(stdDeviation 12)로 흐림을 준 뒤 feColorMatrix의 알파 행을 "0 0 0 24 -10"으로 둬서 알파 대비를 크게 올리는 알파 임계값(Alpha Threshold) 처리를 하면, 가까운 원끼리 경계가 녹아 하나로 이어지게 돼. 가운데에 반지름 60px(±6px로 숨 쉬듯 변화) 원 하나와 반지름 22~38px 원 6개를 두고, requestAnimationFrame에서 각 원이 서로 다른 속도(0.4~1.0rad/s)와 방향으로 공전하면서(세로는 0.62배로 눌러 타원 궤도) 궤도 반지름이 사인파로 45~195px 사이를 오가게 해서 중심에 합쳐졌다 늘어나며 떨어져 나가길 반복하게 해줘. 채우기는 userSpaceOnUse 선형 그라디언트(브랜드 포인트 컬러 → 핑크 → 보조 컬러)를 그룹에 걸어 위치에 따라 색이 자연스럽게 섞이게 해줘. 필터에 color-interpolation-filters="sRGB"를 지정해 색이 탁해지지 않게 하고, 필터 영역을 viewBox 전체로 고정해 원이 가장자리에서 잘리지 않게 해줘.',
    html: `<figure class="stage">
  <svg class="goo" viewBox="0 0 600 400" aria-hidden="true">
    <defs>
      <linearGradient id="goo-fill" gradientUnits="userSpaceOnUse" x1="200" y1="110" x2="400" y2="290">
        <stop class="s1" offset="0"/>
        <stop class="s2" offset=".5"/>
        <stop class="s3" offset="1"/>
      </linearGradient>
      <!-- 흐림 후 알파 대비를 올리면 가까운 원들의 경계가 녹아 하나로 붙음 -->
      <filter id="goo" filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="400" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"/>
      </filter>
    </defs>
    <g filter="url(#goo)" fill="url(#goo-fill)">
      <circle class="blob" cx="300" cy="200" r="60"/>
      <circle class="blob" cx="300" cy="200" r="38"/>
      <circle class="blob" cx="300" cy="200" r="30"/>
      <circle class="blob" cx="300" cy="200" r="34"/>
      <circle class="blob" cx="300" cy="200" r="24"/>
      <circle class="blob" cx="300" cy="200" r="28"/>
      <circle class="blob" cx="300" cy="200" r="22"/>
    </g>
  </svg>
  <figcaption>
    <p class="eyebrow">GOOEY METABALLS</p>
    <h1>녹아들 듯 이어지는 형태</h1>
  </figcaption>
</figure>`,
    css: `.stage {
  margin: 0;
  padding: 16px;
  display: grid;
  justify-items: center;
  gap: clamp(4px, 2vh, 16px);
}
.goo {
  display: block;
  width: min(92vw, 600px);
  height: min(62vh, 400px);
}
.s1 { stop-color: var(--accent); }
.s2 { stop-color: #ec5f9d; } /* 두 브랜드 컬러 사이를 선명하게 잇는 핑크 */
.s3 { stop-color: var(--accent-2); }
figcaption {
  text-align: center;
}
.eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: .28em;
  color: var(--muted);
}
figcaption h1 {
  margin: 0;
  font-size: clamp(18px, 3.2vw, 30px);
  font-weight: 700;
  letter-spacing: -0.02em;
}`,
    js: `const blobs = document.querySelectorAll('.blob');
const CX = 300, CY = 200;
// 원마다 [궤도 반지름, 반지름 진폭, 공전 속도(rad/s), 진폭 속도, 위상]
const orbits = [
  [14, 8, 0.5, 0.7, 0],
  [110, 60, 0.62, 0.8, 0],
  [120, 70, -0.48, 1.1, 1.2],
  [100, 55, 0.85, 0.6, 2.4],
  [135, 60, -0.7, 1.3, 3.6],
  [115, 65, 0.4, 0.95, 4.8],
  [140, 45, 1.0, 0.7, 5.6]
];

function frame(now) {
  const t = now / 1000;
  blobs.forEach((el, i) => {
    const [base, amp, speed, pulse, phase] = orbits[i];
    // 궤도 반지름이 사인파로 커졌다 작아지며 가운데 원과 합쳐졌다 떨어짐
    const r = base + Math.sin(t * pulse + phase) * amp;
    const a = t * speed + phase;
    el.setAttribute('cx', (CX + Math.cos(a) * r).toFixed(1));
    el.setAttribute('cy', (CY + Math.sin(a) * r * 0.62).toFixed(1));
  });
  // 가운데 원은 숨 쉬듯 크기만 살짝 변화
  blobs[0].setAttribute('r', (60 + Math.sin(t * 1.4) * 6).toFixed(1));
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 15,
    id: 'film-grain',
    cat: 'bg',
    name: '필름 그레인',
    en: 'Film Grain',
    level: 2,
    trigger: 'auto',
    timing: '12fps 노이즈 · 불투명도 0.35 · overlay',
    desc: '무작위 노이즈를 초당 12번 새로 그려 화면 위에 얇게 겹쳐 필름 입자처럼 보이게 합니다. 매끈한 디지털 화면에 영화 같은 아날로그 질감을 더합니다.',
    use: '영화·영상 포트폴리오, 매거진 히어로, 음반·패션 브랜드 페이지',
    tech: ['HTML5 Canvas', 'ImageData', 'mix-blend-mode', 'requestAnimationFrame'],
    terms: ['필름 그레인 (Film Grain)', '노이즈 텍스처 (Noise Texture)', '블렌드 모드 (Blend Mode)', '비네팅 (Vignetting)'],
    prompt: '그라디언트 배경의 히어로 섹션 위에 아날로그 필름 질감을 주는 필름 그레인(Film Grain) 오버레이를 만들어줘. 화면 절반 해상도(CSS 2px당 노이즈 1px)의 작은 캔버스를 position: fixed로 화면 전체에 늘려 깔고, requestAnimationFrame 루프에서 83ms마다(약 12fps) ImageData의 모든 픽셀을 무작위 밝기의 불투명 회색으로 다시 채워 putImageData 해줘. 픽셀 쓰기는 ImageData 버퍼를 Uint32Array로 감싸 한 픽셀을 한 번에 기록해서 빠르게 처리해줘. 캔버스에는 pointer-events: none, opacity 0.35, mix-blend-mode: overlay를 줘서 아래 색과 제목 위에 입자만 얹히게 해줘. 배경은 브랜드 포인트 컬러와 보조 컬러의 방사형 그라디언트로 깔고, 가장자리를 어둡게 누르는 비네팅(Vignetting)도 함께 넣어줘. 창 크기가 바뀌면 캔버스와 ImageData를 다시 만들고, 탭이 숨겨지면 노이즈 생성이 멈추도록 setInterval이 아닌 requestAnimationFrame으로 시간을 재줘.',
    html: `<section class="hero">
  <p class="eyebrow">FILM GRAIN · 35MM</p>
  <h1>기억 속 한 장면처럼</h1>
  <p class="sub">매끈한 화면 위에 필름의 온기를 한 겹 입혀 보세요.</p>
  <button class="btn" type="button">예고편 보기</button>
</section>
<canvas id="grain" aria-hidden="true"></canvas>`,
    css: `body {
  background:
    radial-gradient(80% 100% at 10% 0%, color-mix(in srgb, var(--accent) 60%, transparent), transparent 70%),
    radial-gradient(70% 90% at 100% 100%, color-mix(in srgb, var(--accent-2) 50%, transparent), transparent 70%),
    var(--bg);
}
/* 가장자리를 어둡게 눌러 주는 비네팅 */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, .45) 140%);
  pointer-events: none;
}
/* 노이즈 캔버스: 작게 그려 화면 크기로 늘리고 블렌드 모드로 얹음 */
#grain {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: .35;
  mix-blend-mode: overlay;
}
.hero {
  position: relative;
  padding: 0 24px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 12px;
  font-size: 12px;
  letter-spacing: .3em;
  opacity: .75;
}
.hero h1 {
  margin: 0;
  font-size: clamp(30px, 6.4vw, 66px);
  font-weight: 800;
  letter-spacing: -0.03em;
}
.sub {
  margin: 12px 0 0;
  font-size: clamp(13px, 1.8vw, 17px);
  opacity: .78;
}
.btn {
  margin-top: 24px;
  padding: 12px 24px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--fg);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}`,
    js: `const canvas = document.getElementById('grain');
const ctx = canvas.getContext('2d');
const GRAIN = 2; // 노이즈 1픽셀 = CSS 2px (작게 그려서 늘려 씀)
const FPS = 12;  // 필름처럼 살짝 끊기는 초당 12장
let image = null, pixels = null;

function resize() {
  canvas.width = Math.max(1, Math.ceil(canvas.clientWidth / GRAIN));
  canvas.height = Math.max(1, Math.ceil(canvas.clientHeight / GRAIN));
  image = ctx.createImageData(canvas.width, canvas.height);
  pixels = new Uint32Array(image.data.buffer); // RGBA 4바이트를 한 번에 기록
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

function drawNoise() {
  for (let i = 0; i < pixels.length; i++) {
    const v = (Math.random() * 256) | 0;
    pixels[i] = 0xff000000 | (v << 16) | (v << 8) | v; // 불투명 회색 픽셀
  }
  ctx.putImageData(image, 0, 0);
}

let last = -Infinity;
function frame(now) {
  // 매 프레임이 아니라 83ms마다 새 노이즈를 그림
  if (pixels && now - last >= 1000 / FPS) {
    last = now;
    drawNoise();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 16,
    id: 'dot-grid-ripple',
    cat: 'bg',
    name: '도트 그리드 리플',
    en: 'Dot Grid Ripple',
    level: 2,
    trigger: 'click',
    timing: '링 속도 화면 45%/s · 수명 2.4s',
    desc: '촘촘한 점 격자 위로 클릭한 지점에서 원형 파동이 퍼지며, 링이 지나가는 점들이 잠깐 커지고 밝아집니다. 여러 파동이 겹치면 겹친 부분이 더 밝게 빛납니다.',
    use: '인터랙티브 히어로 배경, 클릭 피드백, 이벤트·론칭 페이지',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'Path2D', 'Pointer Events'],
    terms: ['리플 효과 (Ripple Effect)', '도트 그리드 (Dot Grid)', '파동 전파 (Wave Propagation)', '가우시안 감쇠 (Gaussian Falloff)'],
    prompt: 'HTML5 Canvas로 히어로 배경 전체에 14~18px 간격의 촘촘한 도트 그리드(Dot Grid)를 깔고, 클릭한 지점에서 원형 파동이 퍼져 나가는 리플 효과(Ripple Effect)를 만들어줘. 리플은 초당 화면 긴 변의 45%(1000px 화면에서 450px/s)만큼 반지름이 커지고 2.4초 동안 선형으로 약해지며, 각 점은 링까지의 거리 차에 가우시안 감쇠(Gaussian Falloff, exp(-(차이/28px)²))를 적용한 세기만큼 반지름이 1.1px에서 최대 4.7px까지 커지고 회색에서 브랜드 포인트 컬러로 밝아지게 해줘(리플마다 보조 컬러와 번갈아 사용). 링이 지나갈 때 점을 리플 중심 반대 방향으로 세기 × 6px만큼 밀어 물결이 번지는 느낌을 주고, 여러 리플이 동시에 있으면 세기를 더해 겹친 부분이 더 크고 밝게 보이게 해줘. 활성 점은 색과 밝기 5단계별로 Path2D에 모아 한 번에 fill해서 점이 2,000개가 넘어도 60fps를 유지해줘. 리플은 최대 8개까지만 유지하고, 터치에서도 바로 반응하도록 click 대신 pointerdown으로 받아줘.',
    html: `<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">RIPPLE GRID</p>
  <h1>한 번의 터치가<br>퍼져 나가는 순간</h1>
</header>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  touch-action: manipulation;
}
.hero {
  position: fixed;
  left: clamp(20px, 5vw, 56px);
  bottom: clamp(20px, 8vh, 52px);
  pointer-events: none;
}
.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: .24em;
  color: var(--accent);
}
.hero h1 {
  margin: 0;
  font-size: clamp(22px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const MUTED = css.getPropertyValue('--muted').trim() || '#8a91a3';
const COLORS = [
  css.getPropertyValue('--accent').trim() || '#7c8cff',
  css.getPropertyValue('--accent-2').trim() || '#ffc857'
];
const BAND = 28;    // 링 두께 (가우시안 폭, px)
const LIFE = 2400;  // 리플 수명(ms)
const LEVELS = 5;   // 밝기 단계: 같은 단계끼리 모아 한 번에 그림

let w = 0, h = 0, speed = 0.45, dots = [];
const ripples = [];
let rippleCount = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  speed = Math.max(w, h) * 0.00045; // 화면 크기와 상관없이 약 2초 만에 가로지르게 (px/ms)
  const gap = Math.max(14, Math.min(18, w / 60));
  const cols = Math.floor(w / gap), rows = Math.floor(h / gap);
  const ox = (w - (cols - 1) * gap) / 2, oy = (h - (rows - 1) * gap) / 2;
  dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) dots.push({ x: ox + c * gap, y: oy + r * gap });
  }
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

function addRipple(x, y) {
  ripples.push({ x: x, y: y, start: performance.now(), color: rippleCount++ % 2 });
  if (ripples.length > 8) ripples.shift();
}

function frame(now) {
  while (ripples.length && now - ripples[0].start > LIFE) ripples.shift();
  ctx.clearRect(0, 0, w, h);
  const base = new Path2D();
  const lit = Array.from({ length: COLORS.length * LEVELS }, () => new Path2D());

  for (const d of dots) {
    let amp = 0, ox = 0, oy = 0, color = 0, best = 0;
    for (const rp of ripples) {
      const age = Math.max(0, now - rp.start);
      const dx = d.x - rp.x, dy = d.y - rp.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const k = (dist - age * speed) / BAND;
      if (k > 2.5 || k < -2.5) continue;
      // 가우시안 링: 링 한가운데서 1, 벗어날수록 0 · 시간이 갈수록 약해짐
      const e = Math.exp(-k * k) * (1 - age / LIFE);
      amp += e;
      ox += (dx / dist) * e;
      oy += (dy / dist) * e;
      if (e > best) { best = e; color = rp.color; }
    }
    if (amp < 0.04) {
      base.moveTo(d.x + 1.1, d.y);
      base.arc(d.x, d.y, 1.1, 0, Math.PI * 2);
      continue;
    }
    // 링이 지나가는 점: 바깥으로 살짝 밀리고, 커지고, 밝아짐 (겹치면 세기 합산)
    const x = d.x + ox * 6, y = d.y + oy * 6;
    const size = 1.1 + Math.min(amp, 1.5) * 2.4;
    const level = Math.min(LEVELS - 1, Math.floor(amp * LEVELS));
    const path = lit[color * LEVELS + level];
    path.moveTo(x + size, y);
    path.arc(x, y, size, 0, Math.PI * 2);
  }

  ctx.globalAlpha = 0.4;
  ctx.fillStyle = MUTED;
  ctx.fill(base);
  lit.forEach((path, i) => {
    ctx.globalAlpha = 0.35 + 0.65 * ((i % LEVELS) + 1) / LEVELS;
    ctx.fillStyle = COLORS[Math.floor(i / LEVELS)];
    ctx.fill(path);
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoTimer = setTimeout(autoRipple, 600);
function autoRipple() {
  addRipple(w * (0.15 + Math.random() * 0.7), h * (0.2 + Math.random() * 0.6));
  autoTimer = setTimeout(autoRipple, 2500 + Math.random() * 1000);
}

addEventListener('pointerdown', (e) => {
  addRipple(e.clientX, e.clientY);
  clearTimeout(autoTimer);
  autoTimer = setTimeout(autoRipple, 6000); // 한동안 클릭이 없으면 자동 시연 재개
});`
  }
);
