import { ActionTypes } from "./constants";

export const setSolvedArray = (solvedArray) => {
  return {
    type: ActionTypes.SOLVED_SUDOKU_ARRAY,
    payload: solvedArray,
  };
};

export const resetSudokuArray = () => {
  return {
    type: ActionTypes.SET_SUDOKU_ARRAY,
    payload: [],
  };
};

export const setGridSize = (dimentions) => {
  return {
    type: ActionTypes.SET_GRIDSIZE,
    payload: dimentions,
  };
};
