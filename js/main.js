// Variables de DOM
const contenedorJuegosPS = document.getElementById("container-juegos")
let carrito = [];
let stockProductos = [];

// Función para cargar el JSON
const cargarProductos = async () => {
    try {
        const response = await fetch('https://api.rawg.io/api/games?key=813d0e66897a43d38fa21366c47589a4&platforms=187&page_size=50'); 
        
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        stockProductos = data.results.map(game => ({
            id: game.id,
            nombre: game.name,
            img: game.background_image,
            precio: precios[game.name]  ||  12000

        }))

        mostrarJuegos(); 
    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
    }
};

// Función para mostrar los juegos en el DOM
const mostrarJuegos = () => {
    
    contenedorJuegosPS.innerHTML = ""

    stockProductos.forEach(elm => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${elm.img}" alt="${elm.nombre}">
            <h3>${elm.nombre}</h3>
            <p>Precio: $${elm.precio}</p>
            <hr>
            <button id="agregar${elm.id}">AGREGAR AL CARRITO</button>
        `;
        contenedorJuegosPS.appendChild(div); 

        // Evento para agregar al carrito
        const boton = document.getElementById(`agregar${elm.id}`);
        boton.addEventListener("click", () => {        
            agregarCarrito(elm.id);
        
            Toastify({
                text: `Agregado ${elm.nombre} al carrito.`,
                duration: 2000,
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
        productoEnCarrito.cantidad += 1; 
    } else {
        carrito.push({ ...productoAgregado, cantidad: 1 }); 
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarContadorCarrito(); 
};

// Funcion para ir actualizando los juegos agregados al carrito
const actualizarCarrito = () => {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const totalCompra = document.getElementById("total-carrito");
    const finalizarCompraBtn = document.getElementById("finalizar-compra");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

    console.log('Contenido del carrito:', carrito); // Verifica el contenido del carrito

    contenedorCarrito.innerHTML = "";
    carrito.forEach(elm => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <h3>${elm.nombre}</h3>
            <img src="${elm.img}" alt="${elm.nombre}">
            <p>Precio: $${elm.precio}</p>
            <p>Cantidad: ${elm.cantidad}</p>
            <button id="borrar${elm.id}">Borrar</button>
        `;
        contenedorCarrito.appendChild(div);

        // Evento para borrar productos del carrito
        const botonBorrar = div.querySelector(`#borrar${elm.id}`);
        botonBorrar.addEventListener("click", () => {
            eliminarProductoCarrito(elm.id);
        });
    });

    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    totalCompra.innerText = `Total: $${total}`;

    finalizarCompraBtn.style.display = carrito.length > 0 ? 'block' : 'none';
    vaciarCarritoBtn.style.display = carrito.length > 0 ? 'block' : 'none';
};

// Funcion para actualizar el contador del carrito
const actualizarContadorCarrito = () => {
    const contadorCarrito = document.getElementById("contador-carrito")
    if(contadorCarrito){
        contadorCarrito.innerText = carrito.length
    }
}

const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito")
    if(carritoGuardado){
        carrito = JSON.parse(carritoGuardado)
        console.log('Carrito cargado desde localStorage:', carrito); // Verifica el contenido del carrito
         // Verifica si estás en la página del carrito antes de llamar a actualizarCarrito
         if (document.getElementById("contenedor-carrito")) {
            actualizarCarrito()
        }
        actualizarContadorCarrito()
    }
    
}

// Funcion para eliminar un juego del carrito
const eliminarProductoCarrito = (id) => {
    carrito = carrito.filter(producto => producto.id !== id)
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el localStorage después de eliminar
    actualizarCarrito()
    actualizarContadorCarrito()
}

// Funcion para vaciar carrito

const vaciarCarrito = () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción vaciará todo el carrito y no podrá deshacerse.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            localStorage.removeItem("carrito");
            actualizarCarrito();
            Swal.fire(
                '¡Carrito vacío!',
                'Todos los elementos han sido eliminados.',
                'success'
            );
        }
    });
    actualizarContadorCarrito()
};


// Iniciar la aplicación
const inicializar = async () => {
    if (document.getElementById("container-juegos")) {
        await cargarProductos();
        mostrarJuegos();
    }
    // Verifica si estás en la página carrito.html antes de llamar a cargarCarritoDesdeLocalStorage y actualizarCarrito
    if (document.getElementById("contenedor-carrito")) {
        cargarCarritoDesdeLocalStorage();
        actualizarCarrito();
    }else{
        cargarCarritoDesdeLocalStorage(); // Asegúrate de llamar a esta función en index.html también

    }

    // Vincular el botón de finalizar compra si existe en la página actual
    const finalizarCompraBtn = document.getElementById("finalizar-compra");
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener("click", finalizarCompra);
    }

    // Vincular el botón de vaciar carrito si existe en la página actual
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
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

inicializar()
