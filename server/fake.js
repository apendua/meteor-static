

Meteor.startup(function () {

  Documents.remove({'meta.fake':true});

  var docs = [
    {
      title : 'Home page',
      alias : 'home',
      body  : [
        {
          type    : 'section',
          title   : 'Home page',
          content : 'Home page',
        },
        {
          type    : 'markdown',
          content : 'This is just another boaring home page.',
        },
        {
          type    : 'section',
          title   : 'About us',
          content : 'About us',
        },
        {
          type    : 'markdown',
          content : 'Don\'t you know who we are?',
        },
        {
          type    : 'section',
          title   : 'About them',
          content : 'About them',
        },
        {
          type    : 'markdown',
          content : 'Don\'t you know who they are?',
        },
        {
          type    : 'section',
          title   : 'Contact us',
          content : 'Contact us',
        },
        {
          type    : 'markdown',
          content : 'So you wanna contact us, right?',
        },
      ]
    },
    {
      title : 'Docs',
      alias : 'docs',
      body  : 'This is a very simple documentation page',
    },
   
  ];

  var makeUser = function(name, email) {
    //TODO: check if email unique
    var uid = undefined, user = Meteor.users.findOne({username:name});
    if (!user)
      uid = Accounts.createUser({username: name, email: email, password: 'password'});
    else uid = user._id;
    //--------------------------------------
    Meteor.users.update({_id: uid}, {$set: {
      //gravatar : '' + Gravatar.hash(email),
      isFake   : true,
    }});
    return uid;
  };

  var makeDocs = function (docs) {
    var IDs = [], date = new Date();
    for (var i=0; i<docs.length; i++) {
      var docData = docs[i];
      var docMeta = {fake:true, createdAt:date};
      var docHead = {title:docData.title};
      var docBody = [];
      // parse slide meta
      docMeta.type = docData.type || 'problem';
      // parse slide body
      if (_.isArray(docData.body))
        docBody = docData.body;
      else if (_.isString(docData.body))
        docBody = [{
          type    : 'math',
          content : docData.body,
        }, ];
      // insert the slide into collection and save it's id
      IDs.push(Documents.insert({
        meta: docMeta,
        head: docHead,
        body: docBody,
      }));
    }
    return IDs;
  };

  var makeSettings = function (options) {
    var settings = Settings.findOne({});
    if (!settings) {
      return Settings.insert(options);
    }
    Settings.update({_id:settings._id}, options);
    return settings._id;
  };

  makeDocs(docs);
  
  var adminId = makeUser('admin', 'admin@fake.org');
  var guestId = makeUser('guest', 'guest@fake.org');

  // SETTINGS

  makeSettings({
    admins  : [adminId, ],
    regions : {
      'navbar'    : [],
      'leftPanel' : [],
    }
  });

});
