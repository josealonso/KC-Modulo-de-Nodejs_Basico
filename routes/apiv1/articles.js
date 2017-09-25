// 'use strict';  // eslint: "'use strict' is unnecessary inside of modules"

const myLocaleSystem = require('../../internationalization/myLocaleSystem');
const express = require('express');
const router = express.Router();

// Le pedimos a mongoose que nos de el modelo de Article
// const mongoose = require('mongoose');
// const Agente = mongoose.model('Article');

// Segunda alternativa (hay q exportar "Article.js")
const Article = require('../../models/Article');

// El q llama al resolve de la promesa es Mongoose
router.get('/', (req, res, next) => {
	Article.lista(req)
		.then((lista) => {
			res.json({
				success: true,
				rows: lista
			});
			if (lista.length === 0) {
				console.log(myLocaleSystem.translate('No Match'));
			}
		})
		.catch((err) => {
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
// Crear un anuncio
router.post('/', (req, res, next) => {
	console.log('       body:', req.body);
	// Creamos un anuncio
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
// PUT / Actualizar un anuncio
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
		(err, articuloActualizado) => {
			if (err) {
				console.log('Error', err.message1);
				next(err);
				return; // Si no ponemos esta línea, da error de "Can't set headers after they are sent.",
				// pq se ha respondido más de una vez.
			}
			res.json({
				success: true,
				result: articuloActualizado
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

module.exports = router;
