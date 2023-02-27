import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Card } from "react-bootstrap";
import AppNavbar from "./Navbar";
import { Link } from "react-router-dom";
import "./App.css";

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
  removeEx = async (id) => {
    await fetch(`/api/exercise/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("Remove Done!");
    //update exercise state minus removed item
    let updatedExercises = [...this.state.exercises].filter(
      (i) => i._id !== id
    );
    this.setState({ exercises: updatedExercises });
  };
  render() {
    const { exercises, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const exerciseList = exercises.map((exercise) => {
      return (
        <tr key={exercise._id}>
          <td style={{ whiteSpace: "nonwrap" }}>{exercise.exercisename}</td>
          <td>{exercise.minutes}</td>
          <td>{exercise.priority}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="info"
                tag={Link}
                to={"/exercises/" + exercise._id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.removeEx(exercise._id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <div className="container big-screen">
          {/* <div className="border mt-3 mb-5 p-3 bg-white"> */}
          {/* <Container fluid> */}
          <Card style={{ width: "800px" }} className="mx-auto mt-5">
            <Card.Header>
              <span>
                <h2>Daily Exercises</h2>
                {/* <div className="float-right bg-light"> */}
                {/* <Button
                    color="success"
                    className="my-4"
                    tag={Link}
                    to="/exercises/new"
                  >
                    Add Exercise
                  </Button> */}
                {/* </div> */}
              </span>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                {/* <h3> Exercises</h3> */}
                <Table className="mt-4">
                  <thead>
                    <tr>
                      <th width="20%">Exercises</th>
                      <th width="15%">Time in minutes</th>
                      <th width="15%">Priority</th>
                      <th width="15%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{exerciseList}</tbody>
                </Table>
                <Button
                  color="dark"
                  className="btn btn-outline-warning my-4"
                  tag={Link}
                  to="/exercises/new"
                >
                  Add Exercise
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
          {/* </Container> */}
        </div>
      </div>
    );
  }
}

export default ExerciseList;
