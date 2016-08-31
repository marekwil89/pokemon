var express = require('express');
var router = express.Router();
var _ = require('underscore');

//all validation

module.exports = {

	isAdmin: function (req, res, next){

		if(req.hasOwnProperty('user'))
		{
			if(req.user.admin === true)
			{
				return next()
			}
			else
			{
				return res.status(500).send('access denied')
			}
		}
		return res.status(500).send('access denied')
	},

	isUserLogin: function (req, res, next){
		if(_.isEmpty(req.user) || !req.user )
		{
			return res.status(500).send('You are not logged in')
		}
		next()
	},

	newProduct: function(req, res, next){
		if(_.isEmpty(req.body) || !req.body.name || !req.body.price || !req.body.foto || !req.body.type || !req.body.desc){
			return res.status(500).send("Fill all fields")
		}
		if(isNaN(req.body.price))
		{
			return res.status(500).send("Fill field price correct")
		}
		if(req.body.name.length >= 20 || req.body.foto.length >= 20 || req.body.desc.length >= 300 || req.body.price.length >= 10)
		{
			return res.status(500).send("Max fields allowed number is 20")
		}
		next()
	},

	addComment: function(req, res, next){
		if(_.isEmpty(req.body) || !req.body.text)
		{
			return res.status(500).send("Fill all fields")
		}
		if(req.body.text.length >= 300)
		{
			return res.status(500).send("Max fields allowed number is 20")
		}
		next()
	},

	newOrder: function(req, res, next){
		if(_.isEmpty(req.body.items))
		{
			return res.status(500).send('Your cart is empty')
		}
		next()
	},

	emptyAdress: function(req, res, next){
		if(_.isEmpty(req.user.adress) || !req.user.adress.detail || !req.user.adress.city || !req.user.adress.zip || !req.user.adress.phone){
			return res.status(500).send('to finish order you must fill all adress fields')
		}
		next()
	},

	adress: function(req, res, next){

		var regPhone = /^$|\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/;

		var regPostal = /(^$|\d{2}-\d{3})/;

		if(req.body.adress.detail.length > 40 || req.body.adress.city.length > 40)
		{
			return res.status(500).send('City, Detail - max number of character allowed is 40')
		}
		if(regPostal.test(req.body.adress.zip) == false){
			return res.status(500).send('invalid Postal Code format')
		}
		if(req.body.adress.zip.length > 6)
		{
			return res.status(500).send('Postal Code - max number of character allowed is 6')
		}
		if(regPhone.test(req.body.adress.phone) == false){
			return res.status(500).send('invalid phone format')
		}
		if(req.body.adress.phone.length > 11)
		{
			return res.status(500).send('Telephone - max number of character allowed is 11')
		}
		next()
	},

	signup: function(req, res, next){

		var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(regEmail.test(req.body.username) == false){
			return res.status(200).send({state: 'failure', user: null, errors: "Invalid email format"})
		}
		if(_.isEmpty(req.body.username) || _.isEmpty(req.body.password) || !req.body.username || !req.body.password)
		{
			return res.status(200).send({state: 'failure', user: null, errors: "Fill all fields"})
		}
		if(req.body.username.length > 15 || req.body.username.length < 5 || req.body.password.length > 15 || req.body.password.length < 5)
		{
			return res.status(200).send({state: 'failure', user: null, errors: "Username, Password - characters number allowed between 5 - 15"})
		}
		next()
	},

	login: function(req, res, next){
		if(_.isEmpty(req.body.username) || _.isEmpty(req.body.password) || !req.body.username || !req.body.password)
		{
			return res.status(200).send({state: 'failure', user: null, errors: "Fill all fields"})
		}
		next()
	},

	newUpdate: function(req, res, next){
		if(typeof req.body.promo != 'number'){
			return res.status(500).send('Invalid format')
		}
		if(req.body.promo < 0){
			return res.status(500).send('Promotion can not be less than 0 €')
		}
		console.log('i`m here')
		next();
	}

}



