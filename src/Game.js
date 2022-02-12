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
      0: { index: 0, state: { money: 0, child: 0, work: 'segely' } },
    },
  }),

  moves: {
    throwDice: (G, ctx) => {
      G.dieRoll = ctx.random.D6();
      G.dieRoll = 1;
      G.player[ctx.currentPlayer].index += G.dieRoll;
    },
    setPlayerState(G, ctx, nm, val) {
      console.log(nm);
      console.log('Setting ' + nm + ' state to ' + val);
      G.player[ctx.currentPlayer].state[nm] = val;
    },
    getPlayerState(G, ctx, nm) {
      return G.player[ctx.currentPlayer].state[nm];
    },
    addMoney(G, ctx, amount) {
      G.player[ctx.currentPlayer].state['money'] += amount;
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
