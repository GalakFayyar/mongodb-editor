const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Rule = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    source: {
        type: String
    },
    dest: {
        type: String
    },
    format: {
        type: String
    },
    copyMode: {
        type: String
    },
    customProcessor: {
        type: []
    },
    params: {
        type: String
    },
    ifOkRules: {
        type: []
    },
    ifNotOkRules: {
        type: []
    },
}, {
    collection: 'rules'
});

// Avoid deprecated methods
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Rule', Rule);