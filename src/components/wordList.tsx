import type { VFC } from "react";

export const WordList: VFC = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto bg-white dark:bg-gray-800 rounded shadow">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch p-4 lg:p-8 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center w-full lg:w-1/3">
            <div className="flex items-center">
              <a className="p-2 text-gray-600 dark:text-gray-400 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded border border-transparent focus:border-gray-800 cursor-pointer focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer icon icon-tabler icon-tabler-edit"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                  <line x1={16} y1={5} x2={19} y2={8} />
                </svg>
              </a>
              <a className="p-2 text-red-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded border border-transparent focus:border-gray-800 cursor-pointer focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer icon icon-tabler icon-tabler-trash"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={4} y1={7} x2={20} y2={7} />
                  <line x1={10} y1={11} x2={10} y2={17} />
                  <line x1={14} y1={11} x2={14} y2={17} />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center w-full lg:w-2/3">
            <div className="flex items-center py-3 lg:py-0 lg:px-6 lg:border-r lg:border-l border-gray-300 dark:border-gray-200">
              <p className="text-base text-gray-600 dark:text-gray-400">Viewing 1 - 20 of 60</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-scroll xl:overflow-x-hidden w-full">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="py-8 w-full h-16 border-b border-gray-300 dark:border-gray-200">
                <th className="pr-6 pl-8 text-sm font-normal tracking-normal leading-4 text-left text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    className="relative w-5 h-5 bg-white dark:bg-gray-800 rounded border border-gray-400 dark:border-gray-200 cursor-pointer outline-none" /*onclick="checkAll(this)"*/
                  />
                </th>
                <th className="pr-6 text-sm font-normal tracking-normal leading-4 text-left text-gray-600 dark:text-gray-400">
                  語句
                </th>
                <th className="pr-6 text-sm font-normal tracking-normal leading-4 text-left text-gray-600 dark:text-gray-400">
                  日本語訳
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-24 border-b border-gray-300 dark:border-gray-200">
                <td className="pr-6 pl-8 text-sm tracking-normal leading-4 text-left text-gray-800 dark:text-gray-100 whitespace-no-wrap">
                  <input
                    type="checkbox"
                    className="relative w-5 h-5 bg-white dark:bg-gray-800 rounded border border-gray-400 dark:border-gray-200 cursor-pointer outline-none" /*onclick="tableInteract(this)"*/
                  />
                </td>
                <td className="pr-6 text-sm tracking-normal leading-4 text-gray-800 dark:text-gray-100 whitespace-no-wrap">
                  #MC10023
                </td>
                <details>
                  <summary>見る</summary>
                  <td className="pr-6 text-sm tracking-normal leading-4 text-gray-800 dark:text-gray-100 whitespace-no-wrap">
                    $2,500
                  </td>
                </details>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
