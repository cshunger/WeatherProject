import React from 'react'
import Button from './Button'

class CityList extends React.Component {
   constructor(props){
      super(props);
   }
  render(){
    const { cities, selected } = this.props;
    return (
      <ul className="list-group">
        {cities.map((city, index) => (
          <Button
             className="list-group-item"
             key={index}
             selected={selected}
             buttonText={city.name}
             path={"/adapters/JavaHTTP/" + city.geo.lat +"/"+ city.geo.long}
             getWeather={this.props.updateWeather}
             showBusyIndicator={this.props.showBusyIndicator}/>
        ))}
      </ul>
    )
  }
}

export default CityList
