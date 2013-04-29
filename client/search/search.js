require('model', function (model) {

  var docsPerPage = 10;
  var cursorDeps = new Deps.Dependency;
  var cursor = null;

  var getCursor = function () {
    Deps.depend(cursorDeps);
    return cursor;
  };

  var getActivePage = function () {
    var page = Session.get('page') || "0";
    return parseInt(page);
  };

  var getSelector = function () {
    var selector = {};
    //-------------------------------------
    var keywords = Session.get('keywords');
    if (keywords) {
      //TODO: define alternative regexp
      var regExp = RegExp(keywords);

      selector.$or = [

        { 'tags'           : {$in:keywords.split(',')} },
        { 'head.title'     : {$regex:regExp} },
        //TODO: full text search (not only the first chunk)
        { 'body.0.content' : {$regex:regExp} },

      ]
    }
    return selector;
  };

  var getOptions = function () {
    var page = getActivePage();

    var options = {
      sort  : {createdAt:-1},
      skip  : page * docsPerPage,
      limit : docsPerPage,
    };

    return options;
  };

  Meteor.autorun(function () {
    //TODO: observe changes
    //TODO: moving elements does not work very well
    
    cursor = model.documents.find(getSelector(), getOptions());
    cursorDeps.changed();
  });

  var getPages = function () {
    var active = getActivePage();
    var pages  = [];
    var nItems = model.documents.find(getSelector()).count();
    var nPages = Math.ceil(nItems / docsPerPage);
    for (var i=0; i<nPages; i++) {
      pages.push({
        index    : i,
        isActive : i === active,
      });
    }
    return pages;
  };

  Template.search.documents = function () {
    return getCursor();
  };

});
