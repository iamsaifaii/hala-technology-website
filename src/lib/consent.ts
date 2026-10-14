/**
 * Cookie-consent state shared between the banner and the script loader.
 *
 * Previously the banner wrote a localStorage key that nothing ever read, while
 * GTM, HubSpot and LeadConnector all loaded unconditionally on first paint —
 * "Decline" changed nothing. These helpers make the stored choice authoritative.
 */

export const CONSENT_STORAGE_KEY = 'hala_cookie_consent';
export const CONSENT_EVENT = 'hala:consent-change';

export type ConsentValue = 'accepted' | 'declined';

/** Read the stored choice. Returns null when the visitor has not chosen yet. */
export function readConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'accepted' || stored === 'declined' ? stored : null;
  } catch {
    // Private mode / blocked storage — treat as "not chosen".
    return null;
  }
}

/** Persist the choice, update Google Consent Mode, and notify listeners. */
export function writeConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Storage unavailable — the in-page event below still applies the choice
    // for this pageview.
  }

  updateGoogleConsent(value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/**
 * Push a Consent Mode v2 update into the dataLayer. GTM is loaded with all
 * consent types denied by default (see ConsentInit), so this is what actually
 * unlocks analytics and ad storage.
 */
export function updateGoogleConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return;

  const granted = value === 'accepted' ? 'granted' : 'denied';

  window.dataLayer = window.dataLayer || [];

  // Consent Mode reads an `arguments` object off the dataLayer, not a plain
  // array — GTM treats the two differently, so this must stay a function call.
  function gtag(...args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }

  gtag('consent', 'update', {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
    personalization_storage: granted,
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
}
