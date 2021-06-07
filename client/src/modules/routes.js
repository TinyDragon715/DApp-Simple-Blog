import React from "react";
import Layout from "../containers/Layout/Layout";
import BlogList from "../containers/Blog/BlogList";

export default [
  {
    path: "/",
    exact: true,
    layout: Layout,
    component: BlogList
  }
];
