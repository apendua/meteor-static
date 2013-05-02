
Template.accountMenu.helpers({
  'isLoggedIn': function () {
    return !!Meteor.userId();
  },
});

Handlebars.registerHelper('user', function () {
  return Meteor.user();
});
