// Juegos disponibles y sus precios
const juegos = [
    { nombre: 'Resident Evil 2', precio: 100 },
    { nombre: 'Metal Gear Solid', precio: 80 },
    { nombre: 'Crash Bandicoot', precio: 50 },
    { nombre: 'Dino Crisis', precio: 50 },
    { nombre: 'Castlevania', precio: 40 }
];

let totalCompra = 0;

// Función para calcular el total de la compra
function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}

// funcion para mostrar el total de la compra
function mostrarTotalCompra(){
    alert(`El total de tu compra es: $${totalCompra}. Gracias por tu compra!`);
}

// Bucle para que el usuario seleccione juegos
while (true) {
    let juegoElegido = parseInt(prompt(`Buenos días usuario, ¿qué juego desea comprar?\n\n- Si quiere Resident Evil 2, ingrese = 1 \n- Si quiere Metal Gear Solid, ingrese = 2 \n- Si quiere Crash Bandicoot, ingrese = 3 \n- Si quiere Dino Crisis, ingrese = 4 \n- Si quiere Castlevania, ingrese = 5 \n- Si no quiere ningún juego de la lista, o finalizar el pedido, ingrese = 0`));

    if (juegoElegido === 0) {
        break; // Salimos del bucle si elige 0
    }

    if (juegoElegido >= 1 && juegoElegido <= 5) {
        let juegoSeleccionado = juegos[juegoElegido - 1]; // Obtener el juego seleccionado, restando uno ya que el array arranca en 0
        let cantidad = parseInt(prompt(`¿Cuántas copias de ${juegoSeleccionado.nombre} desea comprar?`), 10);
        
        if (cantidad > 0) {
            totalCompra = totalCompra + calcularTotal(juegoSeleccionado.precio, cantidad); // Usar la función para sumar el precio total
            alert(`Has agregado ${cantidad} copia(s) de ${juegoSeleccionado.nombre}. Precio total hasta ahora: $${totalCompra}`);
        } else {
            alert("Por favor, ingresa una cantidad válida.");
        }
    } else {
        alert("Selección no válida, por favor intenta nuevamente.");
    }
}

// Mostrar el total de la compra
mostrarTotalCompra();