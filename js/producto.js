// ==================================
// SUCESS - PRODUCTO.JS
// ==================================


const detalle =
document.getElementById("detalle-producto");



let productos=[];







document.addEventListener(
"DOMContentLoaded",
cargarProducto
);







async function cargarProducto(){


    try{


        const respuesta =
        await fetch(
        "data/productos.json"
        );


        productos =
        await respuesta.json();




        const parametros =
        new URLSearchParams(
        window.location.search
        );



        const id =
        Number(
        parametros.get("id")
        );




        const producto =
        productos.find(
        p=>p.id===id
        );





        if(producto){


            mostrarProducto(producto);


        }else{


            detalle.innerHTML=`

            <h2>
            Producto no encontrado
            </h2>

            `;


        }



    }catch(error){


        console.log(error);


    }



}








function mostrarProducto(producto){



detalle.innerHTML=`



<div class="producto-imagen">


<img src="${producto.imagen}"

alt="${producto.nombre}">


</div>





<div class="producto-info-detalle">



<h1>

${producto.nombre}

</h1>





<div class="etiquetas-producto">


<span class="etiqueta etiqueta-pais">

🌎 ${producto.pais}

</span>



<span class="etiqueta etiqueta-categoria">

⚽ ${producto.categoria}

</span>



<span class="etiqueta etiqueta-rareza">

💎 ${producto.rareza}

</span>


</div>






<p>

<strong>Código:</strong>

${producto.codigo}

</p>





<p>

<strong>Colección:</strong>

${producto.coleccion}

</p>





<p>

<strong>Equipo:</strong>

${producto.equipo}

</p>





<p>

<strong>Número:</strong>

${producto.numero}

</p>





<p class="stock-producto stock-disponible">

Stock disponible:
${producto.stock}

</p>





<div class="precio-producto">

S/ ${producto.precio.toFixed(2)}

</div>







<div class="botones-producto">



<button 
class="btn-comprar"
onclick="agregarCarritoProducto(${producto.id})">

🛒 Agregar al carrito

</button>



<button 
class="btn-favorito">

❤️

</button>



</div>





</div>


`;



}








// AGREGAR AL CARRITO


function agregarCarritoProducto(id){



const producto =
productos.find(
p=>p.id===id
);



let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];





const existe =
carrito.find(
p=>p.id===id
);





if(existe){


    existe.cantidad++;


}else{


    carrito.push({

        ...producto,

        cantidad:1

    });


}





localStorage.setItem(

"carrito",

JSON.stringify(carrito)

);



alert(
"Producto agregado al carrito"
);



}
