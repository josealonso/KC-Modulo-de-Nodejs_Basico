const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); ////
const Article = require('./../models/Article');

const { query, validationResult } = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
	Article.find({}, function(err, data) {
		console.log(`Inside "Article.find({})"`);
		if (err) {
			res.send(err);
			// return;
		}
		// Show all the items
		// console.log(data);
		res.render('index', {
			title: 'Nodepop',
			site_description: 'Tu portal de compra-venta',
			articles: data
		});
		// res.send('okkilo');
	});

	//	res.render('index', { title: 'Nodepop', site_description: 'Tu portal de compra-venta' });
});

router.get('/anuncios', function(req, res, next) {
	res.render('articles', { title: 'Listado', site_description: 'la lista de anuncios' });
	// res.render('articles', {  });
});

module.exports = router;
