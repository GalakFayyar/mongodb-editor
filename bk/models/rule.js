const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Rule = new Schema({
    _id: {
        type: String
    },
    Name: {
        type: String
    },
    Description: {
        type: String
    },
    Type: {
        type: String
    },
    Source: {
        type: String
    },
    Dest: {
        type: String
    },
    Format: {
        type: String
    },
    CopyMode: {
        type: String
    },
    CustomProcessor: {
        type: []
    },
    Params: {
        type: String
    },
    IfOkRules: {
        type: []
    },
    IfNotOkRules: {
        type: []
    },
}, {
    collection: 'Rules'
});

// Avoid deprecated methods
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Rule', Rule);