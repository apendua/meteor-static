
Template.staticPageNavListItem.helpers({
  class: function () {
    //TODO: optimize this one
    if (this._id === Session.get('docId'))
      return 'active';
    return '';
  },
});

Template.staticPageAdminActions.helpers({
  pages: function () {
    return Documents.find({});
  },
});

Template.staticPagesPreview.helpers({
  chunk: function () {
    //TODO: enable iterating
    return this.body[0];
  },
});

Handlebars.registerHelper('sections', function () {
  var sections = [];
  _.each(this.body, function (chunk) {
    if (chunk.type === 'section') {
      sections.push(chunk);
    }
  });
  return sections;
});

require('widgets', function (Widgets) {

  Widgets.register({
    module : 'static',
    name   : 'document',
  }, {
    load: function (config) {
      if (!config.selector)
        // return current document
        return Documents.findOne({_id:Session.get('docId')});
      return Documents.findOne(config.selector);
    },
    edit: function (config) {
      return new Handlebars.SafeString(Template.staticPageSource(config));
    },
  });

  Widgets.register({
    module : 'static',
    region : 'navbar',
    name   : 'dropdown',
  }, function (data) {
    return Template.staticPageDropdown(data);
  });

  Widgets.register({
    module : 'static',
    name   : 'navigation',
    region : 'sidebar',
  }, function (data) {
    return Template.staticPageNavigation(data);
  });

  Widgets.register({
    module : 'static',
    name   : 'admin',
  }, function (data) {
    return Template.staticPageAdminActions(data);
  });

  Widgets.register({
    module : 'static',
    name   : 'preview',
  }, {
    show: function (data) {
      return Template.staticPagesPreview(data);
    },
    edit: function (config) {

    },
    load: function (config) {
      if (!config.selector)
        // return current document
        return Documents.findOne({_id:Session.get('docId')});
      return Documents.findOne(config.selector);
    },
  });

  Widgets.instance('staticPagesAdmin', {
    widget : { module: 'static', name: 'admin' },
    source : { module: 'static', name: 'admin' },
    config : {},
  });

});
