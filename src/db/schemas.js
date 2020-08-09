const { gql } = require("apollo-server");

const typeDefs = gql`
   type User {
      id: ID
      name: String
      email: String
      createdAt: String
   }
   type List {
      id: ID
      title: String
      items: [ListItem]
      quantityItems: Int
      createdAt: String
      buyedAt: String
      buyedIn: String
      totalCost: Float
      status: ListStatus
      userId: ID
   }
   type ListItem {
      id: ID
      name: String
      cost: Float
      quantity: Int
      brand: String
      description: String
   }
   type Token {
      token: String
   }
   enum ListStatus {
      Pendiente
      Comprado
      Cancelado
   }

   input UserInput {
      name: String
      email: String!
      password: String!
   }
   input UserUpdateInput {
      name: String
      email: String
      password: String
   }
   input AuthInput {
      email: String!
      password: String!
   }
   input ListInput {
      title: String
      items: [ListItemInput]
      buyedAt: String
      buyedIn: String
      status: ListStatus
   }
   input ListItemInput {
      name: String!
      cost: Float!
      quantity: Int!
      brand: String
      description: String
   }

   type Query {
      getUser(token: String!): User

      getLists: [List]
      getListsById(id: ID!): List
      getListsByStatus(status: String!): [List]
      getListsByCost(cost: Int!): [List]
      getListsByCreateDate(date: String!): [List]
      getListsByBuyedDate(date: String!): [List]
   }
   type Mutation {
      newUser(user: UserInput): User
      authUser(user: AuthInput): Token
      updateUser(id: ID!, user: UserUpdateInput): User

      newList(list: ListInput): List
      updateList(id: ID!, list: ListInput): List
      deleteList(id: ID!): String
   }
`;

module.exports = typeDefs;