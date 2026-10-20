/**
 * Single source of truth for the client/partner logo wall.
 *
 * Previously each consumer built its own list from the file numbering, e.g.
 * `Array.from({ length: 20 }, (_, i) => `/Companies Logos/${i + 1}.png`)`, with
 * alt text like "Company Logo 7". That meant:
 *   - removing a brand required editing four files and renumbering, and
 *   - no brand was findable by name anywhere in the codebase.
 *
 * Each entry now carries the real brand name, so the wall can be audited and
 * edited by name, and screen readers / search engines get something meaningful.
 *
 * NOTE: `src` keeps the original file numbering on purpose. The numbers are now
 * opaque identifiers, not an ordered sequence — do not renumber the files to
 * close gaps, it only invalidates caches for no benefit.
 */
export type ClientLogo = {
  /** Original asset number — opaque, kept stable across edits. */
  id: number;
  src: string;
  /** Real brand name, used as alt text. */
  alt: string;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: 2,  src: '/Companies Logos/2.png',  alt: 'Dream Pharmacy' },
  { id: 3,  src: '/Companies Logos/3.png',  alt: 'Marina Byblos Hotel' },
  { id: 4,  src: '/Companies Logos/4.png',  alt: 'Gulf Special Building Maintenance (GSBM)' },
  { id: 6,  src: '/Companies Logos/6.png',  alt: 'Green Crystal Ventilators and Air Filters Trading' },
  { id: 7,  src: '/Companies Logos/7.png',  alt: 'Kayan Prime Businessmen Services' },
  { id: 8,  src: '/Companies Logos/8.png',  alt: 'Ultratech' },
  { id: 11, src: '/Companies Logos/11.png', alt: 'Nell Gwynne' },
  { id: 13, src: '/Companies Logos/13.png', alt: 'Rodeo Drive Ibn Battuta Gate' },
  { id: 14, src: '/Companies Logos/14.png', alt: 'Ahmed Almazrouei Services' },
  { id: 15, src: '/Companies Logos/15.png', alt: 'Nujoom Jeddah Building Contracting' },
  { id: 16, src: '/Companies Logos/16.png', alt: 'Altorath International Engineering Consultants' },
  { id: 17, src: '/Companies Logos/17.png', alt: 'Murano Spa Center' },
  { id: 18, src: '/Companies Logos/18.png', alt: 'Mado' },
  { id: 19, src: '/Companies Logos/19.png', alt: 'Mehzcla Coastal Experience' },
  { id: 20, src: '/Companies Logos/20.png', alt: 'Reset' },
];

/**
 * Removed on 2026-10-20 at the client's request. Listed here so the asset
 * numbers are not silently reused and so the removal is self-documenting:
 *   1  — Cocomix
 *   5  — Farada
 *   9  — Mangrove Adventures
 *   10 — Keen
 *   12 — Sole Therapy
 */
export const RETIRED_LOGO_IDS = [1, 5, 9, 10, 12] as const;
