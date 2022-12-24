import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      crdnCourses: [string];
      createdAt: string;
      doIKnow: 'KNOWN' | 'UNKNOWN' | 'BANNED';
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
