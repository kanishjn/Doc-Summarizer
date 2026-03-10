// Central API base URL — driven by the VITE_API_URL environment variable.
// Vite automatically loads:
//   .env.development  when running  `vite` (npm run dev)
//   .env.production   when running  `vite build` (npm run build)
//
// To override locally without touching committed files, create:
//   client-side/.env.development.local   ← git-ignored

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  console.error(
    "[api] VITE_API_URL is not set. " +
    "Create client-side/.env.development with VITE_API_URL=http://localhost:8000"
  );
}

export default API_BASE;
