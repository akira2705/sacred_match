# Sacred Match

Sacred Match is a deployment-oriented matrimony platform for Nigeria, built around cultural compatibility, genotype awareness, and family-led relationship progression. This repository now contains the first production-grade foundation for that product:

- `apps/web`: React 19 + Vite + TypeScript + Tailwind marketing and acquisition experience
- `apps/api`: Express + TypeScript + Prisma + PostgreSQL API foundation
- `docker-compose.yml`: local infrastructure for PostgreSQL, Redis, API, and web

## Product Scope in This Foundation

This codebase establishes the core architecture needed to ship the MVP described in `SACRED_MATCH_COMPREHENSIVE_DEVELOPMENT_SPECIFICATION.md`:

- branded landing experience with conversion-ready sections
- genotype compatibility education and interactive checker
- structured public routes for content, FAQs, and ethnic-group previews
- authentication foundation with registration and login endpoints
- deployable PostgreSQL schema covering user, profile, matching, messaging, safety, culture, and family-introduction domains
- container definitions for local and deployment-like environments

## Monorepo Layout

```text
apps/
  api/    Express API, Prisma schema, seed data, Dockerfile
  web/    React web app, routes, UI, Dockerfile
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy environment files:

```bash
copy apps\api\.env.example apps\api\.env
copy apps\web\.env.example apps\web\.env
```

3. Start Docker Desktop if you are using the local PostgreSQL container.

4. Start the database and Redis:

```bash
npm run infra:up
```

5. Generate Prisma client and sync schema:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

6. Start the API and web app in separate terminals:

```bash
npm run dev:api
npm run dev:web
```

`npm run dev:api` now verifies PostgreSQL connectivity before the server starts. If `DATABASE_URL` points at `localhost:5432`, it will try to bring up `db` and `redis`, wait for Postgres, sync the Prisma schema, and seed the demo account automatically.

## Build

```bash
npm run build
```

## Deployment Notes

- `apps/web/Dockerfile` builds and serves the React app through Nginx.
- `apps/api/Dockerfile` builds the API for a Node 22 runtime.
- `docker-compose.yml` is suited for local integration and can be adapted to ECS, App Runner, Fly.io, Railway, Render, or Kubernetes.
- The Prisma schema is intentionally broader than the currently implemented routes so the rest of the product can be built without reworking the data model.

## Immediate Next Milestones

1. complete OTP/email verification and JWT refresh flow
2. implement full profile creation wizard and media upload
3. ship matching, connections, and messaging APIs
4. add admin moderation tools and content CMS workflow
5. wire CI/CD secrets, managed databases, and observability for staging
