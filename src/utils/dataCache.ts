const cache: { [key: string]: { data: unknown; timestamp: number } } = {};

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const setCache = <T>(key: string, data: T) => {
  cache[key] = { data, timestamp: Date.now() };
};

export const getCache = (key: string) => {
  const cached = cache[key];
  if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
    return cached.data;
  }
  return null;
};

export const clearCache = (key: string) => {
  delete cache[key];
};