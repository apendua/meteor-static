
define('cache', [], function () {

//TODO: cache should survive any kind of page reloads
//TODO: check if cache is in locked state on reload

Cache = function () {
  this._dependency = new Deps.Dependency;
  this._doc = null;
};

Cache.prototype.clone = function () {
  Deps.depend(this._dependency);
  return EJSON.clone(this._doc);
};

Cache.prototype.stop = function () {};

Cache.prototype.fetch = function (getter) {
  if (!_.isFunction(getter))
    throw new Error('Cache.fetch: getter must be a function');
  var self = this;
  self.stop();
  self._getter = getter;
  self._paused = false;
  self._handle = Deps.autorun(function () {
    if (!self._paused)
      self._update(self._getter({reactive:true}));
    else
      // reload will be required
      self._reload = true;
  });
  self.stop = function () {
    if (self._handle)
      self._handle.stop();
    self._handle = null;
  };
  return self;
};

Cache.prototype.resume = function () {
  if (this._handle) {
    if (this._paused) {
      this._paused = false;
      if (this._reload)
        this.reload();
    }
  } else if (self._getter)
    self.fetch(self._getter);
};

Cache.prototype.reload = function () {
  if (this._getter) {
    this._update(this._getter({reactive:false}));
    if (this._reload)
      this._reload = false;
  }
};

Cache.prototype.save = function (action) {
  var self = this, object = {};
  _.each(this._doc, function (value, key) {
    if (_.isArray(value))
      object[key] = self[key].find({}).fetch();
    else
      object[key] = value;
  });
  //-----------------------
  if (_.isFunction(action))
    return action.call(this, object);
  return object;
};

Cache.prototype._update = function (doc) {
  if (EJSON.equals(doc, this._doc))
    return;
  this._doc = EJSON.clone(doc);
  this._dependency.changed();
  var self = this;
  _.each(doc, function (value, key) {
    if (_.isArray(value)) {
      if (self[key] === undefined)
        self[key] = new Meteor.List(null);
      else
        self[key].remove({});
      //-----------------------------
      _.each(value, function (item) {
        self[key].push(item);
      });
    }//isArray
  });//each
};

return Cache;

});
