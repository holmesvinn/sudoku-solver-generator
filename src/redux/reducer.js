import { ActionTypes } from "./constants";
import { combineReducers } from "redux";

const initialState = {
  solvedArray: [],
  dimensions: [
    [9, 9],
    [3, 3],
  ],
};

const sudokuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_GRIDSIZE:
      return { ...state, dimensions: payload };

    case ActionTypes.SET_SOLVED_ARRAY:
      return state;

    case ActionTypes.RESET_SOLVED_ARRAY:
      return state;

    default:
      return state;
  }
};

const reducers = combineReducers({
  sudoku: sudokuReducer,
});

export default reducers;
