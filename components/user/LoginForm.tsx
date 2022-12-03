import React, { useRef } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const idInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = idInput.current?.value;
    const password = pwInput.current?.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!result?.error) {
      router.replace('/');
    }
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" ref={idInput} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" id="password" ref={pwInput} />
        </div>
        <button>로그인</button>
      </form>
    </section>
  );
};

export default LoginForm;
