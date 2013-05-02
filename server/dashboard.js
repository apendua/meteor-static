
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

  var makeRegion = function (name, options) {
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

  makeRegion('topPanel', {
    title: 'Top panel',
  });

  makeRegion('leftPanel', {
    title: 'Side panel',
  });

});
