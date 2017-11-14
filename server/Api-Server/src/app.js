//Incluyo modulos.
const http       = require('http');
const express    = require('express');
const config     = require('./utils/config.js');
const api        = require('./lib/api.js');
const bodyParser = require('body-parser');

//Instancias.
const app      = express();
const server   = http.createServer(app);
const port     = config.port;

//Cargo la config. desde el archivo.
let settings = config.getConfig('./settings.json');

//Seteo la config. en una variable glogal.
global.settings  = settings;

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
let allowCrossDomain = function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');  

  // Intercepts OPTIONS method
  if ('OPTIONS' === req.method)      
    res.sendStatus(200);
  else
    next();
}

app.use(allowCrossDomain);

//Buscar en base a un destino y un presupuesto, ida y vuelta.
app.post('/searchRoundTrip/',api.searchRoundTrip);

//Traigo la lista de recomendados.
app.get('/recommendations/',api.getRecommendations);

//Traigo la información para mostrar en el home del website.
app.get('/homeData/',api.getHomeData);

//Inicio el server.
app.listen(settings.port, api.listen);