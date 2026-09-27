window.MOTIONS = window.MOTIONS || [];
window.MOTIONS.push(
  {
    no: 79,
    id: 'fade-slide-in',
    cat: 'enter',
    name: '페이드 슬라이드 인',
    en: 'Fade Slide In',
    level: 1,
    trigger: 'auto',
    timing: '스태거 80ms · 700ms (.22,1,.36,1)',
    desc: '히어로의 문구와 버튼, 이미지 카드가 아래에서 24px 떠오르며 80ms 간격으로 차례차례 나타나는 기본 등장 효과입니다. 위에서 아래로 시선이 자연스럽게 흘러갑니다.',
    use: '랜딩 히어로, 섹션 진입, 온보딩 첫 화면',
    tech: ['CSS transition', 'transition-delay', 'IntersectionObserver'],
    terms: ['페이드 인 (Fade In)', '스태거 애니메이션 (Staggered Animation)', '진입 애니메이션 (Entrance Animation)', '이징 곡선 (Easing Curve)'],
    prompt: '랜딩 페이지 히어로 섹션이 처음 보일 때 요소들이 순서대로 떠오르는 페이드 슬라이드 인(Fade Slide In) 등장 효과를 만들어줘. 아이브로 문구, 헤드라인, 설명 문단, 버튼 2개, 오른쪽 이미지 카드 순서로 각각 opacity 0→1, translateY(24px)→0으로 움직이게 해줘. 길이는 700ms, 이징은 cubic-bezier(.22,1,.36,1)로 하고, 요소마다 80ms씩 늦게 시작하는 스태거(Stagger)를 transition-delay: calc(var(--i) * 80ms)로 걸어줘. 초기 상태는 CSS로 숨겨 두고 부모에 .is-in 클래스를 붙이는 순간 한꺼번에 재생되게 하고, 히어로가 첫 화면 아래에 있다면 IntersectionObserver로 20% 이상 보였을 때 한 번만 실행해줘. transform과 opacity만 애니메이션해서 레이아웃이 흔들리지 않게 하고, prefers-reduced-motion 사용자에게는 이동 없이 페이드만 보여줘.',
    html: `<section class="hero">
  <div class="copy">
    <p class="eyebrow reveal" style="--i:0">NEW · 2026 가을 업데이트</p>
    <h1 class="reveal" style="--i:1">움직임이 만드는<br>첫인상</h1>
    <p class="lead reveal" style="--i:2">화면에 들어오는 순간부터 시선을 자연스럽게 이끄는 인터페이스를 만들어 보세요.</p>
    <div class="actions">
      <button class="btn primary reveal" style="--i:3">무료로 시작하기</button>
      <button class="btn ghost reveal" style="--i:4">데모 보기</button>
    </div>
  </div>
  <div class="visual reveal" style="--i:5" aria-hidden="true">
    <div class="dots"><i></i><i></i><i></i></div>
    <p class="stat-label">이번 달 전환율</p>
    <p class="stat">+38.2%</p>
    <div class="chart">
      <i style="--h:38%"></i><i style="--h:55%"></i><i style="--h:46%"></i>
      <i style="--h:70%"></i><i style="--h:62%"></i><i style="--h:90%"></i>
    </div>
  </div>
</section>`,
    css: `.hero {
  width: min(92vw, 920px);
  display: grid;
  word-break: keep-all;
  grid-template-columns: 1.1fr .9fr;
  align-items: center;
  gap: clamp(24px, 5vw, 56px);
}
.eyebrow {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .06em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(28px, 5vw, 52px);
  line-height: 1.15;
  letter-spacing: -0.035em;
}
.lead {
  margin: 14px 0 22px;
  max-width: 30em;
  font-size: clamp(13px, 1.6vw, 16px);
  line-height: 1.65;
  color: var(--muted);
}
.actions { display: flex; flex-wrap: wrap; gap: 10px; }
.btn {
  padding: 11px 18px;
  border: 1px solid var(--line);
  border-radius: 10px;
  font: 600 14px/1 var(--font);
  cursor: pointer;
}
.primary { background: var(--accent); border-color: transparent; color: #fff; }
.ghost { background: transparent; color: var(--fg); }
.visual {
  display: flex;
  flex-direction: column;
  min-height: min(clamp(220px, 30vw, 300px), 80vh);
  padding: clamp(16px, 2.4vw, 26px);
  border: 1px solid var(--line);
  border-radius: 20px;
  background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 16%, var(--surface)), var(--surface) 60%);
  box-shadow: 0 30px 60px -36px rgba(0, 0, 0, .5);
}
.dots { display: flex; gap: 6px; margin-bottom: auto; }
.dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--line); }
.stat-label { margin: 0 0 4px; font-size: 12px; color: var(--muted); }
.stat { margin: 0 0 14px; font-size: clamp(22px, 3vw, 32px); font-weight: 700; letter-spacing: -0.02em; }
.chart { display: flex; align-items: flex-end; gap: 8px; height: clamp(60px, 10vw, 110px); }
.chart i { flex: 1; height: var(--h); border-radius: 6px 6px 3px 3px; background: color-mix(in srgb, var(--accent) 55%, transparent); }
.chart i:last-child { background: var(--accent-2); }

/* 등장 전: 24px 아래 + 투명 */
.reveal { opacity: 0; transform: translateY(24px); }
/* 등장: --i 순번마다 80ms씩 늦게 시작 */
.hero.is-in .reveal {
  opacity: 1;
  transform: none;
  transition: opacity 700ms cubic-bezier(.22, 1, .36, 1), transform 700ms cubic-bezier(.22, 1, .36, 1);
  transition-delay: calc(var(--i) * 80ms);
}
/* 데모 반복용: 다시 재생하기 전에 한 번에 사라짐 */
.hero.is-leaving .reveal { opacity: 0; transform: none; transition: opacity 300ms ease; }

@media (max-width: 620px) {
  .hero { grid-template-columns: 1fr; }
  .visual { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .reveal { transform: none !important; }
}`,
    js: `const hero = document.querySelector('.hero');

function play() {
  hero.classList.remove('is-in', 'is-leaving');
  void hero.offsetWidth; // 강제 리플로우로 초기 상태를 확정한 뒤 재생
  hero.classList.add('is-in');
}

// 첫 페인트 이후에 클래스를 붙여야 트랜지션이 보임
requestAnimationFrame(() => requestAnimationFrame(play));

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
setInterval(() => {
  hero.classList.add('is-leaving');
  setTimeout(play, 320);
}, 4000);`
  },
  {
    no: 80,
    id: 'stagger-grid',
    cat: 'enter',
    name: '스태거 그리드 등장',
    en: 'Staggered Grid Reveal',
    level: 1,
    trigger: 'auto',
    timing: '(행+열)×40ms · 500ms scale .6→1',
    desc: '타일 24개가 왼쪽 위 모서리에서 대각선 물결처럼 번지며 작게 시작해 제 크기로 커집니다. 목록 전체가 한 번에 뜨는 것보다 정돈되고 리듬감 있게 보입니다.',
    use: '갤러리·템플릿 목록, 대시보드 위젯, 검색 결과 첫 로드',
    tech: ['CSS transition', 'CSS 변수', 'transition-delay'],
    terms: ['스태거 애니메이션 (Staggered Animation)', '대각선 웨이브 (Diagonal Wave)', '트랜지션 지연 (Transition Delay)', '스케일 인 (Scale In)'],
    prompt: '템플릿 갤러리의 6열 × 4행 타일 24개가 왼쪽 위 모서리에서부터 대각선 물결처럼 퍼지며 나타나는 스태거 그리드(Staggered Grid) 등장 효과를 만들어줘. 각 타일의 지연 시간은 (행 번호 + 열 번호) × 40ms로 계산해 CSS 변수 --d에 넣고 transition-delay: var(--d)로 쓰게 해줘. 타일은 scale(.6)·opacity 0에서 scale(1)·opacity 1로 500ms cubic-bezier(.22,1,.36,1) 동안 커지게 하고, 그리드 컨테이너에 .is-in 클래스를 붙이는 순간 전체가 재생되게 해줘. 목록을 새로 불러오거나 필터를 바꿀 때는 클래스를 뗐다 붙여 다시 재생하고, 반응형으로 열 수가 바뀌면 행·열 인덱스를 다시 계산해줘. 타일이 많아져도 전체가 1초 안에 끝나도록 최대 지연을 제한하고, prefers-reduced-motion에서는 지연과 확대 없이 한 번에 보여줘.',
    html: `<section class="gallery">
  <header class="head">
    <h2>템플릿 갤러리</h2>
    <span>24개 템플릿</span>
  </header>
  <div class="grid"></div>
</section>`,
    css: `.gallery { width: min(92vw, 640px, calc((100vh - 110px) * 1.45)); }
.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;
}
.head h2 { margin: 0; font-size: clamp(16px, 2.4vw, 22px); letter-spacing: -0.02em; }
.head span { font-size: 13px; color: var(--muted); }
.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(6px, 1.2vw, 12px);
}
.tile {
  position: relative;
  aspect-ratio: 1;
  border: 1px solid var(--line);
  border-radius: clamp(8px, 1.4vw, 14px);
  background: var(--surface);
  overflow: hidden;
  /* 대기 상태: 작고 투명 */
  opacity: 0;
  transform: scale(.6);
  transition: opacity 500ms cubic-bezier(.22, 1, .36, 1), transform 500ms cubic-bezier(.22, 1, .36, 1);
  transition-delay: var(--d);
}
/* 썸네일 느낌의 자리 표시 도형 */
.tile::before {
  content: '';
  position: absolute;
  inset: 16% 16% 44%;
  border-radius: 4px;
  background: var(--line);
}
.tile::after {
  content: '';
  position: absolute;
  left: 16%;
  right: 42%;
  bottom: 18%;
  height: 9%;
  border-radius: 99px;
  background: var(--line);
}
.tile.a { background: linear-gradient(140deg, var(--accent), color-mix(in srgb, var(--accent) 45%, var(--surface))); border-color: transparent; }
.tile.b { background: linear-gradient(140deg, var(--accent-2), color-mix(in srgb, var(--accent-2) 40%, var(--surface))); border-color: transparent; }
.tile.a::before, .tile.a::after,
.tile.b::before, .tile.b::after { background: rgba(255, 255, 255, .38); }
/* 컨테이너에 .is-in이 붙으면 각자의 지연 시간 뒤에 등장 */
.grid.is-in .tile { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .tile { transform: none; transition-delay: 0ms; }
}`,
    js: `const grid = document.querySelector('.grid');
const COLS = 6, ROWS = 4;
const KINDS = ['a', '', '', 'b', '', ''];

// (행 + 열) × 40ms 지연 → 왼쪽 위에서 오른쪽 아래로 퍼지는 대각선 물결
for (let i = 0; i < COLS * ROWS; i++) {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const tile = document.createElement('div');
  tile.className = 'tile ' + KINDS[(i * 7 + row) % KINDS.length];
  tile.style.setProperty('--d', (row + col) * 40 + 'ms');
  grid.appendChild(tile);
}

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
function cycle() {
  grid.classList.add('is-in');
  setTimeout(() => grid.classList.remove('is-in'), 2600);
  setTimeout(cycle, 3600);
}
requestAnimationFrame(() => requestAnimationFrame(cycle));`
  },
  {
    no: 81,
    id: 'pop-spring',
    cat: 'enter',
    name: '스프링 팝',
    en: 'Spring Pop',
    level: 2,
    trigger: 'auto',
    timing: '스프링 800ms · 오버슈트 1.2',
    desc: '알림 배지와 혜택 칩이 1.2배까지 튀어 올랐다가 제자리에 안착하는 스프링 등장입니다. 물리 기반 이징이라 경쾌하고 손에 잡히는 느낌을 줍니다.',
    use: '알림 배지, 장바구니 수량, 태그·필터 칩, 획득 뱃지',
    tech: ['Web Animations API', 'CSS linear()', 'CSS.supports'],
    terms: ['스프링 애니메이션 (Spring Animation)', '오버슈트 (Overshoot)', '감쇠 조화 진동 (Damped Harmonic Motion)', '선형 이징 함수 (linear() Easing)'],
    prompt: '상단 앱 바의 알림·메시지·장바구니 아이콘에 붙은 숫자 배지와 아래 혜택 칩들이 통통 튀듯 나타나는 스프링 팝(Spring Pop) 등장 효과를 만들어줘. 각 요소를 scale(0)·opacity 0에서 scale(1)·opacity 1로 800ms 동안 키우되, 감쇠비(Damping Ratio) 0.45·고유 진동수 14rad/s인 감쇠 스프링 공식을 40개 지점으로 샘플링해 CSS linear() 이징 문자열로 만들어서 약 1.2배까지 오버슈트했다가 제자리에 안착하게 해줘. 재생은 Web Animations API의 element.animate()로 하고, 배지 3개 다음 칩 5개 순서로 70ms 스태거를 줘. 사라질 때는 스프링 없이 180ms ease-in으로 빠르게 scale(0)까지 줄이고, 새 애니메이션 전에 기존 애니메이션을 cancel()해서 쌓이지 않게 해줘. linear()를 지원하지 않는 브라우저는 CSS.supports로 확인해 cubic-bezier(.34,1.56,.64,1)로 대체해줘.',
    html: `<div class="panel">
  <header class="bar">
    <span class="logo">MOTION</span>
    <nav class="icons">
      <button class="icon" aria-label="알림">
        <svg viewBox="0 0 24 24"><path d="M6 9.5a6 6 0 0 1 12 0c0 5.5 2.5 7.5 2.5 7.5h-17S6 15 6 9.5Z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/></svg>
        <b class="badge pop">3</b>
      </button>
      <button class="icon" aria-label="메시지">
        <svg viewBox="0 0 24 24"><path d="M4 5.5h16v11H9.5L4 20.5Z"/></svg>
        <b class="badge pop">12</b>
      </button>
      <button class="icon" aria-label="장바구니">
        <svg viewBox="0 0 24 24"><path d="M5 8.5h14l-1.2 11.5H6.2Z"/><path d="M9 8.5a3 3 0 0 1 6 0"/></svg>
        <b class="badge dot pop"></b>
      </button>
    </nav>
  </header>
  <div class="body">
    <p class="label">오늘의 혜택</p>
    <div class="chips">
      <span class="chip pop">신규 입고</span>
      <span class="chip pop">무료배송</span>
      <span class="chip accent pop">쿠폰 10%</span>
      <span class="chip pop">오늘 도착</span>
      <span class="chip pop">베스트 1위</span>
    </div>
  </div>
</div>`,
    css: `.panel {
  width: min(92vw, 460px);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--surface);
  box-shadow: 0 24px 60px -32px rgba(0, 0, 0, .5);
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px 12px 18px;
  border-bottom: 1px solid var(--line);
}
.logo { font-size: 14px; font-weight: 800; letter-spacing: .12em; }
.icons { display: flex; gap: 4px; }
.icon {
  position: relative;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--fg);
  cursor: pointer;
}
.icon svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.badge {
  position: absolute;
  top: 3px;
  right: 1px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 99px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  box-shadow: 0 0 0 2px var(--surface);
}
.badge.dot { min-width: 0; width: 10px; height: 10px; padding: 0; top: 8px; right: 8px; background: var(--accent-2); }
.body { padding: 18px 18px 22px; }
.label { margin: 0 0 12px; font-size: 13px; color: var(--muted); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 99px;
  background: color-mix(in srgb, var(--fg) 6%, transparent);
  font-size: 14px;
  font-weight: 600;
}
.chip.accent { background: var(--accent); border-color: transparent; color: #fff; }
/* 초기 상태: JS가 스프링으로 튀어나오게 함 */
.pop { opacity: 0; transform: scale(0); }`,
    js: `// 감쇠 스프링 공식을 샘플링해 CSS linear() 이징 문자열로 변환
function springEasing(zeta, omega, seconds, steps) {
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * seconds;
    const decay = Math.exp(-zeta * omega * t);
    const x = 1 - decay * (Math.cos(wd * t) + (zeta * omega / wd) * Math.sin(wd * t));
    points.push(+x.toFixed(4));
  }
  points[steps] = 1;
  return 'linear(' + points.join(', ') + ')';
}

// linear()를 지원하지 않으면 오버슈트 베지어로 대체
const SPRING = CSS.supports('animation-timing-function', 'linear(0, 1)')
  ? springEasing(0.45, 14, 0.8, 40)
  : 'cubic-bezier(.34, 1.56, .64, 1)';

const pops = [...document.querySelectorAll('.pop')];

function popIn() {
  pops.forEach((el, i) => {
    el.getAnimations().forEach(a => a.cancel());
    el.animate(
      [{ transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
      { duration: 800, delay: i * 70, easing: SPRING, fill: 'both' }
    );
  });
}

function popOut() {
  pops.forEach(el => {
    el.getAnimations().forEach(a => a.cancel());
    el.animate(
      [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],
      { duration: 180, easing: 'cubic-bezier(.4, 0, 1, 1)', fill: 'both' }
    );
  });
}

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
function loop() {
  popIn();
  setTimeout(popOut, 2800);
  setTimeout(loop, 3400);
}
setTimeout(loop, 300);`
  },
  {
    no: 82,
    id: 'modal-open',
    cat: 'enter',
    name: '모달 열기',
    en: 'Modal Open Transition',
    level: 2,
    trigger: 'click',
    timing: '열기 320ms · 닫기 200ms ease-in',
    desc: '배경이 흐려지며 가라앉고, 다이얼로그가 살짝 아래에서 커지며 떠오르는 모달 열기·닫기 모션입니다. 닫을 때는 같은 경로를 더 빠르게 되감습니다.',
    use: '결제·업그레이드 안내, 확인 대화상자, 로그인 팝업',
    tech: ['CSS transition', 'backdrop-filter', 'inert'],
    terms: ['모달 다이얼로그 (Modal Dialog)', '백드롭 블러 (Backdrop Blur)', '스케일 인 (Scale In)', '포커스 트랩 (Focus Trap)'],
    prompt: '요금제 화면의 "플랜 업그레이드" 버튼을 누르면 열리는 모달 다이얼로그(Modal Dialog)의 열기·닫기 모션을 만들어줘. 배경 오버레이는 opacity 0→1로 페이드되면서 backdrop-filter: blur(8px)로 뒤 화면이 흐려지게 하고, 다이얼로그는 scale(.94)·translateY(12px)에서 제자리로 오게 해줘. 열 때는 320ms cubic-bezier(.22,1,.36,1), 닫을 때는 같은 경로를 200ms ease-in으로 더 빠르게 되감고, 닫힌 뒤에는 visibility: hidden을 transition 지연으로 걸어 클릭과 포커스가 막히게 해줘. 오버레이 빈 곳 클릭, "나중에" 버튼, Esc 키로 닫히게 하고, 열릴 때 첫 버튼으로 포커스를 옮기고 뒤 페이지에 inert를 걸어 포커스 트랩(Focus Trap)을 만든 뒤 닫히면 원래 버튼으로 포커스를 돌려줘. backdrop-filter를 지원하지 않는 브라우저에서는 더 진한 반투명 배경만 쓰고, prefers-reduced-motion이면 이동 없이 페이드만 적용해줘.',
    html: `<main class="page">
  <p class="eyebrow">요금제</p>
  <h1>현재 플랜: Free</h1>
  <div class="usage">
    <span>이번 달 사용량</span>
    <b>82%</b>
  </div>
  <div class="meter"><i></i></div>
  <button class="btn primary wide" id="open">플랜 업그레이드</button>
</main>

<div class="overlay" id="overlay">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <span class="badge">PRO</span>
    <h2 id="modal-title">Pro 플랜으로 업그레이드</h2>
    <p>프로젝트 무제한, 팀원 초대, 우선 지원이 포함돼요. 첫 14일은 무료로 써 보세요.</p>
    <div class="actions">
      <button class="btn ghost" data-close>나중에</button>
      <button class="btn primary" data-close>14일 무료 체험</button>
    </div>
  </div>
</div>`,
    css: `.page {
  width: min(90vw, 420px);
  padding: clamp(20px, 4vw, 30px);
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--surface);
}
.eyebrow { margin: 0 0 6px; font-size: 12px; font-weight: 600; letter-spacing: .06em; color: var(--accent); }
h1 { margin: 0 0 18px; font-size: clamp(20px, 3.2vw, 26px); letter-spacing: -0.02em; }
.usage { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: var(--muted); }
.usage b { color: var(--fg); }
.meter { height: 8px; margin-bottom: 22px; overflow: hidden; border-radius: 99px; background: var(--line); }
.meter i { display: block; width: 82%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--accent), var(--accent-2)); }
.btn { padding: 11px 18px; border: 1px solid var(--line); border-radius: 10px; font: 600 14px/1 var(--font); cursor: pointer; }
.primary { background: var(--accent); border-color: transparent; color: #fff; }
.ghost { background: transparent; color: var(--fg); }
.wide { width: 100%; }

/* 오버레이: 반투명 + 배경 블러, opacity 하나로 함께 페이드 */
.overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 16px;
  background: color-mix(in srgb, var(--bg) 50%, transparent);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  opacity: 0;
  visibility: hidden;
  /* 닫힘: 페이드가 끝난 200ms 뒤 visibility를 꺼서 클릭·포커스 차단 */
  transition: opacity 200ms ease-in, visibility 0s 200ms;
}
.overlay.is-open { opacity: 1; visibility: visible; transition: opacity 320ms ease-out; }
.modal {
  width: min(100%, 380px);
  word-break: keep-all;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: 0 30px 80px -24px rgba(0, 0, 0, .5);
  transform: translateY(12px) scale(.94);
  transition: transform 200ms ease-in;
}
.overlay.is-open .modal { transform: none; transition: transform 320ms cubic-bezier(.22, 1, .36, 1); }
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 99px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
}
.modal h2 { margin: 12px 0 8px; font-size: 20px; letter-spacing: -0.02em; }
.modal p { margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: var(--muted); }
.actions { display: flex; justify-content: flex-end; gap: 8px; }

@media (prefers-reduced-motion: reduce) {
  .modal { transform: none; }
}`,
    js: `const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('open');
const page = document.querySelector('.page');

function setOpen(open, byUser) {
  overlay.classList.toggle('is-open', open);
  page.inert = open; // 열려 있는 동안 뒤 화면은 포커스·클릭 불가
  // 포커스 이동은 실제 사용자 조작일 때만
  if (byUser) (open ? overlay.querySelector('.primary') : openBtn).focus({ preventScroll: true });
}

openBtn.addEventListener('click', () => setOpen(true, true));
overlay.addEventListener('click', e => {
  // 오버레이 빈 곳 또는 닫기 버튼을 누르면 닫힘
  if (e.target === overlay || e.target.closest('[data-close]')) setOpen(false, true);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('is-open')) setOpen(false, true);
});

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
addEventListener('pointerdown', () => { auto = false; }, true);
function demo() {
  if (!auto) return;
  const open = !overlay.classList.contains('is-open');
  setOpen(open, false);
  setTimeout(demo, open ? 2400 : 1400);
}
setTimeout(demo, 600);`
  },
  {
    no: 83,
    id: 'side-drawer',
    cat: 'enter',
    name: '사이드 드로어',
    en: 'Side Drawer',
    level: 2,
    trigger: 'click',
    timing: '패널 420ms · 항목 스태거 60ms',
    desc: '오른쪽에서 패널이 미끄러져 들어온 뒤 안쪽 항목이 60ms 간격으로 뒤따라 들어오는 사이드 드로어입니다. 패널과 내용이 두 박자로 움직여 깊이감이 생깁니다.',
    use: '장바구니, 모바일 내비게이션, 필터·설정 패널',
    tech: ['CSS transition', 'transform', 'transition-delay'],
    terms: ['사이드 드로어 (Side Drawer)', '오프캔버스 메뉴 (Off-canvas Menu)', '스태거 애니메이션 (Staggered Animation)', '스크림 오버레이 (Scrim Overlay)'],
    prompt: '상단의 "장바구니" 버튼을 누르면 화면 오른쪽에서 사이드 드로어(Side Drawer)가 밀려 들어오게 만들어줘. 패널은 translateX(100%)에서 0으로 420ms cubic-bezier(.32,.72,0,1)로 들어오고, 뒤에는 검은 반투명 스크림(Scrim)이 280ms 페이드로 깔리게 해줘. 패널 안의 헤더, 상품 3개, 합계·결제 버튼은 패널이 거의 도착한 160ms 뒤부터 60ms 간격 스태거(Stagger)로 opacity 0·translateX(24px)에서 제자리로 따라 들어오게 해줘. 닫을 때는 패널만 280ms ease-in으로 빠르게 빠지고, 안쪽 항목은 패널이 다 사라진 뒤에 초기 상태로 돌아가도록 transition-delay를 걸어줘. 스크림 클릭, 닫기 버튼, Esc로 닫히게 하고, 열려 있는 동안 본문 스크롤을 잠그고 버튼의 aria-expanded를 갱신해줘.',
    html: `<div class="store">
  <header class="nav">
    <span class="logo">MOTION STORE</span>
    <button class="cart-btn" id="open" aria-controls="drawer" aria-expanded="false">장바구니 <b>3</b></button>
  </header>
  <div class="hero">
    <p class="eyebrow">가을 컬렉션</p>
    <h1>가볍게 걸치는<br>계절의 시작</h1>
    <div class="thumbs"><i></i><i></i><i></i></div>
  </div>
</div>

<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="장바구니">
  <header class="d-head stagger" style="--i:0">
    <h2>장바구니 3</h2>
    <button class="close" data-close aria-label="닫기"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  </header>
  <ul class="items">
    <li class="item stagger" style="--i:1"><i class="thumb"></i><div><b>울 블렌드 가디건</b><span>베이지 · M</span></div><em>59,000원</em></li>
    <li class="item stagger" style="--i:2"><i class="thumb t2"></i><div><b>코튼 와이드 팬츠</b><span>차콜 · 30</span></div><em>45,000원</em></li>
    <li class="item stagger" style="--i:3"><i class="thumb t3"></i><div><b>레더 미니 크로스백</b><span>블랙 · FREE</span></div><em>79,000원</em></li>
  </ul>
  <footer class="d-foot stagger" style="--i:4">
    <div class="total"><span>합계</span><b>183,000원</b></div>
    <button class="checkout">결제하기</button>
  </footer>
</aside>`,
    css: `.store { position: fixed; inset: 0; display: flex; flex-direction: column; }
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px clamp(16px, 4vw, 32px);
  border-bottom: 1px solid var(--line);
}
.logo { font-size: 13px; font-weight: 800; letter-spacing: .12em; }
.cart-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 8px 7px 14px;
  border: 1px solid var(--line);
  border-radius: 99px;
  background: var(--surface);
  color: var(--fg);
  font: 600 13px/1 var(--font);
  cursor: pointer;
}
.cart-btn b { min-width: 20px; height: 20px; display: grid; place-items: center; border-radius: 99px; background: var(--accent); color: #fff; font-size: 11px; }
.hero { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 clamp(16px, 4vw, 32px); word-break: keep-all; }
.eyebrow { margin: 0 0 8px; font-size: 12px; font-weight: 600; color: var(--accent); }
.hero h1 { margin: 0 0 20px; font-size: clamp(22px, 4vw, 38px); line-height: 1.2; letter-spacing: -0.03em; }
.thumbs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 520px; }
.thumbs i { height: clamp(60px, 22vh, 130px); border: 1px solid var(--line); border-radius: 14px; background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 40%, var(--surface)), var(--surface)); }
.thumbs i:nth-child(2) { background: linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 45%, var(--surface)), var(--surface)); }

.scrim { position: fixed; inset: 0; background: rgba(0, 0, 0, .4); opacity: 0; pointer-events: none; transition: opacity 280ms ease; }
.scrim.is-open { opacity: 1; pointer-events: auto; }
/* 닫힘: 280ms ease-in으로 빠르게 빠진 뒤 숨김 */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(86vw, 360px);
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--line);
  background: var(--surface);
  box-shadow: -24px 0 60px -30px rgba(0, 0, 0, .5);
  transform: translateX(100%);
  visibility: hidden;
  transition: transform 280ms cubic-bezier(.4, 0, 1, 1), visibility 0s 280ms;
}
.drawer.is-open { transform: none; visibility: visible; transition: transform 420ms cubic-bezier(.32, .72, 0, 1); }
/* 내부 항목: 패널이 사라진 뒤(280ms) 초기 상태로 복귀 */
.stagger { opacity: 0; transform: translateX(24px); transition: opacity 0s 280ms, transform 0s 280ms; }
/* 열림: 패널이 거의 도착한 160ms 뒤부터 60ms 간격으로 따라 들어옴 */
.drawer.is-open .stagger {
  opacity: 1;
  transform: none;
  transition: opacity 400ms ease-out, transform 400ms cubic-bezier(.22, 1, .36, 1);
  transition-delay: calc(160ms + var(--i) * 60ms);
}
.d-head { display: flex; align-items: center; justify-content: space-between; padding: 10px 18px; border-bottom: 1px solid var(--line); }
.d-head h2 { margin: 0; font-size: 16px; }
.close { width: 32px; height: 32px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 10px; background: transparent; color: var(--fg); cursor: pointer; }
.close svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.items { flex: 1; min-height: 0; overflow: auto; margin: 0; padding: 4px 18px; list-style: none; }
.item { display: grid; grid-template-columns: 34px 1fr auto; align-items: center; gap: 12px; padding: 6px 0; border-bottom: 1px solid var(--line); }
.thumb { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 40%, var(--surface))); }
.thumb.t2 { background: linear-gradient(135deg, var(--accent-2), color-mix(in srgb, var(--accent-2) 40%, var(--surface))); }
.thumb.t3 { background: linear-gradient(135deg, var(--muted), color-mix(in srgb, var(--muted) 30%, var(--surface))); }
.item b { display: block; font-size: 13px; font-weight: 600; }
.item span { font-size: 12px; color: var(--muted); }
.item em { font-size: 13px; font-style: normal; font-weight: 600; }
.d-foot { padding: 12px 18px 14px; border-top: 1px solid var(--line); }
.total { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
.checkout { width: 100%; padding: 12px; border: 0; border-radius: 12px; background: var(--accent); color: #fff; font: 700 14px/1 var(--font); cursor: pointer; }`,
    js: `const drawer = document.getElementById('drawer');
const scrim = document.getElementById('scrim');
const openBtn = document.getElementById('open');

function setOpen(open) {
  drawer.classList.toggle('is-open', open);
  scrim.classList.toggle('is-open', open);
  openBtn.setAttribute('aria-expanded', open);
}

openBtn.addEventListener('click', () => setOpen(true));
scrim.addEventListener('click', () => setOpen(false));
drawer.querySelector('[data-close]').addEventListener('click', () => setOpen(false));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') setOpen(false);
});

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
addEventListener('pointerdown', () => { auto = false; }, true);
function demo() {
  if (!auto) return;
  const open = !drawer.classList.contains('is-open');
  setOpen(open);
  setTimeout(demo, open ? 2600 : 1300);
}
setTimeout(demo, 600);`
  },
  {
    no: 84,
    id: 'toast-stack',
    cat: 'enter',
    name: '토스트 알림 스택',
    en: 'Stacked Toast Notifications',
    level: 2,
    trigger: 'click',
    timing: '진입 400ms · 4초 후 자동 닫힘',
    desc: '오른쪽 아래에서 올라온 토스트가 이전 알림을 뒤로 밀어 카드처럼 겹쳐 쌓고, 하단 진행 바가 다 줄면 스스로 사라집니다. 마우스를 올리면 목록으로 펼쳐지고 타이머가 멈춥니다.',
    use: '저장·복사 완료 알림, 업로드 결과, 실시간 이벤트 알림',
    tech: ['CSS transition', 'CSS @keyframes', 'animationend', 'aria-live'],
    terms: ['토스트 알림 (Toast Notification)', '스택 레이아웃 (Stacked Layout)', '자동 닫힘 (Auto Dismiss)', '진행 표시줄 (Progress Bar)'],
    prompt: '화면 오른쪽 아래에서 토스트 알림(Toast Notification)이 올라오고, 여러 개가 쌓이면 뒤로 겹쳐지는 Sonner 스타일 토스트 스택(Toast Stack)을 만들어줘. 새 토스트는 translateY(100% + 24px)·opacity 0에서 400ms cubic-bezier(.22,1,.36,1)로 올라오고, 이전 토스트는 순번 i마다 translateY(-12px × i)·scale(1 - 0.05 × i)로 뒤에 살짝 비치게 하되 3개를 넘는 것은 투명하게 숨겨줘. 각 토스트 하단에는 4초 동안 scaleX(1→0)으로 줄어드는 진행 바를 CSS 애니메이션으로 넣고, 그 animationend 이벤트에서 토스트를 페이드아웃·제거한 뒤 나머지 위치를 다시 계산해줘. 스택에 마우스를 올리면 진행 바를 animation-play-state: paused로 멈추고, 토스트를 실제 높이 + 10px 간격으로 펼쳐 모두 읽을 수 있게 하되 간격 사이에 투명한 가상 요소를 둬서 호버가 끊기지 않게 해줘. 컨테이너에는 aria-live="polite"를 달고, 모바일에서는 좌우 16px 여백을 둔 전체 너비로 표시해줘.',
    html: `<section class="settings">
  <h2>프로필 설정</h2>
  <div class="field"><span>이름</span><div class="input">김모션</div></div>
  <div class="field"><span>소개</span><div class="input">인터랙션 디자이너</div></div>
  <button class="btn">저장하기</button>
</section>
<ol class="toaster" aria-live="polite"></ol>`,
    css: `.settings {
  width: min(88vw, 400px);
  margin-bottom: 12vh;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
}
.settings h2 { margin: 0 0 14px; font-size: 18px; letter-spacing: -0.02em; }
.field { margin-bottom: 10px; }
.field span { display: block; margin-bottom: 5px; font-size: 12px; color: var(--muted); }
.input { padding: 10px 12px; border: 1px solid var(--line); border-radius: 10px; font-size: 14px; }
.btn { width: 100%; margin-top: 4px; padding: 12px; border: 0; border-radius: 10px; background: var(--accent); color: #fff; font: 600 14px/1 var(--font); cursor: pointer; }

/* 높이 0인 기준점: 토스트는 모두 이 아래쪽에 겹쳐 배치 */
.toaster {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: min(340px, calc(100vw - 32px));
  margin: 0;
  padding: 0;
  list-style: none;
}
.toast {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 10px;
  padding: 12px 14px 18px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  box-shadow: 0 14px 32px -14px rgba(0, 0, 0, .4);
  transform-origin: 50% 100%;
  transition: transform 400ms cubic-bezier(.22, 1, .36, 1), opacity 400ms ease;
}
/* 펼쳤을 때 토스트 사이 간격에서도 호버가 유지되도록 */
.toast::after { content: ''; position: absolute; left: 0; right: 0; bottom: 100%; height: 12px; }
.icon { width: 26px; height: 26px; display: grid; place-items: center; border-radius: 50%; background: color-mix(in srgb, var(--accent) 16%, transparent); color: var(--accent); }
.icon svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.toast b { display: block; margin: 3px 0 2px; font-size: 14px; font-weight: 600; }
.toast p { margin: 0; font-size: 13px; color: var(--muted); }
/* 남은 시간 표시: 4초 동안 줄어들고, 끝나면 animationend로 닫힘 */
.progress {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 7px;
  height: 3px;
  border-radius: 99px;
  background: var(--accent);
  transform-origin: left;
  animation: countdown 4s linear forwards;
}
.toaster:hover .progress { animation-play-state: paused; }
@keyframes countdown { to { transform: scaleX(0); } }`,
    js: `const toaster = document.querySelector('.toaster');
const MESSAGES = [
  ['변경사항을 저장했어요', '프로필 정보가 업데이트되었습니다.'],
  ['초대 링크를 복사했어요', '팀원에게 붙여넣어 공유하세요.'],
  ['파일 업로드 완료', '3분기_보고서.pdf · 2.4MB'],
  ['새 댓글이 달렸어요', '디자인 리뷰에 답글 2개가 있어요.']
];
const PEEK = 12, VISIBLE = 3;
let toasts = []; // [0]이 가장 최신
let expanded = false, count = 0;

// 접힘: 뒤로 12px씩 올라가며 5%씩 작아짐 / 펼침: 실제 높이대로 세로 목록
function layout() {
  let offset = 0;
  toasts.forEach((t, i) => {
    const y = expanded ? -offset : -i * PEEK;
    const s = expanded ? 1 : 1 - i * 0.05;
    t.style.transform = 'translateY(' + y + 'px) scale(' + s + ')';
    t.style.opacity = i < VISIBLE ? 1 : 0;
    t.style.zIndex = 10 - i;
    offset += t.offsetHeight + 10;
  });
}

function show() {
  const [title, text] = MESSAGES[count++ % MESSAGES.length];
  const t = document.createElement('li');
  t.className = 'toast';
  t.innerHTML = '<span class="icon"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span>' +
    '<div><b>' + title + '</b><p>' + text + '</p></div><i class="progress"></i>';
  t.style.transform = 'translateY(calc(100% + 24px))'; // 시작: 화면 아래 바깥
  t.style.opacity = 0;
  toaster.appendChild(t);
  toasts.unshift(t);
  // 진행 바가 끝나면 자동으로 닫힘 (호버 중엔 CSS로 일시정지)
  t.querySelector('.progress').addEventListener('animationend', () => dismiss(t));
  if (toasts.length > VISIBLE + 1) dismiss(toasts[toasts.length - 1]);
  t.getBoundingClientRect(); // 시작 위치를 먼저 반영해야 올라오는 트랜지션이 보임
  layout();
}

function dismiss(t) {
  if (!toasts.includes(t)) return;
  toasts = toasts.filter(x => x !== t);
  t.style.opacity = 0;
  t.style.transform += ' scale(.9)';
  setTimeout(() => t.remove(), 400);
  layout();
}

toaster.addEventListener('pointerenter', () => { expanded = true; layout(); });
toaster.addEventListener('pointerleave', () => { expanded = false; layout(); });
document.addEventListener('click', e => {
  if (!e.target.closest('.toast')) show();
});

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
addEventListener('pointerdown', () => { auto = false; }, true);
function demo() {
  if (!auto) return;
  show();
  setTimeout(demo, 1400 + Math.random() * 900);
}
setTimeout(demo, 600);`
  },
  {
    no: 85,
    id: 'accordion',
    cat: 'enter',
    name: '아코디언',
    en: 'Accordion',
    level: 1,
    trigger: 'click',
    timing: '360ms · grid-rows 0fr→1fr',
    desc: '질문을 누르면 답변이 실제 콘텐츠 높이만큼 부드럽게 열리고 화살표가 뒤집히는 FAQ 아코디언입니다. 높이 값을 몰라도 grid-template-rows 트릭으로 매끄럽게 전환됩니다.',
    use: 'FAQ, 상품 상세 정보, 설정 그룹, 필터 목록',
    tech: ['CSS grid-template-rows', 'CSS transition', 'aria-expanded'],
    terms: ['아코디언 (Accordion)', '높이 전환 (Height Transition)', '그리드 트랙 애니메이션 (grid-template-rows Transition)', '디스클로저 패턴 (Disclosure Pattern)'],
    prompt: 'FAQ 목록에서 질문을 누르면 답변이 부드럽게 펼쳐지는 아코디언(Accordion)을 만들어줘. 답변 래퍼를 display: grid로 두고 grid-template-rows를 0fr에서 1fr로 360ms cubic-bezier(.22,1,.36,1) 트랜지션해서 높이를 몰라도 콘텐츠 높이까지 정확히 열리게 하고, 안쪽 요소에는 overflow: hidden과 min-height: 0을 줘. 펼쳐질 때 오른쪽 셰브런(Chevron) 아이콘은 180도 회전하며 브랜드 포인트 컬러로 바뀌고, 답변 텍스트는 80ms 늦게 opacity 0→1, translateY(-6px)→0으로 페이드인되게 해줘. 한 번에 하나만 열리는 방식으로 다른 질문을 누르면 이전 항목은 동시에 닫히게 하고, 질문은 button 요소로 만들어 aria-expanded와 aria-controls를 갱신해줘. prefers-reduced-motion에서는 트랜지션 없이 즉시 열고 닫히게 해줘.',
    html: `<section class="faq">
  <h2>자주 묻는 질문</h2>
  <div class="item">
    <button class="q" aria-expanded="false" aria-controls="a1"><span>체험이 끝나면 자동 결제되나요?</span><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
    <div class="a" id="a1" role="region"><div class="a-inner"><p>아니요. 종료 3일 전에 알림을 드리고, 결제 수단을 직접 등록해야만 유료로 전환돼요.</p></div></div>
  </div>
  <div class="item">
    <button class="q" aria-expanded="false" aria-controls="a2"><span>팀원은 몇 명까지 초대하나요?</span><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
    <div class="a" id="a2" role="region"><div class="a-inner"><p>Pro 플랜은 10명까지, Team 플랜은 인원 제한 없이 초대할 수 있어요.</p></div></div>
  </div>
  <div class="item">
    <button class="q" aria-expanded="false" aria-controls="a3"><span>플랜은 언제든 바꿀 수 있나요?</span><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
    <div class="a" id="a3" role="region"><div class="a-inner"><p>네. 설정의 결제 메뉴에서 바로 바꿀 수 있고, 남은 기간 요금은 일할 계산돼요.</p></div></div>
  </div>
  <div class="item">
    <button class="q" aria-expanded="false" aria-controls="a4"><span>환불은 어떻게 받나요?</span><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
    <div class="a" id="a4" role="region"><div class="a-inner"><p>결제 후 7일 이내이고 사용 이력이 없다면 고객센터 채팅으로 전액 환불해 드려요.</p></div></div>
  </div>
</section>`,
    css: `.faq { width: min(92vw, 560px); word-break: keep-all; }
.faq h2 { margin: 0 0 10px; font-size: clamp(18px, 2.6vw, 24px); letter-spacing: -0.02em; }
.item { border-bottom: 1px solid var(--line); }
.q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 4px;
  border: 0;
  background: none;
  color: var(--fg);
  font: 600 clamp(14px, 1.8vw, 16px)/1.4 var(--font);
  text-align: left;
  cursor: pointer;
}
.q svg {
  flex: none;
  width: 18px;
  height: 18px;
  fill: none;
  stroke: var(--muted);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 360ms cubic-bezier(.22, 1, .36, 1), stroke 200ms;
}
/* 높이 0 → 콘텐츠 높이: grid-template-rows 0fr → 1fr */
.a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 360ms cubic-bezier(.22, 1, .36, 1); }
.a-inner { min-height: 0; overflow: hidden; }
.a p {
  margin: 0;
  padding: 0 4px 14px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--muted);
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 200ms ease, transform 200ms ease;
}
.item.is-open .a { grid-template-rows: 1fr; }
.item.is-open .a p {
  opacity: 1;
  transform: none;
  transition: opacity 300ms ease 80ms, transform 360ms cubic-bezier(.22, 1, .36, 1) 80ms;
}
.item.is-open .q svg { transform: rotate(180deg); stroke: var(--accent); }

@media (prefers-reduced-motion: reduce) {
  .faq * { transition: none !important; }
}`,
    js: `const items = [...document.querySelectorAll('.item')];

// 한 번에 하나만 열리는 방식: 누른 항목만 열고 나머지는 닫음
function toggle(item, force) {
  const open = force ?? !item.classList.contains('is-open');
  items.forEach(it => {
    const on = it === item && open;
    it.classList.toggle('is-open', on);
    it.querySelector('.q').setAttribute('aria-expanded', on);
  });
}

items.forEach(it => {
  it.querySelector('.q').addEventListener('click', () => toggle(it));
});

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true, step = 0;
addEventListener('pointerdown', () => { auto = false; }, true);
function demo() {
  if (!auto) return;
  toggle(items[step++ % items.length], true);
  setTimeout(demo, 2400);
}
setTimeout(demo, 600);`
  },
  {
    no: 86,
    id: 'flip-expand',
    cat: 'enter',
    name: '공유 요소 확장 (FLIP)',
    en: 'FLIP Shared Element Expand',
    level: 3,
    trigger: 'click',
    timing: 'FLIP 520ms · (.22,1,.36,1)',
    desc: '작은 카드가 정확히 그 자리에서 커지며 상세 화면이 되고, 닫으면 원래 카드 위치로 되돌아갑니다. 화면이 끊기지 않고 이어져 사용자가 맥락을 잃지 않습니다.',
    use: '상품·여행 카드 상세, 갤러리 확대, 대시보드 위젯 확장',
    tech: ['FLIP', 'Web Animations API', 'getBoundingClientRect'],
    terms: ['FLIP 애니메이션 (First Last Invert Play)', '공유 요소 전환 (Shared Element Transition)', '컨테이너 트랜스폼 (Container Transform)', '역변환 (Inverse Transform)'],
    prompt: '여행 추천 카드 목록에서 카드를 누르면 그 카드가 제자리에서 커지며 상세 화면으로 바뀌는 공유 요소 전환(Shared Element Transition)을 FLIP 기법(First, Last, Invert, Play)으로 만들어줘. 먼저 카드의 getBoundingClientRect()를 기록하고(First), 상세 패널을 최종 위치에 띄운 뒤 다시 측정해서(Last), 두 사각형의 차이만큼 translate(dx, dy) scale(sx, sy)를 transform-origin: top left로 걸어 카드 자리로 되돌린 다음(Invert), Web Animations API로 transform: none까지 520ms cubic-bezier(.22,1,.36,1)로 재생해줘(Play). 스케일 때문에 모서리가 찌그러지지 않도록 시작 키프레임의 border-radius를 "14/sx px / 14/sy px"로 보정하고, 상세 본문은 늘어나는 동안 숨겼다가 220ms 뒤에 8px 아래에서 페이드인해줘. 닫기 버튼, 배경 클릭, Esc로 닫을 때는 본문을 먼저 120ms 만에 숨기고 같은 계산을 거꾸로 재생해 원래 카드 자리로 줄어들게 하며, 애니메이션 중에는 중복 클릭을 막아줘. prefers-reduced-motion이면 확장 모션 없이 짧은 페이드로만 열고 닫아줘.',
    html: `<section class="trips">
  <h2>이번 주말 추천 여행</h2>
  <div class="cards">
    <article class="card" tabindex="0" data-desc="성산에서 세화까지 이어지는 해안도로를 따라 카페와 오름을 천천히 둘러봐요." style="--cover: linear-gradient(160deg, var(--accent), color-mix(in srgb, var(--accent) 35%, var(--surface)))">
      <div class="cover"></div>
      <div class="info"><span class="tag">제주</span><h3>동쪽 해안 드라이브</h3><p>2박 3일 · 18만원부터</p></div>
    </article>
    <article class="card" tabindex="0" data-desc="경포 바다가 보이는 한옥에서 쉬고, 아침엔 커피거리를 걸어 보세요." style="--cover: linear-gradient(160deg, var(--accent-2), color-mix(in srgb, var(--accent-2) 35%, var(--surface)))">
      <div class="cover"></div>
      <div class="info"><span class="tag">강릉</span><h3>바다 앞 한옥 스테이</h3><p>1박 2일 · 12만원부터</p></div>
    </article>
    <article class="card" tabindex="0" data-desc="흰여울마을의 바다 골목과 오래된 조선소 카페를 잇는 산책 코스예요." style="--cover: linear-gradient(160deg, color-mix(in srgb, var(--accent) 55%, var(--accent-2)), color-mix(in srgb, var(--accent) 30%, var(--surface)))">
      <div class="cover"></div>
      <div class="info"><span class="tag">부산</span><h3>영도 골목 산책</h3><p>1박 2일 · 9만원부터</p></div>
    </article>
  </div>
</section>

<div class="scrim"></div>
<article class="detail" role="dialog" aria-modal="true" aria-label="여행 상세">
  <div class="detail-cover"></div>
  <button class="close" aria-label="닫기"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  <div class="detail-body">
    <span class="tag"></span>
    <h3></h3>
    <p class="meta"></p>
    <p class="desc"></p>
    <button class="book">예약하기</button>
  </div>
</article>`,
    css: `/* 낮은 화면에서도 카드가 잘리지 않도록 높이 기준으로 폭 제한 */
.trips { width: min(92vw, 860px, calc(4 * (100vh - 135px))); word-break: keep-all; }
.trips h2 { margin: 0 0 14px; font-size: clamp(17px, 2.4vw, 22px); letter-spacing: -0.02em; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(8px, 2vw, 16px); }
.card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card:hover { transform: translateY(-3px); box-shadow: 0 18px 36px -22px rgba(0, 0, 0, .5); }
.cover, .detail-cover { position: relative; overflow: hidden; background: var(--cover); }
.cover { aspect-ratio: 4 / 3; }
/* 사진 대신 해와 언덕 도형 */
.cover::before, .detail-cover::before {
  content: '';
  position: absolute;
  top: 16%;
  right: 14%;
  width: 24%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgba(255, 255, 255, .4);
}
.cover::after, .detail-cover::after {
  content: '';
  position: absolute;
  left: -10%;
  right: -10%;
  bottom: -30%;
  height: 60%;
  border-radius: 50%;
  background: rgba(255, 255, 255, .16);
}
.info { padding: clamp(8px, 1.6vw, 14px); }
.tag { display: inline-block; margin-bottom: 4px; font-size: 11px; font-weight: 700; color: var(--accent); }
.info h3 { margin: 0 0 4px; font-size: clamp(12px, 1.7vw, 16px); line-height: 1.35; }
.info p { margin: 0; font-size: 12px; color: var(--muted); }

.scrim { position: fixed; inset: 0; background: rgba(0, 0, 0, .45); opacity: 0; pointer-events: none; transition: opacity 400ms ease; }
.scrim.is-on { opacity: 1; pointer-events: auto; }
.detail {
  position: fixed;
  inset: 0;
  width: min(92vw, 680px);
  height: min(92vh, 400px);
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 20px;
  background: var(--surface);
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, .6);
  word-break: keep-all;
  transform-origin: top left; /* FLIP 계산을 왼쪽 위 기준으로 */
  visibility: hidden;
}
.detail.is-open { visibility: visible; }
/* 카드와 같은 세로 구성: 남는 높이를 커버가 채움 */
.detail-cover { flex: 1 1 40%; min-height: 56px; }
.detail-body { flex: none; padding: clamp(14px, 3vw, 28px); }
.detail-body h3 { margin: 0 0 6px; font-size: clamp(20px, 3.2vw, 30px); letter-spacing: -0.02em; }
.meta { margin: 0 0 8px; font-size: 12px; color: var(--muted); }
.desc { max-width: 40ch; margin: 0 0 14px; font-size: 13.5px; line-height: 1.55; }
.book { padding: 10px 18px; border: 0; border-radius: 10px; background: var(--accent); color: #fff; font: 600 14px/1 var(--font); cursor: pointer; }
.close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, .35);
  color: #fff;
  cursor: pointer;
}
.close svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }
/* 본문은 확장이 거의 끝날 때 떠오르고, 닫을 땐 먼저 사라짐 */
.detail-body, .close { opacity: 0; transform: translateY(8px); }
.detail.is-open .detail-body, .detail.is-open .close {
  opacity: 1;
  transform: none;
  transition: opacity 300ms ease 220ms, transform 400ms cubic-bezier(.22, 1, .36, 1) 220ms;
}
.detail.is-closing .detail-body, .detail.is-closing .close { opacity: 0; transition: opacity 120ms ease; }

@media (max-width: 480px) {
  .info p { display: none; }
}`,
    js: `const cards = [...document.querySelectorAll('.card')];
const detail = document.querySelector('.detail');
const scrim = document.querySelector('.scrim');
const EASE = 'cubic-bezier(.22, 1, .36, 1)';
const R = 14; // 카드 모서리 반경
let active = null, busy = false;

// Last(상세) 요소를 First(카드) 위치·크기로 되돌리는 역변환 키프레임
function inverted(first, last) {
  const sx = first.width / last.width;
  const sy = first.height / last.height;
  return {
    transform: 'translate(' + (first.left - last.left) + 'px, ' + (first.top - last.top) + 'px) scale(' + sx + ', ' + sy + ')',
    borderRadius: R / sx + 'px / ' + R / sy + 'px' // 스케일로 찌그러지는 모서리 보정
  };
}
const settled = { transform: 'none', borderRadius: '20px' };

function open(card) {
  if (busy || active) return;
  busy = true;
  active = card;
  // 카드 내용을 상세 화면에 채움
  detail.style.setProperty('--cover', getComputedStyle(card).getPropertyValue('--cover'));
  detail.querySelector('.tag').textContent = card.querySelector('.tag').textContent;
  detail.querySelector('h3').textContent = card.querySelector('h3').textContent;
  detail.querySelector('.meta').textContent = card.querySelector('.info p').textContent;
  detail.querySelector('.desc').textContent = card.dataset.desc;

  const first = card.getBoundingClientRect(); // First
  detail.classList.add('is-open');
  const last = detail.getBoundingClientRect(); // Last
  card.style.visibility = 'hidden';
  scrim.classList.add('is-on');
  // Invert → Play
  detail.animate([inverted(first, last), settled], { duration: 520, easing: EASE })
    .finished.then(() => { busy = false; });
}

function close() {
  if (busy || !active) return;
  busy = true;
  const card = active;
  detail.classList.add('is-closing');
  scrim.classList.remove('is-on');
  const anim = detail.animate(
    [settled, inverted(card.getBoundingClientRect(), detail.getBoundingClientRect())],
    { duration: 440, easing: EASE, fill: 'forwards' }
  );
  anim.finished.then(() => {
    card.style.visibility = '';
    detail.classList.remove('is-open', 'is-closing');
    anim.cancel();
    active = null;
    busy = false;
  });
}

cards.forEach(card => {
  card.addEventListener('click', () => open(card));
  card.addEventListener('keydown', e => { if (e.key === 'Enter') open(card); });
});
scrim.addEventListener('click', close);
detail.querySelector('.close').addEventListener('click', close);
document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true, n = 0;
addEventListener('pointerdown', () => { auto = false; }, true);
function demo() {
  if (!auto) return;
  const opening = !active;
  if (opening) open(cards[n++ % cards.length]);
  else close();
  setTimeout(demo, opening ? 2600 : 1400);
}
setTimeout(demo, 600);`
  },
  {
    no: 87,
    id: 'circle-reveal',
    cat: 'enter',
    name: '원형 클립패스 전환',
    en: 'Circular Clip-path Reveal',
    level: 2,
    trigger: 'click',
    timing: '700ms · clip-path circle()',
    desc: '누른 지점에서 새 테마가 원형으로 퍼져 나가며 화면 전체를 덮는 테마 전환입니다. 색이 한 번에 바뀌는 것보다 전환의 출발점이 분명하게 느껴집니다.',
    use: '다크 모드 토글, 테마·브랜드 컬러 전환, 모드 변경',
    tech: ['CSS clip-path', 'Web Animations API', 'View Transitions API (대안)'],
    terms: ['원형 리빌 (Circular Reveal)', '클립패스 애니메이션 (Clip-path Animation)', '뷰 트랜지션 (View Transitions API)', '테마 전환 (Theme Switching)'],
    prompt: '테마 전환 버튼(또는 화면 아무 곳)을 누르면 누른 지점에서 새 테마가 원형으로 퍼져 나가며 화면을 덮는 원형 클립패스 전환(Circular Clip-path Reveal)을 만들어줘. 현재 화면 위에 다음 테마 클래스를 적용한 복제 레이어를 겹치고, clip-path를 circle(0 at x y)에서 circle(R at x y)로 700ms cubic-bezier(.65,0,.35,1) 동안 키워줘. 반지름 R은 클릭 좌표에서 가장 먼 화면 모서리까지의 거리(Math.hypot)로 계산하고, 애니메이션이 끝나면 실제 문서의 테마를 바꾼 뒤 레이어를 제거해줘. 색상은 CSS 변수 토큰으로 관리해 클래스 하나로 테마 전체가 바뀌게 하고, 키보드로 눌렀을 때는 버튼 중심에서 원이 시작되게 해줘. 대안으로 View Transitions API를 지원하는 브라우저에서는 document.startViewTransition() 안에서 테마를 바꾸고 ::view-transition-new(root)에 같은 clip-path 애니메이션을 거는 방식도 적용해줘. 전환 중 중복 클릭은 무시하고, prefers-reduced-motion에서는 애니메이션 없이 즉시 바꿔줘.',
    html: `<div class="app">
  <header class="top">
    <span class="logo">MOTION</span>
    <button class="toggle" aria-label="테마 전환">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z"/></svg>
    </button>
  </header>
  <main class="main">
    <p class="eyebrow">화면 설정</p>
    <h1>밤에도 눈이 편한 화면</h1>
    <p class="lead">시스템 설정을 따르거나, 원하는 테마를 직접 골라 쓸 수 있어요.</p>
    <div class="stats">
      <div class="stat"><b>12</b><span>진행 프로젝트</span></div>
      <div class="stat"><b>86%</b><span>주간 목표</span></div>
      <div class="stat"><b>4.9</b><span>만족도</span></div>
    </div>
  </main>
</div>`,
    css: `/* 테마 토큰: 기본은 무대 테마, .is-inverted는 반전 테마 */
.app {
  --t-bg: var(--bg);
  --t-surface: var(--surface);
  --t-fg: var(--fg);
  --t-muted: var(--muted);
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: var(--t-bg);
  color: var(--t-fg);
  word-break: keep-all;
}
.app.is-inverted {
  --t-bg: var(--fg);
  --t-surface: color-mix(in srgb, var(--fg) 90%, var(--bg));
  --t-fg: var(--bg);
  --t-muted: color-mix(in srgb, var(--bg) 60%, var(--fg));
}
.reveal-layer { pointer-events: none; }
.top { display: flex; align-items: center; justify-content: space-between; padding: 14px clamp(16px, 4vw, 32px); }
.logo { font-size: 13px; font-weight: 800; letter-spacing: .12em; }
.toggle {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--t-fg) 14%, transparent);
  border-radius: 12px;
  background: var(--t-surface);
  color: var(--t-fg);
  cursor: pointer;
}
.toggle svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; }
.toggle path { fill: currentColor; stroke: none; }
.is-inverted .toggle svg { transform: rotate(180deg); }
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 760px;
  padding: 0 clamp(16px, 5vw, 48px) 5vh;
}
.eyebrow { margin: 0 0 8px; font-size: 12px; font-weight: 600; letter-spacing: .06em; color: var(--accent); }
h1 { margin: 0 0 10px; font-size: clamp(24px, min(4.6vw, 8vh), 44px); line-height: 1.15; letter-spacing: -0.03em; }
.lead { max-width: 34ch; margin: 0 0 18px; font-size: clamp(13px, 1.6vw, 16px); line-height: 1.6; color: var(--t-muted); }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.stat {
  padding: clamp(10px, 2vw, 16px);
  border: 1px solid color-mix(in srgb, var(--t-fg) 10%, transparent);
  border-radius: 14px;
  background: var(--t-surface);
}
.stat b { display: block; font-size: clamp(18px, min(3vw, 5vh), 26px); letter-spacing: -0.02em; }
.stat span { font-size: 12px; color: var(--t-muted); }`,
    js: `const app = document.querySelector('.app');
const toggle = document.querySelector('.toggle');
let busy = false;

function switchTheme(x, y) {
  if (busy) return;
  busy = true;
  // 다음 테마를 입힌 복제본을 위에 겹침
  const layer = app.cloneNode(true);
  layer.classList.toggle('is-inverted');
  layer.classList.add('reveal-layer');
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);
  // 클릭 지점에서 가장 먼 모서리까지의 거리 = 최종 반지름
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const at = ' at ' + x + 'px ' + y + 'px)';
  layer.animate(
    { clipPath: ['circle(0px' + at, 'circle(' + r + 'px' + at] },
    { duration: 700, easing: 'cubic-bezier(.65, 0, .35, 1)' }
  ).finished.then(() => {
    app.classList.toggle('is-inverted'); // 실제 테마 교체 후 레이어 제거
    layer.remove();
    busy = false;
  });
}

document.addEventListener('click', e => {
  let x = e.clientX, y = e.clientY;
  if (!e.detail) {
    // 키보드로 누른 경우 버튼 중심에서 시작
    const b = toggle.getBoundingClientRect();
    x = b.left + b.width / 2;
    y = b.top + b.height / 2;
  }
  switchTheme(x, y);
});

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
addEventListener('pointerdown', () => { auto = false; }, true);
function demo() {
  if (!auto) return;
  switchTheme(innerWidth * (0.15 + Math.random() * 0.7), innerHeight * (0.15 + Math.random() * 0.7));
  setTimeout(demo, 2800);
}
setTimeout(demo, 600);`
  },
  {
    no: 88,
    id: 'curtain-wipe',
    cat: 'enter',
    name: '커튼 와이프 전환',
    en: 'Curtain Wipe Transition',
    level: 2,
    trigger: 'auto',
    timing: '2단계 와이프 · 각 520ms',
    desc: '컬러 패널 두 장이 화면을 가로질러 덮었다가 반대편으로 걷히며 새 페이지를 드러내는 2단계 전환입니다. 패널 뒤에서 내용이 바뀌어 전환이 극적이면서도 깔끔합니다.',
    use: '포트폴리오·에이전시 사이트, 페이지 라우팅, 인트로→메인 전환',
    tech: ['Web Animations API', 'transform: scaleX', 'async/await'],
    terms: ['페이지 전환 (Page Transition)', '와이프 전환 (Wipe Transition)', '트랜스폼 원점 (Transform Origin)', '2단계 전환 (Two-phase Transition)'],
    prompt: '페이지를 이동할 때 브랜드 컬러 패널이 화면을 가로질러 덮었다가 걷히면서 새 페이지를 보여주는 커튼 와이프 전환(Curtain Wipe Transition)을 만들어줘. 화면 전체를 덮는 고정 패널 2장(보조 컬러 뒤 패널, 브랜드 포인트 컬러 앞 패널)을 두고, 1단계에서는 transform-origin: left로 scaleX(0→1)을 520ms cubic-bezier(.76,0,.24,1)로 재생해 왼쪽부터 덮되 앞 패널을 90ms 늦게 출발시켜 두 겹이 보이게 해줘. 화면이 완전히 덮인 순간 콘텐츠와 내비게이션 활성 상태를 교체하고, 2단계에서는 transform-origin을 right로 바꿔 scaleX(1→0)으로 앞 패널부터 오른쪽으로 걷히게 해줘. 두 단계는 Web Animations API의 animation.finished 프로미스를 await로 이어 순서를 보장하고, 새 콘텐츠는 패널이 걷힐 때 16px 아래에서 떠오르게 해줘. 전환 중에는 추가 이동 요청을 무시하고, prefers-reduced-motion에서는 패널 없이 짧은 크로스페이드로 대체해줘.',
    html: `<div class="site">
  <nav class="nav">
    <span class="logo">STUDIO M</span>
    <div class="links">
      <button class="is-active">소개</button>
      <button>서비스</button>
      <button>작업</button>
      <button>문의</button>
    </div>
  </nav>
  <main class="page" data-num="01">
    <p class="num">01</p>
    <h1>움직임을 설계하는 스튜디오</h1>
    <p class="lead">브랜드의 첫인상을 모션으로 만듭니다.</p>
  </main>
</div>
<div class="curtain back"></div>
<div class="curtain front"></div>`,
    css: `.site { position: fixed; inset: 0; display: flex; flex-direction: column; }
.nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px clamp(16px, 4vw, 36px); }
.logo { font-size: 12px; font-weight: 800; letter-spacing: .14em; white-space: nowrap; }
.links { display: flex; gap: 2px; }
.links button {
  padding: 6px clamp(6px, 1.4vw, 12px);
  border: 0;
  border-radius: 8px;
  background: none;
  color: var(--muted);
  font: 500 13px/1.2 var(--font);
  cursor: pointer;
}
.links button.is-active { background: var(--surface); color: var(--fg); }
.page {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 clamp(16px, 6vw, 72px) 6vh;
  word-break: keep-all;
}
/* 배경의 큰 외곽선 숫자 */
.page::after {
  content: attr(data-num);
  position: absolute;
  z-index: -1;
  right: clamp(8px, 4vw, 48px);
  bottom: -0.1em;
  font-size: clamp(120px, 28vw, 300px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--line);
  pointer-events: none;
}
.num { margin: 0 0 10px; font-size: 13px; font-weight: 700; letter-spacing: .1em; color: var(--accent); }
.page h1 { max-width: 12em; margin: 0 0 12px; font-size: clamp(26px, 5.4vw, 56px); line-height: 1.12; letter-spacing: -0.035em; }
.lead { max-width: 32ch; margin: 0; font-size: clamp(14px, 1.7vw, 17px); line-height: 1.6; color: var(--muted); }
/* 새 페이지 콘텐츠: 패널이 걷힐 때 16px 아래에서 떠오름 */
.page.is-new > * { animation: rise 600ms cubic-bezier(.22, 1, .36, 1) both; }
.page.is-new .num { animation-delay: 160ms; }
.page.is-new h1 { animation-delay: 220ms; }
.page.is-new .lead { animation-delay: 280ms; }
@keyframes rise { from { opacity: 0; transform: translateY(16px); } }
.curtain { position: fixed; inset: 0; transform: scaleX(0); pointer-events: none; }
.back { background: var(--accent-2); }
.front { background: var(--accent); }`,
    js: `const PAGES = [
  { title: '움직임을 설계하는 스튜디오', lead: '브랜드의 첫인상을 모션으로 만듭니다.' },
  { title: '브랜드 모션 가이드 제작', lead: '로고부터 화면 전환까지 하나의 규칙으로 묶어 드려요.' },
  { title: '최근 프로젝트 24건', lead: '금융, 커머스, 교육 서비스의 인터페이스 모션을 맡았어요.' },
  { title: '함께 만들어 볼까요?', lead: '프로젝트 이야기를 편하게 남겨 주세요.' }
];
const page = document.querySelector('.page');
const links = [...document.querySelectorAll('.links button')];
const back = document.querySelector('.back');
const front = document.querySelector('.front');
const EASE = 'cubic-bezier(.76, 0, .24, 1)';
let current = 0, busy = false;

// transform-origin을 바꿔 가며 scaleX로 패널을 펼치거나 접음
function wipe(el, from, to, origin, delay) {
  el.style.transformOrigin = origin;
  return el.animate(
    [{ transform: 'scaleX(' + from + ')' }, { transform: 'scaleX(' + to + ')' }],
    { duration: 520, delay: delay, easing: EASE, fill: 'forwards' }
  ).finished;
}

function render(i) {
  const num = '0' + (i + 1);
  page.dataset.num = num;
  page.querySelector('.num').textContent = num;
  page.querySelector('h1').textContent = PAGES[i].title;
  page.querySelector('.lead').textContent = PAGES[i].lead;
  links.forEach((l, j) => l.classList.toggle('is-active', j === i));
  page.classList.remove('is-new');
  void page.offsetWidth; // 떠오르는 애니메이션 재시작
  page.classList.add('is-new');
}

async function go(i) {
  if (busy || i === current) return;
  busy = true;
  // 1단계: 왼쪽부터 덮기 (뒤 패널 → 앞 패널)
  wipe(back, 0, 1, 'left', 0);
  await wipe(front, 0, 1, 'left', 90);
  // 화면이 완전히 가려진 순간 콘텐츠 교체
  current = i;
  render(i);
  // 2단계: 오른쪽으로 걷히며 새 페이지 공개 (앞 패널 → 뒤 패널)
  wipe(front, 1, 0, 'right', 60);
  await wipe(back, 1, 0, 'right', 150);
  busy = false;
}

links.forEach((l, j) => l.addEventListener('click', () => go(j)));

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
setInterval(() => go((current + 1) % PAGES.length), 3200);`
  },
  {
    no: 89,
    id: 'list-shuffle',
    cat: 'enter',
    name: '리스트 셔플 (FLIP)',
    en: 'FLIP List Reorder',
    level: 3,
    trigger: 'click',
    timing: 'FLIP 600ms · 2.5초마다 재정렬',
    desc: '순위가 바뀔 때 각 항목이 순간이동하지 않고 새 자리까지 미끄러지듯 이동하는 재정렬 모션입니다. 어떤 항목이 오르고 내렸는지 눈으로 따라갈 수 있습니다.',
    use: '실시간 랭킹, 리더보드, 정렬·필터 가능한 목록, 칸반 보드',
    tech: ['FLIP', 'Web Animations API', 'getBoundingClientRect'],
    terms: ['FLIP 애니메이션 (First Last Invert Play)', '리스트 재정렬 (List Reordering)', '레이아웃 애니메이션 (Layout Animation)', '레이아웃 스래싱 (Layout Thrashing)'],
    prompt: '실시간 판매 랭킹 목록에서 판매량이 바뀌어 순위가 재정렬될 때 각 항목이 새 자리로 부드럽게 미끄러지는 FLIP 리스트 재정렬(FLIP List Reorder)을 만들어줘. 정렬 직전에 모든 행의 getBoundingClientRect().top을 기록하고(First), 데이터를 판매량 내림차순으로 정렬해 appendChild로 DOM 순서를 바꾼 뒤 다시 측정해서(Last), 그 차이만큼 translateY(dy)에서 0으로 600ms cubic-bezier(.22,1,.36,1) 동안 Web Animations API로 재생해줘(Invert, Play). 측정은 모든 DOM 쓰기가 끝난 뒤 한 번에 읽어서 레이아웃 스래싱(Layout Thrashing)을 피하고, 위로 올라가는 행은 z-index를 올려 다른 행 위로 지나가게 해줘. 순위 숫자, 판매량, 막대 그래프(scaleX 600ms), 상승·하락 표시(▲2, ▼1)도 함께 갱신해줘. 이동 중에 다시 정렬되면 현재 보이는 위치를 First로 삼고 기존 애니메이션을 cancel()해서 튀지 않게 해줘.',
    html: `<section class="board">
  <header class="head">
    <div>
      <h2>실시간 판매 랭킹</h2>
      <p>최근 1시간 기준</p>
    </div>
    <button class="refresh" aria-label="순위 갱신">
      <svg viewBox="0 0 24 24"><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4h-4"/></svg>
    </button>
  </header>
  <ol class="list"></ol>
</section>`,
    css: `.board {
  width: min(92vw, 520px);
  padding: clamp(12px, 3vh, 22px) clamp(14px, 3vw, 22px);
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--surface);
}
.head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.head h2 { margin: 0; font-size: 17px; letter-spacing: -0.02em; }
.head p { margin: 2px 0 0; font-size: 12px; color: var(--muted); }
.refresh {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: transparent;
  color: var(--fg);
  cursor: pointer;
}
.refresh svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 600ms cubic-bezier(.22, 1, .36, 1);
}
.list { display: grid; gap: 5px; margin: 0; padding: 0; list-style: none; }
.row {
  position: relative;
  display: grid;
  grid-template-columns: 20px 30px 1fr auto 30px;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--fg) 4%, var(--surface));
}
.rank { font-size: 15px; font-weight: 800; text-align: center; color: var(--muted); }
.row:first-child .rank { color: var(--accent); }
.thumb { width: 30px; height: 30px; border-radius: 9px; background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 40%, var(--surface))); }
.thumb.t1 { background: linear-gradient(135deg, var(--accent-2), color-mix(in srgb, var(--accent-2) 40%, var(--surface))); }
.thumb.t2 { background: linear-gradient(135deg, var(--muted), color-mix(in srgb, var(--muted) 30%, var(--surface))); }
.meta { min-width: 0; }
.meta b { display: block; overflow: hidden; font-size: 14px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; }
.bar { display: block; height: 4px; margin-top: 5px; overflow: hidden; border-radius: 99px; background: var(--line); }
.bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transform-origin: left;
  transform: scaleX(var(--p, 0));
  transition: transform 600ms cubic-bezier(.22, 1, .36, 1);
}
.score { font-size: 13px; font-variant-numeric: tabular-nums; color: var(--muted); }
.delta { font-size: 12px; font-weight: 700; text-align: right; color: var(--muted); }
.delta.up { color: var(--accent); }

@media (max-width: 380px) {
  .thumb { display: none; }
  .row { grid-template-columns: 20px 1fr auto 30px; }
}`,
    js: `const DATA = [
  { name: '무선 이어폰 Pro', score: 1284 },
  { name: '스마트 워치 S', score: 1102 },
  { name: '노이즈캔슬링 헤드폰', score: 968 },
  { name: '휴대용 보조배터리', score: 845 },
  { name: '기계식 키보드', score: 712 }
];
const list = document.querySelector('.list');
const icon = document.querySelector('.refresh svg');
let spins = 0;

DATA.forEach((d, i) => {
  d.el = document.createElement('li');
  d.el.className = 'row';
  d.el.innerHTML = '<span class="rank"></span><i class="thumb t' + (i % 3) + '"></i>' +
    '<div class="meta"><b>' + d.name + '</b><span class="bar"><i></i></span></div>' +
    '<span class="score"></span><span class="delta"></span>';
  list.appendChild(d.el);
});

function render(prevRank) {
  const max = DATA[0].score;
  DATA.forEach((d, i) => {
    const moved = prevRank.get(d) - i;
    const delta = d.el.querySelector('.delta');
    d.el.querySelector('.rank').textContent = i + 1;
    d.el.querySelector('.score').textContent = d.score.toLocaleString('ko-KR');
    d.el.querySelector('.bar i').style.setProperty('--p', d.score / max);
    delta.textContent = moved > 0 ? '▲' + moved : moved < 0 ? '▼' + -moved : '–';
    delta.className = 'delta' + (moved > 0 ? ' up' : '');
  });
}

function shuffle() {
  // First: 지금 보이는 위치 기록 (이동 중이면 그 위치 그대로)
  const first = new Map(DATA.map(d => [d, d.el.getBoundingClientRect().top]));
  const prevRank = new Map(DATA.map((d, i) => [d, i]));
  DATA.forEach(d => {
    d.el.getAnimations().forEach(a => a.cancel());
    d.score = Math.min(1800, Math.max(300, d.score + Math.round((Math.random() - 0.5) * 520)));
  });
  // 정렬 후 DOM 순서 변경 (쓰기만 먼저 모두 처리)
  DATA.sort((a, b) => b.score - a.score);
  DATA.forEach(d => list.appendChild(d.el));
  render(prevRank);
  // Last → Invert → Play (읽기는 한 번에)
  DATA.forEach(d => {
    const dy = first.get(d) - d.el.getBoundingClientRect().top;
    if (!dy) return;
    const z = dy > 0 ? 2 : 1; // 올라가는 행이 위로 지나가게
    d.el.animate(
      [{ transform: 'translateY(' + dy + 'px)', zIndex: z }, { transform: 'none', zIndex: z }],
      { duration: 600, easing: 'cubic-bezier(.22, 1, .36, 1)' }
    );
  });
  icon.style.transform = 'rotate(' + ++spins * 360 + 'deg)';
}

render(new Map(DATA.map((d, i) => [d, i])));
document.addEventListener('click', shuffle);

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let auto = true;
addEventListener('pointerdown', () => { auto = false; }, true);
function demo() {
  if (!auto) return;
  shuffle();
  setTimeout(demo, 2500);
}
setTimeout(demo, 600);`
  },
  {
    no: 90,
    id: 'auto-slider',
    cat: 'enter',
    name: '오토 슬라이드 캐러셀',
    en: 'Auto-advancing Story Carousel',
    level: 2,
    trigger: 'auto',
    timing: '3초 자동 넘김 · 600ms 슬라이드',
    desc: '3초마다 다음 장으로 넘어가고 상단 진행 바가 남은 시간을 보여주는 스토리형 캐러셀입니다. 손가락이나 마우스로 끌어서 넘기거나 누르고 있는 동안 멈출 수 있습니다.',
    use: '프로모션 배너, 온보딩 슬라이드, 스토리·하이라이트',
    tech: ['CSS transition', 'Web Animations API', 'Pointer Events'],
    terms: ['캐러셀 (Carousel)', '오토플레이 (Autoplay)', '스와이프 제스처 (Swipe Gesture)', '스토리 진행 바 (Story Progress Bar)'],
    prompt: '프로모션 배너 영역에 3초마다 자동으로 다음 장으로 넘어가는 오토 슬라이드 캐러셀(Auto-advancing Carousel)을 인스타그램 스토리처럼 만들어줘. 슬라이드를 가로 flex 트랙에 나란히 두고 translateX(-index × 100%)를 600ms cubic-bezier(.22,1,.36,1)로 트랜지션해서 넘기고, 상단에는 슬라이드 수만큼 진행 바(Progress Bar)를 두어 지난 장은 가득, 현재 장은 3초 동안 scaleX(0→1)로 선형으로 차오르게 해줘. 진행 바 애니메이션은 Web Animations API로 만들어 onfinish에서 다음 장으로 넘기고, 누르고 있는 동안에는 pause()로 멈춰줘. Pointer Events로 스와이프 제스처(Swipe Gesture)를 지원해서 드래그 중엔 트랜지션을 끄고 손가락을 따라 움직이다가 카드 너비의 18% 이상 끌면 이전·다음 장으로, 아니면 제자리로 돌아가게 하고, 짧게 탭하면 왼쪽 1/3은 이전 장, 나머지는 다음 장으로 넘겨줘. 첫·마지막 장 바깥으로 끌 때는 이동량을 35%로 줄여 저항감을 주고, touch-action: pan-y로 세로 스크롤은 살리며, 탭이 숨겨지면(visibilitychange) 자동 재생을 멈춰줘.',
    html: `<section class="story" aria-roledescription="carousel" aria-label="이번 주 혜택">
  <div class="bars"><span><i></i></span><span><i></i></span><span><i></i></span><span><i></i></span></div>
  <div class="track">
    <article class="slide s1"><div class="text"><p class="eyebrow">NEW ARRIVAL</p><h2>가을 신상 컬렉션</h2><p>최대 30% 할인 · 이번 주 일요일까지</p></div></article>
    <article class="slide s2"><div class="text"><p class="eyebrow">DELIVERY</p><h2>오늘 주문, 내일 도착</h2><p>오후 2시 전 주문하면 무료 배송</p></div></article>
    <article class="slide s3"><div class="text"><p class="eyebrow">MEMBERSHIP</p><h2>멤버십 첫 달 무료</h2><p>언제든 해지할 수 있어요</p></div></article>
    <article class="slide s4"><div class="text"><p class="eyebrow">EVENT</p><h2>친구 초대하고 5천원</h2><p>초대한 사람도, 받은 사람도 적립</p></div></article>
  </div>
</section>`,
    css: `.story {
  position: relative;
  width: min(92vw, 760px);
  height: min(84vh, 420px);
  overflow: hidden;
  border-radius: 22px;
  background: var(--surface);
  box-shadow: 0 30px 70px -36px rgba(0, 0, 0, .6);
  touch-action: pan-y; /* 세로 스크롤은 브라우저에 맡김 */
  -webkit-user-select: none;
  user-select: none;
  cursor: grab;
}
.story.is-dragging { cursor: grabbing; }
.bars { position: absolute; z-index: 2; top: 14px; left: 14px; right: 14px; display: flex; gap: 6px; }
.bars span { flex: 1; height: 3px; overflow: hidden; border-radius: 99px; background: rgba(255, 255, 255, .35); }
.bars i { display: block; height: 100%; background: #fff; transform-origin: left; transform: scaleX(0); }
.track { display: flex; height: 100%; transition: transform 600ms cubic-bezier(.22, 1, .36, 1); }
.story.is-dragging .track { transition: none; }
.slide {
  position: relative;
  flex: 0 0 100%;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: clamp(20px, 4vw, 36px);
  color: #fff;
}
/* 사진 대신 그라디언트 + 빛 번짐 + 하단 그림자로 이미지 느낌 */
.slide::before {
  content: '';
  position: absolute;
  top: -20%;
  right: -12%;
  width: 70%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, .35), transparent 65%);
}
.slide::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 35%, rgba(0, 0, 0, .55)); }
.s1 { background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 40%, #000)); }
.s2 { background: linear-gradient(160deg, var(--accent-2), color-mix(in srgb, var(--accent-2) 50%, var(--accent))); }
.s3 { background: linear-gradient(200deg, color-mix(in srgb, var(--accent) 60%, var(--accent-2)), color-mix(in srgb, var(--accent) 70%, #000)); }
.s4 { background: linear-gradient(120deg, color-mix(in srgb, var(--accent-2) 70%, #000), var(--accent)); }
.text { position: relative; z-index: 1; word-break: keep-all; }
.eyebrow { margin: 0 0 8px; font-size: 11px; font-weight: 700; letter-spacing: .14em; opacity: .85; }
.slide h2 { margin: 0 0 6px; font-size: clamp(22px, 4.4vw, 40px); letter-spacing: -0.03em; }
.text p:last-child { margin: 0; font-size: clamp(13px, 1.6vw, 16px); opacity: .9; }`,
    js: `const story = document.querySelector('.story');
const track = story.querySelector('.track');
const fills = [...story.querySelectorAll('.bars i')];
const N = fills.length, DURATION = 3000;
let index = 0, timer = null;

// 해당 장으로 이동하고, 그 장의 진행 바를 3초 동안 채운 뒤 다음 장으로
function go(i) {
  index = (i + N) % N;
  track.style.transform = 'translateX(' + -index * 100 + '%)';
  fills.forEach((f, j) => {
    f.getAnimations().forEach(a => a.cancel());
    f.style.transform = 'scaleX(' + (j < index ? 1 : 0) + ')';
  });
  timer = fills[index].animate(
    [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
    { duration: DURATION, easing: 'linear', fill: 'forwards' }
  );
  timer.onfinish = () => go(index + 1);
}

function snapBack() {
  track.style.transform = 'translateX(' + -index * 100 + '%)';
  timer.play();
}

// 드래그·스와이프: 누르는 동안 진행 바 일시정지
let startX = 0, dx = 0, downAt = 0, dragging = false;
story.addEventListener('pointerdown', e => {
  dragging = true;
  startX = e.clientX;
  dx = 0;
  downAt = performance.now();
  story.classList.add('is-dragging');
  story.setPointerCapture(e.pointerId);
  timer.pause();
});
story.addEventListener('pointermove', e => {
  if (!dragging) return;
  dx = e.clientX - startX;
  // 첫·마지막 장 바깥으로는 35%만 따라와 저항감을 줌
  const edge = (index === 0 && dx > 0) || (index === N - 1 && dx < 0);
  track.style.transform = 'translateX(calc(' + -index * 100 + '% + ' + (edge ? dx * 0.35 : dx) + 'px))';
});
function release(e) {
  if (!dragging) return;
  dragging = false;
  story.classList.remove('is-dragging');
  const w = story.clientWidth;
  const tap = Math.abs(dx) < 6 && performance.now() - downAt < 250;
  if (e.type === 'pointercancel') snapBack(); // 세로 스크롤 등으로 취소됨
  else if (tap) go(e.clientX - story.getBoundingClientRect().left < w / 3 ? Math.max(0, index - 1) : index + 1);
  else if (dx < -w * 0.18 && index < N - 1) go(index + 1);
  else if (dx > w * 0.18 && index > 0) go(index - 1);
  else snapBack();
}
story.addEventListener('pointerup', release);
story.addEventListener('pointercancel', release);

// 탭이 숨겨지면 자동 재생 정지
document.addEventListener('visibilitychange', () => {
  if (document.hidden) timer.pause();
  else if (!dragging) timer.play();
});

go(0);`
  }
);
