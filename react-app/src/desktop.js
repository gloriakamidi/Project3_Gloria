import React, { Component } from "react";
import "./App.css";

export default class Desktop extends Component {
    render(){
        return (
          <div className="desktop">
            <p>Whoops! I'm in desktop mode.</p>
            <p>But if you see anything below me, i am now in Laptop mode</p>
          </div>
        );
    }
}