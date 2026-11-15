"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

const items = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

/**
 * Floating glass capsule. The active item is a shared-layout pill that slides
 * between links, so the eye tracks one object instead of three colour changes.
 * Collapses to a tighter material once the page scrolls under it — the same
 * "floating chrome" relationship a toolbar has to content on iOS.
 */
export default function Nav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.nav
      aria-label="Primary"
      initial={false}
      animate={{ scale: scrolled ? 0.985 : 1 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="glass glass-strong fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full p-1.5"
      style={{ boxShadow: scrolled ? "var(--glass-shadow-lifted)" : undefined }}
    >
      <span className="glass-edge" aria-hidden="true" />
      <ul className="relative z-10 flex items-center gap-0.5">
        <li>
          <Link
            href="/"
            className="flex h-10 items-center rounded-full pl-3 pr-2.5"
          >
            <span className="sr-only">{profile.name}, home</span>
            <span
              aria-hidden="true"
              className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[0.625rem] font-semibold tracking-[0.02em] text-canvas tnum"
            >
              {profile.initials}
            </span>
          </Link>
        </li>
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-10 items-center rounded-full px-3.5 text-[0.8125rem] transition-colors duration-200 sm:px-4 ${
                  active ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-canvas-deep"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", bounce: 0, duration: 0.4 }
                    }
                  />
                )}
                <span className="relative z-10 font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li className="pl-0.5">
          <a
            href={`mailto:${profile.email}`}
            className="flex h-10 items-center rounded-full bg-ink px-3.5 text-[0.8125rem] font-medium text-canvas transition-colors duration-200 hover:bg-ink-2"
          >
            Email
          </a>
        </li>
      </ul>
    </motion.nav>
  );
}
