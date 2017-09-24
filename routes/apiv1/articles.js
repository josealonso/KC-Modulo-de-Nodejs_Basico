// 'use strict';  // eslint: "'use strict' is unnecessary inside of modules"

const express = require('express');
const router = express.Router();

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

router.get('/', (req, res, next) => {
	// console.log(`        Esto es "router.get(/)" `);
	const nombre = req.query.nombre;
	const venta = req.query.venta;
	const precio = req.query.precio;
	const tags = req.query.tags; // ?tags=work, motor
	const skip = parseInt(req.query.skip);
	const limit = parseInt(req.query.limit);
	let sort = req.query.sort;
	let sortingOrder = 1;

	const filter = {};

	// console.log(`   skip: ${skip} limit: ${limit}   `);
	// console.log(`   nombre: ${nombre} venta: ${venta} precio: ${precio}   `);
	if (sort) {
		if (sort === 'precio') {
			sortingOrder = -1;
		} /* else {
			res.send(new CustomError());
		} */
	}
	if (nombre) {
		filter.nombre = new RegExp('^' + nombre, 'i');
	} // Cuidado ---> no poner comillas en la cadena de búsqueda, sólo "nombre=gafas"
	if (venta) {
		filter.venta = venta;
	}
	if (precio) {
		const precioComoTexto = precio.toString();

		if (!precioComoTexto.includes('-')) {
			filter.precio = precio;
		} else {
			let [ limitMin, limitMax ] = precioComoTexto.split('-');
			const precioMin = limitMin !== '' ? parseInt(limitMin) : 0;
			const precioMax = limitMax !== '' ? parseInt(limitMax) : 100000;
			// console.log('Mín: ', precioMin);   console.log('Máx: ', precioMax);
			filter.precio = { $gte: precioMin, $lte: precioMax }; // sin comillas !!
		}
	}
	if (tags) {
		const tagElements = tags.split(',');
		filter.tags = { $in: tagElements };
		// Para mostrar artículos con TODAS las etiquetas --> $all
		// ['work', 'lifestyle', 'motor', 'mobile'].find(elem => elem === 'work');
	}

	Article.lista(filter, skip, limit, sortingOrder)
		.then((lista) => {
			res.json({
				success: true,
				rows: lista
			});
			if (lista.length === 0) {
				console.log('      CustomError !!');
				// res.send(new CustomError());
			}
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
