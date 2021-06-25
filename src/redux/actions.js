import { ActionTypes } from "./constants";

export const setSudokuType = (type) => {
  return {
    type: ActionTypes.SET_SUDOKU_TYPE,
    payload: type,
  };
};

export const setGridSize = (dimentions) => {
  return {
    type: ActionTypes.SET_GRIDSIZE,
    payload: dimentions,
  };
};
