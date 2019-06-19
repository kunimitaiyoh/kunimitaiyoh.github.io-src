import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "@/views/Profile";
import { Resources } from "./resources";

export function App(props: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ () => <Profile { ...props } /> } ></Route>
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
