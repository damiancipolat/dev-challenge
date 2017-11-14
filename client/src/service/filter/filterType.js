//Filtro por tipo de destino.
module.exports = (results,state)=>{

  //@Todo pasar a bd este filtro.
  let dest = [];

  dest['COR']  = 'mount';
  dest['BRC '] = 'mountain';
  dest['EPA '] = 'city';
  dest['MDZ '] = 'hot';

  let filters = [];

  if (state.type.mountain)
      filters.push('mountain');

  if (state.type.city)
      filters.push('city');

  if (state.type.hot)
      filters.push('hot');

  if (state.type.sea)
      filters.push('sea');

  if (state.type.mount)
      filters.push('mount');

  if (filters.length > 0)
    return results.filter((item)=>filters.includes(dest[item.ida.destination.iata]));
  else
    return results;

}