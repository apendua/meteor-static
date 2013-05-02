
// DOCUMENT RELATED ACTIONS

require('page', function (page) {

  // DOCUMENT ACTIONS

  Actions.register({
    object   : 'document',
    category : 'modify',
    action   : 'cancel',
  }, function (event) {
    page.reload();
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
    });
  });

  // CHUNK ACTIONS

  Actions.register({
    object   : 'chunk',
    category : 'modify',
    action   : 'moveDown',
  }, function (event) {
    page.chunks.moveForward({_id:this._id});
  });

  Actions.register({
    object   : 'chunk',
    category : 'modify',
    action   : 'moveUp',
  }, function (event) {
    page.chunks.moveBackward({_id:this._id});
  });

  Actions.register({
    object   : 'chunk',
    category : 'modify',
    action   : 'remove',
  }, function (event) {
    page.chunks.remove({_id:this._id});
  });

  // ALLOW / DENY RULES

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
