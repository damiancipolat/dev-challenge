/*

  Scripts para transformación de datos en base al dataset.

  Tener en cuenta que debido a la versión de MongoDB que ofrece Mongolab,
  no se puede usar en todos los casos ES6.

*/

//Guardo una función para crear el lote de rutas y sitios d partida en base al dataset.
db.system.js.save({

     _id: "loadRoutes",
     value : function(){

              //Cargo la coleccón de rutas.
              let flighstArr  = db.flights.find({}).toArray();
              let final       = [];

              db.routes.remove({});              

              flighstArr.forEach(function(route){

                let obj = {origin:route.origin,destination:route.destination};

                if (final[route.origin+'-'+route.destination]==null){
                  final[route.origin+'-'+route.destination] = obj;
                  db.routes.insert(obj);
                }

              });

              //Cargo la colección de sitios de partida.
              db.departures.remove({});              

              let depart = [];

              db.routes.find({}).toArray().forEach(function(route){

                if (depart[route.origin]==null){
                  print(route.origin);
                  db.departures.insert({iata:route.origin});
                }

              });              
    }

});


//Agrego una funcion para traer la fecha actual en YYYY-MM-DD.
db.system.js.save({

     _id: "getDate",
     value : function() {

              let currentDate = new Date();

              let yyyy = '' + currentDate.getFullYear();

              let mm = ('0' + (currentDate.getMonth() + 1));
              mm = mm.substr(mm.length - 2);

              let dd = ('0' + currentDate.getDate());
              dd = dd.substr(dd.length - 2);
              
              return yyyy + "-" + mm + "-" + dd;

      }

});

//Agrego una funcion para agregar a la fecha actual N dias.
db.system.js.save({

     _id: "addDays",
     value : function (n){

        let t = new Date();

        t.setDate(t.getDate() + n); 

        let month = "0"+(t.getMonth()+1);
        let date  = "0"+t.getDate();

        month = month.slice(-2);
        date  = date.slice(-2);

        return t.getFullYear()+"-"+month+"-"+date;
    }

});


//Agrego a cada vuelo, el codigo de vuelo obtenido del objectid y le agrego el obj aeropuerto para el origen y el destino.
db.system.js.save({

     _id: "updFlightCode",
     value : function(){

        db.flights.find({}).toArray().forEach(function(flight){

          let id = 'FLYB'+flight._id.str.substring(16,25);

          db.flights.update({"_id":ObjectId(flight._id.str)},
                            {'$set':{"flightCode"  : id,
                                     "destination" : db.airports.findOne({"iata":flight.destination}),
                                     "origin"      : db.airports.findOne({"iata":flight.origin})}});

          print("SET FLIGHTCODE > "+'FLYB'+flight._id.str.substring(16,25)+" -- "+flight._id.str);

        });
           
    }

});

//Armo una combinación completa de vuelos de ida y vuelta en base a un pto de partida.
db.system.js.save({

     _id: "fullRoundTrip",
     value : function (origin,destination){

        //Traigo los vuelos de ida.
        let ida = db.flights.find({"origin.iata":{$eq:origin},
                                   "destination.iata":{$eq:destination},
                                   "data":{$gte:getDate()},
                                   "data":{$lte:addDays(90)}}).toArray();

        //Traigo los vuelos de vuelta.
        let vuelta = db.flights.find({"origin.iata":{$eq:destination},
                                     "destination.iata":{$eq:origin},
                                     "data":{$gte:getDate()},
                                     "data":{$lte:addDays(90)}}).toArray();

        //Debo recorrer los arrays buscando combinaciones de ida y vuelta.
        let combos = [];

        //Para cada vuelo de ida, traigo vuelos de vuelta que partan despues de la ida.
        ida.forEach(function(idaF){
          
          vuelta.forEach(function(vueltaF){

             combos.push({ida:idaF,vuelta:vueltaF,price:idaF.price+vueltaF.price});

          });

        });

        return combos;

    }

});

//Cargo la colección de recomendados.
db.system.js.save({

     _id: "loadRecommended",
     value : function() {

        //Borro la cache de recomendados.
        db.recommended.remove({});

        //Traigo las combinaciones de cada ruta y las cargo.
        db.routes.find({}).toArray().forEach(function(route){

          //Traigo ordenado por precio.
          let sorted = fullRoundTrip(route.origin,route.destination).sort((a,b)=> a.price<=b.price );

          if (sorted.length>=0)
            db.recommended.insert(sorted[0]);

        });

      }

});

//Cargo la colección de aeropuertos.
db.airports.remove({});

db.airports.insert([
{"iata":"COR","name":"Aeropuerto de Pajas Blancas","city":"Ciudad de Cordoba","lat":0,"lng":0,"thumb":"aaa.png"},
{"iata":"BRC","name":"Aeropuerto Internacional Teniente Luis Candelaria","city":"Ciudad de Bariloche","lat":0,"lng":0,"thumb":"aaa.png"},
{"iata":"MDZ","name":"Aeropuerto Internacional de Mendoza","city":"Ciudad de Mendoza","lat":0,"lng":0,"thumb":"aaa.png"},
{"iata":"EPA","name":"Aeropuerto el Palomar","city":"Moron","lat":0,"lng":0,"thumb":"aaa.png"}]);


//Cargo las funciones de system.js.
db.loadServerScripts();

loadRoutes();
updFlightCode();
loadRecommended();
