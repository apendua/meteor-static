
Handlebars.registerHelper('renderSearchBox', function () {
  if (Template.searchBox)
    return new Handlebars.SafeString(Template.searchBox(this));
});