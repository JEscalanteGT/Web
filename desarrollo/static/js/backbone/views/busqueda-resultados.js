var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'h4',
  className: 'u-mensajeResultados',

  events: {
  },
  template: swig.compile("Se han encontrado {{data}} resultados"),
  initialize: function (busquedaAjustes) {
    this.busquedaAjustes = busquedaAjustes;
    this.render();
    this.listenTo(this.busquedaAjustes, "change:totalResultados", this.render, this);
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var datos = {
      data: this.busquedaAjustes.get('totalResultados')
    }
    this.$el.html(this.template(datos));
    return this;
  }
});