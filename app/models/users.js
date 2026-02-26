const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  passowrd: String,
  created: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
},
  {
    collection: "users"
  }
);

// Ensure virtual fields are serialised.
UsersSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) { 
    delete ret._id;
    delete ret.password;
  }
});

module.exports = mongoose.model('Users', UsersSchema);
