import type { ReactNode } from "react";

/**
 * The mock browser/editor frame used by the terminal panels and every card in
 * the stack: three inert traffic lights, a centred monospace title, and an
 * optional slot on the right. The 54/44px side columns keep the title optically
 * centred regardless of what the right slot holds.
 */
export function TitleBar({
  title,
  right,
  size = "md",
  className = "",
  ref,
}: {
  title: ReactNode;
  right?: ReactNode;
  size?: "sm" | "md";
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const sm = size === "sm";
  const dot = sm ? "h-[9px] w-[9px]" : "h-2.5 w-2.5";

  return (
    <div
      ref={ref}
      className={`grid shrink-0 items-center border-b border-line bg-soft ${
        sm ? "grid-cols-[44px_1fr_44px] px-3 py-2" : "grid-cols-[54px_1fr_54px] px-3.5 py-2.5"
      } ${className}`}
    >
      <span className={`inline-flex ${sm ? "gap-1.5" : "gap-[7px]"}`}>
        <span className={`${dot} rounded-full bg-hair`} />
        <span className={`${dot} rounded-full bg-hair`} />
        <span className={`${dot} rounded-full bg-hair`} />
      </span>
      <span
        className={`text-center font-mono text-dim ${sm ? "text-[10px]" : "text-[11px]"}`}
      >
        {title}
      </span>
      <span className="justify-self-end">{right}</span>
    </div>
  );
}

/** Full frame: title bar plus body, on the site's signature hard offset shadow. */
export function BrowserWindow({
  title,
  right,
  size = "md",
  shadow = true,
  className = "",
  bodyClassName = "",
  children,
}: {
  title: ReactNode;
  right?: ReactNode;
  size?: "sm" | "md";
  shadow?: boolean;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col border border-ink bg-paper ${
        shadow ? "shadow-[8px_8px_0_var(--color-card)]" : ""
      } ${className}`}
    >
      <TitleBar title={title} right={right} size={size} />
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
