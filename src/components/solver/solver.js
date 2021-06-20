import React from "react";
import { useSelector } from "react-redux";
import "./solver.css";
import {
  getRowsAndCols,
  solveSudokuArray,
  fillInputs,
  copy,
} from "../../utils/logics";
import { GetGridRows, NumpadButtons } from "./gridUnits";

export const GridContext = React.createContext();
export const ButtonContext = React.createContext();

export default function Solver() {
  let focusedInputElement;
  let solvedResult = [];
  let inputsList = [];
  let focusNext = false;

  // const [focusedElCount, setFocusedElCount] = React.useState(0);
  const dimensions = useSelector((state) => state.sudoku.dimensions);
  const { rows, grid_rows, grid_cols } = getRowsAndCols(dimensions);

  React.useEffect(() => {
    console.log("dimensions change");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    inputsList = [].slice.call(document.getElementsByClassName("input_el"));
    reset();
  }, [dimensions]);

  const handleSolve = () => {
    const SudokuArray = [];
    let row = 0;
    let col = 0;
    let k;
    const inputsElementsList = [];

    const inputListValues = inputsList.map((el) => el.value);
    for (let i = 0; i < rows; i++) {
      k = i * rows;
      SudokuArray.push(
        inputListValues.slice(k, k + rows).map((el) => (el === "" ? "." : el))
      );
      inputsElementsList.push(inputsList.slice(k, k + rows));
    }

    console.log("inside HandleClick", SudokuArray, row, col);
    solvedResult = solveSudokuArray(SudokuArray, dimensions);
    console.log("result in solver", solvedResult);
    fillInputs(solvedResult, inputsElementsList);
  };

  const updatedFocusedElement = (ref) => {
    focusedInputElement = ref;
  };

  const handleButtonClick = (num) => {
    console.log(num);
    if (!focusedInputElement) {
      focusedInputElement = inputsList[0];
    }
    focusedInputElement.value = num;
    if (focusNext) {
      focusedInputElement = focusedInputElement.nextElementSibling
        ? focusedInputElement.nextElementSibling
        : focusedInputElement.parentElement.nextElementSibling
        ? focusedInputElement.parentElement.nextElementSibling.firstElementChild
        : focusedInputElement.parentElement.parentElement.nextElementSibling
        ? focusedInputElement.parentElement.parentElement.nextElementSibling
            .firstElementChild.firstElementChild
        : inputsList[0];
    }
    if (focusedInputElement === null || focusedInputElement === undefined)
      focusedInputElement = inputsList[0];
    focusedInputElement.focus();
  };

  const updateFocusType = (element) => {
    focusNext = element.checked ? true : false;
  };

  const reset = () => {
    inputsList.forEach((el) => (el.value = null));
  };

  return (
    <>
      <GridContext.Provider
        value={{
          rows: grid_rows,
          cols: grid_cols,
          focusEvent: updatedFocusedElement,
        }}
      >
        <div className="sudoku-area">
          <div className="solver_inputs">
            {[...Array(grid_rows)].map((_, index) => (
              <div className="grid_rows" key={index}>
                <GetGridRows />
              </div>
            ))}
          </div>
          <div className="vertical-line"></div>
          <div>
            <ButtonContext.Provider
              value={{ handleClick: handleButtonClick, rows: 3 }}
            >
              <NumpadButtons />
            </ButtonContext.Provider>

            <div>
              <input
                type="checkbox"
                name="test"
                onClick={($event) => {
                  $event.stopPropagation();
                  updateFocusType($event.currentTarget);
                }}
              />
              Focus next
            </div>
          </div>
        </div>

        <div className="buttons-Area">
          <button onClick={handleSolve}>Solve</button>
          <button onClick={() => copy(solvedResult, false)}>Copy</button>
          <button onClick={() => copy(solvedResult, true)}>
            Copy as Plain String
          </button>
          <button onClick={() => reset()}>Reset </button>
        </div>
      </GridContext.Provider>
    </>
  );
}
