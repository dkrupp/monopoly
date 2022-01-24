import './Space.css';
import './CornerSpace.css';

export function CornerSpace({
  ctx,
  G,
  moves,
  options: { type, color, name, price, instructions, drawing },
}) {
  return (
    <div class={`space corner ${type}`}>
      <div class="container">
        <div class="name">{name}</div>
        {drawing ? <i class={`drawing fa fa-${drawing}`}></i> : ''}
      </div>
    </div>
  );
}
