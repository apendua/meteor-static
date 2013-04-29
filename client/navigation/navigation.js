
Template.navListItem.helpers({
  class: function () {
    //TODO: optimize this one
    if (this._id === Session.get('document'))
      return 'active';
    return '';
  },
});

Template.navigation.helpers({
  pages: function () {
    //TODO: restrict this
    return Documents.find({});
  },
});