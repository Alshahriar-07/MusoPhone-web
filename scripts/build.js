// Static build: verify the site, then stage exactly what should be deployed into public/.
// Vercel serves public/ as the Output Directory (see vercel.json).
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const out = path.join(root, "public");

// Run the checks first so a broken site never gets staged.
execFileSync(process.execPath, [path.join(__dirname, "check.js")], { stdio: "inherit" });

// Everything the live site needs. Local scratch files (old.html, test.html, Backup/, ...)
// and build tooling stay out of the deployment.
const entries = [
  "index.html",
  "favicon.ico",
  "icon-192.png",
  "icon-256.png",
  "apple-touch-icon.png",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "google21a248609224cf2d.html",
  "css",
  "js",
  "img",
  "assets",
  "web",
];

fs.rmSync(out, { recursive: true, force: true });
for (const entry of entries) {
  const from = path.join(root, entry);
  if (!fs.existsSync(from)) {
    console.warn(`Skipping missing entry: ${entry}`);
    continue;
  }
  fs.cpSync(from, path.join(out, entry), { recursive: true });
}
console.log(`Staged ${entries.length} entries into public/`);
