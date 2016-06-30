# WeatherProject
A MobileFirst Platform Foundation project using ReactJS and Weather Services API from Bluemix

## What you need

MobileFirst Platform Foundation DevKit, read getting started for MobileFirst Platform Foundation:

https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/setting-up-your-development-environment/mobilefirst-development-environment/

An instance of Weather Services from Bluemix with the password and host, read getting started for weather services:

https://console.ng.bluemix.net/docs/services/Weather/index.html

Cordova: `npm install -g cordova`

MFP CLI: `npm install -g mfpdev-cli`

Webpack: `npm install -g webpack`

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
