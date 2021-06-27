import { ActionTypes } from "./constants";
import { combineReducers } from "redux";

const initialState = {
  type: "solver",
  dimensions: [
    [9, 9],
    [3, 3],
  ],
};

const sudokuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_GRIDSIZE:
      return { ...state, dimensions: payload };

    case ActionTypes.SET_SUDOKU_TYPE:
      return { ...state, type: payload };

    default:
      return state;
  }
};

const reducers = combineReducers({
  sudoku: sudokuReducer,
});

export default reducers;
