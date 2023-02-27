import React, { Component } from "react";
import "./App.css";

export default class  Laptop extends Component{
    render(){
        return (
          <div className="laptop">
            <p>Whoops! I'm in laptop mode.</p>
            <p>But if you see anything below me, i am now in Big Screen mode</p>
          </div>
        );
    }
    
}