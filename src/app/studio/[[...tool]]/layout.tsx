import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hala Studio',
  description: 'Sanity Studio for Hala Technologies',
  // Belt-and-braces alongside robots.ts — the CMS must never be indexed.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * This is a NESTED layout under the app's root layout, which already renders
 * <html> and <body>. It previously rendered its own pair, producing
 * <html><body>…<html><body> — invalid HTML and a guaranteed hydration mismatch.
 * The studio page itself covers the viewport with `position: fixed; inset: 0`,
 * so it does not need its own document shell.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
