import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import GoodsList from "../routes/GoodsList";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={GoodsList} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
