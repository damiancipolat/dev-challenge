//Filtrar por cantidad de asientos libres.
module.exports = (results,state)=>{

  return results.filter((item)=>item.ida.availability<=parseInt(state.pax));

}