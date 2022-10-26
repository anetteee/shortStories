const Post = require("./models/Post");

const resolver = {
  Query: {
    getPost: async () => {
      const data = await Post.find();
      return data;
    },

    getPostsBySearch: async (parent, args, context, info) => {
      var regExp = new RegExp(args.input, "i");
      const data = await Post.find({ title: { $regex: regExp } });
      return data;
    },
  },
};

module.exports = resolver;
