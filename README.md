# Academic homepage

A minimalist, single-page academic homepage inspired by Scandinavian design:
warm paper tones, generous whitespace, restrained serif/sans typography, and a
single muted accent. No build step, no dependencies.

## Design notes

- **Palette** — warm off-white "paper" with soft-ink text and a muted Nordic
  slate-blue accent. Includes a light/dark theme (respects system preference,
  remembers your choice).
- **Type** — [Fraunces](https://fonts.google.com/specimen/Fraunces) for
  headings, [Inter](https://fonts.google.com/specimen/Inter) for body, loaded
  from Google Fonts.
- **Layout** — a two-column section grid (label + content) that collapses to a
  single column on small screens.
- **Motion** — subtle scroll-reveal and hover states, all disabled under
  `prefers-reduced-motion`.

## Files

| File         | Purpose                                   |
| ------------ | ----------------------------------------- |
| `index.html` | Page content and structure                |
| `styles.css` | All styling and theming (CSS variables)   |
| `main.js`    | Theme toggle, sticky header, scroll reveal |

## Running it

It's a static site — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Making it yours

- Replace the placeholder content in `index.html` (name, bio, publications,
  teaching, contact).
- Add a real `cv.pdf` to the folder (linked from the hero).
- Adjust colours in the `:root` / `[data-theme="dark"]` blocks at the top of
  `styles.css` — change `--accent` to reskin the whole site.
