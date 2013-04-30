

Handlebars.registerHelper('showWidget', function () {

  //TODO: if source is undefined try using widget as a data source

  var widget = Meteor.widgets.findOne(this.widget);
  var source = Meteor.widgets.findOne(this.source);

  return new Handlebars.SafeString(widget.render(source.fetch(this.config)) || '');
});
/*
Handlebars.registerHelper('widget', function (options) {
  
  //TODO: use helper context as source

  var widget = Meteor.widgets.findOne(options.hash);
  var source = widget;

  return new Handlebars.SafeString(widget.render(source.fetch(this.config)) || '');

});
*/