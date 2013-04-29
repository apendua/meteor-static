

// COMMON HELPERS

require('document', function (doc) {
  Template.document.helpers(doc.getHelpers());

  Template.document.events({
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
      Documents.update({_id:doc.getId()},{$set:{body:body}});
      doc.setEditing(false);
    },
  });

});
