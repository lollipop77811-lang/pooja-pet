# ADR 0001: Database Migrations Rule & Workflow

## Status
Accepted

## Context
In a multi-tenant SaaS application, schema consistency across all environments (local development, testing, staging, and production) is paramount. Uncontrolled or retroactive database changes cause schema drifts, deployment outages, and data loss.

## Non-Negotiable Rules

1. **Every database change MUST be a migration file**
   - Any addition, modification, or removal of tables, columns, relations, or indexes must be done by modifying `apps/api/prisma/schema.prisma` and running:
     ```bash
     pnpm --filter api prisma:migrate -- --name <descriptive_change_name>
     ```
   - Direct, manual modifications to the database schema outside migrations are strictly prohibited.

2. **Never edit an old migration file**
   - Once a migration is committed to Git, it is **immutable**.
   - **Why?** Prisma tracks applied migrations using cryptographic checksums in the `_prisma_migrations` table. Altering an existing migration file causes checksum verification failures, breaks other team members' environments, and halts CI/CD deployments.
   - **How to fix mistakes?** If a migration introduced a flaw, create a **new migration** that corrects it. Never rewrite history.

## Development Workflow

- **Apply latest migrations locally**:
  ```bash
  pnpm --filter api prisma:migrate
  ```
- **Seed initial / reference data**:
  ```bash
  pnpm --filter api prisma:seed
  ```
- **Inspect database with visual UI**:
  ```bash
  pnpm --filter api prisma:studio
  ```
