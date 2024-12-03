import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * Properties:
 * - isLit: boolean, is this cell lit?
 * - flipCellsAroundMe: function rec'd from parent to flip this cell and neighbors
 * 
 */

function Cell({ isLit, flipCellsAroundMe }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
