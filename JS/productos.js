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
  const buzoEntrenamiento = new Prenda(3, "Buzo de entrenamiento", 20000, "img/buzoEntrenamiento.png");
  const buzoLiso = new Prenda(4, "Buzo liso", 18000, "img/buzoLiso.png");
  const camisetaSuplente = new Prenda(5, "Camiseta suplente", 22000, "img/camisetaSuplente.png");
  const camisetaTitular = new Prenda(6, "Camiseta titular", 22000, "img/camisetaTitular.png");
  const camperaEntrenamiento = new Prenda(7, "Campera entrenamiento", 17000, "img/camperaEntrenamiento.png");
  const camperaSalida = new Prenda(8, "Campera salida", 15000, "img/camperaSalida.png");
  const camperonAzul = new Prenda(9, "Camperon azul", 40000, "img/camperonAzul.png");
  const camperonNegro = new Prenda(10, "Camperon negro", 42000, "img/camperonNegro.png");
  const musculosaAzul = new Prenda(11, "Musculosa azul", 15000, "img/musculosaAzul.png");
  const musculosaRoja = new Prenda(12, "Musculosa roja", 15000, "img/musculosaRoja.png");
  const pantalonLargo = new Prenda(13, "Pantalon largo", 19000, "img/pantalonLargo.png");
  const remeraEntrenamiento = new Prenda(14, "Remera entrenamiento", 11000, "img/remeraEntrenamiento.png");
  const remeraPreMatch = new Prenda(15, "Remera prematch", 13000, "img/remeraPreMatch.png");
  const rompevientoAzul = new Prenda(16, "Rompeviento azul", 28000, "img/rompevientoAzul.png");
  