import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1");

await client.connect();

const db = client.db("mongodb_nodejs_db");
const userCollection = db.collection("users");

// userCollection.insertOne({name:"dhruv thakur" , age: 31});

// userCollection.insertMany([
//     {name:"Ram bahadur" , age: 32},
//     {name:"dhruvvv" , age: 33},
//     {name:"chintu" , age: 30}
// ])

//READ
// const userCursor = userCollection.find();
// console.log(userCursor);

// for await(const user of userCursor){
//     console.log(user);
// }

// const userCursor = await userCollection.find().toArray();
// console.log(userCursor);

// const user = await userCollection.findOne({name : "chintu"});
// console.log(user);
// console.log(user._id.toHexString());

//UPDATE
// await userCollection.updateOne({name: "chintu"},{$set:{age:39}});

//delete
// await userCollection.deleteOne({name : "dhruvvv"});
const result = await userCollection.deleteMany({name : "dhruv thakur"});
console.log(`${result.deletedCount} documents deleted.`);
 