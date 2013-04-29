
Session.setDefault('loginDialogType', 'signIn');

Template.loginDialog.helpers({
  'title': function () {
    var type = Session.get('loginDialogType');
    switch (type) {
      case 'signIn':
        return 'Sign in';
      case 'resetPassword':
        return 'Reset password';
      case 'createAccount':
        return 'Create a new account';
      default:
        return '';
    }
  },
  'form': function () {
    return Session.get('loginDialogType');
  },
  'id': function () {
    return this.id || 'loginDialog';
  },
});

Template.loginDialog.events({
  'click button[data-type]': function () {
    Session.set('loginDialogType', $(event.target).data('type'));
  },
});

Handlebars.registerHelper('loginDialog', function (options) {
  return new Handlebars.SafeString(Template.loginDialog(options.hash));
});