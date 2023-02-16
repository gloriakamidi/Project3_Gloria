import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./Navbar";
import { Link } from "react-router-dom";

class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/exercises")
      .then((response) => response.json())
      .then((data) => this.setState({ exercises: data, isLoading: false }));
  }
  removeInv = async (id) => {
    await fetch(`/api/exercise/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("Remove Done!");
    //update inventory state minus removed item
    let updatedExercise = [...this.state.exercises].filter(
      (i) => i._id !== id
    );
    this.setState({ exercises: updatedExercise });
  };
  render() {
    const { exercises, isLoading } = this.state;

    // if(isLoading) {
    //     return <p>Loading...</p>;
    //  }

    const exerciseList = exercises.map((exercise) => {
      return (
        <div key={exercise._id}>
            <h2>Daily Exercises</h2>
           <div>
            <h3>{exercise.day}</h3>
            <div>
                {exercise.text}
            </div>
           </div>
        </div>
        
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button
              color="success"
              className="my-4"
              tag={Link}
              to="/exercises/new"
            >
              Add inventory
            </Button>
          </div>
          <h3>Daily Exercises</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">{exercises.day}</th>
              </tr>
            </thead>
            <tbody>{ExerciseList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ExerciseList;
