# 모션 항목 작성 규격

`motions/*.js`에 모션을 추가하거나 고칠 때 따르는 규격입니다. 처음 100개는 이 규격으로 작성했고, `node tools/validate.js motions/*.js`가 형식을 검사합니다. 품질 기준이 되는 예시는 `motions/bg-1.js`의 첫 항목(#1 `particle-wave`)입니다.

## 파일 형식

```js
window.MOTIONS = window.MOTIONS || [];
window.MOTIONS.push(
  { ...항목 1... },
  { ...항목 2... }
);
```

새 파일을 만들면 `index.html` 아래쪽의 `<script src="motions/....js">` 목록에도 추가해야 합니다. `build.mjs`는 이 태그들을 찾아 인라인합니다.

## 항목 필드 (모두 필수)

| 필드 | 타입 | 규칙 |
|---|---|---|
| `no` | number | 전역 번호. 카테고리별로 연속 구간을 씀 (아래 표) |
| `id` | string | kebab-case. URL 해시(`#id`)와 미리보기 파일 이름에 쓰임 |
| `cat` | string | `bg` `text` `cursor` `scroll` `loading` `hover` `depth` `enter` `shape` |
| `name` | string | 한국어 이름 |
| `en` | string | 개발자들이 쓰는 영어 이름 |
| `level` | 1·2·3 | 구현 난이도: 1 쉬움(CSS만/몇 줄), 2 보통, 3 어려움(캔버스 수학, 물리, FLIP 등) |
| `trigger` | string | `auto`(스스로 반복) `hover` `click` `mouse`(포인터 추적) `scroll` `load`(한 번 재생, 앱에 다시 재생 버튼 있음) |
| `timing` | string | 짧은 타이밍 라벨, 34자 안팎. 예: `'600ms · cubic-bezier(.22,1,.36,1)'` |
| `desc` | string | 1~2문장. 무엇이고 어떤 느낌인지. 과장 없이 |
| `use` | string | 추천 위치. 예: `'히어로 섹션 배경, 인트로 화면'` |
| `tech` | string[] | 예: `['HTML5 Canvas','requestAnimationFrame']` |
| `terms` | string[] | 공식 용어 2~5개, `'한국어 (English)'` 형식. 검색 키워드로도 쓰임 |
| `prompt` | string | 가장 중요한 필드. 아래 규칙 참고 |
| `html` / `css` / `js` | string | 데모 코드. `js`는 순수 CSS 데모면 `''` |

카테고리 번호 구간: bg 1–16 · text 17–30 · cursor 31–37 · scroll 38–47 · loading 48–57 · hover 58–71 · depth 72–78 · enter 79–90 · shape 91–100. 목록은 `index.html`의 `CATS` 순서로 묶이고 그 안에서 `no` 순으로 정렬됩니다.

## 프롬프트 규칙

AI 코딩 도구에 붙여넣어 사용자 웹앱에 구현하게 하는 한국어 지시문입니다. 앱이 제목 줄, 구현 환경(스택), 공통 요구사항, 선택 시 샘플 코드를 자동으로 덧붙이므로 **프레임워크 이름이나 "코드를 깔끔하게" 같은 일반 문장은 넣지 않습니다.**

- 3~6문장, "~해줘" 체. 무엇을 어디에 만드는지로 시작
- 공식 용어를 한국어(영어) 형태로 한 번 이상
- 실제 수치: ms, easing, 스태거, 개수, 크기, 거리, 각도, 투명도 범위
- 트리거와 상태를 정확히 (호버 진입/이탈, 클릭, 스크롤 시작·끝 지점, 반복/1회)
- 핵심 구현 아이디어 (예: "IntersectionObserver로 진입 감지", "stroke-dashoffset을 path 길이에서 0으로")
- 색은 "브랜드 포인트 컬러", "보조 컬러"로 지칭 (색 자체가 효과일 때만 예외)
- 마지막 한 문장은 이 효과 고유의 예외 상황 (캔버스 resize/DPR, 터치 대체, reduced-motion 대안 등)
- 엠대시와 수식어 남발 금지. 시니어 프론트엔드 개발자가 쓰는 티켓처럼

## 데모 실행 환경

앱은 각 데모를 `sandbox="allow-scripts"` iframe의 `srcdoc`으로 따로 실행합니다 (`index.html`의 `buildDoc`). 기본 문서는 다음과 같습니다.

- `:root` 변수: `--bg` `--surface` `--fg` `--muted` `--accent` `--accent-2` `--line` `--font` (다크/라이트 두 벌, `STAGE_VARS`)
- `body { display:grid; place-items:center; overflow:hidden }`, IBM Plex Sans KR 폰트 링크
- 스테이지 크기: 폭 약 320~1000px, 높이 약 280~560px. 이 범위 전체에서 잘리지 않게 (%, vmin, clamp)

지켜야 할 것:

- **색은 반드시 위 변수로.** 다크·라이트 스테이지 모두에서 읽혀야 함. 캔버스는 `getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()`으로 읽고, 잔상 효과는 검정 대신 `--bg`를 낮은 알파로 칠함
- **바닐라만.** 외부 라이브러리, 폰트, 이미지, URL 금지 (SVG 네임스페이스만 허용)
- `alert`, `console.log`, `localStorage`, `fetch`, html의 `scroll-behavior:smooth` 금지
- 캔버스는 CSS 크기 × `devicePixelRatio`(최대 2)로 맞추고 **`ResizeObserver`로 크기 변화를 감지** (첫 프레임에 0×0일 수 있음)
- 화면에 보이는 문구는 한국어, `word-break: keep-all` 권장
- "클릭해보세요" 같은 안내 문구는 넣지 않음 (앱이 `trigger`에 따라 표시)
- 스크롤 데모는 `body { display:block; place-items:normal; height:auto; overflow-y:auto; overflow-x:hidden }`. `place-items`를 normal로 되돌리지 않으면 최신 Chrome에서 블록 자식이 가운데로 줄어듦
- 샌드박스 iframe 안에서는 IntersectionObserver의 `rootMargin`이 무시됨. 화면 중앙선 기준 판정이 필요하면 rAF로 스로틀한 스크롤 핸들러 사용
- `prefers-reduced-motion` 분기는 넣어도 됨. 앱이 미리보기에서만 그 미디어 쿼리를 무력화하고(`previewSafe`), 복사되는 코드는 원본 그대로 유지

## 손대지 않아도 살아 있는 미리보기 (자동 시연)

사용자가 아무것도 하지 않아도, 터치 기기에서도 효과가 보여야 합니다. 자동 시연 코드에는 `// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다` 주석을 답니다.

- `hover`: CSS에서 `:hover`와 `.is-hover`를 함께 선택하고, JS로 1.4~2초마다 `.is-hover`를 토글. 실제 `pointerenter`가 오면 멈추고 2.5초 뒤 재개
- `mouse`: 리사주 경로(`x = cx + sin(t*0.9)*rx`, `y = cy + sin(t*1.3)*ry`)로 가상 포인터를 움직이다 실제 `pointermove`가 오면 양보, 2.5초 유휴 후 재개. Pointer Events 사용
- `click`: 600ms 뒤 첫 실행, 이후 2.5~3.5초마다. 사용자 클릭은 항상 동작하고, 클릭 후 일정 시간(예: 6초) 입력이 없으면 자동 시연 재개
- `scroll`: 프레임당 1~1.5px로 끝까지 자동 스크롤 → 1초 정지 → 맨 위로. `wheel`, `touchstart`, `pointerdown`, `keydown`이 오면 영구 정지. 콘텐츠는 뷰포트 3배 이상
- `load`: 로드 시 1회. 반복하는 편이 보기 좋으면 `auto`로 두고 주기적으로 재생

## 코드 문자열 규칙 (필수)

- `html`, `css`, `js`는 템플릿 리터럴입니다. **안에서 백틱과 `${`를 쓰지 말고** 문자열 연결을 사용
- `js`에 `</script`가 들어가면 안 됨
- 2칸 들여쓰기, 핵심 아이디어를 설명하는 짧은 한국어 주석. 사용자에게 학습용으로 보여지는 코드
- 분량 기준: CSS 데모 15~40줄, JS/캔버스 데모 최대 90줄 안팎

## 마무리 검사

1. `node tools/validate.js motions/*.js` → `OK`
2. 앱을 띄우고 (`python3 -m http.server 8790`) `node tools/sweep.js` → `motion errors: []`
3. 해당 항목을 다크·라이트 스테이지, 데스크톱·모바일 폭에서 눈으로 확인
