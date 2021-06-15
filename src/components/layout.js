import React, { useContext, useState } from "react";
import { getInitialArrayState, getRowsAndCols } from "../utils/logics";

import "./layout.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Solver from "../components/solver/solver";
import Generator from "../components/generator/generator";
import Header from "./header/header";

export const SArrayContext = React.createContext();

export default function Layout() {
  return (
    <>
      <Router>
        <Header />
        <div className="route_wrapper">
          <Switch>
            <Route path="/solver" exact component={Solver} />
            <Route path="/generator" exact component={Generator} />
            <Redirect from="/" to="/solver"></Redirect>
            <Route> 404 Not Found </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}
