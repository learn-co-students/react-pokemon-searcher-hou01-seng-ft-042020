import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state = {
    pokemonCollection: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(result => {
        result.forEach(p => p.isClicked = false)
        this.setState({
          pokemonCollection: result
        })
      })
  }

  toggleImage = (p) => {
    const collection = this.state.pokemonCollection
    const i = collection.indexOf(p)
    const index = p.id - 2
    this.setState({
      pokemonCollection: [...collection.slice(0, i), {...p, isClicked: !p.isClicked}, ...collection.slice(i + 1)]
    })
  }

  addPokemon = (e) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: e.target[0].value,
        stats: [
          {
            value: e.target[1].value,
            name: 'hp'
          }
        ],
        sprites: {
          front: e.target[2].value,
          back: e.target[3].value
        }
      })
    }
    fetch('http://localhost:3000/pokemon', options)
      .then(res => res.json())
      .then(pokemon => {
        this.setState({
          pokemonCollection: [...this.state.pokemonCollection, pokemon]
        })
      })
      e.target.reset()
  }

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    const searchPokemon = this.state.pokemonCollection.filter(p => p.name.includes(this.state.searchTerm))
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search onChange={this.handleSearch} />
        <br />
        <PokemonCollection pokemonCollection={searchPokemon} toggleImage={this.toggleImage} />
      </Container>
    )
  }
}

export default PokemonPage
