window.MOTIONS = window.MOTIONS || [];
window.MOTIONS.push(
  {
    no: 38,
    id: 'scroll-reveal',
    cat: 'scroll',
    name: '스크롤 페이드 업',
    en: 'Scroll Reveal (Fade Up)',
    level: 1,
    trigger: 'scroll',
    timing: '600ms ease-out · 스태거 90ms',
    desc: '요소가 화면에 들어오는 순간 32px 아래에서 떠오르며 서서히 나타나는 가장 기본적인 스크롤 등장 효과입니다. 함께 들어온 카드끼리는 살짝 시차를 두고 차례로 올라옵니다.',
    use: '랜딩 페이지 기능 소개, 카드 목록, 블로그 본문 섹션',
    tech: ['IntersectionObserver', 'CSS transition'],
    terms: ['스크롤 리빌 (Scroll Reveal)', '페이드 업 (Fade Up)', '스태거 애니메이션 (Stagger Animation)', '교차 관찰자 (Intersection Observer)'],
    prompt: '랜딩 페이지의 섹션 제목과 기능 카드가 화면에 들어올 때 아래에서 떠오르며 나타나는 스크롤 리빌(Scroll Reveal) 효과를 만들어줘. 요소의 초기 상태는 opacity 0, translateY(32px)로 두고, IntersectionObserver(threshold [0, 0.15])로 15% 이상 보이는 순간 .is-in 클래스를 붙여 600ms 동안 opacity 1, translateY(0)으로 전환해줘(transform은 cubic-bezier(.22,1,.36,1), opacity는 ease-out). 같은 콜백에서 함께 들어온 요소끼리는 transition-delay를 90ms씩 늘려 스태거 애니메이션(Stagger Animation)으로 차례차례 올라오게 해줘. 요소가 화면 아래쪽으로 완전히 빠져나가면 클래스를 떼서 다시 내려올 때 또 재생되게 하고, 한 번만 재생하고 싶을 때를 위해 unobserve로 끝내는 옵션도 남겨줘. prefers-reduced-motion: reduce 환경에서는 이동 없이 opacity만 바뀌게 해줘.',
    html: `<main class="page">
  <header class="intro">
    <p class="eyebrow reveal">WORKSPACE</p>
    <h1 class="reveal">흩어진 업무를<br>하나의 흐름으로</h1>
    <p class="lead reveal">문서와 일정, 대화를 한곳에 모아 팀 전체가 같은 화면을 보며 일합니다.</p>
  </header>

  <section class="group">
    <h2 class="reveal">계획</h2>
    <div class="grid">
      <article class="card reveal"><span class="icon"></span><h3>로드맵</h3><p>분기 목표와 마일스톤을 하나의 타임라인으로 정리합니다.</p></article>
      <article class="card reveal"><span class="icon"></span><h3>스프린트 보드</h3><p>2주 단위 작업을 끌어다 놓기만 하면 일정이 맞춰집니다.</p></article>
      <article class="card reveal"><span class="icon"></span><h3>우선순위</h3><p>중요도와 마감일을 기준으로 할 일을 자동 정렬합니다.</p></article>
    </div>
  </section>

  <section class="group">
    <h2 class="reveal">협업</h2>
    <div class="grid">
      <article class="card reveal"><span class="icon"></span><h3>실시간 편집</h3><p>여러 명이 같은 문서를 동시에 고쳐도 충돌이 없습니다.</p></article>
      <article class="card reveal"><span class="icon"></span><h3>문장 코멘트</h3><p>문장 단위로 의견을 남기고 담당자를 바로 지정하세요.</p></article>
      <article class="card reveal"><span class="icon"></span><h3>알림 요약</h3><p>하루 한 번, 꼭 봐야 할 변경 사항만 모아 보내 드립니다.</p></article>
    </div>
  </section>

  <section class="group">
    <h2 class="reveal">자동화</h2>
    <div class="grid">
      <article class="card reveal"><span class="icon"></span><h3>반복 작업</h3><p>매주 같은 작업은 규칙 하나로 자동 생성됩니다.</p></article>
      <article class="card reveal"><span class="icon"></span><h3>승인 흐름</h3><p>결재가 필요한 문서는 담당자에게 순서대로 전달됩니다.</p></article>
      <article class="card reveal"><span class="icon"></span><h3>외부 연동</h3><p>메신저, 캘린더, 저장소와 클릭 한 번으로 연결됩니다.</p></article>
    </div>
  </section>

  <section class="group">
    <h2 class="reveal">분석</h2>
    <div class="grid">
      <article class="card reveal"><span class="icon"></span><h3>진행률</h3><p>팀별 완료율을 주간 그래프로 한눈에 확인합니다.</p></article>
      <article class="card reveal"><span class="icon"></span><h3>회의 리포트</h3><p>지난주 변경 사항을 회의용 요약 문서로 만들어 줍니다.</p></article>
      <article class="card reveal"><span class="icon"></span><h3>업무 부하</h3><p>한 사람에게 일이 몰리면 미리 알려 드립니다.</p></article>
    </div>
  </section>

  <section class="cta reveal">
    <h2>오늘부터 팀의 흐름을 정리해 보세요</h2>
    <button type="button">14일 무료 체험</button>
  </section>
</main>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
}
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 clamp(16px, 5vw, 48px);
}
.intro {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8vh 0;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .2em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(26px, 5.4vw, 48px);
  line-height: 1.2;
  letter-spacing: -.02em;
}
.lead {
  max-width: 420px;
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--muted);
}
.group { padding: 7vh 0; }
h2 {
  margin: 0 0 16px;
  font-size: clamp(20px, 3vw, 26px);
  letter-spacing: -.01em;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}
.card {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
}
.icon {
  display: block;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.card:nth-child(2) .icon { border-radius: 50%; }
.card:nth-child(3) .icon { border-radius: 10px 50%; }
.card h3 { margin: 16px 0 6px; font-size: 16px; }
.card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--muted);
}
.cta {
  padding: 14vh 0 22vh;
  text-align: center;
}
.cta button {
  margin-top: 6px;
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font: inherit;
  font-weight: 600;
}

/* 핵심: 숨겨 둔 초기 상태에서 .is-in이 붙으면 제자리로 */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 600ms ease-out, transform 600ms cubic-bezier(.22, 1, .36, 1);
}
.reveal.is-in {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .reveal { transform: none; }
}`,
    js: `// 15% 이상 보이면 등장, 화면 아래쪽으로 완전히 벗어나면 초기화
const io = new IntersectionObserver((entries) => {
  let order = 0;
  entries.forEach((entry) => {
    const el = entry.target;
    if (entry.intersectionRatio >= 0.15) {
      // 같은 콜백에서 함께 들어온 요소끼리 90ms씩 늦춰 스태거
      el.style.transitionDelay = order++ * 90 + 'ms';
      el.classList.add('is-in');
    } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
      // 위로 지나간 요소는 그대로 두고, 아래로 빠진 요소만 되돌려 다시 재생
      el.style.transitionDelay = '0ms';
      el.classList.remove('is-in');
    }
  });
}, { threshold: [0, 0.15] });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoOn = true, autoY = 0, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) { holdUntil = 0; autoY = 0; scrollTo(0, 0); }
  } else {
    autoY = Math.min(autoY + dt * 0.075, max); // 약 1.2px/프레임
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  },
  {
    no: 39,
    id: 'scroll-progress',
    cat: 'scroll',
    name: '스크롤 진행 바',
    en: 'Scroll Progress Indicator',
    level: 1,
    trigger: 'scroll',
    timing: '스크롤 연동 · rAF 스로틀',
    desc: '글을 얼마나 읽었는지 화면 맨 위의 얇은 막대와 모서리의 원형 퍼센트 배지로 보여 줍니다. 스크롤과 1:1로 움직여 남은 분량을 직관적으로 짐작할 수 있습니다.',
    use: '블로그·뉴스 아티클, 문서 페이지, 긴 약관·가이드',
    tech: ['requestAnimationFrame', 'CSS transform', 'SVG stroke-dashoffset'],
    terms: ['스크롤 진행 표시기 (Scroll Progress Indicator)', '읽기 진행률 (Reading Progress)', '원형 진행 링 (Circular Progress Ring)', '스크롤 연동 애니메이션 (Scroll-linked Animation)'],
    prompt: '긴 아티클 페이지 맨 위에 스크롤 진행률을 보여주는 높이 3px의 고정 진행 바(Reading Progress Bar)를 만들어줘. 진행률은 scrollY ÷ (scrollHeight - innerHeight)로 0~1 값을 구하고, 바는 width 대신 transform: scaleX(진행률)과 transform-origin: left로 늘려 리플로우 없이 움직이게 하고 색은 브랜드 포인트 컬러에서 보조 컬러로 가는 가로 그라디언트로 칠해줘. 오른쪽 아래에는 지름 52px 원형 배지를 두고, SVG 원의 stroke-dasharray를 둘레(2πr)로 설정한 뒤 stroke-dashoffset을 둘레 × (1 - 진행률)로 줄여 링이 차오르게 하고 가운데에 반올림한 퍼센트 숫자를 보여줘. scroll 이벤트는 passive로 등록하고 requestAnimationFrame으로 스로틀해 프레임당 한 번만 계산하고, 진행률이 2% 미만이면 배지를 300ms 페이드로 숨겨줘. CSS animation-timeline: scroll()은 아직 브라우저 지원이 고르지 않으니 JS 방식을 기본으로 하고, 창 크기가 바뀌어 문서 높이가 달라지면 다시 계산해줘.',
    html: `<div class="progress" aria-hidden="true"><span class="bar"></span></div>

<article class="post">
  <p class="eyebrow">DESIGN NOTE · 6분 읽기</p>
  <h1>좋은 인터페이스는<br>기다림까지 설계한다</h1>
  <p class="meta">김서연 · 프로덕트 디자이너 · 2026년 9월 18일</p>

  <p>버튼을 누른 뒤 화면이 반응하기까지의 짧은 공백은 생각보다 많은 것을 말해 줍니다. 0.1초 안에 반응이 오면 사람들은 즉각적이라고 느끼고, 1초가 넘어가면 흐름이 끊겼다고 느낍니다. 그래서 우리는 속도만큼이나 기다리는 순간의 모습에 공을 들였습니다.</p>

  <h2>진행 상황을 숨기지 않기</h2>
  <p>긴 작업일수록 지금 어디쯤 와 있는지 보여 주는 것이 중요합니다. 진행 바는 남은 양을 숫자로 말하지 않아도 끝을 짐작하게 만들고, 그 짐작이 불안을 줄여 줍니다. 이 글 맨 위의 얇은 막대도 같은 역할을 합니다.</p>
  <p>다만 표시가 실제보다 빠르게 차오르다 끝에서 멈춰 버리면 오히려 신뢰를 잃습니다. 화면의 움직임이 실제 진행과 어긋나지 않도록, 가능하면 측정할 수 있는 값에 직접 연결하는 편이 좋습니다.</p>

  <blockquote>사람들은 속도를 재지 않습니다. 기다림이 얼마나 길게 느껴졌는지를 기억합니다.</blockquote>

  <h2>움직임에 이유를 담기</h2>
  <p>모든 애니메이션에는 목적이 있어야 합니다. 새 항목이 어디서 왔는지, 닫힌 패널이 어디로 갔는지 알려 주는 움직임은 화면 구조를 이해하도록 돕습니다. 반대로 이유 없는 움직임은 금세 피로해집니다.</p>

  <figure class="chart">
    <div class="bars">
      <span style="--h: 92%"></span>
      <span style="--h: 70%"></span>
      <span style="--h: 50%"></span>
      <span style="--h: 38%"></span>
      <span style="--h: 30%"></span>
    </div>
    <figcaption>그림 1. 전환 시간이 짧아질수록 줄어드는 체감 대기 시간</figcaption>
  </figure>

  <p>우리 팀은 새로운 전환 효과를 넣을 때마다 세 가지를 묻습니다. 이 움직임이 없으면 사용자가 헷갈릴까? 300ms 안에 끝나는가? 여러 번 봐도 거슬리지 않는가? 하나라도 아니라면 과감히 뺍니다.</p>
  <p>예를 들어 목록에 새 항목이 추가될 때는 위에서 살짝 밀려 내려오게, 삭제될 때는 빈자리가 부드럽게 메워지게 만듭니다. 사용자는 움직임을 의식하지 않지만, 화면이 갑자기 바뀌었다는 당혹감은 사라집니다.</p>

  <h2>작은 디테일이 쌓여 신뢰가 된다</h2>
  <p>스크롤 진행 바, 로딩 스켈레톤, 버튼의 눌림 효과처럼 사소해 보이는 요소는 따로 떼어 보면 눈에 잘 띄지 않습니다. 하지만 이런 디테일이 모여 제품 전체가 단단하게 만들어졌다는 인상을 줍니다.</p>
  <p>다음 글에서는 실제 프로젝트에서 쓰는 모션 가이드와 토큰 구조를 공유하겠습니다. 팀에 맞는 기준을 세우는 데 작은 출발점이 되길 바랍니다.</p>
</article>

<div class="badge" aria-hidden="true">
  <svg viewBox="0 0 48 48">
    <circle class="track" cx="24" cy="24" r="21"></circle>
    <circle class="ring" cx="24" cy="24" r="21"></circle>
  </svg>
  <span class="pct">0%</span>
</div>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
}
/* 상단 고정 진행 바: width 대신 scaleX로 늘림 */
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 3px;
  background: var(--line);
}
.bar {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transform: scaleX(0);
  transform-origin: 0 50%;
  will-change: transform;
}
.post {
  max-width: 640px;
  margin: 0 auto;
  padding: 12vh 20px 24vh;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .16em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 4.6vw, 38px);
  line-height: 1.25;
  letter-spacing: -.02em;
}
.meta {
  margin: 14px 0 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
  font-size: 13px;
  color: var(--muted);
}
.post > p:not(.eyebrow):not(.meta) {
  margin: 0 0 18px;
  font-size: 15px;
  line-height: 1.8;
}
h2 {
  margin: 40px 0 12px;
  font-size: clamp(18px, 2.6vw, 22px);
  letter-spacing: -.01em;
}
blockquote {
  margin: 32px 0;
  padding: 2px 0 2px 18px;
  border-left: 3px solid var(--accent);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.6;
}
.chart {
  margin: 28px 0;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
}
.bars {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 110px;
}
.bars span {
  flex: 1;
  height: var(--h);
  border-radius: 6px 6px 2px 2px;
  background: linear-gradient(var(--accent), var(--accent-2));
}
figcaption { margin-top: 12px; font-size: 12px; color: var(--muted); }
/* 원형 퍼센트 배지 */
.badge {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line), 0 10px 24px -10px rgba(0, 0, 0, .45);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 300ms ease, transform 300ms ease;
}
.badge.is-visible { opacity: 1; transform: none; }
.badge svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg); /* 12시 방향에서 시작 */
}
.track, .ring { fill: none; stroke-width: 3; }
.track { stroke: var(--line); }
.ring { stroke: var(--accent); stroke-linecap: round; }
.pct {
  font-size: 12px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}`,
    js: `const bar = document.querySelector('.bar');
