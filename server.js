const express  = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const mongoose  = require('mongoose')

var cors = require('cors')

const api = require('./server/routes/api')

const port = 3000
const app = express()
app.use(cors())

const db = "mongodb://localhost/todolist"
mongoose.connect(db,function(err){
  if(err)
  {
    console.error("Error",err);
  }
  else
  {
    console.log(db);
  }
})

app.use(express.static(path.join(__dirname,'dist')))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use('/api',api)

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'))
})

app.listen(port,function(){
  console.log("Server runnnig on localhost"+port);
})
