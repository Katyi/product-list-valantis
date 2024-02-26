import React from 'react';
import './header.css';
// import MyButton from '../button/MyButton';

const Header = ({title}) => {
  
  return (
    <div className="header">
      <div className="title">{title}</div>
    </div>
  )
}

export default Header;