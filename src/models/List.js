const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
   title: {
      type: String,
      require: true,
      trim: true
   },
   items: {
      type: Array,
      require: true
   },
   quantityItems: {
      type: Number
   },
   createdAt: {
      type: Date,
      default: Date.now()
   },
   buyedAt: {
      type: Date
   },
   buyedIn: {
      type: String,
      trim: true
   },
   totalCost: {
      type: Number
   },
   status: {
      type: String,
      require: true,
      default: 'Pendiente'
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User' 
   }
});

ListSchema.index({title: 'searchTitle'});

module.exports = mongoose.model('List', ListSchema);