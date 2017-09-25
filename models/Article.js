// 'use strict';

const mongoose = require('mongoose');

// definir un esquema
const articleSchema = new mongoose.Schema(
	{
		nombre: String,
		venta: Boolean,
		precio: Number,
		foto: String,
		tags: [ String ]
		// ['work', 'lifestyle', 'motor', 'mobile']
	},
	{ collection: 'articles' }
);

// function buildFilter(queryParameters) {
function buildFilter(nombre, venta, precio, tags) {
	// let params = [];
	// let [ nombre, venta, precio, tags ] = params.split(',');
	const filter = {};

	if (nombre) {
		filter.nombre = new RegExp('^' + nombre, 'i');
	}
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
			filter.precio = { $gte: precioMin, $lte: precioMax };
		}
	}
	if (tags) {
		const tagElements = tags.split(',');
		filter.tags = { $in: tagElements };
		console.log('    FFF:', filter.tags);
	}
	return filter;
}

// Métodos de instancia ---> .methods
// Añadimos método estático

/* Lista de anuncios paginada
 *
 * Filtros de búsqueda implementados:
 * - Por nombre.
 * - Por tipo de anuncio (venta o búsqueda).
 * - Por margen de precio.
 * - Por etiqueta.
 * - Por precio ascendente o descendente
 */
articleSchema.statics.lista = function(req, callback) {
	const nombre = req.query.nombre;
	const venta = req.query.venta;
	const precio = req.query.precio;
	const tags = req.query.tags; // ?tags=work, motor
	const skip = parseInt(req.query.skip);
	const limit = parseInt(req.query.limit);
	const sort = req.query.sort;
	let sortingOrder = { precio: 1 };

	if (sort) {
		if (sort === 'precio') {
			sortingOrder = { precio: -1 };
		}
	}
	// let params = [ nombre, venta, precio, tags ];
	// let filter = buildFilter(params);
	let filter = buildFilter(nombre, venta, precio, tags);
	const query = Article.find(filter).skip(skip).limit(limit).sort(sortingOrder);
	return query.exec(callback); // ejecutamos la consulta
};

// crear el modelo
const Article = mongoose.model('Article', articleSchema, 'articles');

// No es necesario exportar el modelo, porque mongoose ya lo conoce
// exports solo se puede usar si no hay una asignación, pq exports es un alias a module.exports -->
module.exports = Article;
