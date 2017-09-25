// 'use strict';

function translate(message) {
	let listOfMessages = {
		Hello: 'Hola',
		Bye: 'Adiós',
		'Not Found': 'Recurso no encontrado',
		'Not valid': 'No es válido',
		'No Match': 'Ningún artículo coincide con los criterios de búsqueda'
	};
	// return listOfMessages.message; // Así no coge la variable
	return listOfMessages[message];
}

module.exports = { translate: translate };
