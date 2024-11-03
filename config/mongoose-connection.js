const mongoose = require('mongoose');
require('dotenv').config();
const dbgr = require('debug')("development:mongoose");

const uri = process.env.DATABASE_URL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    dbgr("Pinged your deployment. You successfully connected to MongoDB!");
  }catch (err) {
    dbgr("Connection error:", err);
  }
}
run().catch(console.dir);
module.exports = mongoose.connection;
