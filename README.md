# KC-Modulo-de-Nodejs_Basico

### Crear el esqueleto de la aplicación

```javascript
npm install express-generator -g
express --view=ejs nodeapi
```

### Arrancar el servidor de MongoDB

```
mongod --dbpath ./data/ --directoryperdb
```

> [initandlisten] waiting for connections on port 27017
> Tue Sep 12 21:12:12.935 [websvr] admin web console waiting for 
> connections on port 28017

y para conectarnos con el cliente --->
```mongo```

### Cargar los anuncios en la base de datos

```javascript
npm run installDB
```

### Ejecutar la aplicación de Nodejs

```javascript
npm run dev
```

### Uso de la aplicación

- La URL para acceder a los anuncios en formato JSON es la siguiente:
> http://localhost:3000/apiv1/anuncios

- Para ver las fotos:
> http://localhost:3000/anuncios/work-1.jpg

- Para ver la lista de todos los anuncios:
> http://localhost:3000/anuncios

- Para ver los anuncios filtrados
> http://localhost:3000/anuncios/?skip=0&limit=4&sort=precio&precio=260-300&tags=mobile&venta=true
Devuelve un anuncio
> http://localhost:3000/anuncios/?skip=1&limit=4&sort=precio&precio=260-300&tags=mobile&venta=true
Devuelve cero anuncios

  - *sort=precio* muestra los anuncios en orden descendiente de precio. Por defecto, el orden es ascendiente.

### Probando las peticiones http

Con **Postman** se lanzan peticiones de creación ("Post). En la pestaña de "body", seleccionar **x-www-form-urlencoded**.


### Internacionalización

Se ha creado un pequeño módulo en la carpeta *internationalization* para traducir algunos mensajes de la aplicación.

### Módulo eslint

```javascript
npm i eslint --save-dev
config file: ./node_modules/.bin/eslint --init
run eslint: ./node_modules/.bin/eslint yourfile.js
```

### Sobre el enunciado de la práctica

Lo de los cluster no se hace
La creación de anuncios solo hace falta hacerla en el API, 
en el front solo se pide mostrar los anuncios con algún filtro.

### TODO: índices, paginación

- Mejorar las vistas (ficheros .ejs).
- Crear componentes visuales para filtrar los anuncios.

### Apuntes de teoría

Consumir APIs de terceros ---> módulo 'request'. npm install request

Promise.all
Promise.race --> responde el servidor más rápido

"async/await es un oasis en el mundo del sincronismo"
await consume una promesa.

"ts-node" --> módulo para usar TypeScript en Node

Si quiero mucha velocidad, uso MongoDB
Si existen muchas relaciones en los datos, uso SQL 

