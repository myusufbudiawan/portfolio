"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";
import { basePath } from "@/lib/site";

/**
 * A portrait, or a designed placeholder until there is one.
 *
 * Geometry is applied inline on purpose, like the live window. An absolutely
 * positioned image anchors to the nearest positioned ancestor, so if these rules
 * go missing from the served stylesheet the photo escapes its frame and covers
 * the whole panel — the frame has to hold its size, clip and radius no matter
 * what the stylesheet does. Only decoration (tint, dashed hairline, shadow) is
 * left to CSS.
 *
 * A plain <img> rather than next/image: on GitHub Pages images are exported
 * unoptimised, so there is no srcset to gain, and next/image re-requests the
 * unprefixed src from client JS on a base-path deploy (`/portrait.jpg` instead
 * of `/portfolio/portrait.jpg`), which 404s. The source is pre-sized to
 * 1400px/q82 instead, and the intrinsic size here keeps CLS at 0.
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
  className = "",
  focus = "50% 20%",
  print = false,
}: {
  aspect?: string;
  priority?: boolean;
  className?: string;
  focus?: string;
  /** Standalone use: the frame carries its own elevation. */
  print?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  // next/image does not prefix basePath for unoptimised public files.
  const src = profile.portrait ? `${basePath}${profile.portrait}` : null;
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
        <img
          src={src as string}
          alt={profile.portraitAlt}
          width={1400}
          height={2100}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: focus,
          }}
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
