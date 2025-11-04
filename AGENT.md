# 🧭 AGENT.md — Akbar’s Personal Website Builder

## Project Overview
Create a **minimalist, text-focused personal website** for **Muhamad Akbar Afriansyah**, blending calm design and deep storytelling.  
The tone should feel **reflective, intelligent, and modern**, combining **pastel-dark colors** with **interactive micro-animations** and an **intuitive mobile + desktop experience**.

This is not a résumé site — it’s a living narrative about Akbar’s mindset, projects, and journey.

---

## 🎨 Aesthetic & Brand Identity
**Design Language:** Minimalist, soft pastel over dark base  
**Mood:** Calm, thoughtful, elegant, introspective  

**Color Palette**
| Role | Hex | Notes |
|------|------|-------|
| Background | `#1e1e1e` | Dark, slightly warm base |
| Foreground | `#e0dede` | Main text color |
| Muted text | `#bdbbbb` | Subtext |
| Accent 1 | `#c8a2c8` | Lavender |
| Accent 2 | `#89a8b2` | Dusty teal |
| Accent 3 | `#ffd7b5` | Soft peach for highlights |

**Typography**
- Headings: `Inter` or `Plus Jakarta Sans`
- Body: `Source Serif Pro` or `Geist Serif`
- Max width: `68ch`
- Line-height: `1.8`
- Responsive with generous whitespace

---

## 🧠 Site Structure

| Path | Purpose |
|------|----------|
| `/` | Hero intro with typewriter effect (“Hi, I’m Akbar.”) |
| `/about` | Long-form MDX essay about Akbar’s philosophy |
| `/projects` | Project cards with animations & process detail pages |
| `/essays` | List of reflective essays in MDX |
| `/now` | “What I’m working on now” page |
| `/quotes` | Interactive rotating quote carousel |
| `/contact` | Simple social & email links |

---

## ⚙️ Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + @tailwindcss/typography
- **Animation:** Framer Motion
- **Content:** MDX
- **Components:** shadcn/ui (selectively)
- **Deployment:** Vercel  
- **Optional:** Vercel Analytics / Plausible

---

## 🧩 Core Interactions
1. Typewriter intro (with skip option)
2. Scroll progress bar for reading
3. Command palette (`cmdk`) with fuzzy search
4. Scrollspy active section indicator
5. Expandable footnotes/definitions
6. Quote carousel (auto + manual)
7. Keyboard shortcuts: `j/k` (navigate), `t` (top)
8. Accessible focus-visible styling, smooth transitions

---

## 🪜 5-Step Development Plan

### **Phase 1 — Setup & Theming**
- Convert starter to Next.js App Router if needed  
- Install Tailwind + Typography  
- Define color tokens & fonts  
- Build layout scaffold and global CSS  
- Acceptance: Base theme visible and responsive  

### **Phase 2 — Core Components**
- Header/Footer  
- Typewriter intro  
- Reading progress bar  
- Scrollspy TOC  
- Command palette (cmdk)  
- Expandable footnotes  
- Quote rotator component  
- Acceptance: All interactions function smoothly at 60fps  

### **Phase 3 — Content Integration**
- Setup MDX routing  
- Build `/about`, `/projects`, `/essays`, `/now`, `/quotes`, `/contact`  
- Seed with 2 essays + 2 projects  
- Acceptance: MDX content loads dynamically & indexed properly  

### **Phase 4 — Polish & Accessibility**
- Optimize for color contrast and keyboard use  
- Implement reduced-motion preference  
- Add reading time, last updated metadata  
- Acceptance: Lighthouse ≥95, accessible on iPhone & Android  

### **Phase 5 — Deploy**
- Configure SEO & OG images  
- Add analytics  
- Deploy to Vercel with domain (e.g. `akbarafriansyah.me`)  
- Acceptance: Deployed & shareable production link  

---

## ✅ Success Criteria
- Interactive yet minimalist UI  
- Consistent pastel-dark theme  
- Fully responsive experience  
- Easy to add content (MDX drop-in)
- Smooth performance and accessibility compliance

---

## 🧰 Commands
```bash
pnpm add framer-motion cmdk lucide-react next-mdx-remote zod
pnpm add -D @tailwindcss/typography
```

---

## ✍️ Developer Notes
- Keep interactions subtle and elegant (avoid parallax or heavy effects).
- Prioritize writing readability and mobile touch ergonomics.
- Every element should “breathe” — whitespace is part of the design.
- Use comments in code to describe design intent, not just logic.

---

## 📘 Credits
Project lead: **Muhamad Akbar Afriansyah**  
Persona: Rational dreamer, builder, and thinker.  
Theme: “Clarity through simplicity.”

---