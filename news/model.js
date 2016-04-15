var mongoose = require('mongoose');

var schemaOptions = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
};

var NewsArticleSchema = new mongoose.Schema(_.defaults({
  _hid: {
    type: String,
    unique: true
  },
  //"@context": { type: String, default: "http://schema.org" },
  //"@type": { type: String, default: "NewsArticle" },
  copyrightYear: {
    type: Number,//The year during which the claimed copyright for the CreativeWork was first asserted.
    default: '2015'
  },
  inLanguage: {
    type: String,//The language of the content. please use one of the language codes from the IETF BCP 47 standard.
    default: 'sv-SE'
  },
  isFamilyFriendly: {
    type: Boolean,//  Indicates whether this content is family friendly.
    default: true
  },
  keywords: {
    type: String,//Keywords or tags used to describe this content. Multiple entries in a keywords list are typically delimited by commas.
    default: 'racing,cars'
  },
}, require('mongopot/schemas/article')), schemaOptions);

NewsArticleSchema.plugin(require('mongopot/plugins/base'));

NewsArticleSchema.virtual('summary').get(function() {
  var summaryLength = 255;
  if(this.articleBody && this.articleBody.length > summaryLength) 
    return this.articleBody.substring(0,summaryLength).trim() + '...';
  else
    return this.articleBody;
});

NewsArticleSchema.pre('save', function (next) {
  var that = this;

  if(this.isNew || this.isModified('headline')) {
    var newId = _.kebabCase(this.headline).split(/åä/).join('a').split('ö').join('o');

    (function findUniqueId(index) {
      var hid = newId + (index ? '-' + index : '');

      that.model('NewsArticle').findOne({ _hid: hid }, function(err, newsArticle) {
        if(err) return next(err);
        
        if(newsArticle) return findUniqueId(++index || 1);

        that._hid = hid;
        next();
      });
    })();
  } else {
    next();
  }
});

module.exports = mongoose.model('NewsArticle', NewsArticleSchema);
