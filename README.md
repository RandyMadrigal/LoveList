# 📕 why?

🌸 **A Beautiful App to  Share Personalized “Reasons Why I Love You”**

why? is a romantic single-page application (SPA) built with **Vite**, **React**, **TailwindCSS**, and **Motion**.  
It lets users use a custom list of reasons why they love someone and share it via a unique URL.

🔗 **Live Demo:** [https://love-list-mu.vercel.app](https://love-list-mu.vercel.app)

---

## 💡 Features

- ✨ **Personalized Generation:** Generate a list of ❤️ *50 reasons why I love you*.
- ✨ **No backend:** each love page lives entirely inside its shareable link.
- 🌍 **Multilingual:** Español, English, Português and Français.
- ✨ **Shareable Links:** every page is encoded in its own URL (`/love/:token`), so nothing needs to be stored on a server.
- ✨ **Animated UI:** Full-screen hero, confetti and spring animations that respect `prefers-reduced-motion`.
- ✨ **Social Sharing:** Mobile-friendly share/copy link functionality.
- ✨ **Interactive Elements:** Animated counters and polished transitions.

---

## 🧠 Technology Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | Build tool & dev server |
| **React** | Frontend UI library |
| **TailwindCSS** | Utility-first styling |
| **Motion** | Spring animations |
| **React Router** | Client-side navigation |
| **Canvas-Confetti** | Visual celebrations |
| **React-Hot-Toast** | Stylish notifications |
| **Vercel** | Hosting & Deployment |

---

## 📦 Project Structure

```text
src
├── app            (router, providers)
├── components     (layout, ui, love)
├── constants      (reasons per language)
├── i18n           (translations, language provider)
├── pages          (Home, Create, Love, Privacy, NotFound)
├── utils          (reasons generator, link encoding, sharing)
├── styles
│   └── globals.css
└── main.tsx
```

# 🚀 Getting Started

## 🧩 Prerequisites

Make sure you have installed:

- Node.js (>= 20.19)  
- npm (>= 10)  

---

## 📌 Installation & Local Development

### Clone the repository

```bash
git clone https://github.com/RandyMadrigal/LoveList.git
cd LoveList
```

### Install dependencies
```bash
npm install 
```

### Run the development server

```Bash
npm run dev
```

### Build for production

```bash
npm run build    # type-checks and outputs to dist/
npm run preview  # serves the production build locally
```

## 🖼️ Regenerating the hero image

The background comes from `art/hero.svg`. After editing it, run `node scripts/build-images.mjs` to rebuild `public/hero.jpg` and `public/og.jpg`.
