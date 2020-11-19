// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (longitude, latitude, callback) => {

  const url = ('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude +  '&lon=' + longitude + '&appid=5629c585fb6b98ac02d160d1c8f7e695')
  // console.log(url)
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback('Unable to connect to weather service', undefined)
        } else if (response.body.weather.length === 0) {
         callback('Bad request', undefined)
       } else {
         const temp = Math.floor(response.body.main.temp) - 273

          const description = response.body.weather[0].description
        callback(undefined, 'It is currently ' + temp + ' degrees' + ' and '+ description)
      }
    })
  }

  module.exports = forecast