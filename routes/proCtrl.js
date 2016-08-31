var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var Product = mongoose.model('Product');
var valid = require('./validation.js');

//valid add new pokemon func..
router.use('/newProduct', valid.isAdmin);
router.use('/newProduct', valid.newProduct);

//valid updatePromotions function
router.use('/updatePromotions', valid.newUpdate)

//valid add comment to pokemon product..
router.use('/addCommentToProduct/:id', valid.isUserLogin);
router.use('/addCommentToProduct/:id', valid.addComment);

router.route('/updatePromotions').post(function(req, res){
	Product.findOne({_id: req.body.id}, function(err, product){
		product.promotion = req.body.promo;

		product.save(function(err){
			if(err){
				console.log(err)
			}
			return res.status(200).send("Promotion added")
		})
	})
})

router.route('/newProduct').post(function(req, res){
	var product = new Product();
	product.name = req.body.name.toLowerCase()
	product.price = req.body.price
	product.foto = req.body.foto
	product.promotion = 0
	product.category = req.body.type.name
	product.type = req.body.type
	product.desc = req.body.desc
	product.save(function(err, product){
		if(err){
			console.log(err)
		}
		return res.status(200).send("Product added");
	})		
})


router.route('/addCommentToProduct/:id').post(function(req, res){
	Product.findOne({_id: req.params.id}, function(err, product){
		var comment = {
			username: req.user.username,
			text: req.body.text,
      		admin: req.user.admin
		}
		product.comments.push(comment);

		product.save(function(err, product) {
			if (err){
				return res.status(500).send(err)
			}
			return res.status(200).send('Comment added');
		});
	});

});


router.route('/productsList').get(function(req, res){
	Product.find(function(err, products){
		if(err){
			console.log(err)
		}
		return res.status(200).send(products)
	})

});


router.route('/getPromotions').get(function(req, res){
	Product.find({'promotion': {'$gt': 0}}).limit(4).exec(function(err, promotions){
		if(err){
			console.log(err)
		}
		return res.status(200).send(promotions)
	})
})


router.route('/lastArrivals').get(function(req, res){
	Product.find({}).sort({'created_at': -1}).limit(3).exec(function(err, lastArrivals){
		if(err){
			console.log(err)
		}
		return res.status(200).send(lastArrivals)
	})
})


router.route('/starters').get(function(req, res){

	Product.find({ $or: [{name: 'bulbasaur'}, {name: 'charmander'}, {name: 'squirtle'}]}, function(err, starters){
		if(err)
		{
			console.log(err)
		}
		return res.status(200).send(starters)
	})
})

router.route('/productsSortBy').post(function(req, res){
	Product.find({category: req.body.name}, function(err, products){
		if(err)
		{
			console.log(err)
		}
		return res.status(200).send(products)
	})
})

router.route('/products/:id').get(function(req, res){
	Product.findOne({_id: req.params.id}, function(err, product){
		if(err)
		{
			console.log(err)
		}
		return res.status(200).send(product)
	});
})


module.exports = router;