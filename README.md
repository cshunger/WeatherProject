# WeatherProject
A MobileFirst Platform Foundation project using ReactJS and Weather Services API from Bluemix

Before you begin start your MobileFirst Platform Foundation 8.0 server.

## Starting the App

To get the App running on an android device navigate to the MFPReactApp project root and run the following commands:

`npm install`

`cordova add platform android`

`webpack`

Register your application with the MobileFirst Platform Foundation 8.0 server:

`mfpdev app register`

Run your application:

`cordova run android`

## Deploying the Adapter

Navigate to the root folder of the adapter JavaHttp.

First build the adpter:

`mfpdev adapter build`

Then, Deploy the adapter:

`mfpdev adapter deploy`
