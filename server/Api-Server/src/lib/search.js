//Funciones de fecha.
const date = require('../utils/date.js');

//Obtengo una promise para ejecutar la consulta de IDA.
let mongoSearchIda    = (origin,db)=>{

  //Armo el query para buscar las idas.
  let queryIda    = {"origin.iata":{$eq:origin},"data":{$gte:date.getDate()},"data":{$lte:date.addDays(90)}};

  //Devuelvo una promise para manejar la busqueda.
  return new Promise((resolve,reject)=>{

    try{

      db.collection('flights').find(queryIda).toArray((err,result)=>{

        if (err)
          reject(err);
        else
          resolve(result);

      });

    }catch(error){

      reject(error);

    }

  });

}

//Obtengo una promise para ejecutar la consulta de VUELTA.
let mongoSearchVuelta = (origin,db)=>{

  //Armo el query para buscar las ida.
  let queryVuelta = {"destination.iata":{$eq:origin},"data":{$gte:date.getDate()},"data":{$lte:date.addDays(90)}};

  //Devuelvo una promise para manejar la busqueda.
  return new Promise((resolve,reject)=>{

    db.collection('flights').find(queryVuelta).toArray((err,result)=>{

      if (err)
        reject(err);
      else
        resolve(result);

    });

  });

}

/*
  Recibo dos arrays con vuelos, teniendo en comun el origen y el destino en lotes separados,
  hago combinacions para armar los grupos de ida y vuelta.
*/
let roundTrip = (ida,vuelta,maxPrice)=>{

  //Debo recorrer los arrays buscando combinaciones de ida y vuelta.
  let combos = [];

  //Para cada vuelo de ida, traigo vuelos de vuelta que partan despues de la ida.
  ida.forEach(function(idaF){
    
    vuelta.forEach(function(vueltaF){

      //Si la fecha de ida es menor que la fecha de vuelta.
      if (idaF.data <= vueltaF.data){

        //Si la suma de ambos viajes no supera el tope.
        if ((idaF.price+vueltaF.price)<=maxPrice)
          combos.push({ida:idaF,vuelta:vueltaF});    
      }

    });

  });

  return combos;

}

//Hago la consulta a mongodb para traer los datos.
module.exports.searchRoundTrip = (origin,maxPrice,db)=>{

  return new Promise((resolve,reject)=>{

    //Traigo los resultados.
    let promIda    = mongoSearchIda(origin,db);
    let promVuelta = mongoSearchVuelta(origin,db);  

    //Traigo las promises de cada busqueda.
    Promise.all([promIda, promVuelta]).then(result => { 

      //Obtengo las combinaciones para armar viajes ida/vuelta.
      let flightResult = roundTrip(result[0],result[1],maxPrice);
      
      //Armo las combinaciones.
      resolve(flightResult);

    }).catch((err)=>{
      reject(err);
    });

  });

}