// Prefix a path with the configured base (BASE_PATH) so the page also works when hosted under a sub-path.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path = '') => `${base}/${path.replace(/^\//, '')}`;

// Demo copies hosted next to a real site must not be indexed and must not ship a form.
export const hosted = import.meta.env.PUBLIC_DEMO_HOSTED === '1';
