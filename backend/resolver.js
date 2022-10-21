const Post = require("./models/Post");

const resolver = {
  Query: {
    getPost: async () => {
      const data = await Post.find();
      return data;
    },
    //gets post to specific id passed in args
    getOnePost: async (parent, args, context, info) => {
      const data = await Post.find();
      return data.find((q) => q.id === args.id);
    },
  },
};

module.exports = resolver;
