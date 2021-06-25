import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setGridSize, setSudokuType } from "../../redux/actions";
import "./header.css";

export default function Header() {
  let right = "generator";
  const solver = useRef();
  const dispatch = useDispatch();
  const generator = useRef();

  /**
   * method toggles the view and functionality between sudoku solver and sudoku generator logic
   * method also updates the classes of the buttons so that they can animate
   * @param {solver or generator} btn
   */
  const handleClick = (btn) => {
    switch (btn) {
      case "solver":
        if (right === "solver") {
          solver.current.classList.remove("solverToGenerator");
          solver.current.classList.remove("solverRevert");
          generator.current.classList.remove("generatorRevert");

          setTimeout(() => {
            generator.current.classList.add("generatorRevert");
            solver.current.classList.add("solverRevert");
            right = "generator";
          });
        }

        break;
      case "generator":
        if (right === "generator") {
          generator.current.classList.remove("generatorRevert");
          generator.current.classList.remove("generatorToSolver");
          solver.current.classList.remove("solverRevert");

          setTimeout(() => {
            generator.current.classList.add("generatorToSolver");
            solver.current.classList.add("solverToGenerator");
            right = "solver";
          });
        }
        break;
      default:
    }
    dispatch(setSudokuType(btn));
  };

  /**
   *  method updates the dimension of the grid to store
   *  @param {[[row,col],[grid_size_row, grid_size_col]]]} dimension
   */
  const updateDimention = (dimension) => {
    const payload =
      dimension === "advanced"
        ? [
            [9, 9],
            [3, 3],
          ]
        : [
            [6, 6],
            [3, 2],
          ];

    dispatch(setGridSize(payload));
  };

  return (
    <div className="header card">
      <div className="title">
        <h3>Sudoku</h3>
      </div>
      <div className=" button-wrapper">
        <button
          ref={solver}
          onClick={() => handleClick("solver")}
          className="solver"
        >
          Solver
        </button>
        <button
          ref={generator}
          onClick={() => handleClick("generator")}
          className="generator"
        >
          Generator
        </button>
      </div>
      <div className="grid-size">
        <div className="grid"></div>

        <div className="grid-selection">
          <div
            onClick={() => updateDimention("basic")}
            className="basic-grid-overlay"
          ></div>

          <div
            className="advanced-grid-overlay"
            onClick={() => updateDimention("advanced")}
          ></div>
          <div className="basic-grid"></div>
          <div className="advanced-grid"></div>
        </div>
      </div>

      <div className="grid-size">
        <img
          alt="user Icon"
          className="user-icon"
          // TODO: update this to theme toggler
          src="https://freesvg.org/img/abstract-user-flat-1.png"
        />
      </div>
    </div>
  );
}
