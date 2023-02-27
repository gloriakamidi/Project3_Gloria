import React, { Component } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExerciseList from "./ExerciseList";
import ExerciseEdit from "./ExerciseEdit";
import "./App.css";
import { useMediaQuery } from 'react-responsive';
import Login from "./login";
import Particle from "./Particle";


// const isMobileDevice = useMediaQuery({
//   query: "(min-device-width: 480px)",
// });

// const isTabletDevice = useMediaQuery({
//   query: "(min-device-width: 768px)",
// });

// const isLaptop = useMediaQuery({
//   query: "(min-device-width: 1024px)",
// });

// const isDesktop = useMediaQuery({
//   query: "(min-device-width: 1200px)",
// });

// const isBigScreen = useMediaQuery({
//   query: "(min-device-width: 1201px )",
// });
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
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
