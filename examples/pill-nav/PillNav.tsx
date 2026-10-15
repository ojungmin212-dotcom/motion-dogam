/**
 * PillNav — 알약 버튼 내비게이션 + 전체 메뉴 패널
 *
 * 좁은 화면에서는 화면 아래에 떠 있는 알약 바, 넓은 화면에서는 좌상단 가로 바로
 * 자리만 바뀝니다. 바에는 주요 항목 몇 개만 두고, 나머지는 '전체' 버튼이 여는
 * 패널에서 설명과 함께 보여 줍니다.
 *
 * 색은 pill-nav.css의 CSS 변수로만 지정합니다. 함께 불러 주세요.
 */
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';

export type NavItem = {
  /** currentId와 비교할 고유 값 */
  id: string;
  label: string;
  href: string;
  /** 전체 메뉴에서만 보이는 한 줄 설명 */
  description?: string;
};

export type PillNavProps = {
  items: NavItem[];
  /** 현재 페이지 항목의 id. 해당 항목에 aria-current="page"가 붙습니다 */
  currentId: string;
  /** 좁은 화면의 바에 바로 보이는 항목 수 (기본 3, 나머지는 전체 메뉴에만) */
  barCount?: number;
  /** 바의 토글 버튼 글자 */
  menuLabel?: string;
  /** 패널 제목 (스크린 리더가 읽는 이름이기도 합니다) */
  panelTitle?: string;
  /** 라우터로 넘기고 싶을 때. event.preventDefault()는 직접 호출하세요 */
  onNavigate?: (item: NavItem, event: ReactMouseEvent<HTMLAnchorElement>) => void;
  className?: string;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** 동작 줄이기 설정을 구독한다 */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return reduced;
}

/**
 * 열림·닫힘 상태를 두 단계로 나눈다.
 * mounted: DOM에 있는지 (닫힘 애니메이션이 끝나야 false)
 * entered: 열린 모습의 클래스를 입힐지 (마운트 다음 프레임에 true)
 */
function usePresence(open: boolean, duration: number) {
  const [mounted, setMounted] = useState(open);
  const [entered, setEntered] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // 두 프레임 기다려야 브라우저가 '닫힘 → 열림' 변화를 전환으로 인식한다
      let second = 0;
      const first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => setEntered(true));
      });
      return () => {
        cancelAnimationFrame(first);
        cancelAnimationFrame(second);
      };
    }
    setEntered(false);
    const timer = window.setTimeout(() => setMounted(false), duration);
    return () => window.clearTimeout(timer);
  }, [open, duration]);

  return { mounted, entered };
}

const FOCUS_RING =
  'focus-visible:[outline:2px_solid_var(--nav-ink)] focus-visible:outline-offset-2';

const PILL =
  'inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 ' +
  'text-[13px] font-medium leading-none tracking-tight sm:text-sm ' +
  'transition-[background-color,color] duration-[var(--nav-dur)] ease-[var(--nav-ease)] ' +
  'motion-reduce:transition-none ' + FOCUS_RING;

