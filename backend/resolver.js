const Post = require("./models/Post");

const resolver = {
  Query: {
    getPost: async (parent, args, context, info) => {
      //the query for getting the posts with desired filter
      let data;
      if (args.tag != null) {
        //filter on tag
        data = await Post.find({ tags: args.tag });
      } else {
        //no filter is chosen, sets data to all the results
        data = await Post.find();
      }

      return data;
    },
  },
};

module.exports = resolver;