const ring = document.querySelector('.ring');
const pct = document.querySelector('.pct');
const badge = document.querySelector('.badge');
const CIRC = 2 * Math.PI * 21; // 링 둘레 (r = 21)
ring.style.strokeDasharray = CIRC;

function update() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
  bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  ring.style.strokeDashoffset = (CIRC * (1 - p)).toFixed(2); // 둘레만큼 가렸다가 줄여 나감
  pct.textContent = Math.round(p * 100) + '%';
  badge.classList.toggle('is-visible', p > 0.02);
}

// 스크롤 이벤트를 rAF로 묶어 프레임당 한 번만 계산
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
update();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoOn = true, autoY = 0, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) { holdUntil = 0; autoY = 0; scrollTo(0, 0); }
  } else {
    autoY = Math.min(autoY + dt * 0.075, max); // 약 1.2px/프레임
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  },
  {
    no: 40,
    id: 'parallax-layers',
    cat: 'scroll',
    name: '패럴랙스 레이어',
    en: 'Parallax Layers',
    level: 2,
    trigger: 'scroll',
    timing: '스크롤 연동 · 속도 0.2 / 0.5 / 0.8',
    desc: '하늘, 해, 산 레이어가 스크롤할 때 서로 다른 속도로 움직여 평면 화면에 깊이감을 만듭니다. 먼 레이어일수록 느리게 움직여 풍경 속으로 걸어 들어가는 느낌을 줍니다.',
    use: '히어로 섹션, 여행·아웃도어 브랜드, 캠페인 페이지',
    tech: ['requestAnimationFrame', 'CSS transform', 'CSS clip-path'],
    terms: ['패럴랙스 스크롤 (Parallax Scrolling)', '다중 레이어 패럴랙스 (Multi-layer Parallax)', '깊이감 연출 (Depth Illusion)', '스크롤 연동 애니메이션 (Scroll-linked Animation)'],
    prompt: '히어로 섹션에 하늘, 해, 먼 산, 중간 산, 가까운 산 레이어를 absolute로 겹쳐 쌓고 스크롤할 때 레이어마다 다른 속도로 움직이는 패럴랙스 스크롤(Parallax Scrolling) 효과를 만들어줘. 각 레이어에 data-speed(하늘 0, 해 0.1, 먼 산 0.2, 중간 산 0.5, 가까운 산 0.8)를 주고, requestAnimationFrame으로 스로틀한 스크롤 핸들러에서 translate3d(0, scrollY × (1 - speed)px, 0)을 적용해 멀리 있는 레이어일수록 화면에서 느리게 올라가게 해줘. 헤드라인은 중간 산과 가까운 산 사이에 두고 speed 0.35로 움직이면서 스크롤 0~50vh 구간에서 opacity 1→0으로 사라지게 해줘. 산 모양은 clip-path: polygon으로 만들고 배경색 위에 브랜드 포인트 컬러를 농도(0.22 / 0.45 / 0.75)만 달리 겹쳐 칠하고, 아래 본문 섹션 상단에도 배경색과 같은 능선을 붙여 풍경을 덮으며 올라오게 해줘. background-attachment: fixed는 iOS에서 동작하지 않으니 쓰지 말고, 히어로가 화면을 벗어나면 계산을 건너뛰어줘.',
    html: `<section class="scene">
  <div class="layer sky" data-speed="0"></div>
  <div class="layer sun" data-speed="0.1"></div>
  <div class="layer ridge far" data-speed="0.2"></div>
  <div class="layer ridge mid" data-speed="0.5"></div>
  <div class="hero-copy" data-speed="0.35">
    <p class="eyebrow">AUTUMN TRAIL 2026</p>
    <h1>산이 가장 깊어지는<br>계절이 왔습니다</h1>
  </div>
  <div class="layer ridge near" data-speed="0.8"></div>
</section>

<main class="content">
  <section>
    <p class="eyebrow">COURSE</p>
    <h2>걷는 속도에 맞춘 세 가지 코스</h2>
    <div class="courses">
      <article><b>초록 능선길</b><span>4.2km · 2시간</span><p>완만한 오르막과 숲 그늘이 이어지는 입문 코스입니다.</p></article>
      <article><b>구름 전망대길</b><span>7.8km · 4시간</span><p>정상 전망대에서 세 개의 봉우리를 한눈에 봅니다.</p></article>
      <article><b>별빛 야영길</b><span>12km · 1박 2일</span><p>능선 위 야영장에서 하룻밤을 보내는 종주 코스입니다.</p></article>
    </div>
  </section>
  <section>
    <p class="eyebrow">SCHEDULE</p>
    <h2>10월 출발 일정</h2>
    <ul class="dates">
      <li><b>10.03 토</b><span>초록 능선길</span><em>모집 중</em></li>
      <li><b>10.10 토</b><span>구름 전망대길</span><em>모집 중</em></li>
      <li><b>10.17 토</b><span>별빛 야영길</span><em>마감 임박</em></li>
      <li><b>10.24 토</b><span>초록 능선길</span><em>모집 중</em></li>
    </ul>
  </section>
  <section class="cta">
    <h2>이번 주말, 가볍게 떠나 볼까요</h2>
    <button type="button">코스 예약하기</button>
  </section>
</main>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
}
.scene {
  position: relative;
  height: 100vh;
  min-height: 300px;
  overflow: hidden;
}
.layer, .hero-copy {
  position: absolute;
  left: 0;
  right: 0;
  will-change: transform;
}
.layer { bottom: 0; }
.sky {
  top: 0;
  background: linear-gradient(180deg, var(--bg), var(--surface));
}
.sky::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 76% 58%, var(--accent-2), transparent 45%);
  opacity: .25;
}
.sun {
  left: auto;
  right: 16%;
  bottom: 47%;
  width: clamp(44px, 11vmin, 92px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--accent-2);
  box-shadow: 0 0 60px var(--accent-2);
}
/* 산: 배경색 바탕 위에 포인트 컬러를 농도만 달리 겹쳐 칠함 */
.ridge { background: var(--bg); }
.ridge::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
}
.far {
  height: 62%;
  clip-path: polygon(0 38%, 9% 22%, 17% 34%, 28% 8%, 39% 30%, 48% 18%, 59% 36%, 71% 6%, 82% 28%, 91% 16%, 100% 30%, 100% 100%, 0 100%);
}
.far::after { opacity: .22; }
.mid {
  height: 46%;
  clip-path: polygon(0 46%, 11% 28%, 22% 50%, 34% 20%, 46% 44%, 57% 26%, 69% 50%, 81% 16%, 92% 40%, 100% 28%, 100% 100%, 0 100%);
}
.mid::after { opacity: .45; }
.near {
  height: 30%;
  clip-path: polygon(0 40%, 14% 58%, 28% 30%, 42% 54%, 57% 24%, 72% 50%, 86% 20%, 100% 44%, 100% 100%, 0 100%);
}
.near::after { opacity: .75; }
.hero-copy {
  top: 14%;
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .2em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5.2vw, 46px);
  line-height: 1.2;
  letter-spacing: -.02em;
}
/* 본문은 가장 앞 레이어(속도 1): 윗변 능선으로 풍경을 덮으며 올라옴 */
.content {
  position: relative;
  z-index: 1;
  padding: 0 clamp(16px, 6vw, 64px);
  background: var(--bg);
}
.content::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  height: 10vh;
  background: var(--bg);
  clip-path: polygon(0 70%, 12% 40%, 26% 64%, 40% 30%, 55% 58%, 70% 26%, 85% 54%, 100% 36%, 100% 100%, 0 100%);
}
.content section {
  max-width: 880px;
  min-height: 70vh;
  margin: 0 auto;
  padding: 10vh 0;
}
h2 {
  margin: 0 0 20px;
  font-size: clamp(20px, 3.2vw, 28px);
  letter-spacing: -.01em;
}
.courses {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}
.courses article {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
}
.courses b { display: block; font-size: 16px; }
.courses span { display: block; margin-top: 4px; font-size: 12px; color: var(--accent); }
.courses p { margin: 10px 0 0; font-size: 13px; line-height: 1.55; color: var(--muted); }
.dates {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}
.dates li {
  display: flex;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
  font-size: 14px;
}
.dates b { width: 72px; font-variant-numeric: tabular-nums; }
.dates span { color: var(--muted); }
.dates em { margin-left: auto; font-style: normal; font-size: 12px; color: var(--accent-2); }
.cta { text-align: center; }
.cta button {
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font: inherit;
  font-weight: 600;
}`,
    js: `const scene = document.querySelector('.scene');
const copy = document.querySelector('.hero-copy');
const layers = Array.from(document.querySelectorAll('[data-speed]'));
const speeds = layers.map((el) => parseFloat(el.dataset.speed));

function update() {
  const y = scrollY;
  if (y > scene.offsetHeight) return; // 히어로가 화면을 벗어나면 계산 생략
  layers.forEach((el, i) => {
    // speed = 화면에서 보이는 이동 비율 (0: 고정, 1: 일반 스크롤)
    // 나머지 (1 - speed)만큼 아래로 되밀어 느리게 올라가는 것처럼 보이게 함
    const shift = y * (1 - speeds[i]);
    el.style.transform = 'translate3d(0, ' + shift.toFixed(1) + 'px, 0)';
  });
  copy.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.5)).toFixed(3);
}

// 스크롤 이벤트를 rAF로 묶어 프레임당 한 번만 계산
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
update();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoOn = true, autoY = 0, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) { holdUntil = 0; autoY = 0; scrollTo(0, 0); }
  } else {
    autoY = Math.min(autoY + dt * 0.075, max); // 약 1.2px/프레임
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  },
  {
    no: 41,
    id: 'sticky-stack',
    cat: 'scroll',
    name: '스티키 스택 카드',
    en: 'Sticky Stacking Cards',
    level: 2,
    trigger: 'scroll',
    timing: '스크롤 연동 · scale 1→0.92',
    desc: '카드가 화면 위쪽에 고정된 채 다음 카드가 올라와 차곡차곡 덮습니다. 덮인 카드는 살짝 작아지고 어두워져 뒤로 물러나는 듯한 깊이가 생깁니다.',
    use: '서비스 단계 소개, 기능 하이라이트, 포트폴리오 케이스',
    tech: ['CSS position: sticky', 'CSS 변수', 'requestAnimationFrame'],
    terms: ['스티키 포지셔닝 (Sticky Positioning)', '카드 스택 (Stacking Cards)', '스크롤 연동 스케일 (Scroll-linked Scale)'],
    prompt: '서비스 단계를 소개하는 카드 4장이 스크롤하면 화면 위쪽에 차곡차곡 쌓이는 스티키 스택 카드(Sticky Stacking Cards) 섹션을 만들어줘. 카드를 gap 12vh의 grid로 세로 배치하고 각 카드에 position: sticky, top: calc(8vh + 인덱스 × 14px)를 줘서 뒤 카드가 앞 카드를 덮을 때 윗부분이 14px씩 층층이 보이게 해줘. requestAnimationFrame으로 스로틀한 스크롤 핸들러에서 다음 카드의 top이 현재 카드의 아래 끝에서 sticky 위치까지 올라온 정도를 0~1 진행률로 계산해 CSS 변수 --p로 넘기고, 현재 카드는 transform-origin: top 기준 scale(1 - p × 0.08)로 0.92까지 줄이면서 배경색 오버레이의 opacity를 p × 0.6으로 올려 어둡게 가라앉혀줘. 레이아웃 스래싱을 피하려고 모든 카드의 위치를 먼저 읽은 뒤 한꺼번에 쓰고, 컨테이너 끝에 빈 여백(::after)을 둬서 마지막 카드까지 쌓인 상태를 잠깐 유지해줘. sticky가 풀리지 않도록 조상 요소에는 overflow: hidden을 쓰지 말고, 낮은 화면에서도 내용이 잘리지 않게 카드 높이를 min(64vh, 340px)로 제한해줘.',
    html: `<header class="intro">
  <p class="eyebrow">PROCESS</p>
  <h1>아이디어에서 출시까지,<br>네 단계면 충분합니다</h1>
</header>

<section class="stack">
  <article class="card">
    <div class="text">
      <span class="num">01</span>
      <h2>기획</h2>
      <p>흩어진 아이디어를 한 장의 문서로 정리하고, 성공을 판단할 지표부터 정합니다.</p>
    </div>
    <div class="art"></div>
  </article>
  <article class="card">
    <div class="text">
      <span class="num">02</span>
      <h2>디자인</h2>
      <p>핵심 화면을 프로토타입으로 만들어 실제 사용자와 일주일 안에 검증합니다.</p>
    </div>
    <div class="art"></div>
  </article>
  <article class="card">
    <div class="text">
      <span class="num">03</span>
      <h2>개발</h2>
      <p>검증된 화면을 재사용 가능한 컴포넌트로 조립해 속도와 품질을 함께 챙깁니다.</p>
    </div>
    <div class="art"></div>
  </article>
  <article class="card">
    <div class="text">
      <span class="num">04</span>
      <h2>출시와 개선</h2>
      <p>출시 후에도 지표를 보며 매주 작은 개선을 반복합니다.</p>
    </div>
    <div class="art"></div>
  </article>
</section>

<footer class="outro">
  <h2>다음 프로젝트를 함께 시작해요</h2>
  <button type="button">상담 신청하기</button>
</footer>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
}
.intro, .stack, .outro {
  max-width: 880px;
  margin: 0 auto;
  padding-left: clamp(16px, 5vw, 48px);
  padding-right: clamp(16px, 5vw, 48px);
}
.intro {
  min-height: 60vh;
  display: grid;
  align-content: center;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .2em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5vw, 44px);
  line-height: 1.25;
  letter-spacing: -.02em;
}
.stack {
  display: grid;
  gap: 12vh;
}
/* 마지막 카드까지 쌓인 상태를 잠깐 유지하기 위한 여백 */
.stack::after { content: ''; height: 4vh; }
.card {
  --p: 0; /* 다음 카드에 덮인 정도 0~1 (JS가 갱신) */
  position: sticky;
  top: calc(8vh + var(--i, 0) * 14px);
  height: min(64vh, 340px);
  display: flex;
  gap: 24px;
  padding: clamp(18px, 4vw, 36px);
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: 0 -12px 32px -20px rgba(0, 0, 0, .5);
  overflow: hidden;
  transform-origin: 50% 0;
  transform: scale(calc(1 - var(--p) * .08));
}
/* 덮일수록 배경색 막을 올려 어둡게 가라앉힘 */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--bg);
  opacity: calc(var(--p) * .6);
  pointer-events: none;
}
.text {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.num {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .1em;
  color: var(--accent);
}
.card h2 {
  margin: auto 0 8px;
  font-size: clamp(20px, 3.4vw, 30px);
  letter-spacing: -.02em;
}
.card p {
  max-width: 340px;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
}
.art {
  flex: 0 0 38%;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.card:nth-child(2) .art {
  border-radius: 50% 16px 16px;
  background: radial-gradient(circle at 30% 30%, var(--accent-2), var(--accent) 75%);
}
.card:nth-child(3) .art {
  border-radius: 16px 16px 50% 16px;
  background: linear-gradient(200deg, var(--accent-2), var(--accent));
}
.card:nth-child(4) .art {
  border-radius: 999px;
  background: conic-gradient(from 210deg, var(--accent), var(--accent-2), var(--accent));
}
@media (max-width: 560px) {
  .art { display: none; }
}
.outro {
  min-height: 70vh;
  display: grid;
  place-content: center;
  text-align: center;
}
.outro h2 { margin: 0 0 16px; font-size: clamp(20px, 3.4vw, 30px); }
.outro button {
  justify-self: center;
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font: inherit;
  font-weight: 600;
}`,
    js: `const cards = Array.from(document.querySelectorAll('.card'));
cards.forEach((card, i) => card.style.setProperty('--i', i));

function update() {
  // 읽기를 먼저 모두 끝내고 쓰기는 나중에 (레이아웃 스래싱 방지)
  const tops = cards.map((card) => card.getBoundingClientRect().top);
  const heights = cards.map((card) => card.offsetHeight);
  for (let i = 0; i < cards.length - 1; i++) {
    // 다음 카드가 현재 카드 아래 끝(0)에서 sticky 위치(≈1)까지 올라온 정도
    const p = (tops[i] + heights[i] - tops[i + 1]) / heights[i];
    cards[i].style.setProperty('--p', Math.min(Math.max(p, 0), 1).toFixed(3));
  }
}

// 스크롤 이벤트를 rAF로 묶어 프레임당 한 번만 계산
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
update();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoOn = true, autoY = 0, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) { holdUntil = 0; autoY = 0; scrollTo(0, 0); }
  } else {
    autoY = Math.min(autoY + dt * 0.075, max); // 약 1.2px/프레임
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  },
  {
    no: 42,
    id: 'horizontal-scroll',
    cat: 'scroll',
    name: '가로 스크롤 섹션',
    en: 'Horizontal Scroll Section',
    level: 2,
    trigger: 'scroll',
    timing: '스크롤 연동 · 세로 1px = 가로 1px',
    desc: '세로로 스크롤하는 동안 섹션이 화면에 고정되고 카드 줄이 옆으로 흘러갑니다. 스크롤 하이재킹 없이 네이티브 스크롤을 그대로 가로 이동에 연결합니다.',
    use: '상품·강의 라인업, 포트폴리오 갤러리, 연혁 소개',
    tech: ['CSS position: sticky', 'requestAnimationFrame', 'CSS transform'],
    terms: ['가로 스크롤 섹션 (Horizontal Scroll Section)', '스티키 뷰포트 (Sticky Viewport)', '스크롤 진행률 매핑 (Scroll Progress Mapping)'],
    prompt: '세로로 스크롤하면 강의 카드 5장이 가로로 넘어가는 가로 스크롤 섹션(Horizontal Scroll Section)을 만들어줘. 바깥 섹션 높이를 (트랙 전체 너비 - 화면 너비 + 화면 높이)px로 JS에서 계산해 세로 1px 스크롤이 가로 1px 이동이 되게 하고, 안쪽 뷰포트는 position: sticky; top: 0; height: 100vh; overflow: hidden으로 고정해 스크롤 하이재킹 없이 네이티브 스크롤을 유지해줘. requestAnimationFrame으로 스로틀한 스크롤 핸들러에서 진행률 p = -섹션 top ÷ 이동 거리(0~1)를 구하고 트랙에 translate3d(-p × 이동 거리, 0, 0)을 적용해줘. 트랙 아래에는 "02 / 05" 형식의 현재 카드 번호(round(p × 4) + 1)와 scaleX(p)로 차오르는 2px 진행 바를 브랜드 포인트 컬러로 넣어줘. 창 크기가 바뀌면 이동 거리와 섹션 높이를 다시 계산하고, 좁은 화면에서는 카드 너비를 72vw로 줄여 다음 카드가 살짝 보이게 해줘.',
    html: `<header class="intro">
  <p class="eyebrow">CLASS LINEUP</p>
  <h1>이번 달 새로 열린<br>디자인 클래스</h1>
  <p class="lead">현업 디자이너가 직접 만든 다섯 개의 커리큘럼을 만나 보세요.</p>
</header>

<section class="h-scroll">
  <div class="viewport">
    <div class="track">
      <article class="panel">
        <div class="thumb"></div>
        <p class="tag">입문 · 12강</p>
        <h2>브랜딩 기초</h2>
        <p class="meta">로고와 컬러, 톤앤매너까지 브랜드의 뼈대를 세웁니다.</p>
      </article>
      <article class="panel">
        <div class="thumb"></div>
        <p class="tag">중급 · 16강</p>
        <h2>모션 디자인</h2>
        <p class="meta">이징과 타이밍으로 화면에 생동감을 더하는 법을 배웁니다.</p>
      </article>
      <article class="panel">
        <div class="thumb"></div>
        <p class="tag">입문 · 9강</p>
        <h2>UX 라이팅</h2>
        <p class="meta">버튼 한 줄, 안내 문구 하나로 사용성을 바꿉니다.</p>
      </article>
      <article class="panel">
        <div class="thumb"></div>
        <p class="tag">중급 · 14강</p>
        <h2>데이터 시각화</h2>
        <p class="meta">복잡한 숫자를 한눈에 읽히는 차트로 정리합니다.</p>
      </article>
      <article class="panel">
        <div class="thumb"></div>
        <p class="tag">심화 · 18강</p>
        <h2>프로토타이핑</h2>
        <p class="meta">실제처럼 동작하는 시안으로 팀과 고객을 설득합니다.</p>
      </article>
    </div>
    <div class="hud">
      <span class="count"><b>01</b> / 05</span>
      <span class="bar"><i></i></span>
    </div>
  </div>
</section>

<footer class="outro">
  <h2>첫 달 수강료 30% 할인</h2>
  <p class="lead">9월 30일까지 등록하면 모든 클래스에 적용됩니다.</p>
</footer>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
}
.intro, .outro {
  min-height: 70vh;
  display: grid;
  align-content: center;
  padding: 8vh clamp(16px, 6vw, 64px);
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .2em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5vw, 44px);
  line-height: 1.25;
  letter-spacing: -.02em;
}
.outro h2 { margin: 0; font-size: clamp(20px, 3.4vw, 30px); }
.lead {
  max-width: 420px;
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--muted);
}
/* 높이는 JS가 실제 이동 거리에 맞춰 다시 계산 */
.h-scroll { height: 300vh; }
.viewport {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4vh;
}
.track {
  display: flex;
  gap: clamp(12px, 2vw, 20px);
  width: max-content;
  padding: 0 clamp(16px, 6vw, 64px);
  will-change: transform;
}
.panel {
  flex: none;
  width: min(72vw, 340px);
  height: min(64vh, 360px);
  display: flex;
  flex-direction: column;
  padding: 12px 12px 18px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--surface);
}
.thumb {
  flex: 1;
  min-height: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.panel:nth-child(2) .thumb {
  background: radial-gradient(circle at 70% 32%, var(--accent-2) 0 14%, transparent 15%), linear-gradient(160deg, var(--accent), var(--bg));
}
.panel:nth-child(3) .thumb {
  background: linear-gradient(180deg, var(--accent) 0 62%, var(--accent-2) 62%);
}
.panel:nth-child(4) .thumb {
  background: conic-gradient(from 120deg at 40% 60%, var(--accent), var(--accent-2), var(--accent));
}
.panel:nth-child(5) .thumb {
  background: radial-gradient(circle at 50% 110%, var(--accent-2), var(--accent) 55%, var(--surface));
}
.tag { margin: 14px 6px 4px; font-size: 12px; color: var(--accent); }
.panel h2 { margin: 0 6px; font-size: clamp(17px, 2.2vw, 21px); }
.meta {
  margin: 6px 6px 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--muted);
}
.hud {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 clamp(16px, 6vw, 64px);
  font-size: 13px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.hud b { color: var(--fg); }
.bar {
  flex: 1;
  max-width: 240px;
  height: 2px;
  background: var(--line);
}
.bar i {
  display: block;
  height: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: 0 50%;
}`,
    js: `const section = document.querySelector('.h-scroll');
const viewport = document.querySelector('.viewport');
const track = document.querySelector('.track');
const fill = document.querySelector('.bar i');
const current = document.querySelector('.count b');
const total = track.children.length;
let distance = 0;

// 가로 이동 거리만큼 섹션을 늘려 세로 스크롤 1px = 가로 이동 1px로 맞춤
function measure() {
  distance = Math.max(track.offsetWidth - viewport.clientWidth, 0);
  section.style.height = distance + viewport.offsetHeight + 'px';
  update();
}

function update() {
  const top = section.getBoundingClientRect().top;
  const p = distance ? Math.min(Math.max(-top / distance, 0), 1) : 0;
  track.style.transform = 'translate3d(' + (-p * distance).toFixed(1) + 'px, 0, 0)';
  fill.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  current.textContent = String(Math.round(p * (total - 1)) + 1).padStart(2, '0');
}

// 스크롤 이벤트를 rAF로 묶어 프레임당 한 번만 계산
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}, { passive: true });
addEventListener('resize', measure);
measure();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoOn = true, autoY = 0, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) { holdUntil = 0; autoY = 0; scrollTo(0, 0); }
  } else {
    autoY = Math.min(autoY + dt * 0.075, max); // 약 1.2px/프레임
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  },
  {
    no: 43,
    id: 'scroll-text-fill',
    cat: 'scroll',
    name: '스크롤 텍스트 채우기',
    en: 'Scroll Text Fill',
    level: 2,
    trigger: 'scroll',
    timing: '스크롤 연동 · 어절 단위 채움',
    desc: '화면에 고정된 큰 문단의 단어가 스크롤을 따라 앞에서부터 하나씩 선명해집니다. 스크롤이 읽는 속도를 이끌어 핵심 메시지에 집중하게 만듭니다.',
    use: '브랜드 스토리, 제품 철학 소개, 캠페인 메시지',
    tech: ['CSS position: sticky', 'requestAnimationFrame', 'DOM 텍스트 분할'],
    terms: ['스크롤 텍스트 리빌 (Scroll Text Reveal)', '단어 분할 (Word Splitting)', '스티키 섹션 (Sticky Section)', '스크롤 스크러빙 (Scroll Scrubbing)'],
    prompt: '브랜드 스토리 섹션의 큰 문단이 스크롤에 따라 단어 하나씩 흐린 상태에서 선명하게 채워지는 스크롤 텍스트 리빌(Scroll Text Reveal) 효과를 애플 제품 페이지처럼 만들어줘. 섹션 높이를 300vh로 잡고 안쪽을 position: sticky; top: 0; height: 100vh로 고정한 뒤, JS로 문단을 어절 단위 span으로 나누고 <em> 안의 단어는 브랜드 포인트 컬러를 유지하게 해줘. requestAnimationFrame으로 스로틀한 스크롤 핸들러에서 섹션 진행률 p(0~1)를 구하고 5%~85% 구간을 단어 수에 매핑해, 각 단어의 opacity를 0.2 + 0.8 × clamp(채워진 단어 수 - 인덱스, 0, 1)로 줘서 경계에 걸친 단어는 반쯤 채워지며 부드럽게 넘어가게 해줘. 글자 크기는 clamp(17px, min(4.2vw, 7vh), 38px)에 word-break: keep-all을 줘서 낮은 화면에서도 문단이 한 화면에 들어오고 어절 중간에서 줄이 바뀌지 않게 해줘. 쪼갠 span 묶음에는 aria-hidden을 주고 원문은 시각적으로 숨긴 텍스트로 남겨 스크린 리더가 끊어 읽지 않게 해줘.',
    html: `<header class="intro">
  <p class="eyebrow">OUR STORY</p>
  <h1>우리가 이 도구를<br>만든 이유</h1>
</header>

<section class="fill-section">
  <div class="sticky">
    <p class="statement">우리는 더 빠른 도구보다 <em>더 가벼운 하루를</em> 만들고 싶었습니다. 복잡한 설정 없이 켜자마자 익숙하고, 필요한 순간에만 조용히 나타나는 기능. 매일 쓰는 도구가 일을 방해하지 않을 때 팀은 비로소 <em>중요한 일에 집중합니다.</em></p>
  </div>
</section>

<footer class="outro">
  <h2>이제 직접 써 볼 차례입니다</h2>
  <button type="button">무료로 시작하기</button>
</footer>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
}
.intro, .outro {
  min-height: 70vh;
  display: grid;
  place-content: center;
  padding: 8vh 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .2em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5vw, 44px);
  line-height: 1.25;
  letter-spacing: -.02em;
}
.fill-section { height: 300vh; }
.sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 0 clamp(20px, 7vw, 80px);
}
.statement {
  max-width: 860px;
  margin: 0;
  font-size: clamp(17px, min(4.2vw, 7vh), 38px);
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -.02em;
  word-break: keep-all;
}
.statement em { font-style: normal; }
.word { opacity: .2; }
.word.hl { color: var(--accent); }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.outro h2 { margin: 0 0 16px; font-size: clamp(20px, 3.4vw, 30px); }
.outro button {
  justify-self: center;
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font: inherit;
  font-weight: 600;
}`,
    js: `const section = document.querySelector('.fill-section');
