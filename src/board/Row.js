import './Row.css';

import { Space } from './Space';

export function Row({ ctx, G, moves, options: { type, spaces } }) {
  let className;
  switch (type) {
    case 'bottom':
      className = 'row horizontal-row bottom-row';
      break;
    case 'top':
      className = 'row horizontal-row top-row';
      break;
    case 'left':
      className = 'row vertical-row left-row';
      break;
    case 'right':
      className = 'row vertical-row right-row';
      break;
    default:
  }
  return (
    <div className={className}>{spaces.map((s) => Space({ options: s }))}</div>
  );
}
