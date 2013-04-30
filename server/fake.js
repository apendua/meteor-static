

Meteor.startup(function () {

  Documents.remove({'meta.fake':true});

  var docs = [
    {
      title : 'Home page',
      alias : 'home',
      body  : [
        {
          type    : 'math',
          content : 'Home page',
        },
        {
          type    : 'math',
          content : 'This is just another boaring home page.',
        },
        {
          type    : 'math',
          content : 'About us',
        },
        {
          type    : 'math',
          content : 'Don\'t you know who we are?',
        },
        {
          type    : 'math',
          content : 'About them',
        },
        {
          type    : 'math',
          content : 'Don\'t you know who they are?',
        },
        {
          type    : 'math',
          content : 'Contact us',
        },
        {
          type    : 'math',
          content : 'So you wanna contact us, right?',
        },
      ]
    },
    {
      title : 'Documentation',
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

  makeDocs(docs);
  
  makeUser('admin', 'admin@fake.org');
  makeUser('guest', 'guest@fake.org');

});
