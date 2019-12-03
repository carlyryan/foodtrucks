var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var Truck = require('./models/truck')
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hw5-new', { useNewUrlParser: true },  { useUnifiedTopology: true })

app.engine('html', require('ejs').__express)
app.set('view engine', 'html')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res, next) {
  var truckDb = Truck.find({}, function(err, results) {
    if (!err) {
      res.render('main', { trucks: results })
    } else {
      res.send(err.message)
    }
  })
})

app.post('/', function(req, res, next) {
  var currname = req.body.truck

  var truckObj = new Truck({ name: currname })
  truckObj.save(function(err, result) {
    if (!err) {
      res.redirect('/')
    } else {
      res.send('something went wrong: ' + err.message)
    }
  })
})

app.get('/signup', function(req, res, next) {
  User.find({}, function(err, results) {
    console.log(results)
  })
  res.render('signup')
})

app.post('/signup', function(req, res, next) {
  var { username, password } = req.body
  var u = new User({ username, password })
  u.save(function(err, result) {
    if (!err) {
      res.redirect('/')
    } else {
      res.send(err.message)
    }
  })
})

app.use(function(err, _, res) {
  return res.send('ERROR :  ' + err.message)
})

app.listen(process.env.PORT || 3000, function() {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
