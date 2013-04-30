
Meteor.subscribe("settings");
Meteor.subscribe("documents");
Meteor.subscribe("users");

//UNSAFE
Meteor.startup(function () {
  if (!Meteor.userId())
    Meteor.loginWithPassword('admin', 'password');
});


//TODO: find a rigth place for this helper

Handlebars.registerHelper('widgets', function (options) {
  
  //TODO: use helper context as source

  var settings = Settings.findOne({});
  var widgets = null;

  if (settings)
    widgets = settings.regions[options.hash.region];

  var buffer = '';
  _.each(widgets, function (widget, index) {
    buffer += Spark.labelBranch(index, function () {
      return options.fn(widget);
    });
  });
  
  return buffer;
});
