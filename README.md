# 모션 도감 100

웹앱에 넣을 모션 애니메이션 100가지를 미리 보고, AI에게 그대로 붙여넣을 수 있는 프롬프트와 샘플 코드를 복사하는 도구입니다.

**바로 쓰기:** https://ojungmin212-dotcom.github.io/motion-dogam/

## 실행

위 주소로 접속하거나, `index.html`을 브라우저로 열면 됩니다. 로컬 서버로 열고 싶다면:

```bash
python3 -m http.server 8790
```

그다음 http://localhost:8790 에 접속하세요.

## 쓰는 법

1. 왼쪽 목록에서 모션을 고릅니다. 검색창(`/` 키)에는 이름, 공식 용어, 기술(예: `Canvas`, `IntersectionObserver`)을 입력할 수 있습니다.
2. 미리보기에서 움직임을 확인합니다. 호버·클릭·스크롤 모션은 가만히 두면 자동 시연되고, 직접 조작해도 됩니다.
3. **AI 프롬프트** 탭에서 구현 환경(HTML·CSS·JS, React, Tailwind, Framer Motion, Next.js, Vue, GSAP)을 고르고 복사합니다.
4. 여러 모션을 쓰려면 **세트에 담기**로 모은 뒤, 오른쪽 위 **내 모션 세트**에서 한 번에 적용하는 프롬프트를 복사합니다.
5. **샘플 코드** 탭의 **전체 HTML 복사**는 미리보기와 똑같이 동작하는 단일 HTML 파일입니다.

키보드: `↑` `↓`(또는 `j` `k`)로 이전·다음 모션, `/`로 검색, `Esc`로 패널 닫기.

## 구성

| 경로 | 내용 |
|---|---|
| `index.html` | 앱 화면과 로직 (목록, 미리보기, 프롬프트 생성, 세트) |
| `motions/*.js` | 모션 데이터 100개. 카테고리별로 나뉘어 있고 각 항목에 설명, 프롬프트, HTML/CSS/JS가 들어 있습니다 |
| `build.mjs` | 모든 파일을 하나의 HTML로 묶습니다 (`node build.mjs` → `dist/motion-dogam.html`) |

## 모션 추가하기

`motions/` 안의 아무 파일에 항목을 하나 더 넣으면 목록에 자동으로 나타납니다.

```js
window.MOTIONS.push({
  no: 101,                       // 목록 번호
  id: 'my-motion',               // 주소(#my-motion)와 파일 이름에 쓰임
  cat: 'hover',                  // bg text cursor scroll loading hover depth enter shape
  name: '내 모션', en: 'My Motion',
  level: 1,                      // 1 쉬움 · 2 보통 · 3 어려움
  trigger: 'hover',              // auto hover mouse click scroll load
  timing: '300ms · ease-out',
  desc: '한두 문장 설명',
  use: '추천 위치',
  tech: ['CSS transition'],
  terms: ['공식 용어 (English Term)', '...'],
  prompt: 'AI에게 보낼 구체적인 구현 지시',
  html: `...`, css: `...`, js: `...`
});
```

데모 CSS에서는 `--bg` `--surface` `--fg` `--muted` `--accent` `--accent-2` `--line` 변수를 쓰면 다크·라이트 미리보기에 모두 맞춰집니다.
