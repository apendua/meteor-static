
// DOCUMENT RELATED ACTIONS

require('page', function (page) {

  // DOCUMENT ACTIONS

  Actions.register({
    object   : 'document',
    category : 'modify',
    action   : 'cancel',
  }, function (event) {
    // reload cache
    page.setEditing(false);
  });

  Actions.register({
    object   : 'document',
    category : 'modify',
    action   : 'edit',
  }, function (event) {
    page.setEditing(true);
  });

  Actions.register({
    object   : 'document',
    category : 'modify',
    action   : 'addChunk',
  }, function (event) {
    var chunks = page.chunks();
    chunks.push({
      type    : 'math',
      content : '[chunk content]'
    }, {parent : page.getId()});
  });

  // CHUNK ACTIONS

  Actions.register({
    object   : 'chunk',
    category : 'modify',
    action   : 'moveDown',
  }, function (event) {
    page.chunks().moveForward({_id:this._id});
  });

  Actions.register({
    object   : 'chunk',
    category : 'modify',
    action   : 'moveUp',
  }, function (event) {
    page.chunks().moveBackward({_id:this._id});
  });

  Actions.register({
    object   : 'chunk',
    category : 'modify',
    action   : 'remove',
  }, function (event) {
    page.chunks().remove({_id:this._id});
  });

  // ALLOW / DENY RULES

  Actions.allow({
    object   : 'document',
    category : 'annotate',
    action   : 'nextVariant',
  }, function (userId) {
    var unsolved = VariantHistory.find({
      createdBy : userId,
      link      : page.getId(),
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
