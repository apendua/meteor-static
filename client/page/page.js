
// PAGE API

define('page', ['model', ], function () {

  var dependency = new Deps.Dependency;
  var chunks = new Meteor.List (null);
  var lock = false;
  var doc = null;

  var update = function (_doc) {
    if (EJSON.equals(doc, _doc)) return;
    doc = _doc;
    dependency.changed();
    if (!doc) return;
    //----------------
    chunks.remove({});
    _.each(doc.body, function (chunk) {
      chunks.push(chunk);
    });
  };

  var getId = function () {
    return Session.get('docId');
  };

  var fetch = function (doc) {
    return Documents.findOne({_id:getId()});
  };

  Deps.autorun(function () {
    if (!lock)
      update(fetch());
  });

  return {
    chunks: chunks,
    //-------------------------
    setLock: function (value) {
      lock = value;
    },
    reload: function () {
      update(fetch());
    },
    fetch: function () {
      Deps.depend(dependency);
      return doc;
    },
    getId: function () {
      return getId();
    },
    setId: function (value) {
      Session.set('docId', value);
    },
    editing: function () {
      return Session.get('edit');
    },
    setEditing: function (value) {
      Session.set('edit', value);
      this.setLock(value);
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
      page.setEditing(false);
    },
  });

  Template.page.helpers({
    'document' : _.bind(page.fetch, page),
    'editing'  : _.bind(page.editing, page),
    'chunks'   : page.chunks.find({}),
  });
});

