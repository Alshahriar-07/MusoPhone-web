// Production check. The site is static, so "building" means verifying what will be deployed.
// Missing externally supplied assets are reported as warnings; real mistakes fail the build.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const errors = [], warnings = [];
const html = read("index.html"), css = read("css/style.css"), js = read("js/main.js");

for (const f of ["js/main.js", "api/download.js", "scripts/dev.js"]) {
  try { execFileSync(process.execPath, ["--check", path.join(root, f)], { stdio: "pipe" }); }
  catch (e) { errors.push(`${f}: ${e.stderr}`); }
}
for (const f of ["vercel.json", "site.webmanifest", "package.json"]) {
  try { JSON.parse(read(f)); } catch (e) { errors.push(`${f}: ${e.message}`); }
}
const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (!ld.length) errors.push("No JSON-LD found");
for (const m of ld) {
  try {
    const graph = JSON.parse(m[1])["@graph"];
    const ids = new Set(graph.map((n) => n["@id"]));
    for (const [, id] of m[1].matchAll(/\{\s*"@id":\s*"([^"]+)"\s*\}/g)) if (!ids.has(id)) errors.push(`JSON-LD: unresolved ${id}`);
  } catch (e) { errors.push(`JSON-LD: ${e.message}`); }
}
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
ids.filter((id, i) => ids.indexOf(id) !== i).forEach((id) => errors.push(`Duplicate id: ${id}`));
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) if (!ids.includes(id)) errors.push(`Broken anchor: #${id}`);
if (!html.includes('<link rel="canonical" href="https://musophone.vercel.app/">')) errors.push("Canonical URL changed");
for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(tag)) errors.push(`Image without alt: ${tag.slice(0, 80)}`);
if (/data:image\/(png|jpe?g|webp);base64/.test(html + js + css)) errors.push("Inline base64 raster image found");

const external = /^\/(web\/assets|assets)\/|^\/(favicon\.ico|icon-192\.png|icon-256\.png|apple-touch-icon\.png)$/;
const refs = new Set();
for (const m of (html + js).matchAll(/(?:src|srcset|href)="(\/[^"?#]*)[^"]*"/g)) refs.add(m[1]);
for (const m of (html + js).matchAll(/url\('?(\/[^')"]+)/g)) refs.add(m[1]);
for (const m of js.matchAll(/["'](\/img\/[^"']+)["']/g)) refs.add(m[1]);
for (const m of read("sitemap.xml").matchAll(/<image:loc>https:\/\/musophone\.vercel\.app(\/[^<]+)</g)) refs.add(m[1]);
for (const r of refs) {
  if (r === "/" || r.startsWith("//") || r.startsWith("/api/") || /^\/web\/assets\/.*\.webp$/.test(r)) continue; // webp screenshots are optional
  const alt = r.replace(/^\/web\/assets\//, "/web-assets/").replace(/^\/assets\//, "/asset/");
  if (fs.existsSync(path.join(root, r)) || fs.existsSync(path.join(root, alt))) continue;
  (external.test(r) ? warnings : errors).push(`Missing file: ${r}`);
}

if (warnings.length) console.warn("Supply these before deploying:\n  " + warnings.sort().join("\n  "));
if (errors.length) { console.error("Check failed:\n  " + errors.join("\n  ")); process.exit(1); }
console.log(`Check passed (${refs.size} local references, ${warnings.length} awaiting your assets).`);
