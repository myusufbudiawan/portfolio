"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/lib/profile";

/**
 * A portrait, or a designed placeholder until there is one.
 *
 * The aspect ratio is fixed by the caller so the frame never reflows when a
 * photo lands (CLS 0). `object-position` sits the crop high, because a centred
 * crop of a head-and-shoulders shot cuts the top of the head off.
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
}: {
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  focus?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = profile.portrait;
  const showPhoto = Boolean(src) && !failed;

  return (
    <figure
      className={`portrait ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {showPhoto ? (
        <Image
          src={src as string}
          alt={profile.portraitAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: focus }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="portrait__empty" aria-hidden="true">
          <span className="portrait__monogram">{profile.initials}</span>
          <span className="t-label text-ink-3">Portrait to come</span>
        </div>
      )}
    </figure>
  );
}
