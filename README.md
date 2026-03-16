# 📕 LoveList

🌸 **A Beautiful App to  Share Personalized “Reasons Why I Love You”**

LoveList is a romantic single-page application (SPA) built with **Vite**, **React**, **TailwindCSS**, and **Firebase**.  
It lets users use a custom list of reasons why they love someone and share it via a unique URL.

🔗 **Live Demo:** [https://love-list-mu.vercel.app](https://love-list-mu.vercel.app)

---

## 💡 Features

- ✨ **Personalized Generation:** Generate a list of ❤️ *50 reasons why I love you*.
- ✨ **Persistence:** Saves each list to **Firebase Firestore**.
- ✨ **Shareable Links:** Unique URL for every list (`/love/:slug`).
- ✨ **Animated UI:** Includes confetti, floating badges, and smooth fade-in effects.
- ✨ **Social Sharing:** Mobile-friendly share/copy link functionality.
- ✨ **Interactive Elements:** Animated counters and polished transitions.

---

## 🧠 Technology Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | Build tool & dev server |
| **React** | Frontend UI library |
| **TailwindCSS** | Utility-first styling |
| **Firebase Firestore** | NoSQL Database |
| **React Router** | Client-side navigation |
| **Canvas-Confetti** | Visual celebrations |
| **React-Hot-Toast** | Stylish notifications |
| **Vercel** | Hosting & Deployment |

---

## 📦 Project Structure

```text
src
├── app
│   ├── providers.tsx
│   └── router.tsx
├── components
│   ├── ui
│   └── love
├── constants
│   └── loveReasons.ts
├── hooks
│   └── useLovePage.ts
├── pages
│   ├── Home
│   ├── Create
│   ├── Love
│   └── NotFound
├── services
│   └── firebase
│       ├── firebaseConfig.ts
│       └── loveService.ts
├── utils
│   ├── generateSlug.ts
│   └── generateReasons.ts
├── styles
│   └── globals.css
└── main.tsx
```

# 🚀 Getting Started

## 🧩 Prerequisites

Make sure you have installed:

- Node.js (>= 16.x)  
- npm (>= 8.x)  
- A Firebase project account

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

### Configure Environment Variables
- Create a .env file in the root directory and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender
VITE_FIREBASE_APP_ID=your_app_id
```

### Run the development server

```Bash
npm run dev
```

## 🔧 Firebase Setup

- Go to the Firebase Console.
- Create a new project.
- Enable Firestore Database in test mode (or set production rules).
- Register a new Web App and copy the configuration.
- Ensure your .env matches the provided config.

---

## 🏠 Routes

| Route | Description |
| :--- | :--- |
| `/` | **Home Page** |
| `/create` | Generate reasons & create shareable link |
| `/love/:slug` | View the personalized love list |
| `*` | **404 Not Found** |

---

## 💬 Contribution

Feel free to submit issues and pull requests.  
Improvements, bug fixes, and UI polish are always welcome ❤️.

---

## 💖 Made With Love

This project was created to spread love and help express affection in a creative way.

**Built by Randy Madrigal.**

---

## 🪄 License

Distributed under the **MIT License**.


