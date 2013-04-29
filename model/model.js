
/*
  admins : [],
*/

Settings = new Meteor.Collection ("settings");

/*
  owner     : '',
  createdAt : '',
  members   : [],
*/

Groups = new Meteor.Collection ("groups");

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

Variants = new Meteor.Collection ("variants");

VariantHistory = new Meteor.Collection("history");

/*
  createdBy : '',
  createdAt : '',
  answer    : {},
  data      : {},
  good      : true/false,
*/

Records = new Meteor.Collection("records");

/*
  createdBy : '',
  createdAt : '',
  index     : 0,
  step      : 1,
  link      : (document)
*/

define('model', [], function () {
  return {
    settings       : Settings,
    groups         : Groups,
    tags           : Tags,
    variants       : Variants,
    variantHistory : VariantHistory,
    records        : Records,
    documents      : Documents,
  }
});




