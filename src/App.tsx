import React from "react";
import ErrorBoundary from "react-error-boundary";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/homePage";
import SingleMovie from "./pages/singleMovie";
import { FallbackComponent } from "./components/errors/FallbackComponent";
import PageProvider from "./components/context/PageContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <PageProvider>
            <Route exact path="/" component={HomePage} />
          </PageProvider>
          <Route exact path="/:id" component={SingleMovie} />
        </ErrorBoundary>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
