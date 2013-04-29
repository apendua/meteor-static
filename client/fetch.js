
Handlebars.registerHelper('fetch', function (context, options) {
  if (context)
    return options.fn(context);
  return options.inverse(this);
});