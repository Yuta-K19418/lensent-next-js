import Link from "next/dist/client/link";
import type { VFC } from "react";

export const LoginButton: VFC = () => {
  return (
    <button
      className="        ease-in-out outline-none focus:outline-none
pt-3 pr-5 pb-3 pl-5 m-1 text-xs font-semibold text-white
        hover:text-indigo-900 bg-secondary hover:bg-none rounded-md
        border-2 border-transparent border-solid transition-all duration-200"
    >
      <Link href="/api/auth/login">Login</Link>
    </button>
  );
};

export const LogoutButton: VFC = () => {
  return (
    <button
      className="        ease-in-out outline-none focus:outline-none
pt-3 pr-5 pb-3 pl-5 m-1 text-xs font-semibold text-white
        hover:text-indigo-900 bg-secondary hover:bg-none rounded-md
        border-2 border-transparent border-solid transition-all duration-200"
    >
      <Link href="/api/auth/logout">Logout</Link>
    </button>
  );
};

export const RegisterSentenseButton: VFC = () => {
  return (
    <button
      className="        ease-in-out outline-none focus:outline-none
pt-3 pr-5 pb-3 pl-5 m-1 text-xs font-semibold text-white
        hover:text-indigo-900 bg-secondary hover:bg-none rounded-md
        border-2 border-transparent border-solid transition-all duration-200"
      type="submit"
    >
      登録
    </button>
  );
};

export const BackButton: VFC = () => {
  return (
    <button
      className="        ease-in-out outline-none focus:outline-none
pt-3 pr-5 pb-3 pl-5 m-1 text-xs font-semibold text-white
        hover:text-indigo-900 bg-secondary hover:bg-none rounded-md
        border-2 border-transparent border-solid transition-all duration-200"
    >
      <Link href="/title-list">戻る</Link>
    </button>
  );
};
