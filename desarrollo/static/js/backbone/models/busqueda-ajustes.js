var Backbone = require('backbone'),
	BusquedaOpciones = require('../collections/busqueda-opciones');

module.exports = Backbone.Model.extend({
	defaults: {
		"busqueda": "",
		"totalResultados": 0,
    	"tipoBusqueda": "piezas",
    	"opciones": new BusquedaOpciones(),
    	"primeraBusqueda": true
  	}
});