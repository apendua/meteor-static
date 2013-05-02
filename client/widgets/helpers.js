
Handlebars.registerHelper('showWidget', function (context, options) {
  if (options === undefined) { options = context; context = this; }

  if (_.isString(context))
    context = Widgets.instance(context) || {};

  //TODO: use helper context as source

  var widget = Meteor.widgets.findOne(context.widget);
  var source = Meteor.widgets.findOne(context.source);

  if (!widget || !source)
    return new Handlebars.SafeString(Template.widgetPlaceholder({}));

  return new Handlebars.SafeString(widget.render(source.fetch(context.config)) || '');
});
/*
Handlebars.registerHelper('editWidget', function () {

  //TODO: if source is undefined try using widget as a data source

  var widget = Meteor.widgets.findOne(this.widget);
  var source = Meteor.widgets.findOne(this.source);

  return new Handlebars.SafeString(widget.render(source.fetch(this.config)) || '');
});
*/
