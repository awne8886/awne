# awne.me — Full Renovation Prompt

> Paste everything below the line into your AI coding agent (Claude Code, etc.), opened in the `awne8886/awne` repository.

---

You are renovating **awne.me**, a personal website and playground of small web toys. The goal is a full rebuild: modern, fast, accessible, secure and easy to maintain, while **keeping the site's personality**. It's playful, a bit chaotic, self-aware and jokey ("awne is kewl", the troll button, the cursed quote generator, the theme and font rotators). The result should feel like the same person made it after leveling up, not like a corporate template.

Read the whole repository before changing anything. Then work in the phases below, and commit after each phase with a clear message.

## 0. Current state (what you are inheriting)

- Static site, hosted on **GitHub Pages** with the root `CNAME` set to `awne.me`. Older domains and URLs also appear in the code: `awne.xyz`, `cdn.awne.xyz`, `*.pages.dev`.
- Homepage: `index.html`, `styles.css`, `main.js`. It has a "click to enter" splash, a top nav, Home/About/Links/Projects sections, a quote generator, a theme rotator (8 palettes) and a font rotator.
- Sub-projects, one per folder: `chess`, `stockfish`, `cubes`, `Window3D` (linked as `/box`), `jibbertyper`, `linkbandit`, `rotcustom`, `flipflop`, `pingpong`, `christmasTree`, `christmasDecor`, `idk`, `nonsense`, `parrot`, `Chat GPT 3.5`.
- A pixel-art reskin was tried and reverted. **Don't** make the new design pixel-art or retro-CRT unless asked.

## 1. Security and privacy first (do this before anything else)

1. **`Chat GPT 3.5/script.js` contains a hard-coded OpenAI API key** (`sk-...`). Delete the key from the code. Tell the owner to **revoke it at platform.openai.com right away**, because it's already in public git history. Rebuild this project later (see §4) or remove it.
2. **`discord.js` contains a Discord webhook URL and an ipinfo.io token**, and it's a visitor IP and location logger. It's loaded on the homepage. In a browser it does nothing, because it's Cloudflare Worker code, but the secrets are public. Remove the file and its `<script>` tag. Tell the owner to **delete the webhook in Discord and rotate the ipinfo token**. Don't rebuild IP logging. If the owner wants visitor stats, use a privacy-friendly, cookieless tool such as Cloudflare Web Analytics, Plausible or GoatCounter, and add a short privacy note in the footer.
3. Grep the whole repo and its history for any other tokens, keys or webhooks, and list what you find. Rewriting history is the owner's call: suggest it, but don't do it.
4. **Linkbandit** has "Discord Nitro" (`discord.gift/...`) and Discord-invite presets that produce fake-looking gift links. That's a common scam pattern and can get the domain flagged. Remove those presets, or reframe the tool as a harmless random-string or slug generator.
5. Replace `innerHTML` with user-controlled or data strings with `textContent` everywhere it's touched.

## 2. Known bugs to fix or account for

- **Quote generator freezes the tab:** after every quote has been shown once, the `while` loop in `genQuote()` never exits, because `usedQuotes` is never reset and `quotesUsed` is never incremented. Use a shuffle-bag instead.
- **Dead links:** the homepage and the CNAME files point at `/box`, `/decor`, `/tree` and `/chatgpt`, but the folders are `Window3D`, `christmasDecor`, `christmasTree` and `Chat GPT 3.5`. Those URLs 404 today. Subfolder `CNAME` files do nothing on GitHub Pages; delete them.
- **`404.html`** fires an insulting `alert()` and then redirects home, which also creates a soft-404 for search engines. Replace it with a real, on-brand 404 page: funny copy, a link home and links to a few projects.
- **Stockfish** (`/stockfish`) doesn't work. `Chess()` is used but chess.js is never loaded. The script path uses backslashes (`chessboardjs-1.0.0\js\...`). The board script runs in `<head>` before `#board1` exists. jQuery, which chessboard.js needs, is missing. `stockfish.js` (1.3 MB, asm.js) is loaded twice: as a `<script>` and as a Worker. It isn't linked from the homepage. Either merge it into `/chess` as a "vs Stockfish" mode using a modern lazy-loaded Stockfish WASM worker, or fix it properly.
- **Window3D / BOX:** references `main.js` and `script.js`, which don't exist. The favicon URL ends in `.jpgs`. The description says "three.js" but the page is pure CSS.
- **Pingpong:** an infinite redirect loop (`index.html` ↔ `index2.html`) that floods the visitor's back-button history. There's also a stray `S` after the script. If you keep the joke, make it bounce a few times on a timer, then land on a "you've been bounced N times" page with a way out.
- **Parrot:** needs an Express server that can't run on GitHub Pages, and `server.js` returns file *paths* (with backslashes), not frame contents. Rebuild it fully client-side: fetch the `.ansi` frames or inline them, then animate them in a `<pre>`, honoring `delay.env`.
- **Favicons and OG images** in `idk` and `nonsense` point at a prnt.sc page and a GitHub `blob` page, both HTML and not images. Many images are hot-linked from `ucarecdn.com` and `cdn.awne.xyz`. Bring every image into the repo, optimize it (WebP/AVIF plus PNG fallback) and reference it locally.
- **Jibbertyper anti-cheat** reloads the whole page on *any* paste, including into its settings inputs. Scope it to the typing area only, and show an inline message instead of `alert()`.
- **Chess** and **Christmas** pages still carry CodePen boilerplate: `cpwebassets.codepen.io` CSS and `stopExecutionOnTimeout` JS, plus `s.cdpn.io` fonts. Remove those dependencies.
- **Cubes** pins three.js r95 (2018) from a CDN. Upgrade to a current three.js ES module build, or vendor the pinned version locally.

