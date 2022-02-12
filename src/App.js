import { Client } from 'boardgame.io/react';
import { Monopoly } from './Game';
import { MonopolyBoard } from './board/Board.js';

const App = Client({ game: Monopoly, board: MonopolyBoard, numPlayers: 1 });

export default App;
