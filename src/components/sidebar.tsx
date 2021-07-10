import Link from "next/link";
import type { VFC } from "react";

const items = [
  { href: "/", label: "ホーム" },
  { href: "/enroll-sentense", label: "英文登録" },
];

export const Sidebar: VFC = () => {
  return (
    <nav>
      {items.map(({ href, label }) => {
        return (
          <Link key={href} href={href}>
            <a
              className="							  text-gray-900 rounded-lg hover:text-gray-900 focus:text-gray-900
  							focus:outline-none
block flex-grow mt-7 ml-16 text-sm font-semibold"
            >
              {label}
            </a>
          </Link>
        );
      })}
    </nav>
  );
};