const para = document.querySelector('.statement');

// 1) 문단을 어절 단위 span으로 분할 (<em> 안의 단어는 강조 색 유지)
const words = [];
const visual = document.createElement('span');
visual.setAttribute('aria-hidden', 'true');
Array.from(para.childNodes).forEach((node) => {
  const isEm = node.nodeName === 'EM';
  node.textContent.trim().split(/\\s+/).filter(Boolean).forEach((text) => {
    const span = document.createElement('span');
    span.className = isEm ? 'word hl' : 'word';
    span.textContent = text;
    visual.append(span, ' ');
    words.push(span);
  });
});
// 스크린 리더용 원문은 숨김 텍스트로 남김
const srText = document.createElement('span');
srText.className = 'sr-only';
srText.textContent = para.textContent;
para.replaceChildren(srText, visual);

// 2) 섹션 진행률(0~1)을 단어 수에 매핑해 앞에서부터 채움
function update() {
  const rect = section.getBoundingClientRect();
  const p = Math.min(Math.max(-rect.top / (rect.height - innerHeight), 0), 1);
  const filled = ((p - 0.05) / 0.8) * words.length; // 5%~85% 구간 사용
  words.forEach((word, i) => {
    const t = Math.min(Math.max(filled - i, 0), 1); // 경계 단어는 반쯤 채워짐
    word.style.opacity = (0.2 + 0.8 * t).toFixed(2);
  });
}

