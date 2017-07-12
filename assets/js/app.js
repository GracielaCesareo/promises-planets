function getJSON(url) { //declarar funcion getJSON

  //poner return para que devuelva el valor de la funcion, declarar resolve y reject
  return new Promise(function(resolve, reject) {
    var ajax = new XMLHttpRequest();//request de ajax
    ajax.open("GET",url);//se usa open para el tipo de peticion(GET, POST, etc...) al servidor
    ajax.send();//envia al servidor


    //funcion para el estado del requerimiento
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4){ //readyState == 4 para que regrese respuesta
        resolve(JSON.parse(ajax.responseText))//parse convierte JSON a objeto
      }
    }
  })
}

getJSON("data/earth-like-results.json")//parametro url de la funcion
.then(function(mensaje){return(getJSON(mensaje.results[0]))}) //poner return para una nueva promesa
.then(function(resultado){console.log(resultado)})
