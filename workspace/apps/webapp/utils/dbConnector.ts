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
  //@ts-ignore
  client.use(
    PrismaSlug({
      async slugify(source, params) {
        const method = camelCase(params.model);
        const collection = client[method];
        let slug = slugify(source);
        let attempt = 0;

        while ((await collection.count({ where: { slug } })) > 0) {
          attempt += 1;
          slug = `${slug}-${attempt}`;
        }
        console.log('slugify ran');
        return slug;
      },
    })
  );
  if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;
}

export default client;
