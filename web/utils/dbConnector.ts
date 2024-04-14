import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

if (globalThis.prisma) {
  var client = globalThis.prisma;
} else {
  client = new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
}

export default client;
