import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setGridSize, setSudokuType, updateTheme } from "../../redux/actions";
import "./header.css";
import { store } from "react-notifications-component";

export default function Header() {
  const left = useRef();
  const dispatch = useDispatch();
  const right = useRef();
  const [theme, settheme] = React.useState(true);

  /**
   * method toggles the view and functionality between sudoku solver and sudoku generator logic
   * method also updates the classes of the buttons so that they can animate
   * @param {solver or generator} btn
   */
  const handleClick = () => {
    // left.current.classList.remove("left-active-btn");
    // left.current.classList.add("right-dormant-btn");
    // right.current.classList.remove("right-dormant-btn");
    // right.current.classList.add("left-active-btn");

    if (right.current.innerText === "Solver") {
      right.current.innerText = "Generator";
      left.current.innerText = "Solver";
    } else {
      right.current.innerText = "Solver";
      left.current.innerText = "Generator";
    }

    dispatch(setSudokuType(left.current.innerText));
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

  const toggleTheme = () => {
    settheme(!theme);
    dispatch(updateTheme(theme));

    store.addNotification({
      title: "New Themes on way",
      message: "15 more themes on the way",
      type: "danger",
      insert: "left",
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  };

  return (
    <div className="header card">
      <div className="title">
        <h3>Sudoku</h3>
      </div>
      <div className=" button-wrapper">
        <button ref={left} className="left-active-btn">
          Solver
        </button>
        <button
          ref={right}
          onClick={() => handleClick()}
          className="right-dormant-btn"
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

      <div
        className="grid-size theme-changer"
        onClick={() => {
          toggleTheme();
        }}
      >
        {theme ? (
          <>
            <img
              alt="sun"
              className="sun"
              src="https://img.icons8.com/color/96/000000/sun--v1.png"
            ></img>
          </>
        ) : (
          <>
            <img
              alt="moon"
              className="moon"
              src="https://img.icons8.com/color/48/000000/moon.png"
            ></img>
          </>
        )}
        {/* {/* <img
          alt="theme"
          className="sun"
          src="https://img.icons8.com/color/96/000000/sun--v1.png"
        ></img> }
        <img
          onClick={() => toggleTheme()}
          alt="theme"
          className={themeClass}
          src={themeSrc}
        ></img> */}
      </div>
    </div>
  );
}
