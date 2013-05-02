
Meteor.List = function () {

  Meteor.Collection.apply(this, arguments);
  
  this._blacklist = ['_idx', ];

  var self = this;
  var indexCache = {};

  this.indexOf = function (id) {
    //TODO: make it into reactive data source
    return indexCache[id] || -1;
  };

  Meteor.Collection.prototype.find.call(self, {}).observeChanges({
    added: function (id, fields) {
      indexCache[id] = fields._idx;
    },
    changed: function (id, fields) {
      if (_.has(fields, '_idx'))
        indexCache[id] = fields._idx;
    },
    removed: function (id) {
      delete indexCache[id];
    },
  });
};

Meteor.List.prototype = Object.create(Meteor.Collection.prototype);

Meteor.List.prototype.push = function (item) {
  var lastItem = this.findOne({}, {reactive:false, sort:{_idx:-1}});
  var lastIdx  = lastItem !== undefined ? lastItem._idx : -1;
  this.insert(_.extend(item, {
    _idx : lastIdx + 1,
  }));
};

//TODO: find better names for moving routines
//TODO: add cycle shift feature (between two indices)
//TODO: implement moveTo routine
Meteor.List.prototype.moveForward = function (selector) {
  var prev = this.findOne(selector);
  if (prev) {
    var next = this.findOne({parent:prev.parent,_idx:{$gt:prev._idx}},{sort:{_idx:1}});
    if (next) {
      this.update({_id:prev._id},{$set:{_idx:next._idx}});
      this.update({_id:next._id},{$set:{_idx:prev._idx}});
    }
  }
};//moveForward

Meteor.List.prototype.moveBackward = function (selector) {
  var next = this.findOne(selector);
  if (next) {
    var prev = this.findOne({parent:next.parent,_idx:{$lt:next._idx}},{sort:{_idx:-1}});
    if (prev) {
      this.update({_id:prev._id},{$set:{_idx:next._idx}});
      this.update({_id:next._id},{$set:{_idx:prev._idx}});
    }
  }
};//moveBackward

Meteor.List.prototype.find = function (selector, options) {
  // returns fake cursor that ignores changes of index
  options = options || {}; options.sort = options.sort || {_idx:-1};
  var cursor = Meteor.Collection.prototype.find.call(this, selector, options);

  var self = this;
  var observeChanges = cursor.observeChanges;

  //TODO: do we need to proxy other cursor methods?
  cursor.observeChanges = function (callbacks) {
    var addedBefore = callbacks.addedBefore || function (){};
    var changed     = callbacks.changed     || function (){};
    //TODO: use generic arguments
    // proxy the original actions
    callbacks.addedBefore = function (id, fields, before) {
      return addedBefore.call(undefined, id, _.omit(fields, self._blacklist), before);
    };
    callbacks.changed = function (id, fields) {
      fields = _.omit(fields, self._blacklist);
      if (!_.isEmpty(fields))
        return changed.call(undefined, id, fields);
    };
    return observeChanges.call(this, callbacks);
  };

  return cursor;
};// listOfItems

define('list', [], function () {
  return Meteor.List;
});
