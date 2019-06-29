import { App } from "@/App";
import * as util from "@/util";
import { BUILD_DATE } from "@/config";
import * as React from "react";
import { render } from "react-dom";
import { Instant } from "@/data/instant";

const buildDate = Instant.of(BUILD_DATE);
const age = util.calculateAge(1990, 12, 21, new Date());
const props = { buildDate, age };

const container = document.getElementById("app");

render(<App { ...props } />, container)
