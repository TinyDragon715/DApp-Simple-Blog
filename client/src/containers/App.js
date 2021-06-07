import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import routes from "../modules/routes";
import { setNotification } from "../modules/redux/actions";

import blogUtils from "../utils/blogUtils";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/shards_1.1.0.min.css";
import "./App.scss"

const App = ({
  notificationCount,
  setNotification
}) => {
  return (
    <Router>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={() => {
                return (
                  <route.layout>
                    <route.component/>
                  </route.layout>
                );}
              }
            />
          );
        })}
      </div>
    </Router>
  );
}

const mapStateToProps = ({ global }) => ({
  notificationCount: global.notificationCount,
});

const mapToDispatchProps = (dispatch) => ({
  setNotification: (count) => dispatch(setNotification(count)),
});

export default connect(mapStateToProps, mapToDispatchProps)(App);