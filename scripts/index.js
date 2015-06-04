	var idCard = 0;
	var lista = [];
// Carga de la página
$(document).ready(function () {

	
	$( "#menuLeft" ).on( "click", izquierda);
	$( "#menuRight" ).on( "click", derecha);
	$( "#card" ).on( "click", flip);
	loadCards();	

	
});




function MostrarModal(actualUrl){	   
    $("#dialog").load(actualUrl,function(){$(this).dialog("open");}); // asincronía
}

function derecha(){
	  if (idCard == lista.length-1){ idCard = 0;}
	  
	  else {idCard += 1;}
	   $("#question").html(lista[idCard].txt);
	   if ($( "#answer" ).is( ":visible" )){
	     $("#answer").slideToggle("fast");
	     }
	      $("#question").html(lista[idCard].txt);
}

function izquierda(){
	  if (idCard == 0) {idCard = lista.length-1;}
	  else {idCard -= 1;}
	  	   if ($( "#answer" ).is( ":visible" )){
	     $("#answer").slideToggle("fast");
	     }
	  $("#question").html(lista[idCard].txt);
}

function loadCards(){
    	 //lista = [{ "ID": 1, "txt": "dog", "img": "dog.gif"},{ "ID": 1, "txt": "cat", "img": "cat.gif"}];  
	 
                $.ajax({
                    //type: "POST", //GET o POST o PUT o DELETE 
                    url: "data/flipCards.txt", // Dirección del servicio
                    data: null, // Datos enviados al servidor
                    contentType: "application/json; charset=utf-8", // Tipo de contenido enviado al servidor
                    dataType: "json", // Formato de datos esperado en la respuesta del servidor 
                    success: function (data) { // Función a la que llamamos en caso de éxito
		      lista = data;
		      $("#question").html(lista[idCard].txt);
                    },
                    error: function (xhr, status) {// Función a la que llamamos en caso de error
						alert('Error al llamar al servicio de ObtenerListaUsuarios:'+status);				
                    }
                });  
	 
	 
}


function flip(){
	var content= " <img src=\"img/"+lista[idCard].img+"\" > ";
  	  $("#answer").html(content);
	  $("#answer").slideToggle("slow");
  
}