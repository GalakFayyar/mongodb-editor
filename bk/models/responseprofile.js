const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let ResponseProfile = new Schema({
    _id: {
        type: String
    },
    Name: {
        type: String
    },
    MatchingCriteria: {
        type: []
    },
    ResponseType: {
        type: String
    },
    Specific: {
        type: []
    }
}, {
    collection: 'ResponseProfiles'
});

// Avoid deprecated methods
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('ResponseProfile', ResponseProfile);