// 스크롤 이벤트를 rAF로 묶어 프레임당 한 번만 계산
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
update();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoOn = true, autoY = 0, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) { holdUntil = 0; autoY = 0; scrollTo(0, 0); }
  } else {
    autoY = Math.min(autoY + dt * 0.075, max); // 약 1.2px/프레임
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  },
  {
    no: 44,
    id: 'scroll-zoom',
    cat: 'scroll',
    name: '스크롤 줌 이미지',
    en: 'Scroll Zoom Image',
    level: 2,
    trigger: 'scroll',
    timing: '스크롤 연동 · scale 0.7→1',
    desc: '작게 떠 있던 이미지 카드가 스크롤에 따라 화면 가득 커지고 둥근 모서리가 사라집니다. 확대가 끝나면 캡션이 떠올라 한 장면에 몰입하게 합니다.',
    use: '케이스 스터디, 제품 대표 이미지, 영상 인트로 섹션',
    tech: ['CSS position: sticky', 'requestAnimationFrame', 'CSS transform'],
    terms: ['스크롤 줌 (Scroll Zoom)', '스케일 인 (Scale In)', '스티키 스테이지 (Sticky Stage)', '스크롤 스크러빙 (Scroll Scrubbing)'],
    prompt: '케이스 스터디 페이지 중간에 대표 이미지가 스크롤에 따라 화면 가득 커지는 스크롤 줌(Scroll Zoom) 섹션을 만들어줘. 섹션 높이는 260vh, 안쪽 스테이지는 position: sticky; top: 0; height: 100vh로 고정하고, 이미지 카드는 스테이지 크기 그대로 두되 transform: scale(0.7), border-radius 32px에서 시작하게 해줘. requestAnimationFrame으로 스로틀한 스크롤 핸들러에서 섹션 진행률 p(0~1)를 구해 0~60% 구간에서 scale을 0.7→1로 키우고, 화면에 보이는 모서리 반경이 32px→0이 되도록 border-radius를 32 × (1 - t) ÷ scale로 역보정해줘. 60~85% 구간에서는 이미지 하단 캡션을 opacity 0→1, translateY(16px)→0으로 나타나게 하고, 캡션 뒤에 아래쪽이 어두운 그라디언트 스크림을 깔아 어떤 이미지 위에서도 흰 글씨가 읽히게 해줘. 확대는 width/height가 아닌 transform만 바꿔 레이아웃 계산이 생기지 않게 하고, 실제 사진을 넣을 때는 object-fit: cover로 확대 중에도 비율이 깨지지 않게 해줘.',
    html: `<header class="intro">
  <p class="eyebrow">CASE STUDY</p>
  <h1>한 장면에 오래<br>머물게 하는 방법</h1>
  <p class="lead">골목 끝 작은 서점을 위한 브랜드 리뉴얼 프로젝트입니다.</p>
</header>

<section class="zoom">
  <div class="stage">
    <figure class="shot">
      <figcaption class="caption">
        <span>PROJECT 07 · 브랜드 경험</span>
        <strong>해가 지면 불이 켜지는 서점</strong>
      </figcaption>
    </figure>
  </div>
</section>

<section class="outro">
  <h2>공간의 온도를 화면으로 옮기다</h2>
  <p class="lead">매장 조명의 색과 책장이 만드는 리듬을 웹사이트의 색과 여백으로 옮겼습니다. 방문자는 첫 화면에서 이미 서점 안에 들어온 듯한 느낌을 받습니다.</p>
</section>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
}
.intro, .outro {
  min-height: 70vh;
  display: grid;
  align-content: center;
  padding: 8vh clamp(20px, 7vw, 80px);
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .2em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5vw, 44px);
  line-height: 1.25;
  letter-spacing: -.02em;
}
.outro h2 { margin: 0; font-size: clamp(20px, 3.4vw, 30px); }
.lead {
  max-width: 460px;
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.7;
  color: var(--muted);
}
.zoom { height: 260vh; }
.stage {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
/* 이미지 대신 그라디언트로 그린 노을 진 거리 */
.shot {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: 32px;
  transform: scale(.7);
  will-change: transform;
  background:
    radial-gradient(circle at 72% 34%, #fff0c8 0 5vmin, transparent calc(5vmin + 1px)),
    radial-gradient(circle at 72% 34%, var(--accent-2), transparent 42%),
    linear-gradient(180deg, var(--accent) 10%, var(--accent-2) 130%);
}
.shot::before {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 48%;
  background: radial-gradient(circle, rgba(255, 214, 130, .75) 0 1.2px, transparent 1.8px) 0 0 / 14px 18px, #0f1119;
  clip-path: polygon(0 40%, 8% 40%, 8% 18%, 17% 18%, 17% 52%, 24% 52%, 24% 8%, 34% 8%, 34% 36%, 43% 36%, 43% 24%, 52% 24%, 52% 58%, 60% 58%, 60% 14%, 71% 14%, 71% 44%, 79% 44%, 79% 28%, 88% 28%, 88% 50%, 100% 50%, 100% 100%, 0 100%);
}
.caption {
  position: absolute;
  inset: auto 0 0;
  padding: 14vh clamp(20px, 5vw, 48px) clamp(20px, 6vh, 44px);
  background: linear-gradient(transparent, rgba(0, 0, 0, .65));
  color: #fff;
  opacity: 0;
}
.caption span {
  display: block;
  margin-bottom: 8px;
  font-size: 11px;
  letter-spacing: .18em;
  opacity: .75;
}
.caption strong {
  font-size: clamp(18px, 3.2vw, 30px);
  letter-spacing: -.02em;
}`,
    js: `const section = document.querySelector('.zoom');
const shot = document.querySelector('.shot');
const caption = document.querySelector('.caption');
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

function update() {
  const rect = section.getBoundingClientRect();
  const p = clamp(-rect.top / (rect.height - innerHeight), 0, 1);

  // 0~60% 구간: scale 0.7 → 1
  const t = clamp(p / 0.6, 0, 1);
  const scale = 0.7 + 0.3 * t;
  shot.style.transform = 'scale(' + scale.toFixed(4) + ')';
  // scale이 반경까지 줄이므로 화면에 보이는 반경이 32px → 0이 되도록 역보정
  shot.style.borderRadius = ((32 * (1 - t)) / scale).toFixed(2) + 'px';

  // 60~85% 구간: 캡션 페이드 인
  const c = clamp((p - 0.6) / 0.25, 0, 1);
  caption.style.opacity = c.toFixed(3);
  caption.style.transform = 'translateY(' + (16 * (1 - c)).toFixed(1) + 'px)';
}

// 스크롤 이벤트를 rAF로 묶어 프레임당 한 번만 계산
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
update();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoOn = true, autoY = 0, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) { holdUntil = 0; autoY = 0; scrollTo(0, 0); }
  } else {
    autoY = Math.min(autoY + dt * 0.075, max); // 약 1.2px/프레임
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  },
  {
    no: 45,
    id: 'scroll-draw-path',
    cat: 'scroll',
    name: '스크롤 SVG 라인 드로잉',
    en: 'Scroll Draw SVG Path',
    level: 3,
    trigger: 'scroll',
    timing: '스크롤 연동 · stroke-dashoffset',
    desc: '굽이치는 선이 스크롤을 따라 그려지며 연혁 항목을 차례로 이어 갑니다. 선의 끝이 닿는 지점마다 항목이 켜져 이야기를 따라 걷는 느낌을 줍니다.',
    use: '회사 연혁, 제품 로드맵, 온보딩 단계, 배송 추적',
    tech: ['SVG', 'stroke-dashoffset', 'getPointAtLength', 'requestAnimationFrame'],
    terms: ['라인 드로잉 (Line Drawing)', '스트로크 대시 오프셋 (Stroke Dashoffset)', '패스 길이 (Path Length)', '스크롤 연동 애니메이션 (Scroll-linked Animation)'],
    prompt: '회사 연혁 타임라인 왼쪽에 지그재그로 굽이치는 길을 SVG path로 그리고, 스크롤에 맞춰 선이 그려지는 라인 드로잉(Line Drawing) 효과를 만들어줘. 각 연혁 항목의 점 위치를 실제 레이아웃(offsetTop)에서 재서 레일 너비의 26%와 74% 지점을 번갈아 지나는 3차 베지어 곡선(C 명령)으로 path를 만들고, getTotalLength()로 구한 길이를 stroke-dasharray에 넣어줘. 타임라인 top이 화면 60% 높이에 닿을 때 0, bottom이 닿을 때 1이 되는 진행률로 stroke-dashoffset = 길이 × (1 - 진행률)을 requestAnimationFrame으로 스로틀한 스크롤 핸들러에서 갱신하고, getPointAtLength()로 선 끝 좌표를 구해 보조 컬러 글로우 점이 따라가게 해줘. 선 끝이 항목의 점 높이를 지나면 .is-on 클래스를 붙여 점을 브랜드 포인트 컬러로 채우고 텍스트 opacity를 0.35→1로 300ms 동안 전환해줘. 창 크기가 바뀌면 줄바꿈 때문에 항목 높이가 달라지니 path와 길이를 다시 계산해줘.',
    html: `<header class="intro">
  <p class="eyebrow">OUR JOURNEY</p>
  <h1>작은 팀이 걸어온<br>여섯 번의 계절</h1>
</header>

<section class="wrap">
  <div class="timeline">
    <svg class="rail" aria-hidden="true">
      <path class="road-bg"></path>
      <path class="road"></path>
    </svg>
    <span class="head" aria-hidden="true"></span>
    <ol>
      <li class="stop">
        <span class="dot"></span>
        <p class="year">2021</p>
        <h3>세 명이 모인 작은 방</h3>
        <p>첫 프로토타입을 만들고 지인 스무 명에게 테스트를 부탁했습니다.</p>
      </li>
      <li class="stop">
        <span class="dot"></span>
        <p class="year">2022</p>
        <h3>첫 정식 출시</h3>
        <p>베타 사용자 1,000명과 함께 1.0 버전을 공개했습니다.</p>
      </li>
      <li class="stop">
        <span class="dot"></span>
        <p class="year">2023</p>
        <h3>시드 투자 유치</h3>
        <p>팀이 열두 명으로 늘고 첫 사무실로 이사했습니다.</p>
      </li>
      <li class="stop">
        <span class="dot"></span>
        <p class="year">2024</p>
        <h3>모바일 앱 출시</h3>
        <p>출시 한 달 만에 생산성 부문 상위권에 올랐습니다.</p>
      </li>
      <li class="stop">
        <span class="dot"></span>
        <p class="year">2025</p>
        <h3>해외 서비스 시작</h3>
        <p>일본과 대만에 서비스를 열고 다국어 지원을 시작했습니다.</p>
      </li>
      <li class="stop">
        <span class="dot"></span>
        <p class="year">2026</p>
        <h3>다음 여정</h3>
        <p>누적 사용자 50만 명, 이제 더 많은 팀의 하루를 바꾸려 합니다.</p>
      </li>
    </ol>
  </div>
</section>

<footer class="outro">
  <h2>다음 계절을 함께 만들 동료를 찾습니다</h2>
</footer>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
}
.intro, .outro {
  min-height: 60vh;
  display: grid;
  place-content: center;
  padding: 8vh 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .2em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5vw, 44px);
  line-height: 1.25;
  letter-spacing: -.02em;
}
.outro h2 { margin: 0; font-size: clamp(18px, 3vw, 26px); }
.wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 clamp(16px, 5vw, 40px);
}
.timeline {
  --rail: clamp(80px, 20vw, 170px);
  position: relative;
}
/* SVG 좌표계 = 타임라인 픽셀 좌표 (viewBox를 JS가 맞춤) */
.rail {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--rail);
  height: 100%;
  overflow: visible;
}
.road-bg, .road {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
}
.road-bg { stroke: var(--line); stroke-dasharray: 1 9; }
.road { stroke: var(--accent); }
.head {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border-radius: 50%;
  background: var(--accent-2);
  box-shadow: 0 0 0 4px var(--bg), 0 0 18px 2px var(--accent-2);
  will-change: transform;
}
ol { margin: 0; padding: 0; list-style: none; }
.stop {
  position: relative;
  min-height: 46vh;
  padding: 0 0 8vh var(--rail);
}
.dot {
  position: absolute;
  left: 0;
  top: 14px;
  width: 16px;
  height: 16px;
  border: 2px solid var(--line);
  border-radius: 50%;
  background: var(--bg);
  transform: translate(-50%, -50%);
  transition: background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
}
.stop.is-on .dot {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 0 6px var(--bg), 0 0 20px var(--accent);
}
.stop > :not(.dot) {
  opacity: .35;
  transition: opacity 300ms ease, color 300ms ease;
}
.stop.is-on > :not(.dot) { opacity: 1; }
.year {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: .08em;
  color: var(--muted);
}
.stop.is-on .year { color: var(--accent); }
.stop h3 { margin: 2px 0 6px; font-size: clamp(17px, 2.4vw, 21px); }
.stop h3 + p {
  max-width: 380px;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
}`,
    js: `const timeline = document.querySelector('.timeline');
