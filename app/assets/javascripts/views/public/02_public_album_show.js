TwinkieSetApp.Views.PublicAlbumShow = Backbone.CompositeView.extend({
  template: JST['public/public_album_show'],

  initialize: function (options) {
    // model is album
    this.listenTo(this.model, "sync", this.findFirstSubalbum);
    this.listenTo(this.model.subalbums(), "add", this.addSubalbum);
    this.model.subalbums().each(this.addSubalbum.bind(this));
    this.setID = options.setID;
    this.userID = options.userID;
    this.owner = options.album_owner;






  },

  findFirstSubalbum: function () {
    if (this.setID === null) {
      // if we don't have a route to determine our subalbum, we'll return the first one
      this.setID = this.model.get('first_subalbum_id');
    }
    console.log(this.setID);
    this.render();

    var subalbum = this.model.subalbums().getOrFetch(this.setID);
    var photosInSubalbum = new TwinkieSetApp.Views.PublicSubalbumPhotos({
      model: subalbum
    });

    $('.public-photos-index').html(photosInSubalbum.render().$el);
    var collectionID = this.model.id;

    // TODO find a way to get the owner from the album
    Backbone.history.navigate('#public/'+ this.userID +'/collection/'+ collectionID+ '/set/'+ this.setID, { trigger: true });
  },

  addSubalbum: function (subalbum) {
    var subview = new TwinkieSetApp.Views.PublicSubalbumItem({
      model: subalbum,
      user_id: this.userID
    });
    this.addSubview('.list-of-subalbums', subview);
  },

  render: function () {

    var windowHeight = $(window).height();

    $(window).resize(function () {
      var windowHeight = $(window).height();
    });
    var content = this.template({
      album: this.model,
      owner: this.owner
    });
    console.log(this.model);
    this.$el.html(content);
    var backgroundImage = this.model.get('cover_image_url');
    this.$el.find('.hero').css('background', "url(" + backgroundImage + ")");
    this.$el.find('.hero').css('background-size', "cover");
    this.$el.find('.hero').css('background-position', "center center");

    this.$el.find('.hero').css('height', windowHeight);

    this.attachSubviews();
    return this;
  }
});
