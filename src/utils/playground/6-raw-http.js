//ppl usually don't use that, using libraries instead. Why???

http = require('http')
const url = 'http://api.openweathermap.org/data/2.5/weather?lat=34.0544&lon=-118.2439&appid=5629c585fb6b98ac02d160d1c8f7e695'


const request = http.request(url, (response) => {
  let data = ''

  response.on('data', (chunk) => {
    data = data + chunk.toString()
    console.log(chunk) 
  })
  response.on('end', () => {
      const body = JSON.parse(data)
      console.log(body)
  })
})


request.on('error', (error) => {
  console.log('An error', error)
})

request.end()