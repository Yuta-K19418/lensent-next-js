import { useAuth0 } from "@auth0/auth0-react";
import { AUDIENCE, AUTH0_SCOPE } from "src/pages/api/auth/lib/auth0-config";

const HttpPost = async (postData: any, url: string) => {
  const { getAccessTokenSilently } = useAuth0();

  try {
    const accessToken = await getAccessTokenSilently({
      audience: AUDIENCE,
      scope: AUTH0_SCOPE,
    });

    const postDataResponse = await fetch(AUDIENCE + url, {
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
