declare module '*.css';
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// NOTE: this file must stay a script, not a module — adding a top-level
// import/export would scope the ambient `*.css` declarations above and break
// global CSS imports. So `Window` is augmented directly, without `declare global`.

// GTM / Google Consent Mode v2 pushes an `arguments` object onto the dataLayer,
// so the element type is intentionally loose.
interface Window {
  dataLayer: unknown[];
}
