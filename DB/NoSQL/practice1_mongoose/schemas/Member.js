const mongoose = require("mongoose");

const { Schema } = mongoose;
const memberSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Member", memberSchema, "Member");