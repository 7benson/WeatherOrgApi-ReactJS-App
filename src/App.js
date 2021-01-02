import React,{Component} from "react";
import { Grid } from "@material-ui/core";
import UserInput from "./components/Input/UserInput.js";
import WeatherResult from "./components/WeatherResults/WeatherResult";
import Header from "./components/Header/Header";
import "./App.css";
import API_KEY from "./config.js"

class App extends Component {
  constructor(props) {
    super(props);
    //settng the state
    this.state = {
      location: "",
      temp: "",
      iconurl: "",
      description: "",
      message: "",
    };
    //binding method to this
    this.getInput = this.getInput.bind(this);
    this.getWeather = this.getWeather.bind(this);
    //calling the method to get the lat and log by using ip adress
    this.getInput(0, 1);
  }

  async getWeather(event, lat, lon) {
    let location = this.state.location;
    var link;
    if (location) {
      link =
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    } else if (lat && lon) {
      link =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    }
    let response = await fetch(link);
    let data = await response.json();
    
    if (data["cod"] === "404" || data["cod"] === "400") {
      this.setState({ message: data["message"] });
    } else if (data) {
      let description = data["weather"][0]["description"];
      let location = data["name"];
      let iconcode = data["weather"][0]["icon"];
      let temp = Math.floor(data["main"]["temp"]);

      let iconurl = `https://openweathermap.org/img/w/${iconcode}.png`;
      //set the state
      this.setState({
        temp: temp,
        iconurl: iconurl,
        description: description,
        location: location,
      });
    }
  }

  async getInput(event, isip) {
    if (event) {
      let location = event.target.value;
      if (location) {
        this.setState({
          location: location,
          temp: "",
          iconurl: "",
          description: "",
          message: "",
        });
      }
    }
    if (isip) {
      //geting the user lat and lon using ip
      const link = "https://ipapi.co/json";
      let response = await fetch(link);
      let data = await response.json();
      if (data) {
        let lat = data.latitude;
        let lon = data.longitude;
        this.getWeather(0, lat, lon);
      }
    }
  }
  render() {
    return (
      <Grid container justify='center' alignItems='center'>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={6} id='container'>
          <UserInput getInput={this.getInput} getWeather={this.getWeather} />
        </Grid>
        <Grid item xs={7}id='result-container'>
           <WeatherResult data={this.state} />
        </Grid>
      </Grid>
    );
  }
}
export default App;
