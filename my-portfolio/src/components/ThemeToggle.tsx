"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { applyMode, readMode, subscribe, type ThemeMode } from "@/lib/theme";

const OPTIONS: { mode: ThemeMode; label: string; hint?: string }[] = [
  { mode: "light", label: "Light" },
  { mode: "dark", label: "Dark" },
  { mode: "system", label: "System", hint: "Follows your device" },
];

function Icon({ mode, size = 15 }: { mode: ThemeMode; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  if (mode === "light") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M6.5 6.5 5 5M19 19l-1.5-1.5M17.5 6.5 19 5M5 19l1.5-1.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (mode === "dark") {
    return (
      <svg {...common}>
        <path
          d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect
        x="2.8"
        y="4.2"
        width="18.4"
        height="12.4"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 20h6M12 16.6V20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Light / dark / system. The trigger shows the current mode; the menu is a
 * glass popover anchored to its top-right, so it reads as part of the chrome
 * rather than a settings page.
 *
 * `compact` is the in-capsule variant used on phones, where a second floating
 * control would not fit beside the nav.
 */
export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const mode = useSyncExternalStore(subscribe, readMode, () => "system" as ThemeMode);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const current = OPTIONS.find((option) => option.mode === mode) ?? OPTIONS[2];

  return (
    <div ref={root} className="theme relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Theme: ${current.label}. Change theme`}
        className={`theme__trigger grid place-items-center rounded-full text-ink-2 hover:text-ink ${
          compact ? "h-10 w-9" : "theme__trigger--float h-11 w-11"
        }`}
      >
        <Icon mode={mode} size={compact ? 15 : 16} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Theme"
          className="theme__menu glass glass-strong absolute right-0 top-[calc(100%+0.5rem)] z-50 w-44 rounded-[var(--radius-md)] p-1.5"
        >
          <span className="glass-edge" aria-hidden="true" />
          <ul className="relative z-10">
            {OPTIONS.map((option) => {
              const selected = option.mode === mode;
              return (
                <li key={option.mode}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    onClick={() => {
                      applyMode(option.mode);
                      close();
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-[var(--radius-xs)] px-2 py-2 text-left text-[0.8125rem] transition-colors duration-150 ${
                      selected ? "bg-canvas-deep text-ink" : "text-ink-2 hover:bg-canvas-deep hover:text-ink"
                    }`}
                  >
                    <span className="text-ink-2">
                      <Icon mode={option.mode} size={14} />
                    </span>
                    <span className="flex-1">
                      {option.label}
                      {option.hint && (
                        <span className="block text-[0.625rem] text-ink-3">
                          {option.hint}
                        </span>
                      )}
                    </span>
                    {selected && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="text-accent"
                      >
                        <path
                          d="m4.5 12.5 5 5 10-11"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
