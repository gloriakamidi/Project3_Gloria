import React, { Component } from "react";
import "./App.css";

export default class BigScreen extends Component{
    render(){
        return (
          <div className="big-screen">
            <p>Whoops! I'm in big screen mode.</p>
            <p>This is the base of the pyramid</p>
          </div>
        );
    }
}