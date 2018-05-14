import App from "./App";
import * as util from "./util";
import * as res from "./resources";
import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";

const age = util.calculateAge(1990, 12, 21, new Date());
const queryParams = util.extractQueryParams(window);
const environment = util.getEnvironment(queryParams, window);
const resources = res.getResources(environment.language);

const props = {
    resources: resources,
    environment,
    age,
};

const container = document.getElementById("app");
const render = (props) => ReactDOM.render(<App {...props}/>, container);
render(props);
