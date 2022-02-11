import React from 'react';

import { Row } from './Row';
import { CornerSpace } from './CornerSpace';
import { Center } from './Center';

import './Board.css';

//import { fields, size } from '../game/RowContent';
import { BoardFields, size } from '../game/RowContent';

export function MonopolyBoard({ ctx, G, moves }) {
  const gameParams = { ctx, G, moves };
  const onClick = (id) => moves.clickCell(id);
  let bf = new BoardFields(ctx,G,moves);
  let winner = '';
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  let current = 0;
  const bottomRight = bf.fields[current];
  current += 1;
  const bottomRowSpaces = bf.fields.slice(current, current + size);
  current += size;
  const bottomLeft = bf.fields[current];
  current += 1;
  const leftRowSpaces = bf.fields.slice(current, current + size);
  current += size;
  const topLeft = bf.fields[current];
  current += 1;
  const topRowSpaces = bf.fields.slice(current, current + size);
  current += size;
  const topRight = bf.fields[current];
  current += 1;
  const rightRowSpaces = bf.fields.slice(current, current + size);

  return (
    <div className="table">
      <div className="board">
        {Center(ctx,G, moves, bf)}
        {CornerSpace({ options: bottomRight })}
        {Row({
          ...gameParams,
          options: { type: 'bottom', spaces: bottomRowSpaces },
        })}
        {CornerSpace({ options: bottomLeft })}
        {Row({
          ...gameParams,
          options: { type: 'left', spaces: leftRowSpaces },
        })}
        {CornerSpace({
          options: topLeft,
        })}
        {Row({
          ...gameParams,
          options: { type: 'top', spaces: topRowSpaces },
        })}
        {CornerSpace({ options: topRight })}
        {Row({
          ...gameParams,
          options: { type: 'right', spaces: rightRowSpaces },
        })}
      </div>
    </div>
  );
}
