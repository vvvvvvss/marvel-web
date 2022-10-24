import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      crdnCourses: [string];
      createdAt: string;
      doIKnow: string;
      email: string;
      id: string;
      name: string;
      profilePic: string;
      scope: [string];
      slug: string;
      updatedAt: string;
    };
  }
}
