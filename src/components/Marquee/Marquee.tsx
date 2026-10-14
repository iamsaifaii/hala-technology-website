import type { ReactNode } from 'react';

// Seamless infinite marquee: two identical tracks, each sliding -100% (see `animate-marquee` in globals.css).
// Give each child a right margin/padding so the loop spacing stays even.
export default function Marquee({
  children,
  duration = 30,
  className = '',
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${duration}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
