
Template.documentBrief.helpers({
  firstChunk: function () {
    return this.body[0] || this.body || {};
  },
});