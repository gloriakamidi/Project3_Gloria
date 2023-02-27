import React, { Component} from "react";

export default class LoginForm extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, password } = this.state;
    console.log(name, password);
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="border mt-3 mb-5 p-3 bg-white"
      >
        <label className="m-2">Username:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter username"
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <label className="m-2">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <input
          type="submit"
          value="Login"
          className="btn bg-success text-white my-3"
        />
      </form>
    );
  }
}

// export default class LoginForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       password: "",
//     };
//   }
//   handleSubmit() {
//     const { name, password } = this.state;
//     console.log(name, password);
//     console.log("Gloria");
//   }
//   render() {
    
//     return (
//       <form
//         onSubmit={this.handleSubmit}
//         className="border mt-3 mb-5 p-3 bg-white"
//       >
//         <label className="m-2">Username:</label>
//         <input type="text" name="name" placeholder="Enter username" />
//         <label className="m-2">Password</label>
//         <input type="password" name="password" placeholder="Enter password" />
//         <Button
//           type="submit"
//           value="Login"
//           className="btn bg-success text-white my-3"
         
//         />
//       </form>
//     );
//   }
// }
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