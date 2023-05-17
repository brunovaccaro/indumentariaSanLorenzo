
class Prenda {
  constructor(id, descripcion, precio, imagen) {
    this.id = id;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = 1;
  }
}


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

const productos = [buzoArqueroNaranja, buzoArqueroVerde, buzoEntrenamiento, buzoLiso, camisetaSuplente, camisetaTitular, camperaEntrenamiento, camperaSalida, camperonAzul, camperonNegro, musculosaAzul, musculosaRoja, pantalonLargo, remeraEntrenamiento, remeraPreMatch, rompevientoAzul];

let carrito = [];

const cajaProductos = document.querySelector("#cajaProductos");
const mostrarCarrito = document.querySelector("#mostrarCarrito");
const cajaCarrito = document.querySelector("#cajaCarrito");
const montoTotalDelCarrito = document.querySelector("#montoTotalDelCarrito");


if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}


const mostrarProductos = () => {
  productos.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    tarjeta.innerHTML = `
      <div class="card m-2 p-1">
         <img src="${producto.imagen}" alt="${producto.descripcion}" class=" mt-3  imagenProducto">
         <div class="cardText">
             <h4 class="text-uppercase descripcionProducto">${producto.descripcion}</h4>
             <p class="fs-5">Precio: $${producto.precio}</p>
             <button class="btn botonEstilizado" id="boton${producto.id}">Agregar al carrito <i class="fas fa-shopping-cart"></i></button>
         </div>
      </div>`
    cajaProductos.appendChild(tarjeta);

    const boton = document.querySelector(`#boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    })
  })
}

mostrarProductos()

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find(producto => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = productos.find(producto => producto.id === id)
    carrito.push(producto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularElTotal();
}



mostrarCarrito.addEventListener("click", () => {
  mostrarElCarrito();
})

const mostrarElCarrito = () => {
  cajaCarrito.innerHTML = "";
  carrito.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-xl-3", "col-md-6", "col-xs-12");

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

    cajaCarrito.appendChild(tarjeta);

    const eliminar = document.querySelector(`#eliminar${producto.id}`);
    eliminar.addEventListener("click", () => {
      eliminarProducto(producto.id);
    })
  })
  calcularElTotal();
}

const eliminarProducto = (id) => {
  const productoEliminado = carrito.find(producto => producto.id === id);
  let idProducto = carrito.indexOf(productoEliminado);
  carrito.splice(idProducto, 1);
  mostrarElCarrito();

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarElCarrito = document.querySelector("#vaciarElCarrito");
vaciarElCarrito.addEventListener("click", () => {
  vaciarCarritoCompleto();
});


const vaciarCarritoCompleto = () => {
  carrito = [];
  localStorage.clear();
  mostrarElCarrito();
}


const calcularElTotal = () => {
  let totalCompra = 0;
  carrito.forEach(producto => {
    totalCompra += producto.precio * producto.cantidad;
  })
  montoTotalDelCarrito.innerHTML = `$${totalCompra}`
}