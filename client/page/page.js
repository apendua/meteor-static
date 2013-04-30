
// COMMON DOCUMENT HELPERS

require('document', function (module) {
  Template.page.helpers({
    document: function () {
      console.log('fetching', module, module.fetch());
      return module.fetch();
    },
  });
});

