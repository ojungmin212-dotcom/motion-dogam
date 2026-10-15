# PillNav — 알약 버튼 내비게이션

좁은 화면에서는 화면 아래에 떠 있는 알약 바, 넓은 화면에서는 좌상단 가로 바로 자리만 바뀌는
내비게이션입니다. 바에는 주요 항목 몇 개만 두고 나머지는 `전체` 버튼이 여는 패널에서 설명과
함께 보여 줍니다.

구조(하단 알약 탭 + 전체 목록 패널)와 분위기(밝은 종이색, 현재 항목만 진하게)만 참고해
새로 그린 것입니다. 레퍼런스의 로고·이미지·문구는 쓰지 않았습니다.

> 이 폴더는 **모션 도감 앱(`index.html`)과 무관한 독립 컴포넌트**입니다. 도감 앱은 빌드 도구
> 없는 바닐라 정적 사이트라 React를 쓰지 않으며, `build.mjs`도 이 폴더를 건드리지 않습니다.
> 다른 React 프로젝트에 복사해서 쓰세요.

## 파일

| 파일 | 설명 |
|---|---|
| `PillNav.tsx` | 컴포넌트 본체 |
| `pill-nav.css` | 디자인 토큰(CSS 변수). 앱 진입점에서 한 번 불러오세요 |
| `PillNavDemo.tsx` | 사용 예 |

전제: React 18 이상, Tailwind CSS 3.4 이상(또는 v4). 임의 값 클래스(`text-[var(--nav-ink)]` 등)를
쓰므로 Tailwind의 콘텐츠 경로에 이 파일들이 포함돼야 합니다.

## 쓰는 법

```tsx
import PillNav, { type NavItem } from './PillNav';
import './pill-nav.css';

const items: NavItem[] = [
  { id: 'overview', label: '개요', href: '/overview', description: '한 해를 숫자 몇 개로' },
  { id: 'works', label: '작업', href: '/works', description: '만든 것들을 시간 순으로' },
  { id: 'notes', label: '노트', href: '/notes', description: '작업하며 적어 둔 메모' },
  { id: 'about', label: '소개', href: '/about', description: '쓰는 도구와 연락처' },
];

<PillNav items={items} currentId="works" />
```

라우터를 쓴다면 `onNavigate`에서 `event.preventDefault()` 후 직접 이동시키세요.

### Props

| 이름 | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `items` | `NavItem[]` | — | `{ id, label, href, description? }` |
| `currentId` | `string` | — | 이 id의 항목에 `aria-current="page"`가 붙습니다 |
| `barCount` | `number` | `3` | 좁은 화면(640px 미만)의 바에 바로 보이는 항목 수. 나머지는 패널에만 |
| `menuLabel` | `string` | `'전체'` | 토글 버튼 글자 |
| `panelTitle` | `string` | `'모든 섹션'` | 패널 제목이자 대화상자의 접근성 이름 |
| `onNavigate` | `(item, event) => void` | — | 링크 클릭 가로채기 |
| `className` | `string` | `''` | 바깥 `nav`에 덧붙일 클래스 (위치 조정 등) |

## 디자인 토큰

`pill-nav.css`의 `:root` 값만 바꾸면 색·속도·그림자가 모두 따라옵니다. 일부 화면에만 다른 색을
쓰려면 `:root` 대신 감싸는 요소의 클래스에 선언하세요.

| 변수 | 값 | 쓰임 | `--nav-paper` 대비 |
|---|---|---|---|
| `--nav-paper` | `#fefefe` | 바·패널 배경 | — |
| `--nav-ink` | `#0d1217` | 본문, 현재 항목 알약 | 18.7:1 |
| `--nav-graphite` | `#434443` | 패널 제목, 토글 글자 | 9.7:1 |
| `--nav-muted` | `#5f5e64` | 설명 글, 비활성 항목 | 6.4:1 |
| `--nav-index` | `#5a6b75` | 패널의 번호 | 5.5:1 |
| `--nav-steel` | `#9eb1bb` | 장식 전용(글자 금지) | 2.2:1 |
| `--nav-line` | `#d1d5dc` | 헤어라인 테두리 | — |
| `--nav-wash` | `#9eb1bb1f` | 호버·현재 행 배경 | — |
| `--nav-scrim` | `#0d121747` | 패널 뒤 가림막 | — |
| `--nav-dur` / `--nav-ease` | `220ms` / `cubic-bezier(.22,1,.36,1)` | 전환 길이와 가속 | — |

글자로 쓰이는 색은 모두 WCAG AA(본문 4.5:1)를 넘습니다. `--nav-steel`은 2.2:1이라 번호·설명 같은
글자에는 쓰지 않고, 배경을 깔 때(`--nav-wash`)와 장식에만 씁니다. `--nav-wash` 위에서도
본문 17.2:1, 설명 5.9:1, 번호 5.1:1로 기준을 넘습니다.

## 접근성·키보드

- 토글 버튼: `aria-expanded`, `aria-controls`(패널 id). 현재 페이지 항목: `aria-current="page"`
  (바와 패널 양쪽)
- 패널: `role="dialog" aria-modal="true"`, 제목과 `aria-labelledby`로 연결
- 열면 현재 항목(없으면 첫 항목)으로 포커스가 이동하고, Tab·Shift+Tab은 패널 안에서만 돕니다
- `Esc` 또는 가림막 클릭으로 닫히고, 닫히면 포커스가 열었던 버튼으로 돌아갑니다
- 패널이 떠 있는 동안 뒤쪽 스크롤을 멈춥니다
- 포커스 표시는 2px 잉크색 아웃라인(18.7:1)

### 동작 줄이기

`prefers-reduced-motion: reduce`이면 `--nav-dur`이 1ms가 되고 전환 클래스도 꺼져(`motion-reduce:transition-none`)
패널이 즉시 나타나고 사라집니다. 위치를 잡는 `transform`(가운데 정렬 등)은 그대로 둬야 하므로
`transform-none`은 쓰지 않았습니다.

## 확인한 것

- `tsc --strict --noUnusedLocals --noUnusedParameters` 통과 (React 18 타입)
- 390px / 1280px에서 열고 닫기, 포커스 가두기, Esc 닫기 후 포커스 복귀, `aria-*` 값
- 동작 줄이기 환경에서 `transition-property: none`, 패널 제거까지 29ms (일반은 235ms)

## 알아 둘 점

- 패널은 닫히면 DOM에서 빠집니다. 그동안 `aria-controls`가 가리키는 요소가 없는데, 이는 흔한
  구현 방식이고 보조기기도 허용합니다. 항상 남겨 두려면 `mounted` 분기를 없애고 닫힘 상태에
  `inert`를 주세요.
- `aria-modal="true"`라 패널이 열리면 보조기기에서 바깥(알약 바)이 가려집니다. 바의 토글 버튼이
  하는 일은 `Esc`와 패널 안 닫기 버튼으로 모두 할 수 있습니다.
- 스크롤을 멈출 때 `overflow: hidden`만 걸어서, 스크롤바를 항상 띄우는 환경에서는 가로 폭이
  살짝 움직일 수 있습니다. 필요하면 `scrollbar-gutter: stable`을 쓰세요.
