// Vercel Serverless Function
// Set DLINK=https://your-hosted-apk-url in Vercel Project Environment Variables.
// If DLINK is missing or invalid, visitors are sent to GitHub Releases instead of an error page.

const FALLBACK = "https://github.com/Alshahriar-07/Musophone/releases";

module.exports = (req, res) => {
  let target = FALLBACK;
  try {
    const parsed = new URL(process.env.DLINK);
    if (["https:", "http:"].includes(parsed.protocol)) target = parsed.toString();
    else console.error("DLINK must be an http(s) URL.");
  } catch {
    console.error("DLINK is not set or is not a valid URL.");
  }
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  return res.redirect(302, target);
};
