
Template.staticPageDropdown.helpers({

  sections: function () {
    var sections = [];
    _.each(this.body, function (chunk) {
      if (chunk.type === 'section') {
        sections.push(chunk);
      }
    });
    return sections;
  },

});

require('widgets', function (Widgets) {

  Widgets.register({
    module : 'static',
    type   : 'source',
    name   : 'document',
  }, function (config) {
    return Documents.findOne(config.selector);
  });

  Widgets.register({
    module : 'static',
    region : 'navbar',
    type   : 'widget',
    name   : 'dropdown',
  }, function (data) {
    return Template.staticPageDropdown(data);
  });

  Widgets.register({
    module : 'static',
    type   : 'widget',
    name   : 'navigation',
    region : 'sidebar',
  }, function (data) {
    return Template.staticPageNavigation(data);
  });

});
