const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let ResponseProfile = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    matchingCriteria: {
        type: []
    },
    responseType: {
        type: String
    },
    specific: {
        type: []
    }
}, {
    collection: 'responseProfiles'
});

// Avoid deprecated methods
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('ResponseProfile', ResponseProfile);