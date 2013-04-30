
define('document', [], function () {

  var exports = {
    fetch: function () {
      return Documents.findOne({_id:this.getId()});
    },
    getId: function () {
      return Session.get('document');
    },
    setId: function (value) {
      Session.set('document', value);
    },
    isEditing: function () {
      return Session.get('editing');
    },
    setEditing: function (value) {
      Session.set('editing', value);
    },
    getHelpers: function () {
      return helpers;
    },
  };

  // common helpers for document reated templates

  var helpers = {
    document: function () {
      return exports.fetch();
    },
    editing: function () {
      return exports.isEditing();
    },
  };

  return exports;
});
