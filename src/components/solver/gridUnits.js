import React from "react";
import { GridContext } from "./solver";

function GetRows() {
  const { rows } = React.useContext(GridContext);
  return (
    <>
      {[...Array(Number(rows))].map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              maxLength="1"
              type="text"
              pattern="(^\d+$)"
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
          <GetRows />
        </React.Fragment>
      ))}
    </div>
  );
}

export default function GetGridRows() {
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
