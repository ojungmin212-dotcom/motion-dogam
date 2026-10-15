/** PillNav 사용 예. 실제 앱에서는 currentId를 라우터의 현재 경로에서 가져오세요. */
import { useState } from 'react';
import PillNav, { type NavItem } from './PillNav';
import './pill-nav.css';

const ITEMS: NavItem[] = [
  { id: 'overview', label: '개요', href: '#overview', description: '한 해를 숫자 몇 개로' },
  { id: 'works', label: '작업', href: '#works', description: '만든 것들을 시간 순으로' },
  { id: 'notes', label: '노트', href: '#notes', description: '작업하며 적어 둔 메모' },
  { id: 'about', label: '소개', href: '#about', description: '쓰는 도구와 연락처' },
];

export default function PillNavDemo() {
  const [currentId, setCurrentId] = useState('works');

  return (
    <main className="min-h-dvh bg-[var(--nav-paper)] px-6 pb-40 pt-24 md:pl-8 md:pt-32">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--nav-index)]">
          데모 화면
        </p>
        <h1 className="mt-3 text-3xl leading-tight text-[var(--nav-ink)] [word-break:keep-all] sm:text-4xl">
          아래 알약 바에서 전체를 누르면 메뉴가 열립니다
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--nav-muted)] [word-break:keep-all]">
          Esc로 닫고, Tab은 패널 안에서만 돌며, 닫으면 포커스가 열었던 버튼으로 돌아갑니다.
          넓은 화면에서는 같은 바가 좌상단으로 올라갑니다.
        </p>
      </div>

      <PillNav
        items={ITEMS}
        currentId={currentId}
        onNavigate={(item, event) => {
          event.preventDefault(); // 데모라 실제 이동 대신 상태만 바꿉니다
          setCurrentId(item.id);
        }}
      />
    </main>
  );
}
