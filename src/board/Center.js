import './Center.css';
//import { fields, size } from '../game/RowContent';
import React, { Component } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//Choice component
class Choices extends Component {
  render() {
    console.log(this.props.choices);
    return this.props.choices.length > 0 ? (
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {this.props.choices.map((question, index) => (
          <Button key={index} onClick={question.action}>
            {question.text}
          </Button>
        ))}
      </ButtonGroup>
    ) : null;
  }
}

class FieldBox extends Component {
  render() {
    console.log(this.props.field.description);
    console.log('fieldbox choices:');
    console.log(this.props.field.choices);
    return (
      <div className="fieldBox">
        <div className="fieldDescr">{this.props.field.description}</div>
        <Choices choices={this.props.field.choices} />
      </div>
    );
  }
}

export function Center(ctx, G, moves, bf) {
  const onClick = function ({ ctx, G, moves }) {
    moves.throwDice();
    console.log('throwdice');
    console.log(G);
    bf.fields[G.player[ctx.currentPlayer].index].action();
  };
  return (
    <div className="center">
      <div className="dice-box">
        <div className="x" onClick={() => onClick({ ctx, G, moves })}>
          {G.diceRoll}
        </div>
        <div className="currentPlayer">Current Player: {ctx.currentPlayer}</div>
        <div className="currentPlayer">
          Player 0: {bf.fields[G.player[0].index].name} ({G.player[0].index})
        </div>
        <FieldBox field={bf.fields[G.player[ctx.currentPlayer].index]} />
      </div>

      <div className="chance-deck">
        <h2 className="label">Chance</h2>
        <div className="deck"></div>
      </div>
    </div>
  );
}
