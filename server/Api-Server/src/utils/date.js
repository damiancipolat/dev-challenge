//Función que agrega a la fecha actual X días.
module.exports.addDays = (n) => {

  let t = new Date();

  t.setDate(t.getDate() + n); 

  let month = "0"+(t.getMonth()+1);
  let date  = "0"+t.getDate();

  month = month.slice(-2);
  date  = date.slice(-2);

  return t.getFullYear()+"-"+month+"-"+date;

}

//Obtengo la fecha actual en formato YYYY-MM-DD
module.exports.getDate = ()=>{

	let currentDate = new Date();

	let yyyy = '' + currentDate.getFullYear();

	let mm = ('0' + (currentDate.getMonth() + 1));
	mm = mm.substr(mm.length - 2);

	let dd = ('0' + currentDate.getDate());
	dd = dd.substr(dd.length - 2);

	return yyyy + "-" + mm + "-" + dd;

}
