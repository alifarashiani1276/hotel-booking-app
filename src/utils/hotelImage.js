// عکس‌های واقعی هر هتل.
// ترتیب امتحان کردن (اولین آدرسی که لود بشه نشون داده می‌شه):
//   1. hotel.image          → عکس لوکال (توسط scripts/download-images.mjs یا دستی تنظیم می‌شه)
//   2. xl_picture_url       → عکس اصلی هتل (Airbnb)
//   3. picture_url.url      → کپی همون عکس روی opendatasoft
//   4. medium_url / thumbnail_url → نسخه‌های کوچک‌تر
//   5. /123.jpg             → آخرین راه، عکس پیش‌فرض
export const DEFAULT_IMAGE = "/123.jpg";

export function getImageCandidates(hotel) {
  const list = [
    hotel?.image,
    hotel?.xl_picture_url,
    hotel?.picture_url?.url,
    hotel?.medium_url,
    hotel?.thumbnail_url,
    DEFAULT_IMAGE,
  ].filter(Boolean);
  return [...new Set(list)];
}
