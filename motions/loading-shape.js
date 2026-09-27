window.MOTIONS = window.MOTIONS || [];
window.MOTIONS.push(
  {
    no: 48,
    id: 'spinner-ring',
    cat: 'loading',
    name: '스피너 링',
    en: 'Spinner Ring',
    level: 1,
    trigger: 'auto',
    timing: '900ms linear · 무한 회전',
    desc: '원뿔 그라디언트로 끝이 옅어지는 호를 그리고 마스크로 가운데를 뚫어 만든 회전 링입니다. 이미지나 SVG 없이 CSS만으로 매끈하고 가벼운 로딩 표시를 만듭니다.',
    use: '데이터 로딩 카드, 버튼 저장 중 상태, 페이지 전환 대기',
    tech: ['CSS conic-gradient', 'CSS mask', 'CSS @keyframes'],
    terms: ['스피너 (Spinner)', '원뿔 그라디언트 (Conic Gradient)', 'CSS 마스크 (CSS Mask)', '로딩 인디케이터 (Loading Indicator)'],
    prompt: '데이터 로딩 카드 가운데와 저장 버튼 안에 들어가는 스피너 링(Spinner Ring)을 만들어줘. 지름 52px 원에 conic-gradient로 12% 지점까지는 투명하다가 브랜드 포인트 컬러로 짙어지는 꼬리 달린 호를 그리고, 두께 5px만 남도록 radial-gradient 마스크(CSS Mask)로 가운데를 뚫어줘. 호 뒤에는 옅은 트랙 링을 깔고, 호의 머리 끝에는 두께만 한 작은 원을 얹어 둥근 끝(Round Cap)처럼 보이게 해줘. 전체를 900ms linear infinite로 rotate(1turn) 회전시키고, 버튼용으로 지름 16px·두께 2px·700ms 속도의 작은 변형을 만들어 색은 currentColor를 따르게 해줘. prefers-reduced-motion 환경에서는 회전을 멈추지 말고 2.4s로 느리게 해서 로딩 중이라는 신호는 유지해줘.',
    html: `<div class="panel" aria-busy="true">
  <div class="ring" role="status" aria-label="불러오는 중"></div>
  <div>
    <p class="title">데이터를 불러오는 중…</p>
    <p class="sub">최근 30일 매출 리포트를 준비하고 있어요</p>
  </div>
  <button class="btn" type="button">
    <span class="ring ring--sm" aria-hidden="true"></span>
    저장 중
  </button>
</div>`,
    css: `.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: min(340px, 88vw);
  padding: clamp(24px, 6vmin, 36px) 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  text-align: center;
}
.ring {
  --size: 52px;
  --thick: 5px;
  --color: var(--accent);
  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  /* 원뿔 그라디언트: 투명 → 포인트 컬러로 짙어지는 호, 뒤에는 옅은 트랙 */
  background: conic-gradient(transparent 12%, var(--color)) var(--line);
  /* 가운데를 원형 마스크로 뚫어 두께만큼의 링만 남김 */
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--thick)), #000 calc(100% - var(--thick) + 1px));
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--thick)), #000 calc(100% - var(--thick) + 1px));
  animation: spin 0.9s linear infinite;
}
/* 호의 머리(12시 방향)에 작은 원을 얹어 둥근 끝처럼 보이게 */
.ring::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--thick);
  height: var(--thick);
  margin-left: calc(var(--thick) / -2);
  border-radius: 50%;
  background: var(--color);
}
.ring--sm {
  --size: 16px;
  --thick: 2px;
  --color: currentColor;
  background: conic-gradient(transparent 12%, var(--color));
  animation-duration: 0.7s;
}
.title {
  margin: 0;
  font-size: clamp(15px, 2.4vw, 17px);
  font-weight: 600;
}
.sub {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--muted);
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font: 600 14px/1 var(--font);
  cursor: progress;
}
@keyframes spin {
  to { transform: rotate(1turn); }
}
@media (prefers-reduced-motion: reduce) {
  .ring { animation-duration: 2.4s; }
}`,
    js: ''
  },
  {
    no: 49,
    id: 'bouncing-dots',
    cat: 'loading',
    name: '바운싱 도트',
    en: 'Bouncing Dots',
    level: 1,
    trigger: 'auto',
    timing: '1.2s 루프 · 스태거 150ms',
    desc: '세 개의 점이 순서대로 튀어 올랐다 떨어지며 "입력 중"을 알려 주는 인디케이터입니다. 착지할 때 살짝 납작해지는 스쿼시가 들어가 말랑하고 경쾌하게 느껴집니다.',
    use: '채팅 입력 중 표시, AI 답변 대기, 짧은 처리 대기',
    tech: ['CSS @keyframes', 'animation-delay', 'CSS transform'],
    terms: ['타이핑 인디케이터 (Typing Indicator)', '스태거 지연 (Stagger Delay)', '스쿼시 앤 스트레치 (Squash and Stretch)', '바운스 애니메이션 (Bounce Animation)'],
    prompt: '채팅 화면에서 상대가 입력 중일 때 말풍선 안에 세 개의 점이 차례로 튀어 오르는 바운싱 도트(Bouncing Dots) 인디케이터를 만들어줘. 점은 지름 8px, 간격 5px로 두고 1.2s 주기로 8px 떠올랐다가 떨어지게 하되, 두 번째·세 번째 점에 150ms씩 스태거 지연(Stagger Delay)을 줘. 떠오를 때는 scale(0.92, 1.08)로 살짝 길쭉하게, 바닥에 닿는 순간에는 transform-origin을 아래쪽에 두고 scale(1.3, 0.7)로 납작하게 눌러 스쿼시 앤 스트레치(Squash and Stretch)를 넣어줘. 점 색은 흐린 텍스트 컬러로 두고 떠오를 때만 opacity 0.45에서 1로 밝아지게 해줘. 말풍선에는 role="status"와 입력 중 레이블을 달고, prefers-reduced-motion에서는 이동 없이 opacity만 깜빡이게 해줘.',
    html: `<div class="chat">
  <div class="bubble bubble--me">내일 회의 자료 공유해 주실 수 있나요?</div>
  <div class="row">
    <span class="avatar">지</span>
    <div class="bubble typing" role="status" aria-label="지민님이 입력 중">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  <p class="meta">지민님이 입력 중…</p>
</div>`,
    css: `.chat {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(360px, 88vw);
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;
}
.bubble {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.5;
  word-break: keep-all;
}
.bubble--me {
  align-self: flex-end;
  background: var(--accent);
  color: var(--bg);
  border-bottom-right-radius: 6px;
}
.row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.avatar {
  display: grid;
  place-items: center;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--line);
  font-size: 12px;
  font-weight: 700;
}
.typing {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 40px;
  padding: 0 16px 13px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-bottom-left-radius: 6px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--muted);
  opacity: .45;
  transform-origin: 50% 100%; /* 바닥 기준으로 찌그러지게 */
  animation: bounce 1.2s ease-in-out infinite;
}
.dot:nth-child(2) { animation-delay: .15s; }
.dot:nth-child(3) { animation-delay: .3s; }
@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0) scale(1, 1); opacity: .45; }
  25% { transform: translateY(-8px) scale(.92, 1.08); opacity: 1; } /* 떠오를 땐 길쭉하게 */
  45% { transform: translateY(0) scale(1.3, .7); opacity: .8; }     /* 착지 순간 납작하게 */
}
.meta {
  margin: 0 0 0 38px;
  font-size: 12px;
  color: var(--muted);
}
@media (prefers-reduced-motion: reduce) {
  .dot { animation-name: blink; }
}
@keyframes blink {
  0%, 100% { opacity: .45; }
  50% { opacity: 1; }
}`,
    js: ''
  },
  {
    no: 50,
    id: 'skeleton-shimmer',
    cat: 'loading',
    name: '스켈레톤 쉬머',
    en: 'Skeleton Shimmer',
    level: 1,
    trigger: 'auto',
    timing: '쉬머 1.4s · 500ms 크로스페이드',
    desc: '콘텐츠가 들어올 자리를 회색 블록으로 먼저 보여 주고 그 위로 빛 띠가 지나가게 하는 로딩 화면입니다. 데이터가 도착하면 실제 콘텐츠로 부드럽게 교차 전환됩니다.',
    use: '피드·목록 첫 로딩, 카드형 대시보드, 상세 페이지 진입',
    tech: ['CSS @keyframes', 'CSS transition', 'linear-gradient'],
    terms: ['스켈레톤 UI (Skeleton UI)', '쉬머 효과 (Shimmer Effect)', '크로스페이드 (Cross-fade)', '레이아웃 이동 방지 (Cumulative Layout Shift)'],
    prompt: '피드 카드가 데이터를 받기 전에 실제 레이아웃과 같은 모양의 스켈레톤 UI(Skeleton UI)를 보여 주고, 그 위로 빛 띠가 지나가는 쉬머 효과(Shimmer Effect)를 만들어줘. 아바타 40px 원, 이름·부제 줄, 이미지 영역, 본문 두 줄을 옅은 블록으로 그리고, 각 블록의 ::after에 투명 → 밝은색 → 투명 linear-gradient를 깔아 translateX(-100%)에서 100%까지 1.4s ease-in-out으로 무한 반복해줘. 스켈레톤과 실제 콘텐츠는 같은 grid 칸에 겹쳐 두고, 데이터가 도착하면 카드에 is-loaded 클래스를 붙여 스켈레톤은 opacity 0으로, 콘텐츠는 opacity 0·translateY(6px)에서 제자리로 500ms 동안 크로스페이드(Cross-fade)해줘. 로딩 중에는 카드에 aria-busy="true"를 달고, 스켈레톤 블록 크기를 실제 콘텐츠와 맞춰 전환 순간 레이아웃이 튀지 않게(CLS 방지) 해줘.',
    html: `<article class="card" aria-busy="true">
  <div class="layer skeleton" aria-hidden="true">
    <div class="head">
      <span class="sk avatar"></span>
      <div class="lines">
        <span class="sk line w40"></span>
        <span class="sk line sm w24"></span>
      </div>
    </div>
    <span class="sk media"></span>
    <span class="sk line"></span>
    <span class="sk line w72"></span>
  </div>
  <div class="layer content">
    <div class="head">
      <span class="avatar photo">하</span>
      <div class="lines">
        <strong>김하늘</strong>
        <span class="time">디자인팀 · 3분 전</span>
      </div>
    </div>
    <div class="media"></div>
    <p>이번 주 디자인 리뷰 정리본을 올렸어요. 모션 가이드 초안도 함께 확인해 주세요.</p>
  </div>
</article>`,
    css: `.card {
  display: grid;
  width: min(380px, 88vw);
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
}
.layer {
  grid-area: 1 / 1; /* 두 레이어를 같은 칸에 겹침 */
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: opacity .5s ease, transform .5s ease;
}
.content { opacity: 0; transform: translateY(6px); }
.card.is-loaded .skeleton { opacity: 0; }
.card.is-loaded .content { opacity: 1; transform: none; }

.head { display: flex; align-items: center; gap: 12px; }
.lines { display: flex; flex-direction: column; gap: 7px; flex: 1; }
.avatar { flex: none; width: 40px; height: 40px; border-radius: 50%; }
.media { height: clamp(72px, 20vmin, 130px); border-radius: 12px; }
.line { height: 12px; border-radius: 6px; }
.line.sm { height: 10px; }
.w40 { width: 40%; }
.w24 { width: 24%; }
.w72 { width: 72%; }

/* 스켈레톤 블록: 옅은 바탕 위로 빛 띠가 왼쪽 → 오른쪽으로 지나감 */
.sk {
  position: relative;
  overflow: hidden;
  background: var(--line);
}
.sk::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, var(--line), transparent);
  transform: translateX(-100%);
  animation: shimmer 1.4s ease-in-out infinite;
}
@keyframes shimmer {
  to { transform: translateX(100%); }
}

/* 실제 콘텐츠 */
.photo {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--bg);
  font-size: 14px;
  font-weight: 700;
}
.content strong { font-size: 14px; }
.time { font-size: 12px; color: var(--muted); }
.content .media { background: linear-gradient(120deg, var(--accent), var(--accent-2)); opacity: .85; }
.content p { margin: 0; font-size: 14px; line-height: 1.6; word-break: keep-all; }`,
    js: `const card = document.querySelector('.card');

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
// 실제로는 데이터 응답이 도착했을 때 is-loaded 클래스를 한 번만 붙이면 됩니다
function toggle() {
  const loaded = card.classList.toggle('is-loaded');
  card.setAttribute('aria-busy', String(!loaded));
  setTimeout(toggle, loaded ? 2600 : 2500);
}
setTimeout(toggle, 2500);`
  },
  {
    no: 51,
    id: 'indeterminate-bar',
    cat: 'loading',
    name: '무한 진행 바',
    en: 'Indeterminate Progress Bar',
    level: 2,
    trigger: 'auto',
    timing: '2.1s 루프 · 2번 세그먼트 1.15s 지연',
    desc: '끝을 알 수 없는 작업에는 두 세그먼트가 흘러가는 얇은 바를, 진행률을 아는 작업에는 차오르는 바를 쓰는 진행 표시입니다. 화면 상단이나 업로드 목록에 조용히 붙어 상태를 알려 줍니다.',
    use: '페이지 전환 상단 바, 파일 업로드, 설치·동기화 진행',
    tech: ['CSS @keyframes', 'CSS transition', 'JavaScript'],
    terms: ['무한 진행 바 (Indeterminate Progress Bar)', '확정 진행 바 (Determinate Progress Bar)', '머티리얼 디자인 (Material Design)', '진행률 표시 (Progress Indicator)'],
    prompt: '페이지 상단에 높이 3px짜리 무한 진행 바(Indeterminate Progress Bar)를 붙이고, 파일 업로드 행에는 실제 퍼센트를 보여 주는 확정 진행 바(Determinate Progress Bar)를 만들어줘. 무한 진행 바는 옅은 트랙 위에 브랜드 포인트 컬러 세그먼트 두 개를 두고, 둘 다 2.1s 주기로 left·right 값을 키프레임으로 옮기되 첫 번째는 cubic-bezier(.65,.815,.735,.395), 두 번째는 cubic-bezier(.165,.84,.44,1)에 1.15s 지연을 줘서 머티리얼 디자인(Material Design)처럼 길이와 속도가 바뀌며 흘러가게 해줘. 확정 진행 바는 높이 6px 트랙 안의 채움 막대를 transform: scaleX(0~1)과 transform-origin: left로 늘리고 300ms ease-out 트랜지션을 줘. 옆에는 퍼센트 숫자를 tabular-nums로 표시하고 100%가 되면 "완료"로 바꿔줘. 두 바 모두 role="progressbar"를 달고, 확정 바는 aria-valuenow를 진행률에 맞춰 갱신해줘.',
    html: `<div class="window">
  <div class="topbar" role="progressbar" aria-label="페이지 불러오는 중">
    <span class="seg seg1"></span>
    <span class="seg seg2"></span>
  </div>
  <div class="page" aria-hidden="true">
    <span class="ph title"></span>
    <span class="ph"></span>
    <span class="ph short"></span>
  </div>
  <div class="upload">
    <span class="file-icon">PDF</span>
    <div class="info">
      <div class="row">
        <strong>3분기 실적 보고서.pdf</strong>
        <span class="pct">0%</span>
      </div>
      <div class="track" role="progressbar" aria-label="업로드 진행률" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
        <span class="fill"></span>
      </div>
    </div>
  </div>
</div>`,
    css: `.window {
  position: relative;
  width: min(440px, 90vw);
  padding: 30px 22px 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
}
/* 상단 무한 진행 바: 트랙 위로 두 세그먼트가 서로 다른 속도로 지나감 */
.topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  overflow: hidden;
  background: var(--line);
}
.seg {
  position: absolute;
  top: 0;
  bottom: 0;
  background: var(--accent);
}
.seg1 { animation: seg1 2.1s cubic-bezier(.65, .815, .735, .395) infinite; }
.seg2 { animation: seg2 2.1s cubic-bezier(.165, .84, .44, 1) 1.15s infinite; }
@keyframes seg1 {
  0% { left: -35%; right: 100%; }
  60%, 100% { left: 100%; right: -90%; }
}
@keyframes seg2 {
  0% { left: -200%; right: 100%; }
  60%, 100% { left: 107%; right: -8%; }
}

.page { display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; }
.ph { height: 10px; border-radius: 5px; background: var(--line); }
.ph.title { width: 55%; height: 16px; margin-bottom: 4px; }
.ph.short { width: 68%; }

.upload {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 14px;
}
.file-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 40px;
  height: 46px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  color: var(--accent);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
}
.info { flex: 1; min-width: 0; }
.row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 9px;
  font-size: 13px;
}
.row strong { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pct { flex: none; color: var(--muted); font-variant-numeric: tabular-nums; }
.track { height: 6px; border-radius: 3px; background: var(--line); overflow: hidden; }
/* 확정 진행 바: width 대신 scaleX로 늘려 레이아웃 재계산을 피함 */
.fill {
  display: block;
  height: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .3s ease-out;
}`,
    js: `const fill = document.querySelector('.fill');
const track = document.querySelector('.track');
const pct = document.querySelector('.pct');
let value = 0;

// 실제로는 업로드 progress 이벤트의 loaded / total 비율을 value에 넣으면 됩니다
function render() {
  fill.style.transform = 'scaleX(' + value / 100 + ')';
  track.setAttribute('aria-valuenow', Math.round(value));
  pct.textContent = value >= 100 ? '완료' : Math.round(value) + '%';
}

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
function tick() {
  if (value >= 100) {
    setTimeout(reset, 1400);
    return;
  }
  value = Math.min(100, value + 3 + Math.random() * 9);
  render();
  setTimeout(tick, 200 + Math.random() * 250);
}
function reset() {
  value = 0;
  fill.style.transition = 'none'; // 0으로 되돌릴 때는 애니메이션 없이
  render();
  void fill.offsetWidth;          // 강제 리플로우로 즉시 반영
  fill.style.transition = '';
  setTimeout(tick, 600);
}
tick();`
  },
  {
    no: 52,
    id: 'progress-ring',
    cat: 'loading',
    name: '원형 진행률',
    en: 'Circular Progress Ring',
    level: 2,
    trigger: 'auto',
    timing: '3.2s easeInOutCubic · 1.4s 정지',
    desc: 'SVG 원의 스트로크 대시를 조절해 링이 시계 방향으로 차오르는 진행률 표시입니다. 가운데 숫자가 함께 올라가 현재 진행 상황을 한눈에 보여 줍니다.',
    use: '백업·업로드 진행, 목표 달성률, 프로필 완성도',
    tech: ['SVG', 'stroke-dasharray', 'stroke-dashoffset', 'requestAnimationFrame'],
    terms: ['원형 진행률 (Circular Progress)', '스트로크 대시 오프셋 (Stroke Dashoffset)', '카운트업 (Count-up)', '이징 함수 (Easing Function)'],
    prompt: '백업 상태 카드 왼쪽에 SVG 원형 진행률(Circular Progress) 링을 만들어줘. viewBox 120 기준 반지름 52, 두께 9의 circle을 트랙과 진행 막대로 두 겹 겹치고, 진행 막대는 stroke-dasharray를 원 둘레(2πr ≈ 326.7)로 둔 뒤 stroke-dashoffset을 둘레 × (1 - 진행률)로 줄여서 채워지게 해줘. SVG를 -90도 회전해 12시 방향에서 시작하고 stroke-linecap: round로 끝을 둥글게 해줘. 데모처럼 3.2s 동안 easeInOutCubic으로 0 → 100%를 채우면서 가운데 퍼센트와 1,284장 중 업로드된 장수를 requestAnimationFrame으로 함께 카운트업(Count-up)하고, 100%에서 1.4s 머문 뒤 다시 시작해줘. 진행률이 0일 때 둥근 캡 때문에 점 하나가 남아 보이는 문제는 진행 막대를 opacity 0으로 숨겨서 처리해줘.',
    html: `<div class="card">
  <div class="ring">
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle class="track" cx="60" cy="60" r="52" />
      <circle class="bar" cx="60" cy="60" r="52" />
    </svg>
    <div class="value"><b>0</b><span>%</span></div>
  </div>
  <div>
    <p class="title">사진 백업 중</p>
    <p class="sub"><span class="count">0</span> / 1,284장</p>
  </div>
</div>`,
    css: `.card {
  display: flex;
  align-items: center;
  gap: clamp(16px, 4vw, 28px);
  width: min(400px, 88vw);
  padding: clamp(18px, 4vw, 28px);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;
}
.ring {
  position: relative;
  flex: none;
  width: clamp(96px, 28vmin, 132px);
  aspect-ratio: 1;
}
.ring svg {
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg); /* 12시 방향에서 시작 */
}
circle { fill: none; stroke-width: 9; }
.track { stroke: var(--line); }
.bar { stroke: var(--accent); stroke-linecap: round; }
.value {
  position: absolute;
  inset: 0;
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  align-items: baseline;
  font-variant-numeric: tabular-nums;
}
.value b { font-size: clamp(22px, 6vmin, 30px); font-weight: 700; letter-spacing: -.02em; }
.value span { margin-left: 1px; font-size: 13px; color: var(--muted); }
.title { margin: 0 0 6px; font-size: clamp(15px, 2.4vw, 18px); font-weight: 600; }
.sub { margin: 0; font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; }`,
    js: `const bar = document.querySelector('.bar');
const valueEl = document.querySelector('.value b');
const countEl = document.querySelector('.count');
const title = document.querySelector('.title');
const TOTAL = 1284;

// 원 둘레 = 대시 하나의 길이. offset을 둘레만큼 주면 텅 빈 상태
const C = 2 * Math.PI * 52;
bar.style.strokeDasharray = C;

function setProgress(p) {
  bar.style.strokeDashoffset = C * (1 - p);
  bar.style.opacity = p > 0.002 ? 1 : 0; // 0%일 때 둥근 캡 점이 보이지 않게
  valueEl.textContent = Math.round(p * 100);
  countEl.textContent = Math.round(p * TOTAL).toLocaleString('ko-KR');
  title.textContent = p >= 1 ? '백업 완료' : '사진 백업 중';
}

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다 (실제 진행률을 setProgress에 넣으세요)
const FILL = 3200, HOLD = 1400;
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
let start = null;
function frame(now) {
  if (start === null) start = now;
  const t = (now - start) % (FILL + HOLD);
  setProgress(ease(Math.min(t / FILL, 1)));
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 53,
    id: 'pulse-radar',
    cat: 'loading',
    name: '펄스 레이더',
    en: 'Pulse Radar',
    level: 1,
    trigger: 'auto',
    timing: '2.4s 루프 · 링 3개 · 800ms 간격',
    desc: '가운데 아이콘에서 동심원이 차례로 퍼져 나가며 사라지는 탐색 중 표시입니다. 전파가 퍼지는 듯한 리듬이 "찾는 중"이라는 상태를 직관적으로 전달합니다.',
    use: '근처 기기 검색, 위치 탐색, 실시간 연결 대기',
    tech: ['CSS @keyframes', 'CSS transform', 'animation-delay'],
    terms: ['펄스 애니메이션 (Pulse Animation)', '리플 효과 (Ripple Effect)', '스태거 (Stagger)', '동심원 (Concentric Circles)'],
    prompt: '기기 검색 화면 가운데에 블루투스 아이콘을 담은 원형 버튼을 두고, 그 뒤로 동심원이 퍼져 나가는 펄스 레이더(Pulse Radar) 효과를 만들어줘. 아이콘 원과 같은 크기의 링 3개를 겹쳐 두고, 각 링을 2.4s cubic-bezier(.2,.6,.35,1) 무한 반복으로 scale(1)에서 scale(3)까지 키우면서 opacity를 0.6에서 0으로 줄여줘. 링마다 animation-delay를 0s, -0.8s, -1.6s처럼 음수로 줘서 첫 프레임부터 세 개가 800ms 간격으로 퍼져 있게 스태거(Stagger)해줘. 링은 브랜드 포인트 컬러의 1.5px 테두리에 안쪽 가장자리만 옅게 번지는 radial-gradient(투명 70% → 포인트 컬러 40%) 채움을 넣고, 아이콘 원은 z-index로 링 위에 올려줘. 링 컨테이너는 아이콘 지름의 3.2배로 잡아 커진 링이 잘리지 않게 하고, prefers-reduced-motion에서는 확장 애니메이션을 끄고 링을 1.6배 크기에 옅게 고정해줘.',
    html: `<div class="scan">
  <div class="radar">
    <span class="ring"></span>
    <span class="ring"></span>
    <span class="ring"></span>
    <div class="core">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10-5 5V2l5 5L7 17" /></svg>
    </div>
  </div>
  <p class="title">근처 기기 찾는 중</p>
  <p class="sub">블루투스를 켠 기기를 가까이 두세요</p>
</div>`,
    css: `.scan {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.radar {
  --core: clamp(52px, 14vmin, 68px);
  display: grid;
  place-items: center;
  width: calc(var(--core) * 3.2); /* 3배로 커진 링이 잘리지 않을 여유 */
  height: calc(var(--core) * 3.2);
}
.core, .ring {
  grid-area: 1 / 1;
  width: var(--core);
  height: var(--core);
  border-radius: 50%;
}
.core {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  background: var(--accent);
  box-shadow: 0 8px 24px -6px var(--accent);
}
.core svg {
  width: 44%;
  fill: none;
  stroke: var(--bg);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
/* 링이 1배 → 3배로 커지며 사라짐. 음수 지연으로 처음부터 세 개가 퍼져 있게 */
.ring {
  border: 1.5px solid var(--accent);
  background: radial-gradient(closest-side, transparent 70%, color-mix(in srgb, var(--accent) 40%, transparent));
  opacity: 0;
  animation: pulse 2.4s cubic-bezier(.2, .6, .35, 1) infinite;
}
.ring:nth-child(2) { animation-delay: -.8s; }
.ring:nth-child(3) { animation-delay: -1.6s; }
@keyframes pulse {
  from { transform: scale(1); opacity: .6; }
  to { transform: scale(3); opacity: 0; }
}
.title { margin: 6px 0 4px; font-size: clamp(15px, 2.4vw, 18px); font-weight: 600; }
.sub { margin: 0; font-size: 13px; color: var(--muted); }
@media (prefers-reduced-motion: reduce) {
  .ring { animation: none; opacity: .15; transform: scale(1.6); }
}`,
    js: ''
  },
  {
    no: 54,
    id: 'orbit-loader',
    cat: 'loading',
    name: '오비트 로더',
    en: 'Orbit Loader',
    level: 2,
    trigger: 'auto',
    timing: '궤도별 1.1s · 1.7s · 2.6s linear',
    desc: '크기가 다른 궤도 위의 점들이 서로 다른 속도와 방향으로 중심을 돌고, 지나간 자리에 옅은 꼬리를 남기는 로더입니다. 단순한 스피너보다 무언가를 생각하는 중이라는 느낌이 강합니다.',
    use: 'AI 답변 생성 대기, 분석·계산 중 화면, 앱 스플래시',
    tech: ['CSS @keyframes', 'CSS conic-gradient', 'CSS mask'],
    terms: ['오비트 애니메이션 (Orbit Animation)', '잔상 꼬리 (Motion Trail)', '원뿔 그라디언트 (Conic Gradient)', '로딩 인디케이터 (Loading Indicator)'],
    prompt: 'AI 답변 대기 카드에 여러 개의 점이 중심을 돌며 궤도를 그리는 오비트 로더(Orbit Loader)를 만들어줘. 컨테이너 지름의 40%, 68%, 96%인 동심 궤도 3개를 두고 각 궤도 꼭대기에 9px, 7px, 6px 점을 붙인 뒤, 궤도 자체를 1.1s, 1.7s(반대 방향), 2.6s linear infinite로 회전시켜 서로 다른 속도로 돌게 해줘. 점 뒤에는 conic-gradient로 점 쪽이 진하고 멀어질수록 투명해지는 호를 그리고 radial-gradient 마스크로 2px 링만 남겨 잔상 꼬리(Motion Trail)를 만들어줘. 반대로 도는 궤도는 그라디언트 방향도 뒤집어 꼬리가 항상 점 뒤에 오게 하고, 점과 중심점에는 같은 색 box-shadow로 은은한 글로우를 줘. 궤도 색은 브랜드 포인트 컬러, 보조 컬러, 본문 컬러로 나눠 쓰고, prefers-reduced-motion에서는 회전 속도를 3배 느리게 해줘.',
    html: `<div class="card">
  <div class="orbiter" role="status" aria-label="답변 생성 중">
    <div class="orbit o1"><i></i></div>
    <div class="orbit o2"><i></i></div>
    <div class="orbit o3"><i></i></div>
    <span class="center"></span>
  </div>
  <div>
    <p class="title">AI가 답변을 준비하고 있어요</p>
    <p class="sub">문서 12개를 분석하는 중</p>
  </div>
</div>`,
    css: `.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: min(340px, 88vw);
  padding: clamp(22px, 5vmin, 34px) 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;
  text-align: center;
}
.orbiter {
  position: relative;
  width: clamp(96px, 30vmin, 140px);
  aspect-ratio: 1;
}
/* 궤도: 회전하는 원. 꼭대기에 점(i)이 붙어 있음 */
.orbit {
  position: absolute;
  border-radius: 50%;
  animation: orbit var(--dur) linear infinite;
}
.o1 { inset: 30%; --c: var(--accent); --dot: 9px; --dur: 1.1s; }
.o2 { inset: 16%; --c: var(--accent-2); --dot: 7px; --dur: 1.7s; animation-direction: reverse; }
.o3 { inset: 2%; --c: var(--fg); --dot: 6px; --dur: 2.6s; }
/* 꼬리: 점 쪽이 진하고 뒤로 갈수록 투명한 얇은 호 (원뿔 그라디언트 + 링 마스크) */
.orbit::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(transparent 55%, var(--c));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px));
  opacity: .8;
}
/* 반대로 도는 궤도는 꼬리 방향도 뒤집음 */
.o2::before { background: conic-gradient(var(--c), transparent 45%); }
.orbit i {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--dot);
  height: var(--dot);
  margin: calc(var(--dot) / -2 + 1px) 0 0 calc(var(--dot) / -2);
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 10px var(--c);
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 16px var(--accent);
}
@keyframes orbit {
  to { transform: rotate(1turn); }
}
.title { margin: 0 0 6px; font-size: clamp(15px, 2.4vw, 17px); font-weight: 600; }
.sub { margin: 0; font-size: 13px; color: var(--muted); }
@media (prefers-reduced-motion: reduce) {
  .orbit { animation-duration: calc(var(--dur) * 3); }
}`,
    js: ''
  },
  {
    no: 55,
    id: 'equalizer',
    cat: 'loading',
    name: '이퀄라이저 바',
    en: 'Equalizer Bars',
    level: 1,
    trigger: 'auto',
    timing: '막대별 0.62~1.1s · alternate 루프',
    desc: '높이가 다른 막대들이 제각각 오르내리며 지금 소리가 재생 중임을 보여 주는 작은 인디케이터입니다. 막대마다 주기와 위상을 달리해 실제 오디오처럼 불규칙하게 움직입니다.',
    use: '음악·팟캐스트 재생 중 표시, 음성 통화 상태, 라이브 방송 배지',
    tech: ['CSS @keyframes', 'CSS transform', 'animation-play-state'],
    terms: ['이퀄라이저 바 (Equalizer Bars)', '재생 중 표시 (Now Playing Indicator)', '오디오 비주얼라이저 (Audio Visualizer)', '위상 오프셋 (Phase Offset)'],
    prompt: '미니 음악 플레이어 카드의 곡 제목 옆에 지금 재생 중임을 알려 주는 이퀄라이저 바(Equalizer Bars) 애니메이션을 만들어줘. 폭 3px, 간격 3px, 높이 22px인 막대 6개를 transform-origin: bottom으로 두고, scaleY를 0.2 → 0.85 → 0.45 → 1로 오르내리는 키프레임을 ease-in-out alternate로 무한 반복해줘. 막대마다 주기를 0.62s~1.1s 사이로 다르게 주고 음수 animation-delay로 위상을 흩어서 실제 오디오처럼 불규칙하게 보이게 해줘. height 대신 transform: scaleY만 애니메이션해서 레이아웃 재계산 없이 처리하고, 일시정지 버튼을 누르면 animation-play-state: paused로 막대와 재생 진행 바가 함께 멈추게 해줘. prefers-reduced-motion에서도 paused를 걸어 막대가 서로 다른 높이에 멈춘 정적인 아이콘으로 보이게 해줘.',
    html: `<div class="player">
  <div class="art" aria-hidden="true"></div>
  <div class="meta">
    <div class="top">
      <div>
        <p class="song">새벽 드라이브</p>
        <p class="artist">Lumen · 밤의 도시</p>
      </div>
      <div class="eq" role="img" aria-label="재생 중">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
    <div class="progress"><span></span></div>
    <div class="controls">
      <button type="button" aria-label="이전 곡">
        <svg viewBox="0 0 24 24"><path d="M6 5v14M19 5l-9 7 9 7z" /></svg>
      </button>
      <button type="button" class="play" aria-label="일시정지">
        <svg class="icon-pause" viewBox="0 0 24 24"><path d="M8.5 5v14M15.5 5v14" /></svg>
        <svg class="icon-play" viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" /></svg>
      </button>
      <button type="button" aria-label="다음 곡">
        <svg viewBox="0 0 24 24"><path d="M18 5v14M5 5l9 7-9 7z" /></svg>
      </button>
    </div>
  </div>
