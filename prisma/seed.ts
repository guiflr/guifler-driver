import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const SALT = Number(process.env.SALT);

async function main () {
  const hash = await bcrypt.hash('admin123', SALT);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.io' },
    update: {},
    create: {
      email: 'admin@admin.io',
      username: 'Adm',
      role: 'admin',
      password: hash,
    },
  });

  console.log({ admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
