export type SentenseData = {
  sentense_id: string /*eslint-disable-line*/;
  title: string;
  sentense: string;
  user: string;
};

const GetAllSentensesData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/`, {
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
