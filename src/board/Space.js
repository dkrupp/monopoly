import './Space.css';

export function Space({
  ctx,
  G,
  moves,
  options: { type, color, name, price, instructions, drawing },
}) {
  return (
    <div class={`space ${type}`}>
      <div class="container">
        {color ? <div className={`color-bar ${color}`}></div> : ''}
        <div class="name">{name}</div>
        {drawing ? <i className={`drawing fa fa-${drawing}`}></i> : ''}
        {price ? <div class="price">PRICE ${price}</div> : ''}
        {instructions ? <div class="instructions">{instructions}</div> : ''}
      </div>
    </div>
  );
}
