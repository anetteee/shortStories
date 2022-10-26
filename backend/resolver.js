const Post = require("./models/Post");

const resolver = {
  Query: {
    getPost: async (parent, args, context, info) => {
      let data;
      //search on the whole input, caseinsensitive
      var regExp = new RegExp("\\b" + args.input + "\\b", "i");
      if (args.tag && args.input != null) {
        //filter on tag and search
        data = await Post.find({ tags: args.tag, title: { $regex: regExp } });
        //filter on tag
      } else if (args.tag != null) {
        data = await Post.find({ tags: args.tag });
        //filter on search
      } else if (args.input != null) {
        data = await Post.find({ title: { $regex: regExp } });
      } else {
        //no search or filter is chosen, sets data to all the results
        data = await Post.find();
      }

      return data;
    },
  },
};

module.exports = resolver;
