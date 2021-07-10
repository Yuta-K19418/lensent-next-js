import Link from "next/dist/client/link";
import type { VFC } from "react";

export const LoginButton: VFC = () => {
  return (
    <button
      className="    pt-3
    pr-5
    pb-3
pl-5
    m-1
    text-xs
    font-semibold
    text-white
    hover:text-indigo-900
    hover:bg-none
    rounded-md
    border-2
    border-transparent
    border-solid
    transition-all
    duration-200
    ease-in-out
    outline-none
    focus:outline-none
		bg-secondary"
    >
      <Link href="/api/auth/login">Login</Link>
    </button>
  );
};
