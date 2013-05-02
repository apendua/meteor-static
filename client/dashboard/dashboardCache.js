
require('dashboard', function (dashboard) {

  Meteor.subscribe('dashboard', function () {
    // ony create this cache if someone really wants to edit dashboard
    define('dashboard/cache', ['cache', ], function () {
      // initialize dashboard cache for easy & safe editing
      Dashboard.find({}).forEach(function (item) {
        var cache = new Cache();
        cache.fetch(function () {
          return Dashboard.findOne({region:item.region});
        });
        //-----------------------------
        dashboard[item.region] = cache;
      });
      return _.extend(dashboard, {
        getActive: function () {
          var region = Session.get('dashboardRegion');
          var cache = this[region];
          return _.extend(cache.clone(), {
            // replace widgets list with cursor
            widgets: cache.widgets.find({}),
          });
        },
      });
    });
  });

});
