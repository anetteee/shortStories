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

  Mutation: {
    //increments the reaction count of the spesific post by id
    incrementReaction: async (_, { id }) => {
      try {
        console.log(id);
        const data = await Post.find({ id: id });
        console.log(data);
        if (data.length === 0) {
          return {
            code: 404,
            success: false,
            message: "Post not found",
            post: null,
          };
        }
        const reaction = data[0].reactions;
        console.log(reaction);
        const post = await Post.findOneAndUpdate(
          { id: id },
          { $set: { reactions: reaction + 1 } },
          { returnOriginal: false }
        );
        console.log(post);
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
  },
};

module.exports = resolver;
