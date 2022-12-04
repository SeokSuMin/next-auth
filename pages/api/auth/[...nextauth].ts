import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { buildFeedbackPath, extractFeedback } from '../../../lib/user';
import type { NextAuthOptions } from 'next-auth';
import { NextApiRequest } from 'next';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials: Record<any, any>, req: NextApiRequest) {
        const filePath = buildFeedbackPath(); // 임시 파일 시스템
        const userData = extractFeedback(filePath); // 임시 파일 시스템

        const user = userData.find((userinfo) => userinfo.email === credentials?.email);
        if (!user) {
          throw new Error('No user found!');
        }

        return { userId: user.email, address: 'test address' };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
