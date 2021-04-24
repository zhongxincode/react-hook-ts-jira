import { AuthenticateApp } from "authenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import { UnAuthenticatedApp } from "unauthenticated-app";

import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticateApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
