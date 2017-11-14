//Dependencias
const fs   = require('fs');
const path = require('path');

//Traigo el archivo de config.
module.exports.getConfig = (file)=>{
  
  return JSON.parse(fs.readFileSync(file).toString());

}