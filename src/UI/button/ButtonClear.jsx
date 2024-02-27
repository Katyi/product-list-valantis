import React from "react";
import classes from './buttonClear.module.css';

const ButtonClear = ({children, ...props}) => {
  return (
    <button {...props} className={classes.myBtn} id={props.id} tabIndex={props.order}>
      {children}
    </button>
  );
};

export default ButtonClear;