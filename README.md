# Cryptocurrency Tracker App

This is a Cryptocurrency tracker app that shows Cryptocurrency prices over a period of time.\
This project is build using ReactJs, react-router, and redux toolkit.


## Available Scripts
To run the application first clone the repository and then use the following commands:

`git https://github.com/saedsq/crypto-tracker`

### To Install the dependencies
`npm install`

### To run the app on browser
`npm run start`

To use the Coinranking API you need to get an API key and create .env file and then add the API key to gitignore file like this:

`REACT_APP_API_KEY=yourapikey`

To access the API key in your cryptoApi file within services folder that contains the api calls:

`const API_KEY=process.env.REACT_APP_API_KEY;`


