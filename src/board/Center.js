import './Center.css';

export function Center({ ctx, G, moves }) {
  const onClick = () => moves.throwDice();
  return (
    <div className="center">
      <div className="community-chest-deck">
        <h2 className="label">Community Chest</h2>
        <div className="deck"></div>
      </div>
      <div className="dice-box">
        <div className="x" onClick={() => onClick()}>
          {G.dieRoll}
        </div>
        <div className="currentPlayer">Current Player: {ctx.currentPlayer}</div>

        <div className="currentPlayer">
          Player 0: {G.player[0].field.name} ({G.player[0].index})
        </div>
        <div className="currentPlayer">
          Player 1: {G.player[1].field.name} ({G.player[1].index})
        </div>
      </div>
      <h1 className="title">MONOPOLY</h1>
      <div className="chance-deck">
        <h2 className="label">Chance</h2>
        <div className="deck"></div>
      </div>
    </div>
  );
}
