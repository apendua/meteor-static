
/*
  admins : [list of user IDs],
  navbar : [list of widgets],
*/

Settings = new Meteor.Collection ("settings");

/*
  createdAt : '',
  author    : '',
  name      : '',
  count     :  0,
*/

Tags = new Meteor.Collection ("tags");

/* 
  meta : {
    parent    : { default: '', readonly: true }, // maybe link?
    createdBy : { default: '', readonly: true },
    createdAt : { default:  0, readonly: true },
    origin    : { default: '' },
    votes     : { default: 0 },
    status : {
        default: 'draft',
        options: ['draft', 'published'],
      },
  },
  head : {
    title       : { default: '' },
    description : { default: '' },
  },
  body : [ // list of chunks
    {
      type    : { default: 'math' },
      content : '',
    },
  ],
  tags : { default: [] },
  type : {
    default: 'problem',
    options: ['problem', 'comment', 'solution', 'theorem', 'proof'],
  },
  data : {},
};
*/

Documents = new Meteor.Collection ("documents");

require('tags', function (tags) {
  tags.TagsMixin(Documents);
});

/*var DocumentCache = null;

if (Meteor.isClient) {
  require('GenericManager', function (GenericManager) {
    DocumentCache = new GenericManager(Documents, {
      name : 'DocumentCache',
    });
  });
}*/

/*
  type : '',
  link : '',
  data : {},
  rank : 0,
*/

define('model', [], function () {
  return {
    settings       : Settings,
    tags           : Tags,
    documents      : Documents,
  }
});




