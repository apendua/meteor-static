
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
    return Dashboard.findOne({region:Session.get('dashboardRegion')});
  },
});

Template.dashboardRegion.events({
  'submit form': function (event) {
    var $form = $(event.target);
    console.log('saving data');
    event.preventDefault();
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