import React, { Component } from "react";
import AppNavbar from "./Navbar";
// import { Link } from "react-router-dom";
// import { Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Weather";
import "./App.css";

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Weather />
      </div>
    );
  }
}

export default Home;
