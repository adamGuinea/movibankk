import React from "react";
import HomePage from "./pages/homePage";
import SingleMovie from "./pages/singleMovie";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const NotFound = () => (
  <div className="NotFound">
    <div>404</div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:id" component={SingleMovie} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
