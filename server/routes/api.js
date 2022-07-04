const express = require('express')
const router = express.Router()
const mongoose  = require('mongoose')


const Todo = require('../models/todo')
mongoose.Promise = global.Promise


router.get('/',function(req,res){
  res.send('api works')
});

router.get('/lists',function(req,res){
  console.log("Get Request For all lists");
  Todo.find({}).exec(function(err,lists){
    if(err)
    {
      console.log('Error Retriving lists');
    }
    else
    {
      res.json(lists)
    }
  })
})


router.get('/lists/:id',function(req,res){
  console.log("Get Request For a list");
  Todo.findById(req.params.id).exec(function(err,list){
    if(err)
    {
      console.log('Error Retriving list');
    }
    else
    {
      res.json(list)
    }
  })
})


router.post('/insertlist',function(req,res){
  console.log("Post Request For a list");
  var newlist = new Todo();
  newlist.itemName = req.body.itemName
  newlist.itemDueDate = req.body.itemDueDate
  newlist.itemPriority = req.body.itemPriority
  newlist.itemCategory = req.body.itemCategory

  newlist.save(function(err,insertedlist){
    if(err)
    {
      console.log("Error saving List");
    }
    else
    {
      res.json(insertedlist)
    }
  })
})



router.post('/updateList/:id',function(req,res){
  console.log("Update Request For a List");

  Todo.findByIdAndUpdate(req.params.id,{
    $set:{
      itemName : req.body.itemName,
      itemDueDate : req.body.itemDueDate,
      itemPriority : req.body.itemPriority,
      itemCategory : req.body.itemCategory,

    }
  },
  {
    new:true
  },
  function(err,updatedlist){
    if(err)
    {
      res.send("Error Updating Video")
    }
    else
    {
      res.json(updatedlist)
    }
  })
})


router.delete('/Delete/:id',function(req,res){
  console.log("Delete Request For a list");

  Video.findByIdAndRemove(req.params.id,function(err,deletedlist){
    if(err)
    {
      res.send("Error Deleting list")
    }
    else
    {
      res.json(deletedlist)
    }
  })

})


module.exports = router
