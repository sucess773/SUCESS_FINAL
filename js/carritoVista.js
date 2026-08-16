// ==================================
// SUCESS - CARRITO VISTA JS 2.0
// ==================================


document.addEventListener(
"DOMContentLoaded",
()=>{
    
    mostrarVistaCarrito();
    actualizarContador();

});





// OBTENER CARRITO

function obtenerCarrito(){

    return JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

}







// MOSTRAR CARRITO

function mostrarVistaCarrito(){


    const lista =
    document.getElementById(
        "lista-carrito"
    );


    if(!lista) return;



    const carrito = obtenerCarrito();



    lista.innerHTML="";




    if(carrito.length===0){

lista.innerHTML = `

<div class="carrito-vacio">

    <div class="icono-vacio">
        🛒
    </div>

    <h2>
        Tu carrito está vacío
    </h2>

    <p>
        Agrega tus figuritas favoritas.
    </p>

    <a href="catalogo.html" class="btn-seguir">
        Ver catálogo
    </a>

</div>

`;


        actualizarResumen();

        return;

    }





    carrito.forEach(producto=>{


        lista.innerHTML += `


        <article class="item-carrito">


            <img src="${producto.imagen}">


            <div class="info-carrito">


                <h3>
                ${producto.nombre}
                </h3>


                <p>
                ${producto.pais}
                </p>


                <p class="precio-carrito">
                S/ ${producto.precio.toFixed(2)}
                </p>



                <div class="cantidad">


                    <button onclick="cambiarCantidad(${producto.id},-1)">
                    -
                    </button>



                    <span>
                    ${producto.cantidad}
                    </span>



                    <button onclick="cambiarCantidad(${producto.id},1)">
                    +
                    </button>


                </div>


            </div>





            <div class="subtotal">


            S/ ${(producto.precio * producto.cantidad).toFixed(2)}


            </div>





            <button 
            class="eliminar"
            onclick="eliminarProducto(${producto.id})">

            🗑️

            </button>



        </article>


        `;


    });




    actualizarResumen();


}







// CAMBIAR CANTIDAD


function cambiarCantidad(id,cambio){


    let carrito = obtenerCarrito();



    const producto =
    carrito.find(
        p=>p.id===id
    );



    if(producto){


        producto.cantidad += cambio;


        if(producto.cantidad<=0){


            carrito =
            carrito.filter(
                p=>p.id!==id
            );


        }


    }



    guardarCarrito(carrito);


}








// ELIMINAR


function eliminarProducto(id){


    let carrito =
    obtenerCarrito();



    carrito =
    carrito.filter(
        p=>p.id!==id
    );



    guardarCarrito(carrito);


}








// GUARDAR


function guardarCarrito(carrito){


    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );



    mostrarVistaCarrito();

    actualizarContador();


}








// RESUMEN


function actualizarResumen(){


    const carrito =
    obtenerCarrito();



    const cantidad =
    carrito.reduce(
        (total,p)=>total+p.cantidad,
        0
    );



    const total =
    carrito.reduce(
        (total,p)=>
        total+(p.precio*p.cantidad),
        0
    );




    const cantidadHTML =
    document.getElementById(
        "cantidad-carrito"
    );



    const totalHTML =
    document.getElementById(
        "subtotal"
    );



    if(cantidadHTML){

        cantidadHTML.textContent=cantidad;

    }



    if(totalHTML){

        totalHTML.textContent=
        "S/ "+total.toFixed(2);

    }


}








// CONTADOR MENU


function actualizarContador(){


    const contador =
    document.getElementById(
        "contador-carrito"
    );



    if(!contador) return;



    const carrito =
    obtenerCarrito();



    const cantidad =
    carrito.reduce(
        (total,p)=>total+p.cantidad,
        0
    );



    contador.textContent=cantidad;


}