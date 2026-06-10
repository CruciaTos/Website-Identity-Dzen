import { TICKER_ITEMS } from "@/lib/data";

export function Ticker() {
  // Duplicate items for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="bg-bg-panel border-t border-border border-b py-[24px] overflow-hidden"
      role="marquee"
      aria-label="DZen services ticker"
    >
      <div
        className="flex whitespace-nowrap animate-ticker"
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="inline-flex items-center gap-8 px-10 flex-shrink-0"
          >
            <span className="font-sans text-[13px] tracking-[0.14em] uppercase text-stone-200 font-semibold">
              {item}
            </span>
            <div className="w-[4px] h-[4px] bg-accent flex-shrink-0" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
