import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setGridSize } from "../../redux/actions";
import "./header.css";

export default function Header() {
  let right = "generator";
  const solver = useRef();
  const dispatch = useDispatch();
  const generator = useRef();

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
  };

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
            className="basic-grid"
            onClick={() => updateDimention("advanced")}
          ></div>
          <div
            className="advanced-grid"
            onClick={() => updateDimention("basic")}
          ></div>
        </div>
      </div>

      <div className="grid-size">
        <img
          alt="user Icon"
          className="user-icon"
          src="https://freesvg.org/img/abstract-user-flat-1.png"
        />
      </div>
    </div>
  );
}