## 3. Homepage and site-wide problems to fix in the rebuild

- The global `*` rule puts a margin of 5%, a background and a 0.4s transition on **every element**. That causes layout chaos, janky repaints, and transitions on things that should never animate. Start the CSS from scratch.
- `<subsection>` isn't a valid HTML element. Use semantic markup: `header`, `nav`, `main`, `section`, `article`, `footer`, with a correct heading order (only one `h1`).
- The splash "click to enter" screen hides all content until a click. That's bad for SEO, screen readers and impatient visitors. Make the intro animation optional and skippable, and never block content or crawlers. Respect `prefers-reduced-motion`.
- The scrolling `document.title` (it fires `setTimeout(…, 0)` repeatedly) is annoying for screen readers and tab managers. Drop it, or run it only while the tab is hidden.
- Project and social buttons use `onclick="window.open(links[n])"`. Replace them with real `<a href>` links, which middle-click, crawlers and keyboards can all use. Don't use link shorteners such as `goo.su` for Instagram; link directly.
- Fonts: 7 Google Font families load through render-blocking `@import`, yet the default font (`Victor Mono`) is never loaded, and half the fonts in the font rotator aren't loaded either. Use 1–2 self-hosted variable fonts with `font-display: swap`, and give the rotator only fonts that are actually loaded, loading them lazily when picked.
- Meta tags: OG tags use `name=` instead of `property=`, `theme-color` uses `property=`, Twitter cards are missing, canonical URLs point at the wrong domain, and the copyright says "2020-2050". Fix them all, with a unique title, description and OG image per page.
- `sitemap.xml` is from 2023 and lists only 7 URLs. Generate it at build time. Add `robots.txt`. Keep `google7947d8b92a75506b.html` (Search Console verification). Delete the unused `loaderio-*` files and `redirect.htaccess`, which GitHub Pages ignores.
- The layout isn't responsive below about 900px beyond one breakpoint, font sizes use `vw` units only (`2.5vw` headings get unreadable on phones), and the theme and font buttons sit at `top: 85%; left: 90%`, where they cover content on mobile.
- Accessibility: no visible focus styles, low contrast in several of the 8 palettes, emoji and joke text without context. Target WCAG 2.2 AA in every theme.

## 4. Target architecture

