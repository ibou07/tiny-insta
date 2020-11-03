'use strict'

import { HomeComponent } from "./components/home.component.js";
import { LoginComponent } from "./components/login.component.js";
const m = require("mithril");

const root = document.querySelector('main');

//remove !# from URI
// m.route.prefix = ""
m.route(root, "/login", {
    "/home": HomeComponent,
    "/login": LoginComponent
})