const svg = document.querySelector('.rail');
const road = document.querySelector('.road');
const roadBg = document.querySelector('.road-bg');
const head = document.querySelector('.head');
const stops = Array.from(document.querySelectorAll('.stop'));
let len = 0;
let dotYs = [];

// 실제 레이아웃을 재서 점들을 지그재그로 잇는 베지어 곡선 path를 만듦
function build() {
  const w = svg.getBoundingClientRect().width;
  const h = timeline.offsetHeight;
  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
  let prev = { x: w * 0.26, y: 0 }; // 첫 점과 같은 x에서 시작
  let d = 'M' + prev.x + ' 0';
  const curveTo = (pt) => {
    const midY = (prev.y + pt.y) / 2;
    d += ' C' + prev.x + ' ' + midY + ' ' + pt.x + ' ' + midY + ' ' + pt.x + ' ' + pt.y;
    prev = pt;
  };
  dotYs = stops.map((stop, i) => {
    const pt = { x: w * (i % 2 ? 0.74 : 0.26), y: stop.offsetTop + 14 };
    stop.querySelector('.dot').style.left = pt.x + 'px';
    curveTo(pt);
    return pt.y;
  });
  curveTo({ x: w / 2, y: h });
  road.setAttribute('d', d);
  roadBg.setAttribute('d', d);
  len = road.getTotalLength();
  road.style.strokeDasharray = len;
  update();
}

