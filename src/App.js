import { Client } from 'boardgame.io/react';
import { TicTacToe } from './Game';
import { TicTacToeBoard } from './board/Board.js';

const App = Client({ game: TicTacToe, board: TicTacToeBoard });

export default App;