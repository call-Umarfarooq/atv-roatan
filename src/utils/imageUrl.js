export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already absolute

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) return path;

  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // If path starts with /, join them correctly
  if (path.startsWith('/')) {
    return `${cleanBase}${path}`;
  }

  return `${cleanBase}/${path}`;
};

