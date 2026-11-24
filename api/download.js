// Vercel Serverless Function
// Set DLINK=https://your-hosted-apk-url in Vercel Project Environment Variables.

module.exports = (req, res) => {
  const downloadUrl = process.env.DLINK;

  if (!downloadUrl) {
    return res.status(503).send(
      "Download is not configured yet. Please try again later."
    );
  }

  try {
    const parsed = new URL(downloadUrl);

    if (!["https:", "http:"].includes(parsed.protocol)) {
      return res.status(500).send("Invalid DLINK configuration.");
    }

    return res.redirect(302, parsed.toString());
  } catch {
    return res.status(500).send("Invalid DLINK configuration.");
  }
};