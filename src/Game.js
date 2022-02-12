import { CONSTANTS } from './constants.js';

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
      0: {
        index: 0,
        phase: 'start',
        state: {
          money: 0,
          child: 0,
          penalty: 0,
          work: CONSTANTS.workTypes.aid,
          costs: {
            [CONSTANTS.costs.expenses]: CONSTANTS.notpaid,
            [CONSTANTS.costs.insurance]: CONSTANTS.notpaid,
          },
        },
      },
    },
  }),

  moves: {
    throwDice: (G, ctx) => {
      G.diceRoll = ctx.random.D6();
      G.diceRoll = 1;
      G.player[ctx.currentPlayer].index += G.diceRoll;
      G.player[ctx.currentPlayer].phase = 'start';
    },
    setPhase(G, ctx, val) {
      G.player[ctx.currentPlayer].phase = val;
    },
    setPlayerState(G, ctx, nm, val) {
      console.log(nm);
      console.log('Setting ' + nm + ' state to ' + val);
      G.player[ctx.currentPlayer].state[nm] = val;
    },
    addMoney(G, ctx, amount) {
      G.player[ctx.currentPlayer].state.money += amount;
    },
    setChildren(G, ctx, amount) {
      G.player[ctx.currentPlayer].state.child = amount;
    },
    setCost(G, ctx, costType, state) {
      G.player[ctx.currentPlayer].state.costs[costType] = state;
    },
    setWorkType(G, ctx, workType) {
      G.player[ctx.currentPlayer].state.work = workType;
    },
    addPenalty(G, ctx, ammount) {
      G.player[ctx.currentPlayer].state.penalty += ammount;
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
