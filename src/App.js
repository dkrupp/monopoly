import { Client } from 'boardgame.io/react';
import { Monopoly } from './Game';
import { MonopolyBoard } from './board/Board.js';

const App = Client({   numPlayers: 1, game: Monopoly, board: MonopolyBoard });

export default App;
