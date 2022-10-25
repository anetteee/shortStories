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
    //gets post to specific tag passed in args
    getPostOnTag: async (parent, args, context, info) => {
      console.log(args.tag2);
      const data = await Post.find({ tags: args.tag, tags: args.tag2 });
      return data;
    },
  },
};

module.exports = resolver;
