var express = require('express');
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var router = express.Router();
var Order = mongoose.model('Order');
var valid = require('./validation.js');

//valid my Orders
router.use('/myOrders', valid.isUserLogin);

//valid new Order
router.use('/newOrder', valid.isUserLogin);
router.use('/newOrder', valid.emptyAdress)
router.use('/newOrder', valid.newOrder)

//valid change order status
router.use('/changeOrderStatus', valid.isAdmin);

//valid only admin can get all orders..
router.use('/ordersList', valid.isAdmin);

router.route('/myOrders').get(function(req, res){
	Order.find({person: req.user.username}, function(err, orders){
		if (err){
			return res.status(500).send(err);
		}
		return res.status(200).send(orders);
	});
})

router.route('/newOrder').post(function(req, res){
	var order = new Order();
	order.person = req.user.username;
	order.status = 'New';
	order.promotion = req.body.promotion
	order.adress = req.user.adress;
	order.items = req.body.items;

	order.save(function(err, order) {
		if (err){
			return res.status(500).send(err);
		}
		return res.status(200).send({text: "order created"});
	});
})

router.route('/changeOrderStatus').put(function(req, res){
	Order.findById(req.body.id, function(err, order) {
		order.status = req.body.newStatus;

		order.save(function(err, order) {
			if (err){
				return res.status(500).send(err)
			}
			return res.status(200).send({text: "status changed"});
		});
	});
})


router.route('/ordersList').get(function(req, res){
	Order.find(function(err, orders){
			if(err){
				return res.status(500).send(err)
			}
			return res.status(200).send(orders)
	});
})


module.exports = router;