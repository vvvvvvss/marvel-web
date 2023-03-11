import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbClient from "../../../utils/dbConnector";
import slugify from "slugify";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
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
      console.info("auth called");
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
        //@ts-ignore
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
        //@ts-ignore
        session.user = existingUser;
      }
      //@ts-ignore
      session.accessToken = token.accessToken;
      //@ts-ignore
      session.error = token.error;
      return session;
    },
  },
  secret: process.env?.NEXTAUTH_SECRET as string,
};

export default NextAuth(authOptions);
