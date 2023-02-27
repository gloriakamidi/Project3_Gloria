import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faDumbbell, faUser  } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles/Navbar.css"
import { useAuth0} from '@auth0/auth0-react'

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar className="navbar-dark bg-dark px-5" expand="md">
        
          <NavbarBrand tag={Link} to="/">
            <FontAwesomeIcon
              icon={faHome}
              className="fas fa-2x my-3 mr-2 text-white"
            />
          </NavbarBrand>
          <NavbarBrand tag={Link} to="/exercises">
            <FontAwesomeIcon
              icon={faDumbbell}
              className="fas fa-2x my-3 mr-2 text-white"
            />
          </NavbarBrand>
          <NavbarBrand tag={Link} to="/login">
            <FontAwesomeIcon
              icon={faUser}
              className="fas fa-2x my-3   text-white"
            />
          </NavbarBrand>
       
      </Navbar>
    );
  }
}
