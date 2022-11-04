const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolver = require("./resolver");

async function startServer() {
  const app = express();

  //creates server with schema and resolver function for the fields in the schema
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolver,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });

  //Connect to the database
  await mongoose.connect(
    "mongodb://admin:passord123@it2810-27.idi.ntnu.no:27017/admin?directConnection=true",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  app.listen({ port: 4000 }, () =>
    console.log(
      `Server is running at http://localhost:4000${apolloServer.graphqlPath}`
    )
  );
}

startServer();
