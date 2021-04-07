var express=require('express');
var app=express();
var user=require('./models/userModel');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var port=8080;
var mongoUrl='mongodb://127.0.0.1:27017/Edureka';// we parse the Db name 
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
//create of crud
app.post('/user',(req,res)=>{
    user.insert(req.body,(err,result)=>{
        if(err) res.send(500,err);
        res.send('data inserted :'+ JSON.stringify(result))

    })
});
 //step 3b
 //read of crud
 app.get('/user/:name',(req,res)=>{
     user.findOne({name:req.params.name},(err,result)=>{
         if(err) res.send(500,err);
         res.send('data found : '+ JSON.stringify(result))
     })
 })
 //step 3c
 //update of crud
 app.put('/user',(req,res)=>{
     let updateObj={
         name:req.body.name,
         city:req.body.city,
         job:req.body.job
     };
     user.findOneAndUpdate({name:req.body.name},
        {$set:updateObj},
        {upsert:true},// if the particular obj doesnt exist it create the obj
        (err,result)=>{
            if(err)res.send(500,err);
            res.send('data updated : '+JSON.stringify(result))
        }
        )
 })
 //step 3d
 //delete of crud
 app.delete('/user',(req,res)=>{
     user.findOneAndDelete({name:req.body.name},(err,result)=>{
         if(err) res.send(500,err);
         res.send('data deleteed '+ JSON.stringify(result))
   
        })
 })