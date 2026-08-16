//==================================
// SUCESS - CATALOGO.JS
//==================================


const contenedor = document.getElementById("contenedor-productos");

const buscar = document.getElementById("buscar");

const filtroPais = document.getElementById("filtroPais");

const filtroCategoria = document.getElementById("filtroCategoria");

const filtroRareza = document.getElementById("filtroRareza");

const ordenar = document.getElementById("ordenar");


let productos = [];



//==================================
// INICIO
//==================================

document.addEventListener("DOMContentLoaded", iniciar);



async function iniciar(){


    const respuesta = await fetch(
        "data/productos.json"
    );


    productos = await respuesta.json();



    const favoritos =
    JSON.parse(
        localStorage.getItem("favoritos")
    ) || [];



    productos = productos.map(p=>({

        ...p,

        favorito:
        favoritos.includes(p.id)

    }));



    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );



    llenarFiltros();


    mostrarProductos(productos);


    eventos();



    if(typeof actualizarContador === "function"){

        actualizarContador();

    }


}



//==================================
// FILTROS
//==================================

function llenarFiltros(){


    llenarCombo(
        filtroPais,
        "Todos los países",
        productos.map(p=>p.pais)
    );


    llenarCombo(
        filtroCategoria,
        "Todas las categorías",
        productos.map(p=>p.categoria)
    );


    llenarCombo(
        filtroRareza,
        "Todas las rarezas",
        productos.map(p=>p.rareza)
    );


}



function llenarCombo(select,texto,datos){


    const valores =
    [...new Set(datos.filter(Boolean))];


    select.innerHTML =
    `<option value="">${texto}</option>`;



    valores.forEach(v=>{


        select.innerHTML +=

        `<option value="${v}">
        ${v}
        </option>`;


    });


}



//==================================
// MOSTRAR PRODUCTOS
//==================================

function mostrarProductos(lista){


    contenedor.innerHTML="";



    lista.forEach(producto=>{


        const card =
        document.createElement("div");



        card.className="producto-card";

        card.style.position="relative";



        card.innerHTML = `

<button class="favorito-btn">
${producto.favorito ? "💛" : "❤️"}
</button>


<a href="producto.html?id=${producto.id}" class="imagen-producto">

<img src="${producto.imagen}" 
alt="${producto.nombre}">

</a>


<div class="producto-info">


<h3>${producto.nombre}</h3>


<p class="codigo">
${producto.codigo}
</p>


<div class="datos-producto">

<p>
🌎 ${producto.pais}
</p>

<p>
⚽ ${producto.categoria}
</p>

<p>
💎 ${producto.rareza}
</p>

</div>



<div class="precio">
S/ ${Number(producto.precio).toFixed(2)}
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


            producto.favorito =
            !producto.favorito;



            localStorage.setItem(
                "productos",
                JSON.stringify(productos)
            );


            mostrarProductos(lista);


        });



        contenedor.appendChild(card);


    });



}



//==================================
// BUSCAR Y FILTRAR
//==================================

function filtrar(){


    let lista=[...productos];



    let texto =
    buscar.value.toLowerCase();



    if(texto){


        lista =
        lista.filter(p=>


        p.nombre.toLowerCase()
        .includes(texto)

        ||

        String(p.codigo)
        .includes(texto)


        );


    }



    if(filtroPais.value){

        lista =
        lista.filter(
        p=>p.pais===filtroPais.value
        );

    }



    if(filtroCategoria.value){

        lista =
        lista.filter(
        p=>p.categoria===filtroCategoria.value
        );

    }



    if(filtroRareza.value){

        lista =
        lista.filter(
        p=>p.rareza===filtroRareza.value
        );

    }




    if(ordenar.value==="nombre"){

        lista.sort(
        (a,b)=>
        a.nombre.localeCompare(b.nombre)
        );

    }



    if(ordenar.value==="precio"){

        lista.sort(
        (a,b)=>
        a.precio-b.precio
        );

    }



    mostrarProductos(lista);


}



//==================================
// EVENTOS
//==================================

function eventos(){


buscar.addEventListener(
"input",
filtrar
);


filtroPais.addEventListener(
"change",
filtrar
);


filtroCategoria.addEventListener(
"change",
filtrar
);


filtroRareza.addEventListener(
"change",
filtrar
);


ordenar.addEventListener(
"change",
filtrar
);


}