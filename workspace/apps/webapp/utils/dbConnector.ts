import slugify from 'slugify';
import { PrismaClient } from '@prisma/client';
import { camelCase } from 'camel-case';
import { PrismaSlug } from 'prisma-slug';

declare global {
  var prisma: PrismaClient | undefined;
}

if (globalThis.prisma) {
  var client = globalThis.prisma;
} else {
  client = new PrismaClient();
  if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;
}

export default client;
