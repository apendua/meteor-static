

Meteor.startup(function () {

  Documents.remove({'meta.fake':true});

  var docs = [
    {
      title : 'Home page',
      alias : 'home',
      body  : 'This is just another boaring home page.',
    },
    {
      title : 'About us',
      alias : 'about',
      body  : 'Don\'t you know who we are?',
    },
    {
      title : 'Contact us',
      alias : 'contact',
      body  : 'So you wanna contact us, right?',
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
      if (typeof docData.body === 'array')
        docBody = docData.body;
      else if (typeof docData.body === 'string')
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
