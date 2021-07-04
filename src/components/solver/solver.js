import React from "react";
import { useSelector } from "react-redux";
import "./solver.css";
import {
  getRowsAndCols,
  solveSudokuArray,
  fillInputs,
  copy,
  shuffleArray,
} from "../../utils/logics";
import { GetGridRows, NumpadButtons } from "./gridUnits";

export const GridContext = React.createContext();
export const ButtonContext = React.createContext();

/**
 * Main function component that handles solve and generator logics and renders the component
 * @returns null
 */
export default function Solver() {
  let focusedInputElement;
  let solvedResult = [];
  let inputsList = [];
  let focusNext = false;
  let inputListValues = [];

  const solverInputs = React.useRef();
  let dimensions = useSelector((state) => state.sudoku.dimensions);
  const sudokuType = useSelector((state) => state.sudoku.type);
  const { rows, grid_rows, grid_cols } = getRowsAndCols(dimensions);
  /**
   * to check if the dimension changes and update the inputsList by querying from the dom
   */
  React.useEffect(() => {
    console.log("dimensions change");
    localStorage.setItem("dimension", JSON.stringify(dimensions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    inputsList = [].slice.call(document.getElementsByClassName("input_el"));
    reset();

    if (dimensions[0][0] !== 6) {
      solverInputs.current.classList.add("advanced");
      solverInputs.current.classList.remove("basic");
    } else {
      solverInputs.current.classList.remove("advanced");
      solverInputs.current.classList.add("basic");
    }
  }, [dimensions, sudokuType]);

  /**
   * method handles queries all the entered values from in the inputs,
   * solves them using the the logic helper method and update the input elements with
   * the solved values
   */
  const handleSolve = () => {
    const SudokuArray = [];
    const inputsElementsList = [];
    inputListValues = inputsList.map((el) => el.value);

    for (let i = 0; i < rows; i++) {
      const k = i * rows;
      SudokuArray.push(
        inputListValues.slice(k, k + rows).map((el) => (el === "" ? "." : el))
      );
      inputsElementsList.push(inputsList.slice(k, k + rows));
    }
    solvedResult = solveSudokuArray(SudokuArray, dimensions);
    fillInputs(solvedResult, inputsElementsList);
  };

  /**
   * method
   * @param {reference of the current focusedInput element} ref
   */
  const updatedFocusedElement = (ref) => {
    focusedInputElement = ref;
  };

  /**
   * since user can either input from the keyboard or through the buttons in the screen,
   * this method checks if the fill next checkbox is enabled, and moves the focus to the next input element
   * @param {clicked button number} num
   */
  const handleButtonClick = (num) => {
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

  /**
   *
   * to update the diagnol square of the given array with given random numbers
   * @param {size of the square dimension to update} squareSize
   * @param {only 3 possibel in both basic and advanced} diagnolPosition
   * @param {empty array with correct dimension} generatorArray
   * @param {random numbers to be inserted} shuffledArray
   */
  const updateDiagnolGrid = (
    squareSize,
    diagnolPosition,
    generatorArray,
    shuffledArray
  ) => {
    shuffledArray = JSON.parse(JSON.stringify(shuffledArray));
    for (
      let i = squareSize * diagnolPosition;
      i < squareSize * (diagnolPosition + 1);
      i++
    ) {
      for (
        let j = squareSize * diagnolPosition;
        j < squareSize * (diagnolPosition + 1);
        j++
      ) {
        if (generatorArray[i][j])
          generatorArray[i][j] = `${shuffledArray.pop()}`;
      }
    }
  };

  const updateDiagnolCubes = (generatorPrefix, possibleNumbers) => {
    updateDiagnolGrid(
      dimensions[1][1],
      0,
      generatorPrefix,
      shuffleArray(shuffleArray(possibleNumbers))
    );

    updateDiagnolGrid(
      dimensions[1][1],
      1,
      generatorPrefix,
      shuffleArray(shuffleArray(possibleNumbers))
    );

    updateDiagnolGrid(
      dimensions[1][1],
      2,
      generatorPrefix,
      shuffleArray(shuffleArray(possibleNumbers))
    );
  };

  /**
   * handles the generate functionality
   * logic:
   *      fill the diagnol cubes of a empty array as in same dimensions of the input
   *      solve the array
   *      iterate over each row
   *            get a random value between nUnknonws
   *            shuffle the nUnknownPositions and pop it the random value times
   *
   */
  const handleGenerate = () => {
    reset();
    let k;
    let nUnknowns = dimensions[1][1] === 3 ? [3, 4, 5, 6, 7] : [2, 3, 4]; //TODO: add the tough feature
    const nUnknownPositions =
      dimensions[1][1] === 3 ? [0, 1, 2, 3, 4, 5, 6, 7, 8] : [0, 1, 2, 3, 4, 5];
    const generatorPrefix = [];
    let generatorPrefixSolved = [];
    const inputsElementsList = [];

    const possibleNumbers = Array(dimensions[0][0])
      .fill()
      .map((_, index) => index + 1);

    for (let i = 0; i < rows; i++) {
      k = i * rows;
      generatorPrefix.push(inputsList.slice(k, k + rows).map((el) => "."));
      inputsElementsList.push(inputsList.slice(k, k + rows));
    }

    updateDiagnolCubes(generatorPrefix, possibleNumbers);
    generatorPrefixSolved = solveSudokuArray(generatorPrefix, dimensions);
    fillInputs(generatorPrefixSolved, inputsElementsList);

    //TODO: Animate the disappearing
    for (let o = 0; o < rows; o++) {
      let nUnknowns_row = shuffleArray(shuffleArray(nUnknowns));
      let nUnknownPositions_row = shuffleArray(shuffleArray(nUnknownPositions));
      let inputsList_row = inputsList.slice(o * rows, o * rows + rows);

      Array(nUnknowns_row.pop())
        .fill()
        .map((_) => (inputsList_row[nUnknownPositions_row.pop()].value = null));
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
          <div className="solver_inputs" ref={solverInputs}>
            {[...Array(grid_rows)].map((_, index) => (
              <div className="grid_rows" key={index}>
                <GetGridRows />
              </div>
            ))}
          </div>
          <div className="vertical-line"></div>
          <div className="buttons-wrapper">
            <ButtonContext.Provider
              value={{ handleClick: handleButtonClick, rows: 3 }}
            >
              <NumpadButtons />
            </ButtonContext.Provider>

            <div>
              <button
                onClick={() => {
                  handleButtonClick(null);
                }}
                style={{ width: "90%" }}
              ></button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label className="switch">
                <input
                  className="fill-next"
                  type="checkbox"
                  onClick={($event) => {
                    $event.stopPropagation();
                    updateFocusType($event.currentTarget);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="buttons-Area">
          <button onClick={() => copy(solvedResult, false)}>Copy</button>
          <button onClick={() => copy(solvedResult, true)}>
            Copy as Plain String
          </button>
          {sudokuType === "Solver" ? (
            <button onClick={() => reset()}>Reset </button>
          ) : (
            <button onClick={handleSolve}>Solve/Validate </button> // TODO: make solve to be a major button and validate to be a dropdown button
          )}

          {sudokuType === "Generator" ? (
            <button onClick={handleGenerate}>Generate</button>
          ) : (
            <button onClick={handleSolve}>Solve/Validate</button> // TODO: make solve to be a major button and validate to be a dropdown button
          )}
        </div>
      </GridContext.Provider>
    </>
  );
}
