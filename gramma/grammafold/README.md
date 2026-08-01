# Grammafold marketing site

Static marketing website for [Grammafold](https://github.com/geneparcellano/grammafold), a macOS app that organizes photos and videos into date-based folders.

## Pages

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/privacy/` | Privacy policy (Mac App Store) |
| `/support/` | Support and FAQ (Mac App Store) |

## Deployment

This site is plain HTML, CSS, and JavaScript with no build step. Deploy the `gramma/grammafold/` directory to any static host.

**GitHub Pages:** Serve from the repository root. The site URL is:

```
https://geneparcellano.com/gramma/grammafold/
```

## Assets to replace

- `assets/icon.png` — 256×256 app icon; replace with `icon_512x512.png` for higher-resolution social previews if desired
- Mac App Store: https://apps.apple.com/us/app/grammafold/id6793012279?mt=12

## Local preview

```bash
cd gramma/grammafold
python3 -m http.server 8080
```

Open `http://localhost:8080/`.

## Fonts

The wordmark uses [Cabin](https://fonts.google.com/specimen/Cabin) (OFL license) loaded from Google Fonts.
