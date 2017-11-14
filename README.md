# Challenge Flybondi.com

### Solución propuesta
En este diagrama presento la solución presentada por mí para resolver el challenge.

![N|Solid](http://damiancipolat.com/webFiles/flybondi-diagram.png)

Consiste en ser una SPA creada con REACTJS, siendo servida por un webserver creado en nodejs y un server
de apirest también escrito en nodejs.

TECNOLOGIAS:

Frontend:
 - reactjs
 - webpack
 - boostrap 3

Backend:
 - Mongodb
 - Nodejs
 - ExpressJS
 
## Para ejecutar:
Descomprimir el archivo y luego levantar dos procesos uno del server y otro del apirest.

Iniciar webserver (usa el puerto 80, se puede cambiar desde settings.json)

```sh
$ cd server/Web-Server
$ npm start
```

Iniciar Api Rest server (usa el puerto 5000, se puede cambiar desde settings.json)

```sh
$ cd server/Api-Server
$ npm start
```

Ir a un browser y abrir:
http://127.0.0.1/

En caso de querer recompilar html
```sh
$ cd client
$ npm run bundle
```
