//Traigo las promociones para el dashboard.
const getPromotions = (db)=>{

  //Devuelvo una promise para manejar la solicitud de datos.
  return new Promise((resolve,reject)=>{    

    try{

      db.collection('recommended').find({}).toArray((err,result)=>{
        
        if (err)
          reject(err);
        else
          resolve(result);

      });

    }
    catch(error){
      reject(error);
    }

  });

}

//Traigo la lista de sitios de partida.
const getDepartures = (db)=>{

  //Devuelvo una promise para manejar la solicitud de datos.
  return new Promise((resolve,reject)=>{    

    try{

      db.collection('departures').find({}).toArray((err,result)=>{
        
        if (err)
          reject(err);
        else
          resolve(result);

      });

    }
    catch(error){
      reject(error);
    }

  });

}

//Traigo la info. de la pantalla home.
module.exports.getHomeData = (db)=>{

  return new Promise((resolve,reject)=>{

    //Obtengo promises para ejecutar en serioe.
    let promPromotions = getPromotions(db);
    let promDepartures = getDepartures(db);

    //Ejecuto las promises.
    Promise.all([promPromotions, promDepartures]).then(result => { 
    
      resolve({"recommended":result[0],"departures":result[1]});

    }).catch((err)=>{
      reject(err);
    });

  });

}

module.exports.getPromotions = getPromotions;
module.exports.getDepartures = getDepartures;