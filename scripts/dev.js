// Zero-dependency local server that mirrors the parts of Vercel this site relies on.
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT) || 3000;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "application/javascript; charset=utf-8",
  ".json": "application/json", ".webmanifest": "application/manifest+json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".svg": "image/svg+xml" };
const fallbacks = [["/web/assets/", "/web-assets/"], ["/assets/", "/asset/"]];

function file(url) {
  const p = path.join(root, url);
  const hidden = /(^|\/)(\.|scripts\/|api\/)/.test(url.slice(1));
  return !hidden && p.startsWith(root + path.sep) && fs.existsSync(p) && fs.statSync(p).isFile() ? p : null;
}

http.createServer((req, res) => {
  let url;
  try { url = decodeURIComponent(req.url.split("?")[0]); } catch { res.writeHead(400); return res.end("Bad request"); }

  if (url === "/api/download") {
    res.status = (c) => ((res.statusCode = c), res);
    res.send = (b) => res.end(b);
    res.redirect = (c, to) => { res.writeHead(c, { Location: to }); res.end(); };
    return require("../api/download.js")(req, res);
  }
  if (url === "/") url = "/index.html";
  let found = file(url);
  if (!found) for (const [from, to] of fallbacks) if (url.startsWith(from)) found = file(to + url.slice(from.length));
  if (!found) { res.writeHead(404); return res.end("Not found"); }
  res.writeHead(200, { "Content-Type": types[path.extname(found)] || "application/octet-stream" });
  fs.createReadStream(found).pipe(res);
}).listen(port, () => console.log(`MusoPhone site: http://localhost:${port}`));
