var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    OpcionView = require('./busqueda-opcion'),
    Opcion = require('../models/busqueda-opcion');

module.exports = Backbone.View.extend({
  el: $('#SearchOptions-opciones'),
  events: {
  },
  initialize: function (busquedaAjustes) {
    this.collection = busquedaAjustes.get('opciones');
    this.busquedaAjustes = busquedaAjustes;
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.render, this);
    this.listenTo(this.busquedaAjustes, 'change:tipoBusqueda', this.render, this);
    this.render();
  },

  render: function () {
    this.$el.empty();
    if(this.busquedaAjustes.get('tipoBusqueda') === "piezas")
      this.cargarOpcionesPiezas();
    if (this.busquedaAjustes.get('tipoBusqueda') === "investigaciones")
      this.cargarOpcionesInvestigaciones();
  },
  cargarOpcionesPiezas: function (){
    var opcion = new Opcion();
    opcion.set('nombre', 'Salas');
    opcion.set('listado', ['Sala muy larga', 'Sala multiusos de los menesteres', 'restos']);
    opcion.on('change', function(){
      console.log(opcion.get('coincidencias'));
      this.busquedaAjustes.trigger("alert", opcion);
    }, this);
    this.busquedaAjustes.get('opciones').add(opcion);
    this.busquedaAjustes.get('opciones').add({ nombre: 'Categorias', listado: ['ceramica', 'litica', 'restos'], todo: false })
    this.busquedaAjustes.get('opciones').add({ nombre: 'Colecciones', listado: ['Prehispanica', 'Zoologica', 'Archivo historico'], todo: false })
    this.busquedaAjustes.get('opciones').add({ nombre: 'Fechamiento', listado: ['Siglo XXI', 'Siglo XX', 'Siglo XIX'], todo: false });
  },
  cargarOpcionesInvestigaciones: function(){
    this.busquedaAjustes.get('opciones').add({ nombre: 'Autor', listado: ['Jorge Escalante', 'Eduardo Castañeda', 'Miguel Angel'], todo: false });
    this.busquedaAjustes.get('opciones').add({ nombre: 'Editor', listado: ['ceramica', 'litica', 'restos'], todo: false })
  },
  addOne: function (opcion) {
    var opcionView = new OpcionView({ model: opcion, collection: this.collection });
    this.$el.append(opcionView.render().el);
  },
  addAll: function () {
    this.collection.forEach(this.addOne, this);
  }
});