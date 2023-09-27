const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Age: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Customer', customerSchema);