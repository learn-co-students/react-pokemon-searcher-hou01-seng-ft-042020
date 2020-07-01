import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(pokemons => {
        this.setState({pokemons})
      })
  }

  toggleImage = (pokemon) => {
    const col = this.state.pokemons
    const i = col.indexOf(pokemon)
    this.setState({
      pokemons: [
        ...col.slice(0, i),
        // initially pokemon.isClicked is undefined; inverting that falsey value makes it true
        { ...pokemon, isClicked: !pokemon.isClicked },
        ...col.slice(i + 1)
      ]
    })
  }

  addPokemon = (e, pokemon) => {
    e.preventDefault()
    // debugger
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // name: e.target[0].value,
        name: pokemon.name,
        hp: parseInt(pokemon.hp),
        sprites: {
          front: pokemon.frontUrl,
          back: pokemon.backUrl
        }
      })
    }
    fetch('http://localhost:3000/pokemon', options)
      .then(res => res.json())
      .then(pokemon => {
        console.log(pokemon)
        this.setState({
          pokemons: [...this.state.pokemons, pokemon]
        })
      })
      .catch(error => console.error(error))
      e.target.reset()
  }

  handleSearch = event => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    if (this.state.pokemons === null) {
      return (
        <h1>Loarding...</h1>
      )
    }

    const searchPokemon = this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.searchTerm))
    
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search onChange={this.handleSearch}/>
        <br />
        <PokemonCollection pokemons={searchPokemon} toggleImage={this.toggleImage}/>
      </Container>
    )
  }
}

export default PokemonPage
