import React, { Component } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExerciseList from "./ExerciseList";
import ExerciseEdit from "./ExerciseEdit";
import "./App.css";
import Login from "./login";
import Register from "./register";
// import SignIn from "./Signin";
import Particle from "./Particle";


class App extends Component {
  
  render() {
    return (
      <div>
        <Particle />

        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/exercises" exact element={<ExerciseList />} />
            <Route path="/exercises/:id" element={<ExerciseEdit />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            {/* <Route path="/Signin" exact element={<SignIn />} /> */}
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
