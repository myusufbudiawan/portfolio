"use client";

import { useCallback, useRef } from "react";

/**
 * Glass surface with a pointer-tracked specular highlight.
 *
 * The highlight follows the pointer by writing `--mx` / `--my` onto the node
 * instead of re-rendering React: pointermove fires at ~120Hz and a state update
 * per event would drop frames. Cleared on leave so the material settles.
 */
export default function SpecularCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref is shared across the three tag options.
      ref={ref}
      onPointerMove={onPointerMove}
      className={`specular ${className}`}
    >
      {children}
    </Tag>
  );
}
