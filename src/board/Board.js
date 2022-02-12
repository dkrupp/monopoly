import React from 'react';

import { Row } from './Row';
import { CornerSpace } from './CornerSpace';
import { Center } from './Center';

import './Board.css';

import { fields, size } from '../game/RowContent';

export function MonopolyBoard({ ctx, G, moves }) {
  const gameParams = { ctx, G, moves };

  let current = 0;
  const bottomRight = fields[current];
  current += 1;
  const bottomRowSpaces = fields.slice(current, current + size);
  current += size;
  const bottomLeft = fields[current];
  current += 1;
  const leftRowSpaces = fields.slice(current, current + size);
  current += size;
  const topLeft = fields[current];
  current += 1;
  const topRowSpaces = fields.slice(current, current + size);
  current += size;
  const topRight = fields[current];
  current += 1;
  const rightRowSpaces = fields.slice(current, current + size);

  return (
    <div className="table">
      <div className="board">
        {Center({ ...gameParams })}
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
