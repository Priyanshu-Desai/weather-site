const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res) {
  const url = 'http://api.openweathermap.org/data/2.5/weather?q='+req.body.postcodeSearchBox+'&appid=346eda849bac45f08391170e473a0f11&units=metric'
  http.get(url, function(response){
    var statusCode = response.statusCode
    console.log(statusCode)
    if (statusCode === 404) {
      res.write('<h1>Error 404</h1>')
      res.write('<p>could not find what you were looking for</p>')
      res.send()
    }
    response.on('data', function(data){
      const weather = JSON.parse(data)
      const description = weather.weather[0].description
      const icon = weather.weather[0].icon
      const temp = weather.main.temp

      res.write('<h1>'+req.body.postcodeSearchBox+'</h1>')
      res.write('<h2>'+description+'</h2>')
      res.write('<img src= http://openweathermap.org/img/wn/'+icon+'@2x.png >')
      res.write('<p>temperature: '+temp+' degrees celcius</p>')
      res.send()
    })
  })
})

app.listen(5000, function() {
  console.log('server running on port 5000')
})
