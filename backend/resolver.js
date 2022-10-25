const Post = require("./models/Post");

const resolver = {
  // methods that get data from database
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

  // methods that changes/updates fields in the database
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
        return {
          code: error.extensions?.response.status, // can probably let it be null?
          success: false,
          message: error.extensions?.response.body, // can probably let it be null?
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
        return {
          code: error.extensions?.response.status, // can probably let it be null? or set to whatever we want
          success: false,
          message: error.extensions?.response.body, // can probably let it be null? or set to whatever we want
          post: null,
        };
      }
    },
  },
};

module.exports = resolver;