export function PillNav({
  items,
  currentId,
  barCount = 3,
  menuLabel = '전체',
  panelTitle = '모든 섹션',
  onNavigate,
  className = '',
}: PillNavProps) {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const { mounted, entered } = usePresence(open, reduced ? 0 : 220);

  const panelId = useId();
  const titleId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openedOnce = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // 열려 있는 동안: 첫 포커스 이동, Esc로 닫기, Tab 순환 가두기
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !mounted || !panel) return;

    const current = panel.querySelector<HTMLElement>('[data-current="true"]');
    (current ?? panel.querySelector<HTMLElement>(FOCUSABLE))?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active !== null && panel.contains(active);

      if (event.shiftKey && (!inside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!inside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, mounted, close]);

  // 닫히면 열었던 버튼으로 포커스를 돌려준다 (첫 렌더에서는 건드리지 않음)
  useEffect(() => {
    if (open) {
      openedOnce.current = true;
      return;
    }
    if (openedOnce.current) toggleRef.current?.focus();
  }, [open]);

  // 패널이 떠 있는 동안 뒤쪽 스크롤을 멈춘다
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const motion =
    'transition-[opacity,transform] duration-[var(--nav-dur)] ease-[var(--nav-ease)] motion-reduce:transition-none';

  return (
    <nav
      aria-label="주요 메뉴"
      className={
        'pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center ' +
        'px-4 pb-[max(1rem,env(safe-area-inset-bottom))] ' +
        'md:inset-x-auto md:bottom-auto md:left-8 md:top-8 md:justify-start md:p-0 ' +
        className
      }
    >
      {/* 바깥을 눌러도 닫히게 하는 가림막 */}
      {mounted && (
        <div
          aria-hidden="true"
          onClick={close}
          className={
            'pointer-events-auto fixed inset-0 z-0 bg-[var(--nav-scrim)] backdrop-blur-[2px] ' +
            'transition-opacity duration-[var(--nav-dur)] ease-[var(--nav-ease)] motion-reduce:transition-none ' +
            (entered ? 'opacity-100' : 'opacity-0')
          }
        />
      )}

      <div className="pointer-events-auto relative z-10">
        {/* 알약 바 */}
        <div
          className={
            'flex items-center gap-1 rounded-full border border-[var(--nav-line)] ' +
            'bg-[var(--nav-paper)]/90 p-1.5 shadow-[var(--nav-shadow)] backdrop-blur-md'
          }
        >
          {items.map((item, index) => {
            const isCurrent = item.id === currentId;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={(event) => onNavigate?.(item, event)}
                className={
                  PILL +
                  ' ' +
                  (index >= barCount ? 'hidden sm:inline-flex ' : '') +
                  (isCurrent
                    ? 'bg-[var(--nav-ink)] text-[var(--nav-paper)]'
                    : 'text-[var(--nav-muted)] hover:bg-[var(--nav-wash)] hover:text-[var(--nav-ink)]')
                }
              >
                {item.label}
              </a>
            );
          })}

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className={
              PILL +
              ' ' +
              (open
                ? 'bg-[var(--nav-ink)] text-[var(--nav-paper)]'
                : 'text-[var(--nav-graphite)] hover:bg-[var(--nav-wash)] hover:text-[var(--nav-ink)]')
            }
          >
            {menuLabel}
            {/* 두 줄이 모여 X가 되는 표시 */}
            <span aria-hidden="true" className="relative block h-3 w-3">
              <span
                className={
                  'absolute inset-x-0 top-[4px] h-px bg-current ' +
                  motion +
                  (open ? ' translate-y-[2px] rotate-45' : '')
                }
              />
              <span
                className={
                  'absolute inset-x-0 top-[8px] h-px bg-current ' +
                  motion +
                  (open ? ' -translate-y-[2px] -rotate-45' : '')
                }
              />
            </span>
          </button>
        </div>

        {/* 전체 메뉴 패널 */}
        {mounted && (
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={
              'absolute bottom-full left-1/2 mb-3 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 ' +
              'md:bottom-auto md:left-0 md:top-full md:mb-0 md:mt-3 md:translate-x-0 ' +
              'rounded-[1.75rem] border border-[var(--nav-line)] bg-[var(--nav-paper)] p-2 ' +
              'shadow-[var(--nav-shadow)] ' +
              motion +
              ' ' +
              (entered
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-2 scale-[0.98] opacity-0 md:-translate-y-2')
            }
          >
            <div className="flex items-center justify-between gap-2 px-3 pb-1 pt-2">
              <h2
                id={titleId}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--nav-graphite)]"
              >
                {panelTitle}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="메뉴 닫기"
                className={
                  'grid h-7 w-7 place-items-center rounded-full text-[var(--nav-graphite)] ' +
                  'transition-colors duration-[var(--nav-dur)] ease-[var(--nav-ease)] motion-reduce:transition-none ' +
                  'hover:bg-[var(--nav-wash)] hover:text-[var(--nav-ink)] ' +
                  FOCUS_RING
                }
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col">
              {items.map((item, index) => {
                const isCurrent = item.id === currentId;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      data-current={isCurrent || undefined}
                      aria-current={isCurrent ? 'page' : undefined}
                      onClick={(event) => {
                        onNavigate?.(item, event);
                        close();
                      }}
                      className={
                        'grid grid-cols-[1.75rem_1fr] items-baseline gap-x-1 rounded-[1.25rem] px-3 py-2.5 ' +
                        'transition-colors duration-[var(--nav-dur)] ease-[var(--nav-ease)] motion-reduce:transition-none ' +
                        'hover:bg-[var(--nav-wash)] ' +
                        FOCUS_RING +
                        ' ' +
                        (isCurrent ? 'bg-[var(--nav-wash)]' : '')
                      }
                    >
                      <span className="font-mono text-[11px] tabular-nums text-[var(--nav-index)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-2 text-[15px] leading-tight text-[var(--nav-ink)]">
                          {item.label}
                          {isCurrent && (
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-[var(--nav-ink)]"
                            />
                          )}
                        </span>
                        {item.description && (
                          <span className="text-[13px] leading-snug text-[var(--nav-muted)]">
                            {item.description}
                          </span>
                        )}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default PillNav;
