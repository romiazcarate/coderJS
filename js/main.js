// Variables de DOM
const contenedorJuegosPS = document.getElementById("container-juegos");
const contenedorJuegosPS2 = document.getElementById("container-juegos-ps2");
const totalCompra = document.getElementById("total-carrito");
const contenedorCarrito = document.getElementById("contenedor-carrito");
let carrito = [];
let stockProductos = [];

// Función para cargar el JSON
const cargarProductos = async () => {
    try {
        const response = await fetch('./js/juegos.json'); // Asegúrate de que esta ruta sea correcta
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        stockProductos = [...data.juegosPS, ...data.juegosPS2]; // Combinamos los juegos PS y PS2
        console.log("Productos cargados:", stockProductos)
        mostrarJuegos(); // Muestra los juegos después de cargarlos
    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
    }
};

// Función para mostrar los juegos en el DOM
const mostrarJuegos = () => {
    stockProductos.forEach(elm => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <h3>${elm.nombre}</h3>
            <p>Precio: $${elm.precio}</p>
            <img src="${elm.img}" alt="${elm.nombre}">
            <hr>
            <button id="agregar${elm.nombre}">Comprar</button>
        `;
        contenedorJuegosPS.appendChild(div); // Cambiar por contenedor adecuado

        // Evento para agregar al carrito
        const boton = document.getElementById(`agregar${elm.nombre}`);
        boton.addEventListener("click", () => {
            console.log(`Agregando al carrito: ${elm.nombre}`);
            
            agregarCarrito(elm.nombre); // Asegúrate de pasar el nombre correctamente
        });
    });
};

const agregarCarrito = (nombre) => {
    const productoAgregado = stockProductos.find(prd => prd.nombre === nombre); // Cambiar prd.elm a prd.nombre
    if (carrito.some(producto => producto.nombre === nombre)){
        const index = carrito.findIndex(producto => producto.nombre === nombre);
        carrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    }

    actualizarCarrito();
};

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(elm => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <h3>${elm.nombre}</h3>
            <p>Precio: $${elm.precio}</p>
            <p>Cantidad: ${elm.cantidad}</p>
            <button id="borrar${elm.nombre}">Borrar</button>
        `;

        contenedorCarrito.appendChild(div);

        const boton = document.getElementById(`borrar${elm.nombre}`);
        boton.addEventListener("click", () => {
            borrarDelCarrito(elm.nombre);
            actualizarCarrito();
        });
    });

    totalCompra.innerText = `Total: $${carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)}`;
};

const borrarDelCarrito = (nombre) => {
    const producto = carrito.find(prod => prod.nombre === nombre);
    const indiceProducto = carrito.indexOf(producto);
    carrito.splice(indiceProducto, 1);
};

// Iniciar la aplicación
const inicializar = async () => {
    await cargarProductos(); // Esperamos a que se carguen los productos
};

// Iniciar la aplicación
inicializar();


// Función para agregar juegos al contenedor
/*function agregarJuegos(juegos, contenedor) {
    juegos.forEach((elm) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        if (elm.desc === "Juego en stock") {
            div.innerHTML = `
            <h3 id="titulo-juego"> ${elm.nombre}</h3>
            <br>
            <img src= "${elm.img}" >
            <hr style="border: 1px solid #000; width: 50%; margin: 20px auto;">
            <p id="parrafo"> Precio: $${elm.precio} </p>
            <button class="btn"> Comprar </button>
            <button class="btn-details"> Detalles del Juego </button>
            `;
            contenedor.appendChild(div);
        }

        // Evento para ingresar a comprar
        const button = div.querySelector(".btn");
        button.addEventListener("click", () => {
            const cantidadAIngresar = document.getElementById(`cantidad-${elm.nombre.replace}`)
        });

        // Modal
        const modal = document.getElementById("modal");
        const closeButton = document.querySelector(".close-button");

        // Evento para ver detalles
        const detallesButton = div.querySelector(".btn-details");
        detallesButton.addEventListener("click", () => {
            document.getElementById("modal-titulo").textContent = elm.nombre;
            document.getElementById("modal-img").src = elm.img;
            document.getElementById("modal-descripcion").textContent = elm.genero;
            document.getElementById("modal-descripcion").textContent = elm.modoDeJuego;
            document.getElementById("modal-descripcion").textContent = elm.anio;
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
agregarJuegos(juegosPS2, contenedorJuegosPS2);*/