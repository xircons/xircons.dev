export interface ProjectData {
  id: string | number;
  eyebrow: string;
  headline: string;
  body: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
  caseStudy?: string[];
}

export const projects: readonly ProjectData[] = [
  {
    id: 1,
    eyebrow: "Full-stack developer • 2026",
    headline: "Zero-mock",
    body: "A zero-config Node.js CLI that instantly turns a single JSON file into a full CRUD REST API with CORS, pagination, and simulated latency for rapid frontend development.",
    imageUrl: "/projects/zero-mock/hero.png",
    ctaText: "View Package",
    ctaLink: "https://www.npmjs.com/package/@xirconsss/zero-mock",
    caseStudy: [
      "I built zero-mock as a solo maintainer in a full-stack and tooling role. It is a zero-config developer tool that dynamically generates a persistent REST API from a JSON file while providing a Next.js web dashboard to manage projects. The problem it solves is the overhead frontend developers face when building prototypes: they need a reliable, self-updating local database and a clean visual interface to monitor resources without writing custom mock handlers or manually editing JSON files.",
      "The developer flow is highly streamlined: launch the CLI in watch mode pointing to a JSON file, which automatically spins up the Express server and syncs the data. Developers can interact with endpoints via standard CRUD calls or view their API schema in real-time through the web interface. On-save modifications to the JSON file instantly update the server's endpoints without restart, and writes initiated by API requests are saved atomically to prevent database corruption while preventing infinite watch-reload cycles.",
      "The project is structured as a Turborepo monorepo containing a Next.js frontend app and a standalone TypeScript CLI package. The backend uses Express for route handling, Chokidar for robust file system watching, and Vitest for unit and integration testing. Changes to the repository trigger a GitHub Actions CI workflow that runs typechecks, builds packages, runs coverage reports, and publishes the CLI tool to npm upon merging to the release branch.",
      "One significant challenge was implementing hot-reloading for dynamic JSON schemas. Originally, Express routes were bound statically at startup, meaning adding new collections required a server restart; this was solved by refactoring to a parameter-based routing middleware (/:resource) that queries the database store dynamically on each request. Additionally, file watchers triggered infinite reload loops when the CLI itself wrote data back to disk, which was resolved by implementing an epoch-based lock guard (isSelfWrite) to suppress self-caused filesystem events.",
    ],
  },
  {
    id: 5,
    eyebrow: "Full-stack developer • 2026",
    headline: "NinjaLingo",
    body: "A flashcard web app I built so people can study and track their progress. I also wrote a custom script to convert vocabulary CSV files into JSON to easily import data. Users sign in to review cards, and admins manage the sets.",
    imageUrl: "/projects/ninjalingo/hero.png",
    ctaText: "Private Repo",
    ctaLink: "",
    caseStudy: [
      "I worked on NinjaLingo as part of a team, in a full-stack role. It is a language-learning flashcard web app aimed at helping users study vocabulary in a structured way. The product solves the problem of finding trustworthy card sets, staying motivated, and reviewing on a schedule instead of cramming. Public card set catalog and card content live in the database and are loaded through the app's API, so learners always pull curated, consistent content while their own progress can be tracked over time.",
      "The main flow takes users from choosing a card set to a dashboard, into an interactive review session, and then to a completion screen with session feedback. Review uses spaced repetition (SM-2-style scheduling) so cards come back at sensible intervals. There is a profile area for account-related needs, shareable paths for specific sets (e.g. opening a set from a URL), and an admin area for managing content behind stricter access. On the UI side we focused on a clear, friendly experience: Tailwind CSS for layout and theming (including light/dark), and Framer Motion for motion so interactions feel smooth without getting in the way of studying.",
      "On the frontend I helped build an Astro site that hydrates/islands React 19 for the interactive app, with React Router handling in-app routes (dashboard, review, card sets, admin entry, etc.). Styling uses Tailwind; we use TypeScript and Vitest for type safety and tests. Authentication is Firebase Auth; the data layer calls Astro API routes and sends the Firebase ID token on protected requests. The database is Neon (Postgres) for public sets, cards, progress, stats, and admin-related data. Astro middleware enforces separation between learner routes and admin routes using a session cookie and role checks. We also maintain Node scripts for seeding, CSV to JSON conversion for content pipelines, and deployment (e.g. build + hosting).",
      "One tricky part was keeping the experience simple for guests while still supporting signed-in users and not exposing admin tools to the wrong people. We addressed that with a clear split in routing and server-side checks: middleware decides whether a path is public, learner-only, or admin-only, validates the Firebase token where needed, and redirects so admins and regular users do not land in each other's areas by mistake. On the data side, centralizing API access (authenticated fetch with the Bearer token to Astro endpoints backed by Neon) kept one consistent pattern for progress and catalog data instead of scattering logic across the client. That made it easier for the team to reason about security, roles, and data flow as the app grew.",
    ],
  },
  {
    id: 2,
    eyebrow: "Full-stack developer • 2025",
    headline: "iCAS-CMU HUB",
    body: "A production CMU club platform for memberships, events, assignments, live chat, and admin workflows — live at icas-cmu.turnpro.dev.",
    imageUrl: "/projects/icas-cmu/hero.png",
    ctaText: "Visit Site",
    ctaLink: "https://icas-cmu.turnpro.dev",
    caseStudy: [
      "I built iCAS-CMU HUB (Integrated Club Administration System) together with my team as a full-stack developer. The app is a web platform for managing university clubs at CMU: it centralizes memberships, events, assignments, budgets, reports, and admin workflows so leaders and staff are not juggling spreadsheets and informal channels. My goal was to help deliver a single place where members can join clubs and take part in activities, while admins and club leaders can run day-to-day operations with clear roles and permissions. The platform is live in production at icas-cmu.turnpro.dev.",
      "The product is organized around role-based experiences — members see dashboards, QR check-in, club discovery, and feedback; leaders get check-in and leadership tools; admins manage club creation, owners, report inboxes, user oversight, and Smart Document flows. Users sign in through a login hub, then land on routes guarded by role, with a sidebar layout (and a separate club workspace with home, assignments, calendar, chat, and members) so the UI stays focused for each persona. We emphasized clear navigation, loading states, and toast feedback so common tasks feel straightforward on desktop and mobile-friendly layouts where it matters.",
      "Technically, the frontend is React 19 + TypeScript with Vite, React Router, Axios, Tailwind-style utility classes, Radix UI primitives, charts (Recharts), rich text (TipTap), and Socket.IO for live chat and updates. The backend is Node.js + Express + TypeScript, structured by feature modules (auth, clubs, assignments, events, check-in, reports, smart documents, LINE webhooks), with JWT in HttpOnly Secure cookies, PostgreSQL via pg driver hosted on Supabase (Tokyo region, transaction pooler), file uploads (Multer), rate limiting, and email/OTP services. The whole stack runs on Docker Compose behind an nginx reverse proxy on a Linux VPS — TLS terminated by Let's Encrypt, traffic proxied through Cloudflare (DNS, WAF, Bot Fight Mode), with monitoring via UptimeRobot and nightly pg_dump backups via cron.",
      "One challenge was migrating the schema from the team's original MySQL prototype to PostgreSQL on Supabase without losing the Thai-language data integrity or breaking the feature modules — I used pgloader to port the canonical schema (icas_cmu_hub), reworked SSL connection handling for school networks where TLS is intercepted (sslmode=no-verify in pg-node, mapped to require for libpq tools), and gated the previous local-Postgres compose service behind a profile so production and offline-dev environments could co-exist from the same docker-compose.yml. On the app side, wiring Socket.IO with HttpOnly-cookie auth for club-scoped chat (so WebSocket upgrades flow through nginx and inherit the same session), splitting admin vs club navigation to reduce cross-role access, and treating UTF-8 carefully across nginx to Express to Postgres kept Thai names and messages correct end-to-end.",
      "After launch I hardened the production deployment: closed the host Postgres port from the internet, rotated all DB passwords, added strict HTTP security headers (HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy — graded A on securityheaders.com), blocked common bot reconnaissance paths at the nginx layer, enabled Cloudflare Bot Fight Mode + Browser Integrity Check, and set up automated daily backups + uptime monitoring with alerting. The result is a production-ready, secured deployment that the team can iterate on without scrambling on operations.",
    ],
  },
  {
    id: 3,
    eyebrow: "Full-stack developer • 2025",
    headline: "deskcat",
    body: "Recommend following my case study.",
    imageUrl: "/projects/deskcat/hero.png",
    ctaText: "View Source",
    ctaLink: "https://github.com/xircons/deskcat",
    caseStudy: [
      "I built deskcat as a solo developer to serve as a continuous on-screen companion and productivity tool. It is a desktop application featuring a floating pixel-art cat that helps users jot quick notes throughout the day. The problem it solves is the exhaustion and frustration of having to sit down every evening and trying to remember what was accomplished all day just to write daily reflections; by continuously tracking activities alongside a virtual pet companion, users no longer have to rely on their memory at the end of the day.",
      "The user flow is seamlessly integrated into the desktop environment: the virtual pet floats transparently on screen, with its eyes following the mouse cursor while clicks effortlessly pass through to underlying applications. Users can click the cat to instantly open a quick-note popup to jot down activities, or click and drag it around the screen using elastic physics. At configured intervals, the cat bounces with alert marks to prompt a new entry, and if ignored, its mood progressively transitions from content to lonely or grumpy until a note is saved. At the end of the day, a final reflection prompt aggregates all chronological notes, allowing users to write their evening summary without starting from a blank slate.",
      "The project is structured as an Electron desktop application built entirely with TypeScript and packaged using electron-builder. The architecture strictly separates concerns: the main process handles window management, system tray menus, global keystroke monitoring using uiohook-napi, and atomic filesystem writes to safely store daily JSON and Markdown files. The renderer process manages the DOM and utilizes a custom spring-damper physics engine for drag-and-drop interactions, offloading hardware-accelerated rendering to the GPU with inline CSS transforms to eliminate browser layout thrashing.",
      "One significant challenge was managing the dynamic rendering of the cat's states and patterns without degrading desktop performance. Originally, updating SVG skins caused expensive garbage collection sweeps; this was solved by implementing a DOM object pool that intelligently recycles <rect> elements and toggles their display states. The cat artwork, animations, and coat patterns are adapted from \"Catjang\" by jan (nerfspeed on Discord) under the CC BY-NC 4.0 license. To integrate these assets, I made specific technical modifications, including baking ear/tail paths, namespacing IDs, adding steam-puff groups, and reimplementing the data-patch-frame lightweight spot-painter entirely in TypeScript without runtime cell-mapping tables.",
    ],
  },
  {
    id: 7,
    eyebrow: "Full-stack developer • 2025",
    headline: "store.atelien",
    body: "An e-commerce website I made for a school project. People can sign up, browse products, use a cart and checkout, and there is an admin area to manage orders, products, and coupons.",
    imageUrl: "/projects/store.atelien/hero.png",
    ctaText: "View Source",
    ctaLink: "https://github.com/xircons/store.atelien",
    caseStudy: [
      "I built store.atelien, a full-stack e-commerce demo for my studies. It is a fictional design-focused store (inspired by a minimalist retail look) that lets people browse products, sign up and log in, manage a cart, apply discount codes, and complete checkout with shipping and totals. The goal was to show I can ship a realistic online shop end to end — not just static pages — while keeping the project clearly educational and non-commercial.",
      "On the customer side, the flow goes from browsing the catalog to cart, optional login, checkout with shipping details, and an order confirmation backed by the database. I focused on a clear path through purchase steps and a separate admin dashboard where orders can be reviewed, statuses updated, and data exported when needed. The public UI is built with plain HTML, CSS, and JavaScript so the experience stays lightweight and easy to reason about without a heavy front-end framework.",
      "I used Node.js and Express for the API, MySQL with mysql2 connection pooling for data, and vanilla JS in the public folder served as static assets. Authentication uses bcryptjs for passwords and jsonwebtoken with cookie-parser so protected actions (like checkout and discount validation) can rely on a secure, cookie-based session pattern. Routes are split by concern — products, auth, cart, checkout, discounts, admin, and logging — which keeps the server organized and mirrors how a larger app might be structured.",
      "One tricky part was orders: line items and shipping are structured data, but I still wanted everything in one relational model. I solved that by persisting cart lines and shipping as JSON in MySQL and using SQL JSON functions where the admin views need names or summaries, instead of many extra tables for a student-scope project. I also wired environment-based configuration (for example database settings and secrets via dotenv) so local setup stays repeatable and credentials stay out of the code — important when I was the only developer touching every layer.",
    ],
  },
  {
    id: 6,
    eyebrow: "Full-stack developer • 2025",
    headline: "Tic-Tac-Toe with AI",
    body: "A tic-tac-toe game I built where you can play against the computer or with a friend. The computer has different levels, and on the hardest level it plays very strong so it is almost impossible to beat.",
    imageUrl: "/projects/tic-tac-toe/hero.png",
    ctaText: "View Source",
    ctaLink: "https://github.com/xircons/tictactoe-ai",
    caseStudy: [
      "I built a tic-tac-toe project that combines a playable web app with a reinforcement-learning side: the src/ area holds a self-play training pipeline and Q-learning-style agents for research and experimentation, while the shipped experience lets people play against AI opponents and see how game state is sent to a server for smarter moves. The goal was to turn a simple 3x3 game into something that shows both classic game AI and modern full-stack delivery, so visitors get a real product — not only a notebook or script.",
      "The app uses a multi-page flow with React Router: home with name entry and mode choice (human vs AI or two humans), a dedicated game screen with scores and reset, plus settings, match history, and an about page. I focused on a cohesive retro phone shell layout, optional background music and sound effects, slide notifications for turns and errors, a win modal, and achievements tied to play patterns. Difficulty maps to different AI behaviors (easy random play, medium heuristics, hard minimax-style play), and history plus achievements persist in the browser so the experience feels continuous across sessions.",
      "On the front end I used React with Vite, Redux Toolkit for game, settings, history, and achievements, and localStorage to persist everything except the in-progress board. The backend is a Flask REST API with CORS tuned for GitHub Pages, local Vite ports, and deployment hosts; it exposes health, move, and validate endpoints and reuses a shared Python tic-tac-toe engine. CI workflows build the SPA and deploy static assets to GitHub Pages while the API can run separately (for example on Render), with the front end pointing at a configurable base URL through environment variables — no traditional database, since state lives on the client.",
      "A practical challenge was hosting the UI and API on different origins: browsers enforce CORS, and the static site can outlive or lose contact with the API. I addressed this by explicitly allowing the right origins on the Flask side and by handling failed fetch calls in the game logic: if the API is unreachable, the client shows a clear message and falls back to a simple random move so the game still runs. That kept the demo reliable for portfolio viewers even when the backend sleeps or errors, without blocking the whole interface.",
    ],
  },
  {
    id: 8,
    eyebrow: "Full-stack developer • 2025",
    headline: "Good Night Hostel",
    body: "A booking website and staff dashboard I built for a hostel. Guests can look at rooms and switch languages, while staff can manage bookings, housekeeping, and view charts in their own admin area.",
    imageUrl: "/projects/good-night-hostel/hero.png",
    ctaText: "View Source",
    ctaLink: "https://github.com/xircons/good-night-hostel",
    caseStudy: [
      "I built Good Night Hostel, a web project for a fictional hostel in Chiang Mai. It brings together a public site where visitors can learn about the property and complete a room search and booking flow, a simple guest account area (bookings, profile, notifications, loyalty), and a separate admin dashboard that behaves like a small property-management console. The main goal was to show how a real hostel might present itself online and how staff could track bookings, rooms, housekeeping, maintenance, and finances in one place — without relying on a production backend for this version.",
      "On the guest side, I focused on a clear path from home and room pages through booking (dates, guests, room choice, contact and details) to a confirmation screen that reflects what the guest submitted. I used CSS variables and shared typography (including Thai-friendly fonts) so the look stays consistent and easier to adjust. The admin side uses a sidebar layout, dashboard charts (Chart.js and CanvasJS), and dedicated screens for room and booking management, housekeeping, maintenance, finance, customers, staff, and security, with EN/TH language hooks on the dashboard to match the hostel's audience.",
      "The stack is plain HTML, CSS, and JavaScript — no separate server or database in the repo. Content and room metadata live in shared static data (for example a central hostelData object), while the booking confirmation and customer account behavior use localStorage so the flow feels persistent in the browser. The admin modules use their own JavaScript engines with mock booking and operations data to drive tables, filters, and UI updates, which keeps the dashboard interactive without wiring up a real API yet.",
      "A practical challenge was keeping a multi-step booking experience reliable without a server: I had to validate dates (for example ensuring check-out is after check-in and enforcing sensible minimums), pass state between pages, and redirect away from the confirmation page if confirmation data was missing, so users never saw an empty or broken summary. On the admin side, splitting features into focused JS modules next to matching CSS helped me avoid one huge file and made it easier to extend screens like booking or housekeeping independently.",
    ],
  },
  {
    id: 4,
    eyebrow: "Full-stack developer • 2026",
    headline: "Geo Care Network",
    body: "A Chiang Mai–focused map prototype for community incident reporting: browse and file reports on a live map, run CCTV footage through Gemini for auto-filled crash reports, and triage CCTV cases in a separate agency console—backed locally by zero-mock.",
    imageUrl: "/projects/geo-care-network/hero.png",
    ctaText: "View Source",
    ctaLink: "https://github.com/xircons/geo-care-network",
    caseStudy: [
      "I built Geo Care Network, a web prototype for map-based incident reporting in a geographic care network, with sample data centered on Chiang Mai. It brings together a public-facing map and reports experience where residents can browse filed incidents, file or edit reports manually, and upload dashcam or CCTV footage for automated crash analysis, plus a separate agency notify workflow that behaves like a small triage console for CCTV-sourced cases. The main goal was to show how a community safety tool could combine live map awareness, structured incident records, and AI-assisted filing from video — without relying on a production backend for this version.",
      "On the community side, I focused on a clear path from the live map through severity and category filters, report pins with quick actions, and dedicated screens for the full reports list and manual create or edit flows where users pick location on an interactive map. Opening new or edit forms from the map uses modal-style routing so the underlying map stays visible. The CCTV flow walks users from video upload and preview through AI analysis to an auto-filled report form with Thai title and description, optional GPS-derived coordinates, and a captured thumbnail. The agency side uses a notify queue with open and archived views, status transitions, and an append-only activity log, with badge counts on the top bar so staff can see how many CCTV reports still need triage. I used CSS custom properties, CSS Modules per screen, and shared typography including Geist so the look stays consistent, while Gemini output is intentionally casual spoken Thai to match how eyewitnesses would describe a crash.",
      "The stack is React 19 with TypeScript and Vite, React Router for multi-page navigation, and Redux Toolkit with RTK Query for server state. Report data is served by zero-mock from a local db.json file, which keeps REST-style GET, POST, PATCH, and DELETE behavior realistic during development. UI filters, search, and toast messaging live in a separate ui slice, with memoized selectors driving filtered lists on the map and reports views. Leaflet and react-leaflet power the map layers and location picker, OpenStreetMap Nominatim handles reverse geocoding when GPS metadata exists, and Google Gemini (gemini-2.5-flash) runs in the browser for multimodal video analysis. The live map and notify views poll on an interval so pins and queue state stay reasonably fresh without manual refresh.",
      "A practical challenge was making CCTV analysis trustworthy and usable without a server pipeline: I had to enforce a maximum inline upload size for Gemini, run a three-pass ensemble with fixed seeds and aggregate votes so a single flaky pass would not miss a real crash, validate strict JSON fields before filing, and still handle clips with no embedded GPS by falling back to manual pin placement and optional Nominatim lookup. Passing modal state through React Router background locations kept edit and create flows from tearing users out of map context, while splitting reports API logic, CCTV analysis, GPS extraction, and reverse geocoding into focused feature modules next to co-located CSS Modules helped me avoid one oversized page file and made it easier to extend the triage console or tighten the AI contract independently.",
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find(
    (p) =>
      p.headline.toLowerCase().replace(/\s+/g, "-") === slug ||
      p.id.toString() === slug
  );
}
