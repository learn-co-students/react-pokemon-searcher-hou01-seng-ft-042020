import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = {
    isClicked: false,
  };

  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  };
  render() {
    const pokemon = this.props.pokemon;
    const { name, hp, sprites } = pokemon;
    const imgUrl = this.state.isClicked ? sprites.back : sprites.front;
    return (
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            <img src={imgUrl} alt="oh no!" />
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
    );
  }
}

export default PokemonCard;
