import React, { useRef } from "react";
import "./header.css";

export default function Header() {
  let right = "generator";
  const solver = useRef();
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
