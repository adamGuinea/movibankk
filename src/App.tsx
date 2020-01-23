import React, { lazy, Suspense } from "react";
import ErrorBoundary from "react-error-boundary";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/homePage";
import { FallbackComponent } from "./components/errors/FallbackComponent";
import PageProvider from "./components/context/PageContext";
import { LoadingAnimation } from "./components/LoadingAnimation";

const SingleMovie = lazy(() => import("./pages/singleMovie"));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <PageProvider>
            <Route exact path="/" component={HomePage} />
          </PageProvider>
          <Suspense fallback={<LoadingAnimation />}>
            <Route exact path="/:id" component={SingleMovie} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
