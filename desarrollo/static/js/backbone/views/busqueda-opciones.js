var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    Q = require('q'),
    OpcionView = require('./busqueda-opcion'),
    Opcion = require('../models/busqueda-opcion'),
    utilidades = require('../../utilidades');

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
  asignarOpciones: function(resultados){
    _.each(resultados, function(resultado){
      var opcion = new Opcion(),
          listado = [];
      opcion.set('nombre', resultado.self.nombre);
      _.each(resultado, function(valor){
        listado.push(valor.nombre);
      });
      opcion.set('listado', listado);
      opcion.on('change', function(){
        this.busquedaAjustes.trigger("alert", opcion);
      }, resultado.self.context);
      resultado.self.context.busquedaAjustes.get('opciones').add(opcion);
    });
  },
  cargarOpcionesPiezas: function (){
    Q.all([
      utilidades.getJSON({recurso: 'colecciones'}, {context: this, nombre: 'Colecciones'}), 
      utilidades.getJSON({recurso: 'categorias'}, {context: this, nombre: 'Categorias'})
    ]).then(this.asignarOpciones);
  },
  cargarOpcionesInvestigaciones: function(){
    Q.all([
      utilidades.getJSON({recurso: 'voluntarios'}, {context: this, nombre: 'Voluntarios'})
    ]).then(this.asignarOpciones);
  },
  addOne: function (opcion) {
    var opcionView = new OpcionView({ model: opcion, collection: this.collection });
    this.$el.append(opcionView.render().el);
  },
  addAll: function () {
    this.collection.forEach(this.addOne, this);
  }
});