

Handlebars.registerHelper('showWidget', function () {

  //TODO: if source is undefined try using widget as a data source

  var widget = Meteor.widgets.findOne(this.widget);
  var source = Meteor.widgets.findOne(this.source);

  return new Handlebars.SafeString(widget.render(source.fetch(this.config)) || '');
});