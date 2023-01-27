import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbClient from '../../../utils/dbConnector';
import { people as person } from '@marvel/web-utils';

async function refreshAccessToken(token) {
  console.log('refreshToken got called');
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_ID,
        client_secret: process.env.GOOGLE_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

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
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      const existingUser = await dbClient.people.findUnique({
        where: {
          googleId: token?.user?.id,
        },
        select: {
          name: true,
          slug: true,
          crdnCourses: true,
          scope: true,
          id: true,
          profilePic: true,
        },
      });
      console.info('findOne is called at auth');
      if (!existingUser) {
        // if no user, create a new user with the available data.
        const newUser = await dbClient.people.create({
          data: {
            googleId: token?.user?.id,
            name: token?.user?.name,
            profilePic: token?.user?.image,
            email: token?.user?.email,
          },
        });
        const { slug, name, email, profilePic, id, scope, crdnCourses } =
          newUser;

        //populate session with our data
        session.user = {
          slug,
          name,
          profilePic,
          id,
          scope,
          crdnCourses,
        };
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
