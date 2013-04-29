
Template.searchBox.created = function () {
  //TODO: maybe we should cache this list globally (?)
  //TODO: limit query to the most popular tags
  this._listOfTags = [];
  this._tags = {};
  var self = this;
  this._handle = Tags.find({}).observe({
    added: function (tag) {
      if (!_.has(self._tags, tag.name)) {
        self._listOfTags.push(tag.name);
        self._tags[tag.name] = tag.nRefs;
      }
    },
    //TODO: implement remove feature
  });
};

Template.searchBox.destroyed = function () {
  this._handle.stop();
};

Template.searchBox.rendered = function () {
  $(this.find('input')).typeahead({
    source: this._listOfTags,
  });
};

Template.searchBox.helpers({
  keywords: function () {
    return Session.get('keywords');
  },
});

Template.searchBox.events({
  'submit form': function (event) {
    var searchOptions = $(event.target).serializeObject();
    var searchURL = makeSearchPath(searchOptions);
    Meteor.Router.to(searchURL);
    event.preventDefault();
  }
});