import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup"
import NewMockup from "./containers/NewMockup";
import NotFound from "./containers/NotFound";
import Scans from "./containers/Scans";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/scans/new">
        <NewMockup />
      </Route>
      <Route exact path="/scandata/:userId/:scanId">
        <Scans />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}