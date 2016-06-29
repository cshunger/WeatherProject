import React from 'react'
import FSymbol from './FSymbol'

class WeatherDisplay extends React.Component {
   constructor(props){
      super(props);
   }
  render(){
    const { dow, cityDate, cityTemp, weatherImg, high, low } = this.props;
    return (
      <div>
         <h2 className="dowStyle">{dow}</h2>
         <h3 className="dateStyle">{cityDate}</h3>
         <text className="temperature"><image className="weatherIcon" src={weatherImg}/>{cityTemp} <FSymbol /></text> <br />
         <text>High: {high} <FSymbol /></text><br />
         <text>Low: {low} <FSymbol /></text><br />
      </div>
    )
  }
}

export default WeatherDisplay;
