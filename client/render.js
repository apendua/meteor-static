
Handlebars.registerHelper('render', function (name, options) {
  var template = Template[name];
  if (template) {
    var context  = this;
    if (options.hash && _.has(options.hash, 'context'))
      context = options.hash.context;
    return new Handlebars.SafeString(template(context));
  }
  return '[unknown template]';
});
