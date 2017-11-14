# Challenge Flybondi.com

### Solución propuesta
En este diagrama presento la solución presentada por mí para resolver el challenge.

![N|Solid](http://damiancipolat.com/webFiles/flybondi-diagram.png)

La aplicación fue creada en forma de Single Page Application usandop REACTJS, siendo servida por un webserver creado en nodejs y un server de apirest también escrito en nodejs.

> Se desarrollaron solo dos pantallas de lo que consistiria del flujo de compra de un vuelo.

![N|Solid](http://damiancipolat.com/webFiles/flybondi-home.png)

![N|Solid](http://damiancipolat.com/webFiles/flybondi-resu.png)

El diseño fue pensado desde el punto de vista de tener una buena UX, el formulario principal solo pide dos
datos basicos e internamente organiza la información el sistema para devolvernos los vuelos que se ajustan a dicho presupuesto.

## TECNOLOGIAS:

Frontend:
 - reactjs
 - webpack
 - boostrap 3

Backend:
 - Mongodb
 - Nodejs
 - ExpressJS

## Buenas praticas:
Se utilizaron patrones de diseño (Strategy / Middleware) en el frontend para manejar los filtros, en el lado
del backend se uso el patron (strategy) para encapsular las formas de busqueda.
 
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
