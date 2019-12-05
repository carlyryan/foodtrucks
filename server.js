var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var app = express()
var Truck = require('./models/truck')
var User = require('./models/user')
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hw5-new', { useNewUrlParser: true },  { useUnifiedTopology: true })


app.engine('html', require('ejs').__express)
app.set('view engine', 'html')
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res, next) {
  res.render('login', {title : 'Express'})
})

app.post('/login', function(req, res, next) {
  //LOGIN
  var us = req.body.username
  var pw = req.body.password
  User.findOne({username : us, password : pw}, function(err, user) {
    if (err) {
      res.send('something went wrong: ' + err.message)
    }
    if(!user) {
      res.send('This user doesnt exist yet! Go back and try again.')
    } else {
    res.redirect('/main')
  }
    })
})


app.post('/register', function(req, res, next) {
  var us = req.body.username
  var pw = req.body.password
  var newUser = new User({username : us, password : pw})
  newUser.save(function(err, result) {
    if (err) {
      res.send('something went wrong: ' + err.message)
    }
  })
    res.redirect('/main')
})


app.get('/main', function(req, res, next) {
  var truckDb = Truck.find({}, function(err, results) {
    if (!err) {
      res.render('main', { trucks: results })
    } else {
      res.send(err.message)
    }
  })
})

app.post('/main', function(req, res, next) {
  var currname = req.body.truck
  var newUser = new User()
  newUser.save(function(err, result) {
    if (!err) {
      res.redirect('/add')
    } else {
      res.send('something went wrong: ' + err.message)
    }
  })
})

app.get('/add', function(req, res, next) {
    res.render('add')
})


app.post('/newtruck', function(req, res, next) {
  var currname = req.body.name
  var loc = req.body.location
  var latitude = req.body.latitude
  var longitude = req.body.longitude
  var v;
  if (req.body.venmo === 'y') v = 'accepts venmo!'
    else v = 'does not accept venmo:/'
  var newTruck = new Truck({name : currname, location : loc, venmo : v, long : longitude, lat : latitude})
  newTruck.save(function(err, result) {
    if (!err) {
      res.redirect('/main')
    } else {
      res.send('something went wrong: ' + err.message)
    }
  })
})



app.use(function(err, _, res) {
  return res.send('ERROR :  ' + err.message)
})

app.listen(process.env.PORT || 3000, function() {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
