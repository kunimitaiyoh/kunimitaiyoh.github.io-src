import { App } from "@/App";
import * as util from "@/util";
import { BUILD_DATE } from "@/config";

(async function() {
  const { Instant } = await import(/* webpackChunkName: "js-joda" */  "js-joda");
  const React = await import(/* webpackChunkName: "react" */ "react");
  const ReactDOM = await import(/* webpackChunkName: "react-dom" */ "react-dom");

  const buildDate = Instant.parse(BUILD_DATE);
  const age = util.calculateAge(1990, 12, 21, new Date());
  const props = { buildDate, age };

  const container = document.getElementById("app");

  ReactDOM.render(<App { ...props } />, container)
})();
