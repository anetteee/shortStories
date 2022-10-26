const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    userId: {
      type: Number,
    },
    tags: {
      type: [String],
    },
    reactions: {
      type: Number,
    },
  },
  { collection: "posts" }
);

const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
