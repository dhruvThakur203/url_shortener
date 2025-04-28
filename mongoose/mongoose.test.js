import mongoose from "mongoose";
import { date } from "zod";

//step 1: to connect to the mongoDB server
try{
    await mongoose.connect("mongodb://127.0.0.1/mongoose_database");
    mongoose.set("debug",true);
}
catch(error){
    console.log(error);
    process.exit();
}

//step 2 create schema
const userSchema = mongoose.Schema({
    name: {type : String,required:true},
    email:{type: String,required : true,unique:true},
    age: {type : Number, required: true,min : 5},
    createdAt : {type: Date,default: Date.now()}
});

//step 3 create a model
const Users = mongoose.model("user",userSchema);

await Users.create({name:"thapa",age:31,email:"dhruvt293@gmail.com"});

await mongoose.connection.close();