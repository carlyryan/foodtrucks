var mongoose = require('mongoose')

var truckSchema = new mongoose.Schema({
	name: { type: String },
	location: { type: String },
	photo: { type: String },
	onCampusCurrently : Boolean,
	long : Number,
 	lat : Number,
})

module.exports = mongoose.model('Truck', truckSchema)
