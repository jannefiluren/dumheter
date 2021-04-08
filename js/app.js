import m from "mithril";
import Home from "./views/home";
import Temperature from "./views/temperature";

let root = document.body;

m.route(root, "/", {
    "/": Temperature, // Home
    "/temperature": Temperature,
});
