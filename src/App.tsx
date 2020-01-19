import React, { lazy, Suspense } from "react";
import ErrorBoundary from "react-error-boundary";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/homePage";
import { FallbackComponent } from "./components/errors/FallbackComponent";
import { LoadingAnimation } from "./components/LoadingAnimation";

const SingleMovie = lazy(() => import("./pages/singleMovie"));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <Route exact path="/" component={HomePage} />
          <Suspense fallback={<LoadingAnimation />}>
            <Route exact path="/:id" component={SingleMovie} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
