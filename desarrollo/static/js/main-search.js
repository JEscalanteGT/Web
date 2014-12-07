var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	HeaderView = require('./backbone/views/header'),
	BusquedaView =  require('./backbone/views/busqueda'),
	BusquedaTipoView = require('./backbone/views/busqueda-tipo'),
	BusquedaOpcionesView = require('./backbone/views/busqueda-opciones'),
	BusquedaAjustes = require('./backbone/models/busqueda-ajustes'),
	BusquedaOpciones = require('./backbone/collections/busqueda-opciones'),
	utilidades = require('./utilidades');
    Backbone.$ = $;
function configuraciones() {
	var busquedaView = new BusquedaView(),
		busquedaAjustes = new BusquedaAjustes();

	/* FUNCIONES DE LOS EVENTOS DE LAS BUSQUEDAS */
	var cambioTipoBusqueda = function(){
		/*console.log(busquedaAjustes.toJSON());
		busquedaAjustes.get('opciones').reset();
		var busquedaOpciones = new BusquedaOpcionesView({ 
			collection: busquedaAjustes.get('opciones'),
			busquedaAjustes: busquedaAjustes });*/
	};
   	window.state = 'busqueda';
	
    return {
        cargarFuncionalidad: function(){
        	var header = new HeaderView({ config: 1 }),
        		busquedaTipo = new BusquedaTipoView(busquedaAjustes),
        		busquedaOpciones = new BusquedaOpcionesView(busquedaAjustes);
        	cambioTipoBusqueda();
        	busquedaAjustes.on({
		  		"change:tipoBusqueda": cambioTipoBusqueda
		  	});
        },
    }
};
$(function(){
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
	console.log("Start search");
});
