import React from "react";
import { Form } from "semantic-ui-react";

class PokemonForm extends React.Component {
  state = { name: "", hp: "", frontUrl: "", backUrl: "" };

  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: e.target[0].value,
        hp: e.target[1].value,
        sprites: { front: e.target[2].value, back: e.target[3].value },
      }),
    };

    fetch("http://localhost:3000/pokemon", options)
      .then((res) => res.json())
      .then((pokemon) => {
        this.props.addPokemon(pokemon);
      });
    e.target.reset();
  };
  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="hp"
              placeholder="hp"
              name="hp"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Front Image URL"
              placeholder="url"
              name="frontUrl"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Back Image URL"
              placeholder="url"
              name="backUrl"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default PokemonForm;
