import './Center.css';
import React from 'react';

import { FieldBox } from './FieldBox.js';

export function Center(ctx, G, moves, boardFields) {
  const onClick = function ({ ctx, G, moves }) {
    moves.throwDice();
    console.log('throwdice');
    console.log(G);
    if (boardFields.fields[G.player[ctx.currentPlayer].index].action) {
      boardFields.fields[G.player[ctx.currentPlayer].index].action({
        ctx,
        G,
        moves,
      });
    }
  };
  return (
    <div className="center">
      <div className="dice-box">
        <div className="x" onClick={() => onClick({ ctx, G, moves })}>
          {G.diceRoll}
        </div>
        <div className="currentPlayer">Current Player: {ctx.currentPlayer}</div>
        <div className="currentPlayer">
          Player 0: {boardFields.fields[G.player[0].index].name} (
          {G.player[0].index})
        </div>
        <FieldBox
          field={boardFields.fields[G.player[ctx.currentPlayer].index]}
        />
      </div>

      <div className="chance-deck">
        <h2 className="label">Chance</h2>
        <div className="deck"></div>
      </div>
    </div>
  );
}
