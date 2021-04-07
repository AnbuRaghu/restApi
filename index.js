const express=require('express');
const MongoClient=require('mongodb').MongoClient;
const bodyParser=require('body-parser');

let app=express();
const port=8080;
let mongoUrl='mongodb://127.0.0.1:27017';
let collection_Name='movies';// this is the collection name which i have in my DB
//step 0
// set up bodyparser middleware
// parses the text as url encoded data and return the resulting object on req.body
app.use(bodyParser.urlencoded({extended:true}));
// parses the text as Json and return the resulting object on req.body
app.use(bodyParser.json());

// step1
// create Mogo connection and start server

MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,client)=>{
    if(err) throw err;
    db=client.db('Edureka');
    app.listen(port,()=>{
        console.log('server is running on port : '+ port)
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
    db.collection(collection_Name).insert(req.body,(err,result)=>{
        if(err) res.send(500,err);
        res.send('data inserted :'+ JSON.stringify(result))

    })
});
 //step 3b
 //read of crud
 app.get('/user/:name',(req,res)=>{
     db.collection(collection_Name).findOne({title:req.params.name},(err,result)=>{
         if(err) res.send(500,err);
         res.send('data found : '+ JSON.stringify(result))
     })
 })
 //step 3c
 //update of crud
 app.put('/user',(req,res)=>{
     let updateObj={
         title:req.body.title
     };
     db.collection(collection_Name).findOneAndUpdate({title:req.body.title},
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
     db.collection(collection_Name).findOneAndDelete({title:req.body.title},(err,result)=>{
         if(err) res.send(500,err);
         res.send('data deleteed '+ JSON.stringify(result))
   
        })
 })