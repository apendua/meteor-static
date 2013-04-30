
// PAGE API

define('page', [], function () {

  return {
    fetch: function () {
      return Documents.findOne({_id:this.getId()});
    },
    getId: function () {
      return Session.get('docId');
    },
    setId: function (value) {
      Session.set('docId', value);
    },
    editing: function () {
      return Session.get('edit');
    },
    setEditing: function (value) {
      Session.set('edit', value);
    },
  };

});

require('page', function (page) {

  Template.page.events({
    'submit form': function (event) {
      var $form = $(event.target);
      event.preventDefault();
      var body = [];
      $form.find('textarea[name^=body-]').each(function () {
        var $textarea = $(this);
        body.push({
          _id     : $textarea.attr('name').split('-')[1],
          content : $textarea.val(),
          type    : 'math',
        });
      });
      //-----------------------------------------------------
      Documents.update({_id:page.getId()},{$set:{body:body}});
      doc.setEditing(false);
    },
  });

  Template.page.helpers({
    'document' : _.bind(page.fetch, page),
    'editing'  : _.bind(page.editing, page),
  });
});

