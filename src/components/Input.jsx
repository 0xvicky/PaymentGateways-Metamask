import React from "react";
// import TextField from "@mui/material/TextField";
function Input(props) {
  return (
    <div className="input-box">
      {/* <TextField />/ */}
      <input
        name={props.name}
        type={props.text}
        placeholder={props.placeholder}
        onChange={props.action}
      />
    </div>
  );
}

export default Input;
