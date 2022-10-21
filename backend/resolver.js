const Quote = require("./models/Quote");

const resolver = {
  Query: {
    getQuote: async () => {
      const data = await Quote.find();
      return data;
    },
    //gets quote to specific id passed in args
    getOneQuote: async (parent, args, context, info) => {
      const data = await Quote.find();
      return data.find((q) => q.id === args.id);
    },
  },
};

module.exports = resolver;
