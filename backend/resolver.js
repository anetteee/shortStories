const Quote = require("./models/Quote");

const resolver = {
  Query: {
    getQuote: async () => {
      const data = await Quote.find();
      return data;
    },
  },
};

module.exports = resolver;
