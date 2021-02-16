const express = require('express');
const router = express.Router();
const Product = require('../models/products');
////////////////////////Route//////////////////

//////Index//////
router.get('/', (req, res) => {
	Product.find({}, (err, products) => {
		if (err) console.log(err);
		res.render('index.ejs', {
			allProducts: products,
		});
	});
});

//////New//////
router.get('/new', (req, res) => {
	res.render('new.ejs');
});

//////Show//////
router.get('/:id', (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (err) console.log(err);
		res.render('show.ejs', {
			productObj: product,
		});
	});
});

//////Create//////
router.post('/', (req, res) => {
	Product.create(req.body, (err, product) => {
		if (err) console.log(err);
		console.log(product);
		res.redirect('/store');
	});
});

//////Delete//////
router.delete('/:id', (req, res) => {
	Product.findByIdAndRemove(req.params.id, (err, product) => {
		if (err) console.log(err);
		console.log(product);
		res.redirect('/store');
	});
});

//////Edit//////
router.get('/:id/edit', (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (err) console.log(err);
		res.render('edit.ejs', {
			productObj: product,
		});
	});
});

//////Buy//////
router.put('/:id/buy', (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (err) console.log(err);
		let originQty = product.qty;

		Product.findByIdAndUpdate(
			req.params.id,
			{ qty: originQty - req.body.qty },
			{ new: true },
			(err, product) => {
				if (err) console.log(err);
				console.log(product);
				res.redirect('/store/' + req.params.id);
			}
		);
	});
});

//////Update//////
router.put('/:id', (req, res) => {
	Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, product) => {
			if (err) console.log(err);
			console.log(product);
			res.redirect('/store/' + req.params.id);
		}
	);
});

///////////////////////////////////////////////
module.exports = router;
