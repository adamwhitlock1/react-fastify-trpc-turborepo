import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProviderWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <Auth0Provider
      domain="dev-jiohplcg.auth0.com"
      clientId="7wJV7TBowCDUQg24fISlXMWbnRblft1T"
      redirectUri={window.location.origin}
      audience="https://snipe.sh"
      scope="openid profile"
    >
      {children}
    </Auth0Provider>
  );
};
