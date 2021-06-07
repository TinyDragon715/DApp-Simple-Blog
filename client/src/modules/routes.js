import React from "react";
import Layout from "../containers/Layout/Layout";
import BlogList from "../containers/Blog/BlogList";
import Friends from "../containers/Friends/Friends";

export default [
  {
    path: "/",
    exact: true,
    layout: Layout,
    component: BlogList
  },
  {
    path: "/friends",
    exact: false,
    layout: Layout,
    component: Friends
  }
];
