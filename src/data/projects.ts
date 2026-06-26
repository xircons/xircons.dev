export interface ProjectData {
  id: string | number;
  eyebrow: string;
  headline: string;
  body: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
}

export const projects: readonly ProjectData[] = [
  {
    id: 7,
    eyebrow: "Production",
    headline: "Zero-mock",
    body: "A zero-config Node.js CLI that instantly turns a single JSON file into a full CRUD REST API with CORS, pagination, and simulated latency for rapid frontend development.",
    imageUrl: "/projects/zero-mock/hero.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/xircons/zero-mock",
  },
  {
    id: 2,
    eyebrow: "Production",
    headline: "NinjaLingo",
    body: "A flashcard web app I built so people can study and track their progress. I also wrote a custom script to convert vocabulary CSV files into JSON to easily import data. Users sign in to review cards, and admins manage the sets.",
    imageUrl: "/projects/ninjalingo/hero.png",
    ctaText: "Private repository",
  },
  {
    id: 1,
    eyebrow: "Competition",
    headline: "iCAS-CMU HUB",
    body: "A production CMU club platform for memberships, events, assignments, live chat, and admin workflows — live at icas-cmu.turnpro.dev.",
    imageUrl: "/projects/icas-cmu/hero.png",
    ctaText: "View live site",
    ctaLink: "https://icas-cmu.turnpro.dev",
  },
  {
    id: 3,
    eyebrow: "Academic",
    headline: "store.atelien",
    body: "An e-commerce website I made for a school project. People can sign up, browse products, use a cart and checkout, and there is an admin area to manage orders, products, and coupons.",
    imageUrl: "/projects/store.atelien/hero.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/xircons/store.atelien",
  },
  {
    id: 4,
    eyebrow: "Personal",
    headline: "Tic-Tac-Toe with AI",
    body: "A tic-tac-toe game I built where you can play against the computer or with a friend. The computer has different levels, and on the hardest level it plays very strong so it is almost impossible to beat.",
    imageUrl: "/projects/tic-tac-toe/hero.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/xircons/tictactoe-ai",
  },
  {
    id: 6,
    eyebrow: "Personal",
    headline: "Good Night Hostel",
    body: "A booking website and staff dashboard I built for a hostel. Guests can look at rooms and switch languages, while staff can manage bookings, housekeeping, and view charts in their own admin area.",
    imageUrl: "/projects/good-night-hostel/hero.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/xircons/good-night-hostel",
  },
  {
    id: 8,
    eyebrow: "Academic",
    headline: "Geo Care Network",
    body: "A Chiang Mai-focused map prototype for community incident reporting: browse and file reports on a live map, run CCTV footage through Gemini for auto-filled crash reports, and triage CCTV cases in a separate agency console — backed locally by zero-mock.",
    imageUrl: "/projects/geo-care-network/hero.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/xircons/geo-care-network",
  },
];
