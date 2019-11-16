
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.engine('html', require('ejs').__express)
app.set('view engine', 'html')
app.use(bodyParser.urlencoded({ extended: false }))
var truckArray = [];


app.get('/', function(req, res, next) {
  res.render('main', { trucks: truckArray })
})

app.post('/', function(req, res, next) {  
	var t = req.body.truck
	truckArray.push(t)
	res.redirect('/')
})

app.use(function(err, _, res) {
  return res.send('ERROR :  ' + err.message)
})

app.listen(process.env.PORT || 3000, function() {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
