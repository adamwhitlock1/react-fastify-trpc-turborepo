import { useMemo, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

import { trpc } from "../../hooks/trpc";
import AppBody from "../AppBody";
import { TRPCClient } from "@trpc/client";
import LoginButton from "../auth/LoginButton";
import LoadingIndicator from "./LoadingIndicator";

export const TrpcWrapper = () => {
  const { getAccessTokenSilently, isLoading } = useAuth0();
  const queryClient = useMemo(() => new QueryClient(), []);
  const [trpcClient, setTrpcClient] = useState<TRPCClient<any>>();

  const getTokenForClient = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      console.log({ accessToken });

      setTrpcClient(
        trpc.createClient({
          url: "http://localhost:3333/trpc",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      );
    } catch (e) {
      console.log("error occured", e);
    }
  };

  useEffect(() => {
    getTokenForClient();
  }, []);

  if (trpcClient) {
    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AppBody />
        </QueryClientProvider>
      </trpc.Provider>
    );
  }
  if (isLoading) return <LoadingIndicator />;

  return <LoginButton />;
};
