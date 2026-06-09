interface IconProps {
  className?: string;
}

export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="0" y="0" width="6" height="6" fill="#121416" />
      <rect x="8" y="0" width="6" height="6" fill="#121416" />
      <rect x="0" y="8" width="6" height="6" fill="#121416" />
      <rect x="8" y="8" width="6" height="6" fill="#121416" opacity="0.4" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M1 6H11M6 1L11 6L6 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M7 1L12 3V7C12 10 7 13 7 13C7 13 2 10 2 7V3L7 1Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <rect x="2" y="5" width="10" height="8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5V3C4 2 5 1 7 1C9 1 10 2 10 3V5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M2 2H12V9H8L7 11L6 9H2V2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function MonitorIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M7 2C4.2 2 2 4.2 2 7C2 9.8 4.2 12 7 12C9.8 12 12 9.8 12 7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 2L12 2L12 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 5L12 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// System category icons
export function RectGridIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ClockCircleIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function EnvelopeIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2 4H14V12H2V4Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 4L8 9L14 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function BarChartIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 13V3M13 13V7M8 13V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function LineChartIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2 12L6 8L10 10L14 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 4H12V8H4V4Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 8H14V12H2V8Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function DashedArrowRight({ className }: IconProps) {
  return (
    <svg width="160" height="2" viewBox="0 0 160 2" className={className}>
      <line x1="0" y1="1" x2="160" y2="1" stroke="rgba(216, 211, 203, 0.16)" strokeDasharray="4 4" />
    </svg>
  );
}

export function ChevronArrow({ className }: IconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M6 0L12 6L6 12M0 6H12" stroke="#8F7860" strokeWidth="1.2" />
    </svg>
  );
}
