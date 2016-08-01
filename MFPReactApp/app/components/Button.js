import React from 'react';

class Main extends React.Component{
   constructor(props){
      super(props);
   }

   handleSubmit = () =>{
      var resourceRequest = new WLResourceRequest(
          this.props.path,
          WLResourceRequest.GET
      );
      this.props.showBusyIndicator(true, this.props.buttonText);
      resourceRequest.send().then(
          this.onResponseSuccess,
          this.onResponseFailure
      );
   }

   onResponseSuccess = (response) =>{
       var resultText = response.responseText;
       this.props.showBusyIndicator(false, this.props.buttonText);
       this.props.getWeather(response);
   }

   onResponseFailure = (response) =>{
       var resultText = "Failed to call the resource:" + response.errorMsg;
       alert(resultText)
   }

   render() {
      var highlight = {};
      if(this.props.buttonText == this.props.selected){
         highlight['color'] = 'yellow';
      }
      return (
         <button
            type="button"
            className="cityButton"
            style={highlight}
            onClick={this.handleSubmit}>{this.props.buttonText}</button>
      )
   }
}

export default Main;
