const JST_OFFSET_HOURS = 9;
const CACHE_RESET_HOUR_JST = 19;
const CACHE_RESET_HOUR_UTC = CACHE_RESET_HOUR_JST - JST_OFFSET_HOURS;
const STALE_WHILE_REVALIDATE_SECONDS = 60;

const getSecondsUntilNextDailyReset = () => {
  const now = new Date();
  const jstNow = new Date(now.getTime() + JST_OFFSET_HOURS * 60 * 60 * 1000);
  const nextResetUtcMs = Date.UTC(
    jstNow.getUTCFullYear(),
    jstNow.getUTCMonth(),
    jstNow.getUTCDate() + (jstNow.getUTCHours() >= CACHE_RESET_HOUR_JST ? 1 : 0),
    CACHE_RESET_HOUR_UTC,
    0,
    0,
    0
  );

  return Math.max(1, Math.ceil((nextResetUtcMs - now.getTime()) / 1000));
};

export const createDailyResetCacheHeaders = (): Record<string, string> => {
  const sMaxAge = getSecondsUntilNextDailyReset();
  const cacheValue = `public, s-maxage=${sMaxAge}, stale-while-revalidate=${STALE_WHILE_REVALIDATE_SECONDS}`;

  return {
    "Cache-Control": "public, max-age=0, must-revalidate",
    "CDN-Cache-Control": cacheValue,
    "Vercel-CDN-Cache-Control": cacheValue,
  };
};
