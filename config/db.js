require('dotenv').config()
const mongoose = require('mongoose');

let username = process.env.DB_USERNAME || '';
let password = process.env.DB_PASSWORD || '';
let cluster = process.env.DB_CLUSTER || '';
let dbname = 'midterm';
let ConnectionString = `mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

module.exports = async function () {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(ConnectionString, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("==== Backend successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}