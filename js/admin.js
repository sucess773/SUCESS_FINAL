// ==================================
// SUCESS - CARRITO.JS
// ==================================



let carrito = [];



document.addEventListener(
"DOMContentLoaded",
iniciarCarrito
);







function iniciarCarrito(){


    carrito =
    JSON.parse(
    localStorage.getItem("carrito")
    ) || [];



    mostrarCarrito();


    eventosCarrito();


}







// MOSTRAR CARRITO


function mostrarCarrito(){



const lista =
document.getElementById(
"lista-carrito"
);



if(!lista) return;




lista.innerHTML="";





if(carrito.length===0){



lista.innerHTML=`

<div class="carrito-vacio">


<h2>

🛒 Tu carrito está vacío

</h2>


<p>

Agrega tus figuritas favoritas

</p>


<a href="catalogo.html"
class="btn">

Ver catálogo

</a>


</div>

`;



actualizarResumen();


return;


}







carrito.forEach(producto=>{



const item =
document.createElement("div");



item.className =
"item-carrito";





item.innerHTML=`


<img src="${producto.imagen}"
alt="${producto.nombre}">



<div class="info-carrito">


<h3>

${producto.nombre}

</h3>



<p>

${producto.pais}

</p>



<p>

S/ ${producto.precio.toFixed(2)}

</p>




<div class="cantidad">


<button onclick="restarCantidad(${producto.id})">

-

</button>


<span>

${producto.cantidad}

</span>



<button onclick="sumarCantidad(${producto.id})">

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



`;





lista.appendChild(item);



});





actualizarResumen();



}









// SUMAR


function sumarCantidad(id){



const producto =
carrito.find(
p=>p.id===id
);



producto.cantidad++;



guardar();



}





// RESTAR


function restarCantidad(id){



const producto =
carrito.find(
p=>p.id===id
);



if(producto.cantidad>1){


producto.cantidad--;


}else{


eliminarProducto(id);


return;


}



guardar();



}








// ELIMINAR


function eliminarProducto(id){



carrito =
carrito.filter(
p=>p.id!==id
);



guardar();



}








// GUARDAR


function guardar(){



localStorage.setItem(

"carrito",

JSON.stringify(carrito)

);



mostrarCarrito();



}







// RESUMEN


function actualizarResumen(){



const cantidad =
carrito.reduce(

(total,p)=>
total+p.cantidad,

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

cantidadHTML.textContent=
cantidad;

}




if(totalHTML){

totalHTML.textContent=
"S/ "+total.toFixed(2);

}



}








// BOTONES


function eventosCarrito(){



const vaciar =
document.getElementById(
"btn-vaciar"
);



if(vaciar){


vaciar.addEventListener(

"click",

()=>{


localStorage.removeItem(
"carrito"
);


carrito=[];


mostrarCarrito();


}

);


}







const whatsapp =
document.getElementById(
"btn-whatsapp"
);



if(whatsapp){


whatsapp.addEventListener(

"click",

enviarWhatsApp

);


}


}







// WHATSAPP


function enviarWhatsApp(){



if(carrito.length===0){

alert(
"El carrito está vacío"
);

return;

}





let mensaje =
"Hola SUCESS, quiero realizar este pedido:%0A%0A";





carrito.forEach(producto=>{


mensaje +=

`⚽ ${producto.nombre} x${producto.cantidad} - S/ ${(producto.precio*producto.cantidad).toFixed(2)}%0A`;


});





const total =
carrito.reduce(

(t,p)=>
t+(p.precio*p.cantidad),

0

);





mensaje +=

`%0ATotal: S/ ${total.toFixed(2)}`;





window.open(

"https://wa.me/51992718707?text="+mensaje,

"_blank"

);



}