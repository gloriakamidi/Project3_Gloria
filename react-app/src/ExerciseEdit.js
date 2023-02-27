import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./Navbar";

class ExerciseEdit extends Component {
  emptyExercise = {
    exercisename: " ",
    minutes: " ",
    priority: " ",
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyExercise,
    };
  }
  async componentDidMount() {
    const exerciseId = window.location.href.split( "/" )[4];
    // if (this.props.match.params.id !== 'new') {
    if (exerciseId !== "new") {
      const exercise =
        // await (await fetch(`/api/exercise/${this.props.match.params.id}`)).json();
        await (await fetch(`/api/exercise/${ exerciseId }`)).json();

      this.setState({ item: exercise });
    }
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/api/exercise", {
      method: (item._id) ? "PUT" : "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    // this.props.history.push('/exercises');
    window.location.href = "/exercises";
  };
  render() {
    const { item } = this.state;
    const title = 
      <h2 className="mt-3">
        {/* if item has an id number, otherwise... */}
        {item._id ? "Edit Exercise" : "Add Exercise"}
      </h2>
    return (
      <div className="add">
        <AppNavbar />
        {/* <Container> */}
        {/* display the appropriate title*/}
        <Card style={{ width: "800px" }} className="mx-auto mt-5">
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="exercisename" className="h5 mt-1">
                Exercise
              </Label>
              <Input
                type="text"
                name="exercisename"
                id="exercisename"
                value={item.exercisename || ""}
                onChange={this.handleChange}
                autoComplete="exercisename"
              />
            </FormGroup>
            <FormGroup>
              <Label for="minutes" className="h5 mt-2">
                Time in Minutes
              </Label>
              <Input
                type="text"
                name="minutes"
                id="minutes"
                value={item.minutes || ""}
                onChange={this.handleChange}
                autoComplete="minutes"
              />
            </FormGroup>
            <FormGroup>
              <Label for="priority" className="h5 mt-2">
                Priority
              </Label>
              <Input
                type="text"
                name="priority"
                id="priority"
                value={item.priority || ""}
                onChange={this.handleChange}
                autoComplete="priority"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" className="mt-3">
                Save
              </Button>{" "}
              <Button
                color="secondary"
                className="mt-3"
                tag={Link}
                to="/exercises"
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Card>
        {/* </Container> */}
      </div>
    );
  }
}

export default ExerciseEdit;
