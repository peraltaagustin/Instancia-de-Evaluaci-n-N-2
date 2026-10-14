const catalogoDeProductos = [
    { identificador: 1, nombreProducto: "pantalon", precioUnitario: 35000.82, stockDisponible: 5 },
    { identificador: 2, nombreProducto: "campera", precioUnitario: 45000.30, stockDisponible: 10 },
    { identificador: 3, nombreProducto: "buzo", precioUnitario: 86000.99, stockDisponible: 15 },
    { identificador: 4, nombreProducto: "medias", precioUnitario: 3500.36, stockDisponible: 8 },
    { identificador: 5, nombreProducto: "zapatillas", precioUnitario: 280000.78, stockDisponible: 3 },
    { identificador: 6, nombreProducto: "gorras", precioUnitario: 22000, stockDisponible: 53 },
    { identificador: 7, nombreProducto: "camisas", precioUnitario: 70000, stockDisponible: 1 },
    { identificador: 8, nombreProducto: "pantuflas", precioUnitario: 50000.78, stockDisponible: 8 }
];

const carrito = [];



// opcion 7
function quitarUltimoProducto() {
    if (carrito.length === 0) { //comienzo comparando con el carrito a cero para ver si esta vacio
        alert("el carrito se encuentra vacio");
    } else {
        //y uso .pop que saca siempre el elemento que esta en la ultima posicion
        let quitado = carrito.pop(); //agrego una nueva variable para que ademas de eliminar el ultimo producto me lo guarde asi lo puedo mostrar
        alert("se elimino el ultimo producto: " + quitado.nombre);
    }
}

// opcicon 8
function quitarPrimerProducto() {
    if (carrito.length === 0) {//repito el mismo proceso de la opcion 7 para verificar el carrito
        alert("el carrito se encuentra vacio vacio");
    } else {
        // y aca en vez de del .pop uso .shift que saca siempre el elemento que esta en la primera posicion
        let quitado = carrito.shift(); //igual creo la variable para poder mostrar el producto eliminado
        alert("se elimino el primer producto: " + quitado.nombre);
    }
}

// opcion 9
function buscarPorNombre() {
    // aca uso el .trim porque limpia los espacios extra y lo junto con .toLowerCase ya que lo pasa a minuscula y asi no fallen las busquedas
    let palabra = prompt("ingrese el nombre del producto:").trim().toLowerCase();
    
    let coincidencia = catalogoDeProductos.find(function(producto) { //armo la variable pra que al utilizar .find busque el producto y me lo  guarde
        return producto.nombreProducto.toLowerCase() === palabra;// aca me devuelve el producto que va a ser buscado por el nombre solo si coincide con lo ingresado
    });

    if (coincidencia !== undefined) { //si no hay coincidencia me devuelve undefined
        alert("se encontro el producto " + coincidencia.nombreProducto.toUpperCase() + " y cuesta $" + coincidencia.precioUnitario);
    } else {//use .toUpperCase para que me pase la palabra del producto a mayusculas
        alert("No se encontraron productos con ese nombre.");
    }
}

// opcion 10
function filtrarPorPrecio() {
    let precioMaximo = Number(prompt("ingrese el precio maximo que desea gastar"));
    
    // filtro todos los productos que cumplen con la condicion
    let productoFiltrados = catalogoDeProductos.filter(function(producto) {
        return producto.precioUnitario <= precioMaximo; //me va a devolver todos los productos que esten por debajo del precioMaximo
    });

    // uso .map para sacar solo los nombres de los productos filtrados
    let listaNombres = productoFiltrados.map(function(producto) {
        return producto.nombreProducto;
    });

    if (listaNombres.length > 0) { //entonces si la cantidad de productos es mayor a cero muestro cuales son
        let texto = "productos encontrados:\n";// armo un contaador para que el ciclo for se recorra la misma cantidade de veces como productos agregados
        for (let i = 0; i < listaNombres.length; i++) { 
            texto = texto + "- " + listaNombres[i] + "\n";
        }
        alert(texto);
    } else {
        alert("No hay productos menores a esa cantidad seleccionada");
    }
}

