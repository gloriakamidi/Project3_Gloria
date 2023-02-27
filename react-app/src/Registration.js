const mongoose = require("mongoose");

// const Schema = mongoose.Schema;
// const UserDetail = new Schema({
//   username: String,
//   password: String,
// });

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

//const RegistrationCol = mongoose.model("Registration", registrationSchema);
module.exports = mongoose.model("Registration", registrationSchema);

