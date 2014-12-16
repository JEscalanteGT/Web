var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'article',
  className: 'SearchOptions-opciones-opcion',

  events: {
    'click [type="checkbox"]': 'toggleCheckbox',
  },
  template: swig.compile($("#opcion-template").html()),
  initialize: function () {
    //this.listenTo(this.model, "change", this.render, this);
  },
  render: function () {
    var opcion = this.model.toJSON();
    this.$el.html(this.template(opcion));
    return this;
  },
  toggleCheckbox: function(event){
    if(this.model.get('todo')){
      this.model.set('coincidencias', this.model.get('listado'), {silent: true});
      this.model.set('todo', false, {silent: true});
      this.model.set('coincidencias', _.without(this.model.get('coincidencias'), event.currentTarget.value));
    }else{
      if(event.currentTarget.checked){
        var coincidencias = [];
        coincidencias.push(event.currentTarget.value);
        coincidencias = _.union(this.model.get('coincidencias'), coincidencias);
        this.model.set('coincidencias', coincidencias);
      }else{
        this.model.set('coincidencias', _.without(this.model.get('coincidencias'), event.currentTarget.value));
      }
      if(_.difference(this.model.get('listado'), this.model.get('coincidencias')).length === 0)
        this.model.set('todo', true, {silent: true});
    }

  }
});