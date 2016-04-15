var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Role', RoleSchema);
