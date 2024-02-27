import React from "react";
import classes from './input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <input ref={ref} className={classes.myInput} tabIndex={props.order} {...props} data-dismiss="modal"/>
  );
});

export default Input;