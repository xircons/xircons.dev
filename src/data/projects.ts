export interface ProjectData {
  id: number;
  slug: string;
  updated: string;
  category: string;
  eyebrow: string;
  headline: string;
  descriptor: string;
  // Used for the meta description when body is too long for search results.
  metaDescription?: string;
  body: string;
  imageUrl: string;
  // Shown side by side on the Works card instead of imageUrl, for phone screenshots.
  cardImages?: string[];
  // Covers without images say "Private project" when this is set; otherwise they show only the name.
  isPrivate?: boolean;
  ctaText?: string;
  ctaLink?: string;
  caseStudy?: string[];
  // Keeps the entry for later but drops it from every page, list and count.
  // Un-hiding: add metaDescription if body > 160 chars, and add the slug to scripts/check-seo.mjs and public/llms.txt.
  hidden?: boolean;
}

const allProjects: readonly ProjectData[] = [
  {
    id: 1,
    slug: "keptcarbon",
    updated: "2026-10-21",
    category: "Internship",
    eyebrow: "Full-stack developer • 2026",
    headline: "KeptCarbon",
    descriptor: "GeoAI Carbon Credit Platform",
    body: "GeoAI platform that estimates the carbon-credit potential of rubber plantations from plots mapped by users.",
    imageUrl: "/projects/keptcarbon/hero.webp",
    ctaText: "Visit site",
    ctaLink: "https://keptcarbon.net",
    caseStudy: [
      "I worked on KeptCarbon at turnPRO, a GeoAI web platform that estimates the carbon-credit potential of rubber plantations. It is built in collaboration with Thai universities to support Thailand's Net Zero 2050 policy, with Rayong as the pilot province. The goal is to give landowners and project teams a credible, map-first way to understand how much carbon their plantations can capture, instead of relying on spreadsheets and manual field estimates.",
      "Users work directly on a map: they locate or draw plantation plots, see them over satellite and geospatial layers, and get carbon estimates and tree-count data for each plot. A dashboard summarises projects and plots with charts, so a project owner can move from a single plot to the overall picture without switching tools. The interface is fully in Thai, designed for people who are not GIS specialists.",
      "The frontend is Next.js with the App Router, running server-side rendering and acting as the backend-for-frontend: it is the only layer that talks to PostgreSQL with PostGIS, which stores users, projects and plot geometries. Maps are rendered with MapLibre GL, and charts are custom SVG components rather than a chart library, to keep them light and match the design system. A separate stateless FastAPI service in Python 3.11 runs the geospatial work, reading GeoPackage, GeoTIFF and CSV data with GeoPandas, rasterio and pyproj. Everything runs on Docker Compose behind an nginx reverse proxy in production.",
      "The main challenge was making the platform trustworthy as it moved toward real users. I ran a security and PDPA review of the live system, then worked on hardening the infrastructure: separating Docker environments, tightening the nginx configuration and keeping security headers such as HSTS and X-Frame-Options intact through merges. I also prepared a breaking database migration to UUID relations and JSONB, with a precheck, a backup step and a maintenance-window plan, so the schema could evolve without putting production data at risk.",
    ],
  },
  {
    id: 2,
    slug: "skillforce",
    updated: "2026-10-21",
    category: "Internship",
    eyebrow: "Lead frontend and full-stack developer • 2026",
    headline: "SkillForce",
    descriptor: "Workforce Skills Platform",
    body: "Multi-module workforce skills platform where I led a four-person frontend team and owned the Learner app.",
    // ponytail: placeholder until screenshots arrive; switch to /projects/skillforce/hero.webp.
    imageUrl: "/projects/placeholder.svg",
    ctaText: "Visit public site",
    ctaLink: "https://skillforce.camt.cmu.ac.th/company",
    caseStudy: [
      "The public site is only the front door. Most of my work sits behind the login: the Learner app I owned end to end, and the AI course-generation flow in the Admin app.",
      "SkillForce is a multi-module workforce skills platform I built at turnPRO, made up of separate Admin, Learner, Company and Mentor apps on a shared backend. Admins manage courses, skill tracks, assessments and QR-verifiable certificates; learners take courses and track their progress; companies post the skills they need. The goal was a single system that connects training, assessment and hiring demand, rather than separate tools for each.",
      "I started as a full-stack developer and became Lead Frontend Developer, leading a team of four frontend developers. I owned the Learner module, a mobile-first web app covering registration, profile, courses, assessment results, certificates and notifications, and later took on the AI course-generation flow in the Admin app. Every page had the same definition of done: wired to the real API, with loading, error and empty states, matching the frozen Figma design, and responsive on mobile.",
      "The Learner app uses Next.js with the App Router, Tailwind CSS, React Query for server state and Recharts for learning-outcome charts, on a shared design system. The backend is a Node.js API with Prisma on PostgreSQL. I built an onboarding gate that sends partially registered users back to finish registration instead of into a broken app, and a resume flow that pre-fills an abandoned registration so learners do not have to start over.",
      "The biggest challenge was delivery. We had an 11-day sprint to production covering development, QA and bug fixing, and two developers left in the middle of it. Instead of cutting scope, I rebuilt the timeline from that day to the fixed deploy date and re-assigned their work across the remaining team by strength. On the technical side, I found that some API failures were being shown to users as \"No data found\"; I made every page check for errors explicitly and show a retryable error state, so real problems surfaced instead of hiding as empty screens.",
    ],
  },
  {
    id: 3,
    slug: "icas-cmu-hub",
    updated: "2026-10-21",
    category: "Competition",
    eyebrow: "Full-stack developer • 2025",
    headline: "iCAS-CMU HUB",
    descriptor: "University Club Management Platform",
    body: "A production CMU club platform for memberships, events, assignments, live chat, and admin workflows, live at icas-cmu.turnpro.dev.",
    imageUrl: "/projects/icas-cmu/hero.webp",
    ctaText: "Visit site",
    ctaLink: "https://icas-cmu.turnpro.dev",
    caseStudy: [
      "We built iCAS-CMU HUB (Integrated Club Administration System) as a team, and I worked on it as a full-stack developer. The app is a web platform for managing university clubs at CMU: it centralizes memberships, events, assignments, budgets, reports, and admin workflows so leaders and staff are not juggling spreadsheets and informal channels. My goal was to help deliver a single place where members can join clubs and take part in activities, while admins and club leaders can run day-to-day operations with clear roles and permissions. The platform is live in production at icas-cmu.turnpro.dev.",
      "The product is organized around role-based experiences: members see dashboards, QR check-in, club discovery, and feedback; leaders get check-in and leadership tools; admins manage club creation, owners, report inboxes, user oversight, and Smart Document flows. Users sign in through a login hub, then land on routes guarded by role, with a sidebar layout (and a separate club workspace with home, assignments, calendar, chat, and members) so the UI stays focused for each persona. We emphasized clear navigation, loading states, and toast feedback so common tasks feel straightforward on desktop and mobile-friendly layouts where it matters.",
      "Technically, the frontend is React 19 + TypeScript with Vite, React Router, Axios, Tailwind-style utility classes, Radix UI primitives, charts (Recharts), rich text (TipTap), and Socket.IO for live chat and updates. The backend is Node.js + Express + TypeScript, structured by feature modules (auth, clubs, assignments, events, check-in, reports, smart documents, LINE webhooks), with JWT in HttpOnly Secure cookies, PostgreSQL via pg driver hosted on Supabase (Tokyo region, transaction pooler), file uploads (Multer), rate limiting, and email/OTP services. The whole stack runs on Docker Compose behind an nginx reverse proxy on a Linux VPS, with TLS terminated by Let's Encrypt, traffic proxied through Cloudflare (DNS, WAF, Bot Fight Mode), with monitoring via UptimeRobot and nightly pg_dump backups via cron.",
      "One challenge was migrating the schema from the team's original MySQL prototype to PostgreSQL on Supabase without losing the Thai-language data integrity or breaking the feature modules. I used pgloader to port the canonical schema (icas_cmu_hub), reworked SSL connection handling for school networks where TLS is intercepted (sslmode=no-verify in pg-node, mapped to require for libpq tools), and gated the previous local-Postgres compose service behind a profile so production and offline-dev environments could co-exist from the same docker-compose.yml. On the app side, wiring Socket.IO with HttpOnly-cookie auth for club-scoped chat (so WebSocket upgrades flow through nginx and inherit the same session), splitting admin vs club navigation to reduce cross-role access, and treating UTF-8 carefully across nginx to Express to Postgres kept Thai names and messages correct end-to-end.",
      "After launch I hardened the production deployment: closed the host Postgres port from the internet, rotated all DB passwords, added strict HTTP security headers (HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy; graded A on securityheaders.com), blocked common bot reconnaissance paths at the nginx layer, enabled Cloudflare Bot Fight Mode + Browser Integrity Check, and set up automated daily backups + uptime monitoring with alerting. The result is a production-ready, secured deployment that the team can iterate on without scrambling on operations.",
    ],
  },
  {
    id: 4,
    slug: "chekdee",
    updated: "2026-10-21",
    category: "Internship",
    eyebrow: "Solo full-stack developer • 2026",
    headline: "Chekdee",
    descriptor: "LINE QR Attendance System",
    isPrivate: true,
    body: "LINE-based attendance system with rotating signed QR check-in, email leave approval and Excel reports.",
    imageUrl: "/projects/chekdee/16.webp",
    cardImages: ["/projects/chekdee/1.webp", "/projects/chekdee/2.webp", "/projects/chekdee/3.webp"],
    ctaText: "Private project",
    caseStudy: [
      "Chekdee is a LINE-based employee attendance system I built at turnPRO for CAMT, Chiang Mai University. Staff check in from inside LINE instead of a separate app or a fingerprint scanner, and admins get schedules, leave and reports in one dashboard. The goal was to make attendance quick for staff and hard to fake, while giving admins numbers they can trust.",
      "Staff open the app through LINE (LIFF with LINE Login), register once, and check in by scanning a rotating QR code shown on a lobby TV; checking out is a single button in the app. Lateness and absence follow clear rules against each person's scheduled shift, and admins can correct a day with a logged reason. Leave requests are submitted through a form with attachments and emailed to the supervisor with a secure, expiring approval link. Admins manage recurring weekly schedules per employee, since staff are students whose hours follow their class timetable, alongside holidays that sync automatically from a public API.",
      "I built the full frontend in Next.js with the App Router, TypeScript, Tailwind CSS and shadcn/ui, with all interface copy in Thai on a custom design system. The backend is written in Go with Echo, following Clean Architecture, with LINE login and password login for the system owner, JWT access tokens with refresh-token rotation, and PostgreSQL. It runs on Docker Compose on the company's own Linux server.",
      "The core challenge was trust: check-in only means something if it cannot be faked. The QR token rotates every 15 seconds and is HMAC-signed, so a screenshot stops working almost immediately. Kiosk TVs authenticate with revocable device tokens instead of user accounts, and worked hours are calculated against the scheduled shift rather than raw timestamps. For reporting, I built a two-sheet Excel export with an employee lookup dropdown, conditional formatting and a per-employee daily log, so admins can audit the data without needing access to the system itself.",
    ],
  },
  {
    id: 5,
    slug: "zero-mock",
    updated: "2026-10-21",
    category: "Production",
    eyebrow: "Solo full-stack developer • 2026",
    headline: "Zero-mock",
    descriptor: "JSON to REST API Mock CLI",
    metaDescription: "Zero-config Node.js CLI that turns one JSON file into a full CRUD REST API with CORS, pagination and simulated latency.",
    body: "A zero-config Node.js CLI that instantly turns a single JSON file into a full CRUD REST API with CORS, pagination, and simulated latency for rapid frontend development.",
    imageUrl: "/projects/zero-mock/hero.webp",
    ctaText: "View package",
    ctaLink: "https://www.npmjs.com/package/@xirconsss/zero-mock",
    caseStudy: [
      "I built zero-mock as a solo maintainer in a full-stack and tooling role. It is a zero-config developer tool that dynamically generates a persistent REST API from a JSON file while providing a Next.js web dashboard to manage projects. The problem it solves is the overhead frontend developers face when building prototypes: they need a reliable, self-updating local database and a clean visual interface to monitor resources without writing custom mock handlers or manually editing JSON files.",
      "The developer flow is short: launch the CLI in watch mode pointing to a JSON file, which automatically spins up the Express server and syncs the data. Developers can interact with endpoints via standard CRUD calls or view their API schema in real-time through the web interface. On-save modifications to the JSON file instantly update the server's endpoints without restart, and writes initiated by API requests are saved atomically to prevent database corruption while preventing infinite watch-reload cycles.",
      "The project is structured as a Turborepo monorepo containing a Next.js frontend app and a standalone TypeScript CLI package. The backend uses Express for route handling, Chokidar for robust file system watching, and Vitest for unit and integration testing. Changes to the repository trigger a GitHub Actions CI workflow that runs typechecks, builds packages, runs coverage reports, and publishes the CLI tool to npm upon merging to the release branch.",
      "One significant challenge was implementing hot-reloading for dynamic JSON schemas. Originally, Express routes were bound statically at startup, meaning adding new collections required a server restart; this was solved by refactoring to a parameter-based routing middleware (/:resource) that queries the database store dynamically on each request. Additionally, file watchers triggered infinite reload loops when the CLI itself wrote data back to disk, which was resolved by implementing an epoch-based lock guard (isSelfWrite) to suppress self-caused filesystem events.",
    ],
  },
  {
    id: 6,
    slug: "turnpro-skill-radar",
    updated: "2026-10-21",
    category: "Internship",
    eyebrow: "Frontend developer • 2026",
    headline: "turnPRO",
    descriptor: "Team Skill Radar System",
    body: "Company site with an internal system that scores team skills from real project tasks and shows them as radar charts.",
    imageUrl: "/projects/turnpro-skill-radar/hero.webp",
    ctaText: "Visit site",
    ctaLink: "https://turnpro.dev",
    caseStudy: [
      "turnpro.dev is the company site for turnPRO. It is a landing page that introduces the company and the students working inside it, and I built it as the frontend developer.",
      "Each student on the site has a profile. Click a person, me included, and the page opens a radar chart of their skills. The chart is not filled in by hand. The scores come from the tasks each person actually completed, pulled from Jira and other project-management tools the team uses.",
      "Not every task counts the same. NDEA (สมาคมธุรกิจดิจิทัลภาคเหนือ), a digital business association in northern Thailand, reviews the tasks and rates how difficult each one is. The system combines that difficulty rating with the work each person completed and calculates how strong they are in each skill, which becomes one point on their radar chart.",
      "The result is a profile based on real work instead of self-assessment: a visitor can see at a glance where someone is strong and where they are still growing.",
      "My part was the frontend: the landing page, the profiles and the radar charts that turn the calculated scores into something readable. The skill data has not been updated for a while, so the charts on the live site show an earlier snapshot of the team.",
    ],
  },
  {
    id: 7,
    slug: "store.atelien",
    updated: "2026-10-21",
    category: "Academic",
    eyebrow: "Solo full-stack developer • 2025",
    headline: "store.atelien",
    descriptor: "Full-stack E-commerce Store",
    metaDescription: "School e-commerce project with sign-up, product browsing, cart and checkout, plus an admin area for orders, products and coupons.",
    body: "An e-commerce website I made for a school project. People can sign up, browse products, use a cart and checkout, and there is an admin area to manage orders, products, and coupons.",
    imageUrl: "/projects/store.atelien/hero.webp",
    ctaText: "View source",
    ctaLink: "https://github.com/xircons/store.atelien",
    caseStudy: [
      "I built store.atelien, a full-stack e-commerce demo for my studies. It is a fictional design-focused store (inspired by a minimalist retail look) that lets people browse products, sign up and log in, manage a cart, apply discount codes, and complete checkout with shipping and totals. The goal was to show I can ship a realistic online shop end to end, beyond static pages, while keeping the project clearly educational and non-commercial.",
      "On the customer side, the flow goes from browsing the catalog to cart, optional login, checkout with shipping details, and an order confirmation backed by the database. I focused on a clear path through purchase steps and a separate admin dashboard where orders can be reviewed, statuses updated, and data exported when needed. The public UI is built with plain HTML, CSS, and JavaScript so the experience stays lightweight and easy to reason about without a heavy front-end framework.",
      "I used Node.js and Express for the API, MySQL with mysql2 connection pooling for data, and vanilla JS in the public folder served as static assets. Authentication uses bcryptjs for passwords and jsonwebtoken with cookie-parser so protected actions (like checkout and discount validation) can rely on a secure, cookie-based session pattern. Routes are split by concern (products, auth, cart, checkout, discounts, admin, and logging), which keeps the server organized and mirrors how a larger app might be structured.",
      "Orders were the awkward part: line items and shipping are structured data, but I still wanted everything in one relational model. I solved that by persisting cart lines and shipping as JSON in MySQL and using SQL JSON functions where the admin views need names or summaries, instead of many extra tables for a student-scope project. I also wired environment-based configuration (for example database settings and secrets via dotenv) so local setup stays repeatable and credentials stay out of the code, which mattered because I was the only developer touching every layer.",
    ],
  },
  {
    id: 8,
    slug: "deskcat",
    updated: "2026-10-21",
    category: "Personal",
    eyebrow: "Solo full-stack developer • 2025",
    headline: "deskcat",
    descriptor: "Pixel-art Desktop Notes App",
    body: "A floating pixel-art cat that sits on your desktop, takes quick notes through the day, and gathers them into an end-of-day reflection.",
    imageUrl: "/projects/deskcat/hero.webp",
    ctaText: "View source",
    ctaLink: "https://github.com/xircons/deskcat",
    caseStudy: [
      "I built deskcat as a solo developer to serve as a continuous on-screen companion and productivity tool. It is a desktop application featuring a floating pixel-art cat that helps users jot quick notes throughout the day. The problem it solves is the exhaustion and frustration of having to sit down every evening and trying to remember what was accomplished all day just to write daily reflections; by continuously tracking activities alongside a virtual pet companion, users no longer have to rely on their memory at the end of the day.",
      "The user flow is built into the desktop environment: the virtual pet floats transparently on screen, with its eyes following the mouse cursor while clicks pass through to underlying applications. Users can click the cat to instantly open a quick-note popup to jot down activities, or click and drag it around the screen using elastic physics. At configured intervals, the cat bounces with alert marks to prompt a new entry, and if ignored, its mood progressively transitions from content to lonely or grumpy until a note is saved. At the end of the day, a final reflection prompt aggregates all chronological notes, allowing users to write their evening summary without starting from a blank slate.",
      "The project is structured as an Electron desktop application built entirely with TypeScript and packaged using electron-builder. The architecture strictly separates concerns: the main process handles window management, system tray menus, global keystroke monitoring using uiohook-napi, and atomic filesystem writes to safely store daily JSON and Markdown files. The renderer process manages the DOM and utilizes a custom spring-damper physics engine for drag-and-drop interactions, offloading hardware-accelerated rendering to the GPU with inline CSS transforms to eliminate browser layout thrashing.",
      "The main performance challenge was managing the dynamic rendering of the cat's states and patterns without degrading desktop performance. Originally, updating SVG skins caused expensive garbage collection sweeps; this was solved by implementing a DOM object pool that recycles <rect> elements and toggles their display states. The cat artwork, animations, and coat patterns are adapted from \"Catjang\" by jan (nerfspeed on Discord) under the CC BY-NC 4.0 license. To integrate these assets, I made specific technical modifications, including baking ear/tail paths, namespacing IDs, adding steam-puff groups, and reimplementing the data-patch-frame lightweight spot-painter entirely in TypeScript without runtime cell-mapping tables.",
    ],
  },
  {
    id: 9,
    slug: "geo-care-network",
    updated: "2026-10-21",
    hidden: true,
    category: "Academic",
    eyebrow: "Full-stack developer • 2026",
    headline: "Geo Care Network",
    descriptor: "Community Incident Map Prototype",
    body: "A Chiang Mai-focused map prototype for community incident reporting: browse and file reports on a live map, run CCTV footage through Gemini for auto-filled crash reports, and triage CCTV cases in a separate agency console. Data is served locally by zero-mock.",
    imageUrl: "/projects/geo-care-network/hero.webp",
    ctaText: "View source",
    ctaLink: "https://github.com/xircons/geo-care-network",
    caseStudy: [
      "I built Geo Care Network, a web prototype for map-based incident reporting in a geographic care network, with sample data centered on Chiang Mai. It brings together a public-facing map and reports experience where residents can browse filed incidents, file or edit reports manually, and upload dashcam or CCTV footage for automated crash analysis, plus a separate agency notify workflow that behaves like a small triage console for CCTV-sourced cases. The goal was to prove out how a community safety tool could combine live map awareness, structured incident records, and AI-assisted filing from video.",
      "On the community side, I focused on a clear path from the live map through severity and category filters, report pins with quick actions, and dedicated screens for the full reports list and manual create or edit flows where users pick location on an interactive map. Opening new or edit forms from the map uses modal-style routing so the underlying map stays visible. The CCTV flow walks users from video upload and preview through AI analysis to an auto-filled report form with Thai title and description, optional GPS-derived coordinates, and a captured thumbnail. The agency side uses a notify queue with open and archived views, status transitions, and an append-only activity log, with badge counts on the top bar so staff can see how many CCTV reports still need triage. I used CSS custom properties, CSS Modules per screen, and shared typography including Geist so the look stays consistent, while Gemini output is intentionally casual spoken Thai to match how eyewitnesses would describe a crash.",
      "The stack is React 19 with TypeScript and Vite, React Router for multi-page navigation, and Redux Toolkit with RTK Query for server state. Report data is served by zero-mock from a local db.json file, which keeps REST-style GET, POST, PATCH, and DELETE behavior realistic during development. UI filters, search, and toast messaging live in a separate ui slice, with memoized selectors driving filtered lists on the map and reports views. Leaflet and react-leaflet power the map layers and location picker, OpenStreetMap Nominatim handles reverse geocoding when GPS metadata exists, and Google Gemini (gemini-2.5-flash) runs in the browser for multimodal video analysis. The live map and notify views poll on an interval so pins and queue state stay reasonably fresh without manual refresh.",
      "The main challenge was making CCTV analysis trustworthy and usable without a server pipeline: I had to enforce a maximum inline upload size for Gemini, run a three-pass ensemble with fixed seeds and aggregate votes so a single flaky pass would not miss a real crash, validate strict JSON fields before filing, and still handle clips with no embedded GPS by falling back to manual pin placement and optional Nominatim lookup. Passing modal state through React Router background locations kept edit and create flows from tearing users out of map context, while splitting reports API logic, CCTV analysis, GPS extraction, and reverse geocoding into focused feature modules next to co-located CSS Modules helped me avoid one oversized page file and made it easier to extend the triage console or tighten the AI contract independently.",
    ],
  },
  {
    id: 10,
    slug: "tic-tac-toe-with-ai",
    updated: "2026-10-21",
    hidden: true,
    category: "Personal",
    eyebrow: "Full-stack developer • 2025",
    headline: "Tic-Tac-Toe with AI",
    descriptor: "Tic-Tac-Toe Game with AI",
    body: "A tic-tac-toe game I built where you can play against the computer or with a friend. The computer has different levels, and on the hardest level it plays very well, so it is almost impossible to beat.",
    imageUrl: "/projects/tic-tac-toe/hero.webp",
    ctaText: "View source",
    ctaLink: "https://github.com/xircons/tictactoe-ai",
    caseStudy: [
      "I built a tic-tac-toe project that combines a playable web app with a reinforcement-learning side: the src/ area holds a self-play training pipeline and Q-learning-style agents for research and experimentation, while the shipped experience lets people play against AI opponents and see how game state is sent to a server for smarter moves. The goal was to turn a simple 3x3 game into something that shows both classic game AI and modern full-stack delivery, so visitors get a real product instead of a notebook or script.",
      "The app uses a multi-page flow with React Router: home with name entry and mode choice (human vs AI or two humans), a dedicated game screen with scores and reset, plus settings, match history, and an about page. I focused on a cohesive retro phone shell layout, optional background music and sound effects, slide notifications for turns and errors, a win modal, and achievements tied to play patterns. Difficulty maps to different AI behaviors (easy random play, medium heuristics, hard minimax-style play), and history plus achievements persist in the browser so the experience feels continuous across sessions.",
      "On the front end I used React with Vite, Redux Toolkit for game, settings, history, and achievements, and localStorage to persist everything except the in-progress board. The backend is a Flask REST API with CORS tuned for GitHub Pages, local Vite ports, and deployment hosts; it exposes health, move, and validate endpoints and reuses a shared Python tic-tac-toe engine. CI workflows build the SPA and deploy static assets to GitHub Pages while the API can run separately (for example on Render), with the front end pointing at a configurable base URL through environment variables. There is no traditional database, since state lives on the client.",
      "A practical challenge was hosting the UI and API on different origins: browsers enforce CORS, and the static site can outlive or lose contact with the API. I addressed this by explicitly allowing the right origins on the Flask side and by handling failed fetch calls in the game logic: if the API is unreachable, the client shows a clear message and falls back to a simple random move so the game still runs. That kept the demo reliable for portfolio viewers even when the backend sleeps or errors, without blocking the whole interface.",
    ],
  },
];

export const projects = allProjects.filter((p) => !p.hidden);

export const hiddenProjectSlugs = allProjects.filter((p) => p.hidden).map((p) => p.slug);

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

export function hasCover(imageUrl: string) {
  return imageUrl !== "/projects/placeholder.svg";
}
