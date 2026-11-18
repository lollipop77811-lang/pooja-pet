import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed (placeholder)...');

  // Placeholder seed: creates an initial tenant to prove database flow works.
  // In Stages 1-2, this will be expanded with cloud kitchen / restaurant entities, menus, tables, and roles.
  let tenant = await prisma.tenant.findFirst({
    where: { name: 'Sample Cloud Kitchen' },
  });

  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        name: 'Sample Cloud Kitchen',
        status: 'TRIAL',
      },
    });
  }

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
