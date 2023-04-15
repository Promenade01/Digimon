// Obtener elementos con ID table e ID contenido
let tabla = document.getElementById("tabla");
let contenido = document.getElementById("contenido")
console.log(tabla);
console.log(contenido);


// Consumo de API con Fetch
fetch(`https://digimon-api.vercel.app/api/digimon`)
.then(response => response.json())
.then(datos => {
    //console.log(datos);
    mostrarTabla(datos); //Invocando la funcion mostrarTabla()
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
        <td><img src="${temp.img}" alt="" width="50px" height="50"></td>
        `
    }
}
