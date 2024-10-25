// Variables de DOM
const contenedorJuegosPS = document.getElementById("container-juegos");
const totalCompra = document.getElementById("total-carrito");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const finalizarCompraBtn = document.getElementById("finalizar-compra");
const modal = document.getElementById("modal");
const modalMensaje = document.getElementById("modal-mensaje");

let carrito = [];
let stockProductos = [];

// Función para cargar el JSON
const cargarProductos = async () => {
    try {
        const response = await fetch('./js/juegos.json'); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(data); // Verifica que los datos se carguen correctamente
        stockProductos = data.juegosPS;
        mostrarJuegos(); 
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
            <input type="number" id="cantidad-${elm.nombre}" min="1" placeholder="Cantidad">
            <button id="agregar${elm.nombre}">Comprar</button>
        `;
        contenedorJuegosPS.appendChild(div); 

        // Evento para agregar al carrito
        const boton = document.getElementById(`agregar${elm.nombre}`);
        boton.addEventListener("click", () => {
            const cantidadInput = document.getElementById(`cantidad-${elm.nombre}`);
            const cantidad = parseInt(cantidadInput.value);
            if (!cantidad || cantidad <= 0) {
                alert("Se debe ingresar una cantidad válida.");
                return;
            }            
        
            console.log(`Agregando al carrito: ${elm.nombre}, cantidad: ${cantidad}`);
            agregarCarrito(elm.nombre, cantidad);
        
            Toastify({
                text: `Agregado ${cantidad} x ${elm.nombre} al carrito.`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: 'right',
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
        });
    });
};

const agregarCarrito = (nombre, cantidad) => {
    const productoAgregado = stockProductos.find(prd => prd.nombre === nombre);
    if (carrito.some(producto => producto.nombre === nombre)){
        const index = carrito.findIndex(producto => producto.nombre === nombre);
        carrito[index].cantidad += cantidad;
    } else {
        productoAgregado.cantidad = cantidad;
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
    });

    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    totalCompra.innerText = `Total: $${total}`; 

    finalizarCompraBtn.style.display = carrito.length > 0 ? 'block' : 'none';
};

const mostrarFormulario = () => {
    const formularioCompra = document.getElementById("formulario-compra")
    formularioCompra.style.display = "block"; // Muestra el formulario
};

// Cerrar el modal
document.querySelector(".close-button").onclick = () => {
    modal.style.display = "none";
};

// Iniciar la aplicación
const inicializar = async () => {
    await cargarProductos(); // Esperamos a que se carguen los productos
};

// Iniciar la aplicación
inicializar();
