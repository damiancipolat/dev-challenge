//Incluyo modulo de MongoDB
const MongoCli  = require('mongodb').MongoClient;

//Incluyo modulos de negocio.
const search      = require('./search.js');
const dataLib     = require('./data.js');

//Referencia a la conexión.
let   MongoConn = null;

//Cuando el server entra en modo escucha.
module.exports.listen = () => {

  //Logeo arranque del server.
  console.log('FlyBondi - ApiRest');
  console.log('');  
  console.log(`* Server is running on http://${global.settings.ip}:${global.settings.port}`);

  try{

    //Intento conectarme a MONGODB.
    MongoCli.connect(global.settings.mongo, (err, db)=>{

      //Si hubo un error en la conexión.
      if (err)
        console.log('Error in connecton to MongoDB',err);
      else{

        MongoConn = db;     
        console.log("* Connected correctly to MongoDB server!");

      }

    });

  }
  catch(error){
    console.log('Error in server start.')
  }

}

//Hago una busqueda de ida y vuelta.
module.exports.searchRoundTrip = (req,res)=>{

  //Si vienen los parametros correctos.
  if ((req.body.origin!=null)&&(req.body.price!=null)){

    //Valido los valores.
    if ((typeof req.body.origin==='string')&&(typeof parseInt(req.body.price)==='number')){

      //Ejecuto la busqueda.
      search.searchRoundTrip(req.body.origin,req.body.price,MongoConn).then((result)=>{

        res.status(200).json(result);

      }).catch((err)=>{

        res.status(500).json({"error":"hubo un problema al realizar la busqueda"});

      });

    }
    else
      res.status(500).json({"error":"Parametros incorrectos"});

  }

  console.log('> Search Round Trip Request:',req.body);

}

//Traigo la lista de recomendaciones.
module.exports.getRecommendations = (req,res)=>{

  //Ejecuto la busqueda.
  dataLib.getPromotions(MongoConn).then((result)=>{

    res.status(200).json(result);

  }).catch((err)=>{
    console.log(err);
    res.status(500).json({"error":"Hubo un error al obtener los datos"});

  });

  console.log('> Get recommendations Request');

}

//Traigo la info. necesaria para los datos que se ven en la home de la web.
module.exports.getHomeData = (req,res)=>{

  //Ejecuto la busqueda.  
  dataLib.getHomeData(MongoConn).then((result)=>{

    res.status(200).json(result);

  }).catch((err)=>{
    console.log(err);
    res.status(500).json({"error":"Hubo un error al obtener los datos"});

  });
  
  console.log('> Get home-data Request');

}
