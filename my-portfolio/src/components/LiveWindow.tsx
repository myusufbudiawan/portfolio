"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Variant = "window" | "phone" | "mini";

/**
 * Geometry is applied inline on purpose. A stale or partial stylesheet must not
 * be able to collapse this window into an unstyled stack of elements; the
 * material (blur, rim, radii, colours) stays in globals.css where it belongs.
 */
const SIZES = {
  mini: { height: "15rem", maxWidth: "100%", bar: "1.875rem", pad: "0.5rem" },
  phone: { height: "clamp(30rem, 62vh, 38rem)", maxWidth: "28rem", bar: "2.5rem", pad: "0.6875rem" },
  window: { height: "clamp(20rem, 46vh, 30rem)", maxWidth: "100%", bar: "2.5rem", pad: "0.6875rem" },
} as const;

/**
 * A running app inside the page, framed as a window: glass chrome, a real
 * address bar, and the site itself in an iframe.
 *
 * Three decisions worth knowing:
 * - The iframe mounts only within 400px of the viewport, so a below-the-fold
 *   embed costs nothing until the reader gets there.
 * - Touch devices get one tap to hand over control, because an interactive
 *   iframe otherwise swallows page scroll. The gate keys off `pointer: coarse`
 *   rather than `hover: none`, since hybrid laptops report no hover and still
 *   work fine with a mouse.
 * - The `mini` variant is never interactive (pointer-events: none): on the home
 *   page it is a snippet, not a control surface.
 */
export default function LiveWindow({
  href,
  label,
  title,
  variant = "window",
  height,
  className = "",
}: {
  href: string;
  label: string;
  title: string;
  variant?: Variant;
  height?: string;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activated, setActivated] = useState(false);
  const [nonce, setNonce] = useState(0);

  const size = SIZES[variant];
  const viewportHeight = height ?? size.height;

  useEffect(() => {
    const node = host.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMounted(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const reload = useCallback(() => {
    setLoading(true);
    setNonce((value) => value + 1);
  }, []);

  const isMini = variant === "mini";

  return (
    <div
      ref={host}
      className={`live live--${variant} ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: size.maxWidth,
        minWidth: 0,
        marginInline: variant === "phone" ? "auto" : undefined,
      }}
    >
      <div
        className="live__bar"
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          gap: isMini ? "0.375rem" : "0.625rem",
          height: size.bar,
          paddingInline: size.pad,
        }}
      >
        <span className="live__lights" aria-hidden="true">
          <span className="live__light" />
          <span className="live__light" />
          <span className="live__light" />
        </span>

        <span className="live__url" title={href}>
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0, opacity: 0.6 }}
          >
            <path
              d="M7 10V7a5 5 0 0 1 10 0v3M6 10h12v9H6z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        </span>

        {!isMini && (
          <span className="live__actions">
            <button
              type="button"
              onClick={reload}
              className="live__action"
              aria-label={`Reload ${title}`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 12a8 8 0 1 1-2.5-5.8M20 4v4.5h-4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="live__action"
              aria-label={`Open ${title} in a new tab`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </span>
        )}
      </div>

      <div
        className="live__viewport"
        style={{
          position: "relative",
          overflow: "hidden",
          height: viewportHeight,
          minWidth: 0,
        }}
      >
        {!mounted && <div className="live__idle" aria-hidden="true" />}

        {mounted && (
          <iframe
            key={nonce}
            src={href}
            title={title}
            className="live__frame"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ display: "block", width: "100%", height: "100%", border: 0 }}
            onLoad={() => setLoading(false)}
          />
        )}

        {mounted && loading && <div className="live__loading" aria-hidden="true" />}

        {isMini && <div className="live__fade" aria-hidden="true" />}

        {!isMini && !activated && (
          <button
            type="button"
            className="live__activate"
            data-active={String(!activated)}
            onClick={() => setActivated(true)}
          >
            <span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5A6.5 6.5 0 0 1 11.5 21h-.9a6 6 0 0 1-5.1-2.8L3 14.6a1.6 1.6 0 0 1 2.5-2l1.5 1.5V8.5a1.5 1.5 0 0 1 3 0V11"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Tap to interact
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
