var mongoose = require('mongoose')

var truckSchema = new mongoose.Schema({
	name : String,
	onCampusCurrently : Boolean,
	owner : String,
	long : Number,
	lat : Number,
})

module.exports = mongoose.model('Truck', truckSchema)
