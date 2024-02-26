import React from 'react';
import './footer.css';
import githubIcon from '../../assets/github.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='leftPart'>
      <div className='copyright' >Copyright © A. EGOROVA 2022 - {new Date().getFullYear()}</div>
      <Link to={'https://github.com/Katyi/floor-planner'} target="_blank">
        <img src={githubIcon} alt="githubIcon" className='githubIcon' />
      </Link>
      </div>
      <div className='emailDiv'>egorova.aleksandra@gmail.com</div>
    </div>
  )
}

export default Footer;