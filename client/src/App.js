import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from './modules/routes';

import blogUtils from "./utils/blogUtils";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/shards_1.1.0.min.css";
import "./assets/css/style.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { tab: "Home", web3: null };

    }

    componentDidMount = async () => {
        this.setState({ web3: blogUtils.web3 });
    }

    buttonClicked = (event) => {
        switch (event.target.name) {
            case "Home":
                this.setState({ tab: "Home" });
                break;
            case "Write":
                this.setState({ tab: "Write" });
                break;
            case "Rewards":
                this.setState({ tab: "Rewards" });
                break;
        }
    }

    changeTab = (newTab) => {
        switch (newTab) {
            case "Home":
                this.setState({ tab: "Home" });
                break;
            case "Write":
                this.setState({ tab: "Write" });
                break;
            case "Rewards":
                this.setState({ tab: "Rewards" });
                break;
        }
    }

  render() {
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
}

export default App;