function update() {
  const rect = timeline.getBoundingClientRect();
  // 타임라인이 화면 60% 높이를 지나는 만큼 선을 그림
  const p = Math.min(Math.max((innerHeight * 0.6 - rect.top) / rect.height, 0), 1);
  const drawn = len * p;
  road.style.strokeDashoffset = len - drawn;
  const tip = road.getPointAtLength(drawn); // 선 끝 좌표
  head.style.transform = 'translate(' + tip.x + 'px, ' + tip.y + 'px)';
  stops.forEach((stop, i) => stop.classList.toggle('is-on', tip.y >= dotYs[i] - 1));
}

// 스크롤 이벤트를 rAF로 묶어 프레임당 한 번만 계산
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}, { passive: true });
addEventListener('resize', build);
build();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoOn = true, autoY = 0, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) { holdUntil = 0; autoY = 0; scrollTo(0, 0); }
  } else {
    autoY = Math.min(autoY + dt * 0.075, max); // 약 1.2px/프레임
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  },
  {
    no: 46,
    id: 'smart-header',
    cat: 'scroll',
    name: '스마트 헤더',
    en: 'Smart Header (Hide on Scroll)',
    level: 1,
    trigger: 'scroll',
    timing: '320ms cubic-bezier(.2,.8,.2,1)',
    desc: '아래로 스크롤하면 헤더가 위로 숨어 화면을 넓게 쓰고, 조금만 위로 올려도 바로 다시 내려옵니다. 스크롤을 시작하면 흐림 배경과 그림자가 생겨 본문 위에 떠 있는 느낌을 줍니다.',
    use: '콘텐츠 사이트 헤더, 모바일 웹 내비게이션, 쇼핑몰 상단 바',
    tech: ['requestAnimationFrame', 'CSS transition', 'backdrop-filter'],
    terms: ['스마트 헤더 (Smart Header)', '헤드룸 패턴 (Headroom Pattern)', '스크롤 방향 감지 (Scroll Direction Detection)', '글래스모피즘 (Glassmorphism)'],
    prompt: '페이지 상단에 고정된 헤더가 아래로 스크롤하면 위로 숨고 위로 스크롤하면 다시 내려오는 스마트 헤더(Hide on Scroll Header)를 만들어줘. requestAnimationFrame으로 스로틀한 스크롤 핸들러에서 마지막으로 방향을 판단한 위치와의 차이(delta)가 6px를 넘을 때만 방향을 판단해, 아래 방향이고 scrollY가 헤더 높이(56px)보다 크면 transform: translateY(-100%)로 숨기고 위 방향이면 다시 보여줘(320ms cubic-bezier(.2,.8,.2,1)). scrollY가 40px을 넘으면 backdrop-filter: blur(14px) saturate(160%)와 72% 불투명한 배경색 레이어, 아래쪽 옅은 그림자를 240ms에 걸쳐 켜서 본문 위에 떠 있는 느낌을 줘. 맨 위(scrollY ≤ 0, iOS 바운스 포함)에서는 항상 보이게 하고, 헤더 안 요소에 키보드 포커스가 있으면 :focus-within으로 숨기지 않게 해줘.',
    html: `<header class="site-header">
  <a class="logo" href="#">MOTION</a>
  <nav class="nav">
    <a href="#">기능</a>
    <a href="#">요금제</a>
    <a href="#">고객 사례</a>
  </nav>
  <button class="cta" type="button">시작하기</button>
</header>

<main>
  <section class="hero">
    <p class="eyebrow">NEW · 2.0 업데이트</p>
    <h1>읽는 동안에는 비켜 주고,<br>필요할 때 돌아오는 메뉴</h1>
    <p class="lead">화면을 한 줄이라도 더 넓게 쓰도록, 내비게이션이 스크롤 방향을 읽고 스스로 자리를 비웁니다.</p>
  </section>

  <section class="tiles">
    <article class="tile"><div class="thumb"></div><h3>집중 모드</h3><p>알림과 사이드바를 접고 본문만 남깁니다.</p></article>
    <article class="tile"><div class="thumb"></div><h3>빠른 검색</h3><p>어느 화면에서든 단축키 하나로 찾습니다.</p></article>
    <article class="tile"><div class="thumb"></div><h3>공유 링크</h3><p>권한을 고른 뒤 링크 하나로 전달하세요.</p></article>
    <article class="tile"><div class="thumb"></div><h3>버전 기록</h3><p>30일 전 문서도 클릭 한 번으로 되돌립니다.</p></article>
    <article class="tile"><div class="thumb"></div><h3>오프라인 편집</h3><p>연결이 끊겨도 작업은 그대로 저장됩니다.</p></article>
    <article class="tile"><div class="thumb"></div><h3>팀 템플릿</h3><p>자주 쓰는 양식을 팀 전체와 나눠 씁니다.</p></article>
  </section>

  <section class="story">
    <h2>작은 화면일수록 한 줄이 소중합니다</h2>
    <p>스마트폰에서 고정 헤더는 화면의 10% 가까이를 차지합니다. 아래로 스크롤하는 동안은 대부분 읽는 중이니 헤더를 잠시 치워 두고, 위로 올리는 순간은 다른 곳으로 이동하려는 신호로 보고 다시 꺼내 줍니다.</p>
    <p>이때 손가락의 미세한 떨림까지 반응하면 헤더가 깜빡이듯 들락날락하게 됩니다. 일정 거리 이상 움직였을 때만 방향을 판단하는 것이 자연스러운 동작의 핵심입니다.</p>
  </section>

  <section class="quote">
    <blockquote>헤더가 비켜 주니 작은 화면에서도 문서가 훨씬 넓어 보여요.</blockquote>
    <p>박지훈 · 스타트업 PM</p>
  </section>
</main>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
}
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 clamp(16px, 4vw, 40px);
  transition: transform 320ms cubic-bezier(.2, .8, .2, 1), box-shadow 240ms ease;
}
/* 반투명 배경 막: 40px 이상 스크롤했을 때만 나타남 */
.site-header::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--bg);
  opacity: 0;
  transition: opacity 240ms ease;
}
.site-header.is-scrolled {
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  backdrop-filter: blur(14px) saturate(160%);
  box-shadow: 0 1px 0 var(--line), 0 12px 32px -20px rgba(0, 0, 0, .5);
}
.site-header.is-scrolled::before { opacity: .72; }
.site-header.is-hidden { transform: translateY(-100%); box-shadow: none; }
.site-header:focus-within { transform: none; }
.logo {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: .12em;
  color: var(--fg);
  text-decoration: none;
}
.nav { display: flex; gap: 20px; margin-left: auto; }
.nav a { font-size: 14px; color: var(--muted); text-decoration: none; }
.cta {
  padding: 8px 16px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
}
@media (max-width: 560px) {
  .nav { display: none; }
  .cta { margin-left: auto; }
}
main {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 clamp(16px, 5vw, 48px);
}
.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 96px 0 6vh;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: .16em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, 5vw, 44px);
  line-height: 1.25;
  letter-spacing: -.02em;
}
.lead {
  max-width: 440px;
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--muted);
}
.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
  padding: 2vh 0 10vh;
}
.tile {
  padding: 12px 12px 18px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
}
.thumb {
  height: 110px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.tile:nth-child(3n + 2) .thumb { background: radial-gradient(circle at 30% 40%, var(--accent-2), var(--accent) 70%); }
.tile:nth-child(3n) .thumb { background: linear-gradient(200deg, var(--accent-2), var(--surface)); }
.tile h3 { margin: 14px 4px 4px; font-size: 15px; }
.tile p { margin: 0 4px; font-size: 13px; line-height: 1.5; color: var(--muted); }
.story { max-width: 620px; padding: 8vh 0; }
.story h2 { margin: 0 0 16px; font-size: clamp(20px, 3.2vw, 28px); }
.story p { margin: 0 0 16px; font-size: 15px; line-height: 1.8; color: var(--muted); }
.quote {
  min-height: 60vh;
  display: grid;
  place-content: center;
  padding: 8vh 0 14vh;
  text-align: center;
}
blockquote {
  max-width: 560px;
  margin: 0;
  font-size: clamp(18px, 3vw, 26px);
  font-weight: 700;
  line-height: 1.5;
}
.quote p { font-size: 13px; color: var(--muted); }`,
    js: `const header = document.querySelector('.site-header');
let lastY = scrollY;

function update() {
  const y = scrollY;
  header.classList.toggle('is-scrolled', y > 40); // 40px 이후 블러 배경 + 그림자
  const delta = y - lastY;
  // 6px 이상 움직였을 때만 방향을 판단해 미세한 흔들림은 무시
  if (Math.abs(delta) > 6) {
    header.classList.toggle('is-hidden', delta > 0 && y > header.offsetHeight);
    lastY = y;
  }
  if (y <= 0) header.classList.remove('is-hidden'); // 맨 위(iOS 바운스 포함)에서는 항상 표시
}

// 스크롤 이벤트를 rAF로 묶어 프레임당 한 번만 계산
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}, { passive: true });

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
// 내려가기(1.1화면)와 올라가기(0.35화면)를 번갈아 숨김과 등장을 모두 보여 줌
let autoOn = true, autoY = 0, dir = 1, legLeft = innerHeight * 1.1, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) {
      holdUntil = 0; autoY = 0; dir = 1; legLeft = innerHeight * 1.1;
      scrollTo(0, 0);
    }
  } else {
    const step = dt * 0.08; // 약 1.3px/프레임
    autoY = Math.min(Math.max(autoY + step * dir, 0), max);
    legLeft -= step;
    if (legLeft <= 0) {
      dir = -dir;
      legLeft = innerHeight * (dir > 0 ? 1.1 : 0.35);
    }
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  },
  {
    no: 47,
    id: 'scroll-color-shift',
    cat: 'scroll',
    name: '스크롤 배경색 전환',
    en: 'Scroll Color Shift',
    level: 1,
    trigger: 'scroll',
    timing: '600ms ease · 화면 중앙선 기준',
    desc: '섹션이 화면 가운데를 지날 때마다 페이지 전체의 배경색과 글자색이 600ms 동안 부드럽게 바뀝니다. 색 자체가 이야기의 장면 전환 역할을 합니다.',
    use: '브랜드 스토리, 캠페인 페이지, 제품 시리즈 소개',
    tech: ['requestAnimationFrame', 'CSS transition', 'data 속성'],
    terms: ['배경색 전환 (Background Color Transition)', '스크롤 트리거 (Scroll Trigger)', '색상 보간 (Color Interpolation)'],
    prompt: '여러 섹션으로 이어지는 스토리 페이지에서 스크롤 위치에 따라 페이지 전체 배경색과 글자색이 부드럽게 바뀌는 스크롤 배경색 전환(Scroll-triggered Color Transition)을 만들어줘. 각 섹션에 data-bg, data-fg로 색을 지정하고(예: 새벽 #1c2140/#e8eaff, 아침 #f4ede1/#2b241b, 오후 #ffd166/#2b2206, 저녁 #ee6c4d/#23100a, 밤 #0d1020/#d9ddf2), requestAnimationFrame으로 스로틀한 스크롤 핸들러에서 화면 세로 중앙선(innerHeight / 2)을 지나는 섹션을 찾아줘(IntersectionObserver에 rootMargin -50% 0px -50% 0px를 줘도 돼). 활성 섹션이 바뀔 때만 body의 background-color와 color를 바꾸고, body에 transition: background-color 600ms ease, color 600ms ease를 걸어 색이 자연스럽게 보간되게 해줘. 섹션 안의 보조 텍스트, 장식 원, 버튼 테두리는 currentColor와 opacity로만 칠해 어떤 배경에서도 어울리게 하고, 모든 배경/글자 조합은 WCAG 대비 4.5:1 이상으로 맞춰줘.',
    html: `<main>
  <section class="panel" data-bg="var(--bg)" data-fg="var(--fg)">
    <p class="time">A DAY WITH FLOW</p>
    <h1>하루의 색이<br>바뀌는 순간들</h1>
    <p>새벽부터 밤까지, 시간마다 다른 방식으로 일을 돕습니다.</p>
  </section>
  <section class="panel" data-bg="#1c2140" data-fg="#e8eaff">
    <p class="time">06:00 · 새벽</p>
    <h2>가장 맑은 생각은<br>조용한 시간에 옵니다</h2>
    <p>알림이 쏟아지기 전, 오늘 꼭 끝낼 일 세 가지만 골라 두세요.</p>
  </section>
  <section class="panel" data-bg="#f4ede1" data-fg="#2b241b">
    <p class="time">09:00 · 아침</p>
    <h2>팀의 하루가<br>한 화면에 펼쳐집니다</h2>
    <p>회의, 마감, 담당자가 정리된 오늘의 보드로 가볍게 시작하세요.</p>
  </section>
  <section class="panel" data-bg="#ffd166" data-fg="#2b2206">
    <p class="time">13:00 · 오후</p>
    <h2>가장 바쁜 시간에도<br>흐름은 끊기지 않게</h2>
    <p>회의 중에도 필요한 문서가 옆에 떠 있어 창을 오갈 필요가 없습니다.</p>
  </section>
  <section class="panel" data-bg="#ee6c4d" data-fg="#23100a">
    <p class="time">18:00 · 저녁</p>
    <h2>마무리는<br>알아서 정리됩니다</h2>
    <p>오늘 끝낸 일과 내일로 넘길 일을 자동으로 나눠 드립니다.</p>
  </section>
  <section class="panel" data-bg="#0d1020" data-fg="#d9ddf2">
    <p class="time">22:00 · 밤</p>
    <h2>내일은 오늘보다<br>조금 더 가볍게</h2>
    <button type="button">무료로 시작하기</button>
  </section>
</main>`,
    css: `body {
  display: block;
  place-items: normal; /* 기본 스테이지의 가운데 정렬 해제 */
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: keep-all;
  /* 핵심: 배경색과 글자색을 600ms 동안 보간 */
  transition: background-color 600ms ease, color 600ms ease;
}
.panel {
  position: relative;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10vh clamp(20px, 8vw, 96px);
  overflow: hidden;
}
/* 장식 원: currentColor만 써서 어떤 배경에서도 어울림 */
.panel::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -14vmin;
  width: 60vmin;
  aspect-ratio: 1;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: radial-gradient(circle, currentColor, transparent 70%);
  opacity: .12;
  transform: translateY(-50%);
  pointer-events: none;
}
.panel > * { position: relative; }
.time {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .18em;
  opacity: .7;
}
h1, h2 {
  margin: 0;
  font-size: clamp(24px, 5vw, 46px);
  line-height: 1.2;
  letter-spacing: -.02em;
}
.panel p:not(.time) {
  max-width: 400px;
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.6;
  opacity: .78;
}
button {
  align-self: flex-start;
  margin-top: 22px;
  padding: 12px 22px;
  border: 1px solid currentColor;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: 600;
}`,
    js: `const sections = Array.from(document.querySelectorAll('[data-bg]'));
