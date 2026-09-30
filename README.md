# xircons.dev

Portfolio of Xircons, a full-stack developer building web apps, business platforms, and developer tools. Built with Next.js (App Router), React, Tailwind CSS, and Framer Motion.

Live: https://xircons-dev.vercel.app

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Contact form

The form posts to `/api/contact`, which sends the message by email through [Resend](https://resend.com). Copy `.env.local.example` to `.env.local` and set:

- `RESEND_API_KEY`: your Resend API key
- `RESEND_FROM_EMAIL`: sender address (defaults to `onboarding@resend.dev`)

## Content

Project cards and case studies live in `src/data/projects.ts`. Site-wide metadata is in `src/app/layout.tsx` and `src/lib/structured-data.ts`.

## Scripts

- `npm run build`: production build
- `npm run start`: serve the production build
- `npm run lint`: run ESLint
