import React from "react";
import ErrorBoundary from "react-error-boundary";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/homePage";
import SingleMovie from "./pages/singleMovie";
import { FallbackComponent } from "./components/errors/FallbackComponent";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:id" component={SingleMovie} />
        </ErrorBoundary>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
