
Meteor.Router.add({
  '/dashboard/:region': { to: 'dashboardRegion', and: function (region) {
    Session.set('dashboardRegion', region);
  }},
  '/dashboard': { to: 'dashboard', and: function () {
  }},
});
