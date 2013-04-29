
define('document', ['model', 'subcollection', ], function () {

  var chunksDependency = new Deps.Dependency;
  var reload = new Deps.Dependency;
  var chunks = null;
  var cursor = null;

  Deps.autorun(function () {
    Deps.depend(reload);
    cursor = Documents.find({_id:Session.get('document')}, {});
    chunks = new Meteor.Subcollection('body', cursor);
    chunksDependency.changed();
  });

  var exports = {
    listOfChunks: function (selector) {
      Deps.depend(chunksDependency);
      return chunks.find(selector || {}, {
        transform: function (chunk) {
          chunk.name = 'body-' + chunk._id;
          return chunk;
        },
      });
    },
    fetch: function (docId) {
      //TODO: why not cache this document for quicker access?
      return Documents.findOne({_id:docId || Session.get('document')});
    },
    example: function (docId) {
      var example = {
        _id  : 'example',
        data : {},
      }
      var doc = this.fetch(docId);
      if (doc) {
        example.link = doc._id;
        if (doc.data)
          example.data = doc.data;
      }
      return example;
    },
    data: function () {
      //TODO: cache the current variant
      var docId = this.getId();
      if (docId) {
        var variant = VariantHistory.findOne({_id: Flags.getFlagValue(docId, 'variant')});
        if (variant)
          return variant.data;
        return this.example().data;
      }
      return {};
    },
    chunks: function () {
      Deps.depend(chunksDependency);
      return chunks;
    },
    reload: function () {
      reload.changed();
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
    getVariant: function (docId) {
      //TODO: by default return the latest one
      return Flags.getFlagValue(docId || this.getId(), 'variant') || 'example';
    },
    setVariant: function (docId, value) {
      docId = docId || this.getId();
      if (docId)
        Flags.setFlagValue(docId, 'variant', value);
    },
    getHelpers: function () {
      return helpers;
    },
  };

  // common helpers for document reated templates

  var helpers = {
    listOfChunks: function () {
      /*var doc = exports.fetch();
      if (doc)
        return doc.body;
      return [];*/
      return exports.listOfChunks();
    },
    document: function () {
      return exports.fetch();
    },
    editing: function () {
      return exports.isEditing();
    },
    data: function () {
      return exports.data();
    },
    example: function (docId) {
      //QUESTION: is it safe?
      if (docId === undefined)
        return exports.example(this._id);
      return exports.example(docId);
    },
  };

  return exports;
});
