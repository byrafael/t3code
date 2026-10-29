import { useState } from "react";
import {
  ActivityIcon,
  CheckIcon,
  ChevronDownIcon,
  CircleDotIcon,
  Clock3Icon,
  Code2Icon,
  FolderIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
} from "lucide-react";

const shelves = [
  {
    id: "working",
    label: "Working",
    count: "21",
    icon: ActivityIcon,
    rows: ["Add retries to webhook delivery", "Refine billing overview", "Fix flaky auth test"],
  },
  {
    id: "snoozed",
    label: "Snoozed",
    count: "35",
    icon: Clock3Icon,
    rows: ["Review API pagination", "Update onboarding copy", "Check staging deploy"],
  },
  {
    id: "settled",
    label: "Settled",
    count: "3812",
    icon: CheckIcon,
    rows: ["Ship dark mode polish", "Document environment setup", "Merge settings redesign"],
  },
] as const;

export function SidebarMock() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const toggle = (id: string) =>
    setExpanded((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <div className="mock-workspace">
      <aside className="mock-sidebar" data-app-sidebar aria-label="Threads">
        <header className="mock-header">
          <div className="mock-brand">
            <span className="mock-brand-icon"><Code2Icon /></span>
            <span>T3 <span className="mock-brand-muted">Code</span></span>
            <ChevronDownIcon className="mock-brand-chevron" />
          </div>
          <button className="mock-search"><SearchIcon /><span>Search threads</span><kbd>⌘ K</kbd></button>
        </header>

        <main className="mock-nav">
          <div className="mock-nav-label">Threads</div>
          <button className="mock-nav-item mock-nav-active"><PlusIcon /><span>New thread</span></button>
          <button className="mock-nav-item"><FolderIcon /><span>Projects</span></button>
          <button className="mock-nav-item"><SparklesIcon /><span>Starred</span></button>
          <div className="mock-divider" />

          <div className="mock-shelves">
            {shelves.map(({ id, label, count, icon: Icon, rows }) => {
              const isExpanded = expanded.includes(id);
              return (
                <section key={id}>
                  <button
                    className={`mock-section-header${id === "snoozed" ? " mock-section-info" : ""}`}
                    aria-expanded={isExpanded}
                    onClick={() => toggle(id)}
                  >
                    <span className="mock-section-title">{label} ({count})</span>
                    <span aria-hidden className="mock-section-rule" />
                    <ChevronDownIcon className={`mock-section-chevron${isExpanded ? " is-open" : ""}`} />
                  </button>
                  {isExpanded ? (
                    <div className="mock-thread-list">
                      {rows.map((row) => (
                        <button key={row} className="mock-thread"><Icon /><span>{row}</span></button>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </main>

        <footer className="mock-footer">
          <button className="mock-footer-item"><SettingsIcon /><span>Settings</span></button>
          <button className="mock-footer-item"><span className="mock-avatar">R</span><span>Rafael Soley</span><ChevronDownIcon className="mock-footer-chevron" /></button>
        </footer>
      </aside>
      <main className="mock-main">
        <div className="mock-empty">
          <span className="mock-empty-icon"><CircleDotIcon /></span>
          <span>Select a thread to continue</span>
        </div>
      </main>

      <style>{`
        * { box-sizing: border-box; }
        html, body, #sidebar-mock { width: 100%; min-height: 100%; margin: 0; }
        body { font-family: var(--font-sans, ui-sans-serif, system-ui); color: var(--foreground); background: var(--background); }
        .mock-workspace { display: flex; min-height: 100dvh; background: var(--background); }
        .mock-sidebar { display: flex; flex: 0 0 256px; flex-direction: column; min-height: 100dvh; background: var(--sidebar); color: var(--sidebar-foreground); border-right: 1px solid var(--sidebar-border); }
        .mock-header { display: flex; flex-direction: column; gap: 12px; padding: 16px 12px 12px; }
        .mock-brand { display: flex; align-items: center; gap: 9px; height: 28px; padding: 0 4px; color: var(--sidebar-foreground); font-size: 14px; font-weight: 550; letter-spacing: -0.02em; }
        .mock-brand-icon { display: grid; width: 25px; height: 25px; place-items: center; border-radius: 7px; background: var(--sidebar-control-surface); }
        .mock-brand-icon svg { width: 15px; height: 15px; }
        .mock-brand-muted { color: var(--sidebar-muted-foreground); font-weight: 450; }
        .mock-brand-chevron { width: 13px; height: 13px; margin-left: auto; color: var(--sidebar-muted-foreground); }
        .mock-search { display: flex; align-items: center; gap: 8px; width: 100%; height: 33px; padding: 0 9px; border: 1px solid var(--sidebar-border); border-radius: 7px; background: var(--sidebar-control-surface); color: var(--sidebar-muted-foreground); text-align: left; font: inherit; font-size: 12px; }
        .mock-search svg { width: 14px; height: 14px; }
        .mock-search kbd { margin-left: auto; padding: 1px 4px; border: 1px solid var(--sidebar-border); border-radius: 4px; font: 10px var(--font-mono, ui-monospace, monospace); }
        .mock-nav { display: flex; flex: 1; flex-direction: column; padding: 4px 8px 8px; }
        .mock-nav-label { padding: 8px 8px 5px; color: color-mix(in srgb, var(--sidebar-muted-foreground) 65%, transparent); font-size: 11px; font-weight: 550; }
        .mock-nav-item, .mock-footer-item { display: flex; align-items: center; gap: 9px; width: 100%; height: 32px; padding: 0 9px; border: 0; border-radius: 7px; background: transparent; color: var(--sidebar-muted-foreground); text-align: left; font: inherit; font-size: 12px; }
        .mock-nav-item svg, .mock-footer-item svg { width: 15px; height: 15px; flex: none; }
        .mock-nav-active { background: var(--sidebar-row-selected); color: var(--sidebar-foreground); font-weight: 550; }
        .mock-divider { height: 1px; margin: 13px 4px 12px; background: var(--sidebar-border); }
        .mock-shelves { display: flex; flex-direction: column; gap: 1px; }
        .mock-section-header { display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 0 8px; border: 0; border-radius: 6px; background: transparent; color: color-mix(in srgb, var(--sidebar-muted-foreground) 72%, transparent); text-align: left; font: inherit; font-size: 12px; font-weight: 550; cursor: pointer; }
        .mock-section-header:hover { background: var(--sidebar-row-hover); color: var(--sidebar-foreground); }
        .mock-section-info { color: var(--info-foreground, #60a5fa); }
        .mock-section-title { flex: none; }
        .mock-section-rule { height: 1px; min-width: 8px; flex: 1; background: color-mix(in srgb, var(--sidebar-border) 90%, transparent); }
        .mock-section-chevron { width: 12px; height: 12px; flex: none; transform: rotate(180deg); transition: transform 120ms ease; }
        .mock-section-chevron.is-open { transform: rotate(0); }
        .mock-thread-list { display: flex; flex-direction: column; gap: 1px; padding: 0 0 4px 24px; }
        .mock-thread { display: flex; align-items: center; gap: 8px; height: 30px; min-width: 0; padding: 0 8px; border: 0; border-radius: 6px; background: transparent; color: var(--sidebar-muted-foreground); text-align: left; font: inherit; font-size: 11px; }
        .mock-thread:hover { background: var(--sidebar-row-hover); color: var(--sidebar-foreground); }
        .mock-thread svg { width: 13px; height: 13px; flex: none; opacity: .72; }
        .mock-thread span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .mock-footer { display: flex; flex-direction: column; gap: 2px; padding: 8px; }
        .mock-avatar { display: grid; width: 20px; height: 20px; place-items: center; border-radius: 50%; background: var(--sidebar-control-surface); color: var(--sidebar-foreground); font-size: 10px; }
        .mock-footer-chevron { margin-left: auto; }
        .mock-main { display: grid; flex: 1; place-items: center; min-width: 0; color: color-mix(in srgb, var(--muted-foreground) 70%, transparent); font-size: 12px; }
        .mock-empty { display: flex; flex-direction: column; align-items: center; gap: 11px; }
        .mock-empty-icon { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid var(--border); border-radius: 11px; background: var(--card); }
        .mock-empty-icon svg { width: 18px; height: 18px; }
        @media (max-width: 600px) { .mock-sidebar { flex-basis: min(256px, 76vw); } .mock-main { display: none; } }
        @media (prefers-reduced-motion: reduce) { .mock-section-chevron { transition: none; } }
      `}</style>
    </div>
  );
}
