var express = require('express');
var router = express.Router();

var valid = require('./validation.js');

router.use('/signup', valid.signup);
router.use('/login', valid.login);


module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/success', function(req, res){
		res.send({state: 'success', user: req.user ? req.user : null, message: "Success"});
	});

	// sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, errors: "Bad login or password"});
	});

	router.get('/signupFail', function(req, res){

		res.send({state: 'failure', user: null, errors: "This user is already exist"});
	});

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/signupFail'
	}));

	//log out
	router.get('/signout', function(req, res) {
		req.logout();
		req.logOut();
		req.user = null

		req.session.destroy();
	});

	return router;

}