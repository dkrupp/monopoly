import './Center.css';
import React from 'react';

import { FieldBox } from './FieldBox.js';

export function Center(ctx, G, moves, boardFields) {
  const onClick = function ({ ctx, G, moves }) {
    console.log('throwing with dice');
    moves.throwDice();
    console.log(G);
    console.lsog('index:' + G.player[ctx.currentPlayer].index);
    console.log('phase:' + G.player[ctx.currentPlayer].phase);
    if (
      boardFields.fields[G.player[ctx.currentPlayer].index].phases[
        G.player[ctx.currentPlayer].phase
      ].action
    ) {
      console.log('calling action');
      boardFields.fields[G.player[ctx.currentPlayer].index].phases[
        G.player[ctx.currentPlayer].phase
      ].action();
    } else {
      console.log('no action found');
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
          field={
            boardFields.fields[G.player[ctx.currentPlayer].index].phases[
              G.player[ctx.currentPlayer].phase
            ]
          }
        />
      </div>

      <div className="chance-deck">
        <h2 className="label">Chance</h2>
        <div className="deck"></div>
      </div>
    </div>
  );
}
