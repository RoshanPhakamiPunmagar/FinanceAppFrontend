import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdDashboard } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logOut } = useAuth();

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#">FT</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
            {user?._id ? (
              <>
                {/* Private Links */}
                <Nav.Link to="/dashboard" as={Link}>
                  <MdDashboard /> Dashboard
                </Nav.Link>
                <Nav.Link to="/transaction" as={Link}>
                  <FaChartLine /> Trasaction
                </Nav.Link>

                <Button variant="outline-success" onClick={logOut}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* public links */}
                <Nav.Link to="/login" as={Link}>
                  <FaChartLine /> Login
                </Nav.Link>
                <Nav.Link to="/signup" as={Link}>
                  <FaChartLine />
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
