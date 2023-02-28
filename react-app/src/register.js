import React, { Component } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import AppNavbar from "./Navbar";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newusers: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/newusers")
      .then((response) => response.json())
      .then((data) => this.setState({ newusers: data, isLoading: false }));
  }
  render() {
    return (
      <div>
        <AppNavbar />
        <Card style={{ width: "800px" }} className="mx-auto mt-5">
          <form onSubmit={this.handleSubmit}>
            <h3> Sign Up</h3>

            <div className="form-group">
              <label> Name</label>
              <input type="text" className="form-control" placeholder=" Name" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => (this.password = e.target.value)}
              />

              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}
