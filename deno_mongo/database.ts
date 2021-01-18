import { MongoClient,ClientOptions } from "https://deno.land/x/mongo@v0.11.0/mod.ts";

const client = new MongoClient();


let ClientOptions:ClientOptions = {
  hosts: ["mongodb+srv://mahotag:AgnesZoe1518!@cluster0.5qt2r.mongodb.net/demo?retryWrites=true&w=majority"]
}
  


try{
    client.connectWithOptions(ClientOptions);

}catch(e){
    console.log(e)
}

// Defining schema interface
interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}

const db = client.database("demo");
const users = db.collection<UserSchema>("users");

// insert
const insertId = await users.insertOne({
  username: "user1",
  password: "pass1",
});

// insertMany
const insertIds = await users.insertMany([
  {
    username: "user1",
    password: "pass1",
  },
  {
    username: "user2",
    password: "pass2",
  },
]);

// findOne
const user1 = await users.findOne({ _id: insertId });
// Returns:
// { _id: { $oid: "<oid>" }, username: "user1", password: "pass1" }

// find
const all_users = await users.find({ username: { $ne: null } });

// find by ObjectId
const user1_id = await users.findOne({ _id: { $oid: "<oid>" } });

// count
const count = await users.count({ username: { $ne: null } });

// aggregation
const docs = await users.aggregate([
  { $match: { username: "many" } },
  { $group: { _id: "$username", total: { $sum: 1 } } },
]);

// // updateOne
// const { matchedCount, modifiedCount, upsertedId } = await users.updateOne(
//   { username: { $ne: null } },
//   { $set: { username: "USERNAME" } }
// );

// // updateMany
// const { matchedCount, modifiedCount, upsertedId } = await users.updateMany(
//   { username: { $ne: null } },
//   { $set: { username: "USERNAME" } }
// );

// // deleteOne
// const deleteCount = await users.deleteOne({ _id: insertId });

// // deleteMany
// const deleteCount2 = await users.deleteMany({ username: "test" });

// // Skip
// const skipTwo = await users.skip(2).find();

// // Limit
// const featuredUser = await users.limit(5).find();
export {
  insertId,
  client
} 

