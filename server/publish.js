
Meteor.publish('users', function () {
  //return Meteor.users.find({}, {fields:{username:1}});
  //UNSAFE: dev only
  return Meteor.users.find({});
});

Meteor.publish('documents', function () {
  //UNSAFE: dev only
  return Documents.find({});

  //return Documents.find({$or:[
  //    {owner:this.userId},
  //    {status:'published'},
  //  ]});
});
