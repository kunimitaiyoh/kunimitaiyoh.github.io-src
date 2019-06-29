import * as React from "react";
import { BrowserRouter, Route, Switch, RouteComponentProps } from "react-router-dom";
import Profile from "@/views/Profile";
import { Resources } from "@/resources/types";
import { getEnvironment, extractQueryParams } from "./util";
import { getResources } from "@/resources";
import { Instant } from "@/data/instant";

export function App(props: PropsBase): JSX.Element {
  function render(component: (props: AppProps) => JSX.Element): (route: RouteComponentProps) => JSX.Element {
    return (route) => {
      const queryParams = extractQueryParams(route.location.search);
      const environment = getEnvironment(queryParams, window);
      const resources = getResources(environment.language);

      // TODO: abandon resources from App.
      return component({ ...props, resources, environment });
    };
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ render(props => <Profile { ...props } />) } ></Route>
      </Switch>
    </BrowserRouter>
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
