
// PAGE API

define('page', ['model', ], function () {

  var dependency = new Deps.Dependency;
  var chunks = new Meteor.Collection (null);
  var lock = false;
  var doc = null;

  var update = function (_doc) {
    if (EJSON.equals(doc, _doc)) return;
    doc = _doc;
    dependency.changed();
    if (!doc) return;
    //----------------------------------------
    _.each(doc.body, function (chunk, index) {
      chunks.insert(_.extend(chunk, {
        index : index,
      }), function (err) {
        if (err) {
          //TODO: do smoething wise
        }
      });
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
    setLock: function (value) {
      lock = value;
    },
    reload: function () {
      update(this.fetch());
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
      doc.setEditing(false);
    },
  });

  Template.page.helpers({
    'document' : _.bind(page.fetch, page),
    'editing'  : _.bind(page.editing, page),
  });
});

