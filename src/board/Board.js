import React from 'react';

import { Row } from './Row';
import { CornerSpace } from './CornerSpace';

import './Board.css';

import {
  bottomRowSpaces,
  topRowSpaces,
  leftRowSpaces,
  rightRowSpaces,
} from './RowContent';

export function TicTacToeBoard({ ctx, G, moves }) {
  const gameParams = { ctx, G, moves };
  const onClick = (id) => moves.clickCell(id);

  let winner = '';
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  return (
    <div class="table">
      <div class="board">
        {CornerSpace({ options: { type: 'go', name: 'GO' } })}
        {Row({
          ...gameParams,
          options: { type: 'bottom', spaces: bottomRowSpaces },
        })}
        {CornerSpace({ options: { type: 'jail', name: 'Jail' } })}
        {Row({
          ...gameParams,
          options: { type: 'left', spaces: leftRowSpaces },
        })}
        {CornerSpace({
          options: { type: 'free-parking', name: 'Free Parking' },
        })}
        {Row({
          ...gameParams,
          options: { type: 'top', spaces: topRowSpaces },
        })}
        {CornerSpace({ options: { type: 'go-to-jail', name: 'Go To Jail' } })}
        {Row({
          ...gameParams,
          options: { type: 'right', spaces: rightRowSpaces },
        })}
      </div>
    </div>
  );
}
