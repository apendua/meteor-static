
/*
  title   : '',
  region  : '',
  widgets : '',
*/

Dashboard = new Meteor.Collection ("dashboard");

Dashboard.allow({
  update: function (userId) {
    //TODO: check if admin
    return true;
  },
});

Dashboard.deny({
  insert: function () { return true; },
  remove: function () { return true; },
});

Meteor.publish("dashboard", function () {
  return Dashboard.find({});
});

Meteor.startup(function () {

  var ensureRegion = function (name, options) {
    var region = Dashboard.findOne({region:name});
    if (!region) {
      Dashboard.insert({
        region  : name,
        title   : options.title || name,
        widgets : options.widgets || [],
      });
    }
  };

  //Dashboard.remove({});

  ensureRegion('topPanel', {
    title: 'Top panel',
  });

  ensureRegion('leftPanel', {
    title: 'Side panel',
  });

  // FAKE WIDGETS

  var topPanel = [
    {
      widget: { module: 'static', name: 'dropdown' },
      source: { module: 'static', name: 'document' },
      config: {
        selector: {
          'head.title': 'Home page',
        },
      },
    },
    {
      widget: { module: 'static', name: 'dropdown' },
      source: { module: 'static', name: 'document' },
      config: {
        selector: {
          'head.title': 'Docs',
        },
      },
    },
  ];

  var leftPanel = [
    {
      widget: { module: 'static', name: 'navigation' },
      source: { module: 'static', name: 'document' },
      config: {
        selector: null, // means current document
      },
    },
  ];

  Dashboard.update({region:'topPanel'}, {$set:{widgets:topPanel}});
  Dashboard.update({region:'leftPanel'}, {$set:{widgets:leftPanel}});

});
