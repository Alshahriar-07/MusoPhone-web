# MusoPhone website

Static site for <https://musophone.vercel.app/>, deployed on Vercel. Created by
[Al Shahriar Sowan](https://alshahriarsayon.vercel.app/), published by Eagox Studio.

## Install and run

Node 18 or newer. There are no dependencies to install.

```bash
npm run dev      # http://localhost:3000  (set PORT to change)
npm run build    # production check: syntax, JSON, JSON-LD, anchors, local files
```

There is no compile step and no output folder: Vercel serves the project root
and runs `api/download.js` as a function. Use the "Other" framework preset and
leave the output directory empty.

## Files you must add

| URL path used by the site | Put files in | Expected files |
|---|---|---|
| `/web/assets/` | `web/assets/` or `web-assets/` | `web-player`, `web-lyrics`, `web-home`, `web-extensions`, `web-about`, each `.png` (`.webp` optional, preferred when present) |
| `/assets/` | `assets/` or `asset/` | `MusoPhoneBanner.png` (1672×941), `icon.png` (1024×1024) |
| `/` | project root | `favicon.ico`, `icon-192.png`, `icon-256.png`, `apple-touch-icon.png` |

`vercel.json` rewrites the first column to the `web-assets/` and `asset/`
spellings when the file is not at the original path. Names are case-sensitive.
Screenshots are shown at about 1870×1000. Without them the showcase displays a
plain "preview is unavailable" notice.

`img/` (app screenshots, covers, icon) was extracted from the previous inline
images and is part of the source.

## Remaining manual steps

1. Add the files above, then run `npm run build` until it reports 0 awaiting.
2. In Vercel, set `DLINK` to the APK URL. Without it, Download goes to GitHub Releases.
3. Search Console: `google21a248609224cf2d.html` is included for the HTML-file
   method. The old `google-site-verification` meta tag holds the same name, which
   is not the format of a meta-tag token; if you use the meta method, replace it
   with the token Search Console gives you.
4. Submit `https://musophone.vercel.app/sitemap.xml`. Indexing and ranking are not guaranteed.
5. After deploying, run Lighthouse or PageSpeed Insights on the live URL.

## Changing things

- After editing `css/style.css` or `js/main.js`, no cache busting is needed
  (they revalidate on each visit).
- Images in `img/` are cached for 30 days; rename a file when you replace it.
- Intro timing lives in `--t0` (CSS) and `T0` (JS); keep them equal.
