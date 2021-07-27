import type { SentenseData } from "src/pages/api/getAllSentensesData";

const GetAllSentenseIds = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
      },
    });
    const sentenses = await response.json();
    return sentenses.map((sentense: SentenseData) => {
      return {
        params: {
          sentenseId: String(sentense.sentense_id),
        },
      };
    });
  } catch (err) {
    console.log(err); //eslint-disable-line
  }
};

export default GetAllSentenseIds;
