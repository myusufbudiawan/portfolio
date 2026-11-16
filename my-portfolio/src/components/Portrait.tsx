"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/lib/profile";

/**
 * A portrait, or a designed placeholder until there is one.
 *
 * Geometry is applied inline on purpose, like the live window. `next/image fill`
 * positions against the nearest positioned ancestor, so if these rules go
 * missing from the served stylesheet the photo escapes its frame and covers the
 * whole panel — the frame has to hold its size, clip and radius no matter what
 * the stylesheet does. Only decoration (tint, dashed hairline, shadow) is left
 * to CSS.
 *
 * The aspect ratio is fixed by the caller so the frame never reflows when a
 * photo lands (CLS 0). `object-position` sits the crop high, because a centred
 * crop of a head-and-shoulders shot cuts the top of the head.
 *
 * The placeholder is a real, labelled state, not an empty box: a tinted plane,
 * the monogram, and a hairline that reads as "reserved". Nothing here pretends
 * to be a photograph — a stock face in a personal site is worse than no face.
 */
export default function Portrait({
  aspect = "4 / 5",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className = "",
  focus = "50% 20%",
  print = false,
}: {
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  focus?: string;
  /** Standalone use: the frame carries its own elevation. */
  print?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = profile.portrait;
  const showPhoto = Boolean(src) && !failed;

  return (
    <figure
      className={`portrait ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        aspectRatio: aspect,
        borderRadius: "var(--radius-lg)",
        background: "var(--canvas-deep)",
        boxShadow: print
          ? "var(--shadow-2), inset 0 0 0 1px var(--glass-line)"
          : "inset 0 0 0 1px var(--glass-line)",
      }}
    >
      {showPhoto ? (
        <Image
          src={src as string}
          alt={profile.portraitAlt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: focus }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="portrait__empty"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            borderRadius: "inherit",
          }}
        >
          <span className="portrait__monogram">{profile.initials}</span>
          <span className="t-label text-ink-3">Portrait to come</span>
        </div>
      )}
    </figure>
  );
}
