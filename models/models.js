var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	adress: {
		detail: String,
		city: String,
		zip: String,
		phone: String
	},
	admin: Boolean,
	created_at: {type: Date, default: Date.now}
})

var productSchema = new mongoose.Schema({
	foto: String,
	name: String,
	price: Number,
	favorite: Boolean,
	category: String,
	type: {
		name: String,
		icon: String
	},
	desc: String,
	created_at: {type: Date, default: Date.now},
	promotion: Number,
	comments: [{
		username: String,
		text: String,
    	admin: Boolean,
		created_at: {type: Date, default: Date.now}
	}]
});


var orderSchema = new mongoose.Schema({
	person: String,
	status: String,
	created_at: {type: Date, default: Date.now},
	adress: {
		detail: String,
		city: String,
		zip: String,
		phone: String
	},
	items: [{
		name: String,
		price: Number,
		qty: Number,
		promotion: Number
	}]

});


mongoose.model('Order', orderSchema);
mongoose.model('Product', productSchema);
mongoose.model('User', userSchema);
