// 'use strict';

const mongoose = require('mongoose');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const INI_DATA_FILE = 'articles.json';

require('./lib/connectMongoose');

const articleSchema = mongoose.Schema({
	// _id: Number,
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
		// console.log(dataFromFile);
		// Article.collection.insertMany(dataFromFile, function(err, res) {
		Article.insertMany(dataFromFile, function(err, res) {
			assert.equal(null, err);
			// console.log(`          Insertados ${res.insertedCount} anuncios`);
			// assert.equal(dataFromFile.length, res.insertedCount);
			console.log(`Cargados ${res.insertedCount} anuncios`);
		});

		// console.log('Cerrando conexión......');
		// conn.close();
	});
}

// Carga los anuncios o artículos
// Creamos un registro por cada elemento del fichero "articles.json"

deleteAllTheArticles();
buildArticles('articles.json');
