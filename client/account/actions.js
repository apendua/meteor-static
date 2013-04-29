require('actions', function () {

  Actions.register({
    object : 'account',
    action : 'logout',
  }, function (event) {
    console.log("logout");
    Meteor.logout();
  });

  Actions.allow({
    object : 'account',
  }, function (userId) {
    return !!userId;
  });

});