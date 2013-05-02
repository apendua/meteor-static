require('widgets', function () {

Widgets.register({
  name: 'login',
}, function (data) {
  return Template.accountMenu(data);
});

Widgets.instance('login', {
  widget: { name: 'login', },
  source: { name: 'login', },
  config: {},
});

});