# Certificate Assets (GitHub Pages)

Place your certificate files in this folder so they are bundled into the
production build and served alongside the portfolio on GitHub Pages.

## Expected files

Use these exact filenames so the portfolio resolves them automatically:

| Display name                          | PDF (preview)                              | Thumbnail / preview image (optional)                  |
|---------------------------------------|--------------------------------------------|-------------------------------------------------------|
| Claude Projects Artifacts             | `claude-projects-artifacts.pdf`            | `claude-projects-artifacts.png`                       |
| Introduction to Modern AI             | `introduction-to-modern-ai.pdf`            | `introduction-to-modern-ai.png`                       |
| Prompt Engineering Essentials         | `prompt-engineering-essentials.pdf`        | `prompt-engineering-essentials.png`                   |
| Python Essentials 1                   | `python-essentials-1.pdf`                  | `python-essentials-1.png`                             |
| AI Career Readiness Training (future) | `ai-career-readiness.pdf` (add when ready) | `ai-career-readiness.png` (add when ready)            |

Filenames are case-sensitive. Use lowercase and hyphens.

## How it works

1. Everything inside `client/public/` is copied verbatim to the build output
   by Vite (no transformations, no hashing).
2. In `client/src/pages/Home.tsx` the `certificateAssets` map references
   `/certificates/<filename>` — Vite's `base: "./"` then rewrites those URLs
   to relative paths during `vite build`, so they resolve correctly whether
   the site is hosted at `username.github.io` or
   `username.github.io/jude-yap-aerospace-portfolio`.
3. If a PDF is missing, the certificate card still renders (title, provider,
   date, credential code) and the modal shows a "preview not uploaded yet"
   message rather than a broken iframe.
