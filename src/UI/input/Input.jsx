import React from "react";
import classes from './input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <input ref={ref} className={classes.myInput} {...props} data-dismiss="modal"/>
  );
});

export default Input;