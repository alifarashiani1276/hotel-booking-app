// دانلود عکس‌های واقعی هتل‌ها و ذخیره‌شون داخل پروژه (public/hotels/<id>.jpg)
// بعد از اجرا، آدرس لوکال توی فیلد `image` هر هتل در src/data/hotels.json ثبت می‌شه
// و دیگه برنامه (حتی روی Vercel) به سایت بیرونی وابسته نیست.
//
// اجرا (یک بار):   npm run images
//
// نیاز به Node 18 یا بالاتر.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = process.argv[2] || path.join(root, "src/data/hotels.json");
const OUT_DIR = path.join(root, "public/hotels");
const TIMEOUT_MS = 20000;

const EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

function candidates(h) {
  return [...new Set([h.xl_picture_url, h.picture_url?.url, h.medium_url, h.thumbnail_url].filter(Boolean))];
}

async function download(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (hotel-booking-app image downloader)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = (res.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    if (!type.startsWith("image/")) throw new Error(`not an image (${type || "unknown type"})`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) throw new Error("file too small");
    return { buf, ext: EXT[type] || "jpg" };
  } finally {
    clearTimeout(timer);
  }
}

const hotels = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
await fs.mkdir(OUT_DIR, { recursive: true });

let ok = 0;
const failed = [];

for (const h of hotels) {
  let saved = false;
  const errors = [];
  for (const url of candidates(h)) {
    try {
      const { buf, ext } = await download(url);
      const file = `${h.id}.${ext}`;
      await fs.writeFile(path.join(OUT_DIR, file), buf);
      h.image = `/hotels/${file}`;
      console.log(`✔ ${h.id}  ${h.name?.slice(0, 40)}  → public/hotels/${file}`);
      saved = true;
      ok++;
      break;
    } catch (err) {
      const reason = err.name === "AbortError" ? "timeout" : err.cause?.code || err.message;
      errors.push(`${url}  (${reason})`);
    }
  }
  if (!saved) {
    console.log(`✘ ${h.id}  ${h.name?.slice(0, 40)}  — دانلود نشد`);
    failed.push({ id: h.id, name: h.name, errors });
  }
}

await fs.writeFile(DATA_FILE, JSON.stringify(hotels, null, 1) + "\n");

console.log(`\n${ok} از ${hotels.length} عکس دانلود شد.`);
if (failed.length) {
  console.log("\nاین هتل‌ها دانلود نشدن (احتمالاً شبکه‌ات به اون سایت دسترسی نداره یا عکس حذف شده):");
  for (const f of failed) {
    console.log(`\n- ${f.id} (${f.name})`);
    f.errors.forEach((e) => console.log(`    ${e}`));
  }
  console.log(
    "\nراه دستی: عکس رو با VPN/مرورگر ذخیره کن، توی public/hotels/<id>.jpg بذار و\n" +
      'مقدار "image" همون هتل رو توی src/data/hotels.json بکن "/hotels/<id>.jpg".',
  );
}
