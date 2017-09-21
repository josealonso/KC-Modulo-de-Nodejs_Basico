// 'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Conectado a MongoDB');
});

// cadena de conexión es como una URL pero con protocolo mongodb
mongoose.connect('mongodb://localhost/Nodepop');
// Nodepop es el nombre de la base de datos

// no necesitamos exportar la conexión ya que mongoose
// se encarga de mantenerla internamente
