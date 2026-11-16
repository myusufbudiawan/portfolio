export type ThemeMode = "light" | "dark" | "system";

export const THEME_KEY = "theme";

const listeners = new Set<() => void>();

/** Read the mode from the document, which is what actually renders. */
export function readMode(): ThemeMode {
  if (typeof document === "undefined") return "system";
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "dark" ? value : "system";
}

export function applyMode(mode: ThemeMode) {
  const root = document.documentElement;

  if (mode === "system") {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = mode;
  }

  try {
    if (mode === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, mode);
  } catch {
    /* private mode or storage disabled: the choice still applies for this page */
  }

  listeners.forEach((notify) => notify());
}

export function subscribe(notify: () => void) {
  listeners.add(notify);

  // Two tabs open on the same site should not disagree about the theme.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_KEY && event.key !== null) return;
    const stored = event.newValue;
    const root = document.documentElement;
    if (stored === "light" || stored === "dark") root.dataset.theme = stored;
    else delete root.dataset.theme;
    notify();
  };

  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Runs in <head> before first paint, so a stored choice never flashes the
 * wrong palette. Kept as a string because it must be inline and synchronous.
 */
export const themeScript = `(function(){try{var m=localStorage.getItem("${THEME_KEY}");if(m==="light"||m==="dark"){document.documentElement.setAttribute("data-theme",m)}}catch(e){}})()`;
