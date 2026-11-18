# Project context (read this before every task)

Product: multi-tenant restaurant SaaS for cloud kitchens, restaurants and hybrids in India. Billing, menu, inventory, staff.

Stack: pnpm monorepo. apps/api (NestJS + TypeScript + Prisma + PostgreSQL + Redis), apps/dashboard (Next.js + Tailwind), apps/pos (Vite React PWA), packages/shared-types, packages/ui.

Rules that never change:
1. Multi-tenant: one shared database. Every customer-owned table has tenant_id (uuid) and an index on it. Postgres Row-Level Security is enabled AND forced on all of them. The app connects as a non-owner role (app_user) that cannot bypass RLS.
2. Every database change is a Prisma migration file. Never edit a merged migration.
3. IDs are uuids. Timestamps are stored in UTC. Money is integer paise (not used in Stage 1).
4. Never hard-delete business data. Use archived_at.
5. Secrets only in .env (never committed). Hash passwords and PINs with argon2.
6. Every endpoint checks permission with the @RequirePermission decorator. Default is deny.
7. Every sensitive action writes an audit_log row.
8. Add tests for everything you build. Keep changes small and scoped to the task. Do not add features that were not requested.
9. Use TypeScript strict mode. No "any" without a comment explaining why.
10. After each task, list the files you changed and how to verify the work.
