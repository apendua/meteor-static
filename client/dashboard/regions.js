
var regionTemplates = {
  topPanel  : 'regionTopPanel',
  leftPanel : 'regionLeftPanel',
};

Template.dashboard.helpers({
  'regions': function () {
    return Dashboard.find({}, {
      transform: function (data) {
        return _.extend(data, {
          template: regionTemplates[data.region],
        });
    }});
  },
});

Template.dashboardRegion.helpers({
  'region': function () {
    var cache = require('dashboard/editing');
    if (cache) {
      return cache.getActive();
    }
    return {};
    //return Dashboard.findOne({region:Session.get('dashboardRegion')});
  },
});

Template.dashboardRegion.events({
  'submit form': function (event) {
    var dashboard = require('dashboard/editing');
    if (dashboard) {
      var $form = $(event.target);
      dashboard[this.region].save(function (data) {
        console.log(data.widgets);
        Dashboard.update({_id:data._id}, {$set:{widgets:data.widgets}});
      });
      event.preventDefault();
    }
  },
});

Template.dashboardEditWidget.helpers({
  'preview': function () {
    var templateName = regionTemplates[Session.get('dashboardRegion')];
    var template = Template[templateName];
    if (template)
      return new Handlebars.SafeString(template({
        widgets: [this, ],
      }));
    return '[unknown template]';
  },
});