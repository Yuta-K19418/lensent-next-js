import { useAuth0 } from "auth0-react";

const HttpPost = async (postData: any, url: string) => {
  const { getAccessTokenSilently } = useAuth0();

  try {
    const accessToken = await getAccessTokenSilently({
      audience: ``,
      scope: "read:current_user",
    });

    const postDataResponse = await fetch("" + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${accessToken}`, //eslint-disable-line @typescript-eslint/naming-convention
      },
      body: postData,
    });

    return await postDataResponse.json();
  } catch (err) {
    //console.log(err);
  }
};

export default HttpPost;