let active = null;

function update() {
  const mid = innerHeight / 2;
  // 화면 세로 중앙선을 지나고 있는 섹션을 찾음
  const current = sections.find((section) => {
    const r = section.getBoundingClientRect();
    return r.top <= mid && r.bottom > mid;
  });
  if (!current || current === active) return; // 섹션이 바뀔 때만 색 교체
  active = current;
  document.body.style.backgroundColor = current.dataset.bg;
  document.body.style.color = current.dataset.fg;
}

// 스크롤 이벤트를 rAF로 묶어 프레임당 한 번만 계산
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
update();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let autoOn = true, autoY = 0, holdUntil = 0, lastT = 0;
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  addEventListener(type, () => { autoOn = false; }, { passive: true });
});
function autoScroll(now) {
  if (!autoOn) return;
  const dt = lastT ? Math.min(now - lastT, 50) : 16;
  lastT = now;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (holdUntil) {
    // 끝에서 1초 멈춘 뒤 맨 위로 점프
    if (now > holdUntil) { holdUntil = 0; autoY = 0; scrollTo(0, 0); }
  } else {
    autoY = Math.min(autoY + dt * 0.075, max); // 약 1.2px/프레임
    scrollTo(0, autoY);
    if (autoY >= max) holdUntil = now + 1000;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);`
  }
);
