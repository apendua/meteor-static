
Meteor.Subcollection = function (name, cursor) {
  Meteor.Collection.call(this, null); // noname
  var self = this;
  self._blacklist = ['parent', 'index', ];
  //TODO: what should we do if item is not an object?
  cursor.observeChanges({
    added: function (id, fields) {
      _.each(fields[name], function (item, index) {
        self.insert(_.extend(item, {
          parent : id,
          index  : index,
        }) , function (err) {
          if (err) {
          }
        });
      });
    },
    changed: function (id, fields) {
      //TODO: what if they don't have id's???
      _.each(fields[name], function (item, index) {
        self.update({_id:item._id}, {$set:_.extend(item, {
          parent : id,
          index  : index,
        })});
      });
    },
    removed: function (id) {
      self.remove({parent:id});
    },
  });
};

Meteor.Subcollection.prototype = Object.create(Meteor.Collection.prototype);

Meteor.Subcollection.prototype.push = function (item, options) {
  var lastItem  = this.findOne({parent:options.parent}, {sort:{index:-1}});
  var lastIndex = lastItem !== undefined ? lastItem.index : -1;
  this.insert(_.extend(item, {
    parent : options.parent,
    index  : lastIndex + 1,
  }));
};

Meteor.Subcollection.prototype.moveForward = function (selector) {
  var prev = this.findOne(selector);
  if (prev) {
    var next = this.findOne({parent:prev.parent,index:{$gt:prev.index}},{sort:{index:1}});
    if (next) {
      this.update({_id:prev._id},{$set:{index:next.index}});
      this.update({_id:next._id},{$set:{index:prev.index}});
    }
  }
};//moveForward

Meteor.Subcollection.prototype.moveBackward = function (selector) {
  var next = this.findOne(selector);
  if (next) {
    var prev = this.findOne({parent:next.parent,index:{$lt:next.index}},{sort:{index:-1}});
    if (prev) {
      this.update({_id:prev._id},{$set:{index:next.index}});
      this.update({_id:next._id},{$set:{index:prev.index}});
    }
  }
};//moveBackwards

//TODO: think of a better name for this function
Meteor.Subcollection.prototype.find = function (selector, options) {
  // returns fake cursor that ignores changes of index
  options = options || {}; options.sort = options.sort || {index:1};
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

define('subcollection', [], function () {
  return Meteor.Subcollection;
});
