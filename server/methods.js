
Meteor.methods({

  createDocument: function (options) {
    options = options || {};
    // just for safety
    delete options._id;
    
    if (!this.userId)
      throw new Meteor.Error(403, "you must be logged in");

    //TODO: for safety verify if data
    //      matches some given schema
    var data = options;
    //--------------------------
    data.meta = data.meta || {};
    data.meta.parent = options.parent;
    data.meta.createdBy = this.userId;
    data.meta.createdAt = new Date ();
    //--------------------------------
    return Documents.insert(data);
  },

});
