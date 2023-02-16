import React, { Component } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExerciseList from "./ExerciseList";
// import InventoryEdit from "./InventoryEdit";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/exercises" exact element={<ExerciseList />} />
          {/* <Route path="/exercises/:id" element={<InventoryEdit />} /> */}
        </Routes>
      </Router>
    );
  }
}

export default App;
