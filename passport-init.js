var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var express = require('express');
var _ = require('underscore');






module.exports = function(passport){

	
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.username);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log('deserializing user:',user.username);
			done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) { 


			User.findOne({ 'username' :  username }, 
				function(err, user, req) {
					if (err){
						return done(err);
					}
					if (!user){
						return done(null, false);                 
					}

					if (!isValidPassword(user, password)){
						return done(null, false);
					}

					return done(null, user);
				}
			);
		}
	));

	
	passport.use('signup', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done, err) {
			User.findOne({ 'username' :  username }, function(err, user) {

				if (user) {
					console.log('This mail is already taken')
					return done(null, false);
				} 

				var newUser = new User();

				// set the user's local credentials
				newUser.username = username;
				newUser.password = createHash(password);
				newUser.adress = req.body.adress;
				newUser.admin = false;

				newUser.save(function(err) {
					if (err){
						console.log('Error in Saving user: '+ err);  
						throw err;  
					}
					console.log(newUser.username + ' Registration succesful');    
					return done(null, newUser);
				});

			});
		})
	);


	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};
