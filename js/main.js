// Juegos PS y PS2
const contenedorJuegosPS = document.getElementById("container-juegos");
const contenedorJuegosPS2 = document.getElementById("container-juegos-ps2");
const totalCompra = document.getElementById("total-carrito");
let total = 0;

// Función para agregar juegos al contenedor
function agregarJuegos(juegos, contenedor) {
    juegos.forEach((elm) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        if (elm.desc === "Juego en stock") {
            div.innerHTML = `
            <h3 id="titulo-juego"> ${elm.nombre}</h3>
            <img src= "${elm.img}" >
            <br>
            <p id="parrafo"> Precio: $${elm.precio} </p>
            <button class="btn"> Comprar </button>
            <button class="btn-details"> Detalles del Juego </button>
            `;
            contenedor.appendChild(div);
        }

        // Evento para ingresar a comprar
        const button = div.querySelector(".btn");
        button.addEventListener("click", () => {
            let cantidad;
            while (true) {
                cantidad = parseInt(prompt(`Cuantas cantidad de ${elm.nombre} queres comprar?`));
                if (cantidad > 0) {
                    total += elm.precio * cantidad;
                    totalCompra.textContent = `Total carrito: $${total}`;
                    alert(`Agregada ${cantidad} copia(s) de ${elm.nombre}. Precio total hasta ahora: $${total}`);
                    break;
                } else {
                    alert('No es una opción válida, por favor selecciona una cantidad correcta');
                }
            }
        });

        // Modal
        const modal = document.getElementById("modal");
        const closeButton = document.querySelector(".close-button");

        // Evento para ver detalles
        const detallesButton = div.querySelector(".btn-details");
        detallesButton.addEventListener("click", () => {
            document.getElementById("modal-titulo").textContent = elm.nombre;
            document.getElementById("modal-descripcion").textContent = elm.desc;
            document.getElementById("modal-img").src = elm.img;

            modal.style.display = "block";
        });

        // Evento para cerrar el modal
        closeButton.addEventListener("click", () => {
            modal.style.display = "none"; // Oculta el modal al hacer clic en "Cerrar"
        });
    });
}

// Llama a la función para agregar juegos de PS
agregarJuegos(juegosPS, contenedorJuegosPS);

// Llama a la función para agregar juegos de PS2
agregarJuegos(juegosPS2, contenedorJuegosPS2);