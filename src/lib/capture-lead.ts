/**
 * Fire-and-forget hero lead capture.
 *
 * The hero "Request a Call" forms open the booking modal. This sends the typed
 * address to the CRM at the same moment, so a visitor who abandons the modal is
 * still captured instead of being lost.
 *
 * Intentionally never throws and never blocks: opening the modal must not
 * depend on the network. A failed capture is logged and swallowed — the visitor
 * can still complete the full booking, which posts to /api/book.
 */
export async function captureLead(email: string, source: string): Promise<void> {
  const trimmed = email.trim();

  // Cheap client-side guard so we do not post obvious non-addresses.
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;

  try {
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: trimmed,
        source,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      }),
      // Let the request outlive the page if the visitor navigates away.
      keepalive: true,
    });
  } catch {
    // Swallowed on purpose — see note above.
  }
}
