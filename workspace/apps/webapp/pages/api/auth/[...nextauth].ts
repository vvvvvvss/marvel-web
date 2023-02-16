import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbClient from '../../../utils/dbConnector';
import slugify from 'slugify';

export const authOptions = {
  // Configure one or more authentication providers
  site: process.env.NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const existingUser = await dbClient.people.findUnique({
        where: {
          googleId: token?.sub,
        },
        select: {
          name: true,
          googleId: true,
          slug: true,
          scope: {
            select: {
              scope: true,
            },
          },
          id: true,
          profilePic: true,
        },
      });
      console.info('auth called');
      if (!existingUser) {
        // if no user, create slug and new user with the available data.
        let newSlug = slugify(token?.name, {
          lower: true,
          strict: true,
          trim: true,
        });
        let attempt = 0;

        while (
          (await dbClient.people.count({ where: { slug: newSlug } })) > 0
        ) {
          attempt += 1;
          newSlug = `${newSlug}-${attempt}`;
        }

        //populate session with our data
        session.user = await dbClient.people.create({
          data: {
            slug: newSlug,
            googleId: token?.sub,
            name: token?.name,
            profilePic: token?.picture,
            email: token?.email,
          },
          select: {
            name: true,
            googleId: true,
            slug: true,
            scope: {
              select: {
                scope: true,
              },
            },
            id: true,
            profilePic: true,
          },
        });
      } else {
        session.user = existingUser;
      }
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};

export default NextAuth(authOptions);
