//Filtra el array de vuelos por precio.
module.exports = (results,state)=>{

  return results.filter((item)=>(item.ida.price+item.vuelta.price) <= state.prices.value);;

}