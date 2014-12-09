var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	HeaderView = require('./backbone/views/header'),
	BusquedaTipoView = require('./backbone/views/busqueda-tipo'),
	BusquedaOpcionesView = require('./backbone/views/busqueda-opciones'),
	BusquedaSearchBoxView = require('./backbone/views/busqueda-searchbox'),
	BusquedaResultadosView = require('./backbone/views/busqueda-resultados'),
	BusquedaAjustes = require('./backbone/models/busqueda-ajustes'),
	BusquedaOpciones = require('./backbone/collections/busqueda-opciones'),	
	Piezas = require('./backbone/collections/piezas'),
	PiezasListView = require('./backbone/views/piezas'),
	Investigaciones = require('./backbone/collections/investigaciones'),
	InvestigacionesListView = require('./backbone/views/investigaciones'),
	utilidades = require('./utilidades');
    Backbone.$ = $;
function configuraciones() {
	var busquedaAjustes = new BusquedaAjustes(),
		piezasCollection = new Piezas(),
		piezasList = new PiezasListView({
      		el: $('#Search-results-content')}, piezasCollection),
		investigacionesCollection = new Investigaciones(),
		investigacionesList = new InvestigacionesListView({
      		el: $('#Search-results-content')}, investigacionesCollection);

	/* FUNCIONES DE LOS EVENTOS DE LAS BUSQUEDAS */
	var iniciarBusqueda = function(){
		if(busquedaAjustes.get('tipoBusqueda') === 'piezas'){
			var dataPiezas = {
		      keyword: busquedaAjustes.get('busqueda'),
		      recurso: 'search-piezas'
		    };
		    piezasCollection.reset();
		    utilidades.getJSON(dataPiezas).then(function(data){
		     	_.each(data, function(pieza){
		        	pieza.tipo = 'SearchPieza';
		        	piezasCollection.add(pieza);
		      	});
		      	busquedaAjustes.set('totalResultados', piezasCollection.length);
		    });
		}
		else if(busquedaAjustes.get('tipoBusqueda') === 'investigaciones'){
			var dataInvestigaciones = {
		      keyword: busquedaAjustes.get('busqueda'),
		      recurso: 'search-investigaciones'
		    };
		    investigacionesCollection.reset();
		    utilidades.getJSON(dataInvestigaciones).then(function(data){
		     	_.each(data, function(investigacion){
		        	investigacionesCollection.add(investigacion);
		      	});
		      	busquedaAjustes.set('totalResultados', investigacionesCollection.length);
		    });
		}
	};
	var cambioAjustes = function(opcion){
		console.log(opcion.get('nombre'));
	};
   	window.state = 'busqueda';
	
    return {
        cargarFuncionalidad: function(){
        	var header = new HeaderView({ config: 1 }),
        		busquedaTipo = new BusquedaTipoView(busquedaAjustes),
        		busquedaOpciones = new BusquedaOpcionesView(busquedaAjustes),
        		busquedaSearchBox = new BusquedaSearchBoxView(busquedaAjustes),
        		busquedaResultados = new BusquedaResultadosView(busquedaAjustes);;
        	$('#Search-results').prepend(busquedaResultados.el);
        	busquedaAjustes.on({
		  		"change:busqueda": iniciarBusqueda,
		  		"change:tipoBusqueda": iniciarBusqueda,
		  		"alert" : cambioAjustes
		  	});
        	if(utilidades.getParameterByName('search') != ''){
        		busquedaSearchBox.busquedaPorParametro();
		    }
        },
    }
};
$(function(){
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
	console.log("Start search");
});
