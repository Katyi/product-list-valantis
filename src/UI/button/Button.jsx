import React from "react";
import classes from './button.module.css';

const Button = ({children, ...props}) => {
  return (
    <button {...props} className={classes.myBtn} id={props.id ? props.id : 'btn '}>
      {children}
    </button>
  );
};

export default Button;