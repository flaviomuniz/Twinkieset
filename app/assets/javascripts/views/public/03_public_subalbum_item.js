TwinkieSetApp.Views.PublicSubalbumItem = Backbone.View.extend({
  template: JST['public/public_subalbum_item'],

  initialize: function (options) {
    this.user_id = options.user_id
    console.log(this.user_id)
    //this.model is a subalbum
  },

  events: {
    "click": "changeSubalbum",
    "testingThis": "changeSubalum"
  },

  changeSubalbum: function (event) {
    alert('ewlafjwel');
    var photosInSubalbum = new TwinkieSetApp.Views.PublicSubalbumPhotos({
      model: this.model
    });
    $('.holder').html(photosInSubalbum.render().$el);

    // TODO implemnt backbone navigate trigger with assocation instead
    var user_id = this.user_id;

    var collection_id = this.model._album.id;
    var set_id = this.model.id;
    Backbone.history.navigate("#public/" + user_id + "/collection/" + collection_id + "/set/" + set_id);

  },

  render: function () {
    var content = this.template({
      subalbum: this.model
    });
    this.$el.html(content);
    return this;
  }
});