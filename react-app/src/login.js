import React from "react";
import { GoogleLogin } from "@react-oauth/google";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import AppNavbar from "./Navbar";
import LoginForm from "./loginform";


export default function Login() {
 
  
  return (
    <div>
      <AppNavbar />

      <div className="container">
        <Card style={{ width: "800px" }} className="mx-auto mt-5">
          <Card.Header className="pb-4">
            <h1>Sign In</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>
             
              <React.Fragment>
                <h3>Please login using one of the following:</h3>
                <LoginForm />
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse.credential);
                    var decoded = jwt_decode(credentialResponse.credential);
                    console.log(decoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </React.Fragment>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );

  // function LoginForm() {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const info = urlParams.get('info');

  //   if(info) {
  //     const errorMessage = document.getElementById('error-message');
  //     errorMessage.innerText= info;

  //     if(info) {
  //       const errorMessage = document.getElementById('error-message')
  //     }
  //   }
  //   return (
  //     <form className="border mt-3 mb-5 p-3 bg-white">
  //       <label className="m-2">Username:</label>
  //       <input type="text" name="name" placeholder="Enter username" />
  //       <label className="m-2">Password</label>
  //       <input type="password" name="email" placeholder="Enter password" />
  //       <input
  //         type="submit"
  //         value="Login"
  //         className="btn bg-success text-white my-3"
  //       />
  //     </form>
  //   );
  // }
}
// function Home() {
//   return (
//     <React.Fragment>
//       <h3 className="d-inline text-success mx-2">
//         Welcome back!
//       </h3>
//       <p className="my-5">This is the home page of the app.</p>
//     </React.Fragment>
//   );
// }
