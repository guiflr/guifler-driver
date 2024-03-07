import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const SALT = Number(process.env.SALT);
const userPassword = process.env.ADMIN_USER_PASSWORD as string;
const user = process.env.ADMIN_USER as string;

async function main () {
  const hash = await bcrypt.hash(userPassword, SALT);

  const admin = await prisma.user.upsert({
    where: { email: user },
    update: {},
    create: {
      email: user,
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
