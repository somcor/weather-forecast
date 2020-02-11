import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      weather: [],
      hourly: []
    }
  }

  Unix_timestamp = (t) => {
    var dt = new Date(t*1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr+ ':' + m.substr(-2);  
  }

  showDate = (ts) => {
    var date = new Date(ts*1000);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var output = dayNames[date.getDay()] + ', ' + date.getDate() + ' ' + monthNames[date.getMonth()];
    return output;
  }

  componentDidMount() {
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=Vladimir&country=RU&key=869fb4c04c414d5e885c22a3a57f25b0`)
      .then(res => {
        const weather = res.data;
        this.setState({ weather });
      });
    axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?city=Vladimir&country=RU&key=869fb4c04c414d5e885c22a3a57f25b0`)
      .then(res => {
        const hourly = res.data;
        this.setState({ hourly });
      });
  }

  render(){
    return (
      <div className="App">
        <div className="container">
          { this.state.weather.data ?
          <div className="temprature-today">
            <div className="temprature-today-date">{this.showDate(this.state.weather.data[0].ts)}</div>
            <img className="temprature-today-image" src={"https://www.weatherbit.io/static/img/icons/"+ this.state.weather.data[0].weather.icon +".png"} />
            <div className="current-temprature-today">{this.state.weather.data[0].temp}<span>&#176;C</span></div>
            { this.state.hourly.data ? this.state.hourly.data.map((day, index) => (
              index < 5 ? 
              <div key={index} className="current-temprature-hourly"><div>{this.Unix_timestamp(day.ts)}</div><div>{day.temp}&#176;C</div></div>
              : null
            )) : null }
          </div> 
          : null }
            { this.state.weather.data ? this.state.weather.data.map((day, index) => (
              (0 < index) && (index < 5) ? 
                <div className="temprature-b" key={index}>
                  <div className="temprature-date">{this.showDate(day.ts)}</div>
                  <img className="temprature-image" src={"https://www.weatherbit.io/static/img/icons/"+ day.weather.icon +".png"} />
                  <div className="current-temprature">{day.temp}<span>&#176;C</span></div>
                </div> 
              : null
            )) : null }
          </div>
      </div>  
    )
  }
}

export default App;
