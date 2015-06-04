/*
 *  
 * Control de la SGTIC que muestra mensajes de notificación, aviso, advertencia, error, etc.
 *
 * Versión 1.0 (Primera versión)
 *
 *
 */

/**
 * Modo de uso: 
 *
 *  $().mensajesgtic('Ok', 'Prueba Ok'); => Muestra un mensaje
 *  $().mensajesgtic('Error', 'Prueba Error'); => Muestra un mensaje de error (permanente)
 *  $().mensajesgtic('Notificacion', 'Prueba Notificacion'); => Muestra un mensaje informativo
 *  $().mensajesgtic('Advertencia', 'Prueba Advertencia'); => Muestra una advertencia
 ***
 *  $().mensajesgtic('Ok', 'Prueba Ok', funcion_a_ejecutar_al_cerrar); => Muestra un mensaje PERMANENTE, cuando este se cierra ejecutará la función pasada por parámetro
 *  $().mensajesgtic('Error', 'Prueba Error', funcion_a_ejecutar_al_cerrar); => Muestra un mensaje de error PERMANENTE, cuando este se cierra ejecutará la función pasada por parámetro
 *  $().mensajesgtic('Notificacion', 'Prueba Notificacion', funcion_a_ejecutar_al_cerrar); => Muestra un mensaje informativo PERMANENTE, cuando este se cierra ejecutará la función pasada por parámetro
 *  $().mensajesgtic('Advertencia', 'Prueba Advertencia', funcion_a_ejecutar_al_cerrar); => Muestra una advertencia PERMANENTE, cuando este se cierra ejecutará la función pasada por parámetro
 *
 *
 * Ayuda: 
 * - $.extend() combina los contenidos de dos o más objetos en el primero objeto pasado por parámetro: http://api.jquery.com/jQuery.extend/
 *
 **/


(function($)
{

    // Ajustes iniciales
    var ajustes = {
        efecto: { opacity: 'show' },	// Efecto que se muestra
        duracionEfecto: 500,			// Duración del efecto (milisegundos)
        tiempoEsperaOcultar: 5000,		// Tiempo antes de que desaparezca el mensaje (milisegundos)
        texto: '',					    // Contenido de la notificación/mensaje
        permanente: false,			    // Nos dice si el mensaje debe ser permanente o no
        tipo: 'Notificacion', 		    // Tipo de mensaje: Notificacion, Advertencia, Error, Ok
        posicion: 'top-center',         // Posición del mensaje top-left, top-center, top-right, middle-left, middle-center, middle-right 
                                        // La posición solo se puede definir al inicio        
        cerrar: null                    // Función que llamamos al cerrar el mensaje (de manera manual o automática)
    };


    // Definición de métodos públicos
    $.fn.mensajesgtic = function (metodo) {

        // Method calling logic
        if (metodos[metodo]) {
            return metodos[metodo].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof metodo === 'object' || !metodo) {
            return metodos.inicio.apply(this, arguments);
        } else {
            $.error('Método ' + metodo + ' no existe en JQuery.mensajessgtic');
        }
    };


    // Definición de métodos internos
    var metodos = {
        // Iniciamos el control con los ajustes por defecto + los pasados por parámetro
        inicio: function (opciones) {
            if (opciones) {
                $.extend(ajustes, opciones);
            }
        },

        // Muestra el mensaje
        muestraMensajeSGTIC: function (opciones) {
            var ajustesLocales = {};
            $.extend(ajustesLocales, ajustes, opciones);

            // Declaramos variables
            var mensajesgticDivContenedorControl;
            var mensajesgticDivExterior;
            var mensajesgticDivInterior;
            var mensajesgticDivCerrar;
            var mensajesgticDivImagen;

            // Primero comprobamos si el contenedor de mensajes existe (mensajesgtic-container). 
            mensajesgticDivContenedorControl = (!$('.mensajesgtic-container').length) ? $('<div></div>').addClass('mensajesgtic-container').addClass('mensajesgtic-position-' + ajustesLocales.posicion).click(function (e) { e.stopPropagation();}).appendTo('body') : $('.mensajesgtic-container');
            // Creamos un div exterior y un div interior, donde meteremos el texto y las imágenes
            mensajesgticDivExterior = $('<div></div>');
            mensajesgticDivInterior = $('<div></div>').hide().addClass('mensajesgtic-item mensajesgtic-type-' + ajustesLocales.tipo).appendTo(mensajesgticDivContenedorControl).html($('<p>').append(ajustesLocales.texto)).animate(ajustesLocales.efecto, ajustesLocales.duracionEfecto).wrap(mensajesgticDivExterior);
            mensajesgticDivCerrar = $('<div></div>').addClass('mensajesgtic-item-close').prependTo(mensajesgticDivInterior).click(function (e) { $().mensajesgtic('ocultaMensajeSGTIC', mensajesgticDivInterior, ajustesLocales); }).mouseenter(function () { $(mensajesgticDivInterior).addClass("animacionTembleque"); }).mouseleave(function () { $(mensajesgticDivInterior).removeClass("animacionTembleque"); });
            mensajesgticDivImagen   = $('<div></div>').addClass('mensajesgtic-item-image').addClass('mensajesgtic-item-image-' + ajustesLocales.tipo).prependTo(mensajesgticDivInterior);
                       
            // Si el mensaje no es permanente, le asignamos un timeout para que se oculte a los "tiempoEsperaOcultar" milisegundos
            if (!ajustesLocales.permanente) {
                setTimeout(function () {
                    $().mensajesgtic('ocultaMensajeSGTIC', mensajesgticDivInterior, ajustesLocales);
                },
				ajustesLocales.tiempoEsperaOcultar);
            }
            return mensajesgticDivInterior;
        },

        Notificacion: function (mensaje, funcion) {
            var options
            if (funcion) options = { texto: mensaje, tipo: 'notificacion', permanente: true, cerrar: funcion };
            else options = { texto: mensaje, tipo: 'notificacion' };

            return $().mensajesgtic('muestraMensajeSGTIC', options);
        },

        Ok: function (mensaje, funcion) {
            var options
            if (funcion) options = { texto: mensaje, tipo: 'ok', permanente: true, cerrar: funcion };
            else options = { texto: mensaje, tipo: 'ok' };
            return $().mensajesgtic('muestraMensajeSGTIC', options);
        },

        Error: function (mensaje, funcion) {
            var options;
            if (funcion) options = { texto: mensaje, tipo: 'error', permanente: true, cerrar : funcion };
            else options = { texto: mensaje, tipo: 'error', permanente: true };
            return $().mensajesgtic('muestraMensajeSGTIC', options);
        },

        Advertencia: function (mensaje, funcion) {
            var options;
            if (funcion) options = { texto: mensaje, tipo: 'advertencia', permanente: true, cerrar: funcion };
            else options = { texto: mensaje, tipo: 'advertencia' };
            return $().mensajesgtic('muestraMensajeSGTIC', options);
        },

        ocultaMensajeSGTIC: function (obj, opciones) {
            //obj.animate({ opacity: '0' }, 600, function () {
            $(obj).effect("drop", 600, function () {
                obj.parent().animate({ height: '0px' }, 300, function () {
                    obj.parent().remove();
                });
            });
            // callback
            if (opciones && opciones.cerrar !== null) {
                opciones.cerrar();
            }
        }
    };



})(jQuery);