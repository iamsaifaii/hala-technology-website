/**
 * Renders JSON-LD structured data as a real, server-rendered <script> tag.
 *
 * Why not `next/script`: with the default `afterInteractive` strategy the tag is
 * injected client-side after hydration, so it is absent from the initial HTML.
 * Googlebot usually picks it up on its render pass, but Bing, social validators,
 * raw-HTML rich-results checks and LLM crawlers do not.
 *
 * Why the escaping matters: `JSON.stringify` does NOT escape `<`. Inside a real
 * `<script>` element a value containing `</script>` would terminate the element
 * early and the remainder would be parsed as live HTML — stored XSS for any
 * field sourced from the CMS. Escaping `<` as `<` is valid JSON, is parsed
 * back to `<` by consumers, and closes that hole.
 */
export default function JsonLd({ id, data }: { id: string; data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- escaped above; see note.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
