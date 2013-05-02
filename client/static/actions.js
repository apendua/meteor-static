Actions.register({
  module : 'static',
  object : 'module',
  type   : 'modify',
  action : 'removePage',
}, function () {
  //TODO: show remove page dialog
  console.log('removing current page');
});

Actions.allow({
  module : 'static',
  object : 'module',
  type   : 'modify',
}, function () {
  //TODO: be more restrictive
  return true;
});