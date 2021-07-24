import { useUser } from "@auth0/nextjs-auth0";

export type SentenseData = {
  sentense_id: string /*eslint-disable-line*/;
  title: string;
  sentense: string;
  user: string;
};

type GetSentensesData = () => Promise<SentenseData | null>;

const GetAllSentensesData: GetSentensesData = async () => {
  const { user } = useUser();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/?user=${user?.sub}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
};

export default GetAllSentensesData;
