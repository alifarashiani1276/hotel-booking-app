import jsonServer from "json-server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = jsonServer.create();

// db.json رو یک‌بار در حافظه لود می‌کنیم (نه از روی مسیر فایل)
// چون فایل‌سیستم Vercel در production فقط-خواندنیه؛
// وقتی یک object به router بدیم، نوشتن‌ها فقط تو حافظه انجام می‌شه و ارور نمی‌ده.
const dbPath = path.join(__dirname, "..", "server", "db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();
server.use(middlewares);

// درخواست‌ها به شکل /api/hotels میان؛ پیشوند /api رو حذف می‌کنیم
// تا router خودِ json-server منبع "hotels" رو تشخیص بده
server.use(jsonServer.rewriter({ "/api/*": "/$1" }));

server.use(router);

export default server;
