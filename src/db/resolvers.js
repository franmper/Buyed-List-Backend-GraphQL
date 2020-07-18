const User = require("../models/User");
const List = require("../models/List");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const createToken = (user, secret, expiresIn) => {
  const { id, email, name } = user;
  return jwt.sign({ id, email, name }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getUser: async (_, {token}) => {},
    getLists: async (_, {}, context) => {},
    getListsById: async (_, {id}, context) => {},
    getListsByStatus: async (_, {status}, context) => {},
    getListsByCost: async (_, {cost}, context) => {},
    getListsByCreateDate: async (_, {date}, context) => {},
    getListsByBuyedDate: async (_, {date}, context) => {}
  },
  Mutation: {
    newUser: async (_, {user}) => {},
    authUser: async (_, {user}) => {},
    updateUser: async (_, {user}, context) => {},
    newList: async (_, {list}, context) => {},
    updateList: async (_, {id, list}, context) => {},
    deleteList: async (_, {id}, context) => {}
  }
};

module.exports = resolvers;
