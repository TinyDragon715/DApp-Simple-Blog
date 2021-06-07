import React, { useState } from 'react';
import { 
  Container, 
  Navbar, 
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "shards-react";
import NavbarNotifications from "./NavbarNotifications.js";
import NavbarSearch from "./NavbarSearch.js";
import UserActions from "./UserActions.js";
import NewPeepModal from "../../components/NewPeepModal.js";
import brandImage from "../../../assets/images/oilfield-logo.png";

const TopNavbar = () => {
  // const [collapseOpen, setCollapseOpen] = useState(true);
  const [openModal, SetOpenModal] = useState(false);

  const newPeep = () => {
    SetOpenModal(true);
  }

  const closePeepModal = () => {
    SetOpenModal(false);
  }

  return (
    <div className="main-navbar bg-white sticky-top">
      <Container className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          <NavbarBrand href="/">
            <img src={brandImage} />
          </NavbarBrand>
          <Nav className="flex-row navbar-nav">
            <NavItem>
              <NavLink active href="#" className="d-flex align-items-center h-100">
                New
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className="d-flex align-items-center h-100">
                Friends
              </NavLink>
            </NavItem>
            <NavbarNotifications />
            <NavbarSearch />
            <UserActions />
            <NavItem className="align-items-center d-flex ml-2">
              <Button onClick={newPeep}>
                <i className="material-icons mr-1">edit</i>
                Peep
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </Container>
      <NewPeepModal open={openModal} toggle={closePeepModal} />
    </div>
  );
};

export default TopNavbar;
