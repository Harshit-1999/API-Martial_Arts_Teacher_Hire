const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const routes=require('./routes/api');

const app=express();
 
//body-parser for post request
app.use(bodyParser.json());
app.use(express.static('public'));

//mongoose portion
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise=global.Promise; 


//app request
app.get("/",(req,res)=>{
  res.send({type:'get'});
});
app.put("/id",(req,res)=>{
  res.send({type:'delete'});
});

//middleware  for api route
app.use('/api',require('./routes/api'));

//error handling middleware
app.use((err,req,res,next)=>{
  
  console.log(err);
  // res.send('Name field is needed!!!');
  res.status(422).send({error:err._message});
});



//listen to port 
app.listen(3000,()=>{

  console.log("Server is running on port 3000!!");

});