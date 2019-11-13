const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let ResponseProfile = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'responseProfiles'
});

module.exports = mongoose.model('ResponseProfile', ResponseProfile);