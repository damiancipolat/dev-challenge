//Obtengo la info. del home.
module.exports.getHomeData = ()=>{

  return new Promise((resolve,reject)=>{

    const url = 'http://127.0.0.1:5000/homeData';

    //Hago el request.
    fetch(url)
    .then((resp) => resp.json())
    .then((data)=>{

      //Si la respuesta es correcta, resuelvo la promise
      if ((data.departures!=null)&&(data.recommended!=null))
        resolve(data);
      else
        reject({"error":"bad response"});      
      
    })
    .catch(function(error){

      console.log(error);

    });

  }); 

}

//Obtengo los resultados de la busqueda.
module.exports.searchRoundTrip = (originParam,priceParam)=>{

  const url = 'http://127.0.0.1:5000/searchRoundTrip/';

  return new Promise((resolve,reject)=>{

    //Armo headers.  
    let headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    //Armo el request.
    let request = new Request(url,
              {
                method: 'POST',
                body: JSON.stringify({origin:originParam,price:priceParam}),
                headers: headers,
                cache: 'default'
              }
            );


    fetch(request).then((response) =>{
          
      resolve(response.json());
              
    }).catch(function(error) {
        console.log('error',error);
        reject(error);
    });

  });

}



