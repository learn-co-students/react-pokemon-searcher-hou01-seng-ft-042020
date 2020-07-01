import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  render() {
    // console.log("POKRMON", this.props.pokemon)
    const selectPokemon = this.props.pokemon
    const { name, hp, sprites, isClicked } = selectPokemon
    // console.log("POKRMON Img", selectPokemon.sprites.front)
    // console.log("SELECT POKRMON", selectPokemon)
    let url = isClicked ? sprites.back : sprites.front
    return (
      <Card>
        <div onClick={() => {this.props.toggleImage(selectPokemon)}}>
          <div className="image">
            <img src={url} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
