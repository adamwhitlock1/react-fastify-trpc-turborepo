import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import Loading from "@monorepo/web/src/components/shared/LoadingIndicator";

export const ProtectedRoute = ({ component }: { component: ComponentType }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <Loading />
      </div>
    ),
  });

  return <Component />;
};
