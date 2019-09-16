import { App } from "@/App";
import { BUILD_DATE } from "@/config";
import { Instant } from "@/data/instant";
import * as util from "@/util";
import { h, render } from "preact";

const buildDate = Instant.of(BUILD_DATE);
const age = util.calculateAge(1990, 12, 21, new Date());
const props = { buildDate, age };

const container = document.getElementById("app");

render(<App { ...props } />, container!)
