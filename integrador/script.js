$(document).ready(function () {
  const carritoBtn = $('#carritoBtn');
  const listaCarrito = $('#listaCarrito');
  const API_URL = 'https://659385cc1493b0116068a501.mockapi.io/api/v1/Integrador';

  let carrito = [];
  let cantidadTotal = 0;

  carritoBtn.click(function () {
    listaCarrito.empty();

    let modalContent = '<h2 class="titulo-modal"><br>Detalles del carrito</h2><ul class="lista-productos">';

    carrito.forEach(producto => {
      const subtotal = producto.precio * producto.cantidad;
      modalContent += `
          <li class="producto-carrito">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 1000px; height: 500px;">
            <div class="info-producto">
              <p class="nombre-producto">${producto.nombre}</p>
              <p class="precio-producto">Precio: $${producto.precio}</p>
              <p class="cantidad-producto">Cantidad: ${producto.cantidad}</p>
              <p class="subtotal-producto">Subtotal: $${subtotal.toFixed(2)}</p><br><br>
            </div>
          </li>
        `;
    });

    modalContent += '</ul><p class="total-carrito">Total del carrito: $' + calcularTotal(carrito).toFixed(2) + '</p>';
    modalContent += '<button id="cerrarModal" class="cerrar-modal">Cerrar</button>';
    modalContent += '<button id="enviarPedido" class="enviar-pedido">Enviar Pedido</button>';

    const nuevaVentana = window.open('', '_blank');
    nuevaVentana.document.write(`
        <html>
          <head>
            <link rel="stylesheet" href="styles.css">
          </head>
          <body>
            <div class="modal-carrito">${modalContent}</div>
          </body>
        </html>
      `);

    nuevaVentana.document.getElementById('enviarPedido').onclick = function () {
      enviarPedido(carrito);
      carrito = []; // Vaciar el carrito después de enviar el pedido
      cantidadTotal = 0;
      carritoBtn.text(`Carrito (${cantidadTotal})`);
      nuevaVentana.close();
    };

    nuevaVentana.document.getElementById('cerrarModal').onclick = function () {
      nuevaVentana.close();
    };
  });

  $('.comprar1, .comprar2, .comprar3, .comprar4, .comprar5, .comprar6').click(function () {
    const boton = $(this);
    const nombre = boton.siblings('h3').text();
    const imagen = boton.siblings('img').attr('src');
    const precio = parseFloat(boton.siblings('.precio').text().replace('$', ''));

    const indice = carrito.findIndex(producto => producto.nombre === nombre);

    if (indice !== -1) {
      carrito[indice].cantidad++;
    } else {
      carrito.push({ nombre, imagen, precio, cantidad: 1 });
    }

    cantidadTotal++;
    carritoBtn.text(`Carrito (${cantidadTotal})`);
  });

  function calcularTotal(productos) {
    return productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  }

  function enviarPedido(pedido) {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productos: pedido }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Pedido enviado:', data);
        alert('¡Pedido enviado con éxito!');
      })
      .catch(error => {
        console.error('Error al enviar el pedido:', error);
        alert('Hubo un error al enviar el pedido. Por favor, inténtalo de nuevo.');
      });
  }
});  
  
  
  