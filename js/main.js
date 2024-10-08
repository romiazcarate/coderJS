// Array de juegos para comprar, hay algunos que en el momento no se encuentran con stock
const juegosPS = [
    { 
        nombre: 'Alone in the dark',    
        precio: 1000,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/playstation_1.aloneinthedarkoneeyedjacksrevenge_US.1633570707831957984_thumb.jpg' 
    },
    { 
        nombre: 'Metal Gear Solid', 
        precio: 800,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_metalgearsolid_5_thumb.jpg' 
    },
    { 
        nombre: 'Croc : Legend of the Gobbos', 
        precio: 550,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_croclegendofthegobbos_thumb.jpg' 
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
        nombre: 'Crash Bash', 
        precio: 800,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/playstation_1.crashbash_.16219798171240980214_thumb.jpg' 
    },
    {
        nombre: 'Driver', 
        precio: 800,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_driver_gb_thumb.jpg' 
    },
    {
        nombre: 'Grand Theft Auto 2', 
        precio: 800,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_grandtheftauto2_3_thumb.jpg' 
    },
    {
        nombre: 'Harry Potter and the Chamber of Secrets', 
        precio: 800,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_harrypotterandthechamberofsecrets_eu_thumb.jpg' 
    },
    {
        nombre: 'Heart of Darkness', 
        precio: 800,
        desc: "Juego en stock",
        img: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/playstation_1/ps1_heartofdarkness_thumb.jpg' 
    }
];

const contenedorJuegos = document.getElementById("container-juegos");
const totalCompra = document.getElementById("total-carrito");
let total = 0;

juegosPS.forEach((elm) =>{
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
        let cantidad;
        while(true){
            cantidad = parseInt(prompt(`Cuantas cantidad de ${elm.nombre} queres comprar?`));
            if(cantidad > 0){
                total += elm.precio * cantidad
                totalCompra.textContent = `Total carrito: $${total}`;
                alert(`Agregada ${cantidad} copia(s) de ${elm.nombre}. Precio total hasta ahora: $${total}`);
                break;
            }else{
                alert('No es una opción válida, por favor selecciona una cantidad correcta');
            }
        }       
    })

    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close-button");

    // Evento para ver detalles

    const detallesButton = div.querySelector(".btn-details");
    detallesButton.addEventListener("click", () =>{
        document.getElementById("modal-titulo").textContent = elm.nombre;
        document.getElementById("modal-descripcion").textContent = elm.desc;
        document.getElementById("modal-img").src = elm.img;

        modal.style.display = "block";
    })

    // Evento para cerrar el modal
    closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Oculta el modal al hacer clic en "Cerrar"
});

});