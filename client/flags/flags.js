
Flags = {};

define('flags', [], function () {

  var flagPrefix = '';

  var flagKey = function (_id, name) {
    return flagPrefix + _id + '/' + name;
  };

  _.extend(Flags, {

    getFlagValue: function (_id, name) {
      return Session.get(flagKey(_id, name));
    },

    setFlagValue: function (_id, name, value) {
      Session.set(flagKey(_id, name), value);
    },

    removeFlag: function (_id, name) {
      Session.set(flagKey(_id, name), undefined);
    },

  });

  return Flags;

});

// EXPORTS

require('flags', function (flags) {

  Handlebars.registerHelper('flag', function (name) {
    return flags.getFlagValue(this._id, name);
  });

});
