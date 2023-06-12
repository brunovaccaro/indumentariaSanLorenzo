
// CREO EL ARRAY DE PRODUCTOS VACIO PARA QUE EL USUARIO VAYA AGREGANDO ALLÍ LOS QUE DESEE
let carrito = [];

// CREACION DE ALGUNAS CONSTANTES QUE UTILIZARE EN LAS FUNCIONES
const cajaProductos = document.querySelector("#cajaProductos");
const mostrarCarrito = document.querySelector("#mostrarCarrito");
const cajaCarrito = document.querySelector("#cajaCarrito");
const montoTotalDelCarrito = document.querySelector("#montoTotalDelCarrito");
const modalContainer = document.querySelector("#modalContainer");

// SI HAY PRODUCTOS ALMACENADOS EN EL LOCAL STORAGE, LOS MUESTRO EN EL CARRITO, PARA QUE NO SE ELIMINEN CUANDO EL USUARIO CIERRA EL SITIO
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

// CREO LA FUNCION QUE MOSTRARÁ LOS PRODUCTOS EN LA PAGINA
const mostrarProductos = () => {
  // A TRAVES DE FETCH TRAIGO EL LISTADO DE PRODUCTOS DESDE UN ARCHIVO LOCAL .JSON Y LUEGO ITERO SOBRE LOS MISMOS 
  fetch("./productos.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("col-xl-3", "col-md-6", "col-xs-12", "estiloTarjeta");

        // LUEGO, A TRAVES DEL DOM, CREO POR CADA UNO DE ESOS PRODUCTOS UNA TARJETA QUE SE UBICA EN LAS COLUMNAS CREADAS, DE MANERA QUE SI AGREGO O ELIMINO PRODUCTOS, AUTOMATICAMENTE SE ACTUALICE SIN NECESIDAD DE MODIFICAR EL HTML Y CSS, NI TAMPOCO EL JS (EXCEPTO POR EL AGREGADO POTENCIAL DE ALGUN PRODUCTO AL ARRAY DE PRODUCTOS)
        // PARA ELLO UTILIZO PLANTILLAS LITERALES HACIENDO MENCION DE CADA OBJETO Y SU PROPIEDAD SEGUN NECESIDAD, OPITIMIZANDO A FUTURO LA EXTENSION DEL CODIGO
        tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.descripcion}" class="imagenProducto">
                <div class="cardText">
                    <h4 class="text-uppercase descripcionProducto fs-5">${producto.descripcion}</h4>
                    <p class="precio">Precio: $${producto.precio}</p>
                    <button class="botonEstilizado" id="boton${producto.id}">Agregar al carrito <i class="fas fa-shopping-cart"></i></button>
                </div>
                `
        // A CONTINUACION, LE INDICO AL HTML DONDE SE VA A UBICAR ESE CONTENEDOR QUE CREE EN LA LINEA 52, QUE ES DENTRO DEL OTRO CONTENEDOR PRINCIPAL
        cajaProductos.append(tarjeta)
        
        // RELACIONO POR MEDIO DE UNA CONSTANTE LOCAL, EL BOTON DINAMICO PARA AGREGAR AL CARRITO CADA PRODUCTO
        const boton = document.querySelector(`#boton${producto.id}`);
        boton.addEventListener("click", () => {
          Toastify({
            text: "AGREGADO AL CARRITO",
            duration: 2000,
            close: false,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to bottom right, rgb(50, 0, 12), rgb(59, 56, 56))",
              borderRadius: "15px",
            },
            onClick: function () { } 
          }).showToast();
          agregarAlCarrito(producto.id);
        })
      })
    })
}

// INVOCO LA FUNCION PREVIA
mostrarProductos()

// AHORA CREO LA FUNCION PARA AGREGAR AL CARRITO LOS PRODUCTOS DESEADOS
const agregarAlCarrito = (id) => {
  fetch("./productos.json")
      .then((res) => res.json())
      .then((productos) => {
        // POR MEDIO DEL METODO FIND BUSCO SI EL PRODUCTO SELECCIONADO YA SE ENCUENTRA EN EL CARRITO O NO, PARA EVITAR LA DOBLE CARGA DEL MISMO, YA QUE EN CASO DE REPETIRSE, QUIERO QUE MUESTRE UN INCREMENTO EN SU CANTIDAD, PERO NO UNA DUPLICACION DE TARJETA. SI NO ESTA REPETIDO, ENTONCES SI LO AGREGO AL MISMO
        const productoEnCarrito = carrito.find(producto => producto.id === id);
        if (productoEnCarrito) {
          productoEnCarrito.cantidad++;
        } else {
          const producto = productos.find(producto => producto.id === id)
          carrito.push(producto);
        }
        
        // GUARDO TODOS LOS ELEMENTOS DEL CARRITO EN EL LOCAL STORAGE
        localStorage.setItem("carrito", JSON.stringify(carrito));
        calcularElTotal();
      })
}

