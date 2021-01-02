import React from "react";
import "./UserInput.css";
import { TextField } from "@material-ui/core";
import CustomButton from "../custom-button/custom-button.component";

const UserInput = ({ getInput, getWeather }) => (
  <div id='search'>
    <TextField fullWidth label='Enter City, Country' onChange={getInput} />
    <CustomButton onClick={getWeather}>Get Weather</CustomButton>
  </div>
);

export default UserInput;
