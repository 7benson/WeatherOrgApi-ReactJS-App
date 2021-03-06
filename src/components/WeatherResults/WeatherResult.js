import React from "react";
import "./WeatherResult.css";
import { Grid, Typography } from "@material-ui/core";
import thermometer from "../images/thermometer.png"
import RoomIcon from '@material-ui/icons/Room';

const WeatherResult = ({ data }) => {
  if (data?.temp) {
    return (
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={12}>
            <Typography id='temperature'>
              Current Temperature: {data.temp}&#176;C
              <img src={thermometer} width='30px' height='30px' alt='temperature' />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              src={data.iconurl}
              alt='weather_icon'
              width='120px'
              height='120px'
            />
          </Grid>
          <Grid item xs={12}>
            <Typography id='description'>{data.description.toUpperCase()}</Typography>
            <Typography id='location'>
              <RoomIcon />
              {data.location.toUpperCase()}{" "}
            </Typography>
          </Grid>
        </Grid>
    );
  }
  if (data?.message) {
    return (
      <div>
        <p id='message'>{data.message}</p>
      </div>
    );
  }
  return null;
};

export default WeatherResult;
