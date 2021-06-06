import React from "react";
import { Container, Row, Col } from "shards-react";
import TopNavbar from "./components/TopNavbar/TopNavbar.js";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.js";


const Layout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col
        className="main-content p-0"
        lg="12"
        md="12"
        sm="12"
        tag="main"
      >
      <TopNavbar />
        <Row className="mx-0 my-4">
          <Col
            lg="3"
            md="4"
            sm="4"
          >
            <LeftSidebar />
          </Col>
          <Col
            lg="9"
            md="8"
            sm="8"
          >
            {children}
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Layout;
