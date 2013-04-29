
getQueryString = function (options, prefix) {
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

makeSearchPath = function (options) {
	return Meteor.Router.searchPath() + '?' + getQueryString(options);
};

Meteor.Router.add({
	'/search': { as: 'search', to: function () {
		var query = $.deparam(this.querystring);
		Session.set('keywords', query.keywords);
		Session.set('document', undefined);
		Session.set('page', query.page);
		return 'search';
	}},
	'/page/:_id': { as: 'page', to: function (docId) {
		var doc = Documents.findOne({_id:docId});
		if (doc)
			Session.set('document', doc._id);
		return 'page';
	}},
	'/': function () {
		var query = $.deparam(this.querystring);
		Session.set('document', undefined);
		return 'search';
	},
	'*': function () {
		Session.set('document', undefined);
		return 'not_found';
	},
});
