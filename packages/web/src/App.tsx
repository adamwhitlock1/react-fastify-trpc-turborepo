import { AuthProviderWrapper } from "./components/auth/AuthProviderWrapper";
import { TrpcWrapper } from "./components/shared/TrpcWrapper";

const App = () => {
  return (
    <AuthProviderWrapper>
      <TrpcWrapper />
    </AuthProviderWrapper>
  );
};

export default App;
