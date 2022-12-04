import Link from 'next/link';
import { Fragment } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
const Navigation = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const logout = () => {
    // 로그아웃후 리다이렉트 중지.
    signOut({ redirect: false });
    router.replace('/');
  };

  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <Link href="/">메인</Link>
          </li>
          {!session ? (
            <li>
              <Link href="/login">로그인</Link>
            </li>
          ) : (
            <Fragment>
              <li>
                <button onClick={logout}>로그아웃</button>
              </li>
              <li>
                <Link href="/profile">프로필</Link>
              </li>
            </Fragment>
          )}
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
