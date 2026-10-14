// "Backend" داخل مرورگر: جایگزین json-server.
// - هتل‌ها از فایل استاتیک src/data/hotels.json خونده می‌شن.
// - بوکمارک‌ها توی localStorage ذخیره می‌شن (و بار اول از src/data/bookmarks.json پر می‌شن).
// نتیجه: فقط با `npm run dev` (یا روی Vercel) همه‌چیز کار می‌کنه و نیازی به سرور جدا نیست.

import hotelsData from "../data/hotels.json";
import seedBookmarks from "../data/bookmarks.json";

const STORAGE_KEY = "booking-app:bookmarks";

// ---------- Hotels ----------

// جستجوی متنی مشابه `?q=` در json-server: روی همهٔ مقدارهای هتل (حتی تو در تو) می‌گرده
function matchesText(value, query) {
  if (value === null || value === undefined) return false;
  if (typeof value === "object") {
    return Object.values(value).some((v) => matchesText(v, query));
  }
  return String(value).toLowerCase().includes(query);
}

export async function getHotels({ q = "", accommodatesGte = 1 } = {}) {
  const query = String(q).trim().toLowerCase();
  const minGuests = Number(accommodatesGte) || 1;

  return hotelsData.filter((hotel) => {
    if (Number(hotel.accommodates) < minGuests) return false;
    if (query && !matchesText(hotel, query)) return false;
    return true;
  });
}

export async function getHotelById(id) {
  const hotel = hotelsData.find((h) => String(h.id) === String(id));
  if (!hotel) throw new Error("Hotel not found");
  return hotel;
}

// ---------- Bookmarks ----------

function readBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // localStorage در دسترس نیست یا خراب شده؛ از داده‌های اولیه استفاده می‌کنیم
  }
  return seedBookmarks;
}

function writeBookmarks(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // اگه نوشتن ممکن نبود (مثلاً private mode) برنامه همچنان توی همین session کار می‌کنه
  }
}

// برای حالتی که localStorage کار نکنه، یه کپی در حافظه نگه می‌داریم
let memoryBookmarks = null;
function load() {
  if (memoryBookmarks === null) memoryBookmarks = readBookmarks();
  return memoryBookmarks;
}
function save(list) {
  memoryBookmarks = list;
  writeBookmarks(list);
}

export async function getBookmarks() {
  return [...load()];
}

export async function getBookmarkById(id) {
  const bookmark = load().find((b) => String(b.id) === String(id));
  if (!bookmark) throw new Error("Bookmark not found");
  return bookmark;
}

export async function addBookmark(newBookmark) {
  const list = load();
  const nextId = list.reduce((max, b) => Math.max(max, Number(b.id) || 0), 0) + 1;
  const bookmark = { ...newBookmark, id: nextId };
  save([...list, bookmark]);
  return bookmark;
}

export async function removeBookmark(id) {
  save(load().filter((b) => String(b.id) !== String(id)));
}
