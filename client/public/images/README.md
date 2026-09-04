# Visual Assets (GitHub Pages)

Place image assets referenced by the portfolio here. These files are copied
verbatim into the production build by Vite, and the `base: "./"` setting makes
them resolve correctly on GitHub Pages (whether the site is hosted at the root
or under the repo sub-path).

## Expected files

Use these exact filenames so the portfolio resolves them automatically:

| Purpose                   | Filename                               |
|---------------------------|----------------------------------------|
| Aircraft hero blueprint   | `aircraft-blueprint.png`               |
| Flight path / trajectory  | `flight-path.png`                      |
| System diagram (skills)   | `system-diagram.png`                   |
| Personal brand mark       | `brand-mark.png`                       |

Filenames are case-sensitive. Use lowercase and hyphens.

If you do not have a local copy yet, the portfolio still renders: each image
falls back to a CSS-only decorative panel (wireframe SVG, grid backdrop, or a
clean dark placeholder) so there are no broken `<img>` tags.
