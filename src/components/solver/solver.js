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

  // const [focusedElCount, setFocusedElCount] = React.useState(0);
  const dimensions = useSelector((state) => state.sudoku.dimensions);
  const { grid_rows, grid_cols } = getRowsAndCols(dimensions);

  React.useEffect(() => {
    console.log("componentMount");
    inputsList = [].slice.call(document.getElementsByClassName("input_el"));
  }, []);

  const handleSolve = () => {
    const SudokuArray = [];
    let row = 0;
    let col = 0;
    let k;
    const inputsElementsList = [];

    const inputListValues = inputsList.map((el) => el.value);
    for (let i = 0; i <= 8; i++) {
      k = i * 9;
      SudokuArray.push(
        inputListValues.slice(k, k + 9).map((el) => (el === "" ? "." : el))
      );
      inputsElementsList.push(inputsList.slice(k, k + 9));
    }

    console.log("inside HandleClick", SudokuArray, row, col);
    solvedResult = solveSudokuArray(SudokuArray);
    console.log("result in solver", solvedResult);
    fillInputs(solvedResult, inputsElementsList);
  };

  const updatedFocusedElement = (ref) => {
    focusedInputElement = ref;
  };

  const handleButtonClick = (num) => {
    console.log(num);
    if (focusedInputElement) focusedInputElement.value = num;
    else {
      inputsList[0].value = num;
      // setFocusedElCount((prevCount) => prevCount + 1);
    }
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
              {/* Logic to Generate Numpad */}
              {/* <div className="Numpad">
          {[...Array(Number(3))].map((_, index) => (
            <React.Fragment key={index}>
              <GetGrid
                rows={1}
                columns={3}
                element="button"
                list={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              />
            </React.Fragment>
          ))}
        </div> */}
            </ButtonContext.Provider>
          </div>
        </div>

        <div className="buttons-Area">
          <button onClick={handleSolve}>Solve</button>
          <button onClick={() => copy(solvedResult, false)}>Copy</button>
          <button onClick={() => copy(solvedResult, true)}>
            Copy as Plain String
          </button>
        </div>
      </GridContext.Provider>
    </>
  );
}
