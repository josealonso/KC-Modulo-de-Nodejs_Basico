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

function arrayContainsArray (superset, subset) {
  if (subset.length === 0) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}

function filterData(list, req) {  // Esta funC es llamada 2 veces, ¿por qué?, la 1a vez tags toma el valor correcto, el seleccionado en el cliente,
	                              // pero la 2a vez no contiene nada ??
	const filter = {};
	const tags = req.query.tags; // ?tags=work, motor
	console.log('Tags passed to the server: ', tags);
	if (tags) {
		const tagParams = tags.split(',');
		let filteredData = [];
		list.forEach(function(element) {
			if (arrayContainsArray(element.tags, tagParams) === true) {
				filteredData.push(element);
			}
		});
		// filter.tags = { $in: tagElements };
		// console.log('    FFF:', filter.tags);
		return filteredData;
	} else {
		return list;
	}
}

router.get('/datos', function(req, res, next) {
	Article.lista(req)
		.then((lista) => {
			let filteredList = filterData(lista, req);
			console.log('============================= LISTA de artículos filtrados con BOTONES ================================');
			console.log(filteredList.length + ' articles will be shown');
			filteredList.forEach(function(element) {
                console.log(element.tags);
			});
			console.log('=================================================================================');
			res.render('index2', {
				// renderiza o genera la imagen
				title: 'Nodepop',
				site_description: 'Tu portal de compra-venta',
				articles: filteredList
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