</div>`,
    css: `.player {
  display: flex;
  align-items: center;
  gap: clamp(14px, 3vw, 20px);
  width: min(420px, 90vw);
  padding: clamp(14px, 3vw, 20px);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;
}
.art {
  flex: none;
  width: clamp(76px, 22vmin, 112px);
  aspect-ratio: 1;
  border-radius: 14px;
  background:
    radial-gradient(circle at 30% 30%, var(--accent-2), transparent 55%),
    linear-gradient(135deg, var(--accent), var(--surface));
}
.meta { flex: 1; min-width: 0; }
.top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.song { margin: 0 0 3px; font-size: 15px; font-weight: 600; }
.artist { margin: 0; font-size: 12px; color: var(--muted); }

/* 이퀄라이저: 막대마다 다른 주기와 위상으로 scaleY를 오르내림 */
.eq { display: flex; align-items: flex-end; gap: 3px; flex: none; height: 22px; }
.eq span {
  width: 3px;
  height: 100%;
  border-radius: 2px;
  background: var(--accent);
  transform-origin: bottom;
  animation: eq var(--d) ease-in-out infinite alternate;
}
.eq span:nth-child(1) { --d: .9s; }
.eq span:nth-child(2) { --d: .62s; animation-delay: -.3s; }
.eq span:nth-child(3) { --d: 1.1s; animation-delay: -.5s; }
.eq span:nth-child(4) { --d: .74s; animation-delay: -.2s; }
.eq span:nth-child(5) { --d: 1s; animation-delay: -.7s; }
.eq span:nth-child(6) { --d: .82s; animation-delay: -.4s; }
@keyframes eq {
  0% { transform: scaleY(.2); }
  35% { transform: scaleY(.85); }
  65% { transform: scaleY(.45); }
  100% { transform: scaleY(1); }
}

