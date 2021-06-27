let nextRIndex = 0;
let nextCIndex = 0;
let Boardd = [];

/**
 * @param {Array} dimension dimension from store
 * @returns object with necessary data
 */
export const getRowsAndCols = ([[rows, cols], [grid_rows, grid_cols]]) => {
  return { rows: rows, cols: cols, grid_rows: grid_rows, grid_cols: grid_cols };
};

/**
 * returns a empty array with "."
 * @param {*} rows
 * @param {*} cols
 * @returns
 */
export const getInitialArrayState = (rows, cols) => {
  const sArray = [];
  for (let i = 0; i < cols; i++) {
    sArray.push(new Array(rows).fill("."));
  }

  return sArray;
};

/**
 * method returns corresponding position's(row,col) grid's base position
 * @param {*} row
 * @param {*} col
 * @param {Array} dimensions dimension of the grid
 * @returns
 */
const findGridbasePositon = (row, col, dimensions) => {
  const grow = Math.floor(row / dimensions[1][1]);
  const gcol = Math.floor(col / dimensions[1][0]);

  return [grow * dimensions[1][1], gcol * dimensions[1][0]];
};

/**
 * checks if the given value is not replicated, in the entire row, entire column and in the entire grid
 * @param {Solved Board till now} board
 * @param {*} row
 * @param {*} col
 * @param {number} value value placed in the row,col
 * @param {*} dimensions
 * @returns
 */
const isSafePlace = (board, row, col, value, dimensions) => {
  for (let i = 0; i < board[0].length; i++) {
    if (board[row][i] === value.toString()) {
      return false;
    }
  }

  for (let i = 0; i < board[0].length; i++) {
    if (board[i][col] === value.toString()) {
      return false;
    }
  }

  const [grow, gcol] = findGridbasePositon(row, col, dimensions);

  for (let i = grow; i < grow + dimensions[1][1]; i++) {
    for (let j = gcol; j < gcol + dimensions[1][0]; j++) {
      if (board[i][j] === value.toString()) {
        return false;
      }
    }
  }

  return true;
};

/**
 * method checks if all the elements in the board is filled, so as to stop the backtracking
 * @param {Array} board board being solved
 * @returns
 */
const isAllFilled = (board) => {
  for (let i = 0; i <= board[0].length - 1; i++) {
    for (let j = 0; j <= board[0].length - 1; j++) {
      if (board[i][j] === ".") return false;
    }
  }
  return true;
};

/**
 * main backtracking executor method
 * @param {*} board
 * @param {*} row
 * @param {*} col
 * @param {*} dimensions
 * @returns
 */
const sudokuSolver = (board, row, col, dimensions) => {
  if (col > dimensions[0][0] - 1) {
    row = row + 1;
    col = 0;
  }

  if (Number(row) > dimensions[0][0] - 1) {
    Boardd = JSON.parse(JSON.stringify(board));
    return Boardd;
  }

  if (board[row][col] === ".") {
    for (let k = 1; k <= board.length; k++) {
      if (isSafePlace(board, row, col, k, dimensions)) {
        board[row][col] = k.toString();
        board = sudokuSolver(board, row, col + 1, dimensions);
        if (!isAllFilled(board)) {
          board[row][col] = ".";
        }
      }
    }
  } else {
    board = sudokuSolver(board, row, col + 1, dimensions);
  }

  return board;
};

const solveSudoku = (board, dimensions) => {
  sudokuSolver(board, 0, 0, dimensions);
  console.log("from logics", Boardd);
};

/**
 * method copies the given value to the clip board
 * @param {string} value value to be copied
 */
const copyToClipBoard = (value) => {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = value;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

/**
 * method copies to a plain string or in the array format based on the boolean
 * @param {string} clickResult
 * @param {boolean} plainString
 */
export const copy = (clickResult, plainString = false) => {
  copyToClipBoard(
    plainString ? clickResult.toString() : JSON.stringify(clickResult)
  );
};

export const fillInputs = (solvedArray, inputsElementsList) => {
  for (let i = 0; i < solvedArray[0].length; i++) {
    for (let j = 0; j < solvedArray[0].length; j++) {
      inputsElementsList[i][j].value = solvedArray[i][j];
    }
  }
};

export const solveSudokuArray = (sudokuArray, dimensions) => {
  solveSudoku(JSON.parse(JSON.stringify(sudokuArray)), dimensions);
  return Boardd;
};

/**
 * Method shuffles the given array and deep clones it
 */
export const shuffleArray = (array) => {
  return JSON.parse(JSON.stringify(array)).sort(() => Math.random() - 0.5);
};
