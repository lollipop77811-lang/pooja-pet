# Restaurant SaaS

A multi-tenant SaaS platform designed for restaurant operations, online ordering, and management.
Built as a modern TypeScript monorepo using pnpm workspaces.

## Getting Started

### Installation

```bash
pnpm install
```

### Development & Build

```bash
# Start infrastructure (PostgreSQL & Redis)
docker compose up -d

# Run database migrations
pnpm --filter api prisma:migrate

# Seed placeholder / initial data
pnpm --filter api prisma:seed

# Start development server
pnpm --filter api start:dev

# Build all packages and applications
pnpm build

# Run linting
pnpm lint

# Run tests
pnpm test
```

## Database Migration Rules

1. **Every database change is a migration file**: Never modify the database directly. Always update `apps/api/prisma/schema.prisma` and run `pnpm --filter api prisma:migrate`.
2. **Nobody edits an old migration**: Committed migrations are immutable. To fix an issue or alter a table, always create a new migration. Detailed guidelines are in [ADR 0001: Database Migrations](docs/decisions/0001-database-migrations.md).