// CREO EL EVENTO EN EL BOTON DE VER EL CARRITO, PARA QUE ESTE LO MUESTRE MEDIANTE LA SIGUIENTE FUNCION QUE VOY A CREAR
mostrarCarrito.addEventListener("click", () => {
  mostrarElCarrito();
})


// CREO LA FUNCION QUE MUESTRA EL CARRITO
const mostrarElCarrito = () => {
  modalContainer.innerHTML = ""; // Limpiamos el contenido del modal
  modalContainer.style.display = "Flex";
  let totalCompra = 0;

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modalHeader");
  modalHeader.innerHTML = `
    <h2 class="modalHeaderTitulo">Carrito</h2>
    <h1 class="ModalHeaderBoton">X</h1>
  `;
  modalContainer.appendChild(modalHeader);

  const cerrarCarrito = document.querySelector(".ModalHeaderBoton");
  cerrarCarrito.addEventListener("click", () => {
    modalContainer.style.display = "none";
  })

  carrito.forEach(producto => {
    const totalPorProducto = producto.precio * producto.cantidad;
    const contenidoCarrito = document.createElement("div");
    contenidoCarrito.classList.add("modalContenido");
    contenidoCarrito.innerHTML = `
      <img src="${producto.imagen}">
      <h3>${producto.descripcion}</h3>
      <p>$${producto.precio}</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <p>Total: $${totalPorProducto}</p>
      <button id="eliminar${producto.id}" class="botonEstilizado">Eliminar Producto</button>
    `;
    modalContainer.appendChild(contenidoCarrito);

    const eliminar = document.querySelector(`#eliminar${producto.id}`);
    eliminar.addEventListener("click", () => {
      Toastify({
        text: "PRODUCTO ELIMINADO",
        duration: 2000,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to bottom right, rgb(106, 106, 114), rgb(75, 38, 38))",
          borderRadius: "15px",
        },
        onClick: function () { } // Callback after click
      }).showToast();
      eliminarProducto(producto.id);
    });

    totalCompra += totalPorProducto;
  });

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modalFooter");
  modalFooter.innerHTML = `<h3 class="modalFooter">El monto total de su compra es de: $${totalCompra}</h3>`;
  modalContainer.appendChild(modalFooter);
};


// FUNCION QUE CALCULA EL TOTAL DE CADA PRODUCTO TENIENDO EN CUENTA SU VALOR Y LA CANTIDAD DE CADA UNO POR MEDIO DE UN METODO FOR EACH PARA ITERAR EN ELLOS Y DECIRLE QUE EL TOTAL SERA EL RESULTADO DEL PRECIO DEL MISMO POR LA CANTIDAD ELEGIDA

const calcularElTotal = () => {
  let totalCompra = 0;
  carrito.forEach(producto => {
    totalCompra += producto.precio * producto.cantidad;
  })
  montoTotalDelCarrito.innerText = totalCompra;
}

// FUNCION PARA ELIMINAR PRODUCTO QUE FUNCIONA CON EL ID DEL PRODUCTO COMO PARAMETRO
const eliminarProducto = (id) => {
  const productoEliminado = carrito.find(producto => producto.id === id);

  // CREO UNA VARIABLE PARA IDENTIFICAR AL PRODUCTO QUE DESEO ELIMINAR POR MEDIO DE SU ID
  let idProducto = carrito.indexOf(productoEliminado);

  // ELIMINO EL PRODCUTO SELECCIONADO METODO SPLICE MEDIANTE
  carrito.splice(idProducto, 1);

  // INVOCO NUEVAMENTE LA FUNCION DE MOSTRAR EL CARRITO
  mostrarElCarrito();

  // UNA VEZ ELIMINADO EL O LOS PRODUCTOS DESEADOS, ACTUALIZO EL CARRITO EN EL LOCAL STORAGE
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// CREO UNA CONSTANTE PARA VACIAR EL CARRITO COMPLETO A TRAVES DE UN BOTON QUE INVOCARA UNA FUNCION DE VACIADO
const vaciarElCarrito = document.querySelector("#vaciarElCarrito");
vaciarElCarrito.addEventListener("click", () => {
  vaciarCarritoCompleto();
});

// LA FUNCION DE VACIADO DEL CARRITO SE EJECUTA A TRAVES DE LA MODIFICACION DEL CONTENIDO DEL ARRAY DEL CARRITO, INGRESANDOLO VACIO
const vaciarCarritoCompleto = () => {
  Swal.fire({
    title: 'Vaciado',
    text: 'Tu carrito está vacío',
    icon: 'success',
    confirmButtonText: 'Aceptar',
    iconColor: 'red'
  })


  carrito = [];

  // UTILIZO EL METODO CLEAR PARA LIMPIAR EL LOCAL STORAGE
  localStorage.clear();

  // NUEVAMENTE MUESTRO EL CARRITO CON LAS MODIFICACIONES
  mostrarElCarrito();
}
