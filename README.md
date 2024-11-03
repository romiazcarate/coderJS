# Back2PS - Tienda de Videojuegos 

## Descripción
Back2PS es una aplicación web interactiva diseñada para la compra de videojuegos digitales. Los usuarios pueden explorar una lista de juegos, agregarlos a su carrito de compras y finalizar su compra de manera sencilla. La aplicación hace uso de tecnologías modernas de JavaScript, HTML, CSS y librerías de terceros para brindar una experiencia de usuario dinámica y amigable.

## Funcionalidades principales
- **Exploración de Juegos**: Muestra una lista de juegos obtenidos mediante una API, con detalles como nombre, imagen y precio.
- **Carrito de Compras**: Permite a los usuarios agregar juegos al carrito, ver el contenido del mismo, actualizar cantidades y eliminar juegos.
- **Persistencia del Carrito**: El estado del carrito se guarda en el almacenamiento local del navegador para mantener la información en caso de que el usuario cierre o recargue la página.
- **Finalización de Compra**: Los usuarios pueden completar su compra ingresando sus datos personales y recibiendo una notificación de confirmación mediante un modal interactivo.
- **Interactividad Mejorada**: Se utilizan las librerías `Toastify.js` y `SweetAlert2` para notificaciones y modales, mejorando la interacción y la experiencia del usuario.
- **Respaldo de Precios**: Los precios de los juegos están definidos en un archivo externo (`precios.js`) y se utilizan de forma predeterminada o desde la API.

## Estructura de Archivos
- **index.html**: Página principal que muestra el catálogo de juegos y permite agregar productos al carrito.
- **carrito.html**: Página donde se visualiza el contenido del carrito, se muestra el total de la compra y se permite finalizar la transacción.
- **main.js**: Archivo JavaScript que gestiona la lógica de carga de productos, interacción con el DOM, y manejo del carrito de compras.
- **precios.js**: Archivo JavaScript que contiene un objeto con precios manuales para ciertos juegos.

## Tecnologías utilizadas
- **HTML5 y CSS3**: Para la estructura y el diseño visual de la aplicación.
- **JavaScript (ES6)**: Para la funcionalidad y la lógica del proyecto.
- **API externa**: Se consume una API de juegos para obtener datos actualizados de los productos.
- **Local Storage**: Para la persistencia del carrito de compras entre sesiones.
- **Librerías**:
  - [Toastify.js](https://github.com/apvarun/toastify-js): Notificaciones de adición de productos al carrito.
  - [SweetAlert2](https://sweetalert2.github.io/): Modales interactivos para confirmación de acciones.

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/romiazcarate/tcoderJS.git
