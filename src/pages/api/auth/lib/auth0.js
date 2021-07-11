import { initAuth0 } from "@auth0/nextjs-auth0";

import config from "./auth0-config";

export const OnInitializedAuth0 = () => {
  const params = {
    audience: config.AUDIENCE,
    domain: config.AUTH0_DOMAIN,
    clientId: config.AUTH0_CLIENT_ID,
    clientSecret: config.AUTH0_CLIENT_SECRET,
    scope: "read:current_user",
    redirectUri: config.AUTH0_BASE_URL + "/api/callback",
    postLogoutRedirectUri: config.AUTH0_BASE_URL,
  };

  return initAuth0(params);
};