- **Framework:** [Astro](https://astro.build) (static output) with TypeScript. Each toy stays a self-contained page or island and ships zero JS unless it needs it. If the owner prefers zero tooling, fall back to plain HTML/CSS/JS with a tiny shared stylesheet and partials. Confirm with the owner before choosing.
- **Project registry:** one data file (`src/data/projects.ts` or `projects.json`) holding each project's slug, title, one-line pitch, tags (game / tool / visual / seasonal / experiment), status (live / archived / WIP), year, thumbnail, OG image, source credit and license. The homepage grid, the sitemap, per-project meta and the "more projects" footer all come from it.
- **URLs:** keep every currently-advertised URL working: `/chess`, `/cubes`, `/jibbertyper`, `/linkbandit`, `/rotcustom`, `/flipflop`, `/pingpong`, `/box`, `/tree`, `/decor`, `/idk`, `/nonsense`, `/parrot`, `/stockfish`. Use lowercase, hyphenated slugs. Add redirect stubs for old paths and folder names (`/Window3D`, `/christmasTree`, `/stockfish` → `/chess?mode=stockfish` if merged, and so on).
- **Shared shell:** every project page gets a slim, consistent header bar ("← awne.me", the project name, a theme toggle and a "view source / credits" link) that the toy can collapse for fullscreen.
- **Design tokens:** keep the 8 existing palettes, plus the current yellow/black default, as a real theme system: CSS custom properties, persisted in `localStorage` (wrapped in try/catch), defaulting to `prefers-color-scheme`. Every palette must pass contrast checks. Turn the theme and font rotators into a small, tidy "customize" popover instead of two floating buttons.
- **Deploy:** a GitHub Actions workflow that builds and deploys to GitHub Pages with the root `CNAME` set to `awne.me`. Add a CI job that runs the build, an HTML validator, a link checker (to catch the `/box` class of bug) and Lighthouse CI with budgets (see §7).
- **Credits and licensing:** chess, cubes and the Christmas pieces look adapted from CodePen or open-source work. Find the original authors and licenses (e.g. three-rounded-box, chessboard.js is MIT) and credit them on each project page and in a `/credits` page. Keep `LICENSE` files that already exist.

## 5. Design direction

- **Vibe:** "personal site as an arcade or toybox". Bold, oversized, playful type. A grid of project "cartridges" or cards with looping preview thumbnails or short muted video, hover tilt, and tags. Confident whitespace. Jokes live in the copy and the micro-interactions, not in broken layouts.
- **Keep the personality:**
  - The "This button does nothing!" troll button, now a toast or a tiny animation instead of `alert()`.
  - The quote generator as a featured widget, with copy/share and a "suggest a quote" link.
  - The first-person, slightly unhinged tone of the About section, rewritten so it reads well.
  - The HTML source comment greeting, plus a console greeting easter egg.
  - One or two hidden easter eggs: a Konami code, or clicking the logo N times.
- **Motion:** purposeful and fast (150–300ms). Reuse the old "wipe" transition for theme changes only. Everything respects `prefers-reduced-motion`.
- **Mobile-first:** every toy must either work on touch or say clearly that it needs a keyboard or desktop.

## 6. New content and features to add

1. **Projects page** (`/projects`): filter by tag, search, sort by newest or most-played. Archived and seasonal items (Christmas) are shown but labeled, and seasonal ones can be auto-featured in December.
2. **About page:** a proper bio, current interests (photography, German, gaming, dogs, cooking noodles), a "now" section, and a tools/stack section.
3. **Photography gallery** (`/photos`): the owner does photography. Build a responsive, lazy-loaded grid with a lightbox, EXIF captions and optimized responsive images. Use placeholder slots; the owner supplies the photos.
4. **Links hub:** Snapchat, Instagram, GitHub and a Discord server invite (the old copy mentions Discord but never links it), as real links with icons. It can double as a link-in-bio page (`/links`).
5. **Devlog / blog** (`/log`, Markdown or MDX content collection) for short posts about new toys. Include an RSS feed.
6. **Guestbook or quote suggestions:** a privacy-respecting form for suggesting quotes, through a form service or GitHub Issues link. Store no IPs.
7. **Rebuilt or new toys:**
   - **Chat:** the old ChatGPT page can't be done safely client-side. Either remove it, or rebuild it behind a serverless proxy (Cloudflare Worker) with the key in a secret, rate limiting and a current model. Ask the owner which.
   - **Chess:** one page with modes for 2-player local, vs Stockfish (difficulty slider), and AI vs AI, using chess.js plus a lazy-loaded Stockfish WASM worker.
   - **Parrot:** the client-side ANSI parrot from §2.
   - **Pingpong:** the bounded, funny version from §2.
   - Group `idk` and `nonsense` (falling-particle canvases) into one "visuals" toy with variants and controls.
8. **PWA basics:** a web app manifest, a proper icon set (generated from a single SVG logo), and an offline fallback page.
9. **Command palette (⌘/Ctrl+K)** to jump to any project or page. It fits the "toybox" feel.
10. **Shareability:** a per-project OG image (auto-generated at build from the registry, e.g. with Satori) and a "share" button using the Web Share API with a copy-link fallback.

## 7. Quality bar / acceptance criteria

- Lighthouse (mobile) ≥ 95 for Performance, Accessibility, Best Practices and SEO on the homepage and the projects page. Heavy toys (cubes, chess) may score lower on Performance but must lazy-load their engines.
- Homepage JS ≤ 30 KB gzipped. No render-blocking third-party requests. CLS < 0.05. LCP < 2s on a mid-range phone.
- Zero secrets in the repo (a CI secret scan passes). Zero broken internal links (link-checker CI passes). Valid HTML.
- Keyboard-only navigation works everywhere, with visible focus. Color contrast meets AA in every theme. Every image has alt text. Reduced motion is honored.
- Every old public URL either works or redirects.
- Works in the latest Chrome, Firefox and Safari, and on iOS/Android at 360px width with no horizontal scroll.
- A `README.md` covers how to run, build and deploy, how to add a new project (one registry entry plus one folder or page), and credits.

## 8. Working agreement

- Start with **Phase 1 (security)** and a written plan listing every file you'll move, delete or rewrite. Show it to the owner before Phase 2.
- Phases: 1) security cleanup → 2) scaffold the framework, design tokens and shared shell → 3) homepage, about and links → 4) migrate the toys one at a time, fixing each one's bugs → 5) new features (§6) → 6) SEO, PWA, CI and performance pass → 7) final QA against §7.
- Ask before deleting any project outright, choosing the Chat approach, or adding any paid service.
- Don't invent personal facts about the owner. Leave clearly marked `TODO(awne):` placeholders for bio details, photos and social handles to confirm.
