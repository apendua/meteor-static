
Documents.allow({
  insert : function () {
    return false;
  },
  update: function (userId, doc, fieldNames, modifier) {
    if (!userId)
      return false;
    //-----------------------------------
    return doc.meta.createdBy === userId;
  },
  remove: function (userId, doc) {
    if (!userId)
      return false;
    return doc.meta.createdBy === userId;
  },
});
