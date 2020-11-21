const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Dasha"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Dasha'
})
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help! I need somebody',
    name: 'Dasha'
})
})




// app.get('/help', (req, res) => {
//     res.send([{
//       name: 'Dasha',
//       age: 33
//     }, 
//     {name: 'cute',
//       age: 'sweet'}])
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address'
    })
  } geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
    if (error) {
      return res.send({ error })
    } 
    
    forecast (longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      } 
      
      res.send({
         forecast: forecastData,
         location,
         latitude,
         longitude,
         address: req.query.address
        })

    })
  })
})

  

  //   res.send({
//     location: 'Toronto',
//     forecast: 'sunny',
//     address: req.query.address
//   }) 
// })

app.get('/products', (req, res) => {
  if (!req.query.search) {
//by using return we stop the function 
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})





app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 help',
    name: 'Dasha',
    errorMessage: 'Help article not found' 
  })

})



app.get('*', (req, res) => {
  res.render('404', {
    title: '404', 
    name: 'Dasha',
    errorMessage: 'Page not found'
  })
})


app.listen(port, () => {
  console.log('Server is up on port '+ port)
})