# Challenge Flybondi.com

### Solución propuesta
En este diagrama presento la solución presentada por mí para resolver el challenge.

![N|Solid](http://damiancipolat.com/webFiles/flybondi-diagram.png)

La aplicación fue creada en forma de Single Page Application usandop REACTJS, siendo servida por un webserver creado en nodejs y un server de apirest también escrito en nodejs.

> Se desarrollaron solo dos pantallas de lo que consistiria del flujo de compra de un vuelo.

### Pantalla de Home:
![N|Solid](http://damiancipolat.com/webFiles/flybondi-home.png)

### Pantalla de resultados:

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

## Agregados:
> Adicionalmente a la información pedida al area de producto, aporte las sig. ideas:

- Vuelos recomendados - "cache de recomendados":
Es una recopilación por destinos, del vuelo más barato, que parten apartir de la fecha
en que se genere el lote, por este motivo lo ideal es que este se genere todos los días.

Esta información es util por que es mostrada en el home de la web, debajo del buscador de vuelos.

"En mi experiencia de haber trabajado en una empresa de turismo, vi la dificultad del personal
del sector comercial de estar todos los días buscando generar promociones nuevas y cargandolas en la web,
disponian de poquisimo tiempo y esta tarea se hacia de forma incompleta siempre. Por ende propongo
esta solución de cache, en caso de haber alguna promoción que se desee incluir también, el proceso
puede buscarla en base a la fecha y destino e incluirla en la cache a generar en ese momento."

- Buscar por presupuesto y pto. de partida:
Es el algoritmo que esta detras del buscador, la busqueda se realiza filtrando, todos los vuelos
que parten el mismo día o proximos a la fecha en que realize la busqueda. Ya que no se define
una fecha maxima de busqueda el sistema define como plazo maximo 3 meses.

BD:
Decidi usar una base de datos MONGODB, ya que creo que se aplica bien para este ejercicio y aporta mucha más
facilidad al momento de trabjar con los datos.

Dentro de la carpeta /bd/ esta mongo.js ahi dentro esta el archivo con las funciones js que desarrolle,
para armar la base de datos en base al dataset.json.

Hay dos funciones que son muy importantes:
- loadRecommended(): armar la cache de vuelos recomendados.
- fullRoundTrip(): hace combinaciones para armar vuelos de ida y vuelta en base a un origen y destino.
