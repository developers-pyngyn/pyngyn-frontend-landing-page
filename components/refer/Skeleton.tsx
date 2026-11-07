/**
 * Grey rounded bars shown in place of reward text until the live values arrive.
 * Each bar sits on its own line box of the surrounding text (an inline-block shorter
 * than the line height), so a skeleton takes the same height as the text it replaces
 * and nothing moves when the values arrive.
 */
export function Skeleton({
  lines = 1,
  width = "100%",
  lastWidth = "60%",
  inline = false,
}: {
  lines?: number;
  width?: string;
  lastWidth?: string;
  inline?: boolean;
}) {
  const bar = (w: string, key?: number) => (
    <span
      key={key}
      data-skeleton=""
      aria-hidden="true"
      className="inline-block h-[0.8em] max-w-full animate-pulse rounded-md bg-line align-[-0.08em]"
      style={{ width: w }}
    />
  );
  // The wrapper keeps a line box (and so the text's height) even as a flex item.
  if (inline) return <span aria-hidden="true">{bar(width)}</span>;
  return (
    <span className="block" aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="block">
          {bar(lines > 1 && i === lines - 1 ? lastWidth : width, i)}
        </span>
      ))}
    </span>
  );
}
