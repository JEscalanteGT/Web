var Backbone = require('backbone'),
	BusquedaOpciones = require('../collections/busqueda-opciones');

module.exports = Backbone.Model.extend({
	defaults: {
    	"tipoBusqueda": "piezas",
    	"opciones": new BusquedaOpciones()
  	}
});