import './Space.css';
import './CornerSpace.css';

export function CornerSpace({
  ctx,
  G,
  moves,
  options: { type, color, name, price, instructions, drawing },
}) {
  return (
    <div className={`space corner ${type}`}>
      <div className="container">
        <div className="name">{name}</div>
        {drawing ? <i className={`drawing fa fa-${drawing}`}></i> : ''}
      </div>
    </div>
  );
}
