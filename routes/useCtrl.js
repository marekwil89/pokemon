var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var User = mongoose.model('User');
var valid = require('./validation.js');


//valid only admin can get all users list
router.use('/usersList', valid.isAdmin);

//user must be login to get he`s profile information
router.use('/userProfile', valid.isUserLogin);

//before user can update he`s profile address must check if loged
router.use('/updateAdress', valid.isUserLogin);
router.use('/updateAdress', valid.adress);


router.route('/alreadyLoggedUser').get(function(req, res){
	if(_.isEmpty(req.user))
	{
		return res.status(500).send('You are not logged in')
	}

	return res.status(200).send(req.user)

})

router.route('/usersList').get(function(req, res){
	User.find(function(err, users){
		if(err){
			return res.status(500).send(err)
		}
		return res.status(200).send(users)
	});
});

router.route('/userProfile').get(function(req, res){
	User.find({username: req.user.username}, function(err, user){
		if (err){
			return res.status(500).send(err);
		}
		return res.status(200).send(req.user);
	});
})

router.route('/updateAdress').put(function(req, res){
	User.findOne({username: req.user.username}, function(err, user) {
		user.adress = req.body.adress;

		user.save(function(err, user) {
			if (err){
				return res.status(500).send(err)
			}
			return res.status(200).send("Adres changed");
		});
	});
})

module.exports = router;