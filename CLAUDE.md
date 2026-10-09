# 모션 도감 100

웹 모션 애니메이션 100가지를 미리 보고 AI 구현 프롬프트·샘플 코드를 복사하는 정적 웹앱. 배포: https://ojungmin212-dotcom.github.io/motion-dogam/ (GitHub Pages, `main` 푸시 시 자동 갱신). 자세한 맥락과 진행 상황은 `HANDOFF.md`.

## 구조

- `index.html`: 앱 전체 (CSS + 로직 한 파일). 빌드 도구 없음, file://에서도 동작해야 함
- `motions/*.js`: 모션 데이터. 각 파일이 `window.MOTIONS.push({...})`. 새 파일은 `index.html`의 `<script src="motions/...">` 목록에도 추가
- `tools/MOTION-SPEC.md`: 모션 항목 작성 규격. 모션을 추가·수정하기 전에 반드시 읽을 것
- `build.mjs`: 단일 HTML 빌드 (`dist/`, git 제외)

## 명령

```bash
python3 -m http.server 8790 --bind 127.0.0.1   # 로컬 실행 (8765는 사용자의 다른 앱이 씀)
node tools/validate.js motions/*.js            # 데이터 수정 후 항상 실행, OK여야 함
node tools/sweep.js http://127.0.0.1:8790/      # 런타임 오류 전수 검사 (playwright 필요)
node build.mjs                                   # dist/motion-dogam.html
```

## 규칙

- 사용자에게 보이는 문구, 프롬프트, 코드 주석은 한국어. 사용자와의 대화도 한국어
- 외부 의존성 추가 금지. 앱이 쓰는 외부 리소스는 Google Fonts와 cdnjs의 highlight.js 11.9.0뿐이고, 없어도 동작해야 함
- 모션 데모 코드(`html`/`css`/`js` 템플릿 리터럴) 안에서는 백틱, `${`, `</script` 사용 금지. 문자열 연결을 쓸 것
- 데모 색은 스테이지 CSS 변수(`--bg` `--surface` `--fg` `--muted` `--accent` `--accent-2` `--line`)로만. 다크·라이트 스테이지 둘 다 확인
- 호버·마우스·클릭·스크롤 데모에는 자동 시연 코드를 넣고 `// 데모용 자동 시연 — 실제 적용 시 삭제해도 됩니다` 주석을 단다
- 모션의 `prompt`에는 프레임워크 이름을 쓰지 않는다. 구현 환경 조건은 앱(`STACKS`, `stackNotes`, `commonReqs`)이 붙인다
- 미리보기용 문서는 `buildDoc(m, theme, false)`, 복사용은 `buildDoc(m, theme, true)`. 미리보기 전용 처리(`previewSafe`, 오류 훅)는 복사되는 코드에 섞이지 않게 할 것
- `localStorage`는 편의 기능에만, 키 접두사 `motion-dogam:`, 항상 try/catch
- 모션 번호(`no`)는 카테고리 구간을 유지: bg 1–16, text 17–30, cursor 31–37, scroll 38–47, loading 48–57, hover 58–71, depth 72–78, enter 79–90, shape 91–100. 새 모션은 101부터

## Git

- 커밋 메시지는 한국어 요약 한 줄 + 필요하면 본문 목록
- 이 Mac의 `/usr/bin/git`은 Xcode 라이선스 미동의로 막힐 수 있음. 시스템 설정을 바꾸지 말고 `DEVELOPER_DIR`을 Command Line Tools 경로로 지정해 실행하거나, 사용자에게 `sudo xcodebuild -license accept`를 안내
- 공개 저장소이므로 커밋 작성자 이메일은 GitHub noreply 주소 사용
