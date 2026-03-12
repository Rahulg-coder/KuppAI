# KuppAI

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-brightgreen?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

A **React + Vite** project for **waste management monitoring**, featuring dashboards for admins, collectors, and residents, along with a waste detection module.

---

## Description

KuppAI is a smart waste management dashboard built using **React** and **Vite**. It includes:

- Dashboards for **Admin**, **Collector**, and **Resident** roles  
- **Login system**  
- **Waste detection module**  

The project is lightweight, extendable, and optimized for fast development with **Vite HMR**.

---

## Tech Stack

- **React 18**  
- **Vite** (fast bundling and hot module replacement)  
- **ESLint** (consistent code style)  
- Optional: **TypeScript** (for type safety)  
- `@vitejs/plugin-react` (Babel) or `@vitejs/plugin-react-swc` (SWC) for **Fast Refresh**

---

## Features

- Multiple dashboards based on user roles  
- Login authentication  
- Waste detection functionality  
- Fast development with Vite HMR  
- Minimal, extendable setup  

---

## Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Rahulg-coder/KuppAI.git
cd KuppAI
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4️⃣ Build for production

```bash
npm run build
```
The production-ready files will be in the `dist/` folder.

### 5️⃣ Lint your code
```bash
npm run lint
```

### **Project Structure**
```plaintext
KuppAI/
├─ public/                   # Static assets
├─ src/
│  ├─ assets/                # Images, icons, fonts
│  ├─ AdminDashboard.jsx     # Admin dashboard component
│  ├─ CollectorDashboard.jsx # Collector dashboard
│  ├─ ResidentDashboard.jsx  # Resident dashboard
│  ├─ Login.jsx              # Login page/component
│  ├─ WasteDetector.jsx      # Waste detection module
│  ├─ App.jsx                # Root component
│  ├─ main.jsx               # Entry point
│  ├─ storage.js             # Local storage or helper functions
│  ├─ App.css                # Component styles
│  └─ index.css              # Global styles
├─ .eslintrc.js              # ESLint configuration
├─ vite.config.js            # Vite configuration
├─ package.json
├─ package-lock.json
└─ README.md
```
### **TypeScript Integration**
For production apps, using **TypeScript** is recommended.  
You can migrate to TypeScript and enable **type-aware ESLint rules** for improved code safety.  

See the [React + TypeScript template](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) for guidance.
