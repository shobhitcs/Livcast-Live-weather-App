const mongoose = require('mongoose')

// Person schema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    searches: [{ type: String}]
});

const Person = mongoose.model('Person', personSchema);

module.exports = { Person };