var Backbone = require('backbone'),
    Opcion     = require('../models/busqueda-opcion');

module.exports = Backbone.Collection.extend({
  model: Opcion
});