import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  render() {
    const p = this.props.pokemon
    const { name, stats, sprites, isClicked } = p
    let url = isClicked ? sprites.back : sprites.front
    const hp = stats.find(stat => stat.name === "hp").value
    return (
      <Card>
        <div onClick={() => {this.props.toggleImage(p)}}>
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
