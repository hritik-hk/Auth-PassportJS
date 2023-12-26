const mongoose = require('mongoose');
require('dotenv').config();

/*
connecting to MongoDB Server using the connection string 
in the `.env` file for DEV and in environmental variables in Production
*/
 
const DB_URL = process.env.DB_URL;

async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
  }


// exporting the connection
exports.connectToDB = main;

