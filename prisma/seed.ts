import { prisma } from "../src/configs/db.config.js";
import { hashPassword } from "../src/utils/helpers/password.helper.js";
import { logger } from "../src/configs/logger.config.js";

async function main() {
  const adminRole = await prisma.role.upsert({
    where: {
      name: "ADMIN",
    },
    update: {},
    create: {
      name: "ADMIN",
      description: "System Administrator",
    },
  });

  const passwordHash = await hashPassword("Arijit@12345");

  await prisma.user.upsert({
    where: {
      email: "arijit.ganguly@example.com",
    },
    update: {
      roleId: adminRole.id,
    },
    create: {
      fullName: "Arijit Ganguly",
      email: "arijit.ganguly@example.com",
      passwordHash,
      roleId: adminRole.id,
    },
  });

  logger.info("Admin seed completed successfully");
}

main()
  .catch((error) => {
    logger.error("Admin seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });