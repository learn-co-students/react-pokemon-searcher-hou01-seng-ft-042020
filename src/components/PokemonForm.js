import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {

  constructor() {
    super()
    this.state = {
      pokemon: {name: '', hp: '', frontUrl: '', backUrl: ''}
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { name, hp, frontUrl, backUrl } = this.state
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={(e) => {this.props.addPokemon(e, this.state)}}>
          <Form.Group widths="equal">
            <Form.Input 
              fluid 
              onChange={this.handleChange} 
              label="Name" 
              placeholder="Name" 
              name="name" 
              value={name}/>
            <Form.Input 
              fluid 
              onChange={this.handleChange} 
              label="hp" 
              placeholder="hp" 
              name="hp" 
              value={hp}/>
            <Form.Input 
              fluid 
              onChange={this.handleChange} 
              label="Front Image URL" 
              placeholder="url" 
              name="frontUrl" 
              value={frontUrl}/>
            <Form.Input 
              fluid 
              onChange={this.handleChange} 
              label="Back Image URL" 
              placeholder="url" 
              name="backUrl" 
              value={backUrl}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
