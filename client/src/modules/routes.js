import React from "react";
import Layout from "../app/layout.js";
import BlogList from "../app/pages/BlogList.js";

export default [
  {
    path: "/",
    exact: true,
    layout: Layout,
    component: BlogList
  }
];
