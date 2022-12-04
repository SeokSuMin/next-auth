import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    address?: string;
    userId: string;
  }
  interface Session {
    user: User;
  }
}
