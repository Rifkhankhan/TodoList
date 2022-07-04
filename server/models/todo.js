const mongoose = require('mongoose');
const Schema = mongoose.Schema
const todoSchema = mongoose.Schema({
  id: String,
  itemName: String,
  itemDueDate: String,
  itemPriority: String,
  itemCategory: String
});


module.exports = mongoose.model('todo',todoSchema,'todolist');
