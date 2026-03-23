# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Shift Start is a bilingual (Arabic/English) portfolio website for a web development agency. It has two services:

| Service | Port | Command | Description |
|---------|------|---------|-------------|
| Frontend (React/Vite) | 3000 | `npm run dev` (from repo root) | React SPA with Tailwind CSS |
| Backend (Express API) | 5000 | `npm run dev` (from `backend/`) | REST API with MongoDB |

### Required services

- **MongoDB** must be running on `localhost:27017` before starting the backend. Start it with:
  ```
  mongod --dbpath /data/db --logpath /tmp/mongod.log --fork
  ```
- **Backend** must be started before the frontend for API data to load.

### Running services

1. Start MongoDB (see above)
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `npm run dev` (from repo root)
4. Seed database (first time): `cd backend && npm run seed -- -i`

### Lint, test, build

- **Lint (frontend):** `npm run lint` — ESLint with React plugin. Existing codebase has some lint warnings (unused vars, missing deps).
- **Tests (backend):** `npm test` — Jest. Currently no test files exist; exits with code 1 unless `--passWithNoTests` is used.
- **Build (frontend):** `npm run build` — Vite production build to `dist/`.

### Admin credentials (from seed data)

- Email: `admin@shiftstart.sy`
- Password: `Admin123!@#`
- Admin panel URL: `http://localhost:3000/admin`

### Key gotchas

- The backend uses `"type": "module"` (ESM). All source files must use `export default` / `export`, not `module.exports`.
- SMTP (email) and Cloudinary (image upload) are optional; the app works without real credentials for those.
- The `.env` file in `backend/` is already populated with development defaults. No additional secrets are needed for local development.
- There is no `.gitignore` in the repo — be careful not to commit `node_modules/` or `dist/`.
