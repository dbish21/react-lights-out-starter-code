import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 * - board: array-of-arrays of true/false
 *
 * This is the game state for the whole game
 */

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  /** Handle changing a cell: update board & determine if winner */
  function flipCellsAround(coord) {
    const [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // Flip clicked cell and adjacent cells
    flipCell(y, x);      // center
    flipCell(y-1, x);    // above
    flipCell(y+1, x);    // below
    flipCell(y, x-1);    // left
    flipCell(y, x+1);    // right

    // Create new board copy to trigger re-render
    setBoard([...board]);
  }

  // Check if the game is won (all lights are off)
  const hasWon = board.every(row => row.every(cell => !cell));

  // If the game is won, show a winning message
  if (hasWon) {
    return <div className="Board-title">You Won!</div>;
  }

  // Create table board
  let tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
