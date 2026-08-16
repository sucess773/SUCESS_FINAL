
// ==================================
// SUCESS - FAVORITOS JS
// ==================================


const listaFavoritos = document.getElementById(
"lista-favoritos"
);



document.addEventListener(
"DOMContentLoaded",
cargarFavoritos
);



function cargarFavoritos(){


    const productos = JSON.parse(
        localStorage.getItem("productos")
    ) || [];



    const favoritos = productos.filter(
        producto => producto.favorito === true
    );



    mostrarFavoritos(favoritos);


}




function mostrarFavoritos(productos){


    listaFavoritos.innerHTML="";



    if(productos.length === 0){


        listaFavoritos.innerHTML=`

        <div class="sin-favoritos">

            <h2>
            ❤️ No tienes favoritos
            </h2>

            <p>
            Agrega tus figuritas favoritas desde el catálogo.
            </p>

        </div>

        `;


        return;

    }






    productos.forEach(producto=>{


        const card=document.createElement("div");


        card.className="producto-card";



        card.innerHTML=`

        <button class="favorito-btn">
        💛
        </button>


        <img src="${producto.imagen}"
        alt="${producto.nombre}">



        <div class="producto-info">


        <h3>
        ${producto.nombre}
        </h3>



        <p>
        🌎 ${producto.pais}
        </p>


        <p>
        ⚽ ${producto.categoria}
        </p>


        <p>
        💎 ${producto.rareza}
        </p>



        <div class="precio">

        S/ ${producto.precio.toFixed(2)}

        </div>



        <button class="btn-carrito">

        🛒 Agregar

        </button>



        </div>

        `;




        card.querySelector(".btn-carrito")
        .addEventListener("click",()=>{


            agregarAlCarrito(producto);


        });





        card.querySelector(".favorito-btn")
        .addEventListener("click",()=>{


            producto.favorito=false;



            actualizarProducto(producto.id);



            cargarFavoritos();


        });





        listaFavoritos.appendChild(card);



    });



}





function actualizarProducto(id){


    let productos = JSON.parse(
        localStorage.getItem("productos")
    );


    productos = productos.map(p=>{


        if(p.id===id){

            p.favorito=false;

        }


        return p;


    });



    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );


}