// Array de juegos para comprar, hay algunos que en el momento no se encuentran con stock
const juegos = [
    { 
        nombre: 'Resident Evil 2',    
        precio: 1000,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_residentevil2_front_eu_thumb.jpg' 
    },
    { 
        nombre: 'Metal Gear Solid', 
        precio: 800,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_metalgearsolid_5_thumb.jpg' 
    },
    { 
        nombre: 'Crash Bandicoot', 
        precio: 550,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/playstation_1.crashbandicoot_GB.16238841271553101855_thumb.jpg' 
    },
    { 
        nombre: 'Dino Crisis', 
        precio: 700,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_dinocrisis_2_thumb.jpg' 
    },
    { 
        nombre: 'Castlevania', 
        precio: 600,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_castlevaniasymphonyofthenight_1_thumb.jpg'
    },
    {
        nombre: 'Metal Gear Solid', 
        precio: 800,
        desc: "Sin stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_metalgearsolid_5_thumb.jpg' 
    }
];

const contenedorJuegos = document.getElementById("container-juegos");
const totalCompra = document.getElementById("total-carrito");
let total = 0;

juegos.forEach((elm) =>{
    // crea un div para cada Juego agregado, con su respectiva información
    const div = document.createElement("div");

    div.classList.add("producto");

    if(elm.desc === "Juego en stock"){
        div.innerHTML = `
        <h3 id="titulo-juego"> ${elm.nombre}</h3>
        <img src= "${elm.img}" >

        <br>
        <p id="parrafo"> Precio: $${elm.precio} </p>
        <button class="btn"> Comprar </button>
        <button class="btn-details"> Detalles del Juego </button>
        `;
    contenedorJuegos.appendChild(div);
    }

    // Evento para ingresar a comprar
    const button = div.querySelector(".btn");
    button.addEventListener("click", () =>{
        let cantidad = parseInt(prompt(`Cuantas cantidad de ${elm.nombre} queres comprar?`));
        if(cantidad >0){
            total += elm.precio * cantidad
            totalCompra.textContent = `Total carrito: $${total}`;
            alert(`Agregada ${cantidad} copia(s) de ${elm.nombre}. Precio total hasta ahora: $${total}`);
        }else{
            alert('No es una opción válida, por favor selecciona una cantidad correcta');
        }
    })

    // Evento para ver detalles

    const detallesButton = div.querySelector(".btn-details");
    detallesButton.addEventListener("click", () =>{
        alert(`Detalles del juego: ${elm.desc}.`);
    })

});