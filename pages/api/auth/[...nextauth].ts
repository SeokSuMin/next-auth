import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { buildFeedbackPath, extractFeedback } from '../../../lib/user';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const filePath = buildFeedbackPath();
        const userData = extractFeedback(filePath);

        const user = userData.find((userinfo) => userinfo.email === credentials?.email);
        if (!user) {
          throw new Error('No user found!');
        }
        return { email: user.email, image: '11233', address: 'testr' };
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // console.log('session!!', session.user);
      return session;
    },
  },
};

export default NextAuth(authOptions);
