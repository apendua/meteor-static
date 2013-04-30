
/*

PROBLEMS:
1. cycles
2. dependency in leafs,
   changes in lower parts of the tree
*/

ReactiveObject = function () {
  this._properties = {};
  this._dependency = {};
};

ReactiveObject.prototype = {};

var set = function (key, value, data, deps) {
  var dotLocation = key.indexOf('.');
  var rest = key.substr(dotLocation + 1);
  deps = deps[prop] || (
      deps[prop] = {}
    );
  if (deps._dependency)
    deps._dependency.changed();
  if (rest) {
    data = data[prop] || (
        data[prop] = {}
      );
    set(restKey, value, data, deps);
  } else {
    data[prop] = value;
  }
};

ReactiveObject.prototype.set = function (key, value) {
  var dotLocation = key.indexOf('.');
  var rest = key.substr(dotLocation + 1);
  var path = key.split('.');
  var data = this._properties;
  var deps = this._dependency;
  _.each(path, function (prop) {
    data = data[prop] || (
        data[prop] = {}
      );
    deps = deps[prop] || (
        deps[prop] = {}
      );
  });
};

ReactiveObject.prototype.get = function (key) {

};

ReactiveObject.prototype.has = function (key) {

};

ReactiveObject.prototype.changed = function (key) {
  var path = key.split('.');
  var deps = this._dependency;
  _.each(path, function (prop) {
    deps = deps[prop] || (
        deps[prop] = {}
      );
  });
};

ReactiveObject.prototype.depend = function (key) {

};
