import React, { Component} from "react";


export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    };
  }
  handleSubmit() {
    const { name, password } = this.state;
    console.log(name, password);
  }
  render() {
    return (
      <form 
      onSubmit={this.handleSubmit}
      className="border mt-3 mb-5 p-3 bg-white">
        <label className="m-2">Username:</label>
        <input type="text" name="name" placeholder="Enter username" />
        <label className="m-2">Password</label>
        <input type="password" name="email" placeholder="Enter password" />
        <input
          type="submit"
          value="Login"
          className="btn bg-success text-white my-3"
        />
      </form>
    );
  }
}
//  export default function LoginForm()  {
    
//    const urlParams = new URLSearchParams(window.location.search);
//    const info = urlParams.get("info");

//    if (info) {
//      const errorMessage = document.getElementById("error-message");
//      errorMessage.innerText = info;

//      if (info) {
//        const errorMessage = document.getElementById("error-message");
//      }
//    }

//    return (
//      <form className="border mt-3 mb-5 p-3 bg-white">
//        <label className="m-2">Username:</label>
//        <input type="text" name="name" placeholder="Enter username" />
//        <label className="m-2">Password</label>
//        <input type="password" name="email" placeholder="Enter password" />
//        <input
//          type="submit"
//          value="Login"
//          className="btn bg-success text-white my-3"
//        />
//      </form>
//    );
//  }