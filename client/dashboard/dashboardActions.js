
define('dashboard/actions', ['dashboard/cache', ], function (dashboard) {

  Actions.register({
    module : 'dashboard',
    object : 'region',
    type   : 'modify',
    action : 'edit',
  }, function () {
    console.log('editing');
  });

  Actions.register({
    module : 'dashboard',
    object : 'region',
    type   : 'modify',
    action : 'addWidget',
  }, function (event, template) {
    dashboard[template.data.region]
      .widgets.push({
        //TODO: use dialog
        widget: {},
        source: {},
        config: {},
      });
  });

  Actions.register({
    module : 'dashboard',
    object : 'region',
    type   : 'modify',
    action : 'removeWidget',
  }, function (event, template) {
    dashboard[template.data.region]
      .widgets.remove({_id:this._id});
  });

  Actions.register({
    module : 'dashboard',
    object : 'region',
    type   : 'modify',
    action : 'moveWidgetUp',
  }, function (event, template) {
    dashboard[template.data.region]
      .widgets.moveBackward({_id:this._id});
  });

  Actions.register({
    module : 'dashboard',
    object : 'region',
    type   : 'modify',
    action : 'moveWidgetDown',
  }, function (event, template) {
    dashboard[template.data.region]
      .widgets.moveForward({_id:this._id});
  });

  Actions.allow({
    module : 'dashboard',
  }, function () {
    return true;
  });

});

