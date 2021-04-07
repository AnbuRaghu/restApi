var express=require('express');
var app=express();
var user=require('./models/userModel');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var port=8080;
var mongoUrl='mongodb://127.0.0.1:27017/Edureka';// we parse the Db name 
 var router =require('./api')
//step 0
//setup bodyparsermiddleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//step 1
//create mongo connection and start server
mongoose.connect(mongoUrl,{useNewUrlParser:true},(err,client)=>{
    app.listen(port,()=>{
        console.log('server runs on port : '+port)
    })
})
//step 2
//Create landing page
app.get('/',(req,res)=>{
    res.send('Api crud server is Up !!!')
})
// step 3
// create all CRUD routes in expressJs

//step 3 a
//register routing object 
app.use('/api',router)
