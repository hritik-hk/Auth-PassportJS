const mongoose = require('mongoose');
const {Schema}=mongoose;

//The hash and salt are derived from the user's given password when they register
const userSchema = new Schema({
    username: String,
    hash: {type:Buffer, required:true},
    salt: {type:Buffer, required:true}
});

exports.User = mongoose.model("User", userSchema);