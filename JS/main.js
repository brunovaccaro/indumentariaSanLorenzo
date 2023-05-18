// CREO LA CLASE CONSTRUCTORA DE OBJETOS
class Prenda {
  constructor(id, descripcion, precio, imagen) {
    this.id = id;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = 1;
  }
}

// CREO EL LISTADO DE PRODUCTOS
const buzoArqueroNaranja = new Prenda(1, "Buzo arquero naranja", 25000, "img/buzoArqueroNaranja.png");
const buzoArqueroVerde = new Prenda(2, "Buzo arquero verde", 25000, "img/buzoArqueroVerde.png");
const buzoEntrenamiento = new Prenda(3, "Buzo de entrenamiento", 20000, "img/buzoEntrenamiento.jpg");
const buzoLiso = new Prenda(4, "Buzo liso", 18000, "img/buzoLiso.png");
const camisetaSuplente = new Prenda(5, "Camiseta suplente", 22000, "img/camisetaSuplente.jpg");
const camisetaTitular = new Prenda(6, "Camiseta titular", 22000, "img/camisetaTitular.jpg");
const camperaEntrenamiento = new Prenda(7, "Campera entrenamiento", 17000, "img/camperaEntrenamiento.png");
const camperaSalida = new Prenda(8, "Campera salida", 15000, "img/camperaSalida.jpg");
const camperonAzul = new Prenda(9, "Camperon azul", 40000, "img/camperonAzul.png");
const camperonNegro = new Prenda(10, "Camperon negro", 42000, "img/camperonNegro.jpg");
const musculosaAzul = new Prenda(11, "Musculosa azul", 15000, "img/musculosaAzul.png");
const musculosaRoja = new Prenda(12, "Musculosa roja", 15000, "img/musculosaRoja.png");
const pantalonLargo = new Prenda(13, "Pantalon largo", 19000, "img/pantalonLargo.jpg");
const remeraEntrenamiento = new Prenda(14, "Remera entrenamiento", 11000, "img/remeraEntrenamiento.png");
const remeraPreMatch = new Prenda(15, "Remera prematch", 13000, "img/remeraPreMatch.png");
const rompevientoAzul = new Prenda(16, "Rompeviento azul", 28000, "img/rompevientoAzul.png");

// INSERO ESOS PRODUCTOS EN UN ARRAY
const productos = [buzoArqueroNaranja, buzoArqueroVerde, buzoEntrenamiento, buzoLiso, camisetaSuplente, camisetaTitular, camperaEntrenamiento, camperaSalida, camperonAzul, camperonNegro, musculosaAzul, musculosaRoja, pantalonLargo, remeraEntrenamiento, remeraPreMatch, rompevientoAzul];

// CREO EL ARRAY DE PRODUCTOS VACIO PARA QUE EL USUARIO VAYA AGREGANDO ALLÍ LOS QUE DESEE
let carrito = [];

// CREACION DE ALGUNAS CONSTANTES QUE UTILIZARE EN LAS FUNCIONES
const cajaProductos = document.querySelector("#cajaProductos");
const mostrarCarrito = document.querySelector("#mostrarCarrito");
const cajaCarrito = document.querySelector("#cajaCarrito");
const montoTotalDelCarrito = document.querySelector("#montoTotalDelCarrito");

// SI HAY PRODUCTOS ALMACENADOS EN EL LOCAL STORAGE, LOS MUESTRO EN EL CARRITO, PARA QUE NO SE ELIMINEN CUANDO EL USUARIO CIERRA EL SITIO
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

