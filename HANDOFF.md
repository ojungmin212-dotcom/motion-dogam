# HANDOFF · 모션 도감 100

다른 계정의 Claude Code 세션이 이 프로젝트를 이어받기 위한 문서입니다. 작성 시점: 2026-10-09 (2026-10-10 갱신).

## 1. 프로젝트 목적

웹앱을 만들 때 넣을 모션 애니메이션을 고르는 도구입니다. 모션 100가지를 목록으로 보여주고, 항목을 고르면 다음을 제공합니다.

- 실제로 움직이는 미리보기 (손대지 않아도 자동 시연)
- AI 코딩 도구에 그대로 붙여넣는 구현 프롬프트 (구현 환경별로 조건 자동 추가)
- 미리보기와 똑같이 동작하는 HTML/CSS/JS 샘플 코드
- 여러 모션을 묶어 한 번에 적용하는 "내 모션 세트" 프롬프트

사용자는 한국어로 AI에게 웹앱을 만들게 하는 사람이고, 화면 문구·프롬프트·코드 주석은 모두 한국어입니다.

- 배포 주소: https://ojungmin212-dotcom.github.io/motion-dogam/
- 저장소: https://github.com/ojungmin212-dotcom/motion-dogam (public, `main`)

## 2. 아키텍처

빌드 도구 없는 정적 사이트입니다. `index.html`을 브라우저로 열기만 해도 동작합니다 (file:// 포함).

```
index.html            앱 전체 (CSS + 로직이 한 파일, IIFE 하나)
motions/*.js          모션 데이터 100개, 각 파일이 window.MOTIONS.push(...)
  bg-1.js (1–8) · bg-2.js (9–16) · text.js (17–30) · cursor-depth.js (31–37, 72–78)
  scroll.js (38–47) · loading-shape.js (48–57, 91–100) · hover.js (58–71) · enter.js (79–90)
build.mjs             motions/*.js를 인라인해 dist/motion-dogam.html 단일 파일 생성
                      (인자로 경로를 주면 <html>/<head>/<body> 뼈대를 뺀 Artifact용 파일도 생성)
tools/validate.js     데이터 형식 검사 (의존성 없음)
tools/sweep.js        헤드리스 Chrome으로 100개를 열어 런타임 오류 수집 (playwright 필요)
tools/MOTION-SPEC.md  모션 항목 작성 규격 (새 모션 추가 시 반드시 참고)
.nojekyll             GitHub Pages가 Jekyll 처리 없이 그대로 서빙하도록
```

`index.html` 내부 흐름:

1. `window.MOTIONS`를 `no` 순으로 정렬해 `BY_ID` 맵 생성
2. 목록: `CATS` 순서로 그룹, 검색어는 이름·영문명·id·설명·용어·기술 전체에서 AND 매칭
3. 미리보기: `buildDoc(m, theme, forExport)`가 완전한 HTML 문서를 만들어 `sandbox="allow-scripts"` iframe의 `srcdoc`에 넣음. 다시 재생 = iframe 재생성
4. 프롬프트: `buildPrompt(m)` = 제목 + `m.prompt` + 추천 위치 + `STACKS` 구현 환경 + `commonReqs`/`stackNotes` 요구사항 + 용어 + (선택) 샘플 코드 블록. 세트는 `buildSetPrompt()`
5. 상태 저장: `localStorage` 키 `motion-dogam:stack|opts|stageTheme|set` (모두 try/catch)
6. 딥링크: `#<id>` 해시. `history.replaceState`로 갱신
7. 데모 오류: iframe 안의 error 리스너가 `postMessage({type:'motion-error'})` → 부모의 `window.__motionErrors`에 쌓임 (QA용)

## 3. 상태

### 완료

- 앱 셸: 검색(`/`), 카테고리 칩, 키보드 이동(↑↓/j k), 다크·라이트 미리보기 전환, 다시 재생, 크게 보기(전체 화면), 모바일 서랍 목록
- 모션 100개 작성 (8개 하위 에이전트 병렬 작성 후 검수), validate OK, sweep 오류 0
- 7개 구현 환경(HTML·CSS·JS / React / React+Tailwind / Framer Motion / Next.js / Vue 3 / GSAP) 프롬프트 분기
- 모션 세트 서랍과 묶음 프롬프트, 비우기 인라인 확인
- GitHub 저장소 생성, GitHub Pages 배포, 라이브 사이트에서 100개 오류 없음 확인
- 목록에서 선택 항목이 고정 그룹 헤더에 가려지던 문제 수정 (`scroll-margin-block`)
- 인계 문서와 `tools/` 커밋·푸시 (`9fcc35f`)
- 캔버스 데모 크기 감지를 `ResizeObserver`로 통일: #1–8, #32, #35, #37 (bg-2.js와 동일한 방식)

### 진행 중

- 없음.

### 다음 단계 (우선순위 순)

1. README의 "구성" 표에 `tools/` 안내 추가
2. 시각 품질 다듬기 (5절 목록): 특히 #33 라이트 스테이지, #75 원거리 격자 계단 현상, #6 라이트 테마 눈송이
3. 프롬프트에 reduced-motion 대안이 없는 #92 conic-border, #99 shape-morph 보완
4. 아이디어(미착수): 세트를 URL로 공유 (해시는 영문·숫자·`.`·`_`·`~`·`-`만 허용되는 환경 고려), 목록 썸네일 미리보기, 모션 추가

## 4. 설계 결정과 이유

| 결정 | 이유 |
|---|---|
| 빌드 없는 바닐라 정적 앱, 데이터는 `<script>`로 로드 | file://에서도 동작 (fetch/CORS 불필요), GitHub Pages에 그대로 배포 |
| 데모마다 샌드박스 iframe `srcdoc` | CSS·전역 변수 격리, 화면에 보여주는 코드 = 실제 실행 코드, iframe 교체로 정리가 자동 |
| 데모 색은 CSS 변수(`--bg` 등)로만 | 다크·라이트 미리보기 한 벌로 대응. 색 자체가 효과인 경우(매트릭스 초록, 네온, 신스웨이브)만 하드코딩 |
| 자동 시연(autopilot) 규칙 | 호버·클릭·스크롤 효과도 썸네일·모바일에서 바로 보이게. 주석으로 표시해 복사 후 지울 수 있게 |
| 모션 `prompt`에는 프레임워크를 쓰지 않음 | 앱이 구현 환경별 조건을 붙이므로 중복·충돌 방지 |
| 미리보기에서만 `prefers-reduced-motion` 무력화 (`previewSafe`) | 미리보기 브라우저와 일부 사용자가 동작 줄이기를 켜 둠. 모션 카탈로그에서 미리보기가 멈추면 쓸모없음. 복사되는 코드는 원본 유지 |
| 샘플 코드 첨부 옵션 기본 켬 | AI가 타이밍·움직임을 그대로 재현하게 하려고 |
| `CATS` 순서 = 번호 구간 순서 | 목록 번호가 그룹 안에서 연속되게 |
| highlight.js 11.9.0 (cdnjs) + 실패 시 이스케이프만 | 오프라인/차단 환경에서도 코드가 보이게 |
| 폰트: IBM Plex Sans KR(본문), JetBrains Mono(라벨·코드), Bricolage Grotesque(영문 디스플레이) | 한글 가독성 + 키프레임 편집기 같은 도구 느낌. 마커는 키프레임 다이아몬드(◆) |
| public 저장소 + GitHub Pages | 무료 계정에서 Pages를 쓰려면 public 필요 |
| 커밋 이메일은 GitHub noreply | 공개 저장소에 실제 이메일 노출 방지 |
| `dist/`, `.claude/`, `tools/shots/` git 제외 | 빌드 산출물·로컬 설정·QA 결과물 |
| 클릭 데모 자동 시연은 클릭 후 6초 유휴면 재개 (#7, #8, #16) | 한 번 클릭하면 미리보기가 영영 조용해지는 문제 |

## 5. 알려진 문제와 한계

시각/동작 (치명적이지 않음):

- #6 snowfall: 라이트 스테이지에서 흰 눈이 안 보여 `--muted` 회색으로 대체
- #9 flow-field: `--bg` 저알파 잔상 방식이라 8비트 반올림으로 옅은 얼룩이 남음 (기법 한계)
- #18 text-scramble: 무작위 한글 전 범위라 낯선 글자(뾻 등)가 스침
- #33 cursor-spotlight: 오버레이가 의도적으로 거의 검정이라 라이트 스테이지에서도 어둡게 보임
- #40 parallax-layers: 패럴랙스가 첫 화면 구간에서만 보임
- #44 scroll-zoom, #91 mesh-gradient, #93 glass-blobs, #98 hue-cycle: 일부 색 하드코딩
- #75 synthwave-grid: CSS 3D 축소로 먼 격자에 점선 같은 계단 현상, 라이트에서 더 보임
- #84 toast-stack, #67 check-draw: 자동 시연 간격이 규격(2.5~3.5초)보다 빠름 (의도적)
- #86 flip-expand: 확장 중 커버 이미지가 살짝 늘어남 (FLIP 스케일 기법 특성)
- #87 circle-reveal: 반전 테마의 작은 포인트 색 글씨 대비가 낮음
- #92 conic-border: `@property` 미지원 브라우저용 대체 경로는 테스트 못 함
- 일부 JS 데모가 90줄 안팎 기준을 조금 넘음 (#2, #4, #7, #8, #27 등)

막혔던 지점과 실패한 접근:

- **Xcode 라이선스:** 이 Mac의 `/usr/bin/git`은 Xcode 라이선스 미동의로 막힘. sudo 없이 `DEVELOPER_DIR` 환경변수를 Command Line Tools 경로로 지정해 우회함. 근본 해결은 사용자가 `sudo xcodebuild -license accept` 실행
- **포트 8765:** 사용자의 다른 앱(ai 정보 수집기)이 사용 중. 이 앱은 8790 사용
- **Browser pane:** 창이 숨겨지면 스크린샷이 실패하고 rAF가 초당 약 2프레임으로 느려짐. 시각 검수는 헤드리스 Chrome(playwright)으로 함
- **QA 격자 페이지:** iframe을 한 화면에 많이 띄우면 아래쪽 칸은 애니메이션이 멈춰 빈칸처럼 보임. 한 번에 2~8개 정도로 나눠서 확인
- **`body{display:block}`만으로는 부족:** 기본 `place-items:center`가 최신 Chrome에서 블록 레이아웃에도 적용돼 자식이 가운데로 줄어듦 → 스크롤 데모는 `place-items:normal`로 되돌림
- **IntersectionObserver `rootMargin`:** 교차 출처 샌드박스 iframe에서 무시됨 → #47은 rAF 스로틀 스크롤 핸들러로 구현
- **캔버스 0×0:** iframe이 늦게 배치되면 첫 실행 때 0×0 → 모든 캔버스 데모를 `new ResizeObserver(resize).observe(canvas)`로 통일해 해결. 참고로 iframe 안의 `window`는 iframe 요소 크기가 바뀔 때도 resize 이벤트를 받으므로, 바뀌기 전 코드도 크기 변화 자체는 따라가고 있었음 (문제는 첫 프레임뿐)
- **`var()`/`calc()`를 keyframes 안에서 쓴 dash 애니메이션(#56):** 움직이지 않아 `animation-delay` 음수값으로 해결
- **`animation` 단축 속성 덮어쓰기(#100):** 더 구체적인 선택자의 단축 속성이 duration을 0s로 초기화 → 레이어마다 전체 단축 속성 작성
- **시스템 임시 폴더 소실:** 첫 세션의 스크래치패드(규격서, 검사기, QA 스크립트)가 정리되어 사라짐 → 이번에 `tools/`로 저장소에 복원

## 6. 실행과 테스트

```bash
# 로컬 실행 (또는 index.html을 바로 열기)
python3 -m http.server 8790 --bind 127.0.0.1
# → http://127.0.0.1:8790/

# 데이터 형식 검사 (의존성 없음, 반드시 OK)
node tools/validate.js motions/*.js

# 런타임 오류 전수 검사 (서버를 띄운 상태에서)
npm i --no-save playwright && npx playwright install chromium
node tools/sweep.js http://127.0.0.1:8790/
# playwright를 새로 설치하는 대신 npx 캐시에 있는 것을 쓸 수도 있음
# NODE_PATH=~/.npm/_npx/<해시>/node_modules node tools/sweep.js http://127.0.0.1:8790/
# 특정 항목 스크린샷: node tools/sweep.js http://127.0.0.1:8790/ particle-wave,glitch-text → tools/shots/

# 단일 파일 빌드
node build.mjs                 # → dist/motion-dogam.html
```

배포: `main`에 푸시하면 GitHub Pages가 1분 안팎으로 갱신합니다. 상태 확인은 `gh api repos/ojungmin212-dotcom/motion-dogam/pages/builds/latest --jq .status`.

환경변수 (앱 자체는 필요 없음, 값은 적지 않음):

| 이름 | 용도 |
|---|---|
| `DEVELOPER_DIR` | 이 Mac에서 Xcode 라이선스 문제로 git이 막힐 때 Command Line Tools를 쓰게 함 (선택) |
| `NODE_PATH` | playwright를 전역/캐시 위치에 설치한 경우 `tools/sweep.js`가 찾게 함 (선택) |

권한: 푸시하려면 GitHub 계정 `ojungmin212-dotcom`의 저장소 쓰기 권한이 필요합니다. 다른 계정이면 협업자로 초대받거나 포크해서 PR을 보내야 합니다.

Claude 미리보기용 `.claude/launch.json`(git 제외)에 `motion-dogam` 설정이 있었습니다. 새 환경에서는 다시 만들면 됩니다: 실행 명령 `python3 -m http.server 8790 --bind 127.0.0.1`, 포트 8790.

## 7. 미커밋 변경

없습니다. 마지막 작업까지 `main`에 푸시돼 있습니다.

## 8. 사용한 도구 환경

- **MCP 서버:** Claude Code 설정(`~/.claude.json`, `.mcp.json`)에 등록된 서버는 없음. 데스크톱 앱 내장 도구를 사용함
  - 사용함: Claude Browser(내장 브라우저 패널, `preview_start`로 로컬 서버 미리보기와 스크린샷)
  - 연결돼 있었지만 이 프로젝트에 안 씀: claude-in-chrome, iOS Simulator, terminal, visualize, scheduled-tasks, mcp-registry, Notion, Claude Docs
- **Artifact:** 첫 버전을 Claude Artifact로도 게시함 (원 계정 전용 비공개, 목록 가림 수정 이전 버전). 다른 계정에서는 수정 불가. 정식 주소는 GitHub Pages
- **훅:** 사용자 전역 `~/.claude/settings.local.json`에 impeccable 디자인 검사 훅 (PostToolUse `Edit|Write`, Stop → `~/.claude/skills/impeccable/scripts/hook.mjs`). 프로젝트 전용 훅은 없음
- **커스텀 커맨드:** 없음 (`~/.claude/commands`, `.claude/commands` 모두 없음)
- **스킬:** 사용자 스킬 `impeccable`(UI 디자인 검수), `ego-browser`(브라우저 자동화). 이 프로젝트에서 직접 호출하지는 않음. Artifact 게시 때 artifact-design 지침을 사용
- **하위 에이전트:** 모션 100개는 general-purpose 에이전트 8개가 `tools/MOTION-SPEC.md`의 원본 규격으로 병렬 작성했고, 메인 세션이 검수·통합함
