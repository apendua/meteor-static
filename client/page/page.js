
Template.page.helpers({
  history: function () {
    return VariantHistory.find({link:Session.get('document')});
  },
});

// COMMON DOCUMENT HELPERS

require('document', function (module) {
  Template.page.helpers(module.getHelpers());
});

