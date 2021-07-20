import { initAuth0 } from "@auth0/nextjs-auth0";

import config from "./auth0-config";

export const OnInitializedAuth0 = () => {
  const params = {
    audience: config.AUDIENCE,
    domain: config.AUTH0_ISSUER_BASE_URL,
    clientId: config.AUTH0_CLIENT_ID,
    clientSecret: config.AUTH0_CLIENT_SECRET,
    scope: config.AUTH0_SCOPE,
    redirectUri: "http://localhost:3000/api/callback",
    postLogoutRedirectUri: "http://localhost:3000/",
  };

  return initAuth0(params);
};
