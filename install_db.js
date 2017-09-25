// 'use strict';
require('./lib/connectMongoose');    

const mongoose = require('mongoose');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const INI_DATA_FILE = 'articles.json';

const articleSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tags: [ String ]
	// ['work', 'lifestyle', 'motor', 'mobile']
});

const Article = mongoose.model('Article', articleSchema);

// Borra las colecciones
function deleteAllTheArticles() {
	Article.deleteMany({}, function(err, res) {
		assert.equal(null, err);
		// assert.equal(dataFromFile.length, res.result.n);
		console.log(`Eliminados ${res.result.n} anuncios`);
	});
}

function buildArticles(jsonFile) {
	const fullPath = path.join(__dirname, jsonFile);
	console.log(`Fichero de datos: ${fullPath}`);
	fs.readFile(fullPath, 'utf8', function(err, data) {
		if (err) {
			console.log('Error loading the articles in the data base', err);
			return;
		}
		const dataFromFile = JSON.parse(data);
		Article.insertMany(dataFromFile, function(err, res) {
			assert.equal(null, err);
			// assert.equal(dataFromFile.length, res.insertedCount);
			console.log(`Cargados ${res.insertedCount} anuncios`);
		});
	});
}

deleteAllTheArticles();
buildArticles('articles.json');
