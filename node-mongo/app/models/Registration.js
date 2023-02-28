const mongoose = require("mongoose");

const NewUserSchema = new mongoose.Schema({
 username: {
    type: String,
    trim: true
 },
 
 password: {
    type: String,
    trim: true
 }
});

module.exports = mongoose.model("NewUser", NewUserSchema);