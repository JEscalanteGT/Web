var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
    	"nombre": "",
    	"listado": [],
    	"coincidencias": [],
    	"todo": true
  	}
});