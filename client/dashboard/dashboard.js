
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
  fetch: function (config) {
    return {
      regions: Dashboard.find({}),
    };
  },
});

Handlebars.registerHelper('eachWidget', function (options) {
  
  //TODO: use helper context as source

  var region = Dashboard.findOne(options.hash);
  var widgets = null;

  if (region)
    widgets = region.widgets;

  var buffer = '';
  _.each(widgets, function (widget, index) {
    buffer += Spark.labelBranch(index, function () {
      return options.fn(widget);
    });
  });
  
  return buffer;
});

});
