const mongoose = require("mongoose");

// Article Schema

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "An article must have a title"],
  },
  content: {
    type: String,
    required: [true, "An Article must have content"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Article = (module.exports = mongoose.model("Article", ArticleSchema));
module.exports = Article;
