var mongoose=require('mongoose');
var schema=mongoose.Schema;
/**
 * Define Schema
 * 
 *  ***create Model from Schema which create collecton
 * ------------>Operate on model object
 * 
 */
var userSchema=new Schema({
    name:{type:String,unique:true},// here unique is like primarykey
    city:{type:String},
    job:{type:String}
});
//creating model
var userModel=mongoose.model('user',userSchema,'userList');
// use this model in some other file
//var model_obj=mongoose.model('user')
module.exports=userModel;