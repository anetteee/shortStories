const Post = require("./models/Post");

const resolver = {
  //methods that get data from database
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

  //methods that changes/updates fields in the database
  Mutation: {
    //increments the reaction count of the spesific post by id
    incrementReaction: async (_, { id }) => {
      try {
        const data = await Post.find({ id: id });
        //returns a default IncrementReactionResponse if data is null
        if (data.length === 0) {
          return {
            code: 404,
            success: false,
            message: "Post not found",
            post: null,
          };
        }
        const reaction = data[0].reactions;
        const post = await Post.findOneAndUpdate(
          { id: id },
          { $set: { reactions: reaction + 1 } },
          { returnOriginal: false }
        );
        //returns post if succsessfull
        return {
          code: 200,
          success: true,
          message: `Succsessfully incremented number of reactions for post ${id}`,
          post,
        };
      } catch (error) {
        //returns a default respons
        return {
          code: 404,
          success: false,
          message: "Unknown error",
          post: null,
        };
      }
    },
    //decreases the reaction count of the spesific post by id
    decreaseReaction: async (_, { id }) => {
      try {
        const data = await Post.find({ id: id });
        //returns a default DecreaseReactionResponse if data is null
        if (data.length === 0) {
          return {
            code: 404,
            success: false,
            message: "Post not found",
            post: null,
          };
        }
        const reaction = data[0].reactions;
        const post = await Post.findOneAndUpdate(
          { id: id },
          { $set: { reactions: reaction - 1 } },
          { returnOriginal: false }
        );
        //returns post if succsessfull
        return {
          code: 200,
          success: true,
          message: `Succsessfully incremented number of reactions for post ${id}`,
          post,
        };
      } catch (error) {
        // returns a default response
        return {
          code: 404,
          success: false,
          message: "Unknown error",
          post: null,
        };
      }
    },
  },
};

module.exports = resolver;