// CREO LA FUNCION QUE MOSTRARÁ LOS PRODUCTOS EN LA PAGINA
const mostrarProductos = () => {

  // ITERO SOBRE LOS PRODUCTOS, Y CREO LAS FILAS Y COLUMNAS UTILIZANDO EL SISTEMA BOOTSTRAP A TRAVES DEL AGREGADO DE CLASES. PREVIAMENTE CREO UN ELEMENTO CONTENEDOR EN EL HTML PARA CADA UNA DE LAS TARJETAS
  productos.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-xl-3", "col-md-6", "col-xs-12");

    // LUEGO, A TRAVES DEL DOM, CREO POR CADA UNO DE ESOS PRODUCTOS UNA TARJETA QUE SE UBICA EN LAS COLUMNAS CREADAS, DE MANERA QUE SI AGREGO O ELIMINO PRODUCTOS, AUTOMATICAMENTE SE ACTUALICE SIN NECESIDAD DE MODIFICAR EL HTML Y CSS, NI TAMPOCO EL JS (EXCEPTO POR EL AGREGADO POTENCIAL DE ALGUN PRODUCTO AL ARRAY DE PRODUCTOS)
    // PARA ELLO UTILIZO PLANTILLAS LITERALES HACIENDO MENCION DE CADA OBJETO Y SU PROPIEDAD SEGUN NECESIDAD, OPITIMIZANDO A FUTURO LA EXTENSION DEL CODIGO
    tarjeta.innerHTML = `
      <div class="card m-2 p-1">
         <img src="${producto.imagen}" alt="${producto.descripcion}" class=" mt-3  imagenProducto">
         <div class="cardText">
             <h4 class="text-uppercase descripcionProducto">${producto.descripcion}</h4>
             <p class="fs-5">Precio: $${producto.precio}</p>
             <button class="btn botonEstilizado" id="boton${producto.id}">Agregar al carrito <i class="fas fa-shopping-cart"></i></button>
         </div>
      </div>`

    // A CONTINUACION, LE INDICO AL HTML DONDE SE VA A UBICAR ESE CONTENEDOR QUE CREE EN LA LINEA 52, QUE ES DENTRO DEL OTRO CONTENEDOR PRINCIPAL
    cajaProductos.appendChild(tarjeta);

    // RELACIONO POR MEDIO DE UNA CONSTANTE LOCAL, EL BOTON DINAMICO PARA AGREGAR AL CARRITO CADA PRODUCTO
    const boton = document.querySelector(`#boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    })
  })
}

// INVOCO LA FUNCION PREVIA
mostrarProductos()

// AHORA CREO LA FUNCION PARA AGREGAR AL CARRITO LOS PRODUCTOS DESEADOS
const agregarAlCarrito = (id) => {
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
}

// CREO EL EVENTO EN EL BOTON DE VER EL CARRITO, PARA QUE ESTE LO MUESTRE MEDIANTE LA SIGUIENTE FUNCION QUE VOY A CREAR
mostrarCarrito.addEventListener("click", () => {
  mostrarElCarrito();
})

// CREO LA FUNCION QUE MUESTRA EL CARRITO
const mostrarElCarrito = () => {

  // ANTES QUE NADA, LE INSERTO UN STRING VACIO PARA QUE CADA VEZ QUE OPRIMA EL BOTON PARA VISUALIRAR EL CARRITO, NO SE MULTIPLIQUE LA VISUALIZACION DEL MISMO SIN SENTIDO
  cajaCarrito.innerHTML = "";

  // ITERO SOBRE LOS PRODUCTOS, IGUAL QUE EN LA FUNCION ANTERIOR, LUEGO CREO UN ELEMENTO MEDIANTE EL DOM QUE CONTENGA CADA UNO DE LOS MISMOS A TRAVES DE BOOTSTRAP
  carrito.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-xl-3", "col-md-6", "col-xs-12");

    // CREO UNA CONSTANTE PARA CALCULAR EL TOTAL DE CADA PRODUCTO SEGUN LA CANTIDAD ELEGIDA DEL MISMO
    const total = producto.precio * producto.cantidad;

    tarjeta.innerHTML = `
      <div class="card m-2 p-1">
         <img src="${producto.imagen}" alt="${producto.descripcion}" class=" mt-3  imagenProducto">
         <div class="cardText">
             <h4 class="text-uppercase descripcionProducto">${producto.descripcion}</h4>
             <p class="fs-5">Precio: $${producto.precio}</p>
             <p class="fs-5">Cantidad: ${producto.cantidad}</p>
             <p class="fs-5 text-uppercase">total: $${total}</p>
             <button class="btn botonEstilizado" id="eliminar${producto.id}">Eliminar Producto</button>
         </div>
      </div>
      `

    // NUEVAMENTE LE INDICO AL CONTENEDOR DE CADA PRODCUTO DONDE DEBE UBICARSE EN EL HTML 
    cajaCarrito.appendChild(tarjeta);

    // CREO UN BOTON PARA ELIMINAR LOS PRODUCTOS, INVOCANDO UNA FUNCION QUE CREARÉ A CONTINUACION
    const eliminar = document.querySelector(`#eliminar${producto.id}`);
    eliminar.addEventListener("click", () => {
      eliminarProducto(producto.id);
    })
  })

  // INVOCO UNA FUNCION PARA CALCULAR EL TOTAL DEL CARRITO QUE CREARÉ MAS ADELANTE
  calcularElTotal();
}

// FUNCION QUE CALCULA EL TOTAL DE CADA PRODUCTO TENIENDO EN CUENTA SU VALOR Y LA CANTIDAD DE CADA UNO POR MEDIO DE UN METODO FOR EACH PARA ITERAR EN ELLOS Y DECIRLE QUE EL TOTAL SERA EL RESULTADO DEL PRECIO DEL MISMO POR LA CANTIDAD ELEGIDA
const calcularElTotal = () => {
  let totalCompra = 0;
  carrito.forEach(producto => {
    totalCompra += producto.precio * producto.cantidad;
  })
  montoTotalDelCarrito.innerHTML = `$${totalCompra}`
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
  carrito = [];

  // UTILIZO EL METODO CLEAR PARA LIMPIAR EL LOCAL STORAGE
  localStorage.clear();

  // NUEVAMENTE MUESTRO EL CARRITO CON LAS MODIFICACIONES
  mostrarElCarrito();
}
