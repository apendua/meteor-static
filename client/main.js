
Meteor.subscribe("settings");
Meteor.subscribe("documents");
Meteor.subscribe("users");

//UNSAFE
Meteor.startup(function () {
  if (!Meteor.userId())
    Meteor.loginWithPassword('admin', 'password');
});
