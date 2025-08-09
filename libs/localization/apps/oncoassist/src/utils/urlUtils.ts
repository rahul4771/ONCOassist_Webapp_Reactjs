export function getUnifiedSearchParams(): URLSearchParams {
  // Support both "/dashboard?..." and "#/dashboard?..."
  if (typeof window !== 'undefined' && window.location.hash.includes('?')) {
    const [, query] = window.location.hash.split('?');
    return new URLSearchParams(query);
  }
  return new URLSearchParams(window.location.search);
}