
Actions.register({
  category : 'account',
  action   : 'logout',
}, function (event) {
  Meteor.logout();
});

Actions.allow({
  category : 'account',
}, function (userId) {
  return !!userId;
});

