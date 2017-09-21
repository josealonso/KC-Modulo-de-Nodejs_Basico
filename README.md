npm install express-generator -g
express --view=ejs nodeapi

Arrancar el servidor de MongoDB --->
```mongod --dbpath ./data/ --directoryperdb```

[initandlisten] waiting for connections on port 27017
Tue Sep 12 21:12:12.935 [websvr] admin web console waiting for connections on port 28017

y para conectarnos con el cliente --->
```mongo```

*Para cargar los anuncios en la base de datos*
```npm run installDB```

*Probando las peticiones http*

Con "Postman" se lanzan peticiones de creación ("Post). En la pestaña de "body", seleccionar 
"x-www-form-urlencoded".

Desde el navegador, la url para acceder a los artículo en formato JSON es la siguiente:
```http://localhost:3000/apiv1/articles```

---------------------------------------------------------

Consumir APIs de terceros ---> módulo 'request'. npm install request

Promise.all
Promise.race --> responde el servidor más rápido

"async/await es un oasis en el mundo del sincronismo"
await consume una promesa.

"ts-node" --> módulo para usar TypeScript en Node

Práctica: lo de los cluster no se hace
--------------------------------------------------
Módulo eslint

npm i eslint --save-dev
config file: ./node_modules/.bin/eslint --init
run eslint: ./node_modules/.bin/eslint yourfile.js
--------------------------------------------------

La creación de anuncios solo hace falta hacerla en el API, 
en el front solo se pide mostrar los anuncios con algún filtro.

