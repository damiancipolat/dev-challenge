//Incluyo modulos.
const path    = require('path');

//Envio el heder CORS.
module.exports.crossDomain = (req, res, next)=>{

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');  

  next();

}

//Devuelvo el path base.
module.exports.baseFile = (req, res, next) => {

  res.sendFile(path.join(__dirname, global.settings.base));

}

//Devuelvo 404.
module.exports.notFound = (req, res, next) => {
  
  let err    = new Error('Not Found');
  err.status = 404;

  next(err);

}

//Error interno.
module.exports.internalError = (err, req, res, next) => {

  res.sendStatus(err.status || 500);

}

//Cuando el server entra en modo escucha.
module.exports.listen = () => {

  console.log('FlyBondi - Webserver');
  console.log('');  
  console.log(`* Server is running on http://${global.settings.ip}:${global.settings.port}`);
  console.log('');

}