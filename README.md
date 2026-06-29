# Moksh Buddhadev — AI/ML Engineer Portfolio

A premium, highly interactive portfolio built for Moksh Buddhadev, an AI/ML Engineer and final-year CS student at Manipal University Jaipur. The portfolio is designed with a focus on deep aesthetics, hardware-accelerated animations, and an immersive user experience.

![Portfolio Preview](/public/og-image.png)

## 🚀 Live Demo
**[mokshbuddhadev.vercel.app](https://mokshbuddhadev.vercel.app)** *(Replace this with your actual Vercel URL if it differs)*

## 🛠️ Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (for advanced micro-animations and GPU optimizations)
- **3D Graphics:** React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Animations:** GSAP (GreenSock) + Native CSS Grid Transitions
- **Deployment:** Vercel

## ✨ Key Features
- **Immersive 3D Hero:** Custom WebGL shaders featuring a pulsating core, counter-rotating Icosahedron wireframes, and a dynamic sine-wave particle field.
- **Buttery Smooth Interactions:** Complex hover states handled via native CSS Grid transitions to eliminate JavaScript overhead and jitter.
- **Interactive Skills Galaxy:** A 3D Fibonacci sphere mapping out technical skills with custom raycasting for interaction.
- **Custom Cursor Engine:** Smooth-following glowing trail cursor built without relying on heavy GSAP tickers.
- **Performance Optimized:** carefully constrained Device Pixel Ratios (DPR) and `will-change` hints for strict GPU offloading.

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MokshBuddhadev/moksh-portfolio.git
   cd moksh-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the site:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
- `/app` — Next.js routing and global layout/styles.
- `/components/hero` — React Three Fiber 3D scene files (`FloatingOrb`, `ParticleField`, `TerrainBackground`).
- `/components/sections` — Main content sections (`About`, `Projects`, `Skills`, `Research`, `Beyond`, `Contact`).
- `/components/ui` — Reusable components (`ProjectCard`, `CursorTrail`, `MetricPill`).
- `/lib` — Data files (`projects-data.ts`, `skills-data.ts`) and global configs (`gsap.ts`).

## ⚙️ Updating Content
- **Projects:** Edit `/lib/projects-data.ts`.
- **Skills:** Edit `/lib/skills-data.ts`.
- **Resume:** Replace `Moksh_Resume.pdf` in the `/public` directory.

## 📄 License
This project is for personal use by Moksh Buddhadev. Feel free to draw inspiration, but please do not copy the exact design or source code.
