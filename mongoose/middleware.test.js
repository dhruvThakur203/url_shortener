import mongoose from "mongoose";

//step 1: to connect to the mongoDB server
try{
    await mongoose.connect("mongodb://127.0.0.1/mongoose_middleware");
    mongoose.set("debug",true);
    
}
catch(error){
    console.log(error);
    process.exit();
}

// /step 2 create a SCHEMA
const userSchema = mongoose.Schema({
    name: {type : String,required:true},
    email:{type: String,required : true,unique:true},
    age: {type : Number, required: true,min : 5},
    // createdAt : {type: Date,default: Date.now()},
    // updatedAt : {type: Date,default: Date.now()}, // we don't need this hum bina likhe or userschema.pre ke bina bhi kr skte
},{
    //hum created at and uodated at ki jagha ye kr skte
    Timestamps :true, 
});

//we will use middle ware
// userSchema.pre(["updateOne","updateMany","findOneAndUpdate"], function(next){
//     this.set({updatedAt: Date.now()});
//     next();
// });

//step 2 create a model
const Users = mongoose.model("user",userSchema);

//STEP 3 TO insert the data
// await Users.create({name:"thapa",age:31,email:"dhruvt293@gmail.com"});

await Users.updateOne({email: "dhruvt293@gmail.com"}, { $set: {age:40}});

await mongoose.connection.close();