.progress { height: 4px; margin: 14px 0 10px; border-radius: 2px; background: var(--line); overflow: hidden; }
.progress span {
  display: block;
  height: 100%;
  background: var(--fg);
  transform-origin: left;
  animation: progress 40s linear infinite;
}
@keyframes progress {
  from { transform: scaleX(.18); }
  to { transform: scaleX(1); }
}
.controls { display: flex; align-items: center; justify-content: center; gap: 18px; }
.controls button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--fg);
  cursor: pointer;
}
.controls svg { width: 18px; height: 18px; fill: currentColor; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.controls .play { width: 38px; height: 38px; background: var(--fg); color: var(--surface); }
.icon-pause { stroke-width: 3; }
.icon-play { display: none; }

/* 일시정지: 애니메이션을 그 자리에서 멈춤 */
.is-paused .icon-play { display: block; }
.is-paused .icon-pause { display: none; }
.is-paused .eq span,
.is-paused .progress span { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .eq span, .progress span { animation-play-state: paused; }
}`,
    js: `const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');

// 재생/일시정지 토글: 클래스 하나로 막대와 진행 바를 함께 멈춤
playBtn.addEventListener('click', () => {
  const paused = player.classList.toggle('is-paused');
  playBtn.setAttribute('aria-label', paused ? '재생' : '일시정지');
});`
  },
  {
    no: 56,
    id: 'infinity-loader',
    cat: 'loading',
    name: '인피니티 로더',
    en: 'Infinity Loader',
    level: 1,
    trigger: 'auto',
    timing: '1.8s linear · 무한 루프',
    desc: '무한대 기호 모양의 트랙 위를 끝이 진한 선이 끝없이 따라 도는 로더입니다. 매끄럽게 순환하는 동선이 잠시 기다려 달라는 신호를 차분하게 전달합니다.',
    use: '결제·송금 처리 대기, 본인 인증 확인, 긴 작업 대기 화면',
    tech: ['SVG', 'stroke-dasharray', 'stroke-dashoffset', 'CSS @keyframes'],
    terms: ['렘니스케이트 곡선 (Lemniscate)', '스트로크 대시 오프셋 (Stroke Dashoffset)', '경로 길이 정규화 (pathLength)', '로딩 인디케이터 (Loading Indicator)'],
    prompt: '결제 처리 대기 화면 가운데에 8자 모양을 따라 선이 끝없이 도는 인피니티 로더(Infinity Loader)를 만들어줘. SVG path로 무한대 기호 모양의 렘니스케이트(Lemniscate) 곡선을 그리고 pathLength="100"으로 길이를 정규화한 뒤, 같은 경로를 옅은 트랙, 꼬리, 머리 세 겹으로 겹쳐줘. 머리는 stroke-dasharray: 12 88, 꼬리는 30 70에 opacity 0.3을 주고, 둘 다 1.8s linear infinite로 stroke-dashoffset을 100만큼 줄여 경로를 한 바퀴 돌게 해줘. 머리에는 한 바퀴의 18%인 animation-delay: -0.324s를 줘서 꼬리 앞쪽 끝에 겹치면 끝이 진한 혜성 모양이 되고, 대시 합이 경로 길이와 같아서 이음새 없이 반복돼. 선 두께는 4에 stroke-linecap: round로 두고, prefers-reduced-motion에서는 한 바퀴를 4s로 늦춰줘.',
    html: `<div class="card">
  <svg class="infinity" viewBox="0 0 100 50" role="img" aria-label="결제 처리 중">
    <path class="track" pathLength="100" d="M50 25C60 10 90 10 90 25S60 40 50 25 10 10 10 25 40 40 50 25Z" />
    <path class="tail" pathLength="100" d="M50 25C60 10 90 10 90 25S60 40 50 25 10 10 10 25 40 40 50 25Z" />
    <path class="head" pathLength="100" d="M50 25C60 10 90 10 90 25S60 40 50 25 10 10 10 25 40 40 50 25Z" />
  </svg>
  <p class="title">결제를 처리하고 있어요</p>
  <p class="sub">창을 닫거나 새로고침하지 마세요</p>
</div>`,
    css: `.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(340px, 88vw);
  padding: clamp(24px, 6vmin, 38px) 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;
  text-align: center;
}
.infinity {
  width: clamp(120px, 34vmin, 170px);
  height: auto;
  margin-bottom: 18px;
  overflow: visible;
}
.infinity path { fill: none; stroke-width: 4; stroke-linecap: round; }
.track { stroke: var(--line); }
/* pathLength=100으로 정규화해 대시 길이를 경로 대비 %처럼 다룸 */
.head, .tail {
  stroke: var(--accent);
  animation: travel 1.8s linear infinite;
}
.tail { stroke-dasharray: 30 70; opacity: .3; }
/* 머리는 한 바퀴의 18%(0.324s)만큼 앞서 출발해 꼬리 앞쪽 끝에 겹침 */
.head { stroke-dasharray: 12 88; animation-delay: -.324s; }
@keyframes travel {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -100; } /* 대시 합 = 경로 길이라 한 바퀴 뒤 같은 모양 */
}
.title { margin: 0 0 6px; font-size: clamp(15px, 2.4vw, 17px); font-weight: 600; }
.sub { margin: 0; font-size: 13px; color: var(--muted); }
@media (prefers-reduced-motion: reduce) {
  .head, .tail { animation-duration: 4s; }
  .head { animation-delay: -.72s; } /* 4s의 18% */
}`,
    js: ''
  },
  {
    no: 57,
    id: 'liquid-fill',
    cat: 'loading',
    name: '리퀴드 채우기',
    en: 'Liquid Fill Progress',
    level: 2,
    trigger: 'auto',
    timing: '물결 7s·10s 회전 · 채우기 4.2s',
    desc: '원 안에 물결치는 액체가 진행률만큼 차오르는 진행 표시입니다. 두 겹의 물결이 서로 다른 속도로 출렁여 숫자만 보여 줄 때보다 친근하고 생동감 있게 느껴집니다.',
    use: '업데이트·설치 진행, 저장 공간·배터리 표시, 목표 달성률',
    tech: ['CSS @keyframes', 'clip-path', 'requestAnimationFrame'],
    terms: ['리퀴드 채우기 (Liquid Fill)', '웨이브 애니메이션 (Wave Animation)', '진행률 표시 (Progress Indicator)', '클립 패스 (Clip Path)'],
    prompt: '업데이트 진행 카드에 원 안에서 물이 차오르는 리퀴드 채우기(Liquid Fill) 진행률 표시를 만들어줘. 지름 124~172px 원을 clip-path: circle(50%)로 자르고, 그 안에 원 지름 2배 크기의 정사각형 두 개를 border-radius 38%, 42%로 둥글려 겹친 뒤 각각 7s, 10s linear infinite로 회전시켜 윗변이 출렁이는 물결(Wave)처럼 보이게 해줘. 두 물결은 브랜드 포인트 컬러를 opacity 0.35와 0.6으로 겹쳐 가운데 퍼센트 글자가 물 위와 빈 곳 모두에서 읽히게 하고, 물결을 감싼 요소를 top 대신 transform: translateY(110% - 진행률 × 120%)로 올려 수위를 표현해줘(물결 높이만큼 위아래 여유). 데모처럼 4.2s 동안 사인 이징으로 0 → 100%를 채우고 1.2s 머문 뒤 0.9s에 빠지는 루프를 requestAnimationFrame으로 돌리면서 퍼센트 숫자와 aria-valuenow를 함께 갱신해줘. prefers-reduced-motion에서는 물결 회전을 멈추고 수위 변화만 보여줘.',
    html: `<div class="card">
  <div class="tank" role="progressbar" aria-label="업데이트 설치 진행률" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
    <div class="liquid">
      <div class="level">
        <span class="wave back"></span>
        <span class="wave front"></span>
      </div>
    </div>
    <span class="label"><b>0</b>%</span>
  </div>
  <p class="title">펌웨어 업데이트 설치 중</p>
  <p class="sub">완료될 때까지 전원을 끄지 마세요</p>
