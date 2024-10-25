// Variables de DOM
const contenedorJuegosPS = document.getElementById("container-juegos");
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
            <img src="${elm.img}" alt="${elm.nombre}">
            <h3>${elm.nombre}</h3>
            <p>Precio: $${elm.precio}</p>
            <hr>
            <button id="agregar${elm.id}">Agregar</button>
        `;
        contenedorJuegosPS.appendChild(div); 

        // Evento para agregar al carrito
        const boton = document.getElementById(`agregar${elm.id}`);
        boton.addEventListener("click", () => {        
            agregarCarrito(elm.id);
        
            Toastify({
                text: `Agregado ${elm.nombre} al carrito.`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: 'right',
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
        });
    });
};

// Funcion para agregar juegos al carrito
const agregarCarrito = (id) => {
    const productoAgregado = stockProductos.find(prd => prd.id === id);
    const productoEnCarrito = carrito.find(producto => producto.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1; // Incrementa la cantidad si el producto ya está en el carrito
    } else {
        carrito.push({ ...productoAgregado, cantidad: 1 }); // Agrega el producto con cantidad inicial de 1
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
};

// Funcion para ir actualizando los juegos agregados al carrito
const actualizarCarrito = () => {
    const contenedorCarrito = document.getElementById("contenedor-carrito")
    const totalCompra = document.getElementById("total-carrito")
    const finalizarCompraBtn = document.getElementById("finalizar-compra")

    contenedorCarrito.innerHTML = "";
    carrito.forEach(elm => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <h3>${elm.nombre}</h3>
            <p>Precio: $${elm.precio}</p>
            <p>Cantidad: ${elm.cantidad}</p>
            <button id="borrar${elm.id}">Borrar</button>
        `;
        contenedorCarrito.appendChild(div)

        
        // Evento para borrar productos del carrito
        const botonBorrar = div.querySelector(`#borrar${elm.id}`);
        botonBorrar.addEventListener("click", () => {
            eliminarProductoCarrito(elm.id);
        });

    });
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    totalCompra.innerText = `Total: $${total}`; 

    finalizarCompraBtn.style.display = carrito.length > 0 ? 'block' : 'none';
};

const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito")
    if(carritoGuardado){
        carrito = JSON.parse(carritoGuardado)
        actualizarCarrito()
    }
}
// Funcion para eliminar un juego del carrito
const eliminarProductoCarrito = (id) => {
    carrito = carrito.filter(producto => producto.id !== id)
    actualizarCarrito()
}
// Iniciar la aplicación
const inicializar = async () => {
    await cargarProductos()
    cargarCarritoDesdeLocalStorage()

    // Vincular el botón de finalizar compra si existe en la página actual
    const finalizarCompraBtn = document.getElementById("finalizar-compra");
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener("click", finalizarCompra);
    }
};

const finalizarCompra = () => {
    Swal.fire({
        title: 'Finalizar Compra',
        html: `
            <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
            <input type="text" id="apellido" class="swal2-input" placeholder="Apellido">
            <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico">
        `,
        confirmButtonText: 'Enviar',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const email = document.getElementById('email').value;

            if (!nombre || !apellido || !email) {
                Swal.showValidationMessage('Por favor, completa todos los campos');
                return false;
            }

            return { nombre, apellido, email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombre, apellido, email } = result.value;
            
            Swal.fire(
                'Compra Finalizada',
                `Gracias ${nombre} :), recibirás los juegos comprados en ${email}. Que los disfrutes!`,
                'success'
            );

            // Vaciar el carrito después de finalizar la compra
            carrito = [];
            localStorage.removeItem("carrito");
            actualizarCarrito();
        }
    });
};


// Iniciar la aplicación
inicializar();
