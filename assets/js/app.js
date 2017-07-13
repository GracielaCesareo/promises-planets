function getJSON(url) { //declarar funcion getJSON

  //poner return para que devuelva el valor de la funcion, declarar resolve y reject
  return new Promise(function(resolve, reject) {
    var ajax = new XMLHttpRequest();//request de ajax
    ajax.open("GET",url);//se usa open para el tipo de peticion(GET, POST, etc...) al servidor
    ajax.send();// Envia el request al servidor web usando get


    //funcion para el estado del requerimiento
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4){ //readyState == 4 para que regrese respuesta
        resolve(JSON.parse(ajax.responseText))//parse convierte JSON a objeto
      }
    }
  })
}

getJSON("data/earth-like-results.json")//parametro url de la funcion
// .then(function(mensaje){return(getJSON(mensaje.results[0]))}) //poner return para una nueva promesa
// .then(function(resultado){console.log(resultado)})

.then(function(mensaje){
  return Promise.all(
    mensaje.results.map(getJSON)
  );
})
.then(function(resultado) {
  var nuevaPlantilla = " ";

  resultado.forEach(function (response) {
    var name = response.pl_name;
    var radius = response.ra;
    var year = response.pl_disc;
    var telescope = response.pl_telescope;

    var planetas = document.getElementById('contenedor');

    nuevaPlantilla += plantilla.replace("__name__", name).replace("__radius__",radius).replace("__year__",year).replace("__telescope__",telescope);
    planetas.innerHTML = nuevaPlantilla;
})
})

var plantilla = '<div class="row">' +
                  '<div class="col s12 m8 offset-m2">' +
                    '<div class="card">' +
                      '<div class="card-image">' +
                        '<img src="http://i.telegraph.co.uk/multimedia/archive/02076/planets-620_2076126a.jpg">' +
                      '</div>' +
                      '<div class="card-content">' +
                        '<h5><strong>__name__</strong></h5>' +
                        '<h6>__radius__</h6>' +
                        '<h6>Discovered in __year__ with __telescope__</h6>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>';

// .then(function(mensaje){
//   mensaje.results.map(function(url){
//     return(getJSON(url)
// .then(function(resultado){console.log(resultado)}));
//   })
// })
