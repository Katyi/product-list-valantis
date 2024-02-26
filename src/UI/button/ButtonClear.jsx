import React from "react";
import classes from './buttonClear.module.css';

const ButtonClear = ({children, ...props}) => {
  return (
    <button {...props} className={classes.myBtn} id={props.id}>
      {children}
    </button>
  );
};

export default ButtonClear;