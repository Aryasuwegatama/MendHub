# MendHub

MendHub is a Brisbane-focused repair marketplace built with Next.js App Router, TypeScript, Tailwind CSS, and Drizzle.

## Prerequisites

1. Node.js 20+
2. pnpm (recommended package manager for this repo)

## Setup

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

3. If needed, create a local environment file:

```bash
cp .env.example .env.local
```

4. Fill any required environment variables in .env.local.

## Run the app locally

Start development server:

```bash
pnpm dev
```

Open the app at:

- http://localhost:3000

## Useful scripts

- Run lint:

```bash
pnpm run lint
```

- Build for production:

```bash
pnpm run build
```

- Start production build:

```bash
pnpm run start
```

## Key routes

- Home: /
- Categories: /categories
- Providers: /providers
- Recommender: /recommender
- Contact: /contact
- List Your Business: /list-your-business
- Checkout Payment: /payment
- Checkout Confirmation: /confirmation
- Admin Dashboard: /admin

## Admin Dashboard (MVP)

The admin page is a simple internal view with static mock data (no backend wiring yet).

Path:

- /admin

Current sections:

1. Provider Submissions
2. Bookings
3. Quote Requests

Notes:

1. Approve and Reject buttons are UI-only placeholders.
2. Authentication and authorization are handled separately.
3. No charts, analytics, filters, or editing forms are included in this MVP.

## Tech stack

1. Next.js 16 (App Router)
2. TypeScript
3. Tailwind CSS
4. Drizzle ORM

## Troubleshooting

1. If UI looks stale after changing routes/components, stop and restart pnpm dev.
2. If type references seem outdated after route moves, clear .next and run dev again.
