import React from "react";
import { GridContext, ButtonContext } from "./solver";

function GetRowsInput() {
  const { rows, focusEvent } = React.useContext(GridContext);
  const ref = React.createRef();
  return (
    <>
      {[...Array(Number(rows))].map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              maxLength="1"
              type="text"
              ref={ref}
              pattern="(^\d+$)"
              // onFocus={($event) => {
              //   $event.stopPropagation();
              //   focusEvent(ref);
              // }}
              className="input_el"
              style={{ display: "inline-block" }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

function GetGrid() {
  const { cols } = React.useContext(GridContext);
  return (
    <div className="grid_item_rows">
      {[...Array(Number(cols))].map((_, index) => (
        <React.Fragment key={index}>
          <GetRowsInput />
        </React.Fragment>
      ))}
    </div>
  );
}

function GetGridRowsButton(props) {
  return (
    <>
      {[...Array(Number(props.rows))].map((_, index) => (
        <button
          key={index}
          onClick={() => {
            props.handleClick(props.rowIndex + index + 1);
          }}
        >
          {props.rowIndex + index + 1}
        </button>
      ))}
    </>
  );
}

export function NumpadButtons() {
  const { handleClick, rows } = React.useContext(ButtonContext);

  return (
    <>
      {[...Array(Number(rows))].map((_, index) => (
        <div key={index}>
          <GetGridRowsButton
            rows={rows}
            rowIndex={index * 3}
            handleClick={handleClick}
          />
        </div>
      ))}
    </>
  );
}

export function GetGridRows() {
  const { cols } = React.useContext(GridContext);
  return (
    <>
      {[...Array(Number(cols))].map((_, index) => (
        <React.Fragment key={index}>
          <GetGrid />
        </React.Fragment>
      ))}
    </>
  );
}
