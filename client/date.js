
Handlebars.registerHelper('date', function (date) {
  //TODO: localize it
  var months = [
    'stycznia', 'lutego', 'marca', 'kwietnia',
    'maja', 'czerwca', 'lipca', 'sierpnia',
    'września', 'października', 'listopada', 'grudnia'
  ];

  //TODO: || this.meta.createdAt
  date = date || this.createdAt;

  if (date === undefined)
    return '[unknown date]';

  if (typeof date === 'number')
    date = new Date(date);

  if (date instanceof Date)
  {
    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return day + " " + month + " " + year + ' godz. ' +
      hours + ':' + minutes;
  }

  return '[unknown date]';
});