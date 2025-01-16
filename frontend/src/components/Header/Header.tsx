import React from 'react';
import logo from "../../utils/Images/illustration.jpeg";
import "./Header.css"

const Header = ({onCurrentStep}) => {
  return (
    <div className="ambulanceNav">
      <div className="logo">
        <img src={logo} alt="Logo" className="company-logo" />
      </div>
      <div className="navItemsList">
        <ul className="links">
          <li className="navItems" onClick={() => onCurrentStep('AMBULANCES')}>
            <a className="navLink">Ambulances</a>
          </li>
          <li className="navItems" onClick={() => onCurrentStep('DOCTORS')}>
            <a className="navLink">Doctors</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
