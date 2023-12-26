const mongoose = require('mongoose');
require('dotenv').config();

/*
connecting to MongoDB Server using the connection string 
in the `.env` file for DEV and in environmental variables in Production
*/
 
const DB_URL = process.env.DB_URL;

async function main() {
    await mongoose.connect(DB_URL);
    console.log("connected to database");
  }


// exporting the connection
exports.connection = main;
