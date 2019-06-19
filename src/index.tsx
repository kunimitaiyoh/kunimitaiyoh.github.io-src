import { App } from "@/App";
import * as util from "@/util";
import { BUILD_DATE } from "@/config";

(async function() {
  const res = await import(/* webpackChunkName: "resources" */ "./resources");
  const { Instant } = await import(/* webpackChunkName: "js-joda" */  "js-joda");
  const React = await import(/* webpackChunkName: "react" */ "react");
  const ReactDOM = await import(/* webpackChunkName: "react-dom" */ "react-dom");

  const buildDate = Instant.parse(BUILD_DATE);
  const age = util.calculateAge(1990, 12, 21, new Date());
  const queryParams = util.extractQueryParams(window.location.search);
  const environment = util.getEnvironment(queryParams, window);
  const resources = await res.getResources(environment.language);
  const props = { buildDate, resources, environment, age };

  const container = document.getElementById("app");

  ReactDOM.render(<App { ...props } />, container)
})();
