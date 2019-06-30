// import * as React from "preact";
import { h, render } from "preact";
import { Router, Route } from "preact-router";
// import { BrowserRouter, Route, Switch, RouteComponentProps } from "react-router-dom";
import Profile from "@/views/Profile";
import { Resources } from "@/resources/types";
import { getEnvironment, extractQueryParams } from "./util";
import { getResources } from "@/resources";
import { Instant } from "@/data/instant";

export function App(props: PropsBase): JSX.Element {
  function renderComponent(component: (props: AppProps) => JSX.Element): (route: RouteComponentProps) => JSX.Element {
    return (route) => {
      const queryParams = extractQueryParams(route.location.search);
      const environment = getEnvironment(queryParams, window);
      const resources = getResources(environment.language);

      // TODO: abandon resources from App.
      return component({ ...props, resources, environment });
    };
  }

  return (
    <Router>

      {/* <Route exact path="/" render={ render(props => <Profile { ...props } />) } ></Route> */}
    </Router>
  );
}

export interface PropsBase {
  buildDate: Instant;
  age: number;
}

export interface AppProps extends PropsBase {
  environment: { language: string };
  resources: Resources;
}
