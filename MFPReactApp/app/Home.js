import React from 'react';
import CityList from './components/CityList'
import WeatherDisplay from './components/WeatherDisplay'


class Home extends React.Component{
   constructor(props){
      super(props);
      // this.handleWeather = this.handleWeather.bind(this);
      // this.showBusyIndicator = this.showBusyIndicator.bind(this);
      this.state = {
         busy: false,
         cityTemp: '',
         cityHigh: '',
         cityLow: '',
         cityDate: '',
         weatherIcon: '',
         dow: '',
         cities : [
                     {
                        "name" : "Austin",
                        "geo" :{
                           "lat":30.2,
                           "long":-97.68
                        }
                     },
                     {
                        "name" : "Ann Arbor",
                        "geo" :{
                           "lat":42.2,
                           "long":-83.74
                        }
                     },
                     {
                        "name" : "New York",
                        "geo" :{
                           "lat":40.71,
                           "long":-74.00
                        }
                     },
                     {
                        "name" : "San Franciso",
                        "geo" :{
                           "lat":37.77,
                           "long":-122.42
                        }
                     }
                  ]
      }
   }

   handleWeather = (_weatherData) => {
      var d = new Date(Date.now());
      var dateString =  this.getMonthDate(d) + ", " + d.getFullYear();
      var timeOfDay = _weatherData.responseJSON.observation.day_ind;
      this.setState({
         cityTemp: _weatherData.responseJSON.observation.imperial.temp,
         cityHigh: _weatherData.responseJSON.observation.imperial.temp_max_24hour,
         cityLow: _weatherData.responseJSON.observation.imperial.temp_min_24hour,
         cityDate: dateString,
         weatherIcon: this.getIconURL(_weatherData.responseJSON.observation.icon_code),
         dow: _weatherData.responseJSON.observation.dow

      });
   }

   showBusyIndicator = (status, index) =>{
      this.setState({
         selected: index,
         busy: status
      })
   }

   getMonthDate(d) {
      var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      return monthNames[d.getMonth()] + ' ' + d.getDate();
   }

   getIconURL(code) {
      return "./img/weathericons/icon" + code + ".png";
   }

   render() {
      var weatherData;
      if(this.state.cityTemp != ''){
         weatherData = <WeatherDisplay
            dow={this.state.dow}
            cityDate={this.state.cityDate}
            cityTemp={this.state.cityTemp}
            weatherImg={this.state.weatherIcon}
            high={this.state.cityHigh}
            low={this.state.cityLow}
            />;
      } else if (this.state.busy) {
         weatherData = <h2>Waiting...</h2>
      }
      return (
         <div>
            <h2 className="mfHeader">MobileFirst Weather</h2>
            <CityList
               cities={this.state.cities}
               selected={this.state.selected}
               updateWeather={this.handleWeather}
               showBusyIndicator = {this.showBusyIndicator}/>
            {weatherData}
         </div>
      )
   }
}

export default Home;
