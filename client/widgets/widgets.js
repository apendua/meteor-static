
var widgets = {}; // private cache
var instances = {};

Meteor.widgets = new Meteor.Collection(null, {
  transform: function (data) {
    var widget = getWidget(data._id);
    
    data.render = widget.render;
    data.fetch  = widget.fetch;

    return data;
  },// transform
});// Collection

var getWidget = function (id) {
  var widget = widgets[id] || (
    widgets[id] = {
      render : function () {},
      fetch  : function () {},
    });
  return widget;
};

Widgets = {};

_.extend(Widgets, {

  register: function (selector, options) {
    options = options || {};

    if (_.isFunction(options)) {
      // supply shorter arguments list
      if (selector.type === 'source')
        options = { fetch: options };
      else options = { render: options };
    }

    if (typeof selector === 'string')
      selector = {name:selector};

    //TODO: check if the selector is unique
    var widget = getWidget(Meteor.widgets.insert(selector));

    widget.render = options.render || widget.render;
    widget.fetch  = options.fetch  || widget.fetch;
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
