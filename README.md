# Luis-leaf

Luis-leaf is a multiplayer party-game web application inspired by Fishbowl.

A host creates a room, players join without creating accounts, and everyone
plays together through three rounds using the same collection of words.

## Planned gameplay

1. **Describe** — Describe the word without saying the word itself.
2. **Act** — Act out the word without speaking.
3. **One-word clue** — Give exactly one word as a clue.

The application is planned to support a host interface, mobile player
interfaces, and a shared display for the room.

> **Project status:** Early development. The project foundation is being
> established. Gameplay, authentication, database integration, and
> multiplayer synchronization have not been implemented yet.

## Technology stack

### Current foundation

- Next.js — React framework and App Router
- React — UI library
- TypeScript — Static typing
- Tailwind CSS — Styling
- Zod — Runtime schema validation
- ESLint — Code linting

### Planned infrastructure

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime
- Vercel

Planned infrastructure is not configured or connected yet.

## Getting started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/luisreyesxv/ai-luisleaf.git
cd ai-luisleaf
```

Install dependencies:

```bash
npm install
```

### Environment variables

No project-specific environment variables are required at this stage.

The `.env.example` file will be updated as external services are introduced.
Do not commit `.env.local` or other files containing secrets.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

Automated tests have not been configured yet.

## Project structure

```text
ai-luisleaf/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── env.ts
├── public/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

Directories and files will be introduced as their corresponding
functionality is implemented.

## Design direction

Luis-leaf aims to feel like a physical party game translated into a
digital experience.

The visual direction emphasizes:

- Paper-like surfaces
- Ink-inspired outlines
- Hand-drawn illustrations
- Organic shapes and layouts
- Playful visual feedback
- Subtle decorative animations

Readability and usability take priority over decorative effects.

## Roadmap

1. **Project initialization** — Establish the application foundation.
2. **Database foundation** — Configure Supabase and PostgreSQL.
3. **Host authentication** — Implement authenticated host accounts.
4. **Game creation and joining** — Create rooms and support guest players.
5. **Lobby and word submission** — Manage participants and collect words.
6. **Team assignment** — Support team setup and game configuration.
7. **Game engine** — Implement authoritative turns, rounds, timers, and scoring.
8. **Realtime synchronization** — Coordinate connected devices.
9. **Administration and demo environments** — Add operational tools and isolated demos.
10. **Testing and deployment** — Prepare the application for production.

## Screenshots and live application

Screenshots and a production URL will be added when those are available.

## Repository

[GitHub — luisreyesxv/ai-luisleaf](https://github.com/luisreyesxv/ai-luisleaf)
