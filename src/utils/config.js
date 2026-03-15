export const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        const url = process.env.NEXT_PUBLIC_BASE_URL || '';
        return url;
    }
    
    return process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
  };
