
export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already absolute
  
  // If path starts with /, return it as is (relative path)
  if (path.startsWith('/')) return path;

  // Otherwise, if we have a base URL, join them (for other cases)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) return path;

  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${cleanBase}/${path}`;
};
