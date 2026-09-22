const STORAGE_KEY = "moviemania_watchlist";

export const getWatchlist = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const isInWatchlist = (mediaId) =>
  getWatchlist().some((item) => item.mediaId === mediaId);

export const addToWatchlist = (item) => {
  const list = getWatchlist();
  if (list.some((entry) => entry.mediaId === item.mediaId)) return list;
  const updated = [...list, item];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const removeFromWatchlist = (mediaId) => {
  const updated = getWatchlist().filter((item) => item.mediaId !== mediaId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
