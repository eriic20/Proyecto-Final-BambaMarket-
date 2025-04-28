// Variables principales
const carrito = [];
const listaProductos = document.querySelector('#lista-productos');
const tablaCarrito = document.querySelector('#tabla-carrito tbody');
const botonVaciar = document.querySelector('#boton-vaciar');

// Escuchar clics
listaProductos.addEventListener('click', agregarProducto);
botonVaciar.addEventListener('click', vaciarCarrito);

// Función para agregar productos
function agregarProducto(e) {
    if (e.target.classList.contains('boton-agregar')) {
        const productoSeleccionado = e.target.parentElement;
        const infoProducto = {
            titulo: productoSeleccionado.querySelector('h3').textContent,
            precio: productoSeleccionado.querySelector('.precio').textContent,
            id: e.target.getAttribute('data-id'),
            cantidad: 1
        };

        const existe = carrito.some(producto => producto.id === infoProducto.id);

        if (existe) {
            const productos = carrito.map(producto => {
                if (producto.id === infoProducto.id) {
                    producto.cantidad++;
                    return producto;
                } else {
                    return producto;
                }
            });
            carrito.length = 0;
            carrito.push(...productos);
        } else {
            carrito.push(infoProducto);
        }

        actualizarCarrito();
    }
}

// Función para vaciar carrito
function vaciarCarrito() {
    carrito.length = 0;
    actualizarCarrito();
}

// Función para actualizar carrito
function actualizarCarrito() {
    limpiarHTML();

    carrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><button class="borrar" data-id="${producto.id}">X</button></td>
        `;
        tablaCarrito.appendChild(fila);
    });

    // Botones de eliminar producto
    document.querySelectorAll('.borrar').forEach(boton => {
        boton.addEventListener('click', eliminarProducto);
    });
}

// Función para eliminar producto individual
function eliminarProducto(e) {
    const id = e.target.getAttribute('data-id');
    const indice = carrito.findIndex(producto => producto.id === id);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        actualizarCarrito();
    }
}

// Función para limpiar HTML
function limpiarHTML() {
    tablaCarrito.innerHTML = '';
}