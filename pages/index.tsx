import React, { useRef, useState } from 'react';
import LoginPage from '../components/user/LoginForm';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { GetServerSideProps } from 'next';
import { authOptions } from './api/auth/[...nextauth]';

export interface IHomePageProps {
  id: number;
  email: string;
}

const HomePage = () => {
  const { data: session, status } = useSession();

  console.log('session', session);

  return <div>메인 페이지 입니다!</div>;
};
export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
