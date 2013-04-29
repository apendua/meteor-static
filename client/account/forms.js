
Template.signIn.events({
  'submit form': function (event) {
    console.log('logging in', $(event.target).serializeObject());
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
