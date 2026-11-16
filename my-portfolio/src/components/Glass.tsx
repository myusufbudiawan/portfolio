/**
 * The Liquid Glass material.
 *
 * One panel = translucent body (backdrop blur + saturation) + a refracting rim
 * (`.glass-edge`, a masked backdrop-filter ring) + a gradient hairline
 * (`.glass::before`). All three live in globals.css so the reduced-transparency
 * and high-contrast fallbacks can switch them off in one place.
 */
export default function Glass({
  children,
  className = "",
  strong = false,
  as: Tag = "div",
  ...rest
}: {
  children?: React.ReactNode;
  className?: string;
  strong?: boolean;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "li";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={`glass relative ${strong ? "glass-strong" : ""} ${className}`}
      {...rest}
    >
      <span className="glass-edge" aria-hidden="true" />
      {children}
    </Tag>
  );
}
