import { fields } from './game/RowContent';

function IsVictory(cells) {
  return false;
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return false;
}

export const Monopoly = {
  setup: (ctx, G) => ({
    player: {
      0: { index: 0, field: fields[0] },
      1: { index: 0, field: fields[0] },
    },
  }),

  moves: {
    throwDice: (G, ctx) => {
      G.dieRoll = ctx.random.D6();
      G.player[ctx.currentPlayer].index += G.dieRoll;
      if (G.player[ctx.currentPlayer].index >= fields.length) {
        G.player[ctx.currentPlayer].index -= fields.length;
      }
      G.player[ctx.currentPlayer].field =
        fields[G.player[ctx.currentPlayer].index];
    },
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },
};
