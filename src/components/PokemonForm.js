import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {

  constructor() {
    super()
    this.state = {
      pokemon: {name: '', hp: '', frontUrl: '', backUrl: ''}
    }
  }

  // this.props.addPokemon(this.state.pokemon)

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, hp, frontUrl, backUrl } = this.state
    debugger
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        stats: [
          {
            value: hp,
            name: 'hp'
          }
        ],
        sprites: {
          front: frontUrl,
          back: backUrl
        }
      })
    }
    fetch(`http:pokemon//localhost:3000/${this.state.pokemon.id}`, options)
      .then(res => res.json())
      .then(pokemon => {
        this.props.addPokemon(pokemon)
        .catch(error => console.error(error))
      })
      e.target.reset()

  }

  render() {
    const { name, hp, frontUrl, backUrl } = this.state
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid onChange={this.handleChange} label="Name" placeholder="Name" name="name" value={name}/>
            <Form.Input fluid onChange={this.handleChange} label="hp" placeholder="hp" name="hp" value={hp}/>
            <Form.Input fluid onChange={this.handleChange} label="Front Image URL" placeholder="url" name="frontUrl" value={frontUrl}/>
            <Form.Input fluid onChange={this.handleChange} label="Back Image URL" placeholder="url" name="backUrl" value={backUrl}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
