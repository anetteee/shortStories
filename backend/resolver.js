const Post = require("./models/Post");

const resolver = {
  Query: {
    getPost: async (parent, args, context, info) => {
      let data;

      //sets the sort orders for sorting on the queries
      let sortOrder = -1; //sets standard as descending
      if (args.sortBy != null) {
        if (args.sortBy === "asc") {
          sortOrder = 1; //sets ascending
        } else {
          sortOrder = -1; //sets descending
        }
      }

      /*Returns data with a number of posts (limit) from the (offset) number post.
      Returns desired data based on inputs 
      and sorts by wanted order*/

      //search on the whole input, caseinsensitive
      var regExp = new RegExp("\\b" + args.input + "\\b", "i");
      if (args.tag != null && args.input != null) {
        //filter on tag and search
        data = await Post.find({
          tags: args.tag,
          title: { $regex: regExp },
        })
          .sort({ reactions: sortOrder })
          .limit(parseInt(args.limit))
          .skip(parseInt(args.offset));
        //filter on tag
      } else if (args.tag != null) {
        data = await Post.find({ tags: args.tag })
          .sort({
            reactions: sortOrder,
          })
          .limit(parseInt(args.limit))
          .skip(parseInt(args.offset));
        //filter on search
      } else if (args.input != null) {
        data = await Post.find({ title: { $regex: regExp } })
          .sort({
            reactions: sortOrder,
          })
          .limit(parseInt(args.limit))
          .skip(parseInt(args.offset));
      } else {
        //no search or filter is chosen, sets data to all the results
        data = await Post.find()
          .sort({ reactions: sortOrder })
          .limit(parseInt(args.limit))
          .skip(parseInt(args.offset));
      }

      return data;
    },
  },
};

module.exports = resolver;
