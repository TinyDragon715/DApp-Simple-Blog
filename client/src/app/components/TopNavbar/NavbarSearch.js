import React from "react";
import { NavItem, NavLink} from "shards-react";

export default class NavbarSearch extends React.Component {
  render() {
    return (
      <NavItem>
        <NavLink
          className="nav-link-icon text-center"
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">search</i>
          </div>
        </NavLink>
      </NavItem>
    );
  }
}
