// Obtener elementos con ID table e ID contenido
let tabla = document.getElementById("tabla");
let contenido = document.getElementById("contenido")
let tarjeta = document.getElementById("tarjeta")
console.log(tabla);
console.log(contenido);
console.log(tarjeta);


// Consumo de API con Fetch
fetch(`https://digimon-api.vercel.app/api/digimon`)
.then(response => response.json())
.then(datos => {
    //console.log(datos);
    mostrarTabla(datos); //Invocando la funcion mostrarTabla()
    mostrarTarjeta(datos);
}).catch(error => console.log(error))

//Funcion para obtener los datos del Digimon y mostrarlo en la tabla con ID tabla e ID contenido
function mostrarTabla(response) {
    //Limpiar el elemento con id contenido
    contenido.innerHTML = "";
    //Recorrer los datos obtenidos de la API
    for(let temp of response){
        contenido.innerHTML +=
        `<td>${temp.name}</td>
        <td>${temp.level}</td>
        <td><img src="${temp.img}" alt="" width="40px" height="40"></td>
        `
    }
}

function mostrarTarjeta(response){
    tarjeta.innerHTML = "";
    for(let temp of response){
        tarjeta.innerHTML +=
        `
        <div class="card col-sm-12 col-md-6 mx-auto" style="width: 18rem;">
        <img src="${temp.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <p style="text-align:center; font-size:25px; color:red" class="card-text">${temp.name}</p>
          <p style="text-align:center; color:green; font-weight:bold" class="card-text">${temp.level}</p>
        </div>
        </div>
        `
    }
}

//Funcion para buscar un Digimon por nombre
function buscarDigimon(event) {
    event.preventDefault(); //Evita que se recargue la página al hacer submit
    const inputBusqueda = document.getElementById("search-input");
    const nombreDigimon = inputBusqueda.value;
    if (nombreDigimon) {
      fetch(`https://digimon-api.vercel.app/api/digimon/name/${nombreDigimon}`)
      .then(response => response.json())
      .then(datos => {
          tarjeta.innerHTML = ""; //Limpiar la sección tarjeta
          if (datos.length > 0) {
            mostrarTarjeta(datos);
          } else {
            tarjeta.innerHTML = "<p>No se encontró ningún digimon con ese nombre</p>";
          }
      }).catch(error => console.log(error));
    } else {
      tarjeta.innerHTML = "<p>Ingresa un nombre de digimon para buscar</p>";
    }
  }

  //Agregar evento al formulario de búsqueda
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", buscarDigimon);