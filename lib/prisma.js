import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["error", "warn"],
    errorFormat: "minimal",
  }).$extends({
    client: {
      async $connect() {
        try {
          await this.$connect();
        } catch (error) {
          console.error("Failed to connect to database:", error);
          throw error;
        }
      },
    },
  });
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
