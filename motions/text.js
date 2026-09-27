window.MOTIONS = window.MOTIONS || [];
window.MOTIONS.push(
  {
    no: 17,
    id: 'typewriter',
    cat: 'text',
    name: '타이핑 효과',
    en: 'Typewriter Effect',
    level: 2,
    trigger: 'auto',
    timing: '타이핑 60–120ms · 삭제 35ms · 대기 1.6s',
    desc: '문구가 한 글자씩 입력되고 잠시 머문 뒤 빠르게 지워지며 다음 문구로 넘어갑니다. 깜빡이는 캐럿과 불규칙한 입력 간격 덕분에 실제로 누가 타이핑하는 듯한 느낌을 줍니다.',
    use: '히어로 헤드라인, 검색창 플레이스홀더, AI 챗봇 소개, 기능 나열',
    tech: ['JavaScript async/await', 'setTimeout', 'CSS @keyframes'],
    terms: ['타이핑 효과 (Typewriter Effect)', '텍스트 캐럿 (Text Caret)', '깜빡임 애니메이션 (Blink Animation)', '문구 순환 (Phrase Rotation)'],
    prompt: '히어로 헤드라인 두 번째 줄에 문구 3개가 번갈아 입력되는 타이핑 효과(Typewriter Effect)를 만들어줘. 문구는 Array.from으로 나눠 한글이 음절 단위로 한 글자씩 찍히게 하고, 글자마다 60~120ms 사이의 무작위 딜레이를 줘서 사람이 치는 듯한 리듬을 만들어줘. 문구를 다 치면 1.6초 멈췄다가 글자당 35ms로 빠르게 지우고, 0.4초 쉰 뒤 다음 문구를 치는 흐름을 무한 반복해줘. 끝에는 브랜드 포인트 컬러의 얇은 세로 캐럿(Text Caret)을 두고 대기 중에는 1초 주기 steps(1)로 깜빡이되, 입력과 삭제 중에는 깜빡이지 않고 켜져 있게 해줘. 글자가 모두 지워져도 줄 높이가 유지되도록 min-height를 잡고, prefers-reduced-motion이면 타이핑 없이 첫 문구를 완성된 상태로 보여줘.',
    html: `<section class="hero">
  <p class="eyebrow">TEAM WORKSPACE</p>
  <h1>
    팀의 모든 업무를
    <span class="line"><span class="typed" id="typed"></span><span class="caret" aria-hidden="true"></span></span>
  </h1>
  <p class="sub">문서, 일정, 회의록을 하나로 잇는 협업 툴</p>
</section>`,
    css: `.hero {
  width: min(100%, 760px);
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(24px, min(6.4vw, 12vh), 58px);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.03em;
  word-break: keep-all;
}
.line {
  display: block;
  min-height: 1.25em;  /* 글자가 다 지워져도 줄 높이 유지 */
  color: var(--accent);
}
.caret {
  display: inline-block;
  width: .07em;
  height: .95em;
  margin-left: .06em;
  vertical-align: -0.12em;
  border-radius: 2px;
  background: var(--accent);
  animation: blink 1s steps(1) infinite;
}
.caret.is-typing { animation: none; }  /* 입력·삭제 중에는 켜진 상태 유지 */
@keyframes blink {
  50% { opacity: 0; }
}
.sub {
  margin: 18px 0 0;
  font-size: clamp(13px, 1.8vw, 17px);
  color: var(--muted);
}`,
    js: `const typed = document.getElementById('typed');
const caret = document.querySelector('.caret');
const phrases = ['한 곳에서 관리하세요', '더 빠르게 공유하세요', 'AI와 함께 정리하세요'];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  let index = 0;
  while (true) {
    const chars = Array.from(phrases[index]);  // 한글이 음절 단위로 찍히도록 분리

    caret.classList.add('is-typing');
    for (let n = 1; n <= chars.length; n++) {
      typed.textContent = chars.slice(0, n).join('');
      await wait(60 + Math.random() * 60);      // 불규칙한 입력 간격
    }
    caret.classList.remove('is-typing');
    await wait(1600);                            // 다 친 뒤 잠시 머묾

    caret.classList.add('is-typing');
    for (let n = chars.length - 1; n >= 0; n--) {
      typed.textContent = chars.slice(0, n).join('');
      await wait(35);                            // 지울 때는 더 빠르게
    }
    caret.classList.remove('is-typing');
    await wait(400);
    index = (index + 1) % phrases.length;
  }
}
run();`
  },
  {
    no: 18,
    id: 'text-scramble',
    cat: 'text',
    name: '텍스트 스크램블',
    en: 'Text Scramble / Decode Effect',
    level: 2,
    trigger: 'auto',
    timing: '글자당 8–24프레임 · rAF · 순환 2.2s',
    desc: '무작위 글자들이 빠르게 바뀌다가 왼쪽부터 차례로 원래 문장으로 맞춰지는 해독 효과입니다. 암호가 풀리는 화면처럼 기술적이고 긴장감 있는 느낌을 줍니다.',
    use: '보안·AI·개발자 도구 랜딩 헤드라인, 로딩 문구, 버튼 호버 텍스트',
    tech: ['requestAnimationFrame', 'JavaScript Promise'],
    terms: ['텍스트 스크램블 (Text Scramble)', '디코드 효과 (Decode Effect)', '글리프 셔플 (Glyph Shuffle)', '순차 확정 (Sequential Resolve)'],
    prompt: '헤드라인 문장이 무작위 글자에서 풀려나며 다음 문장으로 바뀌는 텍스트 스크램블(Text Scramble) 효과를 만들어줘. 이전 문장과 새 문장을 Array.from으로 글자 단위로 나누고, 글자마다 시작 프레임(인덱스×2 + 0~8 무작위)과 끝 프레임(시작 + 8~24 무작위)을 정해 requestAnimationFrame 루프에서 시작 전에는 이전 글자, 진행 중에는 무작위 글자, 끝나면 새 글자를 보여줘서 왼쪽부터 차례로 확정되게 해줘. 무작위 글자는 매 프레임 30% 확률로만 바꿔 너무 산만하지 않게 하고, 한글 자리에는 무작위 한글 음절, 그 외 자리에는 대문자·숫자·기호를 넣어 글자 폭이 튀지 않게 해줘. 해독 중인 글자는 브랜드 포인트 컬러에 opacity 0.75로 구분하고, 문장 3개를 완성 후 2.2초 간격으로 순환시켜줘. 스크린 리더가 깨진 글자를 읽지 않도록 전환할 때마다 제목의 aria-label을 최종 문장으로 갱신해줘.',
    html: `<section class="hero">
  <p class="eyebrow">SECURITY PLATFORM</p>
  <h1 class="scramble" id="scramble">가장 안전한 협업 공간</h1>
  <p class="sub">엔드투엔드 암호화 · 실시간 위협 탐지 · 제로 트러스트</p>
</section>`,
    css: `.hero {
  width: min(100%, 820px);
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--accent);
}
.scramble {
  min-height: 1.3em;
  margin: 0;
  font-size: clamp(22px, 5.8vw, 56px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  word-break: keep-all;
}
/* 아직 해독 중인 글자 */
.scramble .dud {
  color: var(--accent);
  opacity: .75;
}
.sub {
  margin: 18px 0 0;
  font-size: clamp(12px, 1.7vw, 16px);
  color: var(--muted);
}`,
    js: `const el = document.getElementById('scramble');
const phrases = ['가장 안전한 협업 공간', '모든 접속을 실시간 검증', '보안은 이제 기본값입니다'];
const SYMBOLS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%*+=?';

// 목표 글자와 같은 종류로 섞음: 한글 자리는 한글, 나머지는 영문·기호 (폭이 튀지 않게)
function randomGlyph(ch) {
  if (/[가-힣]/.test(ch)) {
    return String.fromCharCode(0xac00 + Math.floor(Math.random() * 11172));
  }
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function scrambleTo(next) {
  const from = Array.from(el.textContent);
  const to = Array.from(next);  // 한글 음절이 깨지지 않게 Array.from으로 분리
  const queue = [];
  for (let i = 0; i < Math.max(from.length, to.length); i++) {
    const start = i * 2 + Math.floor(Math.random() * 8);  // 왼쪽 글자부터 먼저 시작
    const end = start + 8 + Math.floor(Math.random() * 16);
    queue.push({ from: from[i] || '', to: to[i] || '', start, end, glyph: '' });
  }
  el.setAttribute('aria-label', next);

  let frame = 0;
  return new Promise((resolve) => {
    function update() {
      let html = '';
      let done = 0;
      for (const q of queue) {
        if (frame >= q.end) {
          html += q.to;
          done++;
        } else if (frame >= q.start) {
          const kind = q.to || q.from;
          if (kind === ' ') {
            html += ' ';
          } else {
            if (!q.glyph || Math.random() < 0.3) q.glyph = randomGlyph(kind);
            html += '<span class="dud">' + q.glyph + '</span>';
          }
        } else {
          html += q.from;
        }
      }
      el.innerHTML = html;
      frame++;
      if (done === queue.length) resolve();
      else requestAnimationFrame(update);
    }
    update();
  });
}

let index = 0;
async function cycle() {
  await scrambleTo(phrases[index]);
  index = (index + 1) % phrases.length;
  setTimeout(cycle, 2200);
}
el.textContent = '';
cycle();`
  },
  {
    no: 19,
    id: 'stagger-letters',
    cat: 'text',
    name: '글자별 스태거 등장',
    en: 'Staggered Letter Reveal',
    level: 1,
    trigger: 'auto',
    timing: '스태거 40ms · 800ms · easeOutQuint',
    desc: '글자가 하나씩 아래에서 떠오르며 흐릿함이 걷히고 선명해지는 등장 효과입니다. 짧은 간격으로 이어져 헤드라인이 물 흐르듯 써지는 느낌을 줍니다.',
    use: '히어로 헤드라인, 인트로 화면, 섹션 타이틀, 브랜드 슬로건',
    tech: ['CSS @keyframes', 'CSS 변수 (--i)', 'JavaScript 텍스트 분리'],
    terms: ['스태거 애니메이션 (Stagger Animation)', '텍스트 분리 (Text Splitting)', '블러 인 (Blur-in)', '이징 곡선 (Easing Curve)'],
    prompt: '히어로 헤드라인이 글자 하나씩 아래에서 떠오르는 스태거 애니메이션(Stagger Animation)을 만들어줘. 제목 텍스트를 Array.from으로 나눠 한글 음절 단위로 span을 만들고(공백은 white-space: pre로 폭 유지), 각 span에 순번을 CSS 변수 --i로 넘겨 animation-delay: calc(var(--i) * 40ms)로 계산해줘. 글자는 translateY(0.6em), opacity 0, blur(8px)에서 시작해 800ms 동안 cubic-bezier(.22,1,.36,1)로 제자리, opacity 1, blur(0)이 되게 해줘. 데모처럼 반복할 때는 등장이 끝나고 2초 머문 뒤 제목 전체를 400ms 페이드아웃하고 다시 재생해줘(실서비스에서는 한 번만 재생해도 돼). 글자를 쪼개면 스크린 리더가 한 글자씩 읽으니 제목에 aria-label로 원문을 넣고 span들은 aria-hidden 처리해줘.',
    html: `<section class="hero">
  <p class="eyebrow">MOTION DESIGN SYSTEM</p>
  <h1 class="stagger">
    <span class="line">움직임이 만드는</span>
    <span class="line">첫인상</span>
  </h1>
</section>`,
    css: `.hero {
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--muted);
}
.stagger {
  margin: 0;
  font-size: clamp(30px, min(8vw, 13vh), 84px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
}
.stagger .line { display: block; }
.stagger .line:last-child { color: var(--accent); }
.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(.6em);
  filter: blur(8px);
}
.char.space { white-space: pre; }  /* 공백 폭 유지 */
.stagger.is-in .char {
  animation: rise 800ms cubic-bezier(.22,1,.36,1) forwards;
  animation-delay: calc(var(--i) * 40ms);
}
.stagger.is-out {
  opacity: 0;
  transition: opacity 400ms ease;
}
@keyframes rise {
  to { opacity: 1; transform: none; filter: blur(0); }
}`,
    js: `const title = document.querySelector('.stagger');
const lines = Array.from(title.querySelectorAll('.line'));
title.setAttribute('aria-label', lines.map((line) => line.textContent.trim()).join(' '));

// 줄마다 글자를 span으로 쪼개고, 줄을 넘어 이어지는 순번을 --i로 넘김
let count = 0;
lines.forEach((line) => {
  const chars = Array.from(line.textContent.trim());  // 한글 음절 단위로 안전하게 분리
  line.textContent = '';
  chars.forEach((ch) => {
    const span = document.createElement('span');
    span.className = ch === ' ' ? 'char space' : 'char';
    span.textContent = ch;
    span.style.setProperty('--i', count++);
    span.setAttribute('aria-hidden', 'true');
    line.appendChild(span);
  });
});

const total = count * 40 + 800;  // 마지막 글자가 도착하는 시점
function play() {
  title.classList.remove('is-in', 'is-out');
  void title.offsetWidth;          // 강제 리플로우로 애니메이션을 처음부터 다시 시작
  title.classList.add('is-in');
  // 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다 (한 번만 재생)
  setTimeout(() => title.classList.add('is-out'), total + 2000);
  setTimeout(play, total + 2500);
}
play();`
  },
  {
    no: 20,
    id: 'gradient-text',
    cat: 'text',
    name: '흐르는 그라디언트 텍스트',
    en: 'Animated Gradient Text',
    level: 1,
    trigger: 'auto',
    timing: '6s linear · 무한 루프',
    desc: '큰 제목 글자 안에서 여러 색의 그라디언트가 끊임없이 옆으로 흘러가는 효과입니다. 글자 자체가 빛을 머금은 듯 생동감 있고 세련된 인상을 줍니다.',
    use: '히어로 헤드라인, 신제품 이름, AI 기능 강조 문구, 요금제 강조',
    tech: ['CSS background-clip: text', 'CSS @keyframes', 'linear-gradient'],
    terms: ['그라디언트 텍스트 (Gradient Text)', '배경 클리핑 (Background Clip Text)', '배경 위치 애니메이션 (Background Position Animation)', '끊김 없는 루프 (Seamless Loop)'],
    prompt: '히어로 제목 글자 안에서 그라디언트가 계속 흐르는 그라디언트 텍스트(Gradient Text)를 만들어줘. 브랜드 포인트 컬러, 핑크, 보조 컬러, 다시 브랜드 포인트 컬러 순서의 linear-gradient(90deg)를 background-size: 200% auto로 깔고, background-clip: text와 color: transparent로 글자 모양에만 보이게 해줘. @keyframes로 background-position을 0%에서 200%까지 6초 linear 무한 반복시키면 첫 색과 끝 색이 같아서 이음새 없이 흐르게 돼. 같은 텍스트를 ::after(content: attr(data-text), z-index -1)로 한 겹 더 깔고 같은 그라디언트에 blur(24px), opacity 0.35를 줘서 은은한 글로우를 더해줘. Safari를 위해 -webkit-background-clip: text도 함께 넣고, prefers-reduced-motion이면 애니메이션을 멈추고 정지된 그라디언트만 보여줘.',
    html: `<section class="hero">
  <p class="eyebrow">AI DESIGN ASSISTANT</p>
  <h1 class="gradient" data-text="상상을 화면으로">상상을 화면으로</h1>
  <p class="sub">문장 하나로 시안부터 코드까지 완성하세요</p>
</section>`,
    css: `.hero {
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--muted);
}
.gradient {
  position: relative;
  margin: 0;
  font-size: clamp(34px, min(10vw, 20vh), 104px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.04em;
  color: transparent;
}
/* 첫 색과 끝 색을 같게 두면 200%만큼 밀었을 때 이음새 없이 반복됨 */
.gradient,
.gradient::after {
  background: linear-gradient(90deg, var(--accent), #ff5c9a, var(--accent-2), var(--accent)) 0 0 / 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  animation: flow 6s linear infinite;
}
/* 같은 글자를 흐리게 한 겹 더 깔아 은은한 글로우 */
.gradient::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  z-index: -1;
  filter: blur(24px);
  opacity: .35;
}
@keyframes flow {
  to { background-position: 200% 0; }
}
.sub {
  margin: 16px 0 0;
  font-size: clamp(13px, 1.8vw, 17px);
  color: var(--muted);
}`,
    js: ''
  },
  {
    no: 21,
    id: 'glitch-text',
    cat: 'text',
    name: '글리치 텍스트',
    en: 'Glitch Text Effect',
    level: 2,
    trigger: 'auto',
    timing: '버스트 250–600ms · steps(1) · 불규칙',
    desc: '평소엔 멀쩡하던 제목이 불규칙한 순간마다 빨강·청록으로 갈라지며 가로 조각이 어긋나는 글리치 효과입니다. 신호가 잠깐 끊긴 화면처럼 거칠고 디지털한 긴장감을 줍니다.',
    use: '게임·e스포츠 티저, 음악·패션 캠페인, 테크 이벤트 랜딩, 404 페이지',
    tech: ['CSS ::before / ::after', 'clip-path: inset()', 'CSS @keyframes steps()', 'setTimeout'],
    terms: ['글리치 효과 (Glitch Effect)', 'RGB 분리 (RGB Split)', '색수차 (Chromatic Aberration)', '클립 패스 슬라이스 (Clip-path Slicing)', '스텝 타이밍 함수 (Steps Timing Function)'],
    prompt: '티저 페이지 제목에 가끔씩만 터지는 글리치 효과(Glitch Effect)를 만들어줘. 제목의 data-text를 content: attr(data-text)로 ::before, ::after에 복제하고, 두 겹에 배경색을 채운 뒤 text-shadow로 각각 -3px 빨강(#ff2d6f), +3px 청록(#00d9ff)을 줘서 RGB 분리(RGB Split)를 만들고 평소에는 opacity 0으로 숨겨둬. JS로 1.2~3.6초마다 무작위로 .is-glitching 클래스를 250~600ms 동안 붙이고, 그동안 두 겹에 clip-path: inset()으로 가로 조각 위치를 바꾸며 최대 6px 흔드는 360ms 키프레임을 steps(1)로 보간 없이 뚝뚝 끊기게 재생해줘. 본문 글자도 같은 동안 1~3px 흔들리며 빨강·청록 그림자가 번갈아 생기고 한 번씩 skewX(-6deg)로 틀어지게 하고, 버스트마다 음수 animation-delay를 무작위로 줘서 매번 다른 조각이 보이게 해줘. 번쩍임이 불편할 수 있으니 prefers-reduced-motion이면 버스트를 끄고 정적인 텍스트만 보여줘.',
    html: `<section class="hero">
  <p class="eyebrow">SEASON 04 · 사전 예약 오픈</p>
  <h1 class="glitch" data-text="새로운 시즌이 열린다">새로운 시즌이 열린다</h1>
  <p class="sub">10월 17일 00시, 전 서버 동시 오픈</p>
</section>`,
    css: `.hero {
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .2em;
  color: var(--accent);
}
.glitch {
  position: relative;
  margin: 0;
  font-size: clamp(28px, min(8vw, 15vh), 84px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  word-break: keep-all;
}
/* 같은 문구를 두 겹 복제: 배경으로 원본을 가리고 색 그림자로 RGB 분리 */
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  background: var(--bg);
  opacity: 0;
  pointer-events: none;
}
.glitch::before { text-shadow: -3px 0 #ff2d6f; }
.glitch::after { text-shadow: 3px 0 #00d9ff; }

/* 버스트 동안만 재생, steps(1)로 보간 없이 뚝뚝 끊김 */
.glitch.is-glitching { animation: jolt 360ms steps(1) infinite; }
.glitch.is-glitching::before,
.glitch.is-glitching::after { opacity: 1; }
.glitch.is-glitching::before { animation: slice-a 360ms steps(1) infinite; }
.glitch.is-glitching::after { animation: slice-b 360ms steps(1) infinite; }
.glitch.is-glitching,
.glitch.is-glitching::before,
.glitch.is-glitching::after { animation-delay: var(--offset, 0ms); }

@keyframes slice-a {
  0%  { clip-path: inset(8% 0 72% 0);  transform: translate(-5px, -1px); }
  20% { clip-path: inset(58% 0 18% 0); transform: translate(4px, 1px); }
  40% { clip-path: inset(30% 0 52% 0); transform: translate(-6px, 0); }
  60% { clip-path: inset(78% 0 6% 0);  transform: translate(3px, -1px); }
  80% { clip-path: inset(0 0 86% 0);   transform: translate(-2px, 1px); }
}
@keyframes slice-b {
  0%  { clip-path: inset(64% 0 14% 0); transform: translate(5px, 1px); }
  20% { clip-path: inset(12% 0 70% 0); transform: translate(-4px, 0); }
  40% { clip-path: inset(44% 0 38% 0); transform: translate(6px, -1px); }
  60% { clip-path: inset(2% 0 82% 0);  transform: translate(-3px, 1px); }
  80% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 0); }
}
@keyframes jolt {
  0%  { transform: translate(0); text-shadow: -2px 0 #ff2d6f, 2px 0 #00d9ff; }
  25% { transform: translate(-2px, 1px); text-shadow: 2px 0 #ff2d6f, -2px 0 #00d9ff; }
  50% { transform: translate(2px, -1px) skewX(-6deg); text-shadow: -3px 0 #ff2d6f, 3px 0 #00d9ff; }
  75% { transform: translate(-1px, 0); text-shadow: 1px 0 #ff2d6f, -1px 0 #00d9ff; }
}
.sub {
  margin: 16px 0 0;
  font-size: clamp(13px, 1.8vw, 16px);
  color: var(--muted);
}`,
    js: `const title = document.querySelector('.glitch');

// 계속 떨리면 피로하므로 불규칙한 간격으로 짧은 버스트만 일으킴
function burst() {
  // 버스트마다 키프레임 시작 지점을 바꿔 매번 다른 조각이 보이게
  title.style.setProperty('--offset', (-Math.random() * 360) + 'ms');
  title.classList.add('is-glitching');
  setTimeout(() => title.classList.remove('is-glitching'), 250 + Math.random() * 350);
  setTimeout(burst, 1200 + Math.random() * 2400);
}
setTimeout(burst, 700);`
  },
  {
    no: 22,
    id: 'neon-flicker',
    cat: 'text',
    name: '네온 플리커',
    en: 'Neon Flicker Text',
    level: 1,
    trigger: 'auto',
    timing: '4.2s·6.8s 불규칙 키프레임 · 무한',
    desc: '여러 겹의 text-shadow로 빛나는 네온사인 글자 중 몇 글자가 제멋대로 깜빡이는 효과입니다. 오래된 간판처럼 전류가 튀는 듯한 아날로그 감성을 줍니다.',
    use: '바·카페·공연 이벤트 랜딩, 야간 세일 배너, 게임 로비, 레트로 콘셉트 페이지',
    tech: ['CSS text-shadow', 'CSS @keyframes', 'box-shadow'],
    terms: ['네온 글로우 (Neon Glow)', '플리커 애니메이션 (Flicker Animation)', '다중 텍스트 그림자 (Layered Text Shadow)', '불규칙 키프레임 (Irregular Keyframes)'],
    prompt: '어두운 간판 패널 위에 네온사인 문구를 띄우고 그중 몇 글자만 제멋대로 깜빡이는 네온 플리커(Neon Flicker) 효과를 만들어줘. 글자 색은 흰색에 가까운 연분홍으로 두고 text-shadow를 0 0 2px 흰색, 0 0 8px·18px 네온 핑크, 0 0 36px·64px 진한 핑크까지 5겹 쌓아 튜브가 빛나는 다중 텍스트 그림자(Layered Text Shadow)를 만들어줘. 깜빡이는 글자 2개는 각각 span으로 감싸 4.2초, 6.8초처럼 길이가 다른 키프레임을 주고, 16~17.4%, 20~21.4%, 62~64.4%처럼 짧은 구간 동안만 꺼진 튜브 색(어두운 자주)과 text-shadow: none을 유지하고 경계는 0.1% 차이로 붙여 뚝 끊기게 해서 주기가 겹치지 않는 불규칙한 깜빡임을 만들어줘. 패널 테두리와 아래 작은 영문 줄은 청록 네온으로 box-shadow·text-shadow 글로우를 주고, 간판 전체도 9초에 한 번 살짝 어두워지게 해줘. 네온 글로우는 밝은 배경에서 보이지 않으니 패널은 테마와 상관없이 어둡게 고정하고, prefers-reduced-motion이면 깜빡임을 끄고 켜진 상태로 유지해줘.',
    html: `<div class="sign">
  <p class="neon">오늘<span class="flick-a">도</span> 영<span class="flick-b">업</span>중</p>
  <p class="neon-sub">OPEN · 18:00 - 02:00</p>
</div>`,
    css: `/* 네온은 어두운 판 위에서만 빛나 보이므로 간판 판은 테마와 무관하게 어둡게 고정 */
.sign {
  margin: 0 16px;
  padding: clamp(22px, 5vw, 44px) clamp(24px, 6vw, 60px);
  border: 2px solid #5ff2ff;
  border-radius: 20px;
  text-align: center;
  background: radial-gradient(120% 100% at 50% 40%, #1c1226, #09070d 70%);
  box-shadow:
    0 0 6px #5ff2ff,
    0 0 22px rgba(95, 242, 255, .45),
    inset 0 0 18px rgba(95, 242, 255, .3),
    0 24px 60px rgba(0, 0, 0, .35);
  animation: dip 9s infinite;
}
.neon {
  --glow: 0 0 2px #fff, 0 0 8px #ff4fa8, 0 0 18px #ff4fa8, 0 0 36px #ff2d8a, 0 0 64px #ff2d8a;
  margin: 0;
  font-size: clamp(34px, min(9vw, 16vh), 84px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: .02em;
  color: #ffe6f3;
  text-shadow: var(--glow);
}
/* 글자마다 길이가 다른 키프레임 → 주기가 겹치지 않아 제멋대로 깜빡임 */
.flick-a { animation: flicker-a 4.2s infinite; }
.flick-b { animation: flicker-b 6.8s 1.1s infinite; }
/* 켜짐·꺼짐 구간을 0.1% 차이로 붙여 뚝 끊기게, 꺼진 구간은 잠깐 유지 */
@keyframes flicker-a {
  0%, 15.9%, 17.5%, 19.9%, 21.5%, 61.9%, 64.5%, 100% { color: #ffe6f3; text-shadow: var(--glow); }
  16%, 17.4%, 20%, 21.4%, 62%, 64.4% { color: #4a2a3f; text-shadow: none; }
}
@keyframes flicker-b {
  0%, 39.9%, 41.5%, 42.4%, 45.5%, 67.9%, 78.1%, 100% { color: #ffe6f3; text-shadow: var(--glow); }
  40%, 41.4%, 42.5%, 45.4% { color: #4a2a3f; text-shadow: none; }
  68%, 78% { color: #ffb8dc; text-shadow: 0 0 2px #fff, 0 0 6px #ff4fa8; }
}
@keyframes dip {
  0%, 91.9%, 93.6%, 100% { opacity: 1; }
  92%, 93.5% { opacity: .78; }
}
.neon-sub {
  margin: 14px 0 0;
  font-size: clamp(11px, 1.8vw, 15px);
  font-weight: 600;
  letter-spacing: .3em;
  color: #d9fdff;
  text-shadow: 0 0 4px #5ff2ff, 0 0 12px #5ff2ff, 0 0 24px rgba(95, 242, 255, .6);
}`,
    js: ''
  },
  {
    no: 23,
    id: 'word-rotator',
    cat: 'text',
    name: '단어 로테이터',
    en: 'Rotating Words / Word Rotator',
    level: 2,
    trigger: 'auto',
    timing: '2s 간격 · 500ms easeOutQuint · 폭 전환',
    desc: '문장은 그대로 두고 핵심 단어만 위로 밀려 올라가며 다음 단어로 바뀌는 효과입니다. 단어 길이에 맞춰 칸 폭도 부드럽게 늘고 줄어 문장이 자연스럽게 이어집니다.',
    use: '히어로 헤드라인, 서비스 가치 소개, 타깃 고객 나열, 에이전시 소개',
    tech: ['CSS transition', 'JavaScript setInterval', 'offsetWidth 측정'],
    terms: ['단어 로테이터 (Word Rotator)', '세로 슬라이드 전환 (Vertical Slide Transition)', '폭 애니메이션 (Width Animation)', '오버플로 마스크 (Overflow Mask)'],
    prompt: '"우리는 ___을 만듭니다" 헤드라인에서 빈칸의 핵심 단어만 2초마다 바뀌는 단어 로테이터(Word Rotator)를 만들어줘. 단어 4개를 overflow: hidden인 인라인 블록 안에 absolute로 겹쳐 두고, 새 단어는 translateY(100%)·opacity 0에서 올라오고 이전 단어는 translateY(-100%)로 빠져나가게 500ms cubic-bezier(.22,1,.36,1) 트랜지션을 줘. 바꿀 때마다 다음 단어의 offsetWidth를 재서 컨테이너 width에 em 단위로 넣고 같은 곡선으로 트랜지션해, 뒤따르는 글자가 단어 길이에 맞춰 부드럽게 밀리고 당겨지게 해줘. 단어 칸은 브랜드 포인트 컬러 글자에 옅은 포인트 컬러 배경을 깔아 폭 변화가 눈에 보이게 해줘. 조사가 어색하지 않도록 받침 있는 단어끼리(경험, 제품, 첫인상, 내일) 묶고, prefers-reduced-motion이면 슬라이드 없이 opacity만 바꿔줘.',
    html: `<section class="hero">
  <p class="eyebrow">PRODUCT STUDIO</p>
  <h1 class="headline">
    우리는 <span class="rotator"><span class="word is-active">경험</span><span class="word">제품</span><span class="word">첫인상</span><span class="word">내일</span></span>을 만듭니다
  </h1>
  <p class="sub">기획부터 출시까지 함께하는 프로덕트 스튜디오</p>
</section>`,
    css: `.hero {
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--muted);
}
.headline {
  margin: 0;
  font-size: clamp(22px, 6vw, 60px);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.03em;
  word-break: keep-all;
}
.rotator {
  position: relative;
  display: inline-block;
  height: 1.3em;
  vertical-align: top;
  overflow: hidden;  /* 칸 밖으로 나간 단어는 가려짐 */
  border-radius: .18em;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  transition: width 500ms cubic-bezier(.22,1,.36,1);
}
.word {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 .18em;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 500ms cubic-bezier(.22,1,.36,1), opacity 500ms ease;
}
.word.is-active { opacity: 1; transform: translateY(0); }
.word.is-leaving { opacity: 0; transform: translateY(-100%); }
.sub {
  margin: 18px 0 0;
  font-size: clamp(13px, 1.8vw, 17px);
  color: var(--muted);
}`,
    js: `const rotator = document.querySelector('.rotator');
const words = Array.from(rotator.querySelectorAll('.word'));
let index = 0;

// 다음 단어의 실제 폭을 재서 컨테이너에 적용 (em 단위라 글자 크기가 바뀌어도 비율 유지)
function fitTo(word) {
  const fontSize = parseFloat(getComputedStyle(rotator).fontSize);
  rotator.style.width = (word.offsetWidth / fontSize) + 'em';
}
fitTo(words[0]);

setInterval(() => {
  const current = words[index];
  index = (index + 1) % words.length;
  const next = words[index];

  words.forEach((word) => word.classList.remove('is-leaving'));
  current.classList.replace('is-active', 'is-leaving');  // 위로 빠져나감
  next.classList.add('is-active');                        // 아래에서 올라옴
  fitTo(next);
}, 2000);`
  },
  {
    no: 24,
    id: 'wavy-text',
    cat: 'text',
    name: '웨이브 텍스트',
    en: 'Wavy Text Animation',
    level: 1,
    trigger: 'auto',
    timing: '1.6s ease-in-out · 글자당 90ms 위상차',
    desc: '글자들이 순서대로 위아래로 출렁이며 사인파처럼 이어지는 물결 효과입니다. 가볍고 경쾌해서 여름, 여행, 이벤트처럼 밝은 분위기에 잘 어울립니다.',
    use: '이벤트·프로모션 배너, 여행·레저 랜딩, 로딩 문구, 키즈 서비스',
    tech: ['CSS @keyframes', 'animation-delay', 'CSS 변수 (--i)'],
    terms: ['웨이브 텍스트 (Wavy Text)', '사인파 모션 (Sine Wave Motion)', '위상 지연 (Phase Offset)', '음수 애니메이션 지연 (Negative Animation Delay)'],
    prompt: '프로모션 배너 제목의 글자들이 왼쪽에서 오른쪽으로 출렁이는 웨이브 텍스트(Wavy Text)를 만들어줘. 제목을 Array.from으로 한글 음절 단위 span으로 나누고(공백은 white-space: pre로 폭 유지), 각 span에 순번 --i를 넘겨줘. 모든 글자에 translateY(0.16em)와 translateY(-0.16em) 사이를 오가는 1.6초 ease-in-out 무한 키프레임을 주고, animation-delay를 calc(var(--i) * 90ms - 2s)로 둬서 글자마다 위상이 90ms씩 어긋나면서도 페이지를 열자마자 물결이 이미 흐르고 있게 해줘(Phase Offset). 물결 마루에 올라온 글자는 브랜드 포인트 컬러로 살짝 물들게 해줘. 계속 움직이는 글자는 읽기 어려울 수 있으니 prefers-reduced-motion이면 애니메이션을 멈추고, 스크린 리더용으로 제목에 aria-label을 넣고 span은 aria-hidden 처리해줘.',
    html: `<section class="hero">
  <p class="eyebrow">SUMMER TRAVEL</p>
  <h1 class="wavy">주말엔 바다로 떠나요</h1>
  <p class="sub">여름 한정 오션뷰 숙소 최대 40% 할인</p>
</section>`,
    css: `.hero {
  padding: 0 20px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 18px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--accent);
}
.wavy {
  margin: 0;
  font-size: clamp(30px, min(8.4vw, 15vh), 88px);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.02em;
  word-break: keep-all;
}
.wavy span {
  display: inline-block;
  animation: wave 1.6s ease-in-out infinite;
  /* 글자마다 90ms씩 위상차, -2s로 로드 즉시 물결이 이미 흐르는 상태 */
  animation-delay: calc(var(--i) * 90ms - 2s);
}
.wavy .space { white-space: pre; }
@keyframes wave {
  0%, 100% { transform: translateY(.16em); color: var(--fg); }
  50% { transform: translateY(-.16em); color: var(--accent); }
}
.sub {
  margin: 20px 0 0;
  font-size: clamp(13px, 1.8vw, 17px);
  color: var(--muted);
}`,
    js: `// 글자마다 span으로 감싸고 순번(--i)을 넘겨 animation-delay를 계산
document.querySelectorAll('.wavy').forEach((el) => {
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.textContent = '';
  Array.from(text).forEach((ch, i) => {  // 한글 음절이 깨지지 않게 Array.from으로 분리
    const span = document.createElement('span');
    span.textContent = ch;
    if (ch === ' ') span.className = 'space';
    span.style.setProperty('--i', i);
    span.setAttribute('aria-hidden', 'true');
    el.appendChild(span);
  });
});`
  },
  {
    no: 25,
    id: 'mask-reveal',
    cat: 'text',
    name: '마스크 라인 리빌',
    en: 'Masked Line Reveal',
    level: 1,
    trigger: 'auto',
    timing: '줄 스태거 120ms · 900ms easeOutQuint',
    desc: '여러 줄의 헤드라인이 보이지 않는 창 뒤에서 한 줄씩 밀려 올라오며 나타나는 효과입니다. 잘린 선 아래에서 글자가 솟아올라 에디토리얼하고 고급스러운 인상을 줍니다.',
    use: '히어로 헤드라인, 브랜드 캠페인, 포트폴리오 인트로, 섹션 전환 타이틀',
    tech: ['CSS transition', 'overflow: hidden', 'CSS 변수 (--i)'],
    terms: ['마스크 리빌 (Mask Reveal)', '라인 리빌 (Line Reveal)', '스태거 애니메이션 (Stagger Animation)', '오버플로 마스크 (Overflow Mask)'],
    prompt: '히어로의 3줄 헤드라인이 가려진 창 뒤에서 한 줄씩 밀려 올라오는 마스크 라인 리빌(Mask Line Reveal)을 만들어줘. 각 줄을 overflow: hidden인 바깥 span으로 감싸고, 안쪽 span을 translateY(110%)에 두었다가 .is-in이 붙으면 900ms cubic-bezier(.22,1,.36,1)로 translateY(0)까지 올라오게 해줘. 줄마다 --i를 주고 transition-delay: calc(var(--i) * 120ms)로 120ms씩 어긋나게 하고, 아래 설명 문단은 420ms 뒤에 opacity와 12px 이동으로 따라 나오게 해줘. 데모처럼 반복할 때는 3.8초 뒤 translateY(-110%)로 500ms ease-in 퇴장시키고, 트랜지션 없이 원위치로 되돌린 다음 강제 리플로우 후 다시 재생해줘. 실제 페이지에서는 IntersectionObserver로 뷰포트 진입 시 한 번만 재생하고, 한글 받침이 마스크에 잘리지 않도록 줄마다 padding-bottom을 0.06em 정도 줘.',
    html: `<section class="hero">
  <p class="eyebrow">BRAND FILM 2026</p>
  <h1 class="reveal">
    <span class="line"><span style="--i:0">작은 디테일이</span></span>
    <span class="line"><span style="--i:1">브랜드의 온도를</span></span>
    <span class="line"><span style="--i:2">결정합니다</span></span>
  </h1>
  <p class="sub">스튜디오 모션이 만드는 인터랙션 가이드</p>
</section>`,
    css: `.hero {
  width: min(100%, 720px);
  padding: 0 24px;
}
.eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--muted);
}
.reveal {
  margin: 0;
  font-size: clamp(30px, min(7.6vw, 12vh), 78px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.035em;
}
/* 바깥 줄이 창(마스크) 역할, 안쪽 글자만 위아래로 움직임 */
.line {
  display: block;
  overflow: hidden;
  padding-bottom: .06em;  /* 받침이 마스크에 잘리지 않게 */
}
.line > span {
  display: block;
  transform: translateY(110%);
}
.line:last-child > span { color: var(--accent); }
.reveal.is-in .line > span {
  transform: translateY(0);
  transition: transform 900ms cubic-bezier(.22,1,.36,1);
  transition-delay: calc(var(--i) * 120ms);
}
.reveal.is-out .line > span {
  transform: translateY(-110%);
  transition: transform 500ms cubic-bezier(.7,0,.84,0);
  transition-delay: calc(var(--i) * 60ms);
}
.sub {
  margin: 20px 0 0;
  font-size: clamp(13px, 1.8vw, 17px);
  color: var(--muted);
  opacity: 0;
  transform: translateY(12px);
}
.reveal.is-in + .sub {
  opacity: 1;
  transform: none;
  transition: opacity 700ms ease 420ms, transform 700ms cubic-bezier(.22,1,.36,1) 420ms;
}
.reveal.is-out + .sub {
  opacity: 0;
  transition: opacity 300ms ease;
}`,
    js: `const title = document.querySelector('.reveal');

function play() {
  title.classList.remove('is-in', 'is-out');  // 트랜지션 없이 아래(110%)로 즉시 복귀
  void title.offsetWidth;                     // 강제 리플로우로 시작 상태를 확정
  title.classList.add('is-in');
  // 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다 (뷰포트 진입 시 한 번만)
  setTimeout(() => title.classList.add('is-out'), 3800);
  setTimeout(play, 4700);
}
play();`
  },
  {
    no: 26,
    id: 'count-up',
    cat: 'text',
    name: '숫자 카운트업',
    en: 'Count-up Number Animation',
    level: 2,
    trigger: 'auto',
    timing: '2000ms · easeOutExpo · 150ms 스태거',
    desc: '통계 숫자가 0에서 목표값까지 빠르게 올라가다 끝에서 천천히 멈추는 카운트업 효과입니다. 천 단위 쉼표와 소수점이 유지되고 자릿수 폭이 고정돼 숫자가 흔들리지 않습니다.',
    use: '랜딩 성과 지표 섹션, 대시보드 KPI, 회사 소개·IR 페이지, 이벤트 참여자 수',
    tech: ['requestAnimationFrame', 'toLocaleString (Intl)', 'font-variant-numeric'],
    terms: ['카운트업 애니메이션 (Count-up Animation)', '이징 함수 (Easing Function: easeOutExpo)', '고정폭 숫자 (Tabular Numbers)', '숫자 포맷팅 (Number Formatting)'],
    prompt: '성과 지표 섹션에 누적 사용자 1,280,000명, 고객 만족도 98.6%, 파트너사 340곳 세 블록이 0부터 올라가는 카운트업 애니메이션(Count-up Animation)을 만들어줘. requestAnimationFrame 루프에서 경과 시간을 2000ms로 나눈 진행률 t에 easeOutExpo(1 - 2^(-10t))를 적용해 목표값에 곱하고, 블록마다 시작을 150ms씩 늦춰줘. 값은 ko-KR 로케일의 toLocaleString으로 천 단위 쉼표를 넣고, data-decimals 속성에 따라 minimumFractionDigits와 maximumFractionDigits를 같게 줘서 소수점 자릿수를 고정해줘. font-variant-numeric: tabular-nums를 쓰고, 시작 전에 최종 값으로 한 번 렌더링해 폭을 잰 뒤 em 단위 min-width로 고정해서 자릿수가 늘어도 단위 글자와 레이아웃이 흔들리지 않게 해줘. 실제 페이지에서는 IntersectionObserver로 섹션이 보일 때 한 번만 실행하고, prefers-reduced-motion이면 최종 값을 바로 보여줘.',
    html: `<section class="stats">
  <p class="eyebrow">2026년 9월 기준</p>
  <div class="grid">
    <div class="stat">
      <p class="value"><span class="num" data-to="1280000">0</span><span class="unit">명</span></p>
      <p class="label">누적 사용자</p>
    </div>
    <div class="stat">
      <p class="value"><span class="num" data-to="98.6" data-decimals="1">0</span><span class="unit">%</span></p>
      <p class="label">고객 만족도</p>
    </div>
    <div class="stat">
      <p class="value"><span class="num" data-to="340">0</span><span class="unit">곳</span></p>
      <p class="label">파트너사</p>
    </div>
  </div>
</section>`,
    css: `.stats {
  width: min(100%, 880px);
  padding: 0 20px;
}
.eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .12em;
  text-align: center;
  color: var(--muted);
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.stat {
  padding: clamp(16px, 2.4vw, 24px);
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
}
.value {
  margin: 0;
  font-size: clamp(26px, 4vw, 44px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.num {
  display: inline-block;
  text-align: right;
  font-variant-numeric: tabular-nums;  /* 숫자마다 폭이 같아 흔들림 없음 */
}
.unit {
  margin-left: .12em;
  font-size: .5em;
  font-weight: 700;
  color: var(--accent);
}
.label {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--muted);
}
@media (max-width: 680px) {
  .grid { grid-template-columns: 1fr; gap: 10px; }
  .stat {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 14px 18px;
  }
  .label { margin: 0; }
}`,
    js: `const DURATION = 2000;
const STAGGER = 150;
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function format(value, decimals) {
  return value.toLocaleString('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

// 최종 값으로 한 번 그려 폭을 재고 min-width로 고정 → 자릿수가 늘어도 레이아웃이 그대로
const items = Array.from(document.querySelectorAll('.num')).map((el) => {
  const item = { el, to: Number(el.dataset.to), decimals: Number(el.dataset.decimals || 0) };
  el.textContent = format(item.to, item.decimals);
  el.style.minWidth = (el.offsetWidth / parseFloat(getComputedStyle(el).fontSize)) + 'em';
  el.textContent = format(0, item.decimals);
  return item;
});

function run() {
  const start = performance.now();
  function tick(now) {
    let running = false;
    items.forEach((item, i) => {
      const t = Math.min(Math.max((now - start - i * STAGGER) / DURATION, 0), 1);
      item.el.textContent = format(item.to * easeOutExpo(t), item.decimals);
      if (t < 1) running = true;
    });
    if (running) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
run();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다 (IntersectionObserver로 한 번만 실행)
setInterval(run, 5000);`
  },
  {
    no: 27,
    id: 'split-flap',
    cat: 'text',
    name: '스플릿 플랩 디스플레이',
    en: 'Split-flap Display',
    level: 3,
    trigger: 'auto',
    timing: '플랩 120ms · 무작위 2–5회 · 4s 주기',
    desc: '공항 출발 안내판처럼 글자 칸의 위아래 반쪽이 접히며 여러 번 넘어간 뒤 새 글자에 멈추는 효과입니다. 착착 넘어가는 기계식 움직임이 아날로그 감성과 정보가 갱신되는 긴장감을 줍니다.',
    use: '출시 카운트다운, 실시간 현황판, 여행·항공 서비스, 이벤트 티저',
    tech: ['CSS 3D transform (rotateX)', 'Web Animations API', 'perspective', 'backface-visibility'],
    terms: ['스플릿 플랩 디스플레이 (Split-flap Display)', '솔라리 보드 (Solari Board)', '3D 회전 (rotateX)', '원근감 (Perspective)'],
    prompt: '공항 출발 안내판처럼 시각·목적지 코드·상태를 보여주는 스플릿 플랩 디스플레이(Split-flap Display)를 만들어줘. 글자 칸 하나를 위아래 반쪽 정지판 2개와 움직이는 날개 2개로 구성하고, 각 반쪽은 overflow: hidden 안에 칸 전체 높이의 글자를 넣어 위쪽 또는 아래쪽 절반만 보이게 해줘. 글자를 바꿀 때는 위 정지판을 먼저 새 글자로 바꾸고, 이전 글자가 적힌 위 날개를 아래 모서리 기준으로 rotateX(0deg)에서 rotateX(-90deg)까지 60ms ease-in, 이어서 새 글자가 적힌 아래 날개를 rotateX(90deg)에서 0deg까지 60ms ease-out으로 넘기고(Web Animations API), 넘어가는 동안 brightness(0.55)로 어두워지게 해줘. 칸마다 같은 종류(숫자·영문·한글)의 무작위 글자로 2~5번 넘긴 뒤 목표 글자에 멈추고, 칸 순서대로 45ms, 줄마다 140ms씩 늦게 시작해 4초마다 다음 운항 정보로 바뀌게 해줘. 칸마다 perspective와 backface-visibility: hidden, 가운데 1px 경첩선을 넣고, prefers-reduced-motion이면 넘김 없이 글자만 바로 바꿔줘.',
    html: `<section class="board">
  <header class="board-head">
    <strong>출발</strong>
    <span>DEPARTURES</span>
  </header>
  <div class="grid" id="grid">
    <span class="col">시각</span>
    <span class="col">목적지</span>
    <span class="col">상태</span>
  </div>
</section>`,
    css: `.board {
  --s: clamp(22px, min(5.4vw, 9vh), 50px);  /* 칸 크기 기준값 */
  padding: calc(var(--s) * .5) calc(var(--s) * .6);
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
  box-shadow: 0 20px 50px rgba(0, 0, 0, .18);
}
.board-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: calc(var(--s) * .4);
}
.board-head strong { font-size: max(15px, calc(var(--s) * .46)); }
.board-head span,
.col {
  font-size: 11px;
  letter-spacing: .16em;
  color: var(--muted);
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: calc(var(--s) * .16) calc(var(--s) * .5);
}
.group { display: flex; gap: 3px; }
.flap {
  position: relative;
  width: calc(var(--s) * .78);
  height: calc(var(--s) * 1.14);
  perspective: calc(var(--s) * 5);
  font-size: calc(var(--s) * .66);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.half {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  overflow: hidden;
  background: var(--bg);
  color: var(--fg);
  backface-visibility: hidden;
}
/* 칸 전체 높이의 글자를 넣고 반쪽만 보여줌 */
.half span {
  display: block;
  height: 200%;
  line-height: calc(var(--s) * 1.14);
  text-align: center;
}
.top { top: 0; border-radius: 4px 4px 0 0; transform-origin: 50% 100%; }
.bottom { bottom: 0; border-radius: 0 0 4px 4px; transform-origin: 50% 0; }
.bottom span { transform: translateY(-50%); }
.leaf { z-index: 2; }
.bottom.leaf { transform: rotateX(90deg); }  /* 대기 중에는 누워 있어 보이지 않음 */
.status .half { color: var(--accent-2); }
/* 가운데 경첩선 */
.flap::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: calc(50% - .5px);
  z-index: 3;
  height: 1px;
  background: var(--surface);
}`,
    js: `const grid = document.getElementById('grid');
const FLIP = 120;  // 한 번 넘어가는 시간(ms) = 위 날개 절반 + 아래 날개 절반
const DARK = 'brightness(.55)';
const POOLS = {
  digit: '0123456789',
  latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  hangul: '가나다라마바사아자차카타파하탑승정시지연마감'
};
const PAGES = [
  [['09:40', 'NRT', '탑승중'], ['10:15', 'CDG', '정시'], ['10:55', 'JFK', '지연']],
  [['11:20', 'SIN', '정시'], ['11:45', 'LAX', '탑승중'], ['12:30', 'HKG', '마감']],
  [['13:05', 'FRA', '정시'], ['13:40', 'BKK', '지연'], ['14:10', 'SYD', '탑승중']]
];
const COLS = [5, 3, 3];  // 시각 · 목적지 · 상태 칸 수

// 칸 하나 = 위/아래 정지판 + 위/아래 날개
function createTile() {
  const el = document.createElement('span');
  el.className = 'flap';
  el.innerHTML =
    '<span class="half top"><span></span></span>' +
    '<span class="half bottom"><span></span></span>' +
    '<span class="half top leaf"><span></span></span>' +
    '<span class="half bottom leaf"><span></span></span>';
  const [top, bottom, leafTop, leafBottom] = el.children;
  return { el, top, bottom, leafTop, leafBottom, char: ' ' };
}

const rows = Array.from({ length: 3 }, () => {
  const tiles = [];
  COLS.forEach((count, c) => {
    const group = document.createElement('span');
    group.className = c === 2 ? 'group status' : 'group';
    for (let i = 0; i < count; i++) {
      const tile = createTile();
      group.appendChild(tile.el);
      tiles.push(tile);
    }
    grid.appendChild(group);
  });
  return tiles;
});

const write = (half, ch) => { half.firstChild.textContent = ch; };

async function flipTo(tile, next) {
  write(tile.top, next);          // 위 정지판은 미리 교체 (위 날개가 가리고 있음)
  write(tile.leafTop, tile.char);
  write(tile.leafBottom, next);
  tile.char = next;
  await tile.leafTop.animate(
    [{ transform: 'rotateX(0deg)', filter: 'brightness(1)' }, { transform: 'rotateX(-90deg)', filter: DARK }],
    { duration: FLIP / 2, easing: 'ease-in', fill: 'forwards' }
  ).finished;
  await tile.leafBottom.animate(
    [{ transform: 'rotateX(90deg)', filter: DARK }, { transform: 'rotateX(0deg)', filter: 'brightness(1)' }],
    { duration: FLIP / 2, easing: 'ease-out', fill: 'forwards' }
  ).finished;
  write(tile.bottom, next);       // 아래 날개가 다 덮은 뒤 아래 정지판 교체
  write(tile.leafTop, next);
  tile.leafTop.getAnimations().forEach((a) => a.cancel());
  tile.leafBottom.getAnimations().forEach((a) => a.cancel());
}

function poolFor(ch) {
  if (/[0-9]/.test(ch)) return POOLS.digit;
  if (/[A-Z]/.test(ch)) return POOLS.latin;
  if (/[가-힣]/.test(ch)) return POOLS.hangul;
  return '';
}

// 같은 종류의 무작위 글자로 2~5번 넘긴 뒤 목표 글자에 멈춤
async function spin(tile, target) {
  if (tile.char === target) return;
  const pool = Array.from(poolFor(target === ' ' ? tile.char : target));
  const steps = pool.length ? 2 + Math.floor(Math.random() * 4) : 0;
  for (let i = 0; i < steps; i++) {
    await flipTo(tile, pool[Math.floor(Math.random() * pool.length)]);
  }
  await flipTo(tile, target);
}

function show(page) {
  page.forEach(([time, code, status], r) => {
    Array.from(time + code + status.padEnd(3, ' ')).forEach((ch, c) => {
      setTimeout(() => spin(rows[r][c], ch), r * 140 + c * 45);
    });
  });
}

let current = 0;
show(PAGES[current]);
setInterval(() => {
  current = (current + 1) % PAGES.length;
  show(PAGES[current]);
}, 4000);`
  },
  {
    no: 28,
    id: 'outline-fill',
    cat: 'text',
    name: '아웃라인 채우기 호버',
    en: 'Outline Text Fill on Hover',
    level: 1,
    trigger: 'hover',
    timing: '600ms · cubic-bezier(.65,0,.35,1)',
    desc: '속이 빈 윤곽선 글자에 마우스를 올리면 왼쪽부터 색이 차오르며 꽉 찬 글자로 바뀌는 메뉴 효과입니다. 큰 타이포만으로 인터랙션이 분명하게 느껴져 에디토리얼한 사이트에 잘 맞습니다.',
    use: '풀스크린 내비게이션 메뉴, 포트폴리오 목록, 에이전시 사이트, 푸터 CTA',
    tech: ['-webkit-text-stroke', 'background-clip: text', 'CSS transition'],
    terms: ['아웃라인 텍스트 (Outline Text)', '텍스트 스트로크 (Text Stroke)', '배경 클리핑 (Background Clip Text)', '호버 채우기 (Hover Fill)'],
    prompt: '풀스크린 메뉴의 큰 단어 3개가 평소엔 윤곽선만 보이다가 마우스를 올리면 왼쪽부터 색이 차오르는 아웃라인 채우기(Outline Text Fill) 효과를 만들어줘. 글자는 -webkit-text-fill-color: transparent에 -webkit-text-stroke 1.5px(보조 텍스트 컬러)로 윤곽선(Text Stroke)만 보이게 하고, 배경은 브랜드 포인트 컬러 50%와 투명 50%로 나뉜 linear-gradient(90deg)를 background-size 200% 100%로 깐 뒤 background-clip: text로 글자 안에만 칠해줘. 평소엔 background-position 100%로 투명한 절반을 보여주다가 hover 시 0%로 옮겨 600ms cubic-bezier(.65,0,.35,1)로 왼쪽에서 오른쪽으로 채우고, 윤곽선 색도 포인트 컬러로 바꾸면서 번호 색과 화살표(16px 왼쪽에서 슬라이드 인)도 함께 강조해줘. 마우스를 떼면 같은 곡선으로 되감기게 해줘. 터치 기기에는 hover가 없으니 :focus-visible에도 같은 스타일을 걸고, 모바일에서는 현재 페이지 항목을 채워진 상태로 보여줘.',
    html: `<nav class="menu" aria-label="주 메뉴">
  <a class="item" href="#">
    <span class="idx">01</span>
    <span class="word">프로젝트</span>
    <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  </a>
  <a class="item" href="#">
    <span class="idx">02</span>
    <span class="word">스튜디오</span>
    <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  </a>
  <a class="item" href="#">
    <span class="idx">03</span>
    <span class="word">문의하기</span>
    <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  </a>
</nav>`,
    css: `.menu {
  display: flex;
  flex-direction: column;
  width: min(100%, 760px);
  padding: 0 24px;
}
.item {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 24px);
  padding: 6px 0;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  text-decoration: none;
  outline: none;
}
.item:first-child { border-top: 1px solid var(--line); }
.idx {
  align-self: flex-start;
  margin-top: 1.4em;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  transition: color 300ms ease;
}
.word {
  font-size: clamp(40px, min(13vw, 17vh), 108px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  /* 속은 비우고 윤곽선만 */
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.5px var(--muted);
  /* 왼쪽 절반은 포인트 컬러, 오른쪽 절반은 투명 → 위치만 옮겨 채움 */
  background: linear-gradient(90deg, var(--accent) 50%, transparent 50%) 100% 0 / 200% 100% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  transition: background-position 600ms cubic-bezier(.65,0,.35,1), -webkit-text-stroke-color 600ms ease;
}
.arrow {
  flex: none;
  width: clamp(22px, 3.6vw, 40px);
  height: clamp(22px, 3.6vw, 40px);
  margin-left: auto;
  fill: none;
  stroke: var(--accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: translateX(-16px);
  transition: opacity 400ms ease, transform 600ms cubic-bezier(.65,0,.35,1);
}
.item:hover .word,
.item:focus-visible .word,
.item.is-hover .word {
  background-position: 0 0;
  -webkit-text-stroke-color: var(--accent);
}
.item:hover .idx,
.item:focus-visible .idx,
.item.is-hover .idx { color: var(--accent); }
.item:hover .arrow,
.item:focus-visible .arrow,
.item.is-hover .arrow { opacity: 1; transform: none; }`,
    js: `const menu = document.querySelector('.menu');
const items = Array.from(menu.querySelectorAll('.item'));
menu.addEventListener('click', (e) => e.preventDefault());  // 데모 링크 이동 방지

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
let current = 0;
let timer = null;
let idleTimer = null;

function step() {
  items.forEach((el, i) => el.classList.toggle('is-hover', i === current));
  current = (current + 1) % items.length;
}
function startAuto() {
  if (menu.matches(':hover')) {  // 아직 마우스가 올라가 있으면 나중에 다시 확인
    idleTimer = setTimeout(startAuto, 2500);
    return;
  }
  step();
  timer = setInterval(step, 1600);
}
function stopAuto() {
  clearInterval(timer);
  clearTimeout(idleTimer);
  items.forEach((el) => el.classList.remove('is-hover'));
}
menu.addEventListener('pointerenter', stopAuto);
menu.addEventListener('pointerleave', () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(startAuto, 2500);
});
idleTimer = setTimeout(startAuto, 600);`
  },
  {
    no: 29,
    id: 'highlighter',
    cat: 'text',
    name: '형광펜 하이라이트',
    en: 'Marker Highlight Animation',
    level: 1,
    trigger: 'auto',
    timing: '문구당 700ms · 750ms 간격 순차',
    desc: '문단 속 핵심 문구에 형광펜이 왼쪽에서 오른쪽으로 순서대로 그어지는 효과입니다. 읽는 흐름을 따라 강조가 생겨 중요한 메시지가 자연스럽게 눈에 들어옵니다.',
    use: '서비스 소개 문단, 블로그·아티클 강조, 요금제 핵심 혜택, 후기 인용',
    tech: ['CSS background-size transition', 'linear-gradient', 'JavaScript 순차 실행'],
    terms: ['형광펜 하이라이트 (Marker Highlight)', '배경 크기 애니메이션 (Background Size Animation)', '인라인 배경 (Inline Background)', '순차 강조 (Sequential Emphasis)'],
    prompt: '소개 문단의 핵심 문구 3개에 형광펜이 왼쪽에서 오른쪽으로 차례로 그어지는 형광펜 하이라이트(Marker Highlight)를 만들어줘. 문구를 mark로 감싸고, 위 55%는 투명하고 55~92% 구간만 보조 컬러 45% 농도로 칠한 세로 linear-gradient를 배경으로 깐 뒤 background-size를 0% 100%에서 100% 100%로 700ms cubic-bezier(.65,0,.35,1) 트랜지션해줘(position은 왼쪽 고정, no-repeat). 문구가 줄바꿈되어도 box-decoration-break 기본값(slice) 덕분에 첫 줄 끝까지 칠한 다음 둘째 줄로 이어서 칠해지니 그대로 두고, JS로 750ms 간격으로 .is-on을 순서대로 붙여줘. 데모처럼 반복할 때는 2.6초 뒤 250ms 만에 한꺼번에 지우고 다시 칠해줘. 실제 페이지에서는 IntersectionObserver로 문단이 화면에 들어올 때 시작하고, mark의 기본 노란 배경과 글자색은 초기화해줘.',
    html: `<section class="copy-wrap">
  <p class="eyebrow">WHY MOTIONLAB</p>
  <p class="copy">
    모션랩은 <mark>복잡한 애니메이션 코드 없이</mark> 누구나 인터랙션을 만들 수 있게 돕습니다.
    디자이너가 만든 움직임을 <mark>클릭 한 번으로 실제 코드로 내보내고</mark>,
    팀 전체가 <mark>같은 속도와 곡선을 공유</mark>합니다.
  </p>
</section>`,
    css: `.copy-wrap {
  width: min(100%, 720px);
  padding: 0 24px;
}
.eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--accent);
}
.copy {
  margin: 0;
  font-size: clamp(17px, min(3vw, 5.4vh), 30px);
  font-weight: 600;
  line-height: 1.7;
  letter-spacing: -0.02em;
  word-break: keep-all;
}
mark {
  --marker: color-mix(in srgb, var(--accent-2) 45%, transparent);
  color: inherit;
  /* 글자 아래쪽 55~92% 구간만 칠하는 형광펜 모양, 폭 0%에서 시작 */
  background: linear-gradient(transparent 55%, var(--marker) 55%, var(--marker) 92%, transparent 92%) 0 0 / 0% 100% no-repeat;
  transition: background-size 250ms ease-in;
}
mark.is-on {
  background-size: 100% 100%;
  transition: background-size 700ms cubic-bezier(.65,0,.35,1);
}`,
    js: `const marks = Array.from(document.querySelectorAll('.copy mark'));
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 읽는 순서대로 문구를 하나씩 칠함
async function play() {
  while (true) {
    await wait(500);
    for (const mark of marks) {
      mark.classList.add('is-on');
      await wait(750);
    }
    // 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다 (한 번만 칠하기)
    await wait(2600);
    marks.forEach((mark) => mark.classList.remove('is-on'));
    await wait(400);
  }
}
play();`
  },
  {
    no: 30,
    id: 'blur-in-text',
    cat: 'text',
    name: '블러 인 텍스트',
    en: 'Blur-in Text Reveal',
    level: 1,
    trigger: 'auto',
    timing: '단어당 90ms · 900ms · easeOutQuint',
    desc: '단어가 짙은 흐림 속에서 하나씩 초점이 맞듯 선명해지며 나타나고, 자간이 살짝 조여듭니다. 카메라 초점이 잡히는 듯한 부드럽고 차분한 등장입니다.',
    use: '히어로 헤드라인, 제품 소개 인트로, 인용문, 섹션 타이틀',
    tech: ['CSS filter: blur()', 'CSS transition', 'CSS 변수 (--i)'],
    terms: ['블러 인 (Blur-in)', '포커스 풀 효과 (Focus Pull)', '단어 단위 스태거 (Word Stagger)', '자간 애니메이션 (Letter-spacing Animation)'],
    prompt: '히어로 제목과 부제가 단어 하나씩 흐림 속에서 선명해지는 블러 인(Blur-in) 텍스트를 만들어줘. 텍스트를 공백 기준으로 나눠 단어마다 inline-block span을 만들고 --i로 순번을 넘긴 뒤, filter: blur(12px)·opacity 0에서 blur(0)·opacity 1로 900ms cubic-bezier(.22,1,.36,1) 트랜지션을 주고 transition-delay는 calc(var(--i) * 90ms)로 해줘. 제목 전체의 letter-spacing은 0.08em에서 -0.02em으로 1.8초 동안 조여지게 해서 초점이 맞으며 글자가 모이는 느낌을 더하고, 자간이 바뀌어도 줄바꿈 위치가 흔들리지 않게 제목 줄은 미리 나눠둬. 데모처럼 반복할 때는 5.2초마다 400ms 만에 한꺼번에 다시 흐려지게 한 뒤 재생해줘. blur 필터는 렌더링 비용이 크니 긴 본문 대신 제목과 짧은 부제에만 쓰고, prefers-reduced-motion이면 blur 없이 opacity만 바꿔줘.',
    html: `<section class="hero">
  <p class="eyebrow">AI NOTE · 새 버전</p>
  <h1>
    <span class="split line">생각이 흐르는</span>
    <span class="split line">속도로 기록하세요</span>
  </h1>
  <p class="split sub">회의, 강의, 떠오른 아이디어까지 말하면 바로 정리됩니다</p>
</section>`,
    css: `.hero {
  width: min(100%, 820px);
  padding: 0 24px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--accent);
}
h1 {
  margin: 0;
  font-size: clamp(28px, min(7vw, 13vh), 72px);
  font-weight: 800;
  line-height: 1.2;
  /* 초점이 맞으며 자간이 살짝 조여짐 (되돌릴 때는 다 흐려진 뒤 즉시) */
  letter-spacing: .08em;
  transition: letter-spacing 0s 450ms;
}
.hero.is-in h1 {
  letter-spacing: -0.02em;
  transition: letter-spacing 1800ms cubic-bezier(.22,1,.36,1);
}
.line { display: block; }
.sub {
  margin: 18px 0 0;
  font-size: clamp(14px, 2vw, 18px);
  color: var(--muted);
  word-break: keep-all;
}
.word {
  display: inline-block;
  opacity: 0;
  filter: blur(12px);
  transition: opacity 400ms ease, filter 400ms ease;
}
.hero.is-in .word {
  opacity: 1;
  filter: blur(0);
  transition: opacity 900ms cubic-bezier(.22,1,.36,1), filter 900ms cubic-bezier(.22,1,.36,1);
  transition-delay: calc(var(--i) * 90ms);
}`,
    js: `const hero = document.querySelector('.hero');

// 공백 기준으로 단어를 나눠 span으로 감싸고, 문단을 넘어 이어지는 순번(--i)을 매김
let index = 0;
hero.querySelectorAll('.split').forEach((el) => {
  const words = el.textContent.trim().split(' ');
  el.textContent = '';
  words.forEach((word, n) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    span.style.setProperty('--i', index++);
    el.appendChild(span);
    if (n < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
});

function play() {
  hero.classList.remove('is-in');
  void hero.offsetWidth;  // 강제 리플로우로 흐린 시작 상태를 확정
  hero.classList.add('is-in');
}
play();

// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다
setInterval(() => {
  hero.classList.remove('is-in');  // 400ms 만에 한꺼번에 흐려짐
  setTimeout(play, 700);
}, 5200);`
  }
);
