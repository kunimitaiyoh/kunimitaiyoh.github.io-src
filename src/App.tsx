import * as React from "react"
import { BrowserRouter, Route, Switch, RouteComponentProps } from "react-router-dom";
import Profile from "@/views/Profile";
import { Resources } from "./resources";

export function App(props: AppProps): JSX.Element {

  function render(component: (props: AppProps) => JSX.Element): (route: RouteComponentProps) => JSX.Element {
    return (route) => {
      // TODO: build AppProps using route here.

      return component(null as any);
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

export interface AppProps {
  buildDate: any;
  resources: Resources;
  environment: any;
  age: any;
}
