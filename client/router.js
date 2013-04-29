
var SEARCH_PREFIX  = '/search';
var PAGE_PREFIX = '/page';

var makeSearchURL = function (options) {
	return SEARCH_PREFIX + '?' + getQueryString(options);
};

var makeDetailsURL = function (docId) {
	return PAGE_PREFIX + '/' + docId;
};

var getQueryString = function (options, prefix) {
	prefix = prefix || '';

	//TODO: decide how we should reset certain fields
	var keys = ['keywords', ];
	var data = {};
	options = options || {};
	_.each(keys, function (key) {
		var value;
		if (options.hasOwnProperty(key)) {
			// possibly set to undefined
			value = options[key];
		} else {
			value = Session.get(key);
		}
		if (value !== undefined)
			data[key] = value;
	});
	if (!_.isEmpty(data))
		return prefix + $.param(data);
	return '';
};

(function () {

	Handlebars.registerHelper('detailsURL', function () {
		return makeDetailsURL(this._id);
	});

	Handlebars.registerHelper('searchURL', function (options) {
		return makeSearchURL(getQueryString(options.hash));
	});

	var handlers = {};

	handlers[SEARCH_PREFIX] = function () {
		var query = $.deparam(this.querystring);
		Session.set('keywords', query.keywords);
		Session.set('document', undefined);
		Session.set('page', query.page);
		return 'search';
	};

	handlers[PAGE_PREFIX + '/:_id'] = function (docId) {
		//Session.set('keywords', undefined);
		var doc = Documents.findOne({_id:docId});
		if (doc)
			Session.set('document', doc._id);
		return 'details';
	};

	Meteor.Router.add(_.defaults(handlers, {
		'/': function () {
			var query = $.deparam(this.querystring);
			Session.set('document', undefined);
			return 'search';
		},
		'*': function () {
			Session.set('document', undefined);
			return 'not_found';
		},
	}));

})();
