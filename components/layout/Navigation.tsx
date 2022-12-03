import Link from 'next/link';
import { Fragment } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
const Navigation = () => {
  const router = useRouter();

  const logout = () => {
    signOut();
    router.replace('/');
  };

  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <Link href="/">메인</Link>
          </li>
          <li>
            <Link href="/login">로그인</Link>
          </li>
          <li>
            <button onClick={logout}>로그아웃</button>
          </li>
          <li>
            <Link href="/profile">프로필</Link>
          </li>
        </ul>
        <style jsx>{`
          ul {
            display: flex;
          }
          li {
            margin-right: 20px;
          }
        `}</style>
      </nav>
    </Fragment>
  );
};

export default Navigation;
