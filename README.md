
# Mahmoud Moslhey — Premium Full Stack Portfolio

Premium bilingual (EN/AR) single-page portfolio with 3D hero, interactive skills
constellation, data-driven project case studies, real contact form (email + WhatsApp),
dark/light themes, RTL support and Vercel-ready serverless email backend.

## Stack

React 18 · TypeScript · Vite · Three.js (React Three Fiber + drei) · Framer Motion ·
React Hook Form + Zod · Resend (email) · CSS design-token system

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill the values.

> Note: `/api/contact` only exists when deployed on Vercel (or via `vercel dev`).
> In plain `vite dev`, the form will show the error state with direct
> Email / WhatsApp fallbacks — this is intentional, never a fake success.

## Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel.
2. Add environment variables in Vercel → Settings → Environment Variables:
   - `VITE_WHATSAPP_NUMBER=2011211117953`
   - `VITE_WHATSAPP_DISPLAY=+20 112 1111 7953`
   - `VITE_WHATSAPP_SECONDARY=+20 109 795 0437`
   - `CONTACT_EMAIL=mahmoudmoslhey932@gmail.com`
   - `RESEND_API_KEY=re_...`  (from resend.com — free tier works)
   - `EMAIL_FROM=Portfolio <onboarding@resend.dev>`
   - `EMAIL_REPLY_TO=mahmoudmoslhey932@gmail.com`
   - `SITE_ORIGIN=https://your-domain.com`
3. Deploy. The `api/contact.ts` function runs automatically as `/api/contact`.

After the first deploy, update `index.html` canonical URL and the OG image URL
to your real domain.

## Structure

```
api/contact.ts            serverless contact endpoint (validation, honeypot, rate limit, Resend)
public/
  cv/mahmoud-moslhey-cv.pdf
  images/                 project visuals, portrait, OG image
src/
  i18n.tsx                EN/AR dictionary + provider (full RTL)
  data/projects.ts        single source of truth for projects, skills, journey, links
  styles/index.css        design tokens, dark/light themes, responsive, reduced-motion
  components/
    Hero.tsx + HeroScene.tsx   3D engineering workspace (R3F, pointer parallax, mobile fallback)
    Skills.tsx            interactive technology constellation
    Projects.tsx + CaseStudy.tsx + ArchitectureDiagram.tsx
    Contact.tsx           real form -> /api/contact
    ...
```

## Content rules (kept from the master prompt)

- All project facts come from `src/data/projects.ts` — edit there only.
- Wayflow figures in UI images are demo data (labeled as such).
- No fake testimonials, metrics, clients or experience anywhere.
- NOVA is presented as a supervision layer over PLC/SCADA — never as a replacement.
- Glocima / Baby Cry carry medical-safety disclaimers.
