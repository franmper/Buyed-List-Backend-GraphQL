const { ApolloServer } = require("apollo-server");
const typeDefs = require("./db/schemas");
const resolvers = require("./db/resolvers");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

connectDB();

const PORT = process.env.PORT || 5500;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const user = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.SECRET_KEY
        );
        return { user };
      } catch (e) {
        console.log(e);
      }
    }
  }
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`servidor listo en la url ${url}`);
});
