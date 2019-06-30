import { h } from "preact";
import { Router, Route } from "preact-router";
import Profile from "@/views/Profile";
import { Resources } from "@/resources/types";
import { Instant } from "@/data/instant";
import { getResources } from "@/resources";
import { getEnvironment } from "@/util";

export function App(props: PropsBase) {
  function renderComponent(component: (props: AppProps) => JSX.Element): (route: { matches: Record<string, string | undefined> }) => JSX.Element {
    return (route) => {
      const environment = getEnvironment(route.matches, window);
      const resources = getResources(environment.language);

      // TODO: abandon resources from App.
      return component({ ...props, resources, environment });
    };
  }

  return (
    <Router>
      <Route path="/" component={ renderComponent(props => <Profile { ...props } />) } />
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
