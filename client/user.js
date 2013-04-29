
Handlebars.registerHelper('username', function (userId) {
  var user = null;
  if (userId)
    user = Meteor.users.findOne({_id:userId});
  user = user || Meteor.user();
  if (user)
    return user.username;
  return '[unknown user]';
});