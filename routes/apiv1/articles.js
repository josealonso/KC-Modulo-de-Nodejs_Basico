// 'use strict';  // eslint: "'use strict' is unnecessary inside of modules"

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); ////

// Le pedimos a mongoose que nos de el modelo de Article
// const mongoose = require('mongoose');
// const Agente = mongoose.model('Article');

// Segunda alternativa (hay q exportar "Article.js")
const Article = require('../../models/Article');

// GET parcial o lista de artículos paginada
// El q llama al resolve de la promesa es Mongoose
/**
 * Filtros de búsqueda implementados:
 * - Por nombre.
 * - Por tipo de anuncio (venta o búsqueda).
 * - Por precio.
 * - Por etiqueta.
 */
const conn = mongoose.connection;
conn.on('error', (err) => {
	console.log('Error de conexión', err);
	process.exit(1);
});
/* conn.once('open', () => {
	console.log('Conectado a MongoDB');
});  */

// mongoose.connect('mongodb://localhost/Nodepop'); // Nodepop es el nombre de la base de datos


router.get('/', (req, res, next) => {
	console.log(`        Esto es "router.get(/)" `);
	const nombre = req.query.nombre;
	const venta = req.query.venta;
	const precio = req.query.precio;
	const tags = req.query.tags; // ?tags=work, motor
	const skip = parseInt(req.query.skip);
	const limit = parseInt(req.query.limit);

	const filter = {};

	console.log(`   skip: ${skip} limit: ${limit}   `);
	console.log(`   nombre: ${nombre} venta: ${venta} precio: ${precio}   `);
	if (nombre) {
		filter.nombre = nombre;
	}
	if (venta) {
		filter.venta = venta;
	}
	if (precio) {
		filter.precio = precio;
	}
	if (tags) {
		filter.tags = tags;
		// ['work', 'lifestyle', 'motor', 'mobile'].find(elem => elem === 'work');
	}

	// recuperar una lista de artículos
/*	Article.find({}, function(err, data) {
		console.log(`Inside "Article.find({})"`);
		if (err) {
			throw err;
			// return;
		}
		// Show all the items
		console.log(data);
	});  */

	Article.lista(filter, skip, limit)
		.then((lista) => {
			res.json({
				success: true,
				rows: lista
			});
		})
		.catch((err) => {
			console.log('Error', err);
			next(err);
			return;
		});
});

// GET /:id
// Recupera un solo documento
router.get('/:id', (req, res, next) => {
	const _id = req.params.id;
	Article.findOne(
		{
			_id: _id
		},
		(err, article) => {
			if (err) {
				console.log('Error', err);
				next(err);
				return;
			}
			res.json({
				success: true,
				row: article
			});
		}
	);
});

// POST /
// Crear un artículo
router.post('/', (req, res, next) => {
	// console.log('req.body');
	console.log('       body:', req.body);
	// Creamos un artículo
	const article = new Article(req.body);

	// lo guardamos en la base de datos
	article.save((err, articleSaved) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
	res.json({ success: true, result: articleSaved });
	});
});

/***********************************************************/
// PUT / Actualizar un agente
router.put('/:clave', (req, res, next) => {
	const _id = req.params.clave;
	// new: true le indica q devuelve el objeto después de actualizar
	Article.findOneAndUpdate(
		{
			_id: _id
		},
		req.body,
		{
			new: true
		},
		(err, agenteActualizado) => {
			if (err) {
				console.log('Error', err);
				next(err);
				return; // Si no ponemos esta línea, da error de "Can't set headers after they are sent.",
				// pq se ha respondido más de una vez.
			}
			res.json({
				success: true,
				result: agenteActualizado
			});
		}
	);
});

// DELETE
router.delete('/:id', (req, res, next) => {
	const _id = req.params.id;
	// new: true le indica q devuelve el objeto después de actualizar
	Article.remove(
		{
			_id: _id
		},
		(err) => {
			if (err) {
				console.log('Error', err);
				next(err);
				return; // Si no ponemos esta línea, da error de "Can't set headers after they are sent.",
				// pq se ha respondido más de una vez.
			}
			res.json({
				success: true
			});
		}
	);
});

/*
Si quiero mucha velocidad, uso MongoDB
Si existen muchas relaciones en los datos, uso SQL */

module.exports = router;
