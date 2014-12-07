var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  el: $('#SearchOptions-type'),
  tipoPiezas: true,
  tipoInvestigaciones: false,
  tipoAutores: false,
  events: {
    'click #tipoPiezas': 'toggleBusquedaTipo',
    'click #tipoInvestigaciones': 'toggleBusquedaTipo',
  },
  initialize: function (busquedaAjustes) {
    this.busquedaAjustes = busquedaAjustes || {};
    if(utilidades.getParameterByName('investigaciones')==='true')
      this.tipoInvestigacion = true
  },

  render: function () {
    return this;
  },
  toggleBusquedaTipo: function(){
    tipoBusqueda = $("input[name=searchOptions-type]:checked").val();
    this.busquedaAjustes.set('tipoBusqueda',tipoBusqueda);
  },
});