const mongoose = require("mongoose");

const Vocab = new mongoose.Schema({
    word: String,
    mean: String,
    count: Number,
}, { timestamps: true });

module.exports = mongoose.model("Vocab", Vocab);
