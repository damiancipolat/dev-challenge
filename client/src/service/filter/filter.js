//Incluyo los dif. criterios de filtrado.
import filterPrice from './filterPrice.js';
import filterAvail from './filterAvail.js';
import filterType  from './filterType';


module.exports.applyFilter = (results,state)=>{

  if (state!=null){

    //Armo un middleware para aplicar los filtros.
    let filters = [filterPrice, filterAvail, filterType];

    //Guardo los datos para ir reduciendolos.
    let resultFilter  = results;

    filters.forEach((filtro)=>{
          
      resultFilter = filtro(resultFilter,state);

    });

    return resultFilter;

  }
  else
    return results;

}