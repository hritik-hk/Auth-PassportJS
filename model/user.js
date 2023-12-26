const mongoose = require('mongoose');
const {Schema}=mongoose;

//The hash and salt are derived from the user's given password when they register
const userSchema = new Schema({
    email: {type:String, require:true},
    hash: {type:Buffer, required:true},
    salt: {type:Buffer, required:true},
    role: {type:String, require:true, default:'user'}
});

exports.User = mongoose.model("User", userSchema);