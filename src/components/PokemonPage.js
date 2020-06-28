import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    search: "",
  };

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
      .then((res) => res.json())
      .then((pokemon) => {
        this.setState({
          pokemon: pokemon,
        });
      });
  }

  togglePokemonImg = (pokemon) => {
    const allPokemon = this.state.pokemon;
    const pokemonIndex = allPokemon.indexOf(pokemon);
    this.setState({
      pokemon: [
        ...allPokemon.slice(0, pokemonIndex),
        { ...pokemon, isClicked: !pokemon.isClicked },
        ...allPokemon.slice(pokemonIndex + 1),
      ],
    });
  };

  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  addPokemon = (pokemon) => {
    this.setState({
      pokemon: [...this.state.pokemon, pokemon],
    });
  };

  render() {
    const searchPokemon = this.state.pokemon.filter((pokemon) =>
      pokemon.name.includes(this.state.search)
    );
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search onChange={this.handleSearch} />
        <br />
        <PokemonCollection
          pokemon={searchPokemon}
          toggle={this.togglePokemonImg}
        />
      </Container>
    );
  }
}

export default PokemonPage;
