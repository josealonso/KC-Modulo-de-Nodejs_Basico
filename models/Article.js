// 'use strict';

const mongoose = require('mongoose');

// definir un esquema
const articleSchema = new mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tags: [ String ]
    // ['work', 'lifestyle', 'motor', 'mobile']
},
{ collection: 'articles' });


// Métodos de instancia ---> .methods
// Añadimos método estático
articleSchema.statics.lista = function(filter, skip, limit, callback) {
	const query = Article.find(filter);
	query.skip(skip);
	query.limit(limit);

	return query.exec(callback); // ejecutamos la consulta
};

// crear el modelo
const Article = mongoose.model('Article', articleSchema, 'articles');

// No es necesario exportar el modelo, porque mongoose ya lo conoce
// exports solo se puede usar si no hay una asignación, pq exports es un alias a module.exports -->
module.exports = Article;
