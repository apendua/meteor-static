
Meteor.Router.add({
  '/dashboard/:region': { to: 'dashboardRegion', and: function (region) {
    // make sure that all editing helpers will be properlly loaded
    var dashboard = require('dashboard/editing');
    //TODO: use dahsboard to set this value
    Session.set('dashboardRegion', region);
  }},
  '/dashboard': { to: 'dashboard', and: function () {
  }},
});
