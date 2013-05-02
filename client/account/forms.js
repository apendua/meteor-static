
Template.signIn.events({
  'submit form': function (event) {
    var data = $(event.target).serializeObject();
    var self = this;
    Meteor.loginWithPassword(data.user, data.password, function (err) {
      if (err)
        Session.set('loginMessage', 'Error: ' + err.reason);
      else {
        Session.set('loginMessage', undefined);
        $('#' + self.id).modal('hide');
      }
    });
    event.preventDefault();
  },
});

Template.createAccount.events({
  'submit form': function (event) {
    console.log('creating account', $(event.target).serializeObject());
    event.preventDefault();
  },
});

Template.resetPassword.events({
  'submit form': function (event) {
    console.log('reseting password', $(event.target).serializeObject());
    event.preventDefault();
  },
});
