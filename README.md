# 📕 why?

🌸 **Share 50 personalized reasons why you love someone, in a single link.**

[![Live demo](https://img.shields.io/badge/demo-live-e11d63?style=flat-square&logo=vercel&logoColor=white)](https://love-list-mu.vercel.app)
[![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Motion-13-ff0055?style=flat-square&logo=framer&logoColor=white)](https://motion.dev)
[![Node](https://img.shields.io/badge/node-%E2%89%A5%2020.19-5fa04e?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
![Languages](https://img.shields.io/badge/languages-es%20%C2%B7%20en%20%C2%B7%20pt%20%C2%B7%20fr-7a2247?style=flat-square)
![No backend](https://img.shields.io/badge/backend-none-2ea44f?style=flat-square)

**why?** is a romantic single-page application (SPA) built with **Vite**, **React**, **TailwindCSS** and **Motion**.
You write a name, pick how the page should feel, and share a link. There is no account and no database: the whole page lives inside the link.

🔗 **Live Demo:** [https://love-list-mu.vercel.app](https://love-list-mu.vercel.app)

---

## 💡 Features

- ✨ **50 reasons, generated for you:** a fresh selection every time, with a *Shuffle* button before you share.
- 🎭 **Four ways to present the page.** The creator chooses one when making the link:
  - **One at a time:** full-screen cards you swipe, flick, tap or move with the arrow keys.
  - **Envelope:** a sealed letter that opens with a tap, then the reasons drop in as notes.
  - **Lyrics:** reasons glow one by one like a song, with autoplay and pause.
  - **Scroll story:** one reason per screen with snap scrolling and a drifting background.
- 🎨 **Six color moods:** Rose, Sunset, Midnight, Lavender, Mint and Gold.
- 💬 **Name control:** show the person's name *Never*, *Sometimes* or *Always* inside the reasons, with an optional pet name (e.g. "mi vida") used in its place.
- ✉️ **Sender and message:** an optional "from" name and a personal message shown in the letter or closing card.
- ⏳ **Links last 24 hours:** each page shows a countdown and then an "expired" screen.
- 🌍 **Multilingual:** Español, English, Português and Français. The page is shown in the language chosen when it was created.
- 📳 **Optional vibration** on supported devices, with a mute toggle.
- ♿ **Accessible motion:** respects `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast`.
- 🔗 **Easy sharing:** native share sheet on mobile, copy-link everywhere else.

---

## 🔐 How links work

Nothing is stored on a server. The link contains a small JSON payload, encoded as base64url:

| Field | Meaning |
|-------|---------|
| `n`, `f`, `m` | Name, sender and message |
| `s` | Random seed that regenerates the same 50 reasons |
| `l` | Language of the page |
| `x`, `p` | Experience and color mood |
| `k`, `a` | Name mode and optional pet name |
| `e` | Expiry time (creation + 24 hours) |

Every field is validated when a link is opened, so unknown values or oversized text are rejected.

**Things to know**

- The expiry is checked in the browser. It hides the page after 24 hours but is **not** a security boundary: anyone who edits the link could change the date, and the content is always readable from the URL itself. Truly enforced expiry would need a backend (signed links or a database with a TTL).
- Links created before the expiry field existed are treated as expired.
- Only share a link with the people you mean to. Anyone who has it can read it.
- Vibration relies on the browser Vibration API, which iOS Safari does not support.

---

## 🧠 Technology Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | Build tool & dev server |
| **React 19** | Frontend UI library |
| **TypeScript** | Type safety |
| **TailwindCSS 4** | Utility-first styling |
| **Motion** | Spring animations, gestures and scroll effects |
| **React Router** | Client-side navigation |
| **Canvas-Confetti** | Visual celebrations |
| **React-Hot-Toast** | Notifications |
| **sharp** *(dev)* | Renders the hero and social-preview images |
| **Vercel** | Hosting & deployment |

---

## 📦 Project Structure

```text
src
├── app                 router and providers
├── components
│   ├── create          experience, name-mode and palette pickers
│   ├── experience      shell + the four experiences (story, envelope, lyrics, scroll)
│   ├── layout          navbar, footer, app layout
│   ├── love            reason card
│   └── ui              buttons, language select, animated counter
├── constants           experiences, palettes, name modes, reasons per language
├── hooks               countdown
├── i18n                translations, language provider
├── pages               Home, Create, Love, Privacy, NotFound
├── styles              global CSS and design tokens
└── utils               reasons generator, link encoding, sharing, haptics, physics
art/hero.svg            source of the hero background
scripts/                image build script
```

---

# 🚀 Getting Started

## 🧩 Prerequisites

- Node.js (>= 20.19)
- npm (>= 10)

## 📌 Installation & Local Development

```bash
git clone https://github.com/RandyMadrigal/LoveList.git
cd LoveList
npm install
npm run dev
```

### Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts the dev server |
| `npm run build` | Type-checks and builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

### Deployment

The app is a static SPA. `vercel.json` rewrites every path to `index.html` so links like `/love/<token>` work when opened directly.

---

## 🛠️ Customizing

**Add a language**

1. Add the code to `LANGS` and `LANG_LABELS` in `src/i18n/translations.ts`, then add a dictionary with every key.
2. Add a reasons file like `src/constants/reasons.es.ts` and register it in `src/constants/reasons.ts` with its prefix (e.g. "Because").

**Add a color mood**

Add an id to `PALETTE_IDS` and its colors to `PALETTES` in `src/constants/palettes.ts`, then add a `palette.<id>` label to every language. Keep the background dark so white text stays readable.

**Add an experience**

1. Add its id to `EXPERIENCES` in `src/constants/experiences.ts`.
2. Create a component in `src/components/experience/` that accepts `ExperienceProps`.
3. Register it in `src/pages/Love/LovePage.tsx` and add its icon and `exp.<id>.name` / `exp.<id>.desc` labels.

**Change the hero image**

The background comes from `art/hero.svg`. After editing it, run:

```bash
node scripts/build-images.mjs
```

This rebuilds `public/hero.jpg` (home and love-page background) and `public/og.jpg` (social preview).

> For link previews on WhatsApp or Twitter, set `og:image` in `index.html` to an absolute URL once you have your final domain.
