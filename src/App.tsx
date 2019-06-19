import * as React from "react"
import { BrowserRouter, Route, Switch, RouteComponentProps } from "react-router-dom";
import Profile from "@/views/Profile";
import { Resources } from "./resources";
import { getEnvironment, extractQueryParams } from "./util";

export function App(props: PropsBase): JSX.Element {

  function render(component: (props: AppProps) => JSX.Element): (route: RouteComponentProps) => JSX.Element {
    return (route) => {
      const queryParams = extractQueryParams(route.location.search);
      const env = getEnvironment(queryParams, window);

      return component({ ...props });
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
  buildDate: any;
  resources: Resources;
  environment: any;
  age: any;
}

export interface AppProps extends PropsBase {
}
