const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
    }
)