</div>`,
    css: `.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(340px, 88vw);
  padding: clamp(22px, 5vmin, 34px) 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;
  text-align: center;
}
.tank {
  position: relative;
  width: clamp(124px, 36vmin, 172px);
  aspect-ratio: 1;
  margin-bottom: 20px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: 0 0 0 5px var(--surface), 0 0 0 6px var(--line); /* 바깥 테두리 링 */
}
.liquid {
  position: absolute;
  inset: 0;
  clip-path: circle(50%); /* 원 밖으로 나간 물결을 잘라냄 */
}
.level {
  position: absolute;
  inset: 0;
  transform: translateY(110%); /* JS가 진행률에 맞춰 올림 */
}
/* 모서리를 둥글린 큰 사각형이 회전하면 윗변이 출렁이는 수면처럼 보임 */
.wave {
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  aspect-ratio: 1;
  background: var(--accent);
  animation: spin linear infinite;
}
.back { border-radius: 38%; opacity: .35; animation-duration: 7s; animation-delay: -2s; }
.front { border-radius: 42%; opacity: .6; animation-duration: 10s; }
@keyframes spin {
  to { transform: rotate(1turn); }
}
.label {
  position: absolute;
  inset: 0;
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  align-items: baseline;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.label b { font-size: clamp(26px, 7vmin, 34px); font-weight: 700; letter-spacing: -.02em; }
.title { margin: 0 0 6px; font-size: clamp(15px, 2.4vw, 17px); font-weight: 600; }
.sub { margin: 0; font-size: 13px; color: var(--muted); }
@media (prefers-reduced-motion: reduce) {
  .wave { animation: none; }
}`,
    js: `const tank = document.querySelector('.tank');
const level = document.querySelector('.level');
const num = document.querySelector('.label b');

function setProgress(p) {
  // 110% → -10%: 물결이 출렁이는 높이만큼 위아래 여유를 둠
  level.style.transform = 'translateY(' + (110 - p * 120) + '%)';
  const pct = Math.round(p * 100);
  num.textContent = pct;
  tank.setAttribute('aria-valuenow', pct);
}

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다 (실제 진행률을 setProgress에 넣으세요)
const FILL = 4200, HOLD = 1200, DRAIN = 900;
const easeInOut = t => 0.5 - Math.cos(Math.PI * t) / 2;
let start = null;
function frame(now) {
  if (start === null) start = now;
  const t = (now - start) % (FILL + HOLD + DRAIN);
  let p = 1;
  if (t < FILL) p = easeInOut(t / FILL);
  else if (t > FILL + HOLD) p = 1 - easeInOut((t - FILL - HOLD) / DRAIN);
  setProgress(p);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
  },
  {
    no: 91,
    id: 'mesh-gradient',
    cat: 'shape',
    name: '메시 그라디언트 배경',
    en: 'Animated Mesh Gradient',
    level: 2,
    trigger: 'auto',
    timing: '16s ease-in-out · alternate 무한',
    desc: '큰 방사형 그라디언트 여러 개가 제각기 천천히 떠다니며 색이 섞이는 배경입니다. 이미지 없이 CSS만으로 부드럽게 살아 있는 분위기를 만듭니다.',
    use: '히어로 섹션 배경, 랜딩 페이지, 로그인·온보딩 화면',
    tech: ['CSS @property', 'radial-gradient', 'CSS @keyframes'],
    terms: ['메시 그라디언트 (Mesh Gradient)', '방사형 그라디언트 (Radial Gradient)', '등록된 커스텀 속성 (Registered Custom Property)', '앰비언트 배경 (Ambient Background)'],
    prompt: '히어로 섹션 배경 전체에 여러 색이 천천히 떠다니며 섞이는 메시 그라디언트(Mesh Gradient) 배경을 만들어줘. 크기 40~50%의 radial-gradient 4개(브랜드 포인트 컬러, 보조 컬러, 핑크, 청록)를 가장자리 70% 지점에서 투명해지게 겹치고, 각 원의 중심 좌표를 --x1, --y1 같은 CSS 커스텀 속성으로 빼줘. 좌표 변수는 @property로 syntax: "<percentage>"를 등록해 보간 가능한 값으로 만들고, 16s ease-in-out infinite alternate 키프레임에서 33%, 66%, 100% 지점마다 네 원의 x·y를 서로 다른 방향으로 20~30%씩 옮겨줘. 배경 레이어는 opacity 0.75로 한 톤 눌러 주고, 위에 표면색 72% 반투명 히어로 카드를 올려 글자가 배경색에 묻히지 않게 해줘. @property를 지원하지 않는 브라우저에서는 멈춘 그라디언트로 보이면 충분하고, prefers-reduced-motion에서는 애니메이션을 꺼줘.',
    html: `<div class="mesh" aria-hidden="true"></div>
<section class="hero">
  <span class="eyebrow">2026 봄 컬렉션</span>
  <h1>색이 천천히 숨 쉬는 첫 화면</h1>
  <p>여러 겹의 방사형 그라디언트가 제각기 떠다니며 부드러운 배경을 만듭니다.</p>
  <button type="button">컬렉션 보기</button>
</section>`,
    css: `/* 그라디언트 중심 좌표를 타입과 함께 등록해야 키프레임에서 부드럽게 보간됨 */
@property --x1 { syntax: '<percentage>'; inherits: false; initial-value: 15%; }
@property --y1 { syntax: '<percentage>'; inherits: false; initial-value: 20%; }
@property --x2 { syntax: '<percentage>'; inherits: false; initial-value: 85%; }
@property --y2 { syntax: '<percentage>'; inherits: false; initial-value: 25%; }
@property --x3 { syntax: '<percentage>'; inherits: false; initial-value: 30%; }
@property --y3 { syntax: '<percentage>'; inherits: false; initial-value: 85%; }
@property --x4 { syntax: '<percentage>'; inherits: false; initial-value: 80%; }
@property --y4 { syntax: '<percentage>'; inherits: false; initial-value: 80%; }

.mesh {
  position: fixed;
  inset: 0;
  /* 핑크·청록은 효과를 이루는 색이라 고정값 사용 */
  background:
    radial-gradient(45% 55% at var(--x1) var(--y1), var(--accent), transparent 70%),
    radial-gradient(40% 50% at var(--x2) var(--y2), var(--accent-2), transparent 70%),
    radial-gradient(50% 55% at var(--x3) var(--y3), #ff6fae, transparent 70%),
    radial-gradient(45% 50% at var(--x4) var(--y4), #3fd4c4, transparent 70%);
  opacity: .75;
  animation: drift 16s ease-in-out infinite alternate;
}
@keyframes drift {
  0% { --x1: 15%; --y1: 20%; --x2: 85%; --y2: 25%; --x3: 30%; --y3: 85%; --x4: 80%; --y4: 80%; }
  33% { --x1: 40%; --y1: 35%; --x2: 65%; --y2: 10%; --x3: 10%; --y3: 60%; --x4: 90%; --y4: 55%; }
  66% { --x1: 25%; --y1: 65%; --x2: 90%; --y2: 50%; --x3: 45%; --y3: 90%; --x4: 60%; --y4: 90%; }
  100% { --x1: 55%; --y1: 15%; --x2: 70%; --y2: 70%; --x3: 20%; --y3: 40%; --x4: 85%; --y4: 30%; }
}

.hero {
  position: relative;
  width: min(460px, 88vw);
  padding: clamp(20px, min(5vw, 7vh), 40px);
  border: 1px solid var(--line);
  border-radius: 24px;
  background: color-mix(in srgb, var(--surface) 72%, transparent);
  text-align: center;
}
.eyebrow {
  display: inline-block;
  padding: 5px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 12px;
  color: var(--muted);
}
.hero h1 {
  margin: 14px 0 10px;
  font-size: clamp(22px, 4.4vw, 36px);
  line-height: 1.25;
  letter-spacing: -.02em;
  word-break: keep-all;
}
.hero p {
  max-width: 34ch;
  margin: 0 auto 22px;
  word-break: keep-all;
  font-size: clamp(13px, 1.8vw, 15px);
  line-height: 1.6;
  color: var(--muted);
}
.hero button {
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--fg);
  color: var(--bg);
  font: 600 14px/1 var(--font);
  cursor: pointer;
}
@media (prefers-reduced-motion: reduce) {
  .mesh { animation: none; }
}`,
    js: ''
  },
  {
    no: 92,
    id: 'conic-border',
    cat: 'shape',
    name: '회전 그라디언트 보더',
    en: 'Rotating Conic Border',
    level: 2,
    trigger: 'auto',
    timing: '4s linear · 무한 회전',
    desc: '카드 테두리를 따라 빛나는 그라디언트가 끊임없이 회전하고 뒤로 은은한 글로우가 번지는 효과입니다. 여러 카드 중 하나를 자연스럽게 돋보이게 할 때 좋습니다.',
    use: '추천 요금제 카드, 주요 CTA 버튼, 신기능 배너',
    tech: ['CSS @property', 'conic-gradient', 'CSS @keyframes'],
    terms: ['원뿔 그라디언트 (Conic Gradient)', '그라디언트 보더 (Gradient Border)', '등록된 커스텀 속성 (Registered Custom Property)', '글로우 효과 (Glow Effect)'],
    prompt: '요금제 카드 테두리를 따라 빛이 계속 돌아가는 회전 그라디언트 보더(Rotating Gradient Border)를 만들어줘. 카드를 padding 1.5px짜리 래퍼로 감싸고 래퍼 배경에 conic-gradient(from var(--angle), 옅은 선 색 0~50%, 브랜드 포인트 컬러 75%, 보조 컬러 88%, 옅은 선 색)을 깐 뒤, 안쪽 카드를 표면색으로 덮어 1.5px 테두리만 보이게 해줘. --angle은 @property로 syntax: "<angle>"을 등록해 4s linear infinite로 0deg에서 360deg까지 돌리고, 같은 그라디언트를 래퍼의 ::before에 깔아 blur(20px), opacity 0.6으로 카드 뒤에 은은한 글로우(Glow)를 넣어줘. 버튼과 배지는 브랜드 포인트 컬러로 맞춰 테두리 빛과 같은 톤을 유지해줘. @property를 지원하지 않는 브라우저(CSS.registerProperty 유무로 감지)에서는 래퍼에 overflow: hidden을 주고, 카드보다 2배 큰 정사각형 의사 요소에 conic-gradient를 깔아 transform 회전으로 돌리는 방식으로 대체해줘.',
    html: `<div class="frame">
  <div class="card">
    <div class="head">
      <span class="plan">Pro 플랜</span>
      <span class="badge">추천</span>
    </div>
    <p class="price"><b>₩12,900</b> / 월</p>
    <ul>
      <li>무제한 프로젝트와 팀 공유</li>
      <li>고급 모션 프리셋 120종</li>
    </ul>
    <button type="button">Pro 시작하기</button>
  </div>
</div>`,
    css: `/* --angle을 각도 타입으로 등록해야 키프레임에서 부드럽게 회전함 */
@property --angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0deg;
}
.frame {
  position: relative;
  width: min(340px, 86vw);
  padding: 1.5px; /* 이 여백이 곧 보더 두께 */
  border-radius: 22px;
  background: conic-gradient(from var(--angle), var(--line) 0 50%, var(--accent) 75%, var(--accent-2) 88%, var(--line));
  animation: turn 4s linear infinite;
}
/* 같은 그라디언트를 흐리게 깔아 바깥 글로우 */
.frame::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: conic-gradient(from var(--angle), transparent 0 50%, var(--accent) 75%, var(--accent-2) 88%, transparent);
  filter: blur(20px);
  opacity: .6;
}
@keyframes turn {
  to { --angle: 360deg; }
}
.card {
  padding: clamp(20px, 4vw, 28px);
  border-radius: 20.5px;
  background: var(--surface);
}
.head { display: flex; align-items: center; justify-content: space-between; }
.plan { font-size: 15px; font-weight: 600; }
.badge {
  padding: 4px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
}
.price { margin: 12px 0 16px; font-size: 13px; color: var(--muted); }
.price b { margin-right: 2px; font-size: clamp(26px, 5vw, 32px); color: var(--fg); letter-spacing: -.02em; }
.card ul { display: grid; gap: 8px; margin: 0 0 20px; padding: 0; list-style: none; font-size: 13px; }
.card li { display: flex; align-items: center; gap: 8px; }
.card li::before { content: ''; flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
.card button {
  width: 100%;
  padding: 12px;
  border: 0;
  border-radius: 12px;
  background: var(--accent);
  color: var(--bg);
  font: 600 14px/1 var(--font);
  cursor: pointer;
}

/* 폴백: @property 미지원 시 큰 의사 요소를 transform으로 회전 */
.no-property .frame { overflow: hidden; isolation: isolate; background: var(--line); }
.no-property .frame::before {
  inset: auto;
  left: 50%;
  top: 50%;
  width: 200%;
  aspect-ratio: 1;
  translate: -50% -50%;
  background: conic-gradient(transparent 0 50%, var(--accent) 75%, var(--accent-2) 88%, transparent);
  filter: none;
  opacity: 1;
  animation: spin 4s linear infinite;
}
@keyframes spin {
  to { rotate: 1turn; }
}`,
    js: `// @property(CSS.registerProperty) 미지원 브라우저는 회전 의사 요소 폴백으로 전환
if (!(window.CSS && CSS.registerProperty)) {
  document.documentElement.classList.add('no-property');
}`
  },
  {
    no: 93,
    id: 'glass-blobs',
    cat: 'shape',
    name: '글래스모피즘 카드',
    en: 'Glassmorphism Card',
    level: 1,
    trigger: 'auto',
    timing: 'blur 22px · 블롭 14~22s alternate',
    desc: '뒤에서 천천히 움직이는 색 블롭을 반투명 카드가 흐릿하게 비춰 보이는 유리 질감 효과입니다. 카드 안과 밖의 선명도 차이가 깊이감을 만듭니다.',
    use: '날씨·금융 위젯, 대시보드 카드, 히어로 오버레이',
    tech: ['backdrop-filter', 'CSS @keyframes', 'CSS transform'],
    terms: ['글래스모피즘 (Glassmorphism)', '배경 흐림 (Backdrop Blur)', '프로스티드 글래스 (Frosted Glass)', '블롭 애니메이션 (Blob Animation)'],
    prompt: '날씨 위젯 카드를 반투명한 유리처럼 보이게 하는 글래스모피즘(Glassmorphism) 효과를 만들어줘. 카드 뒤에 브랜드 포인트 컬러, 보조 컬러, 핑크의 원형 블롭 3개를 46·36·26vmin 크기로 배치하고, 각각 18s·14s·22s ease-in-out alternate로 translate와 scale(0.92~1.1)을 천천히 오가게 해서 배경이 살아 움직이게 해줘. 카드는 표면색 38% 반투명 배경에 backdrop-filter: blur(22px) saturate(160%)로 뒤를 흐리게 하고, 1px 옅은 테두리와 위쪽 안쪽 하이라이트(inset box-shadow)로 유리 두께감을 줘. 블롭은 카드와 일부만 겹치게 두어 카드 안쪽은 흐리고 바깥은 선명한 대비가 보이게 해줘. Safari용 -webkit-backdrop-filter를 함께 쓰고, backdrop-filter 미지원 환경에서는 @supports로 배경 불투명도를 85%까지 올려 글자가 읽히게 해줘.',
    html: `<div class="blobs" aria-hidden="true">
  <span class="blob b1"></span>
  <span class="blob b2"></span>
  <span class="blob b3"></span>
</div>
<article class="glass">
  <div class="loc">
    <span>서울특별시</span>
    <span class="now">지금</span>
  </div>
  <p class="temp">23°</p>
  <p class="desc">대체로 맑음 · 최고 26° 최저 17°</p>
  <ul class="stats">
    <li><span>습도</span><b>42%</b></li>
    <li><span>바람</span><b>3m/s</b></li>
    <li><span>자외선</span><b>보통</b></li>
  </ul>
</article>`,
    css: `.blobs { position: fixed; inset: 0; }
.blob {
  position: absolute;
  border-radius: 50%;
  animation: float 18s ease-in-out infinite alternate;
}
.b1 { left: 18%; top: 8%; width: 46vmin; height: 46vmin; background: var(--accent); }
.b2 { right: 22%; bottom: 4%; width: 36vmin; height: 36vmin; background: var(--accent-2); animation-duration: 14s; animation-delay: -6s; }
.b3 { right: 30%; top: 12%; width: 26vmin; height: 26vmin; background: #ff6fae; animation-duration: 22s; animation-delay: -11s; }
@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(12vmin, 8vmin) scale(1.1); }
  100% { transform: translate(-6vmin, 14vmin) scale(.92); }
}

/* 유리 카드: 반투명 배경 + 뒤쪽을 흐리는 backdrop-filter */
.glass {
  position: relative;
  width: min(320px, 84vw);
  padding: clamp(20px, 4vw, 26px);
  border: 1px solid var(--line);
  border-radius: 24px;
  background: color-mix(in srgb, var(--surface) 38%, transparent);
  -webkit-backdrop-filter: blur(22px) saturate(160%);
  backdrop-filter: blur(22px) saturate(160%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .18), 0 24px 48px -24px rgba(0, 0, 0, .35);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: color-mix(in srgb, var(--surface) 85%, transparent); }
}
.loc { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; }
.now { font-size: 12px; font-weight: 400; color: var(--muted); }
.temp {
  margin: 10px 0 4px;
  font-size: clamp(48px, 12vmin, 68px);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -.04em;
}
.desc { margin: 0 0 18px; font-size: 13px; color: var(--muted); }
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 0;
  padding: 14px 0 0;
  border-top: 1px solid var(--line);
  list-style: none;
}
.stats li { display: grid; gap: 4px; font-size: 12px; }
.stats span { color: var(--muted); }
.stats b { font-size: 14px; font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .blob { animation: none; }
}`,
    js: ''
  },
  {
    no: 94,
    id: 'svg-line-draw',
    cat: 'shape',
    name: 'SVG 라인 드로잉',
    en: 'SVG Line Drawing',
    level: 2,
    trigger: 'auto',
    timing: '드로잉 1.5s · 스태거 180ms · 4.2s 루프',
    desc: '아이콘의 선이 펜으로 그리듯 순서대로 그려진 뒤 안쪽이 채워지는 애니메이션입니다. 경로 길이를 재서 스트로크 대시를 줄이는 방식이라 어떤 SVG 경로에도 적용할 수 있습니다.',
    use: '기능 소개 섹션, 온보딩 일러스트, 서명·로고 등장',
    tech: ['SVG', 'stroke-dashoffset', 'getTotalLength()', 'Web Animations API'],
    terms: ['라인 드로잉 (Line Drawing)', '스트로크 대시 오프셋 (Stroke Dashoffset)', '경로 길이 측정 (getTotalLength)', '스태거 (Stagger)'],
    prompt: '기능 소개 섹션의 아이콘 4개가 펜으로 그리듯 선이 그려진 뒤 속이 채워지는 SVG 라인 드로잉(Line Drawing) 애니메이션을 만들어줘. 각 path의 길이를 getTotalLength()로 재서 stroke-dasharray를 그 길이로 두고, stroke-dashoffset을 길이에서 0으로 줄이면 선이 그려지게 해줘. Web Animations API로 한 주기 4.2s 안에서 0~36% 구간은 cubic-bezier(.65,0,.35,1)로 선을 그리고, 36~50% 구간에 fill-opacity를 0에서 1로 올려 채운 뒤, 86~96% 구간에 opacity로 사라졌다가 처음 상태로 돌아가 무한 반복하게 해줘. 아이콘마다 delay를 180ms씩 더해 순서대로 그려지는 스태거(Stagger)를 주고, 선은 두께 1.5에 stroke-linecap·stroke-linejoin을 round로 둬서 손으로 그린 느낌을 살려줘. getTotalLength 값은 viewBox 좌표 기준이라 아이콘 크기가 바뀌어도 다시 잴 필요가 없고, prefers-reduced-motion이면 애니메이션 없이 채워진 아이콘만 보여줘.',
    html: `<section class="panel">
  <p class="eyebrow">새로워진 앱</p>
  <h2>필요한 기능을 한 곳에</h2>
  <ul class="icons">
    <li>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" /></svg>
      <span>홈</span>
    </li>
    <li>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C12 21 3 15.5 3 9.5 3 6.5 5.3 4.5 8 4.5c1.7 0 3.1.9 4 2.3.9-1.4 2.3-2.3 4-2.3 2.7 0 5 2 5 5 0 6-9 11.5-9 11.5z" /></svg>
      <span>관심</span>
    </li>
    <li>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg>
      <span>메시지</span>
    </li>
    <li>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.8 5.8 6.2.8-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.8z" /></svg>
      <span>즐겨찾기</span>
    </li>
  </ul>
</section>`,
    css: `.panel {
  width: min(460px, 90vw);
  text-align: center;
}
.eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .08em;
  color: var(--accent);
}
.panel h2 {
  margin: 0 0 clamp(18px, 4vmin, 28px);
  font-size: clamp(20px, 4vw, 28px);
  letter-spacing: -.02em;
}
.icons {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(8px, 2vw, 14px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.icons li {
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: clamp(14px, 3vw, 20px) 6px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  font-size: 12px;
  color: var(--muted);
}
.icons svg {
  width: clamp(28px, 7vmin, 36px);
  height: auto;
  overflow: visible;
}
/* 처음엔 채우기가 투명한 선 아이콘. 대시 값은 JS가 경로 길이로 넣음 */
.icons path {
  fill: var(--accent);
  fill-opacity: 0;
  stroke: var(--accent);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}`,
    js: `const paths = document.querySelectorAll('.icons path');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

paths.forEach((path, i) => {
  if (reduce) {
    path.style.fillOpacity = 1;
    return;
  }
  // 경로 전체 길이를 재서 대시 하나 = 경로 길이로 만듦
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;

  path.animate([
    { strokeDashoffset: len, fillOpacity: 0, opacity: 1, easing: 'cubic-bezier(.65, 0, .35, 1)' },
    { strokeDashoffset: 0, fillOpacity: 0, opacity: 1, offset: 0.36 }, // 선 그리기 끝
    { strokeDashoffset: 0, fillOpacity: 1, opacity: 1, offset: 0.5 },  // 채우기 페이드 인
    { strokeDashoffset: 0, fillOpacity: 1, opacity: 1, offset: 0.86 }, // 잠시 유지
    { strokeDashoffset: 0, fillOpacity: 1, opacity: 0, offset: 0.96 }, // 사라짐
    { strokeDashoffset: len, fillOpacity: 0, opacity: 0 }              // 보이지 않을 때 원위치
  ], {
    duration: 4200,
    delay: i * 180, // 아이콘마다 180ms 스태거
    iterations: Infinity,
    fill: 'backwards'
  });
});`
  },
  {
    no: 95,
    id: 'blob-morph',
    cat: 'shape',
    name: '블롭 모핑',
    en: 'Blob Morphing',
    level: 1,
    trigger: 'auto',
    timing: '모핑 8s ease-in-out · 회전 24s',
    desc: '모서리 반경 8개 값을 계속 바꿔 물방울처럼 말랑하게 모양이 변하는 도형입니다. 느린 회전과 그라디언트가 더해져 살아 있는 장식 요소가 됩니다.',
    use: '히어로 비주얼, 프로필 이미지 배경, 브랜드 장식 요소',
    tech: ['CSS border-radius', 'CSS @keyframes', 'linear-gradient'],
    terms: ['블롭 모핑 (Blob Morphing)', '타원형 모서리 반경 (Elliptical Border Radius)', '유기적 도형 (Organic Shape)', '글로우 효과 (Glow Effect)'],
    prompt: '히어로 섹션 한쪽에 살아 있는 듯 모양이 계속 변하는 유기적인 블롭(Blob) 도형을 만들어줘. 정사각형 요소에 border-radius를 8개 값(예: 60% 40% 30% 70% / 60% 30% 70% 40%)으로 주고, 가로·세로 반경을 서로 다르게 바꾼 키프레임 3개를 8s ease-in-out infinite로 돌려 블롭 모핑(Blob Morphing)을 만들어줘. 여기에 24s linear infinite 회전을 겹쳐 모양 변화가 단순 반복처럼 보이지 않게 하고, 채우기는 브랜드 포인트 컬러에서 보조 컬러로 가는 135deg linear-gradient로 해줘. 같은 애니메이션을 가진 복제 블롭을 뒤에 깔아 blur(28px), opacity 0.5로 은은한 글로우를 주고, 좁은 화면에서는 flex-wrap으로 블롭이 텍스트 위로 올라가게 해줘. prefers-reduced-motion에서는 회전을 끄고 모핑만 20s로 느리게 해줘.',
    html: `<section class="hero">
  <div class="visual" aria-hidden="true">
    <span class="blob glow"></span>
    <span class="blob"></span>
  </div>
  <div class="copy">
    <p class="eyebrow">CREATIVE STUDIO</p>
    <h1>형태 없는 아이디어에 모양을 입혀요</h1>
    <p class="lead">브랜드의 첫 화면에 부드럽게 살아 움직이는 형태를 더해 보세요.</p>
  </div>
</section>`,
    css: `.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 5vw, 56px);
  width: min(900px, 92vw);
}
.visual {
  display: grid;
  place-items: center;
  width: clamp(104px, 34vmin, 240px);
  aspect-ratio: 1;
}
.blob {
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  /* 8개 값: 가로 반경 4개 / 세로 반경 4개 */
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: morph 8s ease-in-out infinite, spin 24s linear infinite;
}
/* 같은 모양을 흐리게 복제해 뒤에 깔면 글로우가 모양을 따라감 */
.glow {
  filter: blur(28px);
  opacity: .5;
  scale: .92;
}
@keyframes morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  33% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  66% { border-radius: 55% 45% 40% 60% / 35% 55% 45% 65%; }
}
@keyframes spin {
  to { transform: rotate(1turn); }
}
.copy { width: min(340px, 100%); }
.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .2em;
  color: var(--accent);
}
.copy h1 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3.6vw, 34px);
  line-height: 1.25;
  letter-spacing: -.02em;
  word-break: keep-all;
}
.lead { margin: 0; font-size: 14px; line-height: 1.6; color: var(--muted); word-break: keep-all; }
@media (max-width: 560px) {
  .copy { text-align: center; }
}
@media (prefers-reduced-motion: reduce) {
  .blob { animation: morph 20s ease-in-out infinite; }
}`,
    js: ''
  },
  {
    no: 96,
    id: 'scan-line',
    cat: 'shape',
    name: '스캔 라인',
    en: 'Scan Line Sweep',
    level: 2,
    trigger: 'auto',
    timing: '2.6s 루프 · 하이라이트 띠 40%',
    desc: '레이저 선이 카드 위를 위에서 아래로 훑고 지나가며 지나간 자리에 옅은 격자 하이라이트를 남기는 효과입니다. 인식이나 분석이 진행 중이라는 느낌을 직관적으로 줍니다.',
    use: '신분증·문서 인증, QR·바코드 스캔, AI 이미지 분석',
    tech: ['CSS @property', 'CSS mask', 'CSS @keyframes'],
    terms: ['스캔 라인 (Scan Line)', '리빌 효과 (Reveal Effect)', '뷰파인더 코너 (Viewfinder Corners)', '글로우 효과 (Glow Effect)'],
    prompt: '신분증 인증 화면에서 카드 위를 레이저 선이 위에서 아래로 훑고 지나가는 스캔 라인(Scan Line) 효과를 만들어줘. 스캔 위치는 @property로 등록한 --scan(<percentage>) 변수 하나로 두고, 카드에 2.6s cubic-bezier(.45,0,.55,1) infinite 키프레임으로 -10%에서 110%까지 움직인 뒤 마지막 20% 구간은 카드 밖에서 잠시 멈추게 해줘. 라인은 top: var(--scan)에 두께 2px, 브랜드 포인트 컬러와 두 겹 box-shadow 글로우를 주고, 지나간 자리에는 옅은 포인트 컬러 틴트와 6px 간격 가로 격자를 깔되 mask를 linear-gradient(투명 calc(var(--scan) - 40%), 불투명 var(--scan), 투명 var(--scan))로 걸어 라인 바로 뒤만 진하고 위로 갈수록 사라지는 하이라이트(Reveal) 띠를 만들어줘. 카드 바깥에는 conic-gradient 마스크로 모서리 26px만 남긴 뷰파인더 테두리를 두르고, 아래 상태 문구 앞의 점은 1.3s 주기로 깜빡이게 해줘. prefers-reduced-motion에서는 라인과 띠를 숨기고 상태 점만 깜빡이게 해줘.',
    html: `<div class="wrap">
  <div class="scanner">
    <span class="corners" aria-hidden="true"></span>
    <div class="id">
      <div class="photo"></div>
      <div class="fields">
        <p class="kind">신분 확인</p>
        <p class="name">김하늘</p>
        <p class="row"><span>생년월일</span>1995.08.21</p>
        <p class="row"><span>발급번호</span>•••• 2048</p>
      </div>
      <span class="band" aria-hidden="true"></span>
      <span class="line" aria-hidden="true"></span>
    </div>
  </div>
  <p class="status"><i></i>신분증을 스캔하고 있어요</p>
</div>`,
    css: `/* 스캔 위치 하나로 라인과 하이라이트를 함께 움직이기 위해 등록 */
@property --scan {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}
.wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.scanner { position: relative; padding: 12px; }
/* 모서리만 남긴 뷰파인더 테두리 */
.corners {
  position: absolute;
  inset: 0;
  border: 2px solid var(--accent);
  border-radius: 20px;
  -webkit-mask: conic-gradient(at 26px 26px, transparent 75%, #000 0) 0 0 / calc(100% - 26px) calc(100% - 26px);
  mask: conic-gradient(at 26px 26px, transparent 75%, #000 0) 0 0 / calc(100% - 26px) calc(100% - 26px);
}
.id {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  width: min(320px, 78vw, calc((100vh - 130px) * 1.586));
  aspect-ratio: 1.586;
  padding: 0 clamp(14px, 4vw, 22px);
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  animation: scan 2.6s cubic-bezier(.45, 0, .55, 1) infinite;
}
@keyframes scan {
  0% { --scan: -10%; }
  80%, 100% { --scan: 110%; } /* 카드 밖에서 잠시 멈춤 */
}
.photo {
  flex: none;
  width: 30%;
  aspect-ratio: 3 / 4;
  border-radius: 8px;
  background:
    radial-gradient(circle at 50% 38%, var(--muted) 0 18%, transparent 19%),
    radial-gradient(ellipse 42% 30% at 50% 100%, var(--muted) 0 98%, transparent 100%),
    var(--line);
}
.fields { flex: 1; min-width: 0; }
.fields p { margin: 0; }
.kind { font-size: 11px; font-weight: 600; letter-spacing: .08em; color: var(--accent); }
.name { margin: 4px 0 10px !important; font-size: clamp(16px, 3.6vw, 20px); font-weight: 700; }
.row { display: flex; gap: 8px; margin-top: 4px !important; font-size: 12px; white-space: nowrap; font-variant-numeric: tabular-nums; }
.row span { flex: none; width: 52px; color: var(--muted); }

/* 라인이 지나간 자리: 틴트 + 가로 격자, 라인 바로 뒤가 가장 진함 */
.band {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(0deg, color-mix(in srgb, var(--accent) 30%, transparent) 0 1px, transparent 1px 6px),
    color-mix(in srgb, var(--accent) 16%, transparent);
  -webkit-mask: linear-gradient(to bottom, transparent calc(var(--scan) - 40%), #000 var(--scan), transparent var(--scan));
  mask: linear-gradient(to bottom, transparent calc(var(--scan) - 40%), #000 var(--scan), transparent var(--scan));
}
.line {
  position: absolute;
  left: 0;
  right: 0;
  top: var(--scan);
  height: 2px;
  margin-top: -1px;
  background: var(--accent);
  box-shadow: 0 0 12px 2px var(--accent), 0 0 32px 6px color-mix(in srgb, var(--accent) 40%, transparent);
}
.status { display: flex; align-items: center; gap: 8px; margin: 0; font-size: 14px; color: var(--muted); }
.status i { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); animation: blink 1.3s ease-in-out infinite; }
@keyframes blink {
  50% { opacity: .25; }
}
@media (prefers-reduced-motion: reduce) {
  .line, .band { display: none; }
}`,
    js: ''
  },
  {
    no: 97,
    id: 'breathing-glow',
    cat: 'shape',
    name: '브리딩 글로우',
    en: 'Breathing Glow',
    level: 1,
    trigger: 'auto',
    timing: '4s ease-in-out · 무한 루프',
    desc: '크기와 그림자가 4초 주기로 천천히 부풀었다 가라앉아 숨 쉬는 듯한 발광 효과입니다. 과하지 않게 시선을 모아 주요 행동으로 자연스럽게 이끕니다.',
    use: 'AI 어시스턴트 오브, 주요 CTA 버튼, 음성 인식 대기',
    tech: ['CSS @keyframes', 'box-shadow', 'CSS transform'],
    terms: ['브리딩 애니메이션 (Breathing Animation)', '글로우 효과 (Glow Effect)', '앰비언트 모션 (Ambient Motion)', '이징 (Ease-in-out)'],
    prompt: 'AI 어시스턴트 첫 화면의 오브와 대화 시작 버튼이 천천히 숨 쉬듯 빛나는 브리딩 글로우(Breathing Glow)를 만들어줘. 오브는 브랜드 포인트 컬러에서 보조 컬러로 가는 원형 그라디언트에 왼쪽 위 흰색 하이라이트를 얹고, 4s ease-in-out infinite로 scale 1 → 1.07 → 1과 box-shadow 블러 18px → 56px(퍼짐 2px → 16px, 불투명도 35% → 55%)를 함께 오가게 해줘. CTA 버튼은 같은 4s 주기로 0에서 7px까지 옅은 링 그림자가 부풀었다 가라앉게 해서 오브와 같은 호흡으로 맞춰줘. 키프레임은 0%·100%와 50% 두 상태만 두고 ease-in-out으로 이어 들숨과 날숨처럼 부드럽게 해줘. box-shadow 애니메이션은 매 프레임 다시 그려지니 요소가 많아지면 블러를 준 의사 요소의 opacity·transform 애니메이션으로 바꾸고, prefers-reduced-motion에서는 애니메이션을 끄고 중간 세기의 글로우로 고정해줘.',
    html: `<section class="assistant">
  <div class="orb" aria-hidden="true"></div>
  <h2>무엇을 도와드릴까요?</h2>
  <p>일정 정리부터 문서 요약까지, 편하게 말씀해 주세요.</p>
  <button type="button" class="cta">대화 시작하기</button>
</section>`,
    css: `.assistant {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  text-align: center;
}
.orb {
  width: clamp(76px, 22vmin, 112px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 28%, rgba(255, 255, 255, .85), transparent 32%),
    linear-gradient(145deg, var(--accent), var(--accent-2));
  animation: breathe 4s ease-in-out infinite;
}
/* 4초에 한 번 들숨·날숨: 크기와 그림자가 함께 부풀었다 가라앉음 */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 18px 2px color-mix(in srgb, var(--accent) 35%, transparent);
  }
  50% {
    transform: scale(1.07);
    box-shadow: 0 0 56px 16px color-mix(in srgb, var(--accent) 55%, transparent);
  }
}
.assistant h2 {
  margin: clamp(20px, 5vmin, 30px) 0 8px;
  font-size: clamp(20px, 3.8vw, 28px);
  letter-spacing: -.02em;
}
.assistant p {
  max-width: 30ch;
  margin: 0 0 22px;
  word-break: keep-all;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
}
.cta {
  padding: 13px 26px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font: 600 15px/1 var(--font);
  cursor: pointer;
  animation: ring 4s ease-in-out infinite;
}
/* 버튼 주변 링 그림자도 같은 호흡으로 */
@keyframes ring {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent), 0 6px 16px -8px var(--accent);
  }
  50% {
    box-shadow: 0 0 0 7px color-mix(in srgb, var(--accent) 22%, transparent), 0 10px 28px -6px var(--accent);
  }
}
@media (prefers-reduced-motion: reduce) {
  .orb, .cta { animation: none; }
  .orb { box-shadow: 0 0 36px 8px color-mix(in srgb, var(--accent) 45%, transparent); }
}`,
    js: ''
  },
  {
    no: 98,
    id: 'hue-cycle',
    cat: 'shape',
    name: '색상 순환',
    en: 'Hue Cycle',
    level: 1,
    trigger: 'auto',
    timing: '8s linear · 360° 무한 순환',
    desc: '그라디언트와 아이콘의 색상이 색상환을 따라 8초에 한 바퀴씩 천천히 순환하는 효과입니다. 밝기를 유지한 채 색만 바뀌어 화사하지만 눈에 거슬리지 않습니다.',
    use: '브랜드 배너, 프로모션 카드, 앱 아이콘 쇼케이스',
    tech: ['CSS @property', 'oklch()', 'filter: hue-rotate()', 'CSS @keyframes'],
    terms: ['색상 순환 (Hue Cycling)', '색상 회전 필터 (Hue Rotate Filter)', '등록된 커스텀 속성 (Registered Custom Property)', 'OKLCH 색 공간 (OKLCH Color Space)'],
    prompt: '브랜드 카드의 커버 그라디언트, 제목 글자, 앱 아이콘 타일이 색상환을 따라 천천히 색이 바뀌는 색상 순환(Hue Cycle) 효과를 만들어줘. 색상 값을 @property로 syntax: "<number>"인 --hue 변수로 등록하고 카드에 8s linear infinite 키프레임으로 0에서 360까지 돌린 뒤, 커버는 oklch(70% .17 var(--hue))에서 hue +60, +120까지 세 색 linear-gradient로, 제목은 hue와 hue+90을 잇는 그라디언트를 background-clip: text로 입혀줘. 아이콘 타일 4개는 비교용으로 filter: hue-rotate(0 → 360deg) 방식을 쓰고 animation-delay를 -1s씩 줘서 타일마다 45도씩 색이 어긋나게 해줘. oklch를 쓰면 색상이 바뀌어도 밝기가 일정하게 유지되고 360과 0이 같은 색이라 루프 이음새가 보이지 않아. prefers-reduced-motion에서는 순환을 멈추고 기본 색으로 고정해줘.',
    html: `<article class="card">
  <div class="cover" aria-hidden="true"></div>
  <div class="body">
    <h2 class="title">색이 흐르는 브랜드</h2>
    <p class="sub">8초마다 색상환을 한 바퀴 돌아요</p>
    <div class="apps" aria-hidden="true">
      <span class="app"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l10-6.5z" /></svg></span>
      <span class="app"><svg viewBox="0 0 24 24"><path d="M12 21C12 21 3 15.5 3 9.5 3 6.5 5.3 4.5 8 4.5c1.7 0 3.1.9 4 2.3.9-1.4 2.3-2.3 4-2.3 2.7 0 5 2 5 5 0 6-9 11.5-9 11.5z" /></svg></span>
      <span class="app"><svg viewBox="0 0 24 24"><path d="M12 3l2.8 5.8 6.2.8-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.8z" /></svg></span>
      <span class="app"><svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg></span>
    </div>
  </div>
</article>`,
    css: `/* 색상(hue)을 숫자 타입으로 등록해야 키프레임에서 부드럽게 보간됨 */
@property --hue {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}
.card {
  width: min(360px, 88vw);
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;
  animation: hue 8s linear infinite;
}
@keyframes hue {
  to { --hue: 360; }
}
/* 방법 1: oklch 색상 값을 변수로 돌림 (밝기가 일정하게 유지됨) */
.cover {
  height: clamp(80px, 22vmin, 120px);
  background: linear-gradient(120deg,
    oklch(70% .17 var(--hue)),
    oklch(65% .2 calc(var(--hue) + 60)),
    oklch(62% .2 calc(var(--hue) + 120)));
}
.body { padding: 18px 20px 20px; }
.title {
  margin: 0 0 4px;
  font-size: clamp(20px, 3.6vw, 24px);
  letter-spacing: -.02em;
  background: linear-gradient(90deg, oklch(68% .19 var(--hue)), oklch(68% .19 calc(var(--hue) + 90)));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.sub { margin: 0; font-size: 13px; color: var(--muted); }
.apps { display: flex; gap: 10px; margin-top: 16px; }
/* 방법 2: filter: hue-rotate로 고정 색을 통째로 회전 */
.app {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, oklch(72% .16 20), oklch(62% .2 80));
  animation: hue-filter 8s linear infinite;
}
.app:nth-child(2) { animation-delay: -1s; }
.app:nth-child(3) { animation-delay: -2s; }
.app:nth-child(4) { animation-delay: -3s; }
@keyframes hue-filter {
  to { filter: hue-rotate(360deg); }
}
.app svg { width: 20px; height: 20px; fill: #fff; }
@media (prefers-reduced-motion: reduce) {
  .card, .app { animation: none; }
}`,
    js: ''
  },
  {
    no: 99,
    id: 'shape-morph',
    cat: 'shape',
    name: '도형 모핑',
    en: 'Clip-path Shape Morph',
    level: 2,
    trigger: 'auto',
    timing: '900ms ease-in-out · 800ms 정지',
    desc: '하나의 도형이 원, 사각형, 삼각형, 별로 매끄럽게 모양을 바꾸는 효과입니다. 모든 도형을 같은 개수의 점으로 만든 polygon이라 점끼리 부드럽게 보간됩니다.',
    use: '브랜드 심볼 애니메이션, 상태 전환 아이콘, 로딩 화면 장식',
    tech: ['clip-path: polygon()', 'Web Animations API', 'JavaScript'],
    terms: ['도형 모핑 (Shape Morphing)', '클립 패스 (Clip Path)', '폴리곤 보간 (Polygon Interpolation)', '레이 캐스팅 (Ray Casting)'],
    prompt: '브랜드 심볼 영역에서 하나의 도형이 원 → 사각형 → 삼각형 → 별 순서로 부드럽게 바뀌는 도형 모핑(Shape Morphing)을 clip-path로 만들어줘. clip-path: polygon()은 점 개수가 같아야 보간되므로, 모든 도형을 중심에서 3도 간격으로 쏜 반직선 120개가 테두리와 만나는 점으로 만들어줘(3도 간격이면 사각형·삼각형·별의 꼭짓점 각도가 모두 샘플에 들어가 모서리가 뭉개지지 않아). 원은 반지름 46%, 사각형은 한 변 78%, 삼각형과 별은 외접 반지름 48%(별 안쪽 반지름 20%)로 두고, 삼각형과 별은 중심을 아래로 조금 내려 시각적 무게중심을 맞춰줘. Web Animations API로 900ms ease-in-out 모핑 후 800ms 멈추기를 반복하고, 아래 세그먼트 표시에서 현재 도형 이름을 강조해줘. clip-path를 건 요소는 box-shadow가 잘리니 그림자는 부모 요소에 filter: drop-shadow로 넣어줘.',
    html: `<div class="lab">
  <div class="stage">
    <div class="shape"></div>
  </div>
  <ol class="steps" aria-label="현재 도형">
    <li class="is-active">원</li>
    <li>사각형</li>
    <li>삼각형</li>
    <li>별</li>
  </ol>
</div>`,
    css: `.lab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(18px, 4vmin, 28px);
}
/* clip-path는 그림자까지 잘라내므로 부모에 drop-shadow */
.stage {
  filter: drop-shadow(0 14px 28px color-mix(in srgb, var(--accent) 35%, transparent));
}
.shape {
  width: clamp(120px, 40vmin, 200px);
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  clip-path: circle(46%);
}
.steps {
  display: flex;
  gap: 6px;
  margin: 0;
  padding: 4px;
  list-style: none;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
}
.steps li {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--muted);
  transition: background .3s, color .3s;
}
.steps li.is-active { background: var(--fg); color: var(--bg); }`,
    js: `const shape = document.querySelector('.shape');
const steps = document.querySelectorAll('.steps li');
const N = 120; // 3° 간격: 사각형·삼각형·별 꼭짓점 각도가 모두 샘플에 포함됨

// 중심(50%, cy)에서 각도마다 반직선을 쏴 테두리까지의 거리로 점을 만듦
function toPolygon(radiusAt, cy = 50) {
  const pts = [];
  for (let i = 0; i < N; i++) {
    const a = -Math.PI / 2 + (i / N) * Math.PI * 2;
    const r = radiusAt(a);
    pts.push((50 + Math.cos(a) * r).toFixed(2) + '% ' + (cy + Math.sin(a) * r).toFixed(2) + '%');
  }
  return 'polygon(' + pts.join(', ') + ')';
}

// 다각형(중심 기준 꼭짓점 목록)에서 각도 a의 반직선이 닿는 거리
function polygonRadius(verts) {
  return a => {
    const dx = Math.cos(a), dy = Math.sin(a);
    let best = Infinity;
    verts.forEach(([x1, y1], i) => {
      const [x2, y2] = verts[(i + 1) % verts.length];
      const ex = x2 - x1, ey = y2 - y1;
      const den = dx * ey - dy * ex;
      if (Math.abs(den) < 1e-9) return;
      const t = (x1 * ey - y1 * ex) / den; // 반직선 위 거리
      const u = (x1 * dy - y1 * dx) / den; // 변 위 위치 (0~1)
      if (t > 0 && u >= -1e-6 && u <= 1 + 1e-6) best = Math.min(best, t);
    });
    return best;
  };
}

// 정다각형·별 꼭짓점: rInner를 주면 바깥·안쪽 반지름을 번갈아 씀
function vertices(count, rOuter, rInner = rOuter) {
  return Array.from({ length: count }, (_, i) => {
    const a = -Math.PI / 2 + (i / count) * Math.PI * 2;
    const r = i % 2 ? rInner : rOuter;
    return [Math.cos(a) * r, Math.sin(a) * r];
  });
}

const shapes = [
  toPolygon(() => 46),                                                     // 원
  toPolygon(polygonRadius([[-39, -39], [39, -39], [39, 39], [-39, 39]])), // 사각형
  toPolygon(polygonRadius(vertices(3, 48)), 58),                           // 삼각형
  toPolygon(polygonRadius(vertices(10, 48, 20)), 53)                       // 별
];

let current = 0;
shape.style.clipPath = shapes[0];

function morphNext() {
  const next = (current + 1) % shapes.length;
  // 점 개수가 같은 polygon끼리는 브라우저가 점 단위로 보간함
  shape.animate({ clipPath: [shapes[current], shapes[next]] }, { duration: 900, easing: 'ease-in-out' });
  shape.style.clipPath = shapes[next];
  steps[current].classList.remove('is-active');
  steps[next].classList.add('is-active');
  current = next;
}
setInterval(morphNext, 1700); // 900ms 모핑 + 800ms 정지`
  },
  {
    no: 100,
    id: 'wave-divider',
    cat: 'shape',
    name: '웨이브 섹션 디바이더',
    en: 'Animated Wave Divider',
    level: 1,
    trigger: 'auto',
    timing: '레이어별 8s · 12s · 18s linear',
    desc: '히어로 섹션 바닥에 여러 겹의 물결이 서로 다른 속도로 흐르며 다음 섹션과 이어지는 경계선입니다. 겹겹의 투명도 차이가 부드러운 깊이감을 만듭니다.',
    use: '히어로 하단 경계, 섹션 구분선, 여행·여름 시즌 랜딩',
    tech: ['SVG', 'CSS @keyframes', 'CSS transform'],
    terms: ['웨이브 디바이더 (Wave Divider)', '이음새 없는 루프 (Seamless Loop)', '레이어 패럴랙스 (Layered Parallax)', 'SVG 요소 재사용 (SVG use Element)'],
    prompt: '히어로 섹션 아래쪽 경계에 여러 겹의 물결이 서로 다른 속도로 흐르는 웨이브 섹션 디바이더(Wave Section Divider)를 SVG로 만들어줘. viewBox 0 0 1200 120에 preserveAspectRatio="none"을 준 SVG를 섹션 바닥에 폭 100%, 높이 60~130px로 붙이고, 파형 한 주기(폭 1200)를 두 번 이어 붙인 폭 2400짜리 path를 defs에 한 번만 정의해 use로 세 겹 재사용해줘. 각 레이어는 transform: translateX(0 → -1200px)를 linear infinite로 반복해 이음새 없는 루프(Seamless Loop)를 만들고, 뒤에서부터 속도는 18s·12s(역방향)·8s, opacity는 0.3·0.55·1, y 오프셋은 -26·-12·0으로 달리해 깊이감(Layered Parallax)을 줘. 물결 색은 다음 섹션 배경색과 같게 해서 경계가 자연스럽게 이어지게 하고, 소수점 렌더링으로 생기는 1px 틈은 bottom: -1px로 막아줘. prefers-reduced-motion에서는 물결을 멈춘 정적인 디바이더로 보여줘.',
    html: `<section class="hero">
  <div class="copy">
    <p class="eyebrow">여름 시즌 오픈</p>
    <h1>파도처럼 이어지는 다음 이야기</h1>
    <button type="button">자세히 보기</button>
  </div>
  <svg class="waves" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <!-- 한 주기(폭 1200) 파형을 두 번 이어 붙인 경로: 1200만큼 밀면 처음과 같은 모양 -->
      <path id="wave" d="M0 64C150 24 450 24 600 64S1050 104 1200 64 1650 24 1800 64 2250 104 2400 64V120H0Z" />
    </defs>
    <use class="w1" href="#wave" y="-26" />
    <use class="w2" href="#wave" y="-12" />
    <use class="w3" href="#wave" />
  </svg>
</section>`,
    css: `.hero {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 0 20px clamp(60px, 18vh, 110px);
  background: linear-gradient(170deg, var(--accent), color-mix(in srgb, var(--accent) 65%, var(--accent-2)));
  color: var(--bg);
  text-align: center;
}
.eyebrow {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .08em;
  opacity: .8;
}
.hero h1 {
  margin: 0 0 20px;
  font-size: clamp(24px, 5vw, 44px);
  line-height: 1.2;
  letter-spacing: -.02em;
  word-break: keep-all;
}
.hero button {
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--bg);
  color: var(--fg);
  font: 600 14px/1 var(--font);
  cursor: pointer;
}
/* 물결 색 = 다음 섹션 배경색 */
.waves {
  position: absolute;
  left: 0;
  bottom: -1px; /* 소수점 렌더링 틈 방지 */
  width: 100%;
  height: clamp(60px, 22vh, 130px);
  fill: var(--bg);
}
/* 한 주기(1200)만큼 왼쪽으로 밀면 처음과 같은 모양이라 이음새 없이 반복 */
.w1 { opacity: .3; animation: flow 18s linear -4s infinite; }
.w2 { opacity: .55; animation: flow 12s linear infinite reverse; }
.w3 { animation: flow 8s linear -2s infinite; }
@keyframes flow {
  to { transform: translateX(-1200px); }
}
@media (prefers-reduced-motion: reduce) {
  .waves use { animation: none; }
}`,
    js: ''
  }
);
