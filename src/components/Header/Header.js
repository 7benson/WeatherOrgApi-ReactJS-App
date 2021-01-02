import React from "react";
import WbSunnyTwoToneIcon from '@material-ui/icons/WbSunnyTwoTone';
import "./Header.css";

const Header = () => (
  <div id='header'>
    <p> Weather App</p>
    <WbSunnyTwoToneIcon className="header__sun" />
  </div>
);

export default Header;
