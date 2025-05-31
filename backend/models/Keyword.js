// backend/models/Keyword.js
const mongoose = require("mongoose");

const keywordSchema = new mongoose.Schema({
    term: { type: String, unique: true, required: true },
    count: { type: Number, default: 0 },
});

module.exports = mongoose.model("Keyword", keywordSchema);