// opcion 11
function ordenarProductos() {
    // primero utilizo el spread (...) para armar la copia del array y no desordenar la  original
    let catalogoCopia = [...catalogoDeProductos];
    
    catalogoCopia.sort(function(a, b) { //para que esta copia este ordenada use el .sort pero me ordenaba mal asi que le tuve que dar dos productos o valores oara que compare
        return a.precioUnitario - b.precioUnitario;
    });

    let texto = "productos ordenados de menor a mayor precio \n";
    catalogoCopia.forEach(function(producto) { //recorro el nuevo catalogo y coloco los productos con el .forHech
        texto = texto + producto.nombreProducto + " a $" + producto.precioUnitario + "\n";
    });
    alert(texto);
}

// opcion 12
function mostrarPagina() {
    // aca tuve que usar .slice para recorta una porcion  del catálogo y en este caso para mostrar los 5 primeros productos
    let paginaUno = catalogoDeProductos.slice(0, 5);
    
    let texto = "pagina 1 (primeros 5 productos)\n";
    paginaUno.forEach(function(producto) { //y el .forHeach para devolverlos
        texto = texto + producto.nombreProducto + "\n";
    });
    alert(texto);
}

// opcion 13
function validarCarrito() {
    if (carrito.length === 0) { //primero verifico si esta el carrito vacio
        alert(" el carrito esta vaciio");
    } else {
        // y si el carrito contiene algo verifico que la cantidad sea mayor a cero
        let todosTienenCantidad = carrito.every(function(item) { //para verificar todos los productos uno ppor uno use el .every, porque verifica todos sin saltear nada
            return item.cantidad > 0;
        });

        alert("resultados de la validacion:\n todos los productos cuentan con el stock " + todosTienenCantidad );
    }
}

// opcion 14
function calcularTotal() {
    // para poder sumar todos los precios use .reduce porque funciona como un contenedor que va acumulando la suma de todo
    let sumaTotal = carrito.reduce(function(acumulador, item) {
        return acumulador + (item.precio * item.cantidad);//y aca esta la multiplicacion de cada producto, su cantidad mas el precio de cada uno
    }, 0);

    alert("el importe final a pagar es: $" + sumaTotal.toFixed(2));
}

let opcion = "";

while (opcion !== "15") {
    let menu = "CARRITO DE COMPRAS - VERSIÓN 3\n";
    menu = menu + "1- Mostrar productos\n";
    menu = menu + "2- Agregar producto\n";
    menu = menu + "3- Agregar producto al inicio\n";
    menu = menu + "4- Mostrar carrito\n";
    menu = menu + "5- Modificar cantidad\n";
    menu = menu + "6- Eliminar producto\n";
    menu = menu + "7- Quitar último producto\n";
    menu = menu + "8- Quitar primer producto\n";
    menu = menu + "9- Buscar producto por nombre\n";
    menu = menu + "10- Filtrar productos por precio\n";
    menu = menu + "11- Ordenar productos\n";
    menu = menu + "12- Mostrar página del catálogo\n";
    menu = menu + "13- Validar carrito\n";
    menu = menu + "14- Calcular total\n";
    menu = menu + "15- Salir\n\n";
    menu = menu + "Ingrese una opción:";

    opcion = prompt(menu);

    // aca modifica el if por un else if asi pones las opciones que van antes
 
     if (opcion === "7") {
        quitarDeLosExtremos(true);
    } else if (opcion === "8") {
        quitarDeLosExtremos(false);
    } else if (opcion === "9") {
        buscarPorNombre();
    } else if (opcion === "10") {
        filtrarPorPrecio();
    } else if (opcion === "11") {
        ordenarProductos();
    } else if (opcion === "12") {
        mostrarPagina();
    } else if (opcion === "13") {
        validarCarrito();
    } else if (opcion === "14") {
        calcularTotal();
    } else if (opcion === "15") {
        alert("fin del sistema");
    } else {
        alert("opcion no valida. Intente nuevamente colocando el numero de la opcion que corresponda");
    }
}