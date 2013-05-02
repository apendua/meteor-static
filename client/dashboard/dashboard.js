
Dashboard = new Meteor.Collection ("dashboard");

Meteor.subscribe("dashboard");

require('widgets', function () {

Widgets.instance('dashboard', {
  widget: { module: 'dashboard', name: 'toolbox', },
  source: { module: 'dashboard', name: 'toolbox', },
});

Widgets.register({
  module : 'dashboard',
  name   : 'toolbox',
}, {
  render: function (data) {
    return new Handlebars.SafeString(Template.dashboardToolbox(data));
  },
});

//TODO: find a rigth place for this helper

Template.dashboard.helpers({
  'regions': function () {
    var settings = Settings.findOne({});
    var regions = [];

    if (settings) {
      _.each(settings.regions, function (value, key) {
        regions.push({
          name: key,
        });
      });
    }

    return regions;
  }
});

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

});