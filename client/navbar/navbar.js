
Template.navbar.helpers({
  widgets: function () {
    var settings = Settings.findOne({});
    if (settings)
      return settings.navbar;
    return [];
  },
});
