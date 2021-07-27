import type { SentenseData } from "src/pages/api/getAllSentensesData";

type GetSentensesData = (sentenseId: string) => Promise<SentenseData | null>;

const GetSentenseData: GetSentensesData = async (sentenseId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/${sentenseId}/`, {
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

export default GetSentenseData;
