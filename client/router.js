
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

require('page', function (page) {

	Meteor.Router.add({
		'/search': { as: 'search', to: function () {
			var query = $.deparam(this.querystring);
			Session.set('keywords', query.keywords);
			page.setId(pageId);
			return 'search';
		}},
		'/page/:_id': { to: 'page', and: function (pageId) {
			var query = $.deparam(this.querystring);
			page.setEditing(query.edit);
			page.setId(pageId);
		}},
		'/': function () {
			var query = $.deparam(this.querystring);
			page.setId(undefined);
			return 'search';
		},
		'*': function () {
			page.setId(undefined);
			return 'not_found';
		},
	});

});
