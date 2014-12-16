var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  el: $('#SearchBox'),
  events: {
    'click #SearchBox-button': 'busqueda',
    'submit #SearchBox-form' : 'busqueda',
  },
  initialize: function (busquedaAjustes) {
    this.busquedaAjustes = busquedaAjustes || {};
  },

  render: function () {
    return this;
  },
  busqueda: function(event){
    var busqueda = $('#search').val() || '';
    if(this.busquedaAjustes.get('busqueda') === busqueda){
      this.busquedaAjustes.trigger("change:busqueda");
    }else{  
      this.busquedaAjustes.set('busqueda',busqueda);
    };
    $('#SearchBox-button').focus();
    event.preventDefault();
  },
  busquedaPorParametro: function(event){
    var busqueda = utilidades.getParameterByName('search');
    $('#search').val(busqueda);
    this.busquedaAjustes.set('busqueda',busqueda);
  }
});