import React from 'react';
import ReactDom from 'react-dom';
import Home from './Home'

function startApp(){
   ReactDom.render(
      <div className="main-container">
         <Home/>
      </div>, document.getElementById('app')
   )
}

window.onload = function(){
	var url = document.URL;
	var isSmart = (url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
	if( isSmart ){
		document.addEventListener('deviceready', startApp, false);
	}
	else{
		startApp();
	}
}
