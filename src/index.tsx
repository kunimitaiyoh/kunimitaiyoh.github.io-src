import { App } from "@/App";
import * as util from "@/util";
import { BUILD_DATE } from "@/config";
import { Instant } from "js-joda";
import * as React from "react";
import { render } from "react-dom";

const buildDate = Instant.parse(BUILD_DATE);
const age = util.calculateAge(1990, 12, 21, new Date());
const props = { buildDate, age };

const container = document.getElementById("app");

render(<App { ...props } />, container)
