

var router=require('express').Router();
var user=require('./models/userModel');


//app.post('/user',(req,res)=>{
    router.post('/user',(req,res)=>{
    user.insert(req.body,(err,result)=>{
        if(err) res.send(500,err);
        res.send('data inserted :'+ JSON.stringify(result))

    })
});
 //step 3b
 //read of crud
 router.get('/user/:name',(req,res)=>{
     user.findOne({name:req.params.name},(err,result)=>{
         if(err) res.send(500,err);
         res.send('data found : '+ JSON.stringify(result))
     })
 })
 //step 3c
 //update of crud
 router.put('/user',(req,res)=>{
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
 router.delete('/user',(req,res)=>{
     user.findOneAndDelete({name:req.body.name},(err,result)=>{
         if(err) res.send(500,err);
         res.send('data deleteed '+ JSON.stringify(result))
   
        })
 })

 module.exports = router;