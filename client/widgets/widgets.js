
var widgets = {}; // private cache
var instances = {};

Meteor.widgets = new Meteor.Collection(null, {
  transform: function (data) {
    var widget = getWidget(data._id);
    
    data.show = widget.show;
    data.edit = widget.edit;
    data.load = widget.load;

    return data;
  },// transform
});// Collection

var getWidget = function (id) {
  var widget = widgets[id] || (
    widgets[id] = {
      show : function () {},
      edit : function () {},
      load : function () {},
    });
  return widget;
};

Widgets = {};

_.extend(Widgets, {

  register: function (selector, options) {
    options = options || {};

    if (_.isFunction(options))
      // support for shorter arguments list
      options = { show: options };

    if (typeof selector === 'string')
      selector = {name:selector};

    //TODO: check if the selector is unique
    var widget = getWidget(Meteor.widgets.insert(selector));

    widget.show = options.show || widget.show;
    widget.edit = options.edit || widget.edit;
    widget.load = options.load || widget.load;
  },

  instance: function (name, options) {
    //TODO: let it be reactive ;)
    if (options === undefined)
      return instances[name];
    
    if (_.has(instances, name))
      throw new Error('Error: widget instance ' + name + ' already exists');
    //TODO: validate options
    instances[name] = options;
  },

});

define('widgets', [], function () {
  return Widgets;
});
