# Carlos Riviera — Photography Portfolio

A photography portfolio for Carlos Riviera, a portrait, editorial and street photographer working between Los Angeles and Lisbon.

It started as a plain HTML/CSS site (Assignment 1), was rebuilt in React and Tailwind (Assignment 2), and now has a real backend: a Postgres database, an API and user accounts (Assignment 3).

## Features

- **Gallery** loaded from the database through the API, with a category filter (All, Portrait, Street, Editorial, Travel)
- **Full-size photo viewer** with Previous/Next buttons and a 1–5 star rating
- **Sign up, sign in and sign out**, with sessions that survive a page refresh
- **Contact form** with an optional preferred date
- **Responsive**, mobile first, with a drawer menu on phones

## Tech stack

| Part | Tools |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, React Router |
| Backend | Node.js, Express 5 |
| Database | Postgres on [Neon](https://neon.tech), Drizzle ORM |
| Auth | [Better Auth](https://www.better-auth.com) (email and password) |

## Folder structure

```
photographysite/
├── client/                    React app (what the visitor sees)
│   ├── public/
│   │   ├── icons/             Phosphor icons (stars, menu, form)
│   │   └── images/            Photos
│   ├── src/
│   │   ├── components/        Header, Hero, Gallery, PhotoModal, StarRating,
│   │   │                      About, Contact, Login, Footer
│   │   ├── lib/auth-client.js Better Auth client: signIn, signUp, signOut, useSession
│   │   ├── App.jsx            Routes: /, /login, /signup
│   │   ├── main.jsx           Entry point, wraps the app in BrowserRouter
│   │   └── index.css          Tailwind and theme colours/fonts
│   └── vite.config.js         Proxies /api to the server in development
│
└── server/                    Express API
    ├── src/
    │   ├── db/
    │   │   ├── schema.js      Database tables
    │   │   ├── index.js       Database connection
    │   │   ├── photos.data.js The 5 gallery photos (seed data)
    │   │   └── seed.js        Puts the seed data into the database
    │   ├── routes/product.js  Photos API routes
    │   ├── auth.js            Better Auth setup
    │   └── index.js           The Express server
    ├── drizzle/               SQL migrations generated from the schema
    ├── drizzle.config.js      Settings for drizzle-kit
    └── .env.example           The environment variables the server needs
```

## Database schema

| Table | What it holds |
|---|---|
| `photos` | One row per gallery photo: id, title, category, year, image path, alt text, and a sort order that keeps the gallery layout in order |
| `user` | One row per person who signs up: name and email |
| `account` | How each user signs in. For email and password, this stores the **hashed** password, never the real one |
| `session` | One row per logged-in browser. This is what keeps someone logged in after a refresh |
| `verification` | Short-lived codes, e.g. for password resets |

`session` and `account` are linked to `user`. Deleting a user also deletes their sessions and accounts.

## API

| Method | Route | Returns |
|---|---|---|
| GET | `/api/photos` | All photos as JSON, in gallery order |
| GET | `/api/photos/:id` | One photo, e.g. `/api/photos/roksolana`, or 404 |
| GET | `/api/health` | `{ ok: true }` if the server is running |
| GET/POST | `/api/auth/*` | Better Auth: sign up, sign in, sign out, get session |

## Running it locally

You need Node.js 20 or newer and a free Neon database.

### 1. Server

```bash
cd server
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string (pooled, ending in `?sslmode=require`) |
| `BETTER_AUTH_SECRET` | A long random string: `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `http://localhost:3000` |
| `CLIENT_URL` | `http://localhost:5173` |
| `PORT` | `3000` |

Create the tables, add the photos, and start the server:

```bash
npm run db:push
npm run db:seed
npm run dev
```

### 2. Client

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173.

## Scripts

| Folder | Command | What it does |
|---|---|---|
| server | `npm run dev` | Starts the API and restarts it on every save |
| server | `npm start` | Starts the API (used when deployed) |
| server | `npm run db:generate` | Writes SQL migrations from `schema.js` |
| server | `npm run db:push` | Creates or updates the tables in the database |
| server | `npm run db:studio` | Opens a browser view of the database |
| server | `npm run db:seed` | Adds the gallery photos to the database |
| client | `npm run dev` | Starts the React app |
| client | `npm run build` | Builds the React app for deployment |
| client | `npm run lint` | Checks the code with ESLint |

## Security

- Secrets live in `server/.env`, which is listed in `.gitignore` and never committed. `.env.example` shows the variable names with placeholder values.
- Passwords are hashed by Better Auth before being stored.
- The server only accepts requests from the React app's address (`CLIENT_URL`).

## Credits

Photos from [Pxhere](https://pxhere.com). Icons from [Phosphor Icons](https://phosphoricons.com) (MIT licence).
