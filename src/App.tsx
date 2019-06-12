import * as React from "react";
import { BrowserRouter, Route, Switch, RouteComponentProps } from "react-router-dom";
import Profile from "@/views/Profile";
import { Resources } from "./resources";
import { getEnvironment, extractQueryParams } from "./util";
import { IntlMessage } from "@/i18n";
import { getResources } from "@/resources";

export function App(props: PropsBase): JSX.Element {
  function render(component: (props: AppProps) => JSX.Element): (route: RouteComponentProps) => JSX.Element {
    return (route) => {
      const queryParams = extractQueryParams(route.location.search);
      const environment = getEnvironment(queryParams, window);
      const resources = getResources(environment.language);

      const i18n = new IntlMessage(environment.language);

      // TODO: abandon resources from App.
      return component({ ...props, resources, environment, i18n });
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
  age: any;
}

export interface AppProps extends PropsBase {
  environment: any;
  resources: Resources;
  i18n: IntlMessage;
}
