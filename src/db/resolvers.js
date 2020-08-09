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
    getUser: async (_, {token}) => {
      const userId = await jwt.verify(token, process.env.SECRET_KEY);
      return userId;
    },
    getLists: async (_, {}, context) => {
      try {
        const lists = List.find({userId: context.user.id.toString()});
        return lists;
      } catch (e) {
        console.log(e);
      }
    },
    getListsById: async (_, {id}, context) => {
      try {
        const list = List.findById(id);
        if(list.userId.toString() !== context.user.id ) throw new Error("No tiene autorizacion para actualizar al usuario");
        if(!list) throw new Error("Lista no encontrada.");
        return list;
      } catch (e) {
        console.log(e);
      }
    },
    getListsByStatus: async (_, {status}, context) => {
      try {
        const lists = List.find({userId: context.user.id.toString(), status: status});
        return lists;
      } catch (e) {
        console.log(e);
      }
    },
    getListsByCreateDate: async (_, {date}, context) => {
      try {
        const lists = List.find({userId: context.user.id.toString(), createdAt: date});
        return lists;
      } catch (e) {
        console.log(e);
      }
    },
    getListsByBuyedDate: async (_, {date}, context) => {
      try {
        const lists = List.find({userId: context.user.id.toString(), buyedAt: date});
        return lists;
      } catch (e) {
        console.log(e);
      }
    }
  },
  Mutation: {
    newUser: async (_, {user}) => {
      console.log(user);
      const { email, password } = user;
      const userExist = await User.findOne({ email });
      if(userExist) throw new Error("El email fue utilizado para otro usuario ya registrado.");
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);
      try {
        const newUser = new User(user);
        return newUser.save();
      } catch (e) {
        console.log(e);
      }
      return 'Creando usuario...'
    },
    authUser: async (_, {user}) => {
      const { email, password } = user;
      const userExist = await User.findOne({ email });
      if(!userExist) throw new Error("El email no esta registrado.");
      const checkPass = await bcryptjs.compare(password, userExist.password);
      if(!checkPass) throw new Error("La contraseña es incorrecta.");
      return {
        token: createToken(userExist, process.env.SECRET_KEY, "7d")
      }
    },
    updateUser: async (_, {id, user}, context) => {
      if(id.toString() !== context.user.id ) throw new Error("No tiene autorizacion para actualizar al usuario");
      let userToUpdate = await User.findById(id);
      if(!userToUpdate) throw new Error("Usuario no encontrado");
      userToUpdate = await User.findOneAndUpdate({_id: id}, user, {new: true});
      return userToUpdate;
    },
    newList: async (_, {list}, context) => {
      const newList = new List(list);
      newList.userId = context.user.id;
      newList.totalCost = 0;
      newList.quantityItems = 0;
      for await (const item of list.items) {
        const { quantity, cost } = item;
        newList.totalCost += cost;
        newList.quantityItems += quantity;
      }
      return newList.save();
    },
    updateList: async (_, {id, list}, context) => {
      const listExist = await List.findById(id);
      if(!listExist) throw new Error("Lista no encontrada.");
      if(listExist.userId.toString() !== context.user.id ) throw new Error("No tiene autorizacion para actualizar al usuario");
      listExist.totalCost = 0;
      listExist.quantityItems = 0;
      // let itemsNewArray = listExist.items;
      if(list.items) {
        for await (const item of list.items) {
          // itemsNewArray.push(item);
          const { quantity, cost } = item;
          listExist.totalCost += cost;
          listExist.quantityItems += quantity;
        }
      }
      if(list.status){
        list.buyedAt = Date.now();
      }
      const listToUpdate = await List.findOneAndUpdate({_id: id}, list, {new: true})
      return listToUpdate;
    },
    deleteList: async (_, {id}, context) => {
      const listExist = await List.findById(id);
      if(!listExist) throw new Error("Lista no encontrada.");
      if(listExist.userId.toString() !== context.user.id ) throw new Error("No tiene autorizacion para actualizar al usuario");
      await List.findByIdAndDelete({_id: id});
      return 'Lista eliminada';
    }
  }
};

module.exports = resolvers;
