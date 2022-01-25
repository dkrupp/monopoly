import './Space.css';

export function Space({
  ctx,
  G,
  moves,
  options: { type, color, name, price, instructions, drawing },
  id,
}) {
  return (
    <div key={id} className={`space ${type}`}>
      <div className="container">
        {color ? <div className={`color-bar ${color}`}></div> : ''}
        <div className="name">{name}</div>
        {drawing ? <i className={`drawing fa fa-${drawing}`}></i> : ''}
        {price ? <div className="price">PRICE ${price}</div> : ''}
        {instructions ? <div className="instructions">{instructions}</div> : ''}
      </div>
    </div>
  );
}
