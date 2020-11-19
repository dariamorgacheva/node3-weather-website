const request = require('request')




const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXZlcnlpbmNyZW1lbnRjb3VudHMiLCJhIjoiY2tmbXdvZHdoMDFsdDJzcW82Nm9kcWR3bSJ9.AABt6IsC2-YfDO3Yr4Fbig'
request({ url, json: true }, (error, {body}) => {
  if (error) {
  callback('Unable to connect to location services!', undefined)
       
      } else if (body.features.length === 0) {
      callback('Unable to connect to find location. Try another search.', undefined)
    }
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_nam        
      })
    }
  })
}
// geocode('Philadelphia', (error, data) => {
//   console.log('Error', error)
//   console.log('Data', data)
// })

module.exports = geocode