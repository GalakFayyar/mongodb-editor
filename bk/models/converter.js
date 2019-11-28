const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Converter = new Schema({
    _id: {
        type: String
    },
    Name: {
        type: String
    },
    Source: {
        type: String
    },
    Dest: {
        type: String
    },
    MatchingCriteria: {
        type: []
    },
    Specific: {
        type: []
    },
    Fields: {
        type: {}
    }
}, {
    collection: 'Converters'
});

// Avoid deprecated methods
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Converter', Converter);