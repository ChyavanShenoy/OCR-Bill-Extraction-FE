import React from "react";
import "./Dropdown.css";

const Dropdown = () => {
  return (
    <>
      <div className="select" tabindex="1">
        <input className="selectopt" name="test" type="radio" id="opt1" />
        <label for="opt1" className="option">
          Choose an option
        </label>
        <input className="selectopt" name="test" type="radio" id="opt2" />
        <label for="opt2" className="option">
          Electricity Bill
        </label>
        <input className="selectopt" name="test" type="radio" id="opt3" />
        <label for="opt3" className="option">
          2 Column Bill
        </label>
      </div>
    </>
  );
};

export default Dropdown;
