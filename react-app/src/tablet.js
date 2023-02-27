import React, { Component } from "react";
import "./App.css";

export default class Tablet extends Component{
    render(){
        return (
          <div className="tablet-mobile">
            <p>Whoops! I'm in tablet-mobile mode.</p>
            <p>But if you see anything below me, i am now in Desktop mode</p>
          </div>
        );
    }
}