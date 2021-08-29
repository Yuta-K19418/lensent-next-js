import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";

import { RegisterSentenseButton } from "../components/buttons";
import { Layout } from "../components/layout";
import { Sidebar } from "../components/sidebar";

const RegisterSentense: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [title, setTitle] = useState("");
  const [sentense, setSentense] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
    },

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "500px",
      height: "300px",
      transform: "translate(-50%, -50%)",
    },
  };

  const handlePostSentenseData = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
      },
      body: `{
      "sub": "${user?.sub}",
      "title": "${title.replace(/\r?\n/g, "<br>").replace(/"/g, '\\"')}",
      "sentense": "${sentense.replace(/\r?\n/g, "<br>").replace(/"/g, '\\"')}"
      }`,
    }).then((response) => {
      if (!response.ok) {
        alert("Posting sentense failed.");
      } else {
        openModal();
      }
      return response.json();
    });
  };

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;

  if (user)
    return (
      <Layout>
        <div className="flex">
          <Sidebar />
          <div className="xl:ml-32 xl:w-1/2 xl:h-1/3">
            <label className="block mt-7 text-sm font-bold text-gray-700" htmlFor="title-label">
              タイトルを入力してください。
            </label>
            <textarea
              className="focus:outline-none block mt-7 shadow appearance-none
                border rounded py-2 text-gray-700 leading-tight w-full"
              placeholder="Apple"
              onChange={(e) => /* eslint-disable-line */ {
                setTitle(e.target.value);
              }}
            />
            <label className="block mt-7 text-sm font-bold text-gray-700" htmlFor="sentense-label">
              英文を入力してください。
            </label>
            <textarea
              className="inline-block shadow
                border rounded text-gray-700
                w-full focus:outline-none align-text-top break-words"
              placeholder="This is an apple."
              rows="10"
              onChange={(e) => /* eslint-disable-line */ {
                setSentense(e.target.value);
              }}
            />
            <div className="mt-7 xl:w-full text-right" onClick={handlePostSentenseData} /*eslint-disable-line*/>
              <RegisterSentenseButton />
            </div>
          </div>
        </div>
        <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyles}>
          <div className="justify-center">
            <div className="flex justify-center mb-4 w-28 h-28 text-blue-600 rounded-full border-4 border-blue-600">
              <svg className="w-20 fill-current" viewBox="0 0 20 20">
                <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-blue-600">Success</h2>
            <p>登録が正常に完了しました。</p>
            <button
              className="w-full font-semibold text-white bg-blue-600
                hover:bg-blue-700 rounded-b-md focus:ring shadow-lg
                hover:shadow-none transition-all duration-300"
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        </Modal>
      </Layout>
    );
  else return <Link href="/api/auth/login" />;
};

export default RegisterSentense;
