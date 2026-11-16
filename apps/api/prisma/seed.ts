import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed (placeholder)...');

  // Placeholder seed: creates an initial tenant to prove database flow works.
  // In Stages 1-2, this will be expanded with cloud kitchen / restaurant entities, menus, tables, and roles.
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'sample-kitchen' },
    update: {},
    create: {
      name: 'Sample Cloud Kitchen',
      slug: 'sample-kitchen',
    },
  });

  console.log(`✅ Seeded placeholder tenant: ${tenant.name} [ID: ${tenant.id}]`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
