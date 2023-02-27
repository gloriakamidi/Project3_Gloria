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
        {/* <Container fluid>
          <Button className="m-5 nav bg-light">
            <Link to="/exercises" className="nav-link">
              View Daily Exercises
            </Link>
          </Button>
        </Container> */}
        <Weather />
      </div>
    );
  }
}

export default Home;
