const myLocaleSystem = require('../internationalization/myLocaleSystem');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('./../models/Article');

const { query, validationResult } = require('express-validator/check');

/* Lista de artículos paginada
 *
 * Filtros de búsqueda implementados:
 * - Por nombre.
 * - Por tipo de anuncio (venta o búsqueda).
 * - Por precio.
 * - Por etiqueta.
 */
router.get('/anuncios', function(req, res, next) {
	Article.lista(req)
		.then((lista) => {
			res.render('index', {
				title: 'Nodepop',
				site_description: 'Tu portal de compra-venta',
				articles: lista
			});
			if (lista.length === 0) {
				console.log('Ningún artículo coincide con los criterios de búsqueda');
			}
		})
		.catch((err) => {
			next(err);
			return;
		});
});

module.exports = router;
