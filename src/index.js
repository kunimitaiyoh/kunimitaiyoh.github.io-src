import App from "./App";
import * as util from "./util";
import resources from "./resources";
import React from 'react';
import ReactDOM from 'react-dom';

const age = util.calculateAge(1990, 12, 21, new Date());
const queryParams = util.extractQueryParams(window);
const environment = util.getEnvironment(queryParams, window);
const r = resources.get(environment.language);

const props = {
    errors: resources.errors,
    r,
    environment,
    age,
};

const container = document.getElementById("app");
const render = (props) => ReactDOM.render(<App {...props}/>, container);
render(props);
