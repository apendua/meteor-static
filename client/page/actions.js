
// DOCUMENT RELATED ACTIONS

require(['document'], function (doc) {

  // DOCUMENT ACTIONS

  Actions.register({
    object   : 'document',
    category : 'annotate',
    action   : 'nextVariant',
  }, function () {
    Meteor.call('nextVariant', doc.getId(), function (err, varId) {
      if (!err)
        doc.setVariant(varId);
    });
  });

  Actions.register({
    object   : 'document',
    category : 'modify',
    action   : 'cancel',
  }, function (event) {
    doc.reload();
    doc.setEditing(false);
  });

  Actions.register({
    object   : 'document',
    category : 'modify',
    action   : 'edit',
  }, function (event) {
    doc.setEditing(true);
  });

  Actions.register({
    object   : 'document',
    category : 'modify',
    action   : 'addChunk',
  }, function (event) {
    var chunks = doc.chunks();
    chunks.push({
      type    : 'math',
      content : '[chunk content]'
    }, {parent : doc.getId()});
  });

  // CHUNK ACTIONS

  Actions.register({
    object   : 'chunk',
    category : 'modify',
    action   : 'moveDown',
  }, function (event) {
    doc.chunks().moveForward({_id:this._id});
  });

  Actions.register({
    object   : 'chunk',
    category : 'modify',
    action   : 'moveUp',
  }, function (event) {
    doc.chunks().moveBackward({_id:this._id});
  });

  Actions.register({
    object   : 'chunk',
    category : 'modify',
    action   : 'remove',
  }, function (event) {
    doc.chunks().remove({_id:this._id});
  });

  // ALLOW / DENY RULES

  Actions.allow({
    object   : 'document',
    category : 'annotate',
    action   : 'nextVariant',
  }, function (userId) {
    var unsolved = VariantHistory.find({
      createdBy : userId,
      link      : doc.getId(),
      good      : {$exists:false}
    }).count();
    return unsolved < 3;
  });

  Actions.deny({
    object   : 'document',
    category : 'annotate',
  }, function (userId) {
    return !userId;
  });

  Actions.allow({
    object   : 'document',
    category : 'modify',
  }, function (userId, doc) {
    return true;
  });

  Actions.deny({
    object   : 'document',
    category : 'modify',
  }, function (userId, doc) {
    //TODO: deny if not owner
    return false;
  });

  Actions.allow({
    object   : 'chunk',
    category : 'modify',
  }, function (event) {
    return true;
  });

});