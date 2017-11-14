//-----------------------------
//    Flybondi - Web Server
//    Por Damián Cipolat
//----------------------------

//Incluyo modulos.
const path       = require('path');
const express    = require('express');
const bodyParser = require('body-parser');
const lib        = require('./lib.js');
const config     = require('./config.js');

//Cargo la config. desde el archivo.
let   settings   = config.getConfig('./settings.json');

//Seteo la config. en una variable glogal.
global.settings  = settings;

//Iniciamos la instancia de express
const app = express();

//Defino el path de donde traer archivos estaticos.
app.use(express.static(path.join(__dirname, '../../../web/'), {
  dotfiles: 'ignore',
  index: false
}));

//Configuramos el parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Agrego a todas las respuesta el CORS.
app.use(lib.crossDomain);

//Siempre entregamos el mismo archivo.
app.get('*', lib.baseFile);

//File not found
app.use(lib.notFound);

//Server Error.
app.use(lib.internalError);

//Inicio el server.
app.listen(settings.port, lib.listen);