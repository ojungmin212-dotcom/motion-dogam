window.MOTIONS = window.MOTIONS || [];
window.MOTIONS.push(
  {
    no: 1,
    id: 'particle-wave',
    cat: 'bg',
    name: '파티클 웨이브',
    en: 'Particle Wave',
    level: 3,
    trigger: 'auto',
    timing: '무한 루프 · 60fps · 사인파 3중첩',
    desc: '수천 개의 점을 바닥 격자처럼 깔고 여러 사인파를 겹쳐 파도처럼 울렁이게 만드는 배경입니다. 점마다 따로 깜빡이는 트윙클과 마루의 은은한 글로우가 더해집니다.',
    use: '히어로 섹션 배경, 테크·AI 서비스 랜딩, 인트로 화면',
    tech: ['HTML5 Canvas', 'requestAnimationFrame'],
    terms: ['파티클 시스템 (Particle System)', '사인파 변위 (Sine Wave Displacement)', '원근 투영 (Perspective Projection)', '트윙클 효과 (Twinkle Effect)', '글로우 효과 (Glow Effect)'],
    prompt: 'HTML5 Canvas로 히어로 섹션 전체를 채우는 파티클 웨이브(Particle Wave) 배경을 만들어줘. 점을 가로 200개 × 세로 56줄의 바닥 격자로 깔고, 원근 투영(Perspective Projection)으로 멀리 있는 줄일수록 점이 작고 촘촘하고 흐리게 보이게 해줘. 방향과 속도가 다른 사인파 3개를 겹쳐 점의 높이를 매 프레임 바꾸고(requestAnimationFrame), 점마다 무작위 속도·위상으로 깜빡이는 트윙클 효과(Twinkle Effect)를 줘. 물결 마루에 올라온 밝은 점에는 보조 컬러로 글로우를 살짝 넣어줘. 선택 사항으로 스크롤 위치를 물결 위상에 더해 스크롤할 때 물결이 함께 흐르게 하고, devicePixelRatio와 창 크기 변경에 대응해줘.',
    html: `<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">PARTICLE WAVE</p>
  <h1>점들이 파도처럼 흐르는 배경</h1>
</header>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}
.hero {
  position: fixed;
  top: 12%;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0 20px;
}
.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: .24em;
  color: var(--accent);
}
.hero h1 {
  margin: 0;
  font-size: clamp(20px, 4.2vw, 40px);
  font-weight: 700;
  letter-spacing: -0.02em;
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const ACCENT = css.getPropertyValue('--accent').trim() || '#7c8cff';
const GLOW = css.getPropertyValue('--accent-2').trim() || '#ffc857';

const COLS = 200, ROWS = 56, SPREAD = 20;
// 점마다 트윙클 속도와 위상을 무작위로 정해 둠
const seeds = Array.from({ length: COLS * ROWS }, () => ({
  speed: 0.6 + Math.random() * 2.4,
  phase: Math.random() * Math.PI * 2
}));

// 글로우 스프라이트: 흰 원형 그라디언트를 만든 뒤 보조 컬러로 물들임
const sprite = document.createElement('canvas');
sprite.width = sprite.height = 32;
const sg = sprite.getContext('2d');
const grad = sg.createRadialGradient(16, 16, 0, 16, 16, 16);
grad.addColorStop(0, 'rgba(255,255,255,1)');
grad.addColorStop(1, 'rgba(255,255,255,0)');
sg.fillStyle = grad;
sg.fillRect(0, 0, 32, 32);
sg.globalCompositeOperation = 'source-in';
sg.fillStyle = GLOW;
sg.fillRect(0, 0, 32, 32);

let w = 0, h = 0;
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

function frame(now) {
  const t = now / 1000;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = ACCENT;
  const f = Math.max(w, h * 1.3) * 0.42;  // 초점 거리
  const horizon = h * 0.34;                // 소실점 높이
  const Z0 = 1.6;                          // 가장 가까운 줄의 깊이
  const camH = (h - horizon) * 0.95 * Z0 / f; // 가장 가까운 줄이 화면 아래에 닿도록

  // 먼 줄부터 그려야 가까운 점이 위에 덮임
  for (let r = ROWS - 1; r >= 0; r--) {
    const z = Z0 + r * 0.12;
    const fog = 1 - (r / ROWS) * 0.85;
    for (let c = 0; c < COLS; c++) {
      const x = (c / (COLS - 1) - 0.5) * SPREAD;
      const sx = w / 2 + (x * f) / z;       // 원근 투영: 멀수록 중앙으로 모임
      if (sx < -10 || sx > w + 10) continue;

      // 방향과 속도가 다른 사인파 3개를 겹쳐 높이를 만듦
      const y = Math.sin(x * 0.8 + t * 1.2) * 0.12
              + Math.sin(z * 1.4 - t * 1.7) * 0.1
              + Math.sin((x + z) * 0.5 + t * 0.6) * 0.08;
      const sy = horizon + ((camH - y) * f) / z;

      const s = seeds[r * COLS + c];
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
      const lift = (y + 0.3) / 0.6;        // 0(골) ~ 1(마루)
      const size = Math.max(0.7, 3.4 / z);

      ctx.globalAlpha = fog * (0.4 + 0.6 * lift) * (0.45 + 0.55 * twinkle);
      ctx.fillRect(sx - size / 2, sy - size / 2, size, size);

      // 마루에서 밝게 반짝이는 점에만 글로우
      if (lift * twinkle > 0.78 && r < ROWS * 0.7) {
        const g = size * 7;
        ctx.globalAlpha = fog * 0.35 * twinkle;
        ctx.drawImage(sprite, sx - g / 2, sy - g / 2, g, g);
      }
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 2,
    id: 'particle-network',
    cat: 'bg',
    name: '파티클 네트워크',
    en: 'Particle Network (Constellation)',
    level: 2,
    trigger: 'mouse',
    timing: '무한 루프 · 60fps · 연결 거리 120px',
    desc: '천천히 떠다니는 점들이 가까워지면 선으로 이어져 별자리처럼 보이는 배경입니다. 포인터가 하나의 노드가 되어 주변 점을 끌어당기며 연결선을 만듭니다.',
    use: 'SaaS·AI 랜딩 히어로 배경, 네트워크·데이터 서비스 소개',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'Pointer Events'],
    terms: ['파티클 네트워크 (Particle Network)', '플렉서스 효과 (Plexus Effect)', '근접 연결 (Proximity Connection)', '인력 (Attraction)', '선형 보간 (Lerp)'],
    prompt: 'HTML5 Canvas로 히어로 섹션 배경에 파티클 네트워크(Particle Network, Constellation) 효과를 만들어줘. 화면 넓이에 비례해 30~120개의 점을 초당 12px 이하의 느린 속도로 떠다니게 하고, 화면 가장자리에 닿으면 튕겨 나오게 해줘. 두 점 사이 거리가 120px보다 가까우면 브랜드 포인트 컬러로 1px 선을 잇고, 선의 불투명도는 (1 - 거리/120) × 0.5로 거리가 가까울수록 진하게 해줘. 포인터도 하나의 노드로 취급해서 반경 180px 안의 점들과 보조 컬러 선으로 연결하고, 그 점들을 포인터 쪽으로 최대 30%까지 끌어당기는 인력(Attraction)을 lerp 0.12로 부드럽게 적용해줘. 포인터 좌표는 pointermove로 받아 lerp 0.15로 따라가게 하고, 거리 비교는 제곱 거리로 먼저 걸러 sqrt 호출을 줄여줘. 창 크기와 devicePixelRatio(최대 2)가 바뀌면 캔버스 크기와 점 개수를 다시 계산하고, 포인터가 없는 터치 기기에서는 점과 연결선만 떠다니게 해줘.',
    html: `<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">KNOWLEDGE GRAPH</p>
  <h1>흩어진 지식을 하나로 잇다</h1>
  <p class="sub">팀의 문서와 대화를 연결된 그래프로 정리하세요</p>
</header>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
}
.hero {
  position: relative;
  text-align: center;
  padding: 0 24px;
  pointer-events: none;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .24em;
  color: var(--accent);
}
.hero h1 {
  margin: 0;
  font-size: clamp(22px, 4.4vw, 42px);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-shadow: 0 0 24px var(--bg), 0 0 8px var(--bg);
}
.sub {
  margin: 12px 0 0;
  font-size: clamp(13px, 1.6vw, 16px);
  color: var(--muted);
  text-shadow: 0 0 12px var(--bg);
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const ACCENT = css.getPropertyValue('--accent').trim() || '#7c8cff';
const ACCENT2 = css.getPropertyValue('--accent-2').trim() || '#ffc857';

const LINK = 120;   // 점끼리 선이 이어지는 최대 거리(px)
const REACH = 180;  // 포인터가 점을 끌어당기는 반경(px)
let w = 0, h = 0, dots = [];
// 포인터도 하나의 노드: 목표 좌표를 lerp로 부드럽게 따라감
const target = { x: 0, y: 0 }, pointer = { x: 0, y: 0 };
let lastMove = -Infinity;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // 화면 넓이에 비례해 점 개수를 정함 (30~120개)
  const count = Math.max(30, Math.min(120, Math.round((w * h) / 5000)));
  // bx, by: 떠다니는 기본 위치 / x, y: 포인터 인력이 반영된 실제 위치
  dots = Array.from({ length: count }, () => {
    const x = Math.random() * w, y = Math.random() * h;
    const vx = (Math.random() - 0.5) * 24, vy = (Math.random() - 0.5) * 24;
    return { bx: x, by: y, x, y, vx, vy, r: 1 + Math.random() * 1.5 };
  });
  // 포인터가 아직 움직인 적 없으면 화면 가운데에서 시작
  if (lastMove === -Infinity) {
    target.x = pointer.x = w / 2;
    target.y = pointer.y = h / 2;
  }
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

addEventListener('pointermove', (e) => {
  target.x = e.clientX;
  target.y = e.clientY;
  lastMove = performance.now();
});

function line(x1, y1, x2, y2, alpha) {
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

let last = 0;
function frame(now) {
  const t = now / 1000;
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;

  // 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
  if (now - lastMove > 2500) {
    target.x = w / 2 + Math.sin(t * 0.9) * w * 0.36;
    target.y = h / 2 + Math.sin(t * 1.3) * h * 0.32;
  }
  pointer.x += (target.x - pointer.x) * 0.15;
  pointer.y += (target.y - pointer.y) * 0.15;

  for (const d of dots) {
    d.bx += d.vx * dt;
    d.by += d.vy * dt;
    if (d.bx < 0 || d.bx > w) d.vx = Math.abs(d.vx) * (d.bx < 0 ? 1 : -1);  // 가장자리에서 튕김
    if (d.by < 0 || d.by > h) d.vy = Math.abs(d.vy) * (d.by < 0 ? 1 : -1);
    // 포인터 반경 안의 점은 포인터 쪽으로 최대 30%까지 끌려감
    const dx = pointer.x - d.bx, dy = pointer.y - d.by;
    const dist = Math.hypot(dx, dy);
    const pull = dist < REACH ? (1 - dist / REACH) * 0.3 : 0;
    d.x += (d.bx + dx * pull - d.x) * 0.12;
    d.y += (d.by + dy * pull - d.y) * 0.12;
  }

  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 1;
  // 점끼리 연결: 제곱 거리로 먼저 거르고, 가까울수록 진하게
  ctx.strokeStyle = ACCENT;
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const a = dots[i], b = dots[j];
      const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (d2 < LINK * LINK) line(a.x, a.y, b.x, b.y, (1 - Math.sqrt(d2) / LINK) * 0.5);
    }
  }
  // 포인터 노드와 주변 점 연결
  ctx.strokeStyle = ACCENT2;
  for (const d of dots) {
    const dist = Math.hypot(pointer.x - d.x, pointer.y - d.y);
    if (dist < REACH) line(pointer.x, pointer.y, d.x, d.y, (1 - dist / REACH) * 0.8);
  }
  // 점과 포인터 노드 그리기
  ctx.fillStyle = ACCENT;
  ctx.globalAlpha = 0.9;
  for (const d of dots) {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = ACCENT2;
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(pointer.x, pointer.y, 3, 0, Math.PI * 2);
  ctx.fill();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 3,
    id: 'starfield-warp',
    cat: 'bg',
    name: '스타필드 워프',
    en: 'Starfield Warp',
    level: 2,
    trigger: 'auto',
    timing: '무한 루프 · 속도 펄스 약 12.6s 주기',
    desc: '별들이 화면 중앙에서 관찰자 쪽으로 쏟아지며 빛줄기로 늘어나는 우주 배경입니다. 속도가 천천히 오르내려 순항과 워프 점프를 오가는 느낌을 줍니다.',
    use: '우주·게임 인트로, 런칭 카운트다운, 페이지 전환 로딩 화면',
    tech: ['HTML5 Canvas', 'requestAnimationFrame'],
    terms: ['스타필드 (Starfield)', '원근 투영 (Perspective Projection)', '모션 스트릭 (Motion Streak)', '워프 효과 (Warp Effect)'],
    prompt: 'HTML5 Canvas로 화면 중앙에서 별이 관찰자 쪽으로 날아오는 스타필드 워프(Starfield Warp) 배경을 만들어줘. 별 500개에 평면 좌표 x, y(-1~1)와 깊이 z(0~1)를 주고, 매 프레임 z를 속도만큼 줄인 뒤 x/z, y/z로 원근 투영(Perspective Projection)해서 가까울수록 바깥으로 빨리 퍼지고 굵고 밝아지게 해줘. 각 별은 조금 더 먼 깊이(z + 속도 × 0.08)의 투영 위치에서 현재 위치까지 선으로 그려 속도가 빠를수록 빛줄기 꼬리(Motion Streak)가 길어지게 하고, 별의 15%는 브랜드 포인트 컬러로 물들여줘. 속도는 (0.5 - 0.5·cos(t × 0.5))³ 곡선으로 초당 0.12(순항)와 1.22(워프) 사이를 약 12.6초 주기로 부드럽게 펄스시키고, 워프가 빨라질수록 중앙에 브랜드 포인트 컬러의 방사형 글로우를 최대 25% 불투명도로 겹쳐줘. 화면을 벗어나거나 z가 0.03보다 작아진 별은 z = 1에서 새 좌표로 다시 생성하고, 멀리 있는 별은 불투명도 0에서 서서히 나타나게 해줘. 탭이 숨겨졌다 돌아올 때 별이 한꺼번에 튀지 않도록 프레임 간격(dt)을 최대 50ms로 제한해줘.',
    html: `<div class="glow"></div>
<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">HYPERDRIVE</p>
  <h1>다음 은하로 출발합니다</h1>
</header>`,
    css: `.glow,
canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}
.glow {
  background: radial-gradient(circle at center, var(--accent), transparent 60%);
  opacity: 0;
}
.hero {
  position: relative;
  text-align: center;
  padding: 0 24px;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .3em;
  color: var(--accent);
}
.hero h1 {
  margin: 0;
  font-size: clamp(22px, 4.6vw, 44px);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-shadow: 0 0 20px var(--bg), 0 0 6px var(--bg);
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const glow = document.querySelector('.glow');
const css = getComputedStyle(document.documentElement);
const FG = css.getPropertyValue('--fg').trim() || '#eef0f6';
const ACCENT = css.getPropertyValue('--accent').trim() || '#7c8cff';

// 별: x, y는 -1~1 평면 좌표, z는 깊이 (1 = 가장 멀리, 0 = 눈앞)
function spawn(star, z) {
  star.x = Math.random() * 2 - 1;
  star.y = Math.random() * 2 - 1;
  star.z = z;
  star.tint = Math.random() < 0.15;  // 15%는 포인트 컬러
  return star;
}
const stars = Array.from({ length: 500 }, () => spawn({}, Math.random()));

let w = 0, h = 0;
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

let last = 0;
function frame(now) {
  const t = now / 1000;
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;

  // 속도 펄스: 순항(0.12)과 워프(1.22)를 약 12.6초 주기로 오감
  const warp = Math.pow(0.5 - 0.5 * Math.cos(t * 0.5), 3);
  const speed = 0.12 + warp * 1.1;
  glow.style.opacity = (warp * 0.25).toFixed(3);

  const cx = w / 2, cy = h / 2;
  const f = Math.max(w, h) * 0.2;  // 투영 배율
  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = 'round';

  for (const s of stars) {
    s.z -= speed * dt;
    if (s.z < 0.03) spawn(s, 1);
    // 원근 투영: 깊이로 나눠 가까울수록 중앙에서 멀어짐
    const x = cx + (s.x / s.z) * f;
    const y = cy + (s.y / s.z) * f;
    if (x < -50 || x > w + 50 || y < -50 || y > h + 50) {
      spawn(s, 1);
      continue;
    }
    // 꼬리: 조금 더 먼 깊이의 위치까지 선을 그림 → 빠를수록 길어짐
    const tz = s.z + speed * 0.08;
    const tx = cx + (s.x / tz) * f;
    const ty = cy + (s.y / tz) * f;

    const near = 1 - s.z;
    ctx.globalAlpha = Math.min(1, near * near * 1.6);  // 멀리서는 서서히 나타남
    ctx.lineWidth = 0.5 + near * 2.2;
    ctx.strokeStyle = s.tint ? ACCENT : FG;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 4,
    id: 'twinkle-stars',
    cat: 'bg',
    name: '트윙클 별하늘',
    en: 'Twinkling Starry Sky',
    level: 2,
    trigger: 'auto',
    timing: '무한 루프 · 별똥별 2.5~6s 간격',
    desc: '크기가 다른 별 250개가 저마다의 속도로 반짝이는 고요한 밤하늘입니다. 몇 초에 한 번씩 별똥별이 대각선으로 스쳐 지나갑니다.',
    use: '히어로 배경, 감성 브랜딩·캠페인 페이지, 다크 모드 랜딩',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'createLinearGradient'],
    terms: ['트윙클 효과 (Twinkle Effect)', '별똥별 (Shooting Star)', '위상 오프셋 (Phase Offset)', '선형 그라디언트 (Linear Gradient)'],
    prompt: 'HTML5 Canvas로 히어로 배경 전체에 별 250개가 반짝이는 밤하늘을 만들어줘. 별 위치는 화면 대비 0~1 비율로 저장해 창 크기가 바뀌어도 배치가 그대로 유지되게 하고, 반지름은 대부분 0.4~1.5px로 작게 두되 8%만 1.4~2.6px의 큰 별로 섞어줘. 별마다 초당 0.5~3 라디안의 무작위 속도와 위상 오프셋(Phase Offset)을 가진 사인파로 트윙클 효과(Twinkle Effect)를 줘서 불투명도가 0.25~1 사이를 오가게 하고, 큰 별은 밝아질수록 방사형 그라디언트 후광이 진해지고 십자 빛살이 길어지게 해줘. 별의 12%는 브랜드 포인트 컬러와 보조 컬러로 물들이고, 나머지는 본문 색으로 그려줘. 2.5~6초마다 화면 위쪽 30% 영역에서 18~38° 각도로 떨어지는 별똥별(Shooting Star)을 0.8~1.3초 동안 지나가게 하고, 꼬리는 createLinearGradient로 머리에서 끝으로 투명해지게, 전체 불투명도는 sin(진행률 × π)로 나타났다 사라지게 해줘. prefers-reduced-motion이 켜져 있으면 트윙클 폭을 줄이고 별똥별은 생략해줘.',
    html: `<div class="horizon"></div>
<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">NIGHT SKY</p>
  <h1>오늘 밤, 별이 가장 잘 보이는 곳</h1>
</header>`,
    css: `.horizon,
canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}
.horizon {
  background: radial-gradient(120% 60% at 50% 115%, var(--accent), transparent 70%);
  opacity: .2;
}
.hero {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 14%;
  text-align: center;
  padding: 0 24px;
}
.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: .3em;
  color: var(--accent);
}
.hero h1 {
  margin: 0;
  font-size: clamp(20px, 3.8vw, 36px);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-shadow: 0 0 18px var(--bg);
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const FG = css.getPropertyValue('--fg').trim() || '#eef0f6';
const ACCENT = css.getPropertyValue('--accent').trim() || '#7c8cff';
const ACCENT2 = css.getPropertyValue('--accent-2').trim() || '#ffc857';

// '#rrggbb' → 'rgba(r,g,b,a)' 변환 (후광·별똥별 그라디언트용)
function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
}

// 별 250개: 위치를 0~1 비율로 저장해 리사이즈해도 배치가 유지됨
const stars = Array.from({ length: 250 }, () => {
  const big = Math.random() < 0.08, tinted = Math.random() < 0.12;
  return {
    x: Math.random(), y: Math.random(),
    r: big ? 1.4 + Math.random() * 1.2 : 0.4 + Math.random() ** 2 * 1.1,
    speed: 0.5 + Math.random() * 2.5,  // 깜빡임 속도(rad/s)
    phase: Math.random() * Math.PI * 2,
    color: tinted ? (Math.random() < 0.5 ? ACCENT : ACCENT2) : FG
  };
});

let w = 0, h = 0;
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

let meteor = null, nextMeteor = 1.5;
function launchMeteor(t) {
  const dir = Math.random() < 0.5 ? -1 : 1;
  const angle = (18 + Math.random() * 20) * Math.PI / 180;
  const speed = Math.max(w, h) * (0.8 + Math.random() * 0.4);  // px/s
  meteor = {
    x: w * (0.2 + Math.random() * 0.6), y: h * (0.05 + Math.random() * 0.25),
    vx: Math.cos(angle) * speed * dir, vy: Math.sin(angle) * speed,
    born: t, life: 0.8 + Math.random() * 0.5
  };
}

function frame(now) {
  const t = now / 1000;
  ctx.clearRect(0, 0, w, h);

  for (const s of stars) {
    // 별마다 속도·위상이 다른 사인파로 밝기를 바꾸고, 제곱해서 반짝임을 날카롭게
    const tw = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
    const x = s.x * w, y = s.y * h;
    ctx.fillStyle = s.color;
    ctx.globalAlpha = 0.25 + 0.75 * tw * tw;
    ctx.beginPath();
    ctx.arc(x, y, s.r * (0.85 + 0.25 * tw), 0, Math.PI * 2);
    ctx.fill();
    if (s.r > 1.4) {
      // 큰 별: 방사형 그라디언트 후광 + 밝아질수록 길어지는 십자 빛살
      const R = s.r * 5, len = s.r * (2 + 4 * tw);
      const halo = ctx.createRadialGradient(x, y, 0, x, y, R);
      halo.addColorStop(0, rgba(s.color, 0.3 * tw));
      halo.addColorStop(1, rgba(s.color, 0));
      ctx.globalAlpha = 1;
      ctx.fillStyle = halo;
      ctx.fillRect(x - R, y - R, R * 2, R * 2);
      ctx.globalAlpha = 0.6 * tw;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - len, y); ctx.lineTo(x + len, y);
      ctx.moveTo(x, y - len); ctx.lineTo(x, y + len);
      ctx.stroke();
    }
  }

  // 별똥별: 머리는 선명하고 꼬리 쪽으로 투명해지는 그라디언트 선
  if (!meteor && t > nextMeteor) launchMeteor(t);
  if (meteor) {
    const age = t - meteor.born;
    const p = age / meteor.life;
    if (p >= 1) {
      meteor = null;
      nextMeteor = t + 2.5 + Math.random() * 3.5;
    } else {
      const hx = meteor.x + meteor.vx * age, hy = meteor.y + meteor.vy * age;
      const tail = Math.min(age, 0.15);  // 꼬리 = 최근 0.15초 동안의 이동 거리
      const tx = hx - meteor.vx * tail, ty = hy - meteor.vy * tail;
      const grad = ctx.createLinearGradient(tx, ty, hx, hy);
      grad.addColorStop(0, rgba(FG, 0));
      grad.addColorStop(1, rgba(FG, Math.sin(p * Math.PI)));
      ctx.globalAlpha = 1;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();
    }
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 5,
    id: 'matrix-rain',
    cat: 'bg',
    name: '매트릭스 레인',
    en: 'Matrix Digital Rain',
    level: 2,
    trigger: 'auto',
    timing: '50ms 고정 틱 · 잔상 알파 0.1',
    desc: '가타카나와 숫자가 열마다 다른 속도로 떨어지며 밝은 머리 글자 뒤로 초록 잔상을 남기는 배경입니다. 해커·보안 콘셉트를 한눈에 전달합니다.',
    use: '개발자·보안 서비스 랜딩, 해커톤 페이지, 404·점검 페이지',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'fillText'],
    terms: ['매트릭스 디지털 레인 (Matrix Digital Rain)', '잔상 효과 (Trail Fade)', '글리프 (Glyph)', '고정 타임스텝 (Fixed Timestep)'],
    prompt: 'HTML5 Canvas로 화면 전체에 가타카나와 숫자가 세로로 쏟아지는 매트릭스 디지털 레인(Matrix Digital Rain) 배경을 만들어줘. 글자 크기(모바일 14px, 데스크톱 17px) 간격으로 열을 나누고, 고정 타임스텝(Fixed Timestep)으로 50ms마다 한 틱을 실행해 열마다 틱당 0.45~1칸의 서로 다른 속도로 한 칸씩 내려오게 해줘. 맨 앞 머리 글자는 거의 흰색으로 밝게 그리고 초록 글로우(shadowBlur 10)를 주며, 다음 틱에 그 칸을 배경색으로 지운 뒤 같은 글자를 매트릭스 그린으로 다시 그려 꼬리가 되게 해줘. 매 틱 캔버스 전체를 배경색으로 알파 0.1만큼 덮어서 오래된 글자가 서서히 사라지는 잔상 효과(Trail Fade)를 만들고, 화면 아래를 지난 열은 틱마다 8% 확률로 맨 위에서 다시 시작하게 해 줄이 자연스럽게 엇갈리게 해줘. 밝은 테마에서는 배경 밝기를 판별해 초록을 진한 녹색으로, 머리 글자를 본문 색으로 바꾸고 글로우를 꺼서 가독성을 지켜줘. 리사이즈 시에는 열 개수를 다시 계산하고 캔버스를 배경색으로 한 번 채운 뒤 시작해줘.',
    html: `<canvas id="c"></canvas>
<div class="panel">
  <p class="eyebrow">ACCESS GRANTED</p>
  <h1>시스템에 접속했습니다</h1>
  <p class="sub">보안 채널 암호화 완료 · 세션 03:59</p>
</div>`,
    css: `canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}
.panel {
  position: relative;
  max-width: calc(100vw - 32px);
  padding: clamp(18px, 3vw, 28px) clamp(22px, 4vw, 40px);
  border: 1px solid var(--line);
  border-radius: 16px;
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  text-align: center;
}
.eyebrow {
  margin: 0 0 10px;
  font: 600 12px/1 ui-monospace, Menlo, monospace;
  letter-spacing: .28em;
  color: var(--rain, var(--accent));
}
.panel h1 {
  margin: 0;
  font-size: clamp(20px, 3.6vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.sub {
  margin: 10px 0 0;
  font: 13px/1.4 ui-monospace, Menlo, monospace;
  color: var(--muted);
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const root = document.documentElement;
const css = getComputedStyle(root);
const BG = css.getPropertyValue('--bg').trim() || '#0c0e14';
const FG = css.getPropertyValue('--fg').trim() || '#eef0f6';

// 배경 밝기로 테마 판별: 밝은 배경에서는 진한 초록 + 본문색 머리 글자
const n = parseInt(BG.slice(1), 16);
const isLight = (n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 > 150;
const GREEN = isLight ? '#0a8a43' : '#3dff8b';
const HEAD = isLight ? FG : '#eafff2';
root.style.setProperty('--rain', GREEN);

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789';
const STEP = 50;  // 50ms마다 한 틱 (초당 20틱)
let w = 0, h = 0, size = 16, cols = [];

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  size = w < 560 ? 14 : 17;
  // 열마다 현재 행, 틱당 이동 칸 수(속도), 직전 머리 글자를 기억
  cols = Array.from({ length: Math.ceil(w / size) }, () => ({
    row: -Math.floor((Math.random() * h) / size),
    speed: 0.45 + Math.random() * 0.55,
    acc: 0,
    glyph: ''
  }));
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

function tick() {
  // 잔상: 배경색을 알파 0.1로 덮어 오래된 글자를 조금씩 지움
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
  ctx.font = '600 ' + size + 'px ui-monospace, Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  cols.forEach((c, i) => {
    c.acc += c.speed;
    if (c.acc < 1) return;
    c.acc -= 1;
    const x = i * size, y = c.row * size;
    // 직전 머리 글자를 초록으로 다시 칠해 꼬리로 만듦
    if (c.glyph) {
      ctx.fillStyle = BG;
      ctx.fillRect(x, y, size, size);
      ctx.fillStyle = GREEN;
      ctx.fillText(c.glyph, x + size / 2, y);
    }
    // 한 칸 아래에 새 머리 글자를 밝게 (어두운 테마에서만 글로우)
    c.row += 1;
    c.glyph = pick();
    ctx.fillStyle = HEAD;
    ctx.shadowColor = GREEN;
    ctx.shadowBlur = isLight ? 0 : 10;
    ctx.fillText(c.glyph, x + size / 2, y + size);
    ctx.shadowBlur = 0;
    // 화면 아래를 지나면 틱마다 8% 확률로 맨 위에서 다시 시작 (열마다 엇갈림)
    if (y > h && Math.random() < 0.08) {
      c.row = -Math.floor(Math.random() * 8);
      c.glyph = '';
    }
  });
}

let acc = 0, last = 0;
function frame(now) {
  // 고정 타임스텝: 화면 주사율과 상관없이 50ms마다 tick 실행
  acc += Math.min(now - last, 200);
  last = now;
  while (acc >= STEP) {
    tick();
    acc -= STEP;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 6,
    id: 'snowfall',
    cat: 'bg',
    name: '눈 내리기',
    en: 'Snowfall (Parallax Layers)',
    level: 2,
    trigger: 'auto',
    timing: '무한 루프 · 60fps · 깊이 레이어 3개',
    desc: '크기·속도·흐림이 다른 3개 층의 눈송이가 좌우로 흔들리며 내리는 배경입니다. 바람이 천천히 방향을 바꾸고 가까운 눈일수록 더 크게 밀려 깊이감이 생깁니다.',
    use: '겨울 시즌 프로모션, 크리스마스 이벤트 페이지, 히어로 배경',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'Offscreen Canvas Sprite'],
    terms: ['패럴랙스 레이어 (Parallax Layers)', '피사계 심도 (Depth of Field)', '사인파 흔들림 (Sine Sway)', '스프라이트 캐싱 (Sprite Caching)'],
    prompt: 'HTML5 Canvas로 히어로 섹션 배경에 눈이 내리는 효과를 만들고, 원근감을 위해 깊이별 패럴랙스 레이어(Parallax Layers) 3개로 나눠줘. 먼 층(전체의 55%)은 반지름 0.8~1.5px·낙하 속도 초당 18~32px·불투명도 0.4, 중간 층(30%)은 1.6~2.6px·38~60px/s·0.6, 가까운 층(15%)은 3.2~5.5px·70~110px/s·0.85로 가까울수록 크고 빠르게 해줘. 가까운 층일수록 가장자리가 넓게 번지는 방사형 그라디언트 스프라이트를 써서 피사계 심도(Depth of Field)처럼 흐려 보이게 하고, ctx.filter blur 대신 레이어별로 한 번만 그려 둔 오프스크린 캔버스를 drawImage로 찍어 성능을 지켜줘. 각 송이는 주기가 다른 사인파로 좌우 6~20px씩 흔들리게(Sine Sway) 하고, 주기가 다른 사인파 두 개를 합친 바람을 최대 초당 40px로 천천히 바꿔 가까운 층일수록 더 많이 밀리게 해줘. 화면 아래로 나간 송이는 위쪽 무작위 위치에서 다시 떨어뜨리고, 송이 수는 화면 넓이에 비례해 90~280개로 정한 뒤 리사이즈와 devicePixelRatio(최대 2)에 맞춰 다시 만들어줘. 눈 색은 배경 밝기를 판별해 어두운 테마에선 흰색 계열의 본문 색, 밝은 테마에선 흰 눈이 묻히지 않도록 회청색 계열의 뮤트 텍스트 색으로 바꿔줘.',
    html: `<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">WINTER COLLECTION</p>
  <h1>첫눈 오는 날, 따뜻하게</h1>
  <p class="sub">울 코트와 니트 신상품 최대 30% 할인</p>
</header>`,
    css: `body {
  background: linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%);
}
canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}
.hero {
  position: relative;
  text-align: center;
  padding: 0 24px;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .28em;
  color: var(--accent);
}
.hero h1 {
  margin: 0;
  font-size: clamp(22px, 4.4vw, 42px);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.sub {
  margin: 12px 0 0;
  font-size: clamp(13px, 1.6vw, 16px);
  color: var(--muted);
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const BG = css.getPropertyValue('--bg').trim() || '#0c0e14';
// 배경 밝기로 테마 판별: 어두우면 흰 눈(본문색), 밝으면 회청색 눈(보조 텍스트색)
const n = parseInt(BG.slice(1), 16);
const isLight = (n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 > 150;
const SNOW = css.getPropertyValue(isLight ? '--muted' : '--fg').trim() || '#eef0f6';

// 깊이 레이어: 멀수록 작고 느리고 옅게, 가까울수록 크고 빠르고 흐리게(초점 밖)
const LAYERS = [
  { share: 0.55, r: [0.8, 1.5], v: [18, 32], sway: 6, wind: 0.35, alpha: 0.4, soft: 0.3 },
  { share: 0.3, r: [1.6, 2.6], v: [38, 60], sway: 12, wind: 0.65, alpha: 0.6, soft: 0.45 },
  { share: 0.15, r: [3.2, 5.5], v: [70, 110], sway: 20, wind: 1, alpha: 0.85, soft: 0.9 }
];
const rand = (range) => range[0] + Math.random() * (range[1] - range[0]);

// 레이어별 부드러운 원 스프라이트를 미리 그려 둠 (ctx.filter blur보다 훨씬 가벼움)
LAYERS.forEach((L) => {
  const s = document.createElement('canvas');
  s.width = s.height = 64;
  const g = s.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(1 - L.soft, 'rgba(255,255,255,0.9)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  g.globalCompositeOperation = 'source-in';
  g.fillStyle = SNOW;
  g.fillRect(0, 0, 64, 64);
  L.sprite = s;
});

let w = 0, h = 0, flakes = [];
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // 넓이에 비례한 송이 수(90~280개)를 먼 층부터 채워 그리기 순서를 맞춤
  const total = Math.max(90, Math.min(280, Math.round((w * h) / 1600)));
  flakes = [];
  LAYERS.forEach((L) => {
    for (let i = 0; i < Math.round(total * L.share); i++) {
      flakes.push({
        L,
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(L.r),
        v: rand(L.v),
        phase: Math.random() * Math.PI * 2,
        freq: 0.5 + Math.random() * 1.2
      });
    }
  });
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

let last = 0;
function frame(now) {
  const t = now / 1000;
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  // 바람: 주기가 다른 사인파 두 개를 합쳐 천천히 방향이 바뀜 (최대 약 40px/s)
  const wind = (Math.sin(t * 0.21) * 0.7 + Math.sin(t * 0.083 + 1) * 0.3) * 40;

  ctx.clearRect(0, 0, w, h);
  for (const f of flakes) {
    const L = f.L;
    f.y += f.v * dt;
    f.x += wind * L.wind * dt;
    if (f.y > h + 12) {
      f.y = -12;
      f.x = Math.random() * w;
    }
    if (f.x > w + 24) f.x -= w + 48;
    else if (f.x < -24) f.x += w + 48;
    // 좌우 흔들림은 그릴 때만 더해 기본 궤적은 유지
    const x = f.x + Math.sin(t * f.freq + f.phase) * L.sway;
    const size = f.r * 2 * (1 + L.soft);
    ctx.globalAlpha = L.alpha;
    ctx.drawImage(L.sprite, x - size / 2, f.y - size / 2, size, size);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 7,
    id: 'fireworks',
    cat: 'bg',
    name: '불꽃놀이',
    en: 'Fireworks',
    level: 3,
    trigger: 'click',
    timing: '자동 2.5~3.5s · 입자 수명 1.2~2s',
    desc: '로켓이 솟아올라 정점에서 100여 개의 불꽃 입자로 터지고, 중력과 공기 저항으로 천천히 처지며 잔상을 남기고 사라집니다. 클릭한 위치를 향해 로켓을 쏘아 올릴 수도 있습니다.',
    use: '새해·기념일 이벤트, 목표 달성·결제 완료 화면, 런칭 페이지',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'globalCompositeOperation'],
    terms: ['파티클 시스템 (Particle System)', '중력과 공기 저항 (Gravity & Drag)', '모션 트레일 (Motion Trail)', '가산 혼합 (Additive Blending)'],
    prompt: 'HTML5 Canvas로 히어로 배경에 불꽃놀이(Fireworks) 파티클 시스템(Particle System)을 만들어줘. 로켓은 화면 아래에서 출발해 목표 높이에서 정확히 정점에 닿도록 초기 속도를 vy = -√(2 × 900 × 상승 높이)로 역산하고, 올라가는 동안 수명 0.5초짜리 금색 불티를 매 프레임 흘리게 해줘. 정점에 닿으면 90~130개 입자를 화면 짧은 변 × 0.5~0.75(px/s)의 초속으로 터뜨리되, 구 표면을 평면에 투영한 분포(속도 × √(1 - u²), u는 -1~1 난수)로 가장자리가 촘촘한 둥근 불꽃을 만들고 30% 확률로 고리 모양을 섞어줘. 입자에는 중력 140px/s²와 60fps 기준 프레임당 0.965의 공기 저항(Drag)을 적용하고, 1.2~2초 수명 동안 서서히 옅어지다 마지막 30%에서는 무작위로 깜빡이며 꺼지게 해줘. 매 프레임 캔버스를 배경색 알파 0.18로 덮어 잔상 꼬리(Motion Trail)를 만들고, 어두운 테마에서는 globalCompositeOperation을 lighter로 두는 가산 혼합(Additive Blending)으로 겹친 빛이 더 밝아지게 해줘. 2.5~3.5초마다 자동으로 1~2발을 쏘고 클릭하면 그 지점을 향해 로켓을 발사하되, 탭이 숨겨졌다 돌아올 때 폭발이 몰려 튀지 않게 프레임 간격(dt)을 최대 50ms로 제한해줘.',
    html: `<canvas id="c"></canvas>
<header class="hero">
  <p class="eyebrow">HAPPY NEW YEAR</p>
  <h1>새해 복 많이 받으세요</h1>
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
  left: 0;
  right: 0;
  bottom: 10%;
  text-align: center;
  padding: 0 24px;
  pointer-events: none;
}
.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: .3em;
  color: var(--accent-2);
}
.hero h1 {
  margin: 0;
  font-size: clamp(20px, 3.8vw, 36px);
  font-weight: 700;
  letter-spacing: -0.02em;
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const css = getComputedStyle(document.documentElement);
const BG = css.getPropertyValue('--bg').trim() || '#0c0e14';
const n = parseInt(BG.slice(1), 16);
const isLight = (n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 > 150;
const HUES = [0, 22, 45, 150, 190, 215, 275, 320];
const color = (hue, light) => 'hsl(' + hue + ',100%,' + light + '%)';

const GRAVITY = 140;  // 불꽃 입자 중력(px/s²)
const DRAG = 0.965;   // 60fps 기준 프레임당 속도 유지율(공기 저항)
let w = 0, h = 0, rockets = [], sparks = [];
const spark = (x, y, vx, vy, life, hue, size) =>
  sparks.push({ x, y, vx, vy, life, hue, size, age: 0 });

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

// 로켓: 목표 높이에서 정확히 정점에 닿도록 초기 속도를 역산 (vy = -√(2gh))
function launch(tx, ty) {
  const g = 900, x = tx + (Math.random() - 0.5) * 80, y = h + 10;
  const vy = -Math.sqrt(2 * g * (y - Math.min(ty, h - 60)));
  const time = -vy / g;  // 정점까지 걸리는 시간 → 그동안 목표 x에 도착하도록 vx 결정
  const hue = HUES[Math.floor(Math.random() * HUES.length)];
  rockets.push({ x, y, vx: (tx - x) / time, vy, g, hue });
}

function burst(r) {
  const count = 90 + Math.floor(Math.random() * 40);
  const power = Math.min(w, h) * (0.5 + Math.random() * 0.25);  // px/s
  const ring = Math.random() < 0.3;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    // 구 표면을 평면에 투영한 분포 → 가장자리가 촘촘한 둥근 불꽃
    const u = Math.random() * 2 - 1;
    const s = power * (ring ? 1 : Math.sqrt(1 - u * u)) * (0.9 + Math.random() * 0.1);
    const hue = r.hue + (Math.random() - 0.5) * 30;
    const life = 1.2 + Math.random() * 0.8;
    spark(r.x, r.y, Math.cos(a) * s, Math.sin(a) * s, life, hue, 1.2 + Math.random() * 1.2);
  }
}

let last = 0;
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  const drag = Math.pow(DRAG, dt * 60);

  // 잔상: 배경색을 낮은 알파로 덮어 이전 프레임을 서서히 지움
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);
  // 어두운 배경에선 가산 혼합으로 겹칠수록 밝게
  ctx.globalCompositeOperation = isLight ? 'source-over' : 'lighter';

  rockets = rockets.filter((r) => {
    r.vy += r.g * dt;
    r.x += r.vx * dt;
    r.y += r.vy * dt;
    // 상승 중에는 금색 불티를 흘림
    spark(r.x, r.y, (Math.random() - 0.5) * 30, 30, 0.5, 40, 1);
    if (r.vy >= 0) {  // 정점 도달 → 폭발
      burst(r);
      return false;
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = color(r.hue, isLight ? 42 : 85);
    ctx.fillRect(r.x - 1.5, r.y - 1.5, 3, 3);
    return true;
  });

  sparks = sparks.filter((s) => {
    s.age += dt;
    if (s.age > s.life) return false;
    s.vx *= drag;
    s.vy = s.vy * drag + GRAVITY * dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    // 수명에 따라 옅어지고, 마지막 30%는 깜빡이며 꺼짐
    const p = s.age / s.life;
    ctx.globalAlpha = (1 - p) * (p > 0.7 ? Math.random() : 1);
    ctx.fillStyle = color(s.hue, isLight ? 50 : 64);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    return true;
  });
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
function autoShow() {
  if (!auto) return;
  const shots = Math.random() < 0.4 ? 2 : 1;
  for (let i = 0; i < shots; i++) {
    const x = w * (0.2 + Math.random() * 0.6), y = h * (0.15 + Math.random() * 0.3);
    setTimeout(() => launch(x, y), i * 350);
  }
  setTimeout(autoShow, 2500 + Math.random() * 1000);
}
setTimeout(autoShow, 600);
// 사용자가 클릭하면 자동 시연을 멈추고, 6초 동안 입력이 없으면 다시 시작
let idle = 0;
function pauseAuto() {
  auto = false;
  clearTimeout(idle);
  idle = setTimeout(() => { auto = true; autoShow(); }, 6000);
}

// 클릭한 지점을 향해 로켓 발사
addEventListener('pointerdown', (e) => {
  pauseAuto();
  launch(e.clientX, e.clientY);
});`
  },
  {
    no: 8,
    id: 'confetti-burst',
    cat: 'bg',
    name: '컨페티 버스트',
    en: 'Confetti Burst',
    level: 3,
    trigger: 'click',
    timing: '150조각 · 0.6s 상승 · 3~5s 낙하',
    desc: '버튼을 누르면 색종이 150조각이 위로 터져 올랐다가 뒤집히고 회전하며 팔랑팔랑 떨어집니다. 완료·축하 순간의 보상감을 확실하게 줍니다.',
    use: '결제·가입 완료 화면, 목표 달성 알림, 이벤트 당첨 페이지',
    tech: ['HTML5 Canvas', 'requestAnimationFrame', 'Web Animations API'],
    terms: ['컨페티 버스트 (Confetti Burst)', '3D 플립 (3D Flip)', '공기 저항 (Air Drag)', '물리 기반 애니메이션 (Physics-based Animation)'],
    prompt: '완료 카드의 버튼을 누르면 버튼 중심에서 색종이 150조각이 위로 터져 나오는 컨페티 버스트(Confetti Burst)를 HTML5 Canvas로 만들어줘. 조각은 위쪽 ±57° 부채꼴 안에서 60fps 기준 프레임당 10~24px 속도로 발사하고, 매 프레임 속도에 공기 저항(Air Drag) 0.93을 곱하고 중력 0.1을 더해 약 0.6초 만에 솟았다가 초당 약 85px의 종단 속도로 천천히 떨어지게 해줘. 70%는 직사각형, 30%는 원으로 만들고 조각마다 rotate 회전과 함께 scaleY에 cos(flip)을 곱해 종이가 앞뒤로 뒤집히는 3D 플립(3D Flip)을 주되, 뒷면이 보일 때(cos < 0)는 검정 22%를 덧칠해 입체감을 줘. 떨어지는 동안 사인파로 좌우로 살짝 흔들리게 하고, 색은 브랜드 포인트 컬러와 보조 컬러에 핑크·민트·오렌지를 섞고, 터지는 순간 카드의 체크 배지를 450ms 동안 scale 1 → 1.18 → 1로 튕겨줘. 캔버스는 화면 전체를 덮되 pointer-events: none으로 클릭을 막지 않게 하고, 화면 아래로 벗어난 조각은 배열에서 바로 제거해 연속으로 눌러도 느려지지 않게 해줘.',
    html: `<div class="card">
  <div class="badge" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
  </div>
  <h1>축하합니다!</h1>
  <p>첫 프로젝트가 성공적으로 배포되었어요.</p>
  <button class="btn" type="button">결과 공유하기</button>
</div>
<canvas id="c"></canvas>`,
    css: `.card {
  width: min(360px, calc(100vw - 32px));
  padding: clamp(22px, 5vh, 36px) 28px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--surface);
  box-shadow: 0 24px 60px -30px rgba(0, 0, 0, .45);
  text-align: center;
}
.badge {
  width: clamp(40px, 10vh, 52px);
  aspect-ratio: 1;
  margin: 0 auto 14px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--accent);
  color: var(--bg);
}
.badge svg {
  width: 55%;
  height: 55%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.card h1 {
  margin: 0;
  font-size: clamp(22px, 3.6vw, 28px);
  letter-spacing: -0.02em;
}
.card p {
  margin: 8px 0 20px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--muted);
}
.btn {
  appearance: none;
  border: 0;
  cursor: pointer;
  padding: 12px 22px;
  border-radius: 12px;
  background: var(--accent);
  color: var(--bg);
  font: 600 15px/1 var(--font);
  transition: transform .15s cubic-bezier(.22, 1, .36, 1);
}
.btn:active,
.btn.is-pressed {
  transform: scale(.95);
}
canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}`,
    js: `const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('.btn');
const badge = document.querySelector('.badge');
const css = getComputedStyle(document.documentElement);
const COLORS = [
  css.getPropertyValue('--accent').trim() || '#7c8cff',
  css.getPropertyValue('--accent-2').trim() || '#ffc857',
  '#ff5d8f', '#2ec4b6', '#ff7a45'
];
const GRAVITY = 0.1;  // 60fps 기준 프레임당 중력(px/frame²)
const DRAG = 0.93;    // 프레임당 속도 유지율 → 종단 속도 약 1.4px/frame
let w = 0, h = 0, pieces = [];

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
// 캔버스 박스 크기를 직접 감시: 처음 배치될 때와 크기가 바뀔 때마다 호출됨
new ResizeObserver(resize).observe(canvas);

// 발사 지점에서 위쪽 ±57° 부채꼴로 150조각을 뿌림 (무대 높이에 맞춰 세기 조절)
function burst(ox, oy) {
  const power = Math.min(1.2, Math.max(0.75, h / 440));
  for (let i = 0; i < 150; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2;
    const speed = (10 + Math.random() * 14) * power;
    pieces.push({
      x: ox, y: oy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      size: 7 + Math.random() * 5, circle: Math.random() < 0.3, color: COLORS[i % COLORS.length],
      rot: Math.random() * 6.28, spin: (Math.random() - 0.5) * 0.3,        // 회전 속도(rad/frame)
      flip: Math.random() * 6.28, flipSpeed: 0.08 + Math.random() * 0.12,  // 뒤집히는 속도(rad/frame)
      wobble: Math.random() * 6.28
    });
  }
  badge.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
    { duration: 450, easing: 'cubic-bezier(.22, 1, .36, 1)' }
  );
}
function burstFromButton() {
  const r = btn.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2);
}

let last = 0;
function frame(now) {
  const f = Math.min((now - last) / 16.67, 3);  // 60fps 기준 경과 프레임 수
  last = now;
  const drag = Math.pow(DRAG, f);
  ctx.clearRect(0, 0, w, h);

  pieces = pieces.filter((p) => p.y < h + 30);  // 화면 밖 조각은 즉시 제거
  for (const p of pieces) {
    p.vx *= drag;
    p.vy = p.vy * drag + GRAVITY * f;
    p.wobble += 0.1 * f;
    p.x += (p.vx + Math.sin(p.wobble) * 1.2) * f;
    p.y += p.vy * f;
    p.rot += p.spin * f;
    p.flip += p.flipSpeed * f;

    // 3D 플립: 세로 배율에 cos를 곱해 종이가 앞뒤로 뒤집히는 것처럼 보이게
    const flipY = Math.cos(p.flip);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.scale(1, flipY);
    ctx.beginPath();
    if (p.circle) ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
    else ctx.rect(-p.size / 2, -p.size * 0.3, p.size, p.size * 0.6);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (flipY < 0) {  // 뒷면이 보일 때는 살짝 어둡게
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fill();
    }
    ctx.restore();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
function autoBurst() {
  if (!auto) return;
  btn.classList.add('is-pressed');
  setTimeout(() => btn.classList.remove('is-pressed'), 160);
  burstFromButton();
  setTimeout(autoBurst, 2800 + Math.random() * 700);
}
setTimeout(autoBurst, 600);
// 사용자가 클릭하면 자동 시연을 멈추고, 6초 동안 입력이 없으면 다시 시작
let idle = 0;
function pauseAuto() {
  auto = false;
  clearTimeout(idle);
  idle = setTimeout(() => { auto = true; autoBurst(); }, 6000);
}

// 버튼은 버튼 중심에서, 그 밖의 곳은 누른 지점에서 터짐
btn.addEventListener('click', () => {
  pauseAuto();
  burstFromButton();
});
addEventListener('pointerdown', (e) => {
  if (btn.contains(e.target)) return;
  pauseAuto();
  burst(e.clientX, e.clientY);
});`
  }
);
