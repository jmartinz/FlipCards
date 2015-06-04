var lista = [];

function CargaAgenda()
{
	cargarAgenda();
	
	CargaEventos();

	/*--------   convertir formulario en un dialog jquery */
	$("#formulario").dialog({
		autoOpen: false,
		height: 450,
		width: 700,
		modal: true,
		buttons: {	
			Guardar: function(){ 
				if ($("#idContacto").val()!='') {
					modificarContacto();
				}				
				else{
					guardarContacto();
				}			
			  $( this ).dialog( "close" );
			},
			Cerrar: function() {
			  $( this ).dialog( "close" );
			}
		}	 		  
	});
}

function CargaEventos() {
    // Funcionalidad para la imagen del menú
    $("#btnAnadir").click(function () {				
		$("#nombre").val('');
		$("#apellidos").val('');
		$("#email").val('');
		$("#telefono").val('');
		$("#idContacto").val('');
        $("#formulario").dialog("open")
    });
}


function cargarAgenda(){
	 lista = [{ "ID": 87641, "apellido1": "VILLOTA", "apellido2": "ROCHA", "email": "jvillotar@teac.meh.es", "nif": "00225484S", "nombre": "F.JAVIER", "telefono": "917003239" }, { "ID": 87694, "apellido1": "APARICIO", "apellido2": "BARBOLLA", "email": "juanjavier.aparicio@meh.es", "nif": "00260152E", "nombre": "JUAN JAVIER", "telefono": "5835840" }, { "ID": 87812, "apellido1": "BARCENAS", "apellido2": "BARBERO", "email": "", "nif": "00377553P", "nombre": "JAVIER", "telefono": "" }, { "ID": 87896, "apellido1": "CABALLERO", "apellido2": "LAMIQUIZ", "email": "javier.caballero@meh.es", "nif": "00395019V", "nombre": "FRANCISCO", "telefono": "915958530" }, { "ID": 87909, "apellido1": "COSSIO", "apellido2": "FERRARI", "email": "javier.cossio@meh.es", "nif": "00396824M", "nombre": "JAVIER", "telefono": "915958880" }, { "ID": 87925, "apellido1": "GARCIA", "apellido2": "PROVENCIO", "email": "jgarciap@igae.meh.es", "nif": "00402309Q", "nombre": "FCO. JAVIER", "telefono": "915712523" }, { "ID": 87945, "apellido1": "HUERTA", "apellido2": "IZAR DE LA FUENTE", "email": "javier.huerta@igss.seg-social.es", "nif": "00407784V", "nombre": "JAVIER", "telefono": "" }, { "ID": 87979, "apellido1": "MARTINEZ", "apellido2": "GONZALEZ", "email": "AMartinezGo@igae.meh.es", "nif": "00419832J", "nombre": "ALFONSO JAVIER", "telefono": "913433855" }, { "ID": 88045, "apellido1": "PARAMIO", "apellido2": "FERNANDEZ", "email": "javier.paramio@meh.es", "nif": "00625510W", "nombre": "JAVIER FCO.", "telefono": "915958232" }, { "ID": 88051, "apellido1": "ARCE", "apellido2": "GONZALEZ", "email": "", "nif": "00632842C", "nombre": "JOSE JAVIER", "telefono": "" }, { "ID": 88091, "apellido1": "MONTERO", "apellido2": "DE ARAGON", "email": "JMonteroA@sgpg.meh.es", "nif": "00648076M", "nombre": "FCO.JAVIER", "telefono": "913491366" }, { "ID": 88111, "apellido1": "FERNANDEZ", "apellido2": "MENDEZ DE ANDES", "email": "javier.fernandezm@meh.es", "nif": "00653251M", "nombre": "JAVIER", "telefono": "" }, { "ID": 88148, "apellido1": "TERCENO", "apellido2": "GONZALEZ", "email": "javier.terceno@tributos.meh.es", "nif": "00666570F", "nombre": "JOSE JAVIER", "telefono": "58341" }, { "ID": 88211, "apellido1": "BALLESTEROS", "apellido2": "NAVARRO", "email": "javier.ballesteros@catastro.meh.es", "nif": "00681684X", "nombre": "JAVIER", "telefono": "915836918" }];
	
	 var strHtml = "";
	 for (var i = 0, len = lista.length; i < len; i++) {  
		strHtml  +="<div class='contacto' onclick='editarContacto(" + i +"," + lista[i].ID + ")'><span class='nombre'>" + lista[i].nombre + " " + lista[i].apellido1 + "</span> " 
		+ "<span class='email'>" + lista[i].email + "</span> "
		+ "<span class='telefono'>" + lista[i].telefono + "</span>"
		+ "<div class='papelera' onclick='eliminarContacto(" + i + "," + lista[i].ID + ",event)'></div> </div>";	
	}
	//alert(strHtml);
	$("#lista").append(strHtml);			
 }
 
function nuevoContacto(i,id){
	$("#formulario").dialog("open");	
	$("#titulo").text("Teclear los datos y pulsar Guardar");
	$("#nombre").val("");
	$("#email").val("");
	$("#telefono").val("");
}
function editarContacto(i,id){
	$("#formulario").dialog("open");		
	$("#nombre").val(lista[i].nombre);
	$("#email").val(lista[i].email);
	$("#telefono").val(lista[i].telefono);
}
function eliminarContacto(i,id,e){
	var texto = "Se va a eliminar el contacto " + lista[i].nombre ;
	 alert(texto);
	 e.stopPropagation();